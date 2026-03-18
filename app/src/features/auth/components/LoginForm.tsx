import { Link } from "react-router-dom";

const submitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("login");
}
export const LoginForm = () => {
  return (
    <div className="w-full max-w-2xl border-2 rounded-xl border-cyan-400 py-12 backdrop-blur-md shadow-[0_0_20px_#22d3ee]">
        <form onSubmit={submitLogin} className="text-white flex flex-col items-center text-xl font-sans select-none">
            <h1 className="text-4xl mb-6 italic font-bold drop-shadow-[0_0_15px_#fff]">Login into your account</h1>
            <input 
            type="text" 
            placeholder="Username" 
            className="border-2 border-[#d946ef] rounded-xl px-4 py-2 mb-4 shadow-[0_0_20px_#d946ef]
          placeholder-[#94a3b8] outline-none w-full max-w-sm bg-transparent focus:shadow-[0_0_25px_#d946ef]"/>

            <input 
            type="password" 
            placeholder="Password" 
            className="border-2 border-[#d946ef] rounded-xl px-4 py-2 mb-6 shadow-[0_0_20px_#d946ef] 
            placeholder-[#94a3b8] outline-none w-full max-w-sm bg-transparent focus:shadow-[0_0_25px_#d946ef]"/>

            <button 
            className="border-2 border-[#db2777] rounded-xl px-4 py-2 w-sm shadow-[0_0_20px_#db2777] hover:bg-[#db2777]/20 transition-all 
            cursor-pointer uppercase tracking-wider font-black italic"
            >Login</button>

            <p 
            className="text-sm mt-5">Dont have an account?
            <strong>
                <Link to="/register" className="cursor-pointer hover:text-gray-400 pl-2">Register here</Link>
            </strong>
            </p>
        </form>
    </div>
  )
}
