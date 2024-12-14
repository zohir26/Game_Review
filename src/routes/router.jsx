import {
    createBrowserRouter,

} from "react-router-dom";
import AllReviews from "../pages/AllReviews";
import AddReview from "../pages/AddReview";
import MyReview from "../pages/MyReview";
import WatchList from "../pages/WatchList";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import HomeLayout from "../layouts/HomeLayout";
import Register from "../pages/Register";
import PrivateRoute from "../routes/PrivateRoute"
import UpdateUser from "../pages/UpdateUser";


const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout></HomeLayout>,
    },
    {
      path: "/allReviews",
      element: (
        <PrivateRoute>
          <AllReviews></AllReviews>
        </PrivateRoute>
      ),
    },
    {
      path: "/addReview",
      element: (
        <PrivateRoute>
          <AddReview></AddReview>
        </PrivateRoute>
      ),
    },
    {
      path: "/myReviews",
      element: (
        <PrivateRoute>
          <MyReview></MyReview>
        </PrivateRoute>
      ),
    },
    {
      path: "/watchList",
      element: (
        <PrivateRoute>
          <WatchList></WatchList>
        </PrivateRoute>
      ),
    },
    {
        path:"/updateUser",
        element:<UpdateUser></UpdateUser>
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/register",
      element: <Register></Register>,
    },
    {
      path: "*",
      element: <ErrorPage></ErrorPage>,
    },
  ]);
  
  export default router;
  



