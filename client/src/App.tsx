import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import CreateBlogPage from "./pages/createPostPage";
import EditBlogPage from "./pages/EditPostPage";
import BlogDetailPage from "./pages/BlogDetailPage";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/blogs/:id" element={<BlogDetailPage />} />

        <Route path="/blog/new" element={<CreateBlogPage />} />
        <Route path="/blogs/edit/:id" element={<EditBlogPage />} />;

        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
