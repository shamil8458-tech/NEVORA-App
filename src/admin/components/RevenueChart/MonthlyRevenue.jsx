

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";


function MonthlyRevenue({ orders }) {

  const today = new Date();

  const currentMonth = today.getMonth();

  const currentYear = today.getFullYear();


  const monthlyOrders = orders.filter((order) => {

    const orderDate = new Date(order.createdAt);

    return (
      orderDate.getMonth() === currentMonth &&
      orderDate.getFullYear() === currentYear
    );
  });


  const monthlyRevenue = [1, 2, 3, 4, 5].map((week) => {

    const total = monthlyOrders
      .filter((order) => {

        const orderDate = new Date(order.createdAt);

        const weekNumber = Math.ceil(
          orderDate.getDate() / 7
        );

        return weekNumber === week;
      })
      .reduce(
        (total, order) => total + order.totalPrice,
        0
      );


    return {
      week: `Week ${week}`,
      revenue: total,
    };
  });


  console.log(monthlyRevenue);


 return (
  <div className="w-full">

    <div className="mb-4">

      <h3 className="text-sm font-medium text-stone-700">
        Monthly Revenue
      </h3>

      <p className="mt-1 text-xs text-stone-400">
        Revenue generated this month
      </p>

    </div>


    <div className="h-[300px] w-full">

      <ResponsiveContainer width="100%" height="100%">

        <LineChart
          data={monthlyRevenue}
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
            dataKey="week"
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

export default MonthlyRevenue;