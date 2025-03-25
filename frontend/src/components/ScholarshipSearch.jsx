import React, { useState } from "react";
import { searchScholarships } from "../lib/api/scholarshipService";

const ScholarshipSearch = () => {
  const [searchParams, setSearchParams] = useState({
    title: "",
    minAmount: "",
    maxAmount: "",
    studentType: "college", // default value
  });
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const results = await searchScholarships(searchParams);
      setScholarships(results);
    } catch (err) {
      setError("Failed to fetch scholarships. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <input
            type="text"
            name="title"
            placeholder="Search by title..."
            value={searchParams.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="minAmount"
            placeholder="Min Amount"
            value={searchParams.minAmount}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="maxAmount"
            placeholder="Max Amount"
            value={searchParams.maxAmount}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
        </div>
        <select
          name="studentType"
          value={searchParams.studentType}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="college">College</option>
          <option value="highschool">High School</option>
          {/* Add other student types as needed */}
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search Scholarships"}
        </button>
      </form>

      {error && <div className="text-red-500 mt-4">{error}</div>}

      <div className="mt-8">
        {scholarships.map((scholarship, index) => (
          <div key={index} className="border p-4 rounded mb-4">
            <h3 className="text-lg font-semibold">{scholarship.title}</h3>
            <p className="text-gray-600">Amount: ${scholarship.amount}</p>
            <p className="text-gray-600">
              Student Type: {scholarship.studentType}
            </p>
            {/* Add more scholarship details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScholarshipSearch;
