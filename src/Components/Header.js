import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <header className="bg-gray-800 text-gray-100 py-4 w-full fixed top-0 left-0 z-50">
            <div className="container mx-auto flex justify-between items-center px-4">
                <div className="flex items-center">
                    {/* Animated Headset Icon */}
                    <FontAwesomeIcon 
                        icon={faHeadset} 
                        className="text-blue-500 text-2xl mr-2 hover:animate-bounce" 
                    />
                    {/* Link next to the headset */}
                    <Link to="/" className="text-2xl font-bold hover:text-gray-300">HelpUS</Link>
                </div>
                <nav className="flex space-x-4">
                    {/* Updated to include FAQ link */}
                    <Link to="/about" className="text-lg hover:text-gray-300">About</Link>
                    <Link to="/faq" className="text-lg hover:text-gray-300">FAQ</Link> {/* New FAQ link */}
                </nav>
            </div>
        </header>
    );
};

export default Header;
