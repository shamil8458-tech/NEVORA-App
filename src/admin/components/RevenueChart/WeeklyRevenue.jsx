

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer
// } from "recharts";



// function WeeklyRevenue({ orders }) {

//   const today = new Date();

//   const startOfWeek = new Date(today);

//   startOfWeek.setDate(
//     today.getDate() - today.getDay()
//   );

//   startOfWeek.setHours(0, 0, 0, 0);


//   const weeklyOrders = orders.filter((order) => {

//     const orderDate = new Date(order.createdAt);

//     return orderDate >= startOfWeek;
//   });


//   const days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];


//   const weeklyRevenue = days.map((day, index) => {

//     const total = weeklyOrders
//       .filter((order) => {
//         const orderDate = new Date(order.createdAt);

//         return orderDate.getDay() === index;
//       })
//       .reduce(
//         (total, order) => total + order.totalPrice,
//         0
//       );

//     return {
//       day,
//       revenue: total,
//     };
//   });


//   console.log(weeklyRevenue);


// return (
//   <div>

//     <h3>Weekly Revenue</h3>

//     <ResponsiveContainer width="100%" height={300}>

//       <LineChart data={weeklyRevenue}>

//         <CartesianGrid strokeDasharray="3 3" />

//         <XAxis dataKey="day" />

//         <YAxis />

//         <Tooltip />

//         <Line
//           type="monotone"
//           dataKey="revenue"
//         />

//       </LineChart>

//     </ResponsiveContainer>

//   </div>
// );
// }

// export default WeeklyRevenue;
























import {  LineChart,  Line,  XAxis,  YAxis,  CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";



function WeeklyRevenue({ orders }) {

  const today = new Date();

  const startOfWeek = new Date(today);

  startOfWeek.setDate(
    today.getDate() - today.getDay()
  );

  startOfWeek.setHours(0, 0, 0, 0);


  const weeklyOrders = orders.filter((order) => {

    const orderDate = new Date(order.createdAt);

    return orderDate >= startOfWeek;
  });


  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];


  const weeklyRevenue = days.map((day, index) => {

    const total = weeklyOrders
      .filter((order) => {
        const orderDate = new Date(order.createdAt);

        return orderDate.getDay() === index;
      })
      .reduce(
        (total, order) => total + order.totalPrice,
        0
      );

    return {
      day,
      revenue: total,
    };
  });


  console.log(weeklyRevenue);

return (
  <div className="w-full">

    <div className="mb-4 flex items-center justify-between">

      <div>
        <h3 className="text-sm font-medium text-stone-700">
          Weekly Revenue
        </h3>

        <p className="mt-1 text-xs text-stone-400">
          Revenue generated this week
        </p>
      </div>

    </div>


    <div className="h-[300px] w-full">

      <ResponsiveContainer width="100%" height="100%">

        <LineChart
          data={weeklyRevenue}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `₹${value}`}
          />

          <Tooltip
            formatter={(value) => [`₹${value}`, "Revenue"]}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e7e5e4",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#047857"
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  </div>
);
}

export default WeeklyRevenue;