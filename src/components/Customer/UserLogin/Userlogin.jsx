import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addUser } from "../../../Redux/UserSlice";
import { userApi } from "../../Api/Api";
export default function Userlogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValue = {
    
    email: "",
    password: "",
  };
const[formValue,setFormValue]=useState(initialValue)
  const handlechange=(e)=>{
    e.preventDefault()
    const{name,value}=e.target
    setFormValue({...formValue,[name]:value.trim()})
  }
  const handlelogin = async (formValue) => {
    try {
      const response = await axios.post(`${userApi}/login`, formValue);

      if (response.data.success) {
        
        dispatch(
          addUser({
            username: response.data.data.username,
            token: response.data.data.token,
          })
        );
        localStorage.setItem("token", response.data.data.token);
        toast.success("Login Successfull")
        navigate('/home');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Email or Password is invalid");
      } else if (error.response && error.response.status === 401) {
        toast.error("User Blocked");
      } 
      else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <section className="bg-white">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-sm custom-shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handlelogin)}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "Please fill the email",
                    
                  })}
                  type="email"
                  name="email"
                  id="email"
                  value={formValue.email}
                  onChange={handlechange}
                  className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@gmail.com"
                />
                {errors.email && <span className="text-red-700">{errors.email.message}</span>}
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "Please fill the password",
                    
                  })}
                  type="password"
                  name="password"
                  id="password"
                  value={formValue.password}
                  onChange={handlechange}
                  className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="••••••••"
                />
                {errors.password && <span className="text-red-700">{errors.password.message}</span>}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-black hover:bg-green-400 hover:text-black hover:font-bold  font-medium rounded-sm text-sm px-5 py-2.5 text-center"
              >
                Submit
              </button>

              <p className="text-sm font-light text-black">
                Don't have an account?{" "}
                <Link to="/signup" className="font-medium text-blue-600 hover:underline">
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}