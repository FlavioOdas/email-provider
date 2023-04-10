import React, { useEffect, useRef } from 'react';

import { Socket, io } from 'socket.io-client';

import Login from './components/Login';
import MainEmailPage from './components/MainPage';

import { useSessionContext } from '../../contexts/sessionContext';

const PageWrapper = () => {
  const { user } = useSessionContext();
  const socket = useRef<Socket>(io('http://localhost:3000')).current;

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Connected');
    });

    return () => {
      socket.disconnect();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user ? <MainEmailPage socket={socket} /> : <Login />;
};

export default PageWrapper;
