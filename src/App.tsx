import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "src/layout/MainLayout";
import Chat from "src/pages/App/Chat";
import Story from "src/pages/App/Story";
import StarredMessages from "src/pages/App/StarredMessages";
import Archived from "src/pages/App/Archived";
import Email from "src/pages/Email/Email";
import { ThemeProvider, createTheme } from '@mui/material/styles';


import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Chat />} />
            <Route path="story" element={<Story />} />
            <Route path="starred" element={<StarredMessages />} />
            <Route path="archived" element={<Archived />} />
            <Route path="email" element={<Email />} />
            {/* <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;