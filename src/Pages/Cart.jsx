
import { useDispatch, useSelector } from "react-redux";
import {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    setCartItems
} from "../Redux/Slice/CartSlice";
import { Trash2, Minus, Plus } from "lucide-react";
import { useQuery ,useMutation , useQueryClient} from "@tanstack/react-query";
import { getcart , removeCartItem , updateCartItem } from "../services/cartService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {

 const dispatch = useDispatch();
 const navigate = useNavigate();
 const queryClient = useQueryClient();

const items = useSelector((state) => state.cart.items);

const {
    data: cartData,
    isLoading,
    isError
} = useQuery({
    queryKey: ["cart"],
    queryFn: getcart,
});

useEffect(() => {
    if (cartData) {
        dispatch(setCartItems(cartData));
    }
}, [cartData, dispatch]);


const { mutate: removeItem } = useMutation({
    mutationFn: removeCartItem,

    onSuccess: (_, id) => {
        dispatch(removeFromCart(id));
        queryClient.invalidateQueries({queryKey :["cart"]})
    },
});


const { mutate: updateItem } = useMutation({
    mutationFn: ({ id, quantity }) => updateCartItem(id, quantity),

    onSuccess: (data) => {
        dispatch(
            setCartItems(
                items.map((item) =>
                    item.id === data.id ? data : item
                )
            )
        );
        queryClient.invalidateQueries({queryKey : ["cart"]})
    },
});
    const totalPrice = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );



      if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading cart...</p>
            </div>
        );
    }


    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Failed to load cart</p>
            </div>
        );
    }



    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-[#faf9f6] px-6 py-32">

                <div className="mx-auto max-w-3xl text-center">

                    <h2 className="text-3xl font-semibold text-gray-900">
                        Your Cart is Empty
                    </h2>

                    <p className="mt-3 text-sm text-gray-500">
                        Add some products to your cart.
                    </p>

                </div>

            </div>
        );
    }


    return (
        <div className="min-h-screen bg-[#faf9f6] px-6 py-28 md:px-10">

            <div className="mx-auto max-w-7xl">

                {/* Page Heading */}

                <div className="mb-12">

                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
                        Your Selection
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold text-gray-900 md:text-4xl">
                        Shopping Cart
                    </h1>

                    <p className="mt-3 text-sm text-gray-500">
                        Review your selected skincare essentials.
                    </p>

                </div>


                {/* Cart Layout */}

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">


                    {/* Products */}

                    <div className="space-y-5">

                        {items.map((item) => (

                            <div
                                key={item.id}
                                className="flex flex-col gap-5 bg-white p-4 sm:flex-row sm:items-center sm:p-5"
                            >

                                {/* Product Image */}

                                <div className="h-36 w-full shrink-0 bg-[#f5f4ef] sm:h-32 sm:w-32">

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-full w-full object-cover"
                                    />

                                </div>


                                {/* Product Information */}

                                <div className="flex flex-1 flex-col justify-between gap-4">

                                    <div>

                                        <h3 className="text-base font-medium text-gray-900">
                                            {item.name}
                                        </h3>

                                        <p className="mt-2 text-sm text-gray-500">
                                            ₹{item.price}
                                        </p>

                                    </div>


                                    <div className="flex flex-wrap items-center justify-between gap-4">


                                        {/* Quantity */}

                                        <div className="flex items-center border border-gray-300">

                                            <button
                                           onClick={() => {
                                        if (item.quantity > 1) {
                                        updateItem({
                                          id: item.id,
                                           quantity: item.quantity - 1
                                               });
                                           }
                                         }}
                                                className="p-2 text-gray-700 transition hover:bg-gray-100"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={14} />
                                            </button>


                                            <span className="min-w-10 text-center text-sm text-gray-900">
                                                {item.quantity}
                                            </span>


                                          <button
                                          onClick={() =>
                                           updateItem({
                                          id: item.id,
                                          quantity: item.quantity + 1
                                          })
                                           }
                                                className="p-2 text-gray-700 transition hover:bg-gray-100"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={14} />
                                            </button>

                                        </div>


                                        {/* Subtotal */}

                                        <p className="text-sm font-semibold text-gray-900">
                                            ₹{item.price * item.quantity}
                                        </p>


                                        {/* Remove */}

                                        <button
                                            onClick={() =>
                                                 removeItem(item.id)
                                            }
                                            className="flex items-center gap-1.5 text-xs text-gray-500 transition hover:text-gray-900"
                                        >
                                            <Trash2 size={15} />
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>


                    {/* Order Summary */}

                    <div className="h-fit bg-white p-6 md:p-7">

                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
                            Summary
                        </p>

                        <h2 className="mt-2 text-xl font-semibold text-gray-900">
                            Order Summary
                        </h2>


                        <div className="mt-7 space-y-4 border-b border-gray-200 pb-6">

                            <div className="flex justify-between text-sm text-gray-600">

                                <span>Subtotal</span>

                                <span>
                                    ₹{totalPrice}
                                </span>

                            </div>


                            <div className="flex justify-between text-sm text-gray-600">

                                <span>Shipping</span>

                                <span>Free</span>

                            </div>

                        </div>


                        <div className="mt-5 flex justify-between">

                            <span className="text-sm font-medium text-gray-900">
                                Total
                            </span>

                            <span className="text-lg font-semibold text-gray-900">
                                ₹{totalPrice}
                            </span>

                        </div>


                        <button type="button"
                           onClick={() => navigate("/checkout")}
                            className="mt-7 w-full bg-[#243b2a] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#1c3021]"
                        >
                            PROCEED TO CHECKOUT
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Cart;