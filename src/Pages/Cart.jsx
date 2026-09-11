import { useSelector , useDispatch } from "react-redux"
import { increaseQuantity , decreaseQuantity ,removeFromCart } from "../Redux/Slice/CartSlice"

function Cart() {

    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);

    const totalPrice = items.reduce(
        (total , item) => total + item.price * item.quantity,
        0
    );


    if(items.length === 0){
        return (
            <div>
                <h2>Your Cart is Empty</h2>
                <p>Add some products to your cart.</p>
            </div>
        )
    }
  return (
    <div>
      <h2>Your Cart</h2>

      {items.map((item) => (
        <div key={item.id}>

            <img src={item.image} alt={item.name} width="150"/>

            <h3>{item.name}</h3>

            <p>₹{item.price}</p>

            <div>
                <button onClick={() => dispatch(decreaseQuantity(item.id))}
                    > -
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => dispatch(increaseQuantity(item.id))}
                    > +
                    </button>
            </div>

            <p>
                Subtotal : ₹{item.price * item.quantity}
            </p>


            <button onClick={() => dispatch(removeFromCart(item.id))}>
                remove
            </button>

        </div>
      ))}

      <hr />

      <h3>
        Total : ₹{totalPrice}
      </h3>
    </div>
  )
}

export default Cart
