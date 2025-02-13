import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";

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

export default function DocumentUploadForm({ formData, updateFormData }) {
  const form = useForm({
    resolver: zodResolver(documentUploadSchema),
    defaultValues: formData,
  });

  const onSubmit = (data) => {
    // Convert FileList objects to File objects
    const documents = {};
    Object.entries(data.documents).forEach(([key, value]) => {
      if (value instanceof FileList) {
        documents[key] = value[0];
      } else {
        documents[key] = value;
      }
    });
    updateFormData({ documents });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Button type="submit">Save Progress</Button>
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
                      {...field}
                      value={undefined}
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
