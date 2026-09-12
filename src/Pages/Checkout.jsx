import { useSelector } from "react-redux";
import {useMutation} from '@tanstack/react-query'
import { createOder } from '../services/orderService'

function Checkout() {

    const items = useSelector((state) => state.cart.items);

    const totalPrice = items.reduce(
        (total , item) => total + item.price * item.quantity,
        0
    );

    const {mutate : placeOrder} = useMutation({
        mutationFn : createOder,

        onSuccess : (data) => {
            console.log("order placed" , data)
        },
    });


    const handlePlaceOrder = () => {
        const order = {
            items : items,
            totalPrice : totalPrice,
            status : "pending",
            createdAt: new Date().toISOString(),
        };
        placeOrder(order)
    }
  return (
    <div>

        <h1>Checkout</h1>

        {items.map((item) => (
            <div key={item.id}>
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>Quantity:{item.quantity}</p>

            </div>
        ))}

        <h2>Total: ₹{totalPrice} </h2>

        <button type="button"
        onClick={handlePlaceOrder}>
            Place Order
        </button>
      
    </div>
  )
}

export default Checkout
