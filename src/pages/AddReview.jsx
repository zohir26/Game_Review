import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';

const GameReviewForm = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const addReview = {
      gameCover: form.gameCover.value,
      gameTitle: form.gameTitle.value,
      reviewDescription: form.reviewDescription.value,
      rating: form.rating.value,
      publishingYear: form.publishingYear.value,
      genre: form.genre.value,
      userEmail: user.email,
      userName: user.displayName,
    };

    // Store the review data in the database
    // Use your preferred method to save the data, e.g., Firebase, REST API, etc.
    console.log(addReview);

// send data to the server
fetch('http://localhost:5000/addReview',{
    method:"POST",
    headers:{
        'content-type':'application/json'
    },
    body:JSON.stringify(addReview)
})
.then (res=>res.json())
.then(data=>{
    console.log(data)
})
    if(data.insertedId){
        Swal.fire({
            title: 'Success!',
            text: 'Your review has been submitted to database.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
    }

  };

//photo url:
// https://i.ibb.co.com/vLVh6sd/ass-revealtion.jpg
// https://i.ibb.co.com/NpF5Qdy/need-for-speed.jpg
// https://i.ibb.co.com/86YRH8N/price-of-persia.jpg
// https://i.ibb.co.com/JsRPVT9/far-cry-3.jpg
// https://i.ibb.co.com/ZJqrPvP/Resident-evil-4.jpg
// https://i.ibb.co.com/jZ5rwSx/wolfenstein.jpg
// https://i.ibb.co.com/fYZGPJQ/assasins-creed-3.jpg
// https://i.ibb.co.com/S68d4Q2/COD-mw3.jpg

  return (
  <>
    <Navbar></Navbar>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Game Review Form</h2>
        <form onSubmit={handleSubmit}>
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
              value={user.email}
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
              value={user.displayName}
              readOnly
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary w-full">Submit Review</button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default GameReviewForm;
