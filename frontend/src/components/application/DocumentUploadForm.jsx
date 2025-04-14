//@ts-nocheck
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
import { Button } from "../ui/button";
// import { Checkbox } from "@radix-ui/react-checkbox";

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
    fathersIncomeCertificate: z.instanceof(File, {
      message: "Father's Income Certificate is required",
    }),
    rationCard: z.instanceof(File, { message: "Ration Card is required" }),
    fatherPanCard: z.instanceof(File, {
      message: "Father's PAN Card is required",
    }),
    motherPanCard: z.instanceof(File, {
      message: "Mother's PAN Card is required",
    }),
  }),
});

export default function DocumentUploadForm({
  formData,
  updateFormData,
  setIsDocumentsSaved,
}) {
  const form = useForm({
    resolver: zodResolver(documentUploadSchema),
    defaultValues: formData,
  });

  const onSubmit = (data) => {
    const documents = {};
    Object.entries(data.documents).forEach(([key, value]) => {
      documents[key] = value instanceof FileList ? value[0] : value;
    });
    alert("Your Documents have been saved successfully");
    updateFormData({ documents });
    setIsDocumentsSaved(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-lg font-semibold">
          Upload all documents 
        </h2>
        <Button type="submit" className="mt-4">
          Save Progress
        </Button>

        {/* Document upload fields */}
        {Object.keys(documentUploadSchema.shape.documents.shape).map(
          (documentName) => (
            <FormField
              key={documentName}
              control={form.control}
              name={`documents.${documentName}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {documentName
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                  
                      onChange={(e) => field.onChange(e.target.files[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        )}
      </form>
    </Form>
  );
}






