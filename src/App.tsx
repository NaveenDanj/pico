import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "src/layout/MainLayout";
import Chat from "src/pages/App/Chat";
import Story from "src/pages/App/Story";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Chat />} />
          <Route path="story" element={<Story />} />
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;