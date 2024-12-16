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
import ViewDetails from "../pages/ViewDetails";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import UpdateReview from "../pages/UpdateReview";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    loader: () => fetch('http://localhost:5000/addReview').then(res => res.json()),
  },
  {
    path: "/allReviews",
    element: (
      <PrivateRoute>
        <AllReviews></AllReviews>
      </PrivateRoute>
    ),
    loader: () => fetch('http://localhost:5000/reviews').then(res => res.json()),
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
      path:"/review/:id",
      element:<ViewDetails></ViewDetails>
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
      path: "/updateReview/:id",
      element: <UpdateReview></UpdateReview>,
      loader: ({params}) => 
        fetch(`http://localhost:5000/updateReview/${params.id}`).then(res => res.json()),
    },
    
    {
      path: "/myWatchList",
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
  



