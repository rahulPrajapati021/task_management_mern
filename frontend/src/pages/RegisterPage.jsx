export default function RegisterPage() {
  return (
    <div className="h-screen w-screen bg-gray-800 flex justify-center items-center">
      {/* login form */}
      <form className="bg-slate-700 shadow-2xl inline-block p-4 text-white rounded-md">
        <div className="flex space-x-10 mb-8">
          <div>
            <h3 className="text-xl font-bold">Register a new user</h3>
            <p>Enter your full name, email & password </p>
          </div>
          <div className="w-16">
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="fullName">Full Name</label>
          <input
            className="border-2 rounded-lg px-4 py-2"
            type="text"
            name="fullName"
            id="fullName"
          />
          <label htmlFor="email">Email</label>
          <input
            className="border-2 rounded-lg px-4 py-2"
            type="email"
            name="email"
            id="email"
          />
          <label htmlFor="password">Password</label>
          <input
            className="border-2 rounded-lg px-4 py-2"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="flex justify-end mt-4">
        <input className="border-2 rounded-md px-4 py-2 cursor-pointer text-white" type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
}
