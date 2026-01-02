import { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import apiService from "../services/apiService";
import useAuth from "../context/AuthContext";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [err, setErr] = useState(null);

    const {login} = useAuth();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        apiService.register(fullName, email, password).then(res => {
            const token = res.token;
            login(token);
            navigate("/");
        }).catch(err => setErr(err.message))
    }
  return (
    <div className="h-screen w-screen bg-gray-800 flex justify-center items-center">
      {/* login form */}
      <form onSubmit={handleSubmit} className="bg-slate-700 shadow-2xl inline-block p-4 text-white rounded-md">
        <div className="flex space-x-10 mb-8">
          <div>
            {err?<h1 className="text-red-400">{err}</h1>:""}
            <h3 className="text-xl font-bold">Register a new user</h3>
            <p>Enter your full name, email & password </p>
          </div>
          <div className="w-16"></div>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="fullName">Full Name</label>
          <input
            className="border-2 rounded-lg px-4 py-2"
            type="text"
            name="fullName"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            className="border-2 rounded-lg px-4 py-2"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}            
          />
          <label htmlFor="password">Password</label>
          <input
            className="border-2 rounded-lg px-4 py-2"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}            
          />
        </div>
        <div className="flex justify-between mt-4">
          <div className="text-[14px]">
            <span>
              Have an account,
              <Link className="text-blue-400" to="/login">
                {" "}
                Login here
              </Link>
            </span>
          </div>
          <input
            className="border-2 rounded-md px-4 py-2 cursor-pointer text-white"
            type="submit"
            value="Register"
          />
        </div>
      </form>
    </div>
  );
}
