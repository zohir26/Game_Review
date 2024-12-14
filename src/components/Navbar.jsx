import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {
    //show the user
    const {user}= useContext(AuthContext);
    const list = (
        <ul className='flex lg:flex-row flex-col gap-2 text-white'>
            <Link to="/"><li className='hover:text-neon-green'>Home</li></Link>
            <Link to="/allReviews"><li className='hover:text-neon-green'>All Reviews</li></Link>
            <Link to="/addReview"><li className='hover:text-neon-green'>Add Reviews</li></Link>
            <Link to="/myReviews"><li className='hover:text-neon-green'>My Reviews</li></Link>
            <Link to="/watchList"><li className='hover:text-neon-green'>Watch List</li></Link>
            <Link to="/login"><li className='hover:text-neon-green'>Login</li></Link>
            <Link to="/register"><li className='hover:text-neon-green'>Register</li></Link>
            <Link to=""><li className='hover:text-neon-green'>{user}</li></Link>
        </ul>
    );

 

    return (
        <div className="navbar bg-gray-800 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <button tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="flex flex-col gap-3 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </button>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-gray-800 rounded-box mt-3 w-52 p-2 shadow z-50">
                        {list}
                    </ul>
                </div>
                <NavLink to="/" className="text-xl text-white font-bold">Chill Gamers</NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {list}
                </ul>
            </div>
            <div className="navbar-end">
                <button className="btn bg-neon-green text-gray-800">Button</button>
            </div>
        </div>
    );
};

export default Navbar;
