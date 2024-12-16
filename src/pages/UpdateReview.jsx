import React, { useContext } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateReview = () => {
    const { user , loading} = useContext(AuthContext);
    const review= useLoaderData()
   const navigate=useNavigate();
    // const id=review._id;
    if(loading){
        return <Loading></Loading>
    }
    
    if (!user) {
        return <Loading></Loading>;
    }
    const handleUpdateReview = (event) => {
        event.preventDefault();

        const form = event.target;

        const addReview = {
            gameCover: form.gameCover.value,
            gameTitle: form.gameTitle.value,
            reviewDescription: form.reviewDescription.value,
            rating: form.rating.value,
            publishingYear: form.publishingYear.value,
            genre: form.genre.value,
            userEmail: user?.email, // Safely access user.email
            userName: user?.displayName, // Safely access user.displayName
        };

        // Implement the update functionality here
        console.log(addReview);
// send data to the server
fetch(`https://game-review-server-mu.vercel.app/updateReview/${review?._id}`, {
    method: "PUT",
    headers: {
        'content-type': 'application/json'
    },
    body:JSON.stringify(addReview)
})
    .then(res => res.json())
    .then(data => {
        
        if (data.modifiedCount > 0) {
            Swal.fire({
                title: 'Success!',
                text: 'Your review has been updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }
        navigate('/')
    })
    // .catch(error => {
    //     console.error("Error updating review:", error);
    // });


    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center">Update Game Review</h2>
                    <form onSubmit={handleUpdateReview}>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Game Cover Image/Thumbnail URL</span>
                            </label>
                            <input
                                type="url"
                                name="gameCover"
                                className="input input-bordered w-full"
                                placeholder="Enter the game cover image URL"
                                required
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Game Title/Name</span>
                            </label>
                            <input
                                type="text"
                                name="gameTitle"
                                className="input input-bordered w-full"
                                placeholder="Enter the game title"
                                required
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Review Description</span>
                            </label>
                            <textarea
                                name="reviewDescription"
                                className="textarea textarea-bordered w-full"
                                placeholder="Write your detailed review"
                                required
                            ></textarea>
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Rating (1-10)</span>
                            </label>
                            <input
                                type="number"
                                name="rating"
                                className="input input-bordered w-full"
                                placeholder="Rate the game from 1 to 10"
                                min="1"
                                max="10"
                                required
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Publishing Year</span>
                            </label>
                            <input
                                type="number"
                                name="publishingYear"
                                className="input input-bordered w-full"
                                placeholder="Enter the publishing year"
                                min="1900"
                                max={new Date().getFullYear()}
                                required
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Genre</span>
                            </label>
                            <select name="genre" className="select select-bordered w-full" required>
                                <option value="">Select a genre</option>
                                <option value="Action">Action</option>
                                <option value="RPG">RPG</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Strategy">Strategy</option>
                                <option value="Sports">Sports</option>
                                <option value="Simulation">Simulation</option>
                            </select>
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">User Email</span>
                            </label>
                            <input
                                type="email"
                                name="userEmail"
                                className="input input-bordered w-full"
                                value={user?.email || ""}
                                readOnly
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">User Name</span>
                            </label>
                            <input
                                type="text"
                                name="userName"
                                className="input input-bordered w-full"
                                value={user?.displayName || ""}
                                readOnly
                            />
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary w-full">Update Review</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UpdateReview;
