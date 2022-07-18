import React, { createContext, useContext, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
export const GET_PROFILE = gql`
  query GetUserProfile {
    userProfile {
      name
      _id
      email
      avatar
      description
    }
  }
`;
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const { data, error, loading: authLoading } = useQuery(GET_PROFILE);

  useEffect(() => {
    if (!authLoading && !error && data) {
      setUser(data.userProfile);
    }
  }, [data]);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
