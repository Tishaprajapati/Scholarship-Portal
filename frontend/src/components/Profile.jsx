import { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import AppliedScholarshipTable from "./Scholarship/AppliedScholarshipTable";

const skills = ["90% in 10th", "85% in 12th", "Btech in IT"];

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="fle justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.role}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right "
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        {/* <div className="my-5">
          <h1>Qualifications</h1>
          <div className="flex items-center gap-1">
            {skills.length != 0 ? (
              skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>
        </div> */}
      </div>
      {/* <div className="max-w-4xl mx-auto bg-white roundeed-2xl">
        <h1 className="font-bold text-lg my-5">Applied Scholarship</h1>
        <AppliedScholarshipTable />
      </div> */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};
export default Profile;
