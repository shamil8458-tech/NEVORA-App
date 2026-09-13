import axios from 'axios'

const api = axios.create({
    baseURL : "http://localhost:3001"
})

export const getWishlist = async () => {

    //uniq user find//

    const userId = localStorage.getItem("userId")
    const response = await api.get(`/wishlist?userId=${userId}`);
    return response.data;
}

export const addWidhListItem = async (product) => {

    // unq user////

    const userId = localStorage.getItem("userId")
    const response = await api.get("/wishlist");

    const existingItem = response.data.find(
        (item) => String(item.productId) === String(product.id) &&
                 String(item.userId) === String(userId)
    );

    if(existingItem){
        return existingItem;
    }

    const newItem = await api.post("/wishlist" , {
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
    })
    return newItem.data;
}

export const removeWishlistItem = async (id) => {
    const response = await api.delete(`/wishlist/${id}`);
    return response.data;
}