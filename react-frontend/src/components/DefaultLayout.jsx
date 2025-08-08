import { Outlet, Navigate, Link} from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { use, useEffect } from "react";
import '../index.css';
import axiosClient from "../axios-client";
import axios from "axios";  


export default function DefaultLayout(){

    const {user, token, setUser, setToken} = useStateContext();
    if(!token){
        return <Navigate to="/login" />
    }

    const onLogout = (event) => {
        event.preventDefault();

        axiosClient.post('/logout')
            .then(() => {
                setUser({});
                setToken(null);
                localStorage.removeItem('ACCESS_TOKEN');
                window.location.reload();
            })
    }

    useEffect(() => {
        axiosClient.get('/user').then(({data}) => {
            setUser(data);
        })}, []);

    return (
        <div>
            <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
                Hello, {user.name}
                <Link to="/dashboard" className="font-semibold">Dashboard</Link>
                <Link to="/users">Users</Link>
                <a href="#" onClick={(onLogout)}>Logout</a>
            </header>
            <div>
                
                
            </div>
            <main>
                <Outlet />
            </main>
        </div>
    );
}