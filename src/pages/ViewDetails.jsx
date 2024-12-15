import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useParams } from 'react-router-dom';

const ViewDetails = () => {
    const { id } = useParams();
    const [review, setReview] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/review/${id}`)
            .then(response => response.json())
            .then(data => setReview(data))
            .catch(error => console.error('Error fetching review:', error));
    }, [id]);

    if (!review) {
        return (
            <>
                <Navbar />
                <div><span className="loading loading-bars loading-md flex justify-center items-center"></span></div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <div className="card lg:card-side bg-base-100 shadow-xl">
                    <figure className="lg:w-1/3">
                        <img src={review.gameCover} alt={review.gameTitle} className="w-full h-full object-cover" />
                    </figure>
                    <div className="card-body lg:w-2/3">
                        <h2 className="card-title text-4xl">{review.gameTitle}</h2>
                        <p className="text-lg mt-4">{review.reviewDescription}</p>
                        <div className="flex flex-wrap gap-4 mt-6">
                            <span className="badge badge-primary">Rating: {review.rating}/10</span>
                            <span className="badge badge-secondary">Year: {review.publishingYear}</span>
                            <span className="badge badge-accent">Genre: {review.genre}</span>
                        </div>
                        <div className="mt-6">
                            <p className="text-sm text-gray-600">Reviewed by: <span className="font-semibold">{review.userName}</span> ({review.userEmail})</p>
                        </div>
                        <div className="card-actions justify-end mt-6 flex gap-4">
                        <Link to='/'>
                           
                           <button className="btn btn-primary">Add to Watch list</button></Link>
                           <Link to='/'>
                           
                           <button className="btn btn-primary">Back to Reviews</button></Link>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ViewDetails;




