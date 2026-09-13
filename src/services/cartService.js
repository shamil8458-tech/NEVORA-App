
// import axios from 'axios'


// const api = axios.create({
//     baseURL : "http://localhost:3001"
// })

// export const getcart =  async () => {
//     const response = await api.get("/cart")

//     return response.data;
// }




// export const addCartItem = async (product) => {

//     const existingItem = await api.get(`/cart?productId=${product.id}`);

//     if(existingItem.data.length > 0){
//         const item = existingItem.data[0];

//         const response = await api.patch(`/cart/${item.id}` , {
//             quantity : item.quantity + 1
//         });
//         return response.data;
        
//     }

//     const response = await api.post("/cart" , {
//          productId: product.id,
//         name: product.name,
//         brand: product.brand,
//         category: product.category,
//         price: product.price,
//         originalPrice: product.originalPrice,
//         description: product.description,
//         image: product.image,
//         rating: product.rating,
//         stock: product.stock,
//         quantity: 1,
//     });
//     return response.data
// }






// export const updateCartItem = async (id , quantity) => {
//     const response = await api.patch(`/cart/${id}` , {
//         quantity,
//     })
//     return response.data;
// }


// export const removeCartItem = async (id) => {
//     const response = await api.delete(`/cart/${id}`);

//     return response.data;
// }



import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3001"
});

export const getcart = async () => {
    // Logged user data only///

    const  userId = localStorage.getItem("userId");
    const response = await api.get(`/cart?userId=${userId}`);
    return response.data;
};

export const addCartItem = async (product) => {
     

    // specific user//

    const userId = localStorage.getItem("userId")

    const response = await api.get("/cart");

    const existingItem = response.data.find(
        (item) => String(item.productId) === String(product.id) &&
                 String(item.userId) === String(userId)
    );

    if (existingItem) {
        const updatedItem = await api.patch(
            `/cart/${existingItem.id}`,
            {
                quantity: existingItem.quantity + 1
            }
        );

        return updatedItem.data;
    }

    const newItem = await api.post("/cart", {
        userId: userId,
        productId: product.id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        originalPrice: product.originalPrice,
        description: product.description,
        image: product.image,
        rating: product.rating,
        stock: product.stock,
        quantity: 1,
    });

    return newItem.data;
};

export const updateCartItem = async (id, quantity) => {
    const response = await api.patch(`/cart/${id}`, {
        quantity,
    });

    return response.data;
};

export const removeCartItem = async (id) => {
    const response = await api.delete(`/cart/${id}`);

    return response.data;
};

export const clearCartItems = async (items) => {
    await Promise.all(
        items.map((item) => 
        api.delete(`/cart/${item.id}`))
    );
};