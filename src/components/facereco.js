import React, { useState,useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const EKYC = () => {
  const [faceImage, setFaceImage] = useState(null);
  const [credentials, setCredentials] = useState({
    firstName: '',
    lastName: '',
    documentNumber: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const webcamRef = useRef(null);

  const captureFace = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setFaceImage(imageSrc);
  }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!faceImage || !credentials.firstName || !credentials.lastName || !credentials.documentNumber) {
      setErrorMessage('Please fill in all the fields.');
      return;
    }

    try {
      const response = await axios.post('/api/ekyc', {
        faceImage,
        credentials,
      });

      console.log(response.data);
    } catch (error) {
      setErrorMessage('Error submitting eKYC.');
      console.error(error);
    }
  };

  return (
    <div className="p-8 w-1/2 m-auto">
      <h2 className="text-2xl font-bold mb-4">Please Verify </h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Face Capture:</label>
          <div className="w-full flex justify-center">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={320}
              height={240}
            />
          </div>
          <button
            type="button"
            onClick={captureFace}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 mt-2 "
          >
            Capture Face
          </button>
          {faceImage && <img src={faceImage} alt="Captured Face" className="mt-2" />}
        </div>

        <div>
          <label className="block">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={credentials.firstName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>

        <div>
          <label className="block">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={credentials.lastName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>

        <div>
          <label className="block">Document Number:</label>
          <input
            type="text"
            name="documentNumber"
            value={credentials.documentNumber}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EKYC;
