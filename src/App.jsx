import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./Pages/SignUp";

import Login from "./Pages/Login";
import HomePage from "./Pages/HomePage";
import ForgetPassword from "./Pages/ForgetPassword";
import EditProfile from "./Pages/EditProfile";
import ChangePassword from "./Pages/ChangePassword";
import UserProfile from "./Pages/UserProfile";
import UserFavourite from "./Components/UserFavourite";
import UserAddedPlaces from "./Components/UserAddedPlaces";
import UserReviews from "./Components/UserReviews";
import { AuthProvider } from "./Contexts/AuthContext";
import DashBoard from "./Pages/DashBoard";
import ProtectedRoute from "./Pages/ProtectedRoute";
import RecentSearch from "./Pages/RecentSearch";
import NewPost from "./Pages/NewPost";
import NewPostPlace from "./Components/NewPost-Place";
import NewPostRestraurent from "./Components/NewPost-Restraurent";
import NewPostHotel from "./Components/NewPost-Hotel";

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RecentSearch />} />
            <Route path="SignUp" element={<SignUp />} />
            <Route path="Login" element={<Login />} />
            <Route
              path="HomePage"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route path="RecentSearch" element={<RecentSearch />} />
            <Route path="NewPost" element={<NewPost />}>
              <Route index element={<Navigate replace to="NewPostHotel" />} />
              <Route path="NewPostPlace" element={<NewPostPlace />} />
              <Route
                path="NewPostRestraurent"
                element={<NewPostRestraurent />}
              />
              <Route path="NewPostHotel" element={<NewPostHotel />} />
            </Route>
            <Route path="ForgetPassword" element={<ForgetPassword />} />
            <Route path="ChangePassword" element={<ChangePassword />} />

            <Route path="UserProfile" element={<UserProfile />}>
              <Route index element={<Navigate replace to="favourite" />} />
              <Route path="EditProfile" element={<EditProfile />} />
              <Route path="favourite" element={<UserFavourite />} />
              <Route path="addedPlaces" element={<UserAddedPlaces />} />
              <Route path="userReviews" element={<UserReviews />} />
            </Route>

            <Route path="*" element={<PageNotfoumd />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;

function PageNotfoumd() {
  return <div>Page not found </div>;
}
