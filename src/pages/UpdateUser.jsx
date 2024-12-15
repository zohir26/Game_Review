// import React, { useContext } from 'react';
// import Footer from '../components/Footer';
// import Navbar from '../components/Navbar';
// import { auth, AuthContext } from '../provider/AuthProvider';
// import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';

// const UpdateUser = () => {
//     const { user, setUser } = useContext(AuthContext);

//     const handleUpdateUser = (event) => {
//         event.preventDefault();
//         const form = event.target;
//         const name = form.name.value;
//         const photo = form.photo.value;
//         const email = form.email.value;
//         const password = form.password.value;
//         const updatedUser = { name, photo, email, password };
//         console.log(updatedUser);

//         if (user) {
//             const info = {
//                 displayName: name,
//                 photoURL: photo,
//             };

//             updateProfile(auth.currentUser, info)
//                 .then(() => {
//                     console.log('User profile updated');
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });

//             // if (user.email !== email) {
//             //     updateEmail(user, email)
//             //         .then(() => {
//             //             console.log('User email updated');
//             //         })
//             //         .catch((error) => {
//             //             console.log(error);
//             //         });
//             // }

//             // if (password) {
//             //     updatePassword(user, password)
//             //         .then(() => {
//             //             console.log('User password updated');
//             //         })
//             //         .catch((error) => {
//             //             console.log(error);
//             //         });
//             // }
//         }
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className="hero bg-base-200 min-h-screen">
//                 <div className="hero-content flex-col">
//                     <div className="text-center lg:text-left">
//                         <h1 className="text-5xl font-bold">Update Your Information</h1>
//                     </div>
//                     <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//                         <form className="card-body" onSubmit={handleUpdateUser}>
//                             <div className="form-control">
//                                 <label className="label">
//                                     <span className="label-text">Name</span>
//                                 </label>
//                                 <input type="text" placeholder="Enter your name" name="name" className="input input-bordered" required />
//                             </div>
//                             <div className="form-control">
//                                 <label className="label">
//                                     <span className="label-text">Photo URL</span>
//                                 </label>
//                                 <input type="text" placeholder="Enter your photo URL" name="photo" className="input input-bordered" required />
//                             </div>
//                             <div className="form-control">
//                                 <label className="label">
//                                     <span className="label-text">Email</span>
//                                 </label>
//                                 <input type="email" placeholder="Enter your email" name="email" className="input input-bordered" required />
//                             </div>
//                             <div className="form-control">
//                                 <label className="label">
//                                     <span className="label-text">Password</span>
//                                 </label>
//                                 <input type="password" placeholder="Enter a new password" name="password" className="input input-bordered" />
//                             </div>
//                             <div className="form-control mt-6">
//                                 <button className="btn btn-primary">Update User</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default UpdateUser;

import React, { useContext, useState } from 'react';
import Footer from '../components/Footer';
import Swal from 'sweetalert2'
import Navbar from '../components/Navbar';
import { auth, AuthContext } from '../provider/AuthProvider';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const UpdateUser = () => {
   const navigate=useNavigate()
    const { user, setUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: user?.displayName || '',
        photo: user?.photoURL || '',
        email: user?.email || '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateUser = (event) => {
        event.preventDefault();
        const { name, photo, email, password } = formData;

        const info = { displayName: name, photoURL: photo };
        if (auth.currentUser) {
            // Update profile
            updateProfile(auth.currentUser, info)
                .then(() => {
                    setUser({ ...auth.currentUser, displayName: name, photoURL: photo });
                    Swal.fire({
                        title: "User have been updated!",
                        
                        icon: "success"
                      });
                    navigate('/')
                    
                    console.log('User profile updated');
                })
                .catch((error) => console.error(error));

            // Update email if changed
            if (auth.currentUser.email !== email) {
                updateEmail(auth.currentUser, email)
                    .then(() => {
                        setUser((prev) => ({ ...prev, email }));
                        console.log('User email updated');
                    })
                    .catch((error) => console.error(error));
            }

            // Update password if provided
            if (password) {
                updatePassword(auth.currentUser, password)
                    .then(() => console.log('User password updated'))
                    .catch((error) => console.error(error));
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Update Your Information</h1>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleUpdateUser}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    name="photo"
                                    value={formData.photo}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Update User</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UpdateUser;
