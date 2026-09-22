
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from "react-router-dom"
import { loginUser } from '../services/userService'
import { Login as loginUserRedux } from '../Redux/Slice/authSlice'
import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, Leaf, ArrowRight } from 'lucide-react'
import { adminLogin } from '../admin/redux/slices/adminAuthSlice'


function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)


    const loginMutation = useMutation({
        mutationFn: loginUser,

        onSuccess: (user) => {
           

            if(user.role === "admin"){
                
                dispatch(adminLogin(user))

                navigate("/admin")
            }else{
                 dispatch(loginUserRedux(user))
                navigate("/")
            }
            
        },

        onError: (error) => {
            setError(error.message)
        },
    })


    const handlechange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value,
        })
    }


    const handlesubmit = (e) => {
        e.preventDefault()

        const { email, password } = formData

        if (!email || !password) {
            setError("Email and password are required!")
            return
        }

        loginMutation.mutate({
            email,
            password
        })
    }


    return (
        <div className="min-h-screen bg-[#f5f2ea]">

            <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">

                {/* Left Side - Skincare Image */}

                <div className="relative hidden min-h-screen overflow-hidden md:block">

                    <img
                        src="/Loginpage/Login012.png"
                        alt="Skincare"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/10"></div>


                    <div className="absolute bottom-16 left-12 max-w-sm text-gray-900">

                        <div className="mb-5 flex items-center gap-2">
                            <Leaf size={20} strokeWidth={1.5} />
                            <span className="text-xs uppercase tracking-[0.25em]">
                                Welcome Back
                            </span>
                        </div>


                        <h1 className="font-serif text-5xl leading-tight">
                            Good Skin
                            <br />
                            Takes A Little
                            <br />
                            Care
                        </h1>


                        <p className="mt-5 max-w-xs text-sm leading-6 text-gray-900">
                            Continue your journey towards healthier,
                            happier skin.
                        </p>

                    </div>

                </div>


                {/* Right Side - Login */}

                <div className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">

                    <div className="w-full max-w-md">

                        {/* Logo */}

                        <div className="mb-10 flex justify-center">

                            <div className="flex items-center gap-2 text-[#263a29]">

                                <Leaf
                                    size={25}
                                    strokeWidth={1.5}
                                />

                                <span className="font-serif text-2xl tracking-wide">
                                    NEVORA
                                </span>

                            </div>

                        </div>


                        {/* Heading */}

                        <div className="mb-8">

                            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#69745f]">
                                Login
                            </p>

                            <h2 className="font-serif text-4xl text-[#1d2b20]">
                                Welcome Back
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Sign in to your account and continue
                                exploring your skincare journey.
                            </p>

                        </div>


                        {/* Form */}

                        <form onSubmit={handlesubmit} className="space-y-5">


                            {/* Email */}

                            <div>

                                <label className="mb-2 block text-xs font-medium text-gray-700">
                                    Email Address
                                </label>

                                <div className="relative">

                                    <Mail
                                        size={18}
                                        strokeWidth={1.5}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handlechange}
                                        className="w-full border border-[#ddd9cf] bg-[#faf9f5] py-3.5 pl-12 pr-4 text-sm text-gray-800 outline-none transition focus:border-[#42553e]"
                                    />

                                </div>

                            </div>


                            {/* Password */}

                            <div>

                                <label className="mb-2 block text-xs font-medium text-gray-700">
                                    Password
                                </label>

                                <div className="relative">

                                    <Lock
                                        size={18}
                                        strokeWidth={1.5}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handlechange}
                                        className="w-full border border-[#ddd9cf] bg-[#faf9f5] py-3.5 pl-12 pr-12 text-sm text-gray-800 outline-none transition focus:border-[#42553e]"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} strokeWidth={1.5} />
                                        ) : (
                                            <Eye size={18} strokeWidth={1.5} />
                                        )}
                                    </button>

                                </div>

                            </div>


                            {/* Error */}

                            {error && (
                                <p className="text-sm text-red-600">
                                    {error}
                                </p>
                            )}


                            {/* Login Button */}

                            <button
                                type="submit"
                                disabled={loginMutation.isPending}
                                className="flex w-full items-center justify-center gap-2 bg-[#263a29] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#344a37] disabled:cursor-not-allowed disabled:opacity-60"
                            >

                                {loginMutation.isPending
                                    ? "Logging in..."
                                    : "Login"
                                }

                                {!loginMutation.isPending && (
                                    <ArrowRight size={17} strokeWidth={1.5} />
                                )}

                            </button>


                        </form>


                        {/* Register Link */}

                        <div className="mt-8 text-center">

                            <p className="text-sm text-gray-500">

                                Don't have an account?{" "}

                                <Link
                                    to="/register"
                                    className="font-medium text-[#263a29] transition hover:underline"
                                >
                                    Register
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Login