import { createContext } from "react";
import { useLocalObservable } from "mobx-react";
import { sweetal, kelas } from "../config";

const Context = createContext();

const Provider = ({ children }) => {
  const store = useLocalObservable(() => ({
    isLogin: false,
    dataSiswa: [],
    token: null,
    isNewLogin: false,
    username: null,
    userId: null,
    role: null,
    socketStatus: false,
    log: [],
    setLogin: (bool) => (store.isLogin = bool),
    setNewLogin: (bool) => (store.isNewLogin = bool),
    setUsername: (string) => (store.username = string),
    setUID: (string) => (store.userId = string),
    setJWT: (string) => (store.token = string),
    setRole: (string) => (store.role = string),
    addLog: (arr) => store.log.push(arr),
    setSockStatus: (bool) => (store.socketStatus = bool),
    addDataSiswa: (arr) =>
      arr.forEach((data) => {
        store.dataSiswa.push(data);
      }),
    updateDataSiswa: (arr) => {
      store.dataSiswa = [];
      store.addDataSiswa(arr);
    },
    deleteOneSiswa: (_id) => {
      const index = store.dataSiswa.findIndex((x) => x._id === _id);
      store.dataSiswa.splice(index, 1);
    },
    config: { sweetal, kelas },
    Logout: function () {
      this.setNewLogin(false);
      this.setUsername(null);
      this.setUID(null);
      this.setJWT(null);
      this.setRole(null);
      if (this.log.length > 0) this.log = [];
      this.setSockStatus(false);
      this.setLogin(false);
    },
    genSendData: function () {
      return {
        role: this.role,
        id: this.userId,
        username: this.username,
        sended: Date.now(),
      };
    },
  }));

  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export { Context, Provider };
