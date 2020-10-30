import { createContext } from "react";
import { useLocalObservable } from "mobx-react";

const Context = createContext();

const Provider = ({ children }) => {
  const store = useLocalObservable(() => ({
    isLogin: false,
    token: null,
    isNewLogin: false,
    username: null,
    userId: null,
    role: null,
    setLogin: (bool) => (store.isLogin = bool),
    setNewLogin: (bool) => (store.isNewLogin = bool),
    setUsername: (string) => (store.username = string),
    setUID: (string) => (store.userId = string),
    setJWT: (string) => (store.token = string),
    setRole: (string) => (store.role = string),
  }));

  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export { Context, Provider };
