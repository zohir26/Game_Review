import React from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import AboutUs from '../components/AboutUs';
import WriteUs from '../components/WriteUs';
import HighRatedGame from '../components/HighRatedGame';

const HomeLayout = () => {
//    const allReview= useLoaderData()
    return (
        <div>
           {/* navbar */}
           <div className='bg-gray-800 text-white z-50'>
           <Navbar></Navbar>
           </div>
           {/*  Banner  */}
             <div className='bg-gray-500 z-30'>
             <Banner></Banner>
             </div>
            {/* highest Rated Games */}
            <HighRatedGame></HighRatedGame>
            {/* <HighRatedGame allReview={allReview}></HighRatedGame> */}
             <AboutUs></AboutUs>
            <Outlet></Outlet>
            <WriteUs></WriteUs>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;