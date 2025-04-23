"use client";
import React, { useContext, useEffect, useState } from "react";
import { useAuth0, User } from "@auth0/auth0-react";

const UserContext = React.createContext({});
const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const {user, loginWithRedirect, logout} = useAuth0();
    const [isAuthenticated, setIsAuthenticated] = useState <User | null>(null);
    useEffect(() => {
        if(user) setIsAuthenticated(user);
    }, [user]);
    return (
        <UserContext.Provider value={{loginWithRedirect, logout, isAuthenticated}}>
            {children}
        </UserContext.Provider>
)
};

export const useUserContext = () => {
    return useContext(UserContext);
}
export default UserProvider;