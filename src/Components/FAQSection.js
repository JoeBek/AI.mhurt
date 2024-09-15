import React, { useState, useEffect } from 'react';

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true);  // Trigger the fade-in effect when the page loads
    }, []);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index); // Toggle FAQ open/close
    };

    const faqs = [
        {
            question: 'How does this application work?',
            answer: 'You can upload or record an audio file, and the app will generate actionable questions based on the content of the audio to assist emergency dispatchers.',
        },
        {
            question: 'What types of audio files are supported?',
            answer: 'Currently, the application supports MP3 and WebM audio formats.',
        },
        {
            question: 'Is there a limit to the size of the audio file?',
            answer: 'Yes, there is a size limit of 10MB for each audio file uploaded.',
        },
    ];

    return (
        <div className={`max-w-2xl mx-auto p-6 text-left ${fadeIn ? 'fade-in' : ''}`} style={{ animationDelay: '0.2s' }}>
            <h2 className="text-4xl font-bold text-gray-100 mb-6 text-center">Frequently Asked Questions</h2>
            {faqs.map((faq, index) => (
                <div key={index} className="mb-4">
                    <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full text-left text-lg text-gray-400 font-semibold focus:outline-none transition-colors hover:text-gray-300"
                    >
                        {faq.question}
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-screen' : 'max-h-0'}`}
                    >
                        <p className="text-gray-300 mt-2">{faq.answer}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FAQSection;
