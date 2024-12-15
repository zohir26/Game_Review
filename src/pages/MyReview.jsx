import React, { useContext, useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { AuthContext } from '../provider/AuthProvider';

const ownReview = () => {
    const { user } = useContext(AuthContext)
    const [myReviews, setMyReviews] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/myReviews?userEmail=${user.email}`)
                .then(res => res.json())
                .then(data => setMyReviews(data))
                .catch(error => console.error('error fetching reviews', error))
        }
    }, [user?.email])
    if (!myReviews) {
        return (
            <>
                <Navbar />
                <div><span className="loading loading-bars loading-md flex justify-center items-center"></span></div>
                <Footer />
            </>
        );
    }
    const handleUpdate = (id) => {
        console.log(`Update review with id: ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Delete review with id: ${id}`);
    }
    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4 bg-gray-300">
                <h1 className='text-3xl font-bold py-4'>My Reviewed Games</h1>
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
                                                    <img src={user.photoURL || "https://placekitten.com/80/80"} alt="User Avatar" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{review.gameTitle}</td>
                                    
                                    <td>{review.genre}</td>
                                    <td>
                                        <button onClick={() => handleUpdate(review._id)} className="text-blue-500 hover:text-blue-700 mr-2">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(review._id)} className="text-red-500 hover:text-red-700">
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

export default ownReview;
