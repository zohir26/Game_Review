import React, { useState, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loading from '../components/Loading';


const AllReviews = () => {
    const allReview = useLoaderData(); // Data loaded from the server
    const [loading, setLoading] = useState(true); // Loading state
    const [reviews, setReviews] = useState([]); // State to manage reviews
    const [genreFilter, setGenreFilter] = useState('All'); // State for genre filtering

    // Set reviews state once the data is loaded
    useEffect(() => {
        if (allReview) {
            setReviews(allReview);
            setLoading(false);
        }
    }, [allReview]);

    if (loading) {
        return <Loading></Loading>;
    }

    // Function to sort reviews by rating
    const handleSortByRating = () => {
        const sortedReviews = [...reviews].sort((a, b) => b.rating - a.rating); // Descending
        setReviews(sortedReviews);
    };

    // Function to sort reviews by publishing year
    const handleSortByYear = () => {
        const sortedReviews = [...reviews].sort((a, b) => b.publishingYear - a.publishingYear); // Descending
        setReviews(sortedReviews);
    };

    // Function to filter reviews by genre
    const handleGenreFilter = (e) => {
        const selectedGenre = e.target.value; // Get selected genre
        setGenreFilter(selectedGenre);

        if (selectedGenre === 'All') {
            setReviews(allReview); // Reset to original reviews if "All" is selected
        } else {
            const filteredReviews = allReview.filter(review => review.genre === selectedGenre);
            setReviews(filteredReviews);
        }
    };

    // Extract unique genres from all reviews for dropdown options
    const genres = ['All', ...new Set(allReview.map(review => review.genre))];

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4 bg-gray-300">
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl font-bold py-4'>All Reviewed Games</h1>

                    <div className='flex gap-4'>
                        {/* Dropdown for Genre Filter */}
                        <select 
                            className="select select-bordered w-full max-w-xs"
                            value={genreFilter}
                            onChange={handleGenreFilter}
                        >
                            {genres.map((genre, index) => (
                                <option key={index} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>

                        {/* Buttons for Sorting */}
                        <button onClick={handleSortByYear} className='btn btn-success'>
                            Sort by Year
                        </button>
                        <button onClick={handleSortByRating} className='btn btn-warning'>
                            Sort by Rating
                        </button>
                    </div>
                </div>

                {/* Display reviews */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {reviews.map((review, index) => (
                        <div key={index} className="card bg-base-100 shadow-xl">
                            <figure>
                                <img 
                                    src={review.gameCover} 
                                    alt={review.gameTitle} 
                                    className="w-full h-48 object-cover" 
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{review.gameTitle}</h2>
                                <p>{review.reviewDescription}</p>
                                <div className="mt-2">
                                    <span className="badge badge-primary mr-2">
                                        Rating: {review.rating}/10
                                    </span>
                                    <span className="badge badge-secondary mr-2">
                                        Year: {review.publishingYear}
                                    </span>
                                    <span className="badge badge-accent">
                                        Genre: {review.genre}
                                    </span>
                                </div>
                                <div className="card-actions mt-4">
                                    <p className="text-sm text-gray-600">
                                        Reviewed by: {review.userName} ({review.userEmail})
                                    </p>
                                </div>
                                <div className="card-actions justify-end">
                                    <Link to={`/review/${review._id}`}>
                                        <button className="btn btn-primary">View Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllReviews;
