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
        <div className="App">
            <Header />
            <MockAudioUpload onUploadSuccess={handleUploadSuccess} />
            <QuestionList questions={questions} />
        </div>
    );
};

export default App;