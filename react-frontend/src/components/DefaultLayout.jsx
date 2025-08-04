import { Outlet, Navigate} from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { use } from "react";

export default function DefaultLayout(){

    const {user, token} = useStateContext();
    if(!token){
        return <Navigate to="/login" />
    }

    return (
        <div>
            <h1>Default Layout</h1>
            <Outlet />
        </div>
    );
}