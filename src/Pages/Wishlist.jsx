

import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useQuery , useMutation} from "@tanstack/react-query"
import { getWishlist , removeWishlistItem } from "../services/wishlistService"
import { setWishlistItems , removeFromWishlist } from "../Redux/Slice/wishlistSlice"

function Wishlist() {

    const  dispatch = useDispatch();

    const items = useSelector((state) => state.wishlist.items)

    const {data: wishlistData , isLoading , isError} = useQuery({
        queryKey : ["wishlist"],
        queryFn : getWishlist,
    });

    useEffect( () => {
        if(wishlistData){
            dispatch(setWishlistItems(wishlistData))
        }
    },[wishlistData , dispatch])

    const {mutate : removeItem} = useMutation({
        mutationFn : removeWishlistItem,

        onSuccess:(_,id) => {
            dispatch(removeFromWishlist(id))
        }
    })

    if(isLoading){
        return  <p>Loading wishlist...</p>;
    }

    if(isError){
        return <p>Failed to load wishlist</p>
    }

    if(items.length === 0){
        return(
               <div>
                <h2>Wishlist is Empty</h2>
                <p>Add some products to your wishlist.</p>
            </div>
        );
    }
  return (
    <div>

        <h1>My Wishlist</h1>

        {items.map((item) => (
            <div key={item.id}>
                  
                  
                  <img src={item.image} alt={item.name} width="150"/>

                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>


                 <button
            type="button"
            onClick={() => removeItem(item.id)}
             >
                     Remove
                  </button>
            </div>
        ))}
      
    </div>
  )
}

export default Wishlist
