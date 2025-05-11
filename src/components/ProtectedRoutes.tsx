import { Icon } from "@iconify/react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = ({ isAuthorized }: { isAuthorized: boolean | null }) => {
    

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