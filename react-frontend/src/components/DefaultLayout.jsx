import { Outlet, Navigate, Link} from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { use } from "react";
import '../index.css';


export default function DefaultLayout(){

    const {user, token} = useStateContext();
    if(!token){
        return <Navigate to="/login" />
    }

    const onLogout = (event) => {
        event.preventDefault();
    }

    return (
        <div>
            <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
                Hello, {user.name}
                <Link to="/dashboard" className="font-semibold">Dashboard</Link>
                <Link to="/users">Users</Link>
                <a href="#" onClick={(logout) => {}}>Logout</a>
            </header>
            <div>
                
                
            </div>
            <main>
                <Outlet />
            </main>
        </div>
    );
}