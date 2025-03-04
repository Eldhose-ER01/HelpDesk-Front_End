import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import './signup.css'
import { userApi } from "../../Api/Api";
export default function Usersignup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const initialValue = {
    username: "",
    email: "",
    password: "",
  };

  const [formValue, setFormValue] = useState(initialValue);

  const [isValidEmail, setIsValidEmail] = useState(true);

  // Email validation function
  const validateEmail = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(inputEmail));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });

    if (name === "email") {
      validateEmail(value);
    }
  };

  const handleSignup = async () => {
    try {
        const response = await axios.post(`${userApi}/signup`, formValue);

        if (response.data.success) {
            toast.success("User registered successfully");
            setFormValue(initialValue); 
        } else {
            toast.error(response.data.message); 
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            toast.error("Email already exists"); // Handle duplicate email
        } else {
            toast.error("Signup failed. Please try again.");
        }
    }
};


  return (
    <section className="bg-white">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-sm custom-shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
              Create an Account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleSignup)}>
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-black">
                  Username
                </label>
                <input
                  {...register("username", {
                    required: "Please fill the username",
                    pattern: {
                      value: /^[^\s].*[^\s]$/,
                      message: "Leading or trailing spaces are not allowed",
                    },
                  })}
                  type="text"
                  name="username"
                  id="username"
                  value={formValue.username}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter your name"
                />
                {errors.username && <span className="text-red-700">{errors.username.message}</span>}
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "Please fill the email",
                    pattern: {
                      value: /^[^\s].*[^\s]$/,
                      message: "Leading or trailing spaces are not allowed",
                    },
                  })}
                  type="email"
                  name="email"
                  id="email"
                  value={formValue.email}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@gmail.com"
                />
                {errors.email && <span className="text-red-700">{errors.email.message}</span>}
                {!isValidEmail && <span className="text-red-700">Invalid Email Format</span>}
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "Please fill the password",
                    pattern: {
                      value: /^[^\s].*[^\s]$/,
                      message: "Leading or trailing spaces are not allowed",
                    },
                  })}
                  type="password"
                  name="password"
                  id="password"
                  value={formValue.password}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="••••••••"
                />
                {errors.password && <span className="text-red-700">{errors.password.message}</span>}
              </div>

            

              <button
                type="submit"
                className="w-full text-white bg-black hover:bg-green-400 hover:text-black hover:font-bold  font-medium rounded-sm text-sm px-5 py-2.5 text-center"
              >
                Create an Account
              </button>

              <p className="text-sm font-light text-black">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-blue-600 hover:underline">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
