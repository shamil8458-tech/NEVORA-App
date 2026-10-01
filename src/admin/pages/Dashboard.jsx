// import { useQuery } from "@tanstack/react-query"
// import { getDashboardOrders , getDashboardProducts , getDashboardUsers } from "../services/adminDashboardService"

// import RevenueChart from "../components/RevenueChart/RevenueChart";

// function Dashboard() {

//   const {data : products =[] , isLoading : productsLoading} = useQuery({
//     queryKey : ["dashboardProducts"],
//     queryFn : getDashboardProducts,

//   });

//   const {data : users = [] ,isLoading:usersLoading} = useQuery({
//      queryKey : ["dashboardUsers"],
//      queryFn : getDashboardUsers
//   })


//   const {data: orders =[] , isLoading:ordersLoading} = useQuery({
//     queryKey : ["dashboardOrders"],
//     queryFn : getDashboardOrders
//   })

//   if(
//     productsLoading || usersLoading || ordersLoading  ) {
//      return <p>Loading dashboard...</p>;
//   }

//   const totalProducts = products.length;
//   const totalUsers = users.length;
//   const totalOrders = orders.length;

//   const totalRevenue = orders.reduce(
//     (total , order) => total + order.totalPrice,
//     0
//   )


//   const pendingOrders = orders.filter(
//     (order) => order.status === "pending"
//   ).length;


//   const confirmedOrders = orders.filter(
//     (order) => order.status === "confirmed"
//   ).length;


//   const shippedOrders = orders.filter(
//     (order) => order.status === "shipped"
//   ).length;


//   const deliveredOrders = orders.filter(
//     (order) => order.status === "delivered"
//   ).length;


//   const cancelledOrders = orders.filter(
//     (order) => order.status === "cancelled"
//   ).length;



//   return (
//     <div>

//       <h1>Dashboard</h1>


//       <div>

//           <div>
//               <h3>Total Products</h3>
//               <p>{totalProducts}</p>
//           </div>

//           <div>
//             <h3>Total Users</h3>
//             <p>{totalUsers}</p>
//           </div>

//           <div>
//             <h3>Total Orders</h3>
//             <p>{totalOrders}</p>
//           </div>


//           <div>
//             <h3>Total Revenue</h3>
//             <p>₹{totalRevenue}</p>
//           </div>


//       </div>



//          {/* orders Detals ////// */}


//          <div>
           
//             <h2>Order Status</h2>


//             <div>
//               <h3>Pending</h3>
//               <p>{pendingOrders}</p>
//             </div>


//             <div>
//               <h3>Confirmed</h3>
//               <p>{confirmedOrders}</p>
//             </div>
            

//             <div>
//               <h3>Shipped</h3>
//               <p>{shippedOrders}</p>
//             </div>


//             <div>
//                 <h3>Delivered</h3>
//                 <p>{deliveredOrders}</p>
//             </div>


//             <div>
//               <h3>Cancelled</h3>
//               <p>{cancelledOrders}</p>
//             </div>

//          </div>



//           {/* Revenue Chart */}

//       <RevenueChart orders={orders} />
      
//     </div>
//   )
// }

// export default Dashboard












import { Package, Users,  ShoppingBag, IndianRupee,} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { getDashboardOrders , getDashboardProducts, getDashboardUsers,} from "../services/adminDashboardService";

import RevenueChart from "../components/RevenueChart/RevenueChart";

function Dashboard() {
  const {
    data: products = [],
    isLoading: productsLoading,
  } = useQuery({
    queryKey: ["dashboardProducts"],
    queryFn: getDashboardProducts,
  });

  const {
    data: users = [],
    isLoading: usersLoading,
  } = useQuery({
    queryKey: ["dashboardUsers"],
    queryFn: getDashboardUsers,
  });

  const {
    data: orders = [],
    isLoading: ordersLoading,
  } = useQuery({
    queryKey: ["dashboardOrders"],
    queryFn: getDashboardOrders,
  });

  if (productsLoading || usersLoading || ordersLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-stone-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  const totalProducts = products.length;
  const totalUsers = users.length;
  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (total, order) => total + order.totalPrice,
    0
  );

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
    <div className="min-h-screen bg-stone-50 px-4 py-6 sm:px-6 lg:px-8">

      {/* Header */}

      <div className="mb-8">

        
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-stone-500">
          Overview of your skincare store
        </p>

      </div>


      {/* Summary Cards */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Products */}

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">

          <div className="mb-5 flex items-center justify-between">

            <p className="text-sm font-medium text-stone-500">
              Total Products
            </p>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <Package size={20} strokeWidth={1.8} />
            </div>

          </div>

          <p className="text-3xl font-semibold text-stone-900">
            {totalProducts}
          </p>

          <p className="mt-2 text-xs text-stone-400">
            Products in your store
          </p>

        </div>


        {/* Users */}

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">

          <div className="mb-5 flex items-center justify-between">

            <p className="text-sm font-medium text-stone-500">
              Total Users
            </p>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-700">
             <Users size={20} strokeWidth={1.8} />
            </div>

          </div>

          <p className="text-3xl font-semibold text-stone-900">
            {totalUsers}
          </p>

          <p className="mt-2 text-xs text-stone-400">
            Registered customers
          </p>

        </div>


        {/* Orders */}

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">

          <div className="mb-5 flex items-center justify-between">

            <p className="text-sm font-medium text-stone-500">
              Total Orders
            </p>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
               <ShoppingBag size={20} strokeWidth={1.8} />
            </div>

          </div>

          <p className="text-3xl font-semibold text-stone-900">
            {totalOrders}
          </p>

          <p className="mt-2 text-xs text-stone-400">
            Orders received
          </p>

        </div>


        {/* Revenue */}

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">

          <div className="mb-5 flex items-center justify-between">

            <p className="text-sm font-medium text-stone-500">
              Total Revenue
            </p>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
              <IndianRupee size={20} strokeWidth={1.8} />
            </div>

          </div>

          <p className="text-3xl font-semibold text-stone-900">
            ₹{totalRevenue}
          </p>

          <p className="mt-2 text-xs text-stone-400">
            Total order revenue
          </p>

        </div>

      </div>


      {/* Order Status */}

      <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">

        <div className="mb-6">

          <h2 className="text-lg font-semibold text-stone-900">
            Order Status
          </h2>

          <p className="mt-1 text-sm text-stone-500">
            Current order distribution
          </p>

        </div>


        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">

          {/* Pending */}

          <div className="rounded-xl bg-amber-50 p-4">

            <p className="text-sm font-medium text-amber-700">
              Pending
            </p>

            <p className="mt-2 text-2xl font-semibold text-amber-900">
              {pendingOrders}
            </p>

          </div>


          {/* Confirmed */}

          <div className="rounded-xl bg-blue-50 p-4">

            <p className="text-sm font-medium text-blue-700">
              Confirmed
            </p>

            <p className="mt-2 text-2xl font-semibold text-blue-900">
              {confirmedOrders}
            </p>

          </div>


          {/* Shipped */}

          <div className="rounded-xl bg-violet-50 p-4">

            <p className="text-sm font-medium text-violet-700">
              Shipped
            </p>

            <p className="mt-2 text-2xl font-semibold text-violet-900">
              {shippedOrders}
            </p>

          </div>


          {/* Delivered */}

          <div className="rounded-xl bg-emerald-50 p-4">

            <p className="text-sm font-medium text-emerald-700">
              Delivered
            </p>

            <p className="mt-2 text-2xl font-semibold text-emerald-900">
              {deliveredOrders}
            </p>

          </div>


          {/* Cancelled */}

          <div className="rounded-xl bg-red-50 p-4">

            <p className="text-sm font-medium text-red-700">
              Cancelled
            </p>

            <p className="mt-2 text-2xl font-semibold text-red-900">
              {cancelledOrders}
            </p>

          </div>

        </div>

      </div>


      {/* Revenue Chart */}

      <div className="mt-6">

        <RevenueChart orders={orders} />

      </div>

    </div>
  );
}

export default Dashboard;