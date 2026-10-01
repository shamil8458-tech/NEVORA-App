
// function UserTable({users , onToggleBlock}) {
//   return (
//   <table>

//     <thead>
//         <tr>
//           <th>Name</th>
//           <th>Email</th>
//           <th>Role</th>
//           <th>Status</th>
//           <th>Action</th>
//         </tr>
  
//     </thead>

//     <tbody>
//         {users.map((user) => (
//             <tr key={user.id}>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.role || "user"}</td>
//                 <td>{user.isBlocked ? "Blocked" : "Active"}</td>
//                 <td>
//                   <button
//                   onClick={() => onToggleBlock(user)}>
//                      {user.isBlocked ? "Unblock" : "Block"}
//                   </button>
//                 </td>
//             </tr>
//         ))}
//     </tbody>
    
//   </table>
//   )
// }

// export default UserTable




















































function UserTable({ users, onToggleBlock }) {

  return (

    <div className="overflow-x-auto">

      <table className="w-full min-w-[750px] text-left">

        {/* Table Header */}

        <thead>

          <tr className="border-b border-stone-200">

            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
              User
            </th>

            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
              Email
            </th>

            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
              Role
            </th>

            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
              Status
            </th>

            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
              Action
            </th>

          </tr>

        </thead>


        {/* Table Body */}

        <tbody>

          {users.map((user) => (

            <tr
              key={user.id}
              className="border-b border-stone-100 transition hover:bg-stone-50"
            >

              {/* User */}

              <td className="px-4 py-4">

                <div className="flex items-center gap-3">

                  {/* Avatar */}

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-sm font-semibold text-emerald-700">

                    {user.name
                      ? user.name.charAt(0).toUpperCase()
                      : "U"}

                  </div>


                  {/* Name */}

                  <div>

                    <p className="text-sm font-medium text-stone-900">
                      {user.name}
                    </p>

                  </div>

                </div>

              </td>


              {/* Email */}

              <td className="px-4 py-4 text-sm text-stone-600">

                {user.email}

              </td>


              {/* Role */}

              <td className="px-4 py-4">

                <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">

                  {user.role || "user"}

                </span>

              </td>


              {/* Status */}

              <td className="px-4 py-4">

                {user.isBlocked ? (

                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                    Blocked
                  </span>

                ) : (

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                    Active
                  </span>

                )}

              </td>


              {/* Action */}

              <td className="px-4 py-4">

                <button
                  type="button"
                  onClick={() => onToggleBlock(user)}
                  className={
                    user.isBlocked
                      ? "rounded-lg border border-emerald-100 px-3 py-2 text-xs font-medium text-emerald-700 transition hover:bg-emerald-50"
                      : "rounded-lg border border-red-100 px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50"
                  }
                >

                  {user.isBlocked
                    ? "Unblock"
                    : "Block"}

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>


      {/* Empty State */}

      {users.length === 0 && (

        <div className="flex flex-col items-center justify-center py-12">

          <p className="text-sm font-medium text-stone-600">
            No users found
          </p>

          <p className="mt-1 text-xs text-stone-400">
            Registered users will appear here.
          </p>

        </div>

      )}

    </div>

  );
}

export default UserTable;