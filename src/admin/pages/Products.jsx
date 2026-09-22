import {useQuery , useMutation , useQueryClient} from '@tanstack/react-query'
import {useDispatch , useSelector} from 'react-redux'
import { getAdminProducts } from '../services/adminProductService'
import { setProducts } from '../redux/slices/adminProductSlice'
import { deleteProduct } from '../services/adminProductService'
import ProductForm from '../components/ProductForm'
import ProductTable from '../components/ProductTable'
import { useState } from 'react'
import Pagination from '../components/Pagination'


function Products() {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const [selectProducts , setSelectProduct] = useState(null)
  const [currentPage , setCurrentPage] = useState(1);


  const products = useSelector((state) => state.adminProducts.products);

    const productsPerPage = 10;

  const totalPages = Math.ceil(products.length / productsPerPage);


  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );


  const {isLoading , isError} = useQuery({
    queryKey : ["adminProducts"],
    queryFn : async () => {
      const data = await getAdminProducts()

      dispatch(setProducts(data))

      return data;
    },
  })




    const {mutate: deleteMutate} = useMutation({
    mutationFn: deleteProduct,

    onSuccess : () => {
      queryClient.invalidateQueries({
        queryKey: ["adminProducts"]
      });
    },
  })


  const handleDelete = (id) => {
    deleteMutate(id);
  }


  
  if(isLoading){
     return <p>Loading products...</p>;
  }

  if(isError){
     return <p>Failed to load products</p>;
  }
  return (
    <div>

      <h1>Products</h1>



      <ProductForm editProduct={selectProducts}/>

      
      {/* <ProductTable 
      products={products}
      onEdit={setSelectProduct}
      onDelete={handleDelete}/> */}


      <ProductTable 
      products={currentProducts}
      onEdit={setSelectProduct}
      onDelete={handleDelete}/>


      <Pagination
      currentPage={currentPage}
      totalPage={totalPages}
      onPageChange={setCurrentPage}/>

      
    </div>
  )
}

export default Products
