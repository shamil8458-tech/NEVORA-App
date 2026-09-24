import { useQuery } from "@tanstack/react-query"
import { getDashboardOrders , getDashboardProducts , getDashboardUsers } from "../services/adminDashboardService"

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
  const totalOrders = users.length;

  const totalRevenue = orders.reduce(
    (total , order) => total + order.totalPrice,
    0
  )
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
      
    </div>
  )
}

export default Dashboard
