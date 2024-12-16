import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../provider/AuthProvider';


const WatchList = () => {
    const [watchlist, setWatchlist] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:5000/myWatchList?userEmail=${user.email}`)
            .then(res => res.json())
            .then(data => setWatchlist(data))
            .catch(error => console.error('Error fetching watchlist:', error));
    }, [user.email]);

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <h2 className="text-3xl font-bold mb-4">My Watchlist</h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Game Title</th>
                                <th>Rating</th>
                                <th>Publishing Year</th>
                                <th>Genre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {watchlist.map((game, index) => (
                                <tr key={game._id}>
                                    <td>{index + 1}</td>
                                    <td>{game.gameTitle}</td>
                                    <td>{game.rating}</td>
                                    <td>{game.publishingYear}</td>
                                    <td>{game.genre}</td>
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

export default WatchList;
