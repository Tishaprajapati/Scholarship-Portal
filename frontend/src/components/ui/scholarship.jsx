import React, { useState } from 'react';

const ScholarshipPage = () => {
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showDocumentForm, setShowDocumentForm] = useState(false);
  const [message, setMessage] = useState('');

  const handleSaveStudentInfo = () => {
    setMessage('Student information saved successfully!');
    setShowStudentForm(false);
  };

  const handleSaveDocuments = () => {
    setMessage('Documents uploaded successfully!');
    setShowDocumentForm(false);
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Scholarship Application</h1>

      {/* Trigger Buttons */}
      <div className="flex gap-5">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setShowStudentForm(true)}
        >
          Fill Student Info
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => setShowDocumentForm(true)}
        >
          Upload Documents
        </button>
      </div>

      {/* Success Message */}
      {message && <div className="mt-5 text-green-600 font-medium">{message}</div>}

      {/* Student Info Form Modal */}
      {showStudentForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Student Information</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Student Name"
                className="w-full p-2 border rounded"
              />
              <select className="w-full p-2 border rounded">
                <option value="college">College</option>
                <option value="school">School</option>
              </select>
              <input
                type="text"
                placeholder="School/College Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Year/Standard"
                className="w-full p-2 border rounded"
              />
              <h3 className="font-bold">Father's Details</h3>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Occupation"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Employer"
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                className="w-full p-2 border rounded"
              />
              <h3 className="font-bold">Mother's Details</h3>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Occupation"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Employer"
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                onClick={handleSaveStudentInfo}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Document Upload Form Modal */}
      {showDocumentForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Upload Documents</h2>
            <form className="space-y-4">
              <label>Aadhar Card</label>
              <input type="file" className="w-full p-2 border rounded" />
              <label>Marksheet</label>
              <input type="file" className="w-full p-2 border rounded" />
              <label>Fee Receipt</label>
              <input type="file" className="w-full p-2 border rounded" />
              <label>Father's Income Certificate</label>
              <input type="file" className="w-full p-2 border rounded" />
              <label>Ration Card</label>
              <input type="file" className="w-full p-2 border rounded" />
              <label>Father's PAN Card</label>
              <input type="file" className="w-full p-2 border rounded" />
              <label>Mother's PAN Card</label>
              <input type="file" className="w-full p-2 border rounded" />
              <button
                type="button"
                onClick={handleSaveDocuments}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScholarshipPage;
