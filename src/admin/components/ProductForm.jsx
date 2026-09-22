import { useMutation , useQueryClient } from "@tanstack/react-query"
import { addProduct } from "../services/adminProductService"
import { updateProduct } from "../services/adminProductService";
import { useState , useEffect } from "react";


function ProductForm({ editProduct }) {

    const queryClient = useQueryClient();

    const [product , setProduct] = useState({
        name : "",
        brand : "",
        category : "",
        price : "",
        originalPrice : "",
        description : "",
        image : "",
        rating : "",
        stock : "",
    });

    useEffect(() => {
      if(editProduct){
        setProduct(editProduct)
      }
    },[editProduct])

    const {mutate , isPending} = useMutation({
        mutationFn:addProduct,

        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey:["adminProducts"]
            });


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
    });



    const {mutate : updateMutate , isPending : isUpdating} = useMutation({
      mutationFn : updateProduct,


      onSuccess : () => {
        queryClient.invalidateQueries({
          queryKey : ["adminProducts"]
        });



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
    })


    const handleChange = (e) => {
        const {name , value} = e.target;


        setProduct({
            ...product,
            [name] : value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
      
        if(editProduct){
            updateMutate(product)
        }else{
          mutate(product);
        }
    }


  return (
        <form onSubmit={handleSubmit}>

      <input
        type="text"
        name="name"
        placeholder="Product name"
        value={product.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="brand"
        placeholder="Brand"
        value={product.brand}
        onChange={handleChange}
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={product.category}
        onChange={handleChange}
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
      />

      <input
        type="number"
        name="originalPrice"
        placeholder="Original Price"
        value={product.originalPrice}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={product.image}
        onChange={handleChange}
      />

      <input
        type="number"
        name="rating"
        placeholder="Rating"
        value={product.rating}
        onChange={handleChange}
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={product.stock}
        onChange={handleChange}
      />

      <button type="submit" disabled={isPending || isUpdating}>
        
        {isUpdating ? "Updating...." : editProduct ? "Update Prodect" : isPending ? "Adding..." : "Add Product" }
      </button>

    </form>
  )
}

export default ProductForm
