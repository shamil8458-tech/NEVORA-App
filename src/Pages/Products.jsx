import { getProducts } from '../services/productService'
import ProductCard from '../components/ProductCard'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react';

function Products() {

  // const [searchParams] = useSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [sort , setSort] = useState("Default")

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
  }).sort((a,b) => {
    if(sort === "Low"){
      return a.price - b.price
    }
    if(sort === "High"){
      return b.price - a.price
    }
  })
  

  return (

    <div  className='min-h-screen bg-[#faf9f6] px-6 py-28 md:px-10'>

    <div className='mx-auto max-w-7xl'>

       {/* Page Heading */}

       <div className='mb-10 text-center'>
            <h2 className = "text-3xl font-semibold text-gray-900 md:text-4xl">
              {category ? category : "All Products"}
              </h2>

              <p className="mt-3 text-sm text-gray-500">
              Discover our skincare collection
              </p>
       </div>

       {/* filter/// */}


{/* <select
  value={category}
  onChange={(e) => {
    const value = e.target.value;

    if (value) {
      setSearchParams({
        ...(search && { search }),
        category: value,
      });
    } else {
      setSearchParams(search ? { search } : {});
    }
  }}
>
  <option value="">All</option>
  <option value="Sunscreens">Sunscreen</option>
  <option value="Serums">Serum</option>
  <option value="Moisturisers">Moisturiser</option>
  <option value="Cleansers">Cleansers</option>
</select>




<select value={sort}
onChange={(e) => setSort( e.target.value)}>
    <option value="Low">Low to High</option>
    <option value="High"> High to Low</option>
</select> */}



{/* Filter and Sort */}

<div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">

  <select
    value={category}
    onChange={(e) => {
      const value = e.target.value;

      if (value) {
        setSearchParams({
          ...(search && { search }),
          category: value,
        });
      } else {
        setSearchParams(search ? { search } : {});
      }
    }}
    className="w-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-gray-900 sm:w-56"
  >
    <option value="">All</option>
    <option value="Sunscreens">Sunscreen</option>
    <option value="Serums">Serum</option>
    <option value="Moisturisers">Moisturiser</option>
    <option value="Cleansers">Cleansers</option>
  </select>

  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    className="w-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-gray-900 sm:w-56"
  >
    <option value="">Default</option>
    <option value="Low">Low to High</option>
    <option value="High">High to Low</option>
  </select>

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
 