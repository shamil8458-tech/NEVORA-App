import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";


function ProductDetails() {

    const {id} = useParams();

    const {data:product , isLoading , isError} = useQuery({
        queryKey : ["product" , id],
        queryFn : () => getProductById(id),
    })

    if(isLoading){
        return <p>Loading product...</p>
    }

    if(isError){
        return <p>Failed to load product</p>
    }


  return (
    <div>

        <img src={product.image} alt={product.name} />

         <h2>{product.name}</h2>

         <p>Brand: {product.brand}</p>

         <p>Category: {product.category}</p>

         <h3>₹{product.price}</h3>

         <p>{product.description}</p>

         <p>Rating: {product.rating}</p>

         <p>Stock: {product.stock}</p>

           <button>Add to Cart</button>
      
    </div>
  );
}

export default ProductDetails
