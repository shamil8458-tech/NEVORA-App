// import {useDispatch , useSelector} from 'react-redux'
// import {useQuery , useMutation , useQueryClient} from '@tanstack/react-query'

// import  {getAdminOrders , updateOrderStatus} from '../services/adminOrderService'
// import { setOrders } from '../redux/slices/adminOrderSlice'
// import OrderTable from '../components/OrderTable'
// import { useState } from 'react'



// import usePagination from '../../Hooks/usePagination'
// import Pagination from '../components/Pagination'


// function Orders() {

//   const dispatch = useDispatch();
//   const queryClient = useQueryClient();

//   const [selectedOrder , setSelectedOrder] = useState(null)

//   const orders = useSelector((state) => state.adminOrders.orders);


//   const {currentPage , totalPages , currentItems ,changePage} = usePagination(orders , 10)

//   const {isLoading , isError} = useQuery({
//     queryKey : ["adminOrders"],

//     queryFn : async () => {
//         const data = await getAdminOrders();


//         dispatch(setOrders(data))

//         return data;
//     },
//   });


//   const {mutate: changeStatus} = useMutation({
//     mutationFn : updateOrderStatus,


//     onSuccess : () => {
//       queryClient.invalidateQueries({
//         queryKey : ["adminOrders"]
//       })
//     }
//   })

//   const handleStatusChange = (id , status) => {

//     changeStatus({
//       id,
//       status
//     });
//   }


//   const handleView = (order) => {
//     setSelectedOrder(order)
//   };


//   if(isLoading){
//     return <p>Loading orders...</p>;
//   }

//   if(isError){
//     return <p>Failed to load orders</p>
//   }
//   return (
//     <div>

//       <h2>Orders</h2>


//       <OrderTable
//       orders={currentItems}
//       onStatusChange={handleStatusChange}
//       onView={handleView}/>


//       {selectedOrder && (
//                 <div>

//           <h2>Order Details</h2>

//           <p>
//             <strong>Order ID:</strong>{" "}
//             {selectedOrder.id}
//           </p>

//           <p>
//             <strong>User ID:</strong>{" "}
//             {selectedOrder.userId}
//           </p>

//           <p>
//             <strong>Status:</strong>{" "}
//             {selectedOrder.status}
//           </p>

//           <p>
//             <strong>Total:</strong>{" "}
//             ₹{selectedOrder.totalPrice}
//           </p>

//           <p>
//             <strong>Date:</strong>{" "}
//             {new Date(
//               selectedOrder.createdAt
//             ).toLocaleDateString()}
//           </p>


//                    <h3>Products</h3>


//           {selectedOrder.items.map((item) => (

//             <div key={item.id}>

//               <p>
//                 <strong>{item.name}</strong>
//               </p>

//               <p>
//                 Brand: {item.brand}
//               </p>

//               <p>
//                 Price: ₹{item.price}
//               </p>

//               <p>
//                 Quantity: {item.quantity}
//               </p>

//               <p>
//                 Subtotal: ₹{item.price * item.quantity}
//               </p>

//               <hr />

//             </div>

//           ))}


//           <button
//             onClick={() => setSelectedOrder(null)}
//           >
//             Close
//           </button>






          

//         </div>
//       )}

//       <Pagination 
//       currentPage={currentPage}
//       totalPage={totalPages}
//       onPageChange={changePage}/>
      
//     </div>
//   )
// }

// export default Orders


































import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  useQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";

import {
  getAdminOrders,
  updateOrderStatus
} from "../services/adminOrderService";

import { setOrders } from "../redux/slices/adminOrderSlice";

import OrderTable from "../components/OrderTable";

import usePagination from "../../Hooks/usePagination";
import Pagination from "../components/Pagination";

import { useState } from "react";


function Orders() {

  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const [selectedOrder, setSelectedOrder] = useState(null);


  const orders = useSelector(
    (state) => state.adminOrders.orders
  );


  const {
    currentPage,
    totalPages,
    currentItems,
    changePage
  } = usePagination(orders, 10);


  // Get orders

  const {
    isLoading,
    isError
  } = useQuery({

    queryKey: ["adminOrders"],

    queryFn: async () => {

      const data = await getAdminOrders();

      dispatch(setOrders(data));

      return data;
    },

  });


  // Change order status

  const {
    mutate: changeStatus
  } = useMutation({

    mutationFn: updateOrderStatus,

    onSuccess: (_,data) => {

      queryClient.invalidateQueries({
        queryKey: ["adminOrders"]
      });

       toast.success(
      `Order status changed to ${data.status}`
    );

    },
      onError: () => {

    toast.error("Failed to update order status");

  }

  });


  const handleStatusChange = (id, status) => {

    changeStatus({
      id,
      status
    });

  };


  // View order details

  const handleView = (order) => {

    setSelectedOrder(order);

  };


  // Loading

  if (isLoading) {

    return (
      <div className="flex min-h-[300px] items-center justify-center">

        <p className="text-sm text-stone-500">
          Loading orders...
        </p>

      </div>
    );

  }


  // Error

  if (isError) {

    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6">

        <p className="text-sm text-red-600">
          Failed to load orders
        </p>

      </div>
    );

  }


  return (

    <div className="space-y-8">

      {/* Page Header */}

      <div>

        <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-700">
          Store Management
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          Orders
        </h1>

        <p className="mt-2 text-sm text-stone-500">
          Manage customer orders and update their status.
        </p>

      </div>


      {/* Orders Card */}

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">

        {/* Card Header */}

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-lg font-semibold text-stone-900">
              Order List
            </h2>

            <p className="mt-1 text-sm text-stone-500">
              View and manage all customer orders
            </p>

          </div>


          {/* Order Count */}

          <div className="rounded-full bg-emerald-50 px-4 py-2">

            <span className="text-sm font-medium text-emerald-700">
              {orders.length} Orders
            </span>

          </div>

        </div>


        {/* Order Table */}

        <OrderTable
          orders={currentItems}
          onStatusChange={handleStatusChange}
          onView={handleView}
        />


        {/* Pagination */}

        <div className="mt-6 border-t border-stone-100 pt-5">

          <Pagination
            currentPage={currentPage}
            totalPage={totalPages}
            onPageChange={changePage}
          />

        </div>

      </div>


      {/* Order Details */}

      {selectedOrder && (

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">

          {/* Details Header */}

          <div className="mb-6 flex items-center justify-between">

            <div>

              <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-700">
                Order Details
              </p>

              <h2 className="mt-2 text-xl font-semibold text-stone-900">
                Order #{selectedOrder.id}
              </h2>

            </div>


            <button
              type="button"
              onClick={() => setSelectedOrder(null)}
              className="rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
            >
              Close
            </button>

          </div>


          {/* Order Information */}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

            <div className="rounded-xl bg-stone-50 p-4">

              <p className="text-xs text-stone-400">
                Order ID
              </p>

              <p className="mt-1 text-sm font-semibold text-stone-800">
                {selectedOrder.id}
              </p>

            </div>


            <div className="rounded-xl bg-stone-50 p-4">

              <p className="text-xs text-stone-400">
                User ID
              </p>

              <p className="mt-1 text-sm font-semibold text-stone-800">
                {selectedOrder.userId}
              </p>

            </div>


            <div className="rounded-xl bg-stone-50 p-4">

              <p className="text-xs text-stone-400">
                Status
              </p>

              <p className="mt-1 text-sm font-semibold capitalize text-emerald-700">
                {selectedOrder.status}
              </p>

            </div>


            <div className="rounded-xl bg-stone-50 p-4">

              <p className="text-xs text-stone-400">
                Total
              </p>

              <p className="mt-1 text-sm font-semibold text-stone-800">
                ₹{selectedOrder.totalPrice}
              </p>

            </div>

          </div>


          {/* Date */}

          <div className="mt-4">

            <p className="text-xs text-stone-400">
              Order Date
            </p>

            <p className="mt-1 text-sm text-stone-700">
              {new Date(
                selectedOrder.createdAt
              ).toLocaleDateString()}
            </p>

          </div>


          {/* Products */}

          <div className="mt-8">

            <h3 className="mb-4 text-lg font-semibold text-stone-900">
              Products
            </h3>


            <div className="space-y-3">

              {selectedOrder.items.map((item) => (

                <div
                  key={item.id}
                  className="rounded-xl border border-stone-100 bg-stone-50 p-4"
                >

                  <div className="flex flex-col justify-between gap-3 md:flex-row">

                    <div>

                      <p className="text-sm font-semibold text-stone-900">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-stone-500">
                        Brand: {item.brand}
                      </p>

                    </div>


                    <div className="grid grid-cols-3 gap-6 text-sm">

                      <div>

                        <p className="text-xs text-stone-400">
                          Price
                        </p>

                        <p className="mt-1 font-medium text-stone-700">
                          ₹{item.price}
                        </p>

                      </div>


                      <div>

                        <p className="text-xs text-stone-400">
                          Quantity
                        </p>

                        <p className="mt-1 font-medium text-stone-700">
                          {item.quantity}
                        </p>

                      </div>


                      <div>

                        <p className="text-xs text-stone-400">
                          Subtotal
                        </p>

                        <p className="mt-1 font-semibold text-stone-800">
                          ₹{item.price * item.quantity}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      )}

    </div>

  );
}

export default Orders;