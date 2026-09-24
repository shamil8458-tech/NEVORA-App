
import WeeklyRevenue from "./WeeklyRevenue"
import MonthlyRevenue from "./MonthlyRevenue"
import { useState } from "react"

function RevenueChart({orders}) {


    const [view , setView] = useState("weekly");
  return (
    <div>

      <h2>Revenue</h2>


      <div>


         <button 
         onClick={() => setView("weekly")}
         disabled={view === "weekly"}>
               Weekly
         </button>


              <button
          onClick={() => setView("monthly")}
          disabled={view === "monthly"}
        >
          Monthly
        </button>


      </div>


      {view === "weekly" ? (
        <WeeklyRevenue orders={orders}/>
      ) : (
        <MonthlyRevenue orders={orders}/>
      )}
      
    </div>
  )
}

export default RevenueChart
