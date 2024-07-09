import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext({
	user: null,
	handleLogin: (token) => {},
	handleLogout: () => {},
});

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const handleLogin = async (token) => {
		const jwt_decode = (await import("jwt-decode")).default;
		const decodedUser = jwt_decode(token);
		localStorage.setItem("userId", decodedUser.sub);
		localStorage.setItem("userRole", decodedUser.roles);
		localStorage.setItem("token", token);
		setUser(decodedUser);
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
export default AuthProvider;
