import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
// import { Separator } from "@/components/ui/separator";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@radix-ui/react-select";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./button";
import HeroSection from "../HeroSection";
import Navbar from "../shared/Navbar";

export default function ScholarshipManual() {
  return (
    <div>
      <Navbar />
     
    <Card className="w-full max-w-4xl mx-auto p-6">
       
       
      <CardHeader>
        <CardTitle>Scholarship Application Manual</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] p-4 border rounded-md">
          <h2 className="text-lg font-bold">Step 1: Register/Login</h2>
          <p>• Visit the website and navigate to the login page.</p>
          <p>• If you are a new user, click on “Register” and fill in your details.</p>
          <p>• If you already have an account, log in using your credentials.</p>
          <Separator className="my-4" />
         
          <h2 className="text-lg font-bold">Step 2: Fill Student Information</h2>
          <p>• Click on “Apply for Scholarship” and enter your personal details.</p>
          <p>• Ensure that all mandatory fields are filled correctly.</p>
          <Separator className="my-4" />
          
          <h2 className="text-lg font-bold">Step 3: Provide Parent Information</h2>
          <p>• Enter details about your parents, including their income and occupation.</p>
          <Separator className="my-4" />
          
          <h2 className="text-lg font-bold">Step 4: Upload Required Documents</h2>
          <p>• Upload scanned copies of necessary documents such as:</p>
          <ul className="list-disc list-inside">
            <li>Aadhar Card</li>
            <li>Marksheet</li>
            <li>Fee Receipt</li>
            <li>Father's Income Certificate</li>
            <li>Ration Card</li>
            <li>Father's & Mother's PAN Card</li>
          </ul>
          <Separator className="my-4" />
          
          <h2 className="text-lg font-bold">Step 5: Review Your Application</h2>
          <p>• Carefully review all the entered details and uploaded documents.</p>
          <p>• Make corrections if needed before proceeding to the next step.</p>
          <Separator className="my-4" />
          
          <h2 className="text-lg font-bold">Step 6: Submit the Application</h2>
          <p>• Click on “Submit Application” to complete the process.</p>
          <p>• Wait for confirmation. You will be notified via email once your application is processed.</p>
          <Separator className="my-4" />
          
          <h2 className="text-lg font-bold">Step 7: Check Application Status</h2>
          <p>• You can track the status of your application under the “My Applications” section.</p>
          <p>• If approved, you will receive further instructions on how to avail the scholarship.</p>
        </ScrollArea>
      </CardContent>
    </Card>
    </div>
  );
}
