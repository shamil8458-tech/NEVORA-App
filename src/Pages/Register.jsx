import { useState } from "react";
import { registerUser } from "../services/userService";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Leaf,
    ArrowRight
} from "lucide-react";


function Register() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    const registerMutation = useMutation({
        mutationFn: registerUser,

        onSuccess: () => {
            setSuccess("Registration successful!")
            setError("")

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            })
        },

        onError: (error) => {
            setError(error.message)
            setSuccess("")
        },
    })


    const handlechange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }


    const handlesubmit = (e) => {
        e.preventDefault()

        setError("")
        setSuccess("")

        const {
            name,
            email,
            password,
            confirmPassword
        } = formData


        if (!name || !email || !password || !confirmPassword) {
            setError("All fields are required!")
            return
        }


        if (password !== confirmPassword) {
            setError("Passwords do not match!")
            return
        }


        registerMutation.mutate({
            name,
            email,
            password,
        })
    }


    return (
        <div className="min-h-screen bg-[#f5f2ea]">

            <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">


                {/* Left Side - Skincare Image */}

                <div className="relative hidden min-h-screen overflow-hidden md:block">

                    <img
                        src="/Loginpage/register1.png"
                        alt="Skincare"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/10"></div>


                    <div className="absolute bottom-16 left-12 max-w-sm text-white">

                        <div className="mb-5 flex items-center gap-2">

                            <Leaf
                                size={20}
                                strokeWidth={1.5}
                            />

                            <span className="text-xs uppercase tracking-[0.25em]">
                                Join Our Community
                            </span>

                        </div>


                        <h1 className="font-serif text-5xl leading-tight">
                            Create Your
                            <br />
                            Own Beauty
                            <br />
                            Ritual
                        </h1>


                        <p className="mt-5 max-w-xs text-sm leading-6 text-white/80">
                            Start your journey towards healthier,
                            happier skin.
                        </p>

                    </div>

                </div>


                {/* Right Side - Register */}

                <div className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">

                    <div className="w-full max-w-md">


                        {/* Logo */}

                        <div className="mb-8 flex justify-center">

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

                        <div className="mb-7">

                            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#69745f]">
                                Register
                            </p>

                            <h2 className="font-serif text-4xl text-[#1d2b20]">
                                Create Your Account
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Create your account and start your
                                skincare journey with us.
                            </p>

                        </div>


                        {/* Form */}

                        <form
                            onSubmit={handlesubmit}
                            className="space-y-4"
                        >


                            {/* Name */}

                            <div>

                                <label className="mb-2 block text-xs font-medium text-gray-700">
                                    Full Name
                                </label>

                                <div className="relative">

                                    <User
                                        size={18}
                                        strokeWidth={1.5}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handlechange}
                                        className="w-full border border-[#ddd9cf] bg-[#faf9f5] py-3.5 pl-12 pr-4 text-sm text-gray-800 outline-none transition focus:border-[#42553e]"
                                    />

                                </div>

                            </div>


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
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={handlechange}
                                        className="w-full border border-[#ddd9cf] bg-[#faf9f5] py-3.5 pl-12 pr-12 text-sm text-gray-800 outline-none transition focus:border-[#42553e]"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} strokeWidth={1.5} />
                                        ) : (
                                            <Eye size={18} strokeWidth={1.5} />
                                        )}
                                    </button>

                                </div>

                            </div>


                            {/* Confirm Password */}

                            <div>

                                <label className="mb-2 block text-xs font-medium text-gray-700">
                                    Confirm Password
                                </label>

                                <div className="relative">

                                    <Lock
                                        size={18}
                                        strokeWidth={1.5}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handlechange}
                                        className="w-full border border-[#ddd9cf] bg-[#faf9f5] py-3.5 pl-12 pr-12 text-sm text-gray-800 outline-none transition focus:border-[#42553e]"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                                    >
                                        {showConfirmPassword ? (
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


                            {/* Success */}

                            {success && (
                                <p className="text-sm text-green-700">
                                    {success}
                                </p>
                            )}


                            {/* Register Button */}

                            <button
                                type="submit"
                                disabled={registerMutation.isPending}
                                className="mt-2 flex w-full items-center justify-center gap-2 bg-[#263a29] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#344a37] disabled:cursor-not-allowed disabled:opacity-60"
                            >

                                {registerMutation.isPending
                                    ? "Registering..."
                                    : "Create Account"
                                }

                                {!registerMutation.isPending && (
                                    <ArrowRight
                                        size={17}
                                        strokeWidth={1.5}
                                    />
                                )}

                            </button>

                        </form>


                        {/* Login Link */}

                        <div className="mt-7 text-center">

                            <p className="text-sm text-gray-500">

                                Already have an account?{" "}

                                <Link
                                    to="/login"
                                    className="font-medium text-[#263a29] hover:underline"
                                >
                                    Login
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Register