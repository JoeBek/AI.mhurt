import React, {useState, useRef} from 'react';
import RecordRTC from 'recordrtc';

const AudioUpload = ({onUploadSuccess}) => {
    //state variables
    const [selectedFile, setSelectedFile] = useState(null); //for the file
    const [error, setError] = useState(null); //for any errors
    const [recording, setRecording] = useState(false); //the mic recording
    const [blob, setBlob] = useState(null); // the audio blob
    const mediaRecorderRef = useRef(null);

    //when file is put in the input field
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setError(''); //clear the error when file is selected
    }

    //when the upload button is pressed
    const handleFileUpload = async () => {
        //check if there is actually a file
        if (!selectedFile) {
            setError('Please select a file first!');
            return;
        }

        //formData is used to store the mp3 file as a key value pair
        //we cannot send it as a json object because json cannot handle binary data
        //this allows us to store the file without hardcoding
        const formData = new FormData();
        formData.append('mp3File', selectedFile);

        try {
            //uploads the audio to the Flask endpoint via POST request
            const response = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body : formData,
            });
            //checks HTTP status code OK
            if (!response.ok) {
                throw new Error('Failed to upload the audio');
            }

            const data = await response.json(); //gets json from the backend
            onUploadSuccess(data.questions);
            
        } catch (err) {
            //if an error occurs, store it
            setError(err);
        }
    }

        //start microphone capture
        const startRecording = async () => {
            try {
                //get access for the microphone
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
        // Stop recording audio
    const stopRecording = () => {
        mediaRecorderRef.current.stopRecording(() => {
            const recordedBlob = mediaRecorderRef.current.getBlob();
            setBlob(recordedBlob);
            setRecording(false);
        });
    };
    
        //uses the mic recording as the uploaded file
        const handleMicrophoneUpload = async () => {
            if (blob) {
                const formData = new FormData();
                //gives the audio blob a filename
                formData.append('mp3File', blob, 'recording.mp3');
    
                try {
                    //same as file upload, bring it to the backend
                    const response = await fetch('http://localhost:5000/api/upload', {
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
                }
            } else {
                setError('Please record audio first!');
            }
        };

        return (
            <div>
                <h2>Upload or Record Audio</h2>
                <div>
                    {/* File input for uploading audio files */}
                    <input
                        type="file"
                        accept="audio/mp3"
                        onChange={handleFileChange}
                    />
                    <button onClick={handleFileUpload} disabled={recording}>Upload Audio</button>
                </div>
                <div>
                    {/* Conditional rendering based on recording state */}
                    {recording ? (
                        <div>
                            <button onClick={stopRecording}>Stop Recording</button>
                        </div>
                    ) : (
                        <button onClick={startRecording}>Start Recording</button>
                    )}
                    {/* upload button only visible if a recording has been made */}
                    {blob && !recording && (
                        <button onClick={handleMicrophoneUpload}>Upload Recording</button>
                    )}
                </div>
                {/* display error message if there is any */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        );
    };
    
    export default AudioUpload;

