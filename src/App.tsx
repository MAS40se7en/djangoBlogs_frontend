import { BrowserRouter, Route, Routes } from "react-router"
import { AuthLayout } from "./layouts/AuthLayout"
import Login from "./pages/Login"
import { Register } from "./pages/Register"
import { DashboardLayout } from "./layouts/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import Blog from "./pages/Blog"
import UserBlogs from "./pages/UserBlogs"
import CreateBlog from "./pages/CreateBlog"
import UpdateBlog from "./pages/UpdateBlog"
import Profile from "./pages/Profile"
import UpdateProfile from "./pages/UpdateProfile"
import Blogger from "./pages/Blogger"
import ProtectedRoutes from "./components/ProtectedRoutes"
import AppLayout from "./layouts/AppLayout"
import NotFound from "./pages/NotFound"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import api from "./lib/api"
import { useQuery } from "@tanstack/react-query"
import { getUsername } from "./services/apiBlog"

const App = () => {

    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    const { data } = useQuery({
        queryKey: ['username'],
        queryFn: getUsername
    })

    useEffect(() => {
        const authorize = async () => {
            const token = localStorage.getItem("access");

            if (!token) {
                setIsAuthorized(false);
                return;
            }

            try {
                const decodedToken = jwtDecode<{ exp: number }>(token);
                const now = Date.now() / 1000;

                if (now > decodedToken.exp) {
                    console.log("Token expired. Refreshing...");
                    await refreshToken();
                } else {
                    console.log("Token valid.");
                    setIsAuthorized(true);
                }
            } catch (err) {
                console.error("Invalid token:", err);
                setIsAuthorized(false);
            }
        };

        authorize();
        if (data) {
            setUsername(data.username)
        }
    }, [data]);

    async function refreshToken() {
        const refresh = localStorage.getItem('refresh')

        try {
            const response = await api.post('/token_refresh/', { refresh })

            if (response.status === 200) {
                localStorage.setItem('access', response.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            setIsAuthorized(false)
            console.log(error)
        }
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route 
                path="/" 
                element={<AppLayout 
                />} >
                <Route path='auth' element={<AuthLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path='*' element={<NotFound />} />
                </Route>

                <Route
                    path=''
                    element={<DashboardLayout isAuthorized={isAuthorized} username={username} />}>
                    <Route path='*' element={<NotFound />} />
                    <Route path='' element={<Dashboard />} />
                    <Route path='blogs/:slug' element={<Blog />} />
                    <Route path='myBlogs' element={<UserBlogs />} />
                    <Route 
                    path='' 
                    element={
                        <ProtectedRoutes isAuthorized={isAuthorized} />
                    }>
                    <Route path='create' element={<CreateBlog />} />
                    </Route>
                    <Route path='updateBlog/:id' element={<UpdateBlog />} />
                    <Route path='profile' element={<Profile username={username} />} />
                    <Route path='updateProfile' element={<UpdateProfile />} />
                    <Route path='blogger/:id' element={<Blogger />} />
                </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App