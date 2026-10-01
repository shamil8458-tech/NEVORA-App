
// import toast from "react-hot-toast";
// import { useSelector, useDispatch } from "react-redux";
// import { useMutation } from "@tanstack/react-query";
// import { createOrder } from "../services/orderService";
// import { clearCart } from "../Redux/Slice/CartSlice";
// import { clearCartItems } from "../services/cartService";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// function Checkout() {

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [customer , setCustomer] = useState({
//         name: "",
//         email : "",
//         phone: "",
//         address: "",
//         city : "",
//         pincode: "",
//     })

//     const [paymentMethod , setPaymethod] = useState("cod")

//     const items = useSelector((state) => state.cart.items);

//     const totalPrice = items.reduce(
//         (total, item) => total + item.price * item.quantity,
//         0
//     );

//     const { mutate: placeOrder, isPending } = useMutation({
//         mutationFn: createOrder,

//         onSuccess: async (data) => {
//             console.log("Order placed:", data);

//             await clearCartItems(items);

//             navigate("/orders")
            

//             dispatch(clearCart());
//         },
//     });

//     const handlePlaceOrder = () => {
    

//         if(!customer.name ||
//             !customer.email ||
//             !customer.phone || 
//             !customer.address ||
//             !customer.city ||
//             !customer.pincode
//         ){

//           toast("Please fill all customer details")
//           return
//         }


//         const order = {
//             items: items,
//             totalPrice: totalPrice,
//             status: "pending",
//             createdAt: new Date().toISOString(),

//             customer: customer,

//             paymentMethod : paymentMethod,
//         };

//         placeOrder(order);
//     };

//     return (
//      <div className="min-h-screen bg-[#faf9f6] px-6 py-28 md:px-10">

//      <div className="mx-auto max-w-6xl">

//        {/* Header */}
//          <div className="mb-10 text-center">

//           <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
//               Complete Your Purchase
//          </p>

//         <h1 className="mt-3 text-3xl font-semibold text-gray-900 md:text-4xl">
//             Checkout
//          </h1>

//           <p className="mt-3 text-sm text-gray-500">
//             Review your order before placing it
//          </p>

//          </div>

//              {/* Checkout Content */}


//              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

//                 {/* Customer Information */}

//                 <div>

//                     <h2>Customer Informatio</h2>

//                     <input type="text"
//                     placeholder="Full Name"
//                     value={customer.name}
//                     onChange={(e) => 
//                         setCustomer({
//                             ...customer,
//                             name: e.target.value
//                         })
//                     } />


//                     <input type="email" 
//                     placeholder="Email"
//                     value={customer.email}
//                     onChange={(e) => 
//                         setCustomer({
//                             ...customer ,
//                             email: e.target.value
//                         })
//                     } />


//                     <input type="number" 
//                     placeholder="Phone Number"
//                     value={customer.phone}
//                     onChange={(e) => 
//                         setCustomer({
//                             ...customer , 
//                             phone: e.target.value
//                         })
//                     }/>

//                     <input type="text"
//                     placeholder="Address"
//                     value={customer.address}
//                     onChange={(e) => 
//                         setCustomer({
//                             ...customer ,
//                             address: e.target.value
//                         })
//                     } />


//                     <input type="text"
//                     placeholder="City" 
//                     value={customer.city}
//                     onChange={(e) => 
//                         setCustomer({
//                             ...customer ,
//                             city: e.target.value
//                         })
//                     } />

//                     <input type="number"
//                     placeholder="PinCode"
//                     value={customer.pincode}
//                     onChange={(e) => 
//                         setCustomer({
//                             ...customer ,
//                             pincode: e.target.value
//                         })
//                     } />


//                 </div>
   


//               {/* ///Payment Method/// */}

//                 <div>

//                     <h2>Payment Method</h2>


//                     <label>

//                         <input type="radio"
//                         name="paymentMethod" 
//                         value="cod"
//                         checked={paymentMethod === "cod"}
//                         onChange={(e) => setPaymethod(e.target.value)}
//                         />
//                          Cash on Delivery
//                     </label>

//                     <label >

//                         <input type="radio"
//                         name="paymentMethod"
//                         value="online"
//                         checked={paymentMethod === "online"} 
//                         onChange={(e) => setPaymethod(e.target.value)}
//                         />

//                         Online Payment
//                     </label>

//                 </div>


//                     {/* Products */}

//                 <div className="bg-white p-6 md:p-8 lg:col-span-2">

//                      <h2 className="text-lg font-medium text-gray-900">
//                           Order Summary
//                      </h2>

//                     <div className="mt-6 space-y-5">

//                         {items.map((item) => (

//                             <div
//                                key={item.id}
//                               className="flex gap-4 border-b border-gray-100 pb-5"
//                              >

//                          <img
//                           src={item.image}
//                           alt={item.name}
//                           className="h-24 w-24 shrink-0 bg-[#f5f4ef] object-cover"
//                               />

//                          <div className="min-w-0 flex-1">

//                     <p className="text-xs uppercase tracking-wider text-gray-400">
//                         {item.brand}
//                     </p>

//                         <h3 className="mt-1 text-sm font-medium text-gray-900">
//                           {item.name}
//                        </h3>

//                      <p className="mt-2 text-xs text-gray-500">
//                         Quantity: {item.quantity}
//                     </p>

//               </div>

//                      <div className="text-right">

//                          <p 
//                          className="text-sm font-semibold text-gray-900">
//                               ₹{item.price}
//                          </p>

//                           <p className="mt-2 text-xs text-gray-500">
//                             ₹{item.price * item.quantity}
//                           </p>

//                       </div>

//                     </div>

//                       ))}

//                  </div>

//                     </div>

//                     {/* Price Summary */}


//                  <div className="h-fit bg-white p-6 md:p-8">

//                     <h2 className="text-lg font-medium text-gray-900">
//                        Price Details
//                      </h2>

//                       <div className="mt-6 space-y-4">

//                      <div className="flex justify-between text-sm">
                               
                               
//                          <span className="text-gray-500">
//                                Items
//                          </span>

//                         <span className="text-gray-900">
//                               {items.length}
//                        </span>

//                     </div>

//                      <div className="flex justify-between text-sm">
//                           <span className="text-gray-500">
//                               Subtotal
//                          </span>

//                         <span className="text-gray-900">
//                            ₹{totalPrice}
//                         </span>

//                      </div>


//                 <div className="flex justify-between border-b border-gray-100 pb-5 text-sm">
//                      <span className="text-gray-500">
//                       Delivery
//                       </span>

//                      <span className="text-gray-900">
//                             Free
//                   </span>
//                 </div>

//                     <div className="flex justify-between pt-2">

//                        <span className="font-medium text-gray-900">
//                             Total
//                      </span>

//                  <span className="text-lg font-semibold text-gray-900">
//                       ₹{totalPrice}
//                </span>

//                  </div>

//              </div>

//                     <button
//                     type="button"
//                      onClick={handlePlaceOrder}
//                  disabled={isPending}
//                       className="mt-8 w-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400"
//                     >
//                             {isPending
//                                 ? "Placing Order..."
//                                 : "Place Order"}
//                      </button>

//                     </div>

//                 </div>

//             </div>

//         </div>
//     );
// }

// export default Checkout;

























import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../services/orderService";
import { clearCart } from "../Redux/Slice/CartSlice";
import { clearCartItems } from "../services/cartService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Checkout() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [customer , setCustomer] = useState({
        name: "",
        email : "",
        phone: "",
        address: "",
        city : "",
        pincode: "",
    })

    const [paymentMethod , setPaymethod] = useState("cod")

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
    

        if(!customer.name ||
            !customer.email ||
            !customer.phone || 
            !customer.address ||
            !customer.city ||
            !customer.pincode
        ){

          toast("Please fill all customer details")
          return
        }


        const order = {
            items: items,
            totalPrice: totalPrice,
            status: "pending",
            createdAt: new Date().toISOString(),

            customer: customer,

            paymentMethod : paymentMethod,
        };

        placeOrder(order);
    };

    return (
    <div className="min-h-screen bg-[#faf9f6] px-5 py-24 md:px-8 md:py-28">

        <div className="mx-auto max-w-6xl">

            {/* Header */}
            <div className="mb-12 text-center">

                <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
                    Complete Your Purchase
                </p>

                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
                    Checkout
                </h1>

                <p className="mt-3 text-sm text-gray-500">
                    Review your details before placing your order
                </p>

            </div>


            {/* Checkout Content */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">


                {/* ================= LEFT SIDE ================= */}
                <div className="space-y-6">


                    {/* Customer Information */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">

                        <div className="mb-7">

                            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                                Delivery Details
                            </p>

                            <h2 className="mt-2 text-xl font-semibold text-gray-900">
                                Customer Information
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Enter your delivery information
                            </p>

                        </div>


                        <div className="space-y-5">


                            {/* Full Name */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={customer.name}
                                    onChange={(e) =>
                                        setCustomer({
                                            ...customer,
                                            name: e.target.value
                                        })
                                    }
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
                                />
                            </div>


                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={customer.email}
                                    onChange={(e) =>
                                        setCustomer({
                                            ...customer,
                                            email: e.target.value
                                        })
                                    }
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
                                />
                            </div>


                            {/* Phone */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>

                                <input
                                    type="number"
                                    placeholder="Enter your phone number"
                                    value={customer.phone}
                                    onChange={(e) =>
                                        setCustomer({
                                            ...customer,
                                            phone: e.target.value
                                        })
                                    }
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
                                />
                            </div>


                            {/* Address */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Address
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter your address"
                                    value={customer.address}
                                    onChange={(e) =>
                                        setCustomer({
                                            ...customer,
                                            address: e.target.value
                                        })
                                    }
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
                                />
                            </div>


                            {/* City + Pincode */}
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        City
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter your city"
                                        value={customer.city}
                                        onChange={(e) =>
                                            setCustomer({
                                                ...customer,
                                                city: e.target.value
                                            })
                                        }
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
                                    />
                                </div>


                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Pincode
                                    </label>

                                    <input
                                        type="number"
                                        placeholder="Pincode"
                                        value={customer.pincode}
                                        onChange={(e) =>
                                            setCustomer({
                                                ...customer,
                                                pincode: e.target.value
                                            })
                                        }
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
                                    />
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Payment Method */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">

                        <div className="mb-6">

                            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                                Payment
                            </p>

                            <h2 className="mt-2 text-xl font-semibold text-gray-900">
                                Payment Method
                            </h2>

                        </div>


                        <div className="space-y-3">


                            {/* COD */}
                            <label
                                className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                                    paymentMethod === "cod"
                                        ? "border-gray-900 bg-gray-50"
                                        : "border-gray-200 bg-white hover:border-gray-400"
                                }`}
                            >

                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cod"
                                    checked={paymentMethod === "cod"}
                                    onChange={(e) => setPaymethod(e.target.value)}
                                    className="h-4 w-4 accent-gray-900"
                                />

                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        Cash on Delivery
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Pay when your order arrives
                                    </p>
                                </div>

                            </label>


                            {/* Online Payment */}
                            <label
                                className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                                    paymentMethod === "online"
                                        ? "border-gray-900 bg-gray-50"
                                        : "border-gray-200 bg-white hover:border-gray-400"
                                }`}
                            >

                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="online"
                                    checked={paymentMethod === "online"}
                                    onChange={(e) => setPaymethod(e.target.value)}
                                    className="h-4 w-4 accent-gray-900"
                                />

                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        Online Payment
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Pay securely online
                                    </p>
                                </div>

                            </label>

                        </div>

                    </div>

                </div>


                {/* ================= RIGHT SIDE ================= */}
                <div className="space-y-6">


                    {/* Order Summary */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">

                        <div className="mb-7">

                            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                                Your Order
                            </p>

                            <h2 className="mt-2 text-xl font-semibold text-gray-900">
                                Order Summary
                            </h2>

                        </div>


                        <div className="space-y-5">

                            {items.map((item) => (

                                <div
                                    key={item.id}
                                    className="flex gap-4 border-b border-gray-100 pb-5 last:border-0 last:pb-0"
                                >

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-24 w-24 shrink-0 rounded-xl bg-[#f5f4ef] object-cover"
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

                                        <p className="text-sm font-semibold text-gray-900">
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


                    {/* Price Details + Place Order */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">

                        <div className="mb-7">

                            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                                Summary
                            </p>

                            <h2 className="mt-2 text-xl font-semibold text-gray-900">
                                Price Details
                            </h2>

                        </div>


                        <div className="space-y-4">


                            {/* Items */}
                            <div className="flex justify-between text-sm">

                                <span className="text-gray-500">
                                    Items
                                </span>

                                <span className="font-medium text-gray-900">
                                    {items.length}
                                </span>

                            </div>


                            {/* Subtotal */}
                            <div className="flex justify-between text-sm">

                                <span className="text-gray-500">
                                    Subtotal
                                </span>

                                <span className="text-gray-900">
                                    ₹{totalPrice}
                                </span>

                            </div>


                            {/* Delivery */}
                            <div className="flex justify-between border-b border-gray-100 pb-5 text-sm">

                                <span className="text-gray-500">
                                    Delivery
                                </span>

                                <span className="font-medium text-gray-900">
                                    Free
                                </span>

                            </div>


                            {/* Total */}
                            <div className="flex items-center justify-between pt-2">

                                <span className="font-semibold text-gray-900">
                                    Total
                                </span>

                                <span className="text-2xl font-semibold text-gray-900">
                                    ₹{totalPrice}
                                </span>

                            </div>


                            {/* Place Order */}
                            <button
                                type="button"
                                onClick={handlePlaceOrder}
                                disabled={isPending}
                                className="mt-5 w-full rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
                            >
                                {isPending
                                    ? "Placing Order..."
                                    : "Place Order"}
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>
);
}

export default Checkout;
























