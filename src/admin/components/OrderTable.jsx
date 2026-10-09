
// function OrderTable({ orders ,onStatusChange , onView }) {
//   return (
//     <table>

//         <thead>
//             <tr>
//                <th>Order ID</th>
//                <th>User ID</th>
//                <th>Total Price</th>
//                <th>Status</th>
//                <th>Created At</th>
//                 <th>Action</th>
//             </tr>
//         </thead>
//         <tbody>
//             {orders.map((order) => (
//                 <tr key={order.id}>
                   
//                <td>{order.id}</td>
//                <td>{order.userId}</td>
//                <td>₹{order.totalPrice}</td>

//                <td>
//                 <select value={order.status}
//                      onChange={(e) => 
//                          onStatusChange(order.id , e.target.value)
//                      }>
//                           <option value="pending">Pending</option>
//                      <option value="confirmed">Confirmed</option>
//                      <option value="shipped">Shipped</option>
//                      <option value="delivered">Delivered</option>
//                      <option value="cancelled">Cancelled</option>
//                 </select>
//              </td>

//                   <td>
//                      {new Date(order.createdAt).toLocaleDateString()}
               
//                  </td>

//             <td>
//                 <button onClick={() => onView(order)}>
//                     View
//                 </button>
//             </td>


//                 </tr>

//             ))}

//         </tbody>

//     </table>
//   )
// }

// export default OrderTable
























function OrderTable({  orders,  onStatusChange,  onView}) {

  return (

    <div className="overflow-x-auto">

      <table className="w-full min-w-[850px] text-left">

        {/* Header */}

        <thead>

          <tr className="border-b border-stone-200">

            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
              Order ID
            </th>

            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
              User ID
            </th>

            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
              Total
            </th>

            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
              Status
            </th>

            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
              Date
            </th>

            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
              Action
            </th>

          </tr>

        </thead>


        {/* Body */}

        <tbody>

          {orders.map((order) => (

            <tr
              key={order.id}
              className="border-b border-stone-100 transition hover:bg-stone-50"
            >

              {/* Order ID */}

              <td className="px-4 py-4">

                <p className="text-sm font-semibold text-stone-800">
                  #{order.id}
                </p>

              </td>


              {/* User ID */}

              <td className="px-4 py-4 text-sm text-stone-600">

                {order.userId}

              </td>


              {/* Total */}

              <td className="px-4 py-4">

                <p className="text-sm font-semibold text-stone-800">
                  ₹{order.totalPrice}
                </p>

              </td>


              {/* Status */}

              <td className="px-4 py-4">

                <select
                  value={order.status}
                  onChange={(e) =>
                    onStatusChange(
                      order.id,
                      e.target.value
                    )
                  }
                  className={`
                    rounded-lg border px-3 py-2 text-xs font-medium outline-none transition
                    ${
                      order.status === "pending"
                        ? "border-amber-100 bg-amber-50 text-amber-700"
                        : order.status === "confirmed"
                        ? "border-blue-100 bg-blue-50 text-blue-700"
                        : order.status === "shipped"
                        ? "border-purple-100 bg-purple-50 text-purple-700"
                        : order.status === "delivered"
                        ? "border-green-100 bg-green-50 text-green-700"
                        : "border-red-100 bg-red-50 text-red-600"
                    }
                  `}
                >

                  <option value="pending">
                    Pending
                  </option>

                  <option value="confirmed">
                    Confirmed
                  </option>

                  <option value="shipped">
                    Shipped
                  </option>

                  <option value="delivered">
                    Delivered
                  </option>

                  <option value="cancelled">
                    Cancelled
                  </option>

                </select>

              </td>


              {/* Date */}

              <td className="px-4 py-4 text-sm text-stone-500">

                {new Date(
                  order.createdAt
                ).toLocaleDateString()}

              </td>


              {/* Action */}

              <td className="px-4 py-4">

                <button
                  type="button"
                  onClick={() => onView(order)}
                  className="rounded-lg border border-stone-200 px-3 py-2 text-xs font-medium text-stone-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  View
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>


      {/* Empty State */}

      {orders.length === 0 && (

        <div className="flex flex-col items-center justify-center py-12">

          <p className="text-sm font-medium text-stone-600">
            No orders found
          </p>

          <p className="mt-1 text-xs text-stone-400">
            Customer orders will appear here.
          </p>

        </div>

      )}

    </div>

  );
}

export default OrderTable;