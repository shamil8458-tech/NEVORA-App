import { useState } from "react";
import { registerUser } from "../services/userService"
import { useMutation } from "@tanstack/react-query";

function Register() {

    const [formData , setFormData] = useState({
        name : "",
        email : "",
        password : "",
        confirmPassword: "",
    })

    const [error , setError] = useState("")
    const [success , setSuccess] = useState("")

    const registerMutation = useMutation({
        mutationFn : registerUser ,


        onSuccess : () => {
            setSuccess("Registration successful!")
            setError("")


            setFormData({
                name :"",
                email :"",
                password : "",
                confirmPassword: ""

            });
        },
        onError : (error) => {
            setError(error.message)
            setSuccess("")
        },
    });


    const handlechange = (e) => {
        const {name , value} = e.target;

        setFormData({
            ...formData,
            [name] : value
        });
    };


    const handlesubmit = (e) => {
        e.preventDefault();


        setError("")
        setSuccess("")


        const {name , email , password ,confirmPassword} = formData;


        if(!name || !email || !password || !confirmPassword){
            setError("All fields are required!");
            return;
            
        }


        if(password !== confirmPassword){
            setError("Passwords do not match!");
            return
        }


        registerMutation.mutate({
            name,
            email,
            password,
        });
    };


  return (
    <div>


        <h3>Register</h3>


    <form onSubmit={handlesubmit}>
         

         <input type="text"
         name="name"
         placeholder="name"
         value={formData.name}
         onChange={handlechange} />


         <br />



         <input type="email"
         name="email"
         placeholder="email"
         value={formData.email}
         onChange={handlechange} />

         <br />

         <input type="password"
         name="password"
         placeholder="password"
         value={formData.password}
         onChange={handlechange} />


         <br />


         <input type="password"
         name="confirmPassword"
         placeholder="confirmPassword"
         value={formData.confirmPassword}
         onChange={handlechange} />


         <br />


         <button type="submit">Register</button>
        </form>   


        {error && <p>{error}</p>}  
        {success && <p>{success}</p>} 

        
    </div>
  )
}

export default Register
