

// import { Link , useNavigate } from "react-router-dom";
// import {  useDispatch } from "react-redux";
// import { adminLogout } from "../redux/slices/adminAuthSlice";


// function AdminSidebar() {

//     const dispatch = useDispatch();
//     const navigate = useNavigate();


//     const handleLogout = () => {
//         dispatch(adminLogout())

//         navigate("/login");
//     };
//   return (
//     <div>

//          <h2>Admin Panel</h2>


//          <nav>

//             <Link to="/admin">
//                 Dashboard
//             </Link>

//             <Link to="/admin/products">
//             Products
//             </Link>

//              <Link to="/admin/users">
//              Users
//              </Link>


//              <Link to="/admin/orders">
//              Orders
//              </Link>
            
//          </nav>


//          <div>

//             <button onClick={handleLogout}>
//                   Logout
//             </button>
//          </div>
      
//     </div>
//   )
// }

// export default AdminSidebar








import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogout } from "../redux/slices/adminAuthSlice";

function AdminSidebar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {

    const confirmLogout = window.confirm("Are you sure you want to logout?")

    if(!confirmLogout){
      return
    }
    dispatch(adminLogout());
    toast.success("Logged out successfully"); 
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-[#e8e3dc] bg-white">

      {/* Logo / Brand */}
      <div className="flex h-20 items-center border-b border-[#eeeae4] px-7">

        <div>
          <h1 className="text-xl font-semibold tracking-[0.18em] text-[#173f35]">
            NEVORA
          </h1>

          <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.25em] text-[#9a9188]">
            Admin Panel
          </p>
        </div>

      </div>


      {/* Navigation */}
      <nav className="px-4 py-7">

        <p className="mb-4 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#aaa29a]">
          Management
        </p>


        {/* Dashboard */}
        <Link
          to="/admin"
          className={`mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
            isActive("/admin")
              ? "bg-[#e8f4ef] text-[#17634f]"
              : "text-[#665f58] hover:bg-[#f7f4f0] hover:text-[#17634f]"
          }`}
        >

          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f5f2ee]">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10.5L12 3l9 7.5M5.5 9.5V21h13V9.5M9 21v-6h6v6"
              />
            </svg>
          </span>

          <span>Dashboard</span>

        </Link>


        {/* Products */}
        <Link
          to="/admin/products"
          className={`mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
            isActive("/admin/products")
              ? "bg-[#e8f4ef] text-[#17634f]"
              : "text-[#665f58] hover:bg-[#f7f4f0] hover:text-[#17634f]"
          }`}
        >

          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f5f2ee]">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7.5l8 4.5 8-4.5M12 12v9"
              />
            </svg>
          </span>

          <span>Products</span>

        </Link>



   {/* Trash */}
<Link
  to="/admin/trash"
  className={`mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
    isActive("/admin/trash")
      ? "bg-[#e8f4ef] text-[#17634f]"
      : "text-[#665f58] hover:bg-[#f7f4f0] hover:text-[#17634f]"
  }`}
>

  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f5f2ee]">

    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 6h18"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 6V4h8v2"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 6l-1 14H6L5 6"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 11v5M14 11v5"
      />
    </svg>

  </span>

  <span>Trash</span>

</Link>








        {/* Users */}
        <Link
          to="/admin/users"
          className={`mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
            isActive("/admin/users")
              ? "bg-[#e8f4ef] text-[#17634f]"
              : "text-[#665f58] hover:bg-[#f7f4f0] hover:text-[#17634f]"
          }`}
        >

          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f5f2ee]">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
              />

              <circle
                cx="9"
                cy="7"
                r="4"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
              />
            </svg>
          </span>

          <span>Users</span>

        </Link>


        {/* Orders */}
        <Link
          to="/admin/orders"
          className={`mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
            isActive("/admin/orders")
              ? "bg-[#e8f4ef] text-[#17634f]"
              : "text-[#665f58] hover:bg-[#f7f4f0] hover:text-[#17634f]"
          }`}
        >

          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f5f2ee]">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 8h12l1 12H5L6 8z"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 8a3 3 0 016 0"
              />
            </svg>
          </span>

          <span>Orders</span>

        </Link>

      </nav>


      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 w-full border-t border-[#eeeae4] p-4">

        <div className="mb-4 rounded-xl bg-[#f8f6f3] px-4 py-3">

          <p className="text-xs font-medium text-[#776f67]">
            Admin Account
          </p>

          <p className="mt-1 text-xs text-[#a29a91]">
            Manage your store
          </p>

        </div>


        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#8b625c] transition-all duration-200 hover:bg-[#fff1ef] hover:text-[#b94b3d]"
        >

          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f9efed]">

            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 17l5-5-5-5"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H3"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 19V5a2 2 0 00-2-2h-6"
              />
            </svg>

          </span>

          <span>Logout</span>

        </button>

      </div>

    </aside>
  );
}

export default AdminSidebar;