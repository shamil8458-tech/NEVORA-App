import { getProducts } from '../services/productService'
import ProductCard from '../components/ProductCard'
import { useQuery } from '@tanstack/react-query'

function Products() {


  const {data : products , isLoading , isError}= useQuery({
    queryKey : ["products"],
    queryFn : getProducts,
  })


  if(isLoading){
    return <p>Loading products...</p>
  }

  if(isError){
    return <p>Failed to load products</p>
  }

  return (
    <div>

           <h2>All Products</h2>

           {products.map((item) => (
              <ProductCard
               key={item.id}
               product = {item}
               />
           ))}
        
      
    </div>
  )
}

export default Products
