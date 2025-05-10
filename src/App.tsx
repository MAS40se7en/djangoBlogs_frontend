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

const App = () => {

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
                    element={<DashboardLayout/>}>
                    <Route path='*' element={<NotFound />} />
                    <Route path='' element={<Dashboard />} />
                    <Route path='blogs/:slug' element={<Blog />} />
                    <Route path='myBlogs' element={<UserBlogs />} />
                    <Route 
                    path='' 
                    element={
                        <ProtectedRoutes />
                    }>
                    <Route path='create' element={<CreateBlog />} />
                    </Route>
                    <Route path='updateBlog/:id' element={<UpdateBlog />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='updateProfile' element={<UpdateProfile />} />
                    <Route path='blogger/:id' element={<Blogger />} />
                </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App