import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { redirect, useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { SCHOLARSHIP_API_END_POINT } from "@/utiles/constant";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import Navbar from "../shared/Navbar";

const ScholarshipDescription = () => {
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isApplied = false;
  const params = useParams();
  const scholarshipId = params.id;
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${SCHOLARSHIP_API_END_POINT}/${scholarshipId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          console.log(res.data);
          setScholarship(res.data.scholarship);
        }
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to fetch scholarship"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchScholarship();
  }, [scholarshipId]);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage message={error} />;
  if (!scholarship) return <div>Scholarship not found</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <Link to="/Scholarship" className="text-[#7209b7] mb-4 block">
          <Button className="mb-4 " variant="ghost">
            &larr;
          </Button>
        </Link>
        <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
  <CardTitle className="text-2xl font-bold">{scholarship.title}</CardTitle>

  {user && user.role !== "admin" && (
    <>
      {/* ✅ Check if the user is already approved for a scholarship */}
      {user.hasApprovedScholarship ? (
        <p className="text-red-500 font-semibold">
          ❌ You have already been approved for a scholarship. You cannot apply for another.
        </p>
      ) : (
        <Button
          onClick={() => navigate(`/apply/${scholarshipId}`)}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      )}
    </>
  )}
</CardHeader>

          <CardContent>
            <div className="flex items-center gap-2 mt-2 mb-4">
              <Badge className="text-blue-700 font-bold" variant="secondary">
                Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
              </Badge>
              <Badge className="text-[#7209b7] font-bold" variant="secondary">
                Amount: ₹{scholarship.amount}
              </Badge>
            </div>
            <p className="text-gray-600 mb-6">{scholarship.description}</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Criteria</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Academic Score</TableCell>
                  <TableCell>
                    {scholarship.eligibility?.academicScore}%
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Family Income</TableCell>
                  <TableCell>
                    ₹{scholarship.eligibility?.familyIncome}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Age Group</TableCell>
                  <TableCell>{scholarship.eligibility?.age} years</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Student Type</TableCell>
                  <TableCell>
                    {scholarship.eligibility?.studentType.join(", ")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Caste Type</TableCell>
                  <TableCell>
                    {scholarship.eligibility?.caste.join(", ")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-6">
              <h3 className="font-bold text-lg mb-2">Documents Required:</h3>
              <ul className="list-disc pl-5">
                {scholarship.documentsRequired.map((doc, index) => (
                  <li key={index} className="text-gray-600">
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

const LoadingSkeleton = () => (
  <div className="max-w-7xl mx-auto my-10 px-4">
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-[300px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-[200px] mb-4" />
        <Skeleton className="h-20 w-full mb-6" />
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="max-w-7xl mx-auto my-10 px-4">
    <Card>
      <CardContent>
        <p className="text-red-500 text-center">{message}</p>
      </CardContent>
    </Card>
  </div>
);

export default ScholarshipDescription;
