import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
    // Show the user
    const { user, logOut, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleThemeChange = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const list = (
        <ul className='flex lg:flex-row flex-col gap-2 text-white justify-center items-center'>
            <NavLink to="/" className='hover:text-neon-green'><li>Home</li></NavLink>
            {user && user.email && (
                <>
                    <NavLink to="/allReviews" className='hover:text-neon-green'><li>All Reviews</li></NavLink>
                    <NavLink to="/addReview" className='hover:text-neon-green'><li>Add Reviews</li></NavLink>
                    <NavLink to="/myReviews" className='hover:text-neon-green'><li>My Reviews</li></NavLink>
                    <NavLink to="/watchList" className='hover:text-neon-green'><li>Watch List</li></NavLink>
                    <NavLink to="/updateUser" className='text-white'><li>Update User</li></NavLink>
                </>
            )}
            {!(user && user.email) && (
                <>
                    <NavLink to="/login" className='hover:text-neon-green'><li>Login</li></NavLink>
                    <NavLink to="/register" className='hover:text-neon-green'><li>Register</li></NavLink>
                </>
            )}
            {user && user.email && (
                <NavLink to="/" className="flex justify-center items-center space-x-2 text-white">
                    {user.photoURL && (
                        <img
                            src={user.photoURL}
                            alt={user.displayName}
                            className="w-8 h-8 rounded-full"
                        />
                    )}
                    <li className="text-white">{user.email}</li>
                </NavLink>
            )}
        </ul>
    );

    const handleLogOut = () => {
        logOut()
            .then((result) => {
                console.log(result);
                navigate('/login');
                setUser(null);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="navbar bg-gray-800 z-50 justify-center items-center flex">
            <div className="navbar-start flex justify-center items-center gap-4">
                <div className="dropdown">
                    <button tabIndex={0} className="btn btn-ghost lg:hidden text-white">
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
                {/* Dark mode toggle */}
                <button onClick={handleThemeChange} className="flex items-center justify-center p-2 ml-4">
                    {theme === 'light' ? <FaMoon className="text-white" /> : <FaSun className="text-yellow-300" />}
                </button>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {list}
                </ul>
            </div>
            <div className="navbar-end">
                {user && user.email ? (
                    <button onClick={handleLogOut} className="btn bg-neon-green text-gray-800">Log Out</button>
                ) : (
                    <NavLink to="/login">
                        <button className="btn bg-neon-green text-gray-800">Login</button>
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default Navbar;
