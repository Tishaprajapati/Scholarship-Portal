import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../shared/Navbar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { toast } from "sonner";

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scholarship, setScholarship] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchApplications();
  }, [id]);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/application/scholarship/${id}`,
        {
          withCredentials: true,
        }
      );
      setApplications(response.data.applications);
      setScholarship(response.data.scholarship);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:9000/api/application/${applicationId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log("response", response);
        toast.success("Status updated successfully");
        // Update local state
        setApplications(
          applications.map((app) =>
            app._id === applicationId ? { ...app, status: newStatus } : app
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
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

  const ApplicationDialog = ({ application }) => {
    console.log(application);
    return (
      <DialogContent className="max-w-3xl h-fit">
        <DialogHeader>
          <DialogTitle>Application Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Student Information</h3>
              <p>Name: {application.studentName}</p>
              <p>Type: {application.studentType}</p>
              <p>School/College: {application.schoolOrCollegeName}</p>
              <p>Year/Standard: {application.yearOrStandard}</p>
              <p>Caste : {application.studentCaste}</p>
            </div>
            <div>
              <h3 className="font-semibold">Current Status</h3>
              <div className="flex items-center gap-4 mt-2">
                <Select
                  defaultValue={application.status}
                  onValueChange={(value) =>
                    updateApplicationStatus(application["_id"], value)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Parent Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium">Father</h4>
                <p>Name: {application.fatherDetails?.fullName}</p>
                <p>Occupation: {application.fatherDetails?.occupation}</p>
              </div>
              <div>
                <h4 className="font-medium">Mother</h4>
                <p>Name: {application.motherDetails?.fullName}</p>
                <p>Occupation: {application.motherDetails?.occupation}</p>
              </div>
            </div>
            <div className="mt-3">
              <h3 className="font-semibold mb-2">Documents</h3>
              <div>
                <ul>
                  {Object.keys(application.documents).map((key, index) => (
                    <li className="p-2 underline" key={index}>
                      <a href={application.documents[key]} target="_blank">
                        {key}
                      </a>
                    </li>
                  ))}{" "}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto py-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{scholarship?.title}</CardTitle>
            <CardDescription>Applications for this scholarship</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardContent>
            <Table>
              <TableCaption>List of applications</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Application Date</TableHead>
                  <TableHead>Student Type</TableHead>
                  <TableHead>School/College</TableHead>
                  <TableHead>Student Caste</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application._id}>
                    <TableCell className="font-medium">
                      {application.studentName}
                    </TableCell>
                    <TableCell>
                      {new Date(application.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="capitalize">
                      {application.studentType}
                    </TableCell>
                    <TableCell>{application.schoolOrCollegeName}</TableCell>
                    <TableCell>{application.studentCaste}</TableCell>
                    <TableCell>{getStatusBadge(application.status)}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedApplication(application);
                              console.log(Object.keys(application.documents));
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        {selectedApplication &&
                          selectedApplication._id === application._id && (
                            <ApplicationDialog
                              application={selectedApplication}
                            />
                          )}
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationList;
