import Swal from 'sweetalert2';
import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, Navigate, NavLink } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate= useNavigate()
    const { signIn,resetPassword } = useContext(AuthContext)
    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const user = { email, password };
        console.log(user)
        // sign In user

        signIn(email,password)
            .then((userCredential) => {
                // Signed in 
                const loginUser = userCredential.user;
                navigate("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error, errorCode, errorMessage)
            });
    }
    const handleForgetPassword = () => {
        const email = document.querySelector('input[name="email"]').value;
        console.log("Resetting password for email:", email); // Debug log
        if (!email) {
            return Swal.fire({
                title: "Error",
                text: "Please enter an email to reset the password.",
                icon: "error",
            });
        }
    
        resetPassword(email)
            .then(() => {
                Swal.fire({
                    title: "Password reset email sent!",
                    icon: "success",
                });
            })
            .catch((error) => {
                console.error("Error resetting password:", error); // Debug log
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                });
            });
    };
    
    
    return (
        <div>
            <Navbar></Navbar>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col ">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>

                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name='email'
                                    className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                                <NavLink onClick={handleForgetPassword} className="label text-blue-400 ">
                                    Forgot password?
                                </NavLink>
                                <p className='text-center'>If not registered please
                                    <Link className='text-green-600' to='/register'> Sign up </Link>

                                </p>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Login;