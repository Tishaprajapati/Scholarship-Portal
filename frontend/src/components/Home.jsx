/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import Chatbot from "./Chatbot";
import CategoryCarousel from "./CategoryCarousel";
import LatestScholarships from "./Scholarship/LatestScholarships";
import Footer from "./shared/Footer";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import axios from "axios";
import { toast } from "sonner";
import Scholarship from "./Scholarship/Scholarship";

const SCHOLARSHIP_API_END_POINT = "http://localhost:9000/api/scholarship";

const Home = () => {
  const { user } = useSelector((store) => store.auth);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserApplications();
    }
  }, [user]);

  const fetchUserApplications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/application",
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setApplications(response.data.applications);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch applications"
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return (
      <Badge className={statusColors[status.toLowerCase()]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const ApplicationDialog = ({ application }) => (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>Application Details</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Student Information</h3>
            <p>Name: {application.studentName}</p>
            <p>Type: {application.studentType}</p>
            <p>School/College: {application.schoolOrCollegeName}</p>
            <p>Year/Standard: {application.yearOrStandard}</p>
          </div>
          <div>
            <h3 className="font-semibold">Application Status</h3>
            <div className="mt-2">{getStatusBadge(application.status)}</div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Scholarship Details</h3>
          <p>Title: {application.scholarship?.title}</p>
          <p>Amount: ₹{application.scholarship?.amount}</p>
          <p>
            Deadline:{" "}
            {new Date(application.scholarship?.deadline).toLocaleDateString()}
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Documents Submitted</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(application.documents || {}).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {key.replace(/([A-Z])/g, " $1").trim()}
              </a>
            ))}
          </div>
        </div>
      </div>
    </DialogContent>
  );

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${SCHOLARSHIP_API_END_POINT}/get`, {
        withCredentials: true,
      });
      if (res.data.success) {
        const filtered = res.data.scholarships.filter(
          (scholarship) =>
            scholarship.title
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            scholarship.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
        setScholarships(filtered);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return (
      <div>
        <Navbar />
        <HeroSection />
        <Chatbot />
      </div>
    );
  }

  if (user.role === "admin") {
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto py-8 px-4">
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex gap-4">
              <input
                type="text"
                placeholder="Search scholarships..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7209b7]"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-[#7209b7] text-white rounded-lg hover:bg-[#5f32ad]"
              >
                Search
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scholarships.map((scholarship) => (
              <Scholarship key={scholarship._id} scholarship={scholarship} />
            ))}
          </div>
        </div>
        <Chatbot />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Your Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                You haven't applied for any scholarships yet.
              </div>
            ) : (
              <Table>
                <TableCaption>
                  List of your scholarship applications
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scholarship Name</TableHead>
                    <TableHead>Application Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow
                      key={application._id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => {
                        setSelectedApplication(application);
                        setIsDialogOpen(true);
                      }}
                    >
                      <TableCell className="font-medium">
                        {application.scholarship?.title}
                      </TableCell>
                      <TableCell>
                        {new Date(application.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>₹{application.scholarship?.amount}</TableCell>
                      <TableCell>
                        {getStatusBadge(application.status)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        <Chatbot />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {selectedApplication && (
            <ApplicationDialog application={selectedApplication} />
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default Home;
