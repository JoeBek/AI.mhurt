import React from "react";

const QuestionList = ({ questions }) => {
    return (
        <div>
            <h2>Questions</h2>
            <ul>
                {questions.map((question, index) => (
                    <li key={index}>{question}</li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionList;