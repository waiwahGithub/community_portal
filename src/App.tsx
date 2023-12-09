import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Slack from "./pages/Test/Slack/SlackMessageBot";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import RegistrationForm from "./pages/Test/RegisterTest";
import LoginForm from "./pages/Test/LoginTest";
import { useEffect, useState } from "react";
import ImageUpload from "./pages/Test/ImageUpload";
import PostCar from "./pages/PostCar/PostCar";
import MyCarList from "./pages/Test/MyCarList/MyCarList";
import Link from "./components/link/Link";
import Community from "./pages/Community/Community";
import MyCommunity from "./pages/Community/MyCommunity";
import MyFriend from "./pages/Friend/MyFriend";
import Notifications from "./pages/Notifications/Notifications";
import MyLike from "./pages/MyLike/MyLike";
import MyDislike from "./pages/MyDislike/MyDislike";
import MyPost from "./pages/MyPost/MyPost";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import MyComment from "./pages/MyComment/MyComment";
import PostDetailPage from "./pages/MyPost/PostDetailPage";
import Friend from "./pages/Friend/Friend";

function App() {
  const [jwtToken, setJWTToken] = useState<any>(
    localStorage.getItem("jwt_token")
  );
  let fbInfoSetInterval: any = undefined;
  useEffect(() => {
    if (jwtToken) return;

    fbInfoSetInterval = window.setInterval(() => {
      setJWTToken(localStorage.getItem("jwt_token"));
    }, 300);

    return () => {
      clearfbInfoSetInterval();
    };
  }, [jwtToken]);

  const clearfbInfoSetInterval = () => {
    window.clearTimeout(fbInfoSetInterval);
    fbInfoSetInterval = undefined;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/post-car-for-sale" element={<PostCar />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/community" element={<Community />}></Route>
          <Route path="/my-community" element={<MyCommunity />}></Route>
          <Route path="/my-like" element={<MyLike />}></Route>
          <Route path="/my-dislike" element={<MyDislike />}></Route>
          <Route path="/my-post" element={<MyPost />}></Route>
          <Route path="/post/post-detail" element={<PostDetailPage />}></Route>
          <Route path="/dashboard/user" element={<UserDashboard />}></Route>
          <Route path="/dashboard/admin" element={<AdminDashboard />}></Route>
          <Route path="/my-comment" element={<MyComment />}></Route>
          <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
          <Route path="/my-car-list" element={<MyCarList />}></Route>
          <Route path="/my-friend" element={<MyFriend />}></Route>
          <Route path="/friend" element={<Friend />}></Route>
          <Route path="/notifications" element={<Notifications />}></Route>
          <Route path="/testpage-3" element={<ImageUpload />}></Route>
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
