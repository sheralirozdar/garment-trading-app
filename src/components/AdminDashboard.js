import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchClothingApplications();
  }, []);

  const fetchClothingApplications = async () => {
    try {
      const response = await axios.get('/api/clothing-applications');
      setApplications(response.data.applications);
    } catch (error) {
      console.error('Error fetching clothing applications:', error);
    }
  };

  const handleApplicationApproval = async (applicationId) => {
    try {
      await axios.post(`/api/clothing-applications/${applicationId}/approve`);
      fetchClothingApplications();
    } catch (error) {
      console.error('Error approving clothing application:', error);
    }
  };

  const handleApplicationRejection = async (applicationId) => {
    try {
      await axios.post(`/api/clothing-applications/${applicationId}/reject`);
      fetchClothingApplications();
    } catch (error) {
      console.error('Error rejecting clothing application:', error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <h3 className="text-lg font-semibold mb-2">Clothing Applications</h3>
      {applications.length === 0 ? (
        <p>No clothing applications found.</p>
      ) : (
        <ul className="space-y-4">
          {applications.map((application) => (
            <li key={application.id} className="border rounded p-4">
              <div className="mb-2">Applicant Name: {application.applicantName}</div>
              <div className="mb-2">Measurements: {application.measurements}</div>
              <div className="mb-2">Selected Clothing: {application.selectedClothing}</div>
              <div className="mb-2">Cost: {application.cost}</div>
              <div>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2 mr-2"
                  onClick={() => handleApplicationApproval(application.id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2"
                  onClick={() => handleApplicationRejection(application.id)}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
