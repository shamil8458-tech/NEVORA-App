
function UserTable({users , onToggleBlock}) {
  return (
  <table>

    <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
  
    </thead>

    <tbody>
        {users.map((user) => (
            <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role || "user"}</td>
                <td>{user.isBlocked ? "Blocked" : "Active"}</td>
                <td>
                  <button
                  onClick={() => onToggleBlock(user)}>
                     {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
            </tr>
        ))}
    </tbody>
    
  </table>
  )
}

export default UserTable
