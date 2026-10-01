
// import {useQuery , useMutation , useQueryClient} from '@tanstack/react-query'
// import {useDispatch , useSelector} from 'react-redux'
// import UserTable from '../components/UserTable'



// import { getAdminUsers , updateUser} from '../services/adminUserService'
// import { setUsers } from '../redux/slices/adminUserSlice'

// import usePagination from '../../Hooks/usePagination'
// import Pagination from '../components/Pagination'

// function Users() {

//   const dispatch = useDispatch();
//   const queryClient = useQueryClient();

//   const users = useSelector((state) => state.adminUsers.users)

//   const {currentPage , totalPages , currentItems : currentUsers , changePage ,} =usePagination(users , 10)

//   const {isLoading , isError} = useQuery({
//     queryKey : ["adminUsers"],
//     queryFn : async () => {

//       const data = await getAdminUsers();

//       dispatch(setUsers(data))

//       return data;
//     },
//   });

//   // toggleBlock checking/////

//   const {mutate : toggleBlock} = useMutation({
//     mutationFn : updateUser,


//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey : ["adminUsers"]
//       })
//     }
//   })



// const handleToggleBlock = (user) => {
//     toggleBlock({
//       ...user,
//       isBlocked: !user.isBlocked
//      })
//   }


//   if(isLoading){
//     return <p>Loading users...</p>;
//   }

//   if(isError){
//     return <p>Failed to load users</p>;
//   }
//   return (
//     <div>

//       <h3>Users</h3>


// {/* users only not pagenation/// */}

//       {/* <UserTable 
//       users={users}
//       onToggleBlock={handleToggleBlock}/> */}

//       <UserTable 
//       users={currentUsers}
//       onToggleBlock={handleToggleBlock}/>


//       <Pagination
//       currentPage={currentPage}
//       totalPage={totalPages}
//       onPageChange={changePage}/>
      
//     </div>
//   )
// }

// export default Users



























import toast from "react-hot-toast";
import {
  useQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";

import {
  useDispatch,
  useSelector
} from "react-redux";

import UserTable from "../components/UserTable";

import {
  getAdminUsers,
  updateUser
} from "../services/adminUserService";

import {
  setUsers
} from "../redux/slices/adminUserSlice";

import usePagination from "../../Hooks/usePagination";
import Pagination from "../components/Pagination";


function Users() {

  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const users = useSelector(
    (state) => state.adminUsers.users
  );


  const {
    currentPage,
    totalPages,
    currentItems: currentUsers,
    changePage,
  } = usePagination(users, 10);


  const {
    isLoading,
    isError
  } = useQuery({

    queryKey: ["adminUsers"],

    queryFn: async () => {

      const data = await getAdminUsers();

      dispatch(setUsers(data));

      return data;
    },

  });


  // Toggle block / unblock

  const {
    mutate: toggleBlock
  } = useMutation({

    mutationFn: updateUser,

    onSuccess: (_,data) => {

      queryClient.invalidateQueries({
        queryKey: ["adminUsers"]
      });

      if(data.isBlocked){
         toast.success("User blocked successfully");
      }else{
         toast.success("User unblocked successfully");
      }

    },
      onError: () => {

    toast.error("Failed to update user status");

  }

  });


  const handleToggleBlock = (user) => {

    toggleBlock({
      ...user,
      isBlocked: !user.isBlocked
    });

  };


  // Loading

  if (isLoading) {

    return (
      <div className="flex min-h-[300px] items-center justify-center">

        <p className="text-sm text-stone-500">
          Loading users...
        </p>

      </div>
    );

  }


  // Error

  if (isError) {

    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6">

        <p className="text-sm text-red-600">
          Failed to load users
        </p>

      </div>
    );

  }


  return (

    <div className="space-y-8">

      {/* Page Header */}

      <div>

        <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-700">
          Customer Management
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          Users
        </h1>

        <p className="mt-2 text-sm text-stone-500">
          Manage customer accounts and account status.
        </p>

      </div>


      {/* User Table Card */}

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">

        {/* Table Header */}

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-lg font-semibold text-stone-900">
              User List
            </h2>

            <p className="mt-1 text-sm text-stone-500">
              View and manage registered users
            </p>

          </div>


          {/* User Count */}

          <div className="rounded-full bg-emerald-50 px-4 py-2">

            <span className="text-sm font-medium text-emerald-700">
              {users.length} Users
            </span>

          </div>

        </div>


        {/* User Table */}

        <UserTable
          users={currentUsers}
          onToggleBlock={handleToggleBlock}
        />


        {/* Pagination */}

        <div className="mt-6 border-t border-stone-100 pt-5">

          <Pagination
            currentPage={currentPage}
            totalPage={totalPages}
            onPageChange={changePage}
          />

        </div>

      </div>

    </div>

  );
}

export default Users;