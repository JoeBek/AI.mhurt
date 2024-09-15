import React, { useState } from 'react';

const About = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="max-w-2xl mx-auto text-center p-6">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">About This Application</h2>
            <p className="text-gray-400 mb-6">
                This emergency dispatcher assistant application helps dispatchers by generating a list of actionable questions based on the audio they upload or record. 
            </p>
            
            {/* Expandable "How it Works" Section */}
            <div className="text-left">
                <button 
                    onClick={toggleExpanded} 
                    className="w-full text-lg font-semibold text-gray-400 focus:outline-none transition-colors hover:text-gray-300 mb-4"
                >
                    {isExpanded ? 'How it Works ▼' : 'How it Works ▶'}
                </button>

                {/* Expandable content */}
                <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-screen' : 'max-h-0'}`}
                >
                    <p className="text-gray-300 mt-2">
                        The application uses a combination of a Large Language Model (LLM) and OpenAI's Whisper API to process audio files and generate questions.
                    </p>
                    <ul className="text-gray-400 mt-4 list-disc list-inside">
                        <li><strong>Whisper:</strong> Whisper transcribes the audio into text, accurately converting speech to written words, even in noisy environments.</li>
                        <li><strong>LLM (Large Language Model):</strong> Once the audio is transcribed, the LLM processes the text according to emergency medical guidelines to generate a list of relevant questions for the dispatcher.</li>
                        <li><strong>Dispatcher Interface:</strong> The list of questions is presented to the dispatcher, allowing them to ask the caller the right questions and improve emergency response times.</li>
                    </ul>
                </div>
            </div>

            <p className="text-gray-400 mt-6">
                This process ensures that dispatchers receive timely, relevant information to assist them in making the best decisions during an emergency.
            </p>
        </div>
    );
};

export default About;
