import { useNavigate } from "react-router-dom";



function ProductCard({product}) {


  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/products/${product.id}`)}>

      


      <img src={product.image} alt={product.name} />

      <h5>{product.name}</h5>
      <h4>₹{product.price}</h4>

      <button>Add to Cart</button>
      
    </div>
  )
}

export default ProductCard
