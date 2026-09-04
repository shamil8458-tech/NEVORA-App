import {useDispatch} from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from '../services/userService';
import {Login as loginUserRedux} from '../Redux/Slice/authSlice'
import { useState } from 'react';



function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [formData ,setFormData] = useState({
        email : "",
        password : "",
    });

    const [error , setError] = useState("")

    const loginMutation = useMutation({
        mutationFn : loginUser,

        onSuccess : (user) => {
            dispatch(loginUserRedux(user))

            navigate("/");
        },

        onError : (error) => {
            setError(error.message);
        },
    });


    const handlechange = (e) => {
        const {name , value} = e.target;

        setFormData({
            ...formData ,
            [name] : value,
        });
    };



    const handlesubmit = (e) => {
        e.preventDefault();

        const {email , password} = formData;


        if(!email || !password){
            setError("Email and password are required!")
            return;
        }

        loginMutation.mutate({
            email,
            password
        });
    };
  
  return (
    <div>


        <h2>Login</h2>


        <form onSubmit={handlesubmit}>

        <input type="email" 
        name='email'
        placeholder='email'
        value={formData.email}
        onChange={handlechange}
         />

         <br />


         <input type="password" 
         name='password'
         placeholder='password'
         value={formData.password}
         onChange={handlechange}
         />

         <br />


         <button type='submit'>Login</button>
        </form>
       

       {error && <p>{error}</p>}

       <p>
         Don't have an account?{" "}
         <Link to={"/register"}>
         Register
         </Link>
       </p>
    </div>
  )
}

export default Login
