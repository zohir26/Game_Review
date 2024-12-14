import React from 'react';

const AboutUs = () => {
    return (
<>
<h1 className='text-4xl font-semi-bold bg-gray-400 text-gray-800 text-center'>About us</h1>
<div className="hero bg-gray-400 text-slate-200">
            
            <div className="hero-content flex-col lg:flex-row-reverse">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/mHYFcMtKEWg?si=3LhCZ7oshOqTVO_f" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              <div>
                <h1 className="text-5xl font-bold">Chill Gamers</h1>
                <p className="py-6">
                  It is the largest authentic game review website where 1000+ users visits regularly and shared their experience and review the games.
                </p>
                <button className="btn btn-primary">View Details</button>
              </div>
            </div>
          </div>
</>
    );
};

export default AboutUs;