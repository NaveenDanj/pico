import { BrowserRouter, Routes, Route } from "react-router-dom";
import app from "src/config/FirebaseConfig";

import MainLayout from "src/layout/MainLayout";
import Chat from "src/pages/App/Chat";
import Story from "src/pages/App/Story";
import StarredMessages from "src/pages/App/StarredMessages";
import Archived from "src/pages/App/Archived";
import Email from "src/pages/Email/Email";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AuthService from "src/services/Auth/AuthService";
import { useDispatch } from 'react-redux'
import { setUser } from 'src/store/slices/UserSlice';
import { setChatrooms } from "src/store/slices/ChatroomSlice";


import CssBaseline from '@mui/material/CssBaseline';
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserData } from "./types/dto";
import Loading from "./components/global/Loading";
import PrivateRoute from "./components/Routes/PrivateRoute";
import ChatGlobalInboxService from "./services/Chat/ChatGlobalInboxService";
import ContactService from "./services/Contact/ContactService";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  const [authState, setAuthState] = useState(false)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthState(true);
        const data: UserData = AuthService.getUserData(user);
        dispatch(setUser(data));
        ChatGlobalInboxService.listenForIncomingMessages(user.uid, dispatch);
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
    fetchChats();
  }, [])

  const fetchChats = async () => {
    const _chats = await ContactService.loadUserContact();
    dispatch(setChatrooms(_chats.contacts))
  }


  if (loading) {
    return <Loading />;
  }


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<PrivateRoute isAuth={authState} element={<Chat />} />} />
            <Route path="story" element={<PrivateRoute isAuth={authState} element={<Story />} />} />
            <Route path="starred" element={<PrivateRoute isAuth={authState} element={<StarredMessages />} />} />
            <Route path="archived" element={<PrivateRoute isAuth={authState} element={<Archived />} />} />
            <Route path="email" element={<PrivateRoute isAuth={authState} element={<Email />} />} />
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
