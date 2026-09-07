import { getProducts } from '../services/productService'
import ProductCard from '../components/ProductCard'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

function Products() {

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";


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

  const filterProducts = products.filter((product) => 
  product.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>

           <h2>All Products</h2>

           {filterProducts.length === 0 ? (
            <p>No products found</p>
           ) : (
            filterProducts.map((item) => (
              <ProductCard
               key={item.key} 
              product={item}/>
            ))
           )}

        
      
    </div>
  )
}

export default Products
 