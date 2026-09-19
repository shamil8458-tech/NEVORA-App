import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { Heart } from "lucide-react";
import { addToCart } from "../Redux/Slice/CartSlice";
import { useMutation , useQuery, useQueryClient} from "@tanstack/react-query";
import { addCartItem } from "../services/cartService";
import { addToWishlist } from "../Redux/Slice/wishlistSlice";
import { getWishlist , addWidhListItem , removeWishlistItem } from "../services/wishlistService";



function ProductCard({product}) {


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn : addCartItem,

    onSuccess : (data) => {
      dispatch(addToCart(data));

      queryClient.invalidateQueries({
        queryKey:["cart"]
      })
    },
  })

  const {mutate: addWishlist} = useMutation({
    mutationFn : addWidhListItem,

    onSuccess: (data) => {
      dispatch(addToWishlist(data));

      queryClient.invalidateQueries({
        queryKey : ["wishlist"]
      })
    }
  })


  const {data :wishlistItems = [] } = useQuery({
    queryKey : ["wishlist"],
    queryFn : getWishlist,
  })


  const isWishlisted = wishlistItems.some(
    (item) => String(item.productId) === String(product.id)
  );

  const {mutate : toggleWishlist} = useMutation({
    mutationFn : async () => {
      const  existingItem = wishlistItems.find(
        (item) => String(item.productId) === String(product.id)
      );

      if(existingItem){
        return removeWishlistItem(existingItem.id)
      }

      return addWidhListItem(product)
    },


    onSuccess : (data) => {
      queryClient.invalidateQueries({
        queryKey : ["wishlist"]
      })
    }
  })


  return (
    <div onClick={() => navigate(`/products/${product.id}`)}
    className="cursor-pointer bg-white">

      
     {/* ///Product-img/// */}

     <div className="relative overflow-hidden bg-[#f5f4ef]">

  

      <img src={product.image} alt={product.name} 
      className="h-64 w-full object-cover transition duration-300 hover:scale-105"/>
{/* 
               <button
               type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        addWishlist(product);

                    }}
        className="absolute right-3 top-3 text-gray-700 transition hover:text-gray-500"
        aria-label="Add to wishlist">
          <Heart size={21} strokeWidth={1.5}/>
        </button> */}


        <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist();
        }}
          className={`absolute right-3 top-3 transition ${
    isWishlisted
      ? "text-red-500"
      : "text-gray-700 hover:text-gray-500"
  }`}
  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}

        >

        <Heart
        size={21}
        strokeWidth={1.5}
        fill={isWishlisted ? "currentColor" : "none"}
       />

        </button>

       </div>


    
      {/* Product Information */}

      <div className="px-3 py-4 text-center">

        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>


      
      <p className="mt-2 text-sm font-semibold text-gray-900">
        ₹{product.price}
        </p>

      <button
  type="button"
  onClick={(e) => {
    e.stopPropagation();
    mutate(product);
  }}
  className="mt-4 bg-gray-900 px-6 py-2 text-xs font-medium text-white transition hover:bg-gray-500"
>
  Add to Cart
</button>

           </div>
      
    </div>
  )
}

export default ProductCard
