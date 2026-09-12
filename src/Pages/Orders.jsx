import { useQuery } from "@tanstack/react-query"
import { getOrders } from "../services/orderService"

function Orders() {

    const {data : orders , isLoading , isError} = useQuery({
        queryKey : ["orders"],
        queryFn : getOrders
    });

    if(isLoading){
        return <p>Loading orders...</p>
    }

    if(isError){
        return <p>Failed to load orders</p>
    }

    if(orders.length === 0){
        return (
            <div>
                <h2>No Orders Yet</h2>
                <p>Your orders will appear here.</p>
            </div>
        );
    }
  return (
    <div>

        <h2>My Orders</h2>

        {orders.map((order) => (
            <div key={order.id}>
                  
                  <h3>
                    Order ID: {order.id}
                  </h3>

                  <p>Status: {order.status}</p>

                  <p>Total: ₹{order.totalPrice}</p>


                  <h4>Products</h4>

                  {order.items.map((item) => (
                    <div key={item.id}>

                        <p>{item.name}</p>

                        <p>
                           ₹{item.price} × {item.quantity}
                        </p>

                    </div>
                  ))}
            </div>
        ))}
      
    </div>
  )
}

export default Orders
