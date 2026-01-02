import { useState } from "react";
import apiService from "../services/apiService";
import useAuth from "../context/AuthContext";
import { Link, useNavigate } from "react-router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await apiService.login(email, password);
      login(data.token);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  return (
    <div className="h-screen w-screen bg-gray-800 flex justify-center items-center">
      {/* login form */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-700 shadow-2xl inline-block p-4 text-white rounded-md"
      >
        {error ? error : ""}
        <div className="flex space-x-10 mb-8">
          <div>
            <h3 className="text-xl font-bold">Login to your account</h3>
            <p>Enter your email & password </p>
          </div>
          <div className="w-20"></div>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="email">Email</label>
          <input
            className="border-2 rounded-lg px-4 py-2"
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            className="border-2 rounded-lg px-4 py-2"
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between mt-4">
            <div className="text-[14px]">
                <span>
                    Don't have account,  
                <Link className="text-blue-400" to="/register">{" "}Register here</Link>
                </span>
            </div>
          <input
            className="border-2 rounded-md px-4 py-2 cursor-pointer text-white"
            type="submit"
            value="Login"
          />
        </div>
      </form>
    </div>
  );
}
