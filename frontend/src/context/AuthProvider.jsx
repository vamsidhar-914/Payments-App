import { createContext, useEffect, useState } from "react";

const Context = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("token", {});
  console.log(auth);

  return (
    <Context.Provider value={{ auth, setAuth }}>{children}</Context.Provider>
  );
};

export default Context;

function useLocalStorage(key, initialValue) {
  const [value, setvalue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) return initialValue;

    return JSON.parse(jsonValue);
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setvalue];
}
