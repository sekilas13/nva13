import { createContext } from "react";
import { useLocalObservable } from "mobx-react";
import { sweetal } from "../config";

const Context = createContext();

const Provider = ({ children }) => {
  const store = useLocalObservable(() => ({
    isLogin: false,
    token: null,
    isNewLogin: false,
    username: null,
    userId: null,
    role: null,
    log: [],
    setLogin: (bool) => (store.isLogin = bool),
    setNewLogin: (bool) => (store.isNewLogin = bool),
    setUsername: (string) => (store.username = string),
    setUID: (string) => (store.userId = string),
    setJWT: (string) => (store.token = string),
    setRole: (string) => (store.role = string),
    addLog: (arr) => store.log.push(arr),
    config: { sweetal },
    Logout: function () {
      this.setNewLogin(false);
      this.setUsername(null);
      this.setUID(null);
      this.setJWT(null);
      this.setRole(null);
      this.setLogin(false);
    },
  }));

  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export { Context, Provider };
