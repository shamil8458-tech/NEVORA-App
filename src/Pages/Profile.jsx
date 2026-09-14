import { useQuery } from "@tanstack/react-query"
import {useNavigate} from 'react-router-dom'
import { User, Mail, ShoppingBag, Heart } from "lucide-react";
import { getUserById } from "../services/userService";

function Profile() {

    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");

    const {data: user , isLoading , isError} = useQuery({
        queryKey : ["user" , userId],
        queryFn : () => getUserById(userId),
        enabled: !!userId,
    });
     

    if(isLoading){
        return (
             <div className="flex min-h-screen items-center justify-center bg-[#faf9f6]">
                <p className="text-sm text-gray-500">
                    Loading profile...
                </p>
            </div>
        )
    }

    if(isError){
        return(
            <div className="flex min-h-screen items-center justify-center bg-[#faf9f6]">
                <p className="text-sm text-red-500">
                    Failed to load profile
                </p>
            </div>
        )
    }
  return (
    <div className="min-h-screen bg-[#faf9f6] px-5 py-28 md:px-10 ">

        <div className="mx-auto max-w-5xl ">

            {/* //Heading// */}
            {/* <div className="mb-10 text-center">

                <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                    My Account
                </p>

                <h1 className="mt-3 text-3xl font-semibold text-gray-900 md:text-4xl">
                      Profile
                </h1>

            </div> */}


            {/* //Profile card/// */}

            <div className="grid grid-cols-1 overflow-hidden bg-white md:grid-cols-2 rounded-2xl shadow-2xl">

                {/* //image// */}

                <div className="min-h-[400px] bg-[#f5f4ef]">

                    <img 
                    src="/Profile/profile-skincare3.jpg" 
                    alt="Skincare" 
                    className="h-full w-full object-cover"/>

                </div>

                {/* //Details//// */}

                <div className="p-7 md:p-10">

                    <h2 className="text-xl font-semibold text-gray-900">
                         Welcome, {user.name}
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Your account details
                    </p>

                    {/* //Name/// */}

                    <div className="mt-8 flex items-center gap-4 border-b border-gray-100 pb-5">

                        <div className="flex h-10 w-10 items-center justify-center bg-[#f5f4ef]">
                             <User size={18} />
                        </div>

                        <div>
                            <p className="text-xs text-gray-400">
                                    Name
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-900">
                                  {user.name}
                            </p>
                        </div>

                    </div>

                    {/* //Email// */}

                    <div className="mt-5 flex items-center gap-4 border-b border-gray-100 pb-5">
                            
                            <div className="flex h-10 w-10 items-center justify-center bg-[#f5f4ef]">
                                 <Mail size={18} />
                            </div>

                            <div> 
                                <p className="text-xs text-gray-400">
                                    Email
                                </p>

                                <p className="mt-1 text-sm font-medium text-gray-900">
                                     {user.email}
                                </p>

                            </div>
                    </div>

                    {/* //Acc link/// */}

                    <div className="mt-8 space-y-3">

                        {/* //Cart/// */}

                        <button 
                        type="button"
                        onClick={() => navigate("/cart")}
                        className="flex w-full items-center justify-between border border-gray-200 px-5 py-4 text-sm text-gray-800 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                        >

                            <span className="flex items-center gap-3">
                                <ShoppingBag size={18} />
                                    My Cart
                            </span>

                             <span>→</span>
                      
                        </button>

                        {/* //Wishlist//// */}

                        <button
                        type="button"
                        onClick={() => navigate("/wishlist")}
                        className="flex w-full items-center justify-between border border-gray-200 px-5 py-4 text-sm text-gray-800 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                        >

                            <span className="flex text-center gap-3">
                                    <Heart size={18} />
                                    My Wishlist
                            </span>

                            <span>→</span>

                        </button>

                        {/* //Orders//// */}

                        <button
                        type="button"
                        onClick={() => navigate("/orders")}
                        className="flex w-full items-center justify-between border border-gray-200 px-5 py-4 text-sm text-gray-800 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                        >

                            <span className="flex items-center gap-3">
                                 <ShoppingBag size={18} />
                                    Your Orders
                            </span>

                             <span>→</span>
                          
                        </button>
                       

                    </div>

                </div>

            </div>

        </div>
      
    </div>
  )
}

export default Profile
