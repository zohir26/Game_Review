import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { auth, AuthContext } from '../provider/AuthProvider';
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from 'firebase/auth';
const Register = () => {
   
    const { createNewUser, setUser} = useContext(AuthContext);

    const handleRegister = (event) => {
        event.preventDefault();
      const form = event.target;
      const name= form.name.value;
      const photo=form.photo.value;
      const email= form.email.value;
      const password =form.password.value;
      const updatedUser= {name,photo,email,password}
      console.log(updatedUser)

        createNewUser(email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorCode, errorMessage)
            });
    }
    //sign in with google
    const provider = new GoogleAuthProvider();
    // The addScope method adds a specific scope to the authentication request. A scope defines what data and actions your application can access on behalf of the user.
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    const handleGoogleSignUp = () => {

      
      //google login
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                setUser(user)
                console.log(user)
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode, errorMessage)
                // ...
            });
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col ">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>

                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Enter your name" name='name' className="input input-bordered" required />
                            </div>
                            {/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" placeholder="Enter your name" name='photo' className="input input-bordered" required />
                            </div> */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                
                                <p className='text-center py-3'>If registered please
                                    <Link className='text-green-600' to='/login'> Sign in </Link>

                                </p>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                                <p className='text-center font-bold py-2'>Or</p>
                                <button onClick={handleGoogleSignUp} className='btn btn-primary'> <FaGoogle /> SignUp With Google</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Register;