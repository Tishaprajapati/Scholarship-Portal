// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Button } from "../ui/button";

// const documentUploadSchema = z.object({
//   documents: z.object({
//     aadharCard: z.instanceof(File, { message: "Aadhar Card is required" }),
//     marksheet: z.instanceof(File, { message: "Marksheet is required" }),
//     feeReceipt: z.instanceof(File, { message: "Fee Receipt is required" }),
//     fathersIncomeCertificate: z.instanceof(File, {
//       message: "Father's Income Certificate is required",
//     }),
//     rationCard: z.instanceof(File, { message: "Ration Card is required" }),
//     fatherPanCard: z.instanceof(File, {
//       message: "Father's PAN Card is required",
//     }),
//     motherPanCard: z.instanceof(File, {
//       message: "Mother's PAN Card is required",
//     }),
//   }),
// });

// export default function DocumentUploadForm({ formData, updateFormData }) {
//   const form = useForm({
//     resolver: zodResolver(documentUploadSchema),
//     defaultValues: formData,
//   });

//   const onSubmit = (data) => {
//     // Convert FileList objects to File objects
//     const documents = {};
//     Object.entries(data.documents).forEach(([key, value]) => {
//       if (value instanceof FileList) {
//         documents[key] = value[0];
//       } else {
//         documents[key] = value;
//       }
//     });
//     updateFormData({ documents });
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <h2>Upload all documents in pdf form </h2>
//         <Button type="submit">Save Progress</Button>
//         {Object.keys(documentUploadSchema.shape.documents.shape).map(
//           (documentName) => (
//             <FormField
//               key={documentName}
//               control={form.control}
//               name={`documents.${documentName}`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>
//                     {documentName
//                       .replace(/([A-Z])/g, " $1")
//                       .replace(/^./, (str) => str.toUpperCase())}
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                       type="file"
//                       {...field}
//                       value={undefined}
//                       onChange={(e) => field.onChange(e.target.files[0])}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           )
//         )}
//       </form>
//     </Form>
//   );
// }






import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox"; // ✅ Import checkbox component
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";

// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox"; // ✅ Import Checkbox
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { useState } from "react";
// import { Button } from "../ui/button";

const documentUploadSchema = z.object({
  documents: z.object({
    aadharCard: z.instanceof(File, { message: "Aadhar Card is required" }),
    marksheet: z.instanceof(File, { message: "Marksheet is required" }),
    feeReceipt: z.instanceof(File, { message: "Fee Receipt is required" }),
    fathersIncomeCertificate: z.instanceof(File, { message: "Father's Income Certificate is required" }),
    rationCard: z.instanceof(File, { message: "Ration Card is required" }),
    fatherPanCard: z.instanceof(File, { message: "Father's PAN Card is required" }),
    motherPanCard: z.instanceof(File, { message: "Mother's PAN Card is required" }),
  }),
});

export default function DocumentUploadForm({ formData, updateFormData }) {
  const form = useForm({
    resolver: zodResolver(documentUploadSchema),
    defaultValues: formData,
  });

  // ✅ State to track verified documents
  const [verified, setVerified] = useState({
    aadharCard: false,
    marksheet: false,
    marksheet2: false,
    feeReceipt: false,
    feeReceipt2: false,
    fathersIncomeCertificate: false,
    fathersIncomeCertificate2: false,
    rationCard:false,
    fatherspancard:false,
    motherspancard:false,
  });

  // ✅ Function to mark document as verified
  const handleVerify = (documentName) => {
    setVerified((prev) => ({ ...prev, [documentName]: true }));
  };

  // ✅ Check if all documents are verified
  const allVerified = Object.values(verified).every(Boolean);

  const onSubmit = (data) => {
    if (!allVerified) {
      alert("Please verify all required documents before saving.");
      return;
    }

    const documents = {};
    Object.entries(data.documents).forEach(([key, value]) => {
      documents[key] = value instanceof FileList ? value[0] : value;
    });
    alert("Your Documents have saved successfully");
    updateFormData({ documents });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-lg font-semibold">Upload all documents (PDF only)</h2>
      {/* Save Button (Disabled until all required documents are verified) */}
      <Button type="submit" disabled={!allVerified} className="mt-4">
          Save Progress
        </Button>
        {/* Aadhar Card */}
        <FormField
          control={form.control}
          name="documents.aadharCard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aadhar Card</FormLabel>
              <FormControl>
                <Input type="file" accept=".pdf" onChange={(e) => field.onChange(e.target.files[0])} />
              </FormControl>
              <FormMessage />
              <div className="flex items-center space-x-4 mt-2">
                <span>Aadhar Card is clear</span>
                <Button
                  type="button"
                  onClick={() => handleVerify("aadharCard")}
                  className={`px-3 py-1 text-sm ${verified.aadharCard ? "bg-green-500 text-white" : "bg-gray-300"}`}
                >
                  {verified.aadharCard ? "✔ Verified" : "Verify"}
                </Button>
              </div>
            </FormItem>
          )}
        />

        {/* Marksheet */}
        <FormField
          control={form.control}
          name="documents.marksheet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marksheet</FormLabel>
              <FormControl>
                <Input type="file" accept=".pdf" onChange={(e) => field.onChange(e.target.files[0])} />
              </FormControl>
              <FormMessage />
              <div className="flex items-center space-x-4 mt-2">
                <span>Marksheet includes both even & odd sem results</span>
                <Button
                  type="button"
                  onClick={() => handleVerify("marksheet")}
                  className={`px-3 py-1 text-sm ${verified.marksheet ? "bg-green-500 text-white" : "bg-gray-300"}`}
                >
                  {verified.marksheet ? "✔ Verified" : "Verify"}
                </Button>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <span>Marksheets are original</span>
                <Button
                  type="button"
                  onClick={() => handleVerify("marksheet")}
                  className={`px-3 py-1 text-sm ${verified.marksheet2 ? "bg-green-500 text-white" : "bg-gray-300"}`}
                >
                  {verified.marksheet2 ? "✔ Verified" : "Verify"}
                </Button>
              </div>
            </FormItem>
          )}
        />

        {/* Fee Receipt */}
        <FormField
          control={form.control}
          name="documents.feeReceipt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fee Receipt</FormLabel>
              <FormControl>
                <Input type="file" accept=".pdf" onChange={(e) => field.onChange(e.target.files[0])} />
              </FormControl>
              <FormMessage />
              <div className="flex items-center space-x-4 mt-2">
                <span>Fee receipt has stamp & includes both even & odd sem receipts</span>
                <Button
                  type="button"
                  onClick={() => handleVerify("feeReceipt")}
                  className={`px-3 py-1 text-sm ${verified.feeReceipt ? "bg-green-500 text-white" : "bg-gray-300"}`}
                >
                  {verified.feeReceipt ? "✔ Verified" : "Verify"}
                </Button>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <span>Fee receipts are original</span>
                <Button
                  type="button"
                  onClick={() => handleVerify("feeReceipt")}
                  className={`px-3 py-1 text-sm ${verified.feeReceipt2 ? "bg-green-500 text-white" : "bg-gray-300"}`}
                >
                  {verified.feeReceipt2 ? "✔ Verified" : "Verify"}
                </Button>
              </div>
            </FormItem>
          )}
        />

        {/* Father's Income Certificate */}
        <FormField
          control={form.control}
          name="documents.fathersIncomeCertificate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Father's Income Certificate</FormLabel>
              <FormControl>
                <Input type="file" accept=".pdf" onChange={(e) => field.onChange(e.target.files[0])} />
              </FormControl>
              <FormMessage />
              <div className="flex items-center space-x-4 mt-2">
                 <span>Father's income certificate is valid (not expired)</span>
                <Button
                  type="button"
                  onClick={() => handleVerify("fathersIncomeCertificate")}
                  className={`px-3 py-1 text-sm ${verified.fathersIncomeCertificate ? "bg-green-500 text-white" : "bg-gray-300"}`}
                >
                  
                  {verified.fathersIncomeCertificate ? "✔ Verified" : "Verify"}
                </Button>
              </div>
              <div className="flex items-center space-x-4 mt-2">
               

               <span>Father's income certificate is original not scanned.</span>

              <Button
                type="button"
                onClick={() => handleVerify("fathersIncomeCertificate")}
                className={`px-3 py-1 text-sm ${verified.fathersIncomeCertificate2 ? "bg-green-500 text-white" : "bg-gray-300"}`}
              >
                
                {verified.fathersIncomeCertificate2 ? "✔ Verified" : "Verify"}
              </Button>
            </div>
            </FormItem>
          )}
        />

        {/* Ration Card (No verification required) */}
        <FormField
          control={form.control}
          name="documents.rationCard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ration Card</FormLabel>
              <FormControl>
                <Input type="file" accept=".pdf" onChange={(e) => field.onChange(e.target.files[0])} />
              </FormControl>
              <FormMessage />

              <div className="flex items-center space-x-4 mt-2">
               

               <span>Ration card is original.</span>

              <Button
                type="button"
                onClick={() => handleVerify("fathersIncomeCertificate")}
                className={`px-3 py-1 text-sm ${verified.rationCard ? "bg-green-500 text-white" : "bg-gray-300"}`}
              >
                
                {verified.rationCard ? "✔ Verified" : "Verify"}
              </Button>
            </div>
            </FormItem>
          )}
        />

        {/* Father's PAN Card */}
        <FormField
          control={form.control}
          name="documents.fatherPanCard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Father's PAN Card</FormLabel>
              <FormControl>
                <Input type="file" accept=".pdf" onChange={(e) => field.onChange(e.target.files[0])} />
              </FormControl>
              <FormMessage />
              <div className="flex items-center space-x-4 mt-2">
               

               <span>Father's income certificate is valid (not expired)</span>

              <Button
                type="button"
                onClick={() => handleVerify("fathersIncomeCertificate")}
                className={`px-3 py-1 text-sm ${verified.fatherspancard ? "bg-green-500 text-white" : "bg-gray-300"}`}
              >
                
                {verified.fatherspancard ? "✔ Verified" : "Verify"}
              </Button>
            </div>
            </FormItem>
          )}
        />

        {/* Mother's PAN Card */}
        <FormField
          control={form.control}
          name="documents.motherPanCard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mother's PAN Card</FormLabel>
              <FormControl>
                <Input type="file" accept=".pdf" onChange={(e) => field.onChange(e.target.files[0])} />
              </FormControl>
              <FormMessage />
              <div className="flex items-center space-x-4 mt-2">
               

               <span>Father's income certificate is valid (not expired)</span>

              <Button
                type="button"
                onClick={() => handleVerify("fathersIncomeCertificate")}
                className={`px-3 py-1 text-sm ${verified.motherspancard ? "bg-green-500 text-white" : "bg-gray-300"}`}
              >
                
                {verified.motherspancard ? "✔ Verified" : "Verify"}
              </Button>
            </div>
            </FormItem>
          )}
        />

        
      </form>
    </Form>
  );
}