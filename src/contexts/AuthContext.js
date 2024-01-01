import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase-config";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = async () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setCurrentUser(user);
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        localStorage.removeItem("currentUser");
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const login = async (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};
