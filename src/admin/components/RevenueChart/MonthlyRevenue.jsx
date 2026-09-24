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
    <div>

      <h3>Monthly Revenue</h3>

      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={monthlyRevenue}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="week" />

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

export default MonthlyRevenue;