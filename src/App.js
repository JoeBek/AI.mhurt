import React, { useState } from 'react';
import AudioUpload from './Components/AudioUpload';
import MockAudioUpload from './Components/MockAudioUpload';
import QuestionList from './Components/QuestionList';
import Header from './Components/Header';
import './styles/App.css';

const App = () => {
    const [questions, setQuestions] = useState([]);

    const handleUploadSuccess = (newQuestions) => {
        setQuestions(newQuestions);
    };

    return (
        <div className="App bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
            <Header />
            <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Emergency Dispatcher Assistant</h1>
                <p className="text-lg text-gray-600">Upload or record audio to get actionable questions for dispatching.</p>
            </div>
            <AudioUpload onUploadSuccess={handleUploadSuccess} />
            <QuestionList questions={questions} />
        </div>
    );
};

export default App;