// import { Outlet } from "react-router-dom"
// import AdminSidebar from "./AdminSidebar"


// function AdminLayout() {
//   return (
//     <div>

//         <AdminSidebar/>

//         <main>
//             <Outlet/>
//         </main>
      
//     </div>
//   )
// }

// export default AdminLayout









import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#faf9f7]">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        <div className="p-8">
          <Outlet />
        </div>
      </main>

    </div>
  );
}

export default AdminLayout;