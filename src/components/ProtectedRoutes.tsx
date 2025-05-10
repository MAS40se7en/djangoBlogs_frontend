import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Icon } from "@iconify/react";
import { Navigate, Outlet, useLocation } from "react-router";
import api from "@/lib/api";

const ProtectedRoutes = () => {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const location = useLocation();

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
    }, []);

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

    if (isAuthorized === null) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Icon icon="codex:loader" className="w-12 h-12 animate-spin" />
            </div>
        );
    }

    return isAuthorized ? (
        <Outlet />
    ) : (
        <Navigate to="/auth/login" state={{ from: location }} replace />
    );
}

export default ProtectedRoutes