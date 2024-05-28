import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./Pages/SignUp";

import Login from "./Pages/Login";
import ForgetPassword from "./Pages/ForgetPassword";
import EditProfile from "./Pages/EditProfile";
import ChangePassword from "./Pages/ChangePassword";
import UserProfile from "./Pages/UserProfile";
import UserFavourite from "./Components/UserFavourite";
import UserAddedPlaces from "./Components/UserAddedPlaces";
import UserReviews from "./Components/UserReviews";
import { AuthProvider } from "./Contexts/AuthContext";
import ProtectedRoute from "./Pages/ProtectedRoute";
import RecentSearch from "./Pages/RecentSearch";
import NewPost from "./Pages/NewPost";
import NewPostPlace from "./Components/NewPost-Place";
import NewPostRestraurent from "./Components/NewPost-Restraurent";
import NewPostHotel from "./Components/NewPost-Hotel";
import ThingsToDo from "./Pages/ThingsToDo";
import AddThingsToDo from "./Pages/AddThingsToDo";
import UserHotel from "./Pages/UserHotel";
import UserPlace from "./Pages/UserPlace";
import AllHotels from "./Pages/AllHotels";
import AllPlaces from "./Pages/AllPlaces";
import AllRestaurants from "./Pages/AllRestaurants";
import HotelDetails from "./Pages/HotelDetails";

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
                  <RecentSearch />
                </ProtectedRoute>
              }
            />
            <Route path="RecentSearch" element={<RecentSearch />} />
            <Route path="ThingsToDo" element={<ThingsToDo />} />
            <Route path="AddThingsToDo" element={<AddThingsToDo />} />
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
              <Route path="favourite" element={<UserFavourite />} />
              <Route path="EditProfile" element={<EditProfile />} />
              <Route path="addedPlaces" element={<UserAddedPlaces />} />
              <Route path="userReviews" element={<UserReviews />} />
            </Route>
            <Route path="UserHotel" element={<UserHotel />} />
            <Route path="UserPlace" element={<UserPlace />} />
            <Route path="AllHotels" element={<AllHotels />} />
            <Route path="HotelDetails" element={<HotelDetails />} />
            <Route path="AllPlaces" element={<AllPlaces />} />
            <Route path="AllRestaurants" element={<AllRestaurants />} />
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
