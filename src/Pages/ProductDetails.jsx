// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";
// import { getProductById } from "../services/productService";


// function ProductDetails() {

//     const {id} = useParams();

//     const {data:product , isLoading , isError} = useQuery({
//         queryKey : ["product" , id],
//         queryFn : () => getProductById(id),
//     })

//     if(isLoading){
//         return <p>Loading product...</p>
//     }

//     if(isError){
//         return <p>Failed to load product</p>
//     }


//   return (
//      <div className="min-h-screen bg-[#faf9f6] px-6 py-28 md:px-10">

//     <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">

//       {/* Product Image */}

//       <div className="bg-[#f5f4ef]">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="h-[500px] w-full object-cover md:h-[600px]"
//         />
//       </div>


//       {/* Product Information */}

//       <div className="flex flex-col justify-center">

//         <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
//           {product.brand}
//         </p>

//         <h1 className="mt-3 text-3xl font-semibold text-gray-900 md:text-4xl">
//           {product.name}
//         </h1>

//         <p className="mt-3 text-sm text-gray-500">
//           {product.category}
//         </p>

//         <h2 className="mt-6 text-2xl font-semibold text-gray-900">
//           ₹{product.price}
//         </h2>

//         <p className="mt-6 max-w-lg text-sm leading-6 text-gray-600">
//           {product.description}
//         </p>


//         {/* Rating & Stock */}

//         <div className="mt-6 flex gap-6 text-sm text-gray-600">

//           <p>
//             Rating: <span className="font-medium text-gray-900">
//               {product.rating}
//             </span>
//           </p>

//           <p>
//             Stock: <span className="font-medium text-gray-900">
//               {product.stock}
//             </span>
//           </p>

//         </div>


//         {/* Add To Cart */}

//         <button
//           className="mt-8 w-full bg-gray-900 px-6 py-4 text-sm font-medium text-white transition hover:bg-gray-700 md:w-fit"
//         >
//           ADD TO CART
//         </button>

//       </div>

//     </div>

//   </div>
//   );
// }

// export default ProductDetails




import { useQuery , useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/Slice/CartSlice";
import { addCartItem } from "../services/cartService";



function ProductDetails() {

    const {id} = useParams();

    const dispatch = useDispatch();

    const {data:product , isLoading , isError} = useQuery({
        queryKey : ["product" , id],
        queryFn : () => getProductById(id),
    })

    const {mutate} = useMutation({
      mutationFn : addCartItem,

      onSuccess : (data) => {
           dispatch(addToCart(data))
      }
    })

    if(isLoading){
        return <p>Loading product...</p>
    }

    if(isError){
        return <p>Failed to load product</p>
    }


  return (
     <div className="min-h-screen bg-[#faf9f6] px-6 py-28 md:px-10">

    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">

      {/* Product Image */}

      <div className="bg-[#f5f4ef]">
        <img
          src={product.image}
          alt={product.name}
          className="h-[500px] w-full object-cover md:h-[600px]"
        />
      </div>


      {/* Product Information */}

      <div className="flex flex-col justify-center">

        <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
          {product.brand}
        </p>

        <h1 className="mt-3 text-3xl font-semibold text-gray-900 md:text-4xl">
          {product.name}
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          {product.category}
        </p>

        <h2 className="mt-6 text-2xl font-semibold text-gray-900">
          ₹{product.price}
        </h2>

        <p className="mt-6 max-w-lg text-sm leading-6 text-gray-600">
          {product.description}
        </p>


        {/* Rating & Stock */}

        <div className="mt-6 flex gap-6 text-sm text-gray-600">

          <p>
            Rating: <span className="font-medium text-gray-900">
              {product.rating}
            </span>
          </p>

          <p>
            Stock: <span className="font-medium text-gray-900">
              {product.stock}
            </span>
          </p>

        </div>


        {/* Add To Cart */}

        <button
          className="mt-8 w-full bg-gray-900 px-6 py-4 text-sm font-medium text-white transition hover:bg-gray-700 md:w-fit"
          onClick={() => mutate(product)}
        >
          ADD TO CART
        </button>

      </div>

    </div>

  </div>
  );
}

export default ProductDetails
