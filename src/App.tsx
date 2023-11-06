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
          <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
          <Route path="/my-car-list" element={<MyCarList />}></Route>
          <Route path="/my-friend" element={<MyFriend />}></Route>
          <Route path="/notifications" element={<Notifications />}></Route>
          <Route path="/testpage-3" element={<ImageUpload />}></Route>
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
