// AnimatedIcons.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';

const AnimatedIcons = () => {
    return (
        <div className="text-center mb-6">
            {/* Headset icon with hover animation */}
            <FontAwesomeIcon
                icon={faHeadset}
                className="text-blue-500 text-6xl hover:animate-bounce" 
            />
            <p className="text-gray-400 mt-2">Emergency Dispatcher Assistant</p>
        </div>
    );
};

export default AnimatedIcons;
