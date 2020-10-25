import { createContext } from "react";
import { useLocalObservable } from "mobx-react";

const Context = createContext();

const Provider = ({ children }) => {
  const store = useLocalObservable(() => ({
    isLogin: false,
    isNewLogin: false,
    username: null,
    userId: null,
    setLogin: (bool) => (store.isLogin = bool),
    setNewLogin: (bool) => (store.isNewLogin = bool),
    setUsername: (string) => (store.username = string),
    setUID: (string) => (store.userId = string),
  }));

  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export { Context, Provider };
