import {useDispatch , useSelector} from 'react-redux'
import {useQuery , useMutation , useQueryClient} from '@tanstack/react-query'

import  {getAdminOrders , updateOrderStatus} from '../services/adminOrderService'
import { setOrders } from '../redux/slices/adminOrderSlice'
import OrderTable from '../components/OrderTable'
import { useState } from 'react'



import usePagination from '../../Hooks/usePagination'
import Pagination from '../components/Pagination'


function Orders() {

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [selectedOrder , setSelectedOrder] = useState(null)

  const orders = useSelector((state) => state.adminOrders.orders);


  const {currentPage , totalPages , currentItems ,changePage} = usePagination(orders , 10)

  const {isLoading , isError} = useQuery({
    queryKey : ["adminOrders"],

    queryFn : async () => {
        const data = await getAdminOrders();


        dispatch(setOrders(data))

        return data;
    },
  });


  const {mutate: changeStatus} = useMutation({
    mutationFn : updateOrderStatus,


    onSuccess : () => {
      queryClient.invalidateQueries({
        queryKey : ["adminOrders"]
      })
    }
  })

  const handleStatusChange = (id , status) => {

    changeStatus({
      id,
      status
    });
  }


  const handleView = (order) => {
    setSelectedOrder(order)
  };


  if(isLoading){
    return <p>Loading orders...</p>;
  }

  if(isError){
    return <p>Failed to load orders</p>
  }
  return (
    <div>

      <h2>Orders</h2>


      <OrderTable
      orders={orders}
      onStatusChange={handleStatusChange}
      onView={handleView}/>


      {selectedOrder && (
                <div>

          <h2>Order Details</h2>

          <p>
            <strong>Order ID:</strong>{" "}
            {selectedOrder.id}
          </p>

          <p>
            <strong>User ID:</strong>{" "}
            {selectedOrder.userId}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {selectedOrder.status}
          </p>

          <p>
            <strong>Total:</strong>{" "}
            ₹{selectedOrder.totalPrice}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(
              selectedOrder.createdAt
            ).toLocaleDateString()}
          </p>


                   <h3>Products</h3>


          {selectedOrder.items.map((item) => (

            <div key={item.id}>

              <p>
                <strong>{item.name}</strong>
              </p>

              <p>
                Brand: {item.brand}
              </p>

              <p>
                Price: ₹{item.price}
              </p>

              <p>
                Quantity: {item.quantity}
              </p>

              <p>
                Subtotal: ₹{item.price * item.quantity}
              </p>

              <hr />

            </div>

          ))}


          <button
            onClick={() => setSelectedOrder(null)}
          >
            Close
          </button>






          

        </div>
      )}

      <Pagination 
      currentPage={currentPage}
      totalPage={totalPages}
      onPageChange={changePage}/>
      
    </div>
  )
}

export default Orders
