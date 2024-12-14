import React from 'react';

const WriteUs = () => {
    return (
        <div className='bg-gray-300 text-black flex flex-col justify-center items-center w-full h-[200px]'> {/* Use flex-col for vertical layout */}
            <div className='flex justify-center items-center w-full'>
                <h1 className='font-bold text-2xl mb-4'>Write to Us</h1> {/* Add some margin at the bottom */}
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-4"> {/* Add gap for spacing */}
                <input
                    type="text"
                    placeholder="Write your question or query"
                    className="input input-bordered w-80" /> {/* Set width for the input */}
                <button className="btn btn-primary w-32">Send</button> {/* Set width for the button */}
            </div>
        </div>
    );
};

export default WriteUs;
