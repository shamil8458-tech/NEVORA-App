
function OrderTable({ orders ,onStatusChange , onView }) {
  return (
    <table>

        <thead>
            <tr>
               <th>Order ID</th>
               <th>User ID</th>
               <th>Total Price</th>
               <th>Status</th>
               <th>Created At</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {orders.map((order) => (
                <tr key={order.id}>
                   
               <td>{order.id}</td>
               <td>{order.userId}</td>
               <td>₹{order.totalPrice}</td>

               <td>
                <select value={order.status}
                     onChange={(e) => 
                         onStatusChange(order.id , e.target.value)
                     }>
                          <option value="pending">Pending</option>
                     <option value="confirmed">Confirmed</option>
                     <option value="shipped">Shipped</option>
                     <option value="delivered">Delivered</option>
                     <option value="cancelled">Cancelled</option>
                </select>
             </td>

                  <td>
                     {new Date(order.createdAt).toLocaleDateString()}
               
                 </td>

            <td>
                <button onClick={() => onView(order)}>
                    View
                </button>
            </td>


                </tr>

            ))}

        </tbody>

    </table>
  )
}

export default OrderTable
