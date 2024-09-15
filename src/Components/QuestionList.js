import React from 'react';

const QuestionList = ({ questions }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">Questions</h2>
            <ul>
                {questions.map((question, index) => (
                    <li key={index} className="typewriter">{question}</li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionList;
