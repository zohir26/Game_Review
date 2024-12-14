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

const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout></HomeLayout>,
    },
        {
            path:"/allReviews",
            element: <AllReviews></AllReviews>
        },
        {
            path:"/addReview",
            element:<AddReview></AddReview>
        },
        {
            path:"/myReviews",
            element: <MyReview></MyReview>
        },
        {
            path:"/watchList",
            element: <WatchList></WatchList>
        },
        {
            path:"/login",
            element: <Login></Login>
        },
        {
          path:"/register",
          element: <Register></Register>
      },
        {
            path:"*",
            element: <ErrorPage></ErrorPage>
        }
    

  ]);

  export default router;