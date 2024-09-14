// MockAudioUpload.js
import React, { useState, useRef } from 'react';
import RecordRTC from 'recordrtc';

const MockAudioUpload = ({ onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [recording, setRecording] = useState(false);
    const [blob, setBlob] = useState(null);
    const mediaRecorderRef = useRef(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setError('');
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file first!');
            return;
        }

        const mockResponse = {
            questions: ['What is your location?', 'What is the nature of the emergency?']
        };

        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Simulate fetch response
            onUploadSuccess(mockResponse.questions);

        } catch (err) {
            setError('Failed to upload the audio');
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new RecordRTC(stream, { type: 'audio' });
            mediaRecorderRef.current.startRecording();
            setRecording(true);
            setBlob(null); // Reset blob on new recording
            setError(''); // Clear previous errors
        } catch (err) {
            setError('Unable to access the microphone');
        }
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stopRecording(() => {
            const recordedBlob = mediaRecorderRef.current.getBlob();
            setBlob(recordedBlob);
            setRecording(false);
        });
    };

    const handleMicrophoneUpload = async () => {
        if (blob) {
            const mockResponse = {
                questions: ["What happened?", "How can I help?"]
            };
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                onUploadSuccess(mockResponse.questions);
            } catch (err) {
                setError('Failed to upload the recording');
            }
        } else {
            setError('Please record audio first!');
        }
    };
    return (
        <div>
            <h2>Upload or Record Audio</h2>
            <div>
                <input
                    type="file"
                    accept="audio/mp3"
                    onChange={handleFileChange}
                />
                <button onClick={handleFileUpload} disabled={recording}>Upload Audio</button>
            </div>
            <div>
                {recording ? (
                    <div>
                        <button onClick={stopRecording}>Stop Recording</button>
                    </div>
                ) : (
                    <button onClick={startRecording}>Start Recording</button>
                )}
                {blob && !recording && (
                    <button onClick={handleMicrophoneUpload}>Upload Recording</button>
                )}
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default MockAudioUpload;