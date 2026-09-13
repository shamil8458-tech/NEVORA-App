

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
        return (
                 <div className="flex min-h-screen items-center justify-center bg-[#faf9f6]">
                <p className="text-sm text-gray-500">
                    Loading wishlist...
                </p>
            </div>
        )
    }

    if(isError){
        return (
               <div className="flex min-h-screen items-center justify-center bg-[#faf9f6]">
                <p className="text-sm text-red-500">
                    Failed to load wishlist
                </p>
            </div>
        )
    }

    if(items.length === 0){
        return(
               <div className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-6">
                <div className="text-center">
                   <h2 className="text-2xl font-semibold text-gray-900"> Your Wishlist is Empty</h2>
                    <p className="mt-3 text-sm text-gray-500"
                    >Save your favourite skincare products here.</p>
                </div>
               
            </div>
        );
    }
  return (
    <div className="min-h-screen bg-[#faf9f6] px-6 py-28 md:px-10">

    <div className="mx-auto max-w-7xl">
          

          {/* //Header/// */}
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                Your Collection
            </p>

            <h1 className="mt-3 text-3xl font-semibold text-gray-900 md:text-4xl">
               My Wishlist
            </h1>

            <p className="mt-3 text-sm text-gray-500">
               Products you've saved for later
            </p>

          </div>


          {/* ///Products/// */}

           <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">

                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="group bg-white"
                        >

                            <div className="relative overflow-hidden bg-[#f5f4ef]">

                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                                />

                            </div>

                            <div className="px-4 py-5 text-center">

                                <p className="text-xs uppercase tracking-wider text-gray-400">
                                    {item.brand}
                                </p>

                                <h3 className="mt-2 text-sm font-medium text-gray-900">
                                    {item.name}
                                </h3>

                                <p className="mt-2 text-sm font-semibold text-gray-900">
                                    ₹{item.price}
                                </p>

                                <button
                                    type="button"
                                    onClick={() => removeItem(item.id)}
                                    className="mt-5 border border-gray-300 px-6 py-2 text-xs font-medium text-gray-700 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                                >
                                    Remove
                                </button>

                            </div>

                        </div>
                    ))}

                </div>
      
    </div>

    </div>
  )
}

export default Wishlist
