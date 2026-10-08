// import {useQuery , useMutation , useQueryClient} from '@tanstack/react-query'
// import {useDispatch , useSelector} from 'react-redux'
// import { getAdminProducts } from '../services/adminProductService'
// import { setProducts } from '../redux/slices/adminProductSlice'
// import { deleteProduct } from '../services/adminProductService'
// import ProductForm from '../components/ProductForm'
// import ProductTable from '../components/ProductTable'
// import { useState } from 'react'
// import Pagination from '../components/Pagination'
// import usePagination from '../../Hooks/usePagination'


// function Products() {
//   const dispatch = useDispatch();

//   const queryClient = useQueryClient();

//   const [selectProducts , setSelectProduct] = useState(null)

//   const products = useSelector((state) => state.adminProducts.products)

  
//   const {currentPage ,
//      totalPages ,
//      currentItems : currentProducts ,
//      changePage ,
//         } = usePagination(products ,10)


//   const {isLoading , isError} = useQuery({
//     queryKey : ["adminProducts"],
//     queryFn : async () => {
//       const data = await getAdminProducts()

//       dispatch(setProducts(data))

//       return data;
//     },
//   })




//     const {mutate: deleteMutate} = useMutation({
//     mutationFn: deleteProduct,

//     onSuccess : () => {
//       queryClient.invalidateQueries({
//         queryKey: ["adminProducts"]
//       });
//     },
//   })


//   const handleDelete = (id) => {
//     deleteMutate(id);
//   }


  
//   if(isLoading){
//      return <p>Loading products...</p>;
//   }

//   if(isError){
//      return <p>Failed to load products</p>;
//   }
//   return (
//     <div>

//       <h1>Products</h1>



//       <ProductForm editProduct={selectProducts}/>

      
//       {/* <ProductTable 
//       products={products}
//       onEdit={setSelectProduct}
//       onDelete={handleDelete}/> */}


//       <ProductTable 
//       products={currentProducts}
//       onEdit={setSelectProduct}
//       onDelete={handleDelete}/>


//       <Pagination
//       currentPage={currentPage}
//       totalPage={totalPages}
//       onPageChange={changePage}/>

      
//     </div>
//   )
// }

// export default Products




































import toast from "react-hot-toast";
import {  useQuery,  useMutation,  useQueryClient } from "@tanstack/react-query";

import {  useDispatch,  useSelector } from "react-redux";

// import {
//   getAdminProducts,
//   deleteProduct,
// } from "../services/adminProductService";


import { getAdminProducts , moveToTrash } from "../services/adminProductService";
import { setProducts } from "../redux/slices/adminProductSlice";

import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

import { useState } from "react";

import Pagination from "../components/Pagination";
import usePagination from "../../Hooks/usePagination";


function Products() {

  const dispatch = useDispatch();

  const queryClient = useQueryClient();




  // Selected product for editing
  const [selectProducts, setSelectProduct] = useState(null);

  // Controls ProductForm visibility
  const [showForm, setShowForm] = useState(false);

  

  // serch///
  const [search , setSearch] = useState("")



  // Products from Redux
  const products = useSelector(
    (state) => state.adminProducts.products
  );


  

  // search///
  
  const FilteredProducts = products.filter((product) => 
     product.name.toLowerCase().includes(search.toLowerCase())
)




  // Pagination
  const {
    currentPage,
    totalPages,
    currentItems: currentProducts,
    changePage,
  } = usePagination(FilteredProducts, 10);


  // Get products
  const {
    isLoading,
    isError,
  } = useQuery({

    queryKey: ["adminProducts"],

    queryFn: async () => {

      const data = await getAdminProducts();

      dispatch(setProducts(data));

      return data;
    },

  });


  // Delete product
  // const {
  //   mutate: deleteMutate,
  // } = useMutation({

  //   mutationFn: deleteProduct,

  //   onSuccess: () => {

  //     queryClient.invalidateQueries({
  //       queryKey: ["adminProducts"],
  //     });

  //     toast.success("Product deleted successfully");

  //   },
  //    onError: () => {
  //   toast.error("Failed to delete product");
  // },

  // });


  // Move to Trash///

  const {mutate: moveToTrashMutate } = useMutation({
    mutationFn : moveToTrash,


    onSuccess : () => {
      queryClient.invalidateQueries({
        queryKey : ["adminProducts"]
      })

       toast.success("Product moved to trash");
    },

    onError : () => {
      toast.error("Failed to move product to trash");
    }
  })


  // const handleDelete = (id) => {
  //   deleteMutate(id);
  // };


  const handleDelete = (id) => {
    moveToTrashMutate(id)
  };


  // Edit product
  const handleEdit = (product) => {

    setSelectProduct(product);

    setShowForm(true);
  };


  // Add product
  const handleAddProduct = () => {

    setSelectProduct(null);

    setShowForm(true);
  };


  // Cancel form
  const handleCancel = () => {

    setShowForm(false);

    setSelectProduct(null);
  };


  // Loading
  if (isLoading) {

    return (
      <div className="flex min-h-[400px] items-center justify-center">

        <div className="text-center">

          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-stone-200 border-t-emerald-700" />

          <p className="text-sm text-stone-500">
            Loading products...
          </p>

        </div>

      </div>
    );

  }


  // Error
  if (isError) {

    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6">

        <p className="text-sm font-medium text-red-600">
          Failed to load products
        </p>

        <p className="mt-1 text-xs text-red-500">
          Please try again later.
        </p>

      </div>
    );

  }


  return (

    <div className="space-y-8">


      {/* ================= PAGE HEADER ================= */}

      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Store Management
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
            Products
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-stone-500">
            Manage your skincare products, pricing and stock.
          </p>

        </div>


        {/* Add Product Button */}

        <button
          type="button"
          onClick={handleAddProduct}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#17634f] px-5 py-3 text-sm font-medium text-white shadow-sm transition duration-200 hover:bg-[#124f40] hover:shadow-md"
        >

          <span className="text-lg leading-none">
            +
          </span>

          Add Product

        </button>

      </div>



      {/* ================= PRODUCT FORM ================= */}

      {showForm && (

        <ProductForm
          editProduct={selectProducts}
          onCancel={handleCancel}
        />

      )}



      {/* ================= PRODUCT TABLE CARD ================= */}

      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">


        {/* Table Header */}

        <div className="flex flex-col gap-4 border-b border-stone-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h2 className="text-lg font-semibold text-stone-900">
              Product List
            </h2>

            <p className="mt-1 text-sm text-stone-500">
              View and manage all products
            </p>

          </div>


          {/* serach/// */}

         <input type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 sm:w-64" />









          {/* Product Count */}

          <div className="w-fit rounded-full bg-emerald-50 px-4 py-2">

            <span className="text-sm font-medium text-emerald-700">
              {FilteredProducts.length} Products
            </span>

          </div>

        </div>



        {/* Table */}

        <ProductTable
          products={currentProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />



        {/* Pagination */}

        <div className="border-t border-stone-100 px-6 py-5">

          <Pagination
            currentPage={currentPage}
            totalPage={totalPages}
            onPageChange={changePage}
          />

        </div>


      </div>


    </div>

  );
}

export default Products;