import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { Heart } from "lucide-react";
import { addToCart } from "../Redux/Slice/CartSlice";



function ProductCard({product}) {


  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div onClick={() => navigate(`/products/${product.id}`)}
    className="cursor-pointer bg-white">

      
     {/* ///Product-img/// */}

     <div className="relative overflow-hidden bg-[#f5f4ef]">

  

      <img src={product.image} alt={product.name} 
      className="h-64 w-full object-cover transition duration-300 hover:scale-105"/>

      <button onClick={(e) => e.stopPropagation()}
        className="absolute right-3 top-3 text-gray-700 transition hover:text-gray-500"
        aria-label="Add to wishlist">
          <Heart size={21} strokeWidth={1.5}/>
        </button>

       </div>


    
      {/* Product Information */}

      <div className="px-3 py-4 text-center">

        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>


      
      <p className="mt-2 text-sm font-semibold text-gray-900">
        ₹{product.price}
        </p>

      <button onClick={(e) => {
        e.stopPropagation();
        dispatch(addToCart(product))
      }}
      className="mt-4 bg-gray-900 px-6 py-2 text-xs font-medium text-white transition hover:bg-gray-500"
      >Add to Cart
      </button>

           </div>
      
    </div>
  )
}

export default ProductCard
