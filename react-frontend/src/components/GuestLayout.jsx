import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function GuestLayout(){
    const {token} = useStateContext();
    if(token){
        return <Navigate to="/" />
    }
    return (
        <div className="text-emerald-500">
            <h1>Guest Layout</h1>
            <Outlet />
        </div>
    );
}