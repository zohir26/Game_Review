import React, { useContext, useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyReview = () => {
    const { user } = useContext(AuthContext); // Fetch the current user from context
    const [myReviews, setMyReviews] = useState([]); // State to store user reviews

    // Fetch the reviews on component mount or when user email changes
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/myReviews?userEmail=${user.email}`)
                .then(res => res.json())
                .then(data => setMyReviews(data))
                .catch(error => console.error('Error fetching reviews:', error));
        }
    }, [user?.email]);

    // Handle loading state
    if (!myReviews.length) {
        return (
            <>
                <Navbar />
                <div className="flex justify-center items-center min-h-screen">
                    <span className="loading loading-bars loading-md"></span>
                </div>
                <Footer />
            </>
        );
    }



    // Handle delete functionality
    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Call API to delete the review
                fetch(`http://localhost:5000/review/${_id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your review has been deleted.",
                                icon: "success"
                            });
                            // Update state to remove the deleted review
                            setMyReviews(myReviews.filter(review => review._id !== _id));
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: "Review not found or already deleted.",
                                icon: "error"
                            });
                        }
                    })
                    .catch(error => console.error('Error deleting review:', error));
            }
        });
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4 bg-gray-300">
                <h1 className="text-3xl font-bold py-4">My Reviewed Games</h1>
                <div className="overflow-x-auto">
                    <table className="table w-full bg-white shadow-lg rounded-lg">
                        <thead>
                            <tr>
                                <th>User Photo</th>
                                <th>Game Title</th>
                                <th>Genre</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myReviews.map((review) => (
                                <tr key={review._id}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="rounded-full w-12 h-12">
                                                    <img 
                                                        src={user.photoURL || "https://placekitten.com/80/80"} 
                                                        alt="User Avatar" 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{review.gameTitle}</td>
                                    <td>{review.genre}</td>
                                    <td>
                                        {/* Update Button */}
                                    <Link to={`/updateReview/${review._id}`}>
                                    <button 
                                           
                                           className="text-blue-500 hover:text-blue-700 mr-2"
                                       >
                                           <FaEdit />
                                       </button>
                                    </Link>
                                        {/* Delete Button */}
                                        <button 
                                            onClick={() => handleDelete(review._id)} 
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyReview;
