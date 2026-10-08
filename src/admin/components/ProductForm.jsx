// import { useMutation , useQueryClient } from "@tanstack/react-query"
// import { addProduct } from "../services/adminProductService"
// import { updateProduct } from "../services/adminProductService";
// import { useState , useEffect } from "react";


// function ProductForm({ editProduct }) {

//     const queryClient = useQueryClient();

//     const [product , setProduct] = useState({
//         name : "",
//         brand : "",
//         category : "",
//         price : "",
//         originalPrice : "",
//         description : "",
//         image : "",
//         rating : "",
//         stock : "",
//     });

//     useEffect(() => {
//       if(editProduct){
//         setProduct(editProduct)
//       }
//     },[editProduct])

//     const {mutate , isPending} = useMutation({
//         mutationFn:addProduct,

//         onSuccess : () => {
//             queryClient.invalidateQueries({
//                 queryKey:["adminProducts"]
//             });


//             setProduct({
//               name: "",
//               brand: "",
//               category: "",
//               price: "",
//               originalPrice: "",
//               description: "",
//               image: "",
//               rating: "",
//               stock: "",

//             });
//         },
//     });



//     const {mutate : updateMutate , isPending : isUpdating} = useMutation({
//       mutationFn : updateProduct,


//       onSuccess : () => {
//         queryClient.invalidateQueries({
//           queryKey : ["adminProducts"]
//         });



//         setProduct({
//            name: "",
//            brand: "",
//            category: "",
//            price: "",
//            originalPrice: "",
//            description: "",
//            image: "",
//            rating: "",
//            stock: "",
//         });
//       },
//     })


//     const handleChange = (e) => {
//         const {name , value} = e.target;


//         setProduct({
//             ...product,
//             [name] : value,
//         });
//     };


//     const handleSubmit = (e) => {
//         e.preventDefault();
      
//         if(editProduct){
//             updateMutate(product)
//         }else{
//           mutate(product);
//         }
//     }


//   return (
//         <form onSubmit={handleSubmit}>

//       <input
//         type="text"
//         name="name"
//         placeholder="Product name"
//         value={product.name}
//         onChange={handleChange}
//       />

//       <input
//         type="text"
//         name="brand"
//         placeholder="Brand"
//         value={product.brand}
//         onChange={handleChange}
//       />

//       <input
//         type="text"
//         name="category"
//         placeholder="Category"
//         value={product.category}
//         onChange={handleChange}
//       />

//       <input
//         type="number"
//         name="price"
//         placeholder="Price"
//         value={product.price}
//         onChange={handleChange}
//       />

//       <input
//         type="number"
//         name="originalPrice"
//         placeholder="Original Price"
//         value={product.originalPrice}
//         onChange={handleChange}
//       />

//       <textarea
//         name="description"
//         placeholder="Description"
//         value={product.description}
//         onChange={handleChange}
//       />

//       <input
//         type="text"
//         name="image"
//         placeholder="Image URL"
//         value={product.image}
//         onChange={handleChange}
//       />

//       <input
//         type="number"
//         name="rating"
//         placeholder="Rating"
//         value={product.rating}
//         onChange={handleChange}
//       />

//       <input
//         type="number"
//         name="stock"
//         placeholder="Stock"
//         value={product.stock}
//         onChange={handleChange}
//       />

//       <button type="submit" disabled={isPending || isUpdating}>
        
//         {isUpdating ? "Updating...." : editProduct ? "Update Prodect" : isPending ? "Adding..." : "Add Product" }
//       </button>

//     </form>
//   )
// }

// export default ProductForm























import toast from "react-hot-toast";
import {  useMutation,  useQueryClient} from "@tanstack/react-query";

import {  addProduct,  updateProduct} from "../services/adminProductService";

import {  useState,  useEffect} from "react";


function ProductForm({ editProduct, onCancel }) {

  const queryClient = useQueryClient();


  const [product, setProduct] = useState({

    name: "",
    brand: "",
    category: "",
    price: "",
    originalPrice: "",
    description: "",
    image: "",
    rating: "",
    stock: "",

  });


  // Fill form when editing
  useEffect(() => {

    if (editProduct) {

      setProduct(editProduct);

    }

  }, [editProduct]);


  // Add product
  const {
    mutate,
    isPending,
  } = useMutation({

    mutationFn: addProduct,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["adminProducts"],
      });


        toast.success("Product added successfully");

      setProduct({

        name: "",
        brand: "",
        category: "",
        price: "",
        originalPrice: "",
        description: "",
        image: "",
        rating: "",
        stock: "",

      });

    },
    onError: () => {
     toast.error("Failed to add product");
    },

  });



  // Update product
  const {
    mutate: updateMutate,
    isPending: isUpdating,
  } = useMutation({

    mutationFn: updateProduct,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["adminProducts"],
      });

      toast.success("Product updated successfully");


      setProduct({

        name: "",
        brand: "",
        category: "",
        price: "",
        originalPrice: "",
        description: "",
        image: "",
        rating: "",
        stock: "",

      });

    },
      onError: () => {
    toast.error("Failed to update product");
  },

  });



  // Input change
  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setProduct({

      ...product,

      [name]: value,

    });

  };



  // Form submit
  const handleSubmit = (e) => {

    e.preventDefault();

      if (
    !product.name ||
    !product.brand ||
    !product.category ||
    !product.price ||
    !product.originalPrice ||
    !product.description ||
    !product.image ||
    !product.rating ||
    !product.stock
  ) {
    toast.error("Please fill all fields");
    return;
  }


    if (editProduct) {

      updateMutate(product);

    } else {

      mutate(product);

    }

  };



  return (

    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
    >


      {/* ================= FORM HEADER ================= */}

      <div className="mb-7">

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Product Details
        </p>


        <h2 className="mt-2 text-xl font-semibold text-stone-900">

          {editProduct
            ? "Update Product"
            : "Add New Product"}

        </h2>


        <p className="mt-1 text-sm text-stone-500">

          {editProduct
            ? "Update the selected product details."
            : "Add a new skincare product to your store."}

        </p>

      </div>



      {/* ================= INPUTS ================= */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">


        {/* Product Name */}

        <div>

          <label className="mb-2 block text-sm font-medium text-stone-700">
            Product Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={product.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          />

        </div>



        {/* Brand */}

        <div>

          <label className="mb-2 block text-sm font-medium text-stone-700">
            Brand
          </label>

          <input
            type="text"
            name="brand"
            placeholder="Enter brand"
            value={product.brand}
            onChange={handleChange}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          />

        </div>



        {/* Category */}

        <div>

          <label className="mb-2 block text-sm font-medium text-stone-700">
            Category
          </label>

          <input
            type="text"
            name="category"
            placeholder="e.g. Skincare"
            value={product.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          />

        </div>



        {/* Price */}

        <div>

          <label className="mb-2 block text-sm font-medium text-stone-700">
            Price
          </label>

          <input
            type="number"
            name="price"
            placeholder="Enter selling price"
            value={product.price}
            onChange={handleChange}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          />

        </div>



        {/* Original Price */}

        <div>

          <label className="mb-2 block text-sm font-medium text-stone-700">
            Original Price
          </label>

          <input
            type="number"
            name="originalPrice"
            placeholder="Enter original price"
            value={product.originalPrice}
            onChange={handleChange}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          />

        </div>



        {/* Rating */}

        <div>

          <label className="mb-2 block text-sm font-medium text-stone-700">
            Rating
          </label>

          <input
            type="number"
            name="rating"
            placeholder="e.g. 4.5"
            value={product.rating}
            onChange={handleChange}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          />

        </div>



        {/* Stock */}

        <div>

          <label className="mb-2 block text-sm font-medium text-stone-700">
            Stock
          </label>

          <input
            type="number"
            name="stock"
            placeholder="Available stock"
            value={product.stock}
            onChange={handleChange}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          />

        </div>



        {/* Image */}

        <div>

          <label className="mb-2 block text-sm font-medium text-stone-700">
            Image URL
          </label>

          <input
            type="text"
            name="image"
            placeholder="Paste image URL"
            value={product.image}
            onChange={handleChange}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          />

        </div>



        {/* Description */}

        <div className="md:col-span-2">

          <label className="mb-2 block text-sm font-medium text-stone-700">
            Description
          </label>

          <textarea
            name="description"
            placeholder="Write a short product description..."
            value={product.description}
            onChange={handleChange}
            rows="4"
            className="w-full resize-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          />

        </div>

      </div>



      {/* ================= BUTTONS ================= */}

      <div className="mt-7 flex justify-end gap-3 border-t border-stone-100 pt-5">


        {/* Cancel */}

        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-stone-200 bg-white px-5 py-3 text-sm font-medium text-stone-600 transition hover:bg-stone-50 hover:text-stone-800"
        >
          Cancel
        </button>



        {/* Submit */}

        <button
          type="submit"
          disabled={isPending || isUpdating}
          className="rounded-xl bg-[#17634f] px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#124f40] disabled:cursor-not-allowed disabled:opacity-60"
        >

          {isUpdating
            ? "Updating..."
            : editProduct
            ? "Update Product"
            : isPending
            ? "Adding..."
            : "Add Product"}

        </button>

      </div>

    </form>

  );

}

export default ProductForm;