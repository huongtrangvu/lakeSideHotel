import React, { createContext, useState, useContext } from "react";
import { getUser } from "../utils/ApiFunctions";

export const AuthContext = createContext({
	user: null,
	handleLogin: (id, token) => {},
	handleLogout: () => {},
});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState({
		id: "",
		email: "",
		firstName: "",
		lastName: "",
		roles: [],
	});

	const handleLogin = async (email, token) => {
		localStorage.setItem("token", token);
		try {
			// Fetch user data by email
			const userData = await getUser(email, token);
			setUser(userData);

			// Save user data to localStorage
			localStorage.setItem("userId", email);
			localStorage.setItem("userRole", JSON.stringify(userData.roles));
		} catch (error) {
			console.error("Failed to fetch user data:", error);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("userId");
		localStorage.removeItem("userRole");
		localStorage.removeItem("token");
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
