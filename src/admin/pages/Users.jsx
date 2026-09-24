
import {useQuery , useMutation , useQueryClient} from '@tanstack/react-query'
import {useDispatch , useSelector} from 'react-redux'
import UserTable from '../components/UserTable'



import { getAdminUsers , updateUser} from '../services/adminUserService'
import { setUsers } from '../redux/slices/adminUserSlice'

import usePagination from '../../Hooks/usePagination'
import Pagination from '../components/Pagination'

function Users() {

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const users = useSelector((state) => state.adminUsers.users)

  const {currentPage , totalPages , currentItems : currentUsers , changePage ,} =usePagination(users , 10)

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


{/* users only not pagenation/// */}

      {/* <UserTable 
      users={users}
      onToggleBlock={handleToggleBlock}/> */}

      <UserTable 
      users={currentUsers}
      onToggleBlock={handleToggleBlock}/>


      <Pagination
      currentPage={currentPage}
      totalPage={totalPages}
      onPageChange={changePage}/>
      
    </div>
  )
}

export default Users
