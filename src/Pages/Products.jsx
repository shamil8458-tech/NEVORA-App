import { getProducts } from '../services/productService'
import ProductCard from '../components/ProductCard'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

function Products() {

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  const category = searchParams.get("category") ||  "";


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

  const filterProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category ? 
    product.category === category : true;


    return matchesSearch && matchesCategory
  })
  

  return (

    <div  className='min-h-screen bg-[#faf9f6] px-6 py-28 md:px-10'>

    <div className='mx-auto max-w-7xl'>

       {/* Page Heading */}

       <div className='mb-10 text-center'>
            <h2 classNametext-3xl font-semibold text-gray-900 md:text-4xl>
              {category ? category : "All Products"}
              </h2>

              <p className="mt-3 text-sm text-gray-500">
              Discover our skincare collection
              </p>
       </div>

       {/* Products */}

           {filterProducts.length === 0 ? (
            <p className='text-center text-sm text-gray-500'
            >No products found</p>
           ) : (

            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">

                  
            {filterProducts.map((item) => (
              <ProductCard
               key={item.id} 
              product={item}
              />
            ))
           }

            </div>
  )}
        

        
      
    </div>

    </div>
  )
}

export default Products
 