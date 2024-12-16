import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AllReviews = () => {
    const allReview= useLoaderData();
    console.log(allReview)
    if (!allReview) { 
        return ( <> <Navbar /> <div><span className="loading loading-bars loading-md flex justify-center items-center align-center"></span></div> <Footer /> </> ); }

    return (
        <> 
        <Navbar></Navbar>
        <div className="container mx-auto p-4 bg-gray-300">
     
     <div className='flex justify-between'>
        <div>
        <h1 className='text-3xl font-bold py-4'>All Reviews Games</h1>
        </div>
        <div className='flex gap-4 '>
            <button className='btn btn-success'>Sort by Year</button>
            <button className='btn btn-warning'>Sort by rating</button>
        </div>
     </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {allReview.map((review, index) => (
                <div key={index} className="card bg-base-100 shadow-xl">
                    <figure>
                        <img src={review.gameCover} alt={review.gameTitle} className="w-full h-48 object-cover" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{review.gameTitle}</h2>
                        <p>{review.reviewDescription}</p>
                        <div className="mt-2">
                            <span className="badge badge-primary mr-2">Rating: {review.rating}/10</span>
                            <span className="badge badge-secondary mr-2">Year: {review.publishingYear}</span>
                            <span className="badge badge-accent">Genre: {review.genre}</span>
                        </div>
                        <div className="card-actions mt-4">
                            <p className="text-sm text-gray-600">Reviewed by: {review.userName} ({review.userEmail})</p>
                        </div>
                        <div className="card-actions justify-end">
                          <Link to={`/review/${review._id}`}>
                          <button 
                             className="btn btn-primary">View Details</button>
                          </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    <Footer></Footer>
    </>
    );
};

export default AllReviews;