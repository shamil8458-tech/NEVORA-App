

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";



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
  <div>

    <h3>Weekly Revenue</h3>

    <ResponsiveContainer width="100%" height={300}>

      <LineChart data={weeklyRevenue}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="day" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="revenue"
        />

      </LineChart>

    </ResponsiveContainer>

  </div>
);
}

export default WeeklyRevenue;