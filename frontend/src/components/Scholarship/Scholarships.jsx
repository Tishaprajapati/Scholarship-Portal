/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import FilterCard from "./FilterCard";
import Scholarship from "./Scholarship";
import { useSelector } from "react-redux";
import AddScholarshipDialog from "./AddScholarshipDialog";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SCHOLARSHIP_API_END_POINT } from "@/utiles/constant";

const Scholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    amount: "",
    studentType: "",
    caste: "",
  });

  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await axios.get(`${SCHOLARSHIP_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setScholarships(res.data.scholarships);
          setFilteredScholarships(res.data.scholarships);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchScholarships();
  }, []);

  const handleFilter = (type, value) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);

    let filtered = scholarships;

    if (newFilters.amount) {
      filtered = filtered.filter((scholarship) => {
        const amount = parseInt(scholarship.amount);
        switch (newFilters.amount) {
          case "Rs. 10000 - Rs. 25000":
            return amount <= 25000;
          case "Rs. 25000 - Rs. 50000":
            return amount > 25000 && amount <= 50000;
          case "Rs. 50000 - Rs. 100000":
            return amount > 50000 && amount <= 100000;
          case "Above 100000":
            return amount > 100000;
          default:
            return true;
        }
      });
    }

    if (newFilters.studentType) {
      filtered = filtered.filter((scholarship) =>
        scholarship.eligibility?.studentType.includes(newFilters.studentType)
      );
    }

    if (newFilters.caste) {
      filtered = filtered.filter((scholarship) =>
        scholarship.eligibility?.caste.includes(newFilters.caste)
      );
    }

    setFilteredScholarships(filtered);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    let filtered = scholarships;

    if (query) {
      filtered = filtered.filter(
        (scholarship) =>
          scholarship.title.toLowerCase().includes(query) ||
          scholarship.organizationName.toLowerCase().includes(query) ||
          scholarship.description.toLowerCase().includes(query)
      );
    }

    if (filters.amount) {
      filtered = filtered.filter((scholarship) => {
        const amount = parseInt(scholarship.amount);
        switch (filters.amount) {
          case "Rs. 10000 - Rs. 25000":
            return amount <= 25000;
          case "Rs. 25000 - Rs. 50000":
            return amount > 25000 && amount <= 50000;
          case "Rs. 50000 - Rs. 100000":
            return amount > 50000 && amount <= 100000;
          case "Above 100000":
            return amount > 100000;
          default:
            return true;
        }
      });
    }

    if (filters.studentType) {
      console.log("Filtering for Student Type:", filters.studentType); // Debugging log
      filtered = filtered.filter((scholarship) => {
        console.log(
          "Scholarship Student Type:",
          scholarship.eligibility?.studentType
        ); // Debugging log
        return scholarship.eligibility?.studentType.includes(
          filters.studentType
        );
      });
    }

    if (filters.caste) {
      filtered = filtered.filter((scholarship) =>
        scholarship.eligibility?.caste.includes(filters.caste)
      );
    }

    setFilteredScholarships(filtered);
  };

  const clearFilters = () => {
    setFilters({
      amount: "",
      studentType: "",
      caste: "",
    });
    setSearchQuery("");
    setFilteredScholarships(scholarships);
  };

  const handleScholarshipUpdate = (updatedScholarship) => {
    setScholarships(
      scholarships.map((s) =>
        s._id === updatedScholarship._id ? updatedScholarship : s
      )
    );
    setFilteredScholarships(
      filteredScholarships.map((s) =>
        s._id === updatedScholarship._id ? updatedScholarship : s
      )
    );
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-4 flex-1">
            <h1 className="text-2xl font-bold">All Scholarships</h1>
            <input
              type="text"
              placeholder="Search scholarships..."
              value={searchQuery}
              onChange={handleSearch}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {user?.role === "admin" && <AddScholarshipDialog />}
        </div>
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard
              filters={filters}
              onFilter={handleFilter}
              onClear={clearFilters}
            />
          </div>
          {filteredScholarships.length <= 0 ? (
            <span>Scholarship not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filteredScholarships.map((scholarship) => (
                  <Scholarship
                    key={scholarship._id}
                    scholarship={scholarship}
                    onUpdate={handleScholarshipUpdate}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scholarships;
