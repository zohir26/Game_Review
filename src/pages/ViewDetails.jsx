import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const ViewDetails = () => {
    const {user}=useContext(AuthContext)
    const { id } = useParams();
    const [review, setReview] = useState(null);

    useEffect(() => {
        fetch(`https://game-review-server-mu.vercel.app/review/${id}`)
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
const handleAddToWatchList=()=>{
    const watchListData={
        gameTitle:review.gameTitle,
        reviewDescription: review.reviewDescription,
        rating: review.rating,
        publishingYear: review.publishingYear,
        genre: review.genre,
        gameCover: review.gameCover,
        userEmail: user.email,      // Logged-in user's email
        userName: user.displayName, // Logged-in user's name
    }

    // fetch my watchlist from database
    fetch('https://game-review-server-mu.vercel.app/myWatchList',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(watchListData)
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.insertedId){
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Review has added to Watch List",
                showConfirmButton: false,
                timer: 1500
              });
        }
        
    })
    .catch(error=>console.log('Error', error))
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
                        <div className="card-actions justify-end mt-6 flex ">
                        <Link to='/myWatchList'>
                           
                           <button onClick={handleAddToWatchList}  className="btn btn-primary">Add to Watch list</button>
                           
                           </Link>
                           
                           
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




