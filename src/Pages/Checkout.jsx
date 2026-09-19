

import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../services/orderService";
import { clearCart } from "../Redux/Slice/CartSlice";
import { clearCartItems } from "../services/cartService";
import { useNavigate } from "react-router-dom";

function Checkout() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const items = useSelector((state) => state.cart.items);

    const totalPrice = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const { mutate: placeOrder, isPending } = useMutation({
        mutationFn: createOrder,

        onSuccess: async (data) => {
            console.log("Order placed:", data);

            await clearCartItems(items);

            navigate("/orders")
            

            dispatch(clearCart());
        },
    });

    const handlePlaceOrder = () => {
        const order = {
            items: items,
            totalPrice: totalPrice,
            status: "pending",
            createdAt: new Date().toISOString(),
        };

        placeOrder(order);
    };

    return (
     <div className="min-h-screen bg-[#faf9f6] px-6 py-28 md:px-10">

     <div className="mx-auto max-w-6xl">

       {/* Header */}
         <div className="mb-10 text-center">

          <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
              Complete Your Purchase
         </p>

        <h1 className="mt-3 text-3xl font-semibold text-gray-900 md:text-4xl">
            Checkout
         </h1>

          <p className="mt-3 text-sm text-gray-500">
            Review your order before placing it
         </p>

         </div>

             {/* Checkout Content */}


             <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                    {/* Products */}

                <div className="bg-white p-6 md:p-8 lg:col-span-2">

                     <h2 className="text-lg font-medium text-gray-900">
                          Order Summary
                     </h2>

                    <div className="mt-6 space-y-5">

                        {items.map((item) => (

                            <div
                               key={item.id}
                              className="flex gap-4 border-b border-gray-100 pb-5"
                             >

                         <img
                          src={item.image}
                          alt={item.name}
                          className="h-24 w-24 shrink-0 bg-[#f5f4ef] object-cover"
                              />

                         <div className="min-w-0 flex-1">

                    <p className="text-xs uppercase tracking-wider text-gray-400">
                        {item.brand}
                    </p>

                        <h3 className="mt-1 text-sm font-medium text-gray-900">
                          {item.name}
                       </h3>

                     <p className="mt-2 text-xs text-gray-500">
                        Quantity: {item.quantity}
                    </p>

              </div>

                     <div className="text-right">

                         <p 
                         className="text-sm font-semibold text-gray-900">
                              ₹{item.price}
                         </p>

                          <p className="mt-2 text-xs text-gray-500">
                            ₹{item.price * item.quantity}
                          </p>

                      </div>

                    </div>

                      ))}

                 </div>

                    </div>

                    {/* Price Summary */}


                 <div className="h-fit bg-white p-6 md:p-8">

                    <h2 className="text-lg font-medium text-gray-900">
                       Price Details
                     </h2>

                      <div className="mt-6 space-y-4">

                     <div className="flex justify-between text-sm">
                               
                               
                         <span className="text-gray-500">
                               Items
                         </span>

                        <span className="text-gray-900">
                              {items.length}
                       </span>

                    </div>

                     <div className="flex justify-between text-sm">
                          <span className="text-gray-500">
                              Subtotal
                         </span>

                        <span className="text-gray-900">
                           ₹{totalPrice}
                        </span>

                     </div>


                <div className="flex justify-between border-b border-gray-100 pb-5 text-sm">
                     <span className="text-gray-500">
                      Delivery
                      </span>

                     <span className="text-gray-900">
                            Free
                  </span>
                </div>

                    <div className="flex justify-between pt-2">

                       <span className="font-medium text-gray-900">
                            Total
                     </span>

                 <span className="text-lg font-semibold text-gray-900">
                      ₹{totalPrice}
               </span>

                 </div>

             </div>

                    <button
                    type="button"
                     onClick={handlePlaceOrder}
                 disabled={isPending}
                      className="mt-8 w-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                            {isPending
                                ? "Placing Order..."
                                : "Place Order"}
                     </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Checkout;