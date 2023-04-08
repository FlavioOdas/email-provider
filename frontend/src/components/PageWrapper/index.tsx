import React, { useEffect, useRef } from "react";
import MainEmailPage from "./components/MainPage";
import Login from "./components/Login";
import { useSessionContext } from "../../contexts/sessionContext";
import { Socket, io } from "socket.io-client";

const PageWrapper = () => {
  const { user } = useSessionContext();
  const socket = useRef<Socket>(io("http://localhost:3000")).current;

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return user ? <MainEmailPage socket={socket} /> : <Login />;
};

export default PageWrapper;
