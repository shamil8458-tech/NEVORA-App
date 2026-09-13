import { useQuery } from "@tanstack/react-query"
import { getOrders } from "../services/orderService"

function Orders() {

    const {data : orders , isLoading , isError} = useQuery({
        queryKey : ["orders"],
        queryFn : getOrders
    });

    if(isLoading){
          return (
            <div className="flex min-h-screen items-center justify-center bg-[#faf9f6]">
                <p className="text-sm text-gray-500">
                    Loading orders...
                </p>
            </div>
        );
    }

    if(isError){
           return (
            <div className="flex min-h-screen items-center justify-center bg-[#faf9f6]">
                <p className="text-sm text-red-500">
                    Failed to load orders
                </p>
            </div>
        );
    }

    if(orders.length === 0){
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-6">
                <div className="text-center">

                    <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                        Your Orders
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold text-gray-900">
                        No Orders Yet
                    </h2>

                    <p className="mt-3 text-sm text-gray-500">
                        Your completed orders will appear here.
                    </p>

                </div>
            </div>
        );
    }
  return (
    <div className="min-h-screen bg-[#faf9f6] px-6 py-28 md:px-10">

    
    <div className="mx-auto max-w-5xl">

        {/* Header/// */}

        <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.25] text-gray-500">
                 Your Collection
            </p>

            <h1 className="mt-3 text-3xl font-semibold text-gray-900 md:text-4xl">
                My Orders
            </h1>

            <p className="mt-3 text-sm text-gray-500">
                   View your recent purchases
            </p>

        </div>


        {/* Orders/// */}


           <div className="space-y-6">

         {orders.map((order) => (

      <div
               key={order.id}
                   className="bg-white p-6 md:p-8"
                >

          {/* Order Header */}
          <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-center sm:justify-between">

                 <div>
          <p className="text-xs uppercase tracking-wider text-gray-400">
                      Order ID
          </p>

        <h3 className="mt-1 text-sm font-medium text-gray-900">
              #{order.id}
        </h3>


           </div>

              <div className="sm:text-right">

                     <span className="inline-block bg-[#f5f4ef] px-4 py-1.5 text-xs font-medium capitalize text-gray-700">
                             {order.status}
                    </span>

                      <p className="mt-2 text-sm font-semibold text-gray-900">
                         ₹{order.totalPrice}
                     </p>

              </div>

          </div>

              {/* Products */}


         <div className="mt-6">

             <h4 className="text-sm font-medium text-gray-900">
                    Products
             </h4>

             <div className="mt-4 space-y-4">

                  {order.items.map((item) => (

                  <div
                    key={item.id}
                      className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                   >

                      <img
                       src={item.image}
                       alt={item.name}
                       className="h-20 w-20 shrink-0 object-cover bg-[#f5f4ef]"
                      />

          <div className="min-w-0 flex-1">

              <h5 className="truncate text-sm font-medium text-gray-900">
                     {item.name}
             </h5>

           <p className="mt-1 text-xs text-gray-500">
              Quantity: {item.quantity}
          </p>

             </div>

                 <p className="text-sm font-medium text-gray-900">
                           ₹{item.price * item.quantity}
                </p>

               </div>

                 ))}

              </div>

          </div>
   
       </div>

      ))}

   </div>

    </div>

    </div>
  )
}

export default Orders
