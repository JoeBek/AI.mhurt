import React, { useState, useRef, useEffect } from 'react';
import RecordRTC from 'recordrtc';

const AudioUpload = ({ onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);  // Loader state
    const [error, setError] = useState(null);
    const [recording, setRecording] = useState(false);
    const [blob, setBlob] = useState(null);
    const mediaRecorderRef = useRef(null);
    const [fadeIn, setFadeIn] = useState(false);  // State to control fade-in effect

    useEffect(() => {
        // Trigger fade-in effect when component mounts
        setFadeIn(true);
    }, []);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setError('');
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            setLoading(true);  // Show loader when upload starts
            const response = await fetch('https://dtr34-fastapi--8000.prod1.defang.dev/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload the audio');
            }

            const data = await response.json();
            onUploadSuccess(data.questions);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);  // Hide loader when upload completes
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new RecordRTC(stream, { type: 'audio' });
            mediaRecorderRef.current.startRecording();
            setRecording(true);
            setBlob(null);  // Reset blob on new recording
            setError('');  // Clear previous errors
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
            const formData = new FormData();
            const audioFile = new File([blob], 'recording.mp3', { type: 'audio/mp3' });
            formData.append('file', audioFile);

            try {
                setLoading(true);  // Show loader when upload starts
                const response = await fetch('https://dtr34-fastapi--8000.prod1.defang.dev/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Failed to upload the audio');
                }

                const data = await response.json();
                onUploadSuccess(data.questions);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);  // Hide loader when upload completes
            }
        } else {
            setError('Please record audio first!');
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-600 max-w-md mx-auto">
            {/* Apply staggered fade-in to the elements */}
            <h2 
                className={`text-2xl font-semibold text-white mb-4 ${fadeIn ? 'fade-in' : ''}`}
                style={{ animationDelay: '0.2s' }}
            >
                Upload or Record Audio
            </h2>

            <div className={`mb-4 ${fadeIn ? 'fade-in' : ''}`} style={{ animationDelay: '0.4s' }}>
                <input
                    type="file"
                    accept="audio/mp3"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-300 bg-gray-700 p-2 border border-gray-500 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                    onClick={handleFileUpload}
                    disabled={recording || loading}
                    className="mt-4 bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-lg disabled:bg-gray-400 bounce"
                >
                    Upload Audio
                </button>
            </div>

            <div className={`${fadeIn ? 'fade-in' : ''}`} style={{ animationDelay: '0.6s' }}>
                {recording ? (
                    <button
                        onClick={stopRecording}
                        className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-lg bounce"
                    >
                        Stop Recording
                    </button>
                ) : (
                    <button
                        onClick={startRecording}
                        className="bg-green-500 hover:bg-green-400 text-white py-2 px-6 rounded-lg bounce"
                    >
                        Start Recording
                    </button>
                )}
                {blob && !recording && (
                    <button
                        onClick={handleMicrophoneUpload}
                        disabled={loading}
                        className="ml-4 bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-lg bounce"
                    >
                        Upload Recording
                    </button>
                )}
            </div>

            {/* Show spinner when uploading */}
            {loading && <div className="spinner"></div>}

            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    );
};

export default AudioUpload;
