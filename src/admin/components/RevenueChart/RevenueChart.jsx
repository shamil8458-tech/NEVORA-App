


import WeeklyRevenue from "./WeeklyRevenue";
import MonthlyRevenue from "./MonthlyRevenue";
import { useState } from "react";

function RevenueChart({ orders }) {
  const [view, setView] = useState("weekly");

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="text-lg font-semibold text-stone-900">
            Revenue
          </h2>

          <p className="mt-1 text-sm text-stone-500">
            Track your store revenue performance
          </p>
        </div>


        {/* Toggle */}

        <div className="flex w-fit rounded-xl bg-stone-100 p-1">

          <button
            onClick={() => setView("weekly")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              view === "weekly"
                ? "bg-white text-stone-900 shadow-sm"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            Weekly
          </button>


          <button
            onClick={() => setView("monthly")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              view === "monthly"
                ? "bg-white text-stone-900 shadow-sm"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            Monthly
          </button>

        </div>

      </div>


      {/* Chart */}

      <div className="mt-6">

        {view === "weekly" ? (
          <WeeklyRevenue orders={orders} />
        ) : (
          <MonthlyRevenue orders={orders} />
        )}

      </div>

    </div>
  );
}

export default RevenueChart;