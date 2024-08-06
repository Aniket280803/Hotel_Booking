import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import framer-motion

function LandingScreen() {
  return (
    <div className='row landing justify-content-center'>
        <div className="col-md-9 my-auto text-center" style={{ borderRight: '8px solid white' }}>
            <motion.h5
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1.5}}
              transition={{
                duration: 4,
                ease: 'easeOut',
                repeat: Infinity,
                repeatDelay: 4
              }}
              style={{ color: 'white', fontSize: '11vh' }}
            >
              AruhiRooms
            </motion.h5>
            <h4 style={{ color: 'white', margin: '6vh' }}>"Excellence is not a skill. It is an attitude."</h4>
            <Link to='/home'>
              <button className='start'>Get Started</button>
            </Link>
        </div>
    </div>
  );
}

export default LandingScreen;

