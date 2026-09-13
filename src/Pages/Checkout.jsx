import { useSelector , useDispatch } from "react-redux";
import {useMutation} from '@tanstack/react-query'
import { createOrder } from '../services/orderService'
import { clearCart} from '../Redux/Slice/CartSlice'
import { clearCartItems } from "../services/cartService";

function Checkout() {

    const dispatch = useDispatch();

    const items = useSelector((state) => state.cart.items);

    const totalPrice = items.reduce(
        (total , item) => total + item.price * item.quantity,
        0
    );

const { mutate: placeOrder, isPending } = useMutation({
    mutationFn: createOrder,

    onSuccess: async (data) => {
        console.log("Order placed:", data);

        await clearCartItems(items);

        dispatch(clearCart());
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

      <button
    type="button"
    onClick={handlePlaceOrder}
    disabled={isPending}
>
    {isPending ? "Placing Order..." : "Place Order"}
</button>
      
    </div>
  )
}

export default Checkout
