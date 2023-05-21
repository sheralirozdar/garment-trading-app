import React, { useState } from 'react';
import { Link, redirect,useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [chestSize, setChestSize] = useState('');
  const [waistSize, setWaistSize] = useState('');
  const [selectedClothing, setSelectedClothing] = useState('');
  const [cost, setCost] = useState(0);

  const navigate =useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('authToken');

    console.log("logout")

    navigate('/login')
  };

  const handleMeasurementsSubmit = (e) => {
    e.preventDefault();


    let calculatedCost = 0;

    if (selectedClothing === 'shirt') {
      calculatedCost = chestSize * 2;
    } else if (selectedClothing === 'dress') {
      calculatedCost = height * weight * 10;
    } else if (selectedClothing === 'trouser') {
      calculatedCost = waistSize * 1.5;
    }

    setCost(calculatedCost);
  };

  return (<>
  <nav className="flex justify-between items-center mb-8 bg-slate-800 text-slate-200 p-5">
        <div>
          <h2 className="text-2xl font-bold">User Dashboard</h2>
        </div>
       
    
          <div>
            <Link to="/face" class="text-white font-bold text-xl">Face Recogination</Link>
          </div>
          
          <div>
          <Link to="/message" class="text-white font-bold  m-5">Inbox</Link>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
    </nav>
    <div className="flex items-center justify-center  ">
       

  <div>
  <h3 className="text-lg font-semibold mb-2">Apply for New Clothes</h3>

  <form onSubmit={handleMeasurementsSubmit} className="">
        <div className="flex items-center">
          <label className="w-20">Height:</label>
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-40"
          />
        </div>
        <div className="flex items-center">
          <label className="w-20">Weight:</label>
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-40"
          />
        </div>
        <div className="flex items-center">
          <label className="w-20">Chest Size:</label>
          <input
            type="text"
            value={chestSize}
            onChange={(e) => setChestSize(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-40"
          />
        </div>
        <div className="flex items-center">
          <label className="w-20">Waist Size:</label>
          <input
            type="text"
            value={waistSize}
            onChange={(e) => setWaistSize(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-40"
          />
        </div>
        <div className="flex items-center">
          <label className="w-20">Select Clothing:</label>
          <select
            value={selectedClothing}
            onChange={(e) => setSelectedClothing(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-40"
          >
            <option value="">Select</option>
            <option value="shirt">Shirt</option>
            <option value="dress">Dress</option>
            <option value="trouser">Trouser</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2"
        >
          Submit
        </button>
      </form>
      {cost > 0 && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Cost: {cost}</h4>
        </div>
      )}
  </div>
     

     
    </div>
    </>
  );
};

export default UserDashboard;
