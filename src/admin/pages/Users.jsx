
import {useQuery , useMutation , useQueryClient} from '@tanstack/react-query'
import {useDispatch , useSelector} from 'react-redux'
import UserTable from '../components/UserTable'



import { getAdminUsers , updateUser} from '../services/adminUserService'
import { setUsers } from '../redux/slices/adminUserSlice'


function Users() {

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const users = useSelector((state) => state.adminUsers.users)

  const {isLoading , isError} = useQuery({
    queryKey : ["adminUsers"],
    queryFn : async () => {

      const data = await getAdminUsers();

      dispatch(setUsers(data))

      return data;
    },
  });

  // toggleBlock checking/////

  const {mutate : toggleBlock} = useMutation({
    mutationFn : updateUser,


    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey : ["adminUsers"]
      })
    }
  })



const handleToggleBlock = (user) => {
    toggleBlock({
      ...user,
      isBlocked: !user.isBlocked
     })
  }


  if(isLoading){
    return <p>Loading users...</p>;
  }

  if(isError){
    return <p>Failed to load users</p>;
  }
  return (
    <div>

      <h3>Users</h3>

      <UserTable 
      users={users}
      onToggleBlock={handleToggleBlock}/>
      
    </div>
  )
}

export default Users
