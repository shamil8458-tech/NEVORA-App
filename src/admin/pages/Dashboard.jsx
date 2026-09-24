import { useQuery } from "@tanstack/react-query"
import { getDashboardOrders , getDashboardProducts , getDashboardUsers } from "../services/adminDashboardService"

import RevenueChart from "../components/RevenueChart/RevenueChart";

function Dashboard() {

  const {data : products =[] , isLoading : productsLoading} = useQuery({
    queryKey : ["dashboardProducts"],
    queryFn : getDashboardProducts,

  });

  const {data : users = [] ,isLoading:usersLoading} = useQuery({
     queryKey : ["dashboardUsers"],
     queryFn : getDashboardUsers
  })


  const {data: orders =[] , isLoading:ordersLoading} = useQuery({
    queryKey : ["dashboardOrders"],
    queryFn : getDashboardOrders
  })

  if(
    productsLoading || usersLoading || ordersLoading  ) {
     return <p>Loading dashboard...</p>;
  }

  const totalProducts = products.length;
  const totalUsers = users.length;
  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (total , order) => total + order.totalPrice,
    0
  )


  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;


  const confirmedOrders = orders.filter(
    (order) => order.status === "confirmed"
  ).length;


  const shippedOrders = orders.filter(
    (order) => order.status === "shipped"
  ).length;


  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  ).length;


  const cancelledOrders = orders.filter(
    (order) => order.status === "cancelled"
  ).length;



  return (
    <div>

      <h1>Dashboard</h1>


      <div>

          <div>
              <h3>Total Products</h3>
              <p>{totalProducts}</p>
          </div>

          <div>
            <h3>Total Users</h3>
            <p>{totalUsers}</p>
          </div>

          <div>
            <h3>Total Orders</h3>
            <p>{totalOrders}</p>
          </div>


          <div>
            <h3>Total Revenue</h3>
            <p>₹{totalRevenue}</p>
          </div>


      </div>



         {/* orders Detals ////// */}


         <div>
           
            <h2>Order Status</h2>


            <div>
              <h3>Pending</h3>
              <p>{pendingOrders}</p>
            </div>


            <div>
              <h3>Confirmed</h3>
              <p>{confirmedOrders}</p>
            </div>
            

            <div>
              <h3>Shipped</h3>
              <p>{shippedOrders}</p>
            </div>


            <div>
                <h3>Delivered</h3>
                <p>{deliveredOrders}</p>
            </div>


            <div>
              <h3>Cancelled</h3>
              <p>{cancelledOrders}</p>
            </div>

         </div>



          {/* Revenue Chart */}

      <RevenueChart orders={orders} />
      
    </div>
  )
}

export default Dashboard
