import { BrowserRouter, Routes, Route } from 'react-router-dom';
import app from 'src/config/FirebaseConfig';

import MainLayout from 'src/layout/MainLayout';
import Chat from 'src/pages/App/Chat';
import Story from 'src/pages/App/Story';
import StarredMessages from 'src/pages/App/StarredMessages';
import Archived from 'src/pages/App/Archived';
import Email from 'src/pages/Email/Email';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AuthService from 'src/services/Auth/AuthService';
import { useDispatch } from 'react-redux';
import { setUser, setUserAdditionalData } from 'src/store/slices/UserSlice';
import { setChatrooms } from 'src/store/slices/ChatroomSlice';


import CssBaseline from '@mui/material/CssBaseline';
import AuthLayout from './layout/AuthLayout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UserData } from './types/dto';
import Loading from 'src/components/globals/Loading';
import PrivateRoute from './components/Routes/PrivateRoute';
import ChatGlobalInboxService from './services/Chat/ChatGlobalInboxService';
import ContactService from './services/Contact/ContactService';
import Call from './pages/App/Call';
import IncomingCallDialog from './components/dialogs/call/IncomingCallDialog';
import HandleCallService from './services/Call/HandleCallService';
import { setCallLogs } from './store/slices/CallInfoSlice';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {


  const [authState, setAuthState] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();


  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthState(true);
        const data: UserData = AuthService.getUserData(user);
        dispatch(setUser(data));
        ChatGlobalInboxService.listenForIncomingMessages(user.uid, dispatch);

        const additionalData = await AuthService.getUserAdditionalData(user);

        if (additionalData) {
          dispatch(setUserAdditionalData(additionalData));
        }

      } else {
        setAuthState(false);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };

  }, [dispatch]);


  useEffect(() => {

    const fetchChats = async () => {
      setLoading(true);
      const _chats = await ContactService.loadUserContact();
      dispatch(setChatrooms(_chats.contacts));

      const calls = await HandleCallService.getUserCalls();
      if(calls.success){
        dispatch(setCallLogs(calls.calls));
      }
      setLoading(false);

    };
    
    fetchChats();
    
  }, [dispatch]);



  if (loading) {
    return <Loading />;
  }


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <IncomingCallDialog />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<PrivateRoute isAuth={authState} element={<Chat />} />} />
            <Route path="story" element={<PrivateRoute isAuth={authState} element={<Story />} />} />
            <Route path="starred" element={<PrivateRoute isAuth={authState} element={<StarredMessages />} />} />
            <Route path="archived" element={<PrivateRoute isAuth={authState} element={<Archived />} />} />
            <Route path="email" element={<PrivateRoute isAuth={authState} element={<Email />} />} />
            <Route path="call" element={<PrivateRoute isAuth={authState} element={<Call />} />} />
            {/* <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} /> */}
          </Route>  

          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>


        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
