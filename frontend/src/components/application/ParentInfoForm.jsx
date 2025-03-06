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
// import { toast } from "sonner";

// const parentInfoSchema = z.object({
//   fatherDetails: z.object({
//     fullName: z.string().min(2, "Name must be at least 2 characters"),
//     phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
//     occupation: z.string().min(2, "Occupation is required"),
//     employer: z.string().min(2, "Employer is required"),
//     dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
//   }),
//   motherDetails: z.object({
//     fullName: z.string().min(2, "Name must be at least 2 characters"),
//     phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
//     occupation: z.string().min(2, "Occupation is required"),
//     employer: z.string().min(2, "Employer is required"),
//     dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
//   }),
// });

// export default function ParentInfoForm({ formData, updateFormData, setIsParentInfoSaved })
// {
//   const form = useForm({
//     resolver: zodResolver(parentInfoSchema),
//     defaultValues: formData,
//   });

//   const onSubmit = (data) => {
//     console.log("student infol", data);
//     toast.success("Your Information has been saved!");

//     updateFormData(data);
//     setIsParentInfoSaved(true);
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         <Button type="submit" className="">
//           Save
//         </Button>

//         <div>
//           <h3 className="text-lg font-medium mb-4">Father's Details</h3>
//           <div className="space-y-4">
//             {[
//               "fullName",
//               "phoneNumber",
//               "occupation",
//               "employer",
//               "dateOfBirth",
//             ].map((field) => (
//               <FormField
//                 key={field}
//                 control={form.control}
//                 name={`fatherDetails.${field}`}
//                 render={({ field: fieldProps }) => (
//                   <FormItem>
//                     <FormLabel>
//                       {field.charAt(0).toUpperCase() + field.slice(1)}
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         {...fieldProps}
//                         type={field === "dateOfBirth" ? "date" : "text"}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             ))}
//           </div>
//         </div>
//         <div>
//           <h3 className="text-lg font-medium mb-4">Mother's Details</h3>
//           <div className="space-y-4">
//             {[
//               "fullName",
//               "phoneNumber",
//               "occupation",
//               "employer",
//               "dateOfBirth",
//             ].map((field) => (
//               <FormField
//                 key={field}
//                 control={form.control}
//                 name={`motherDetails.${field}`}
//                 render={({ field: fieldProps }) => (
//                   <FormItem>
//                     <FormLabel>
//                       {field.charAt(0).toUpperCase() + field.slice(1)}
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         {...fieldProps}
//                         type={field === "dateOfBirth" ? "date" : "text"}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             ))}
//           </div>
//         </div>
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";

const parentInfoSchema = z.object({
  fatherDetails: z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    occupation: z.string().min(2, "Occupation is required"),
    employer: z.string().min(2, "Employer is required"),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  }),
  motherDetails: z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    occupation: z.string().min(2, "Occupation is required"),
    employer: z.string().min(2, "Employer is required"),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  }),
});

export default function ParentInfoForm({
  formData,
  updateFormData,
  setIsParentInfoSaved,
}) {
  const form = useForm({
    resolver: zodResolver(parentInfoSchema),
    defaultValues: formData,
  });

  const onSubmit = (data) => {
    alert("Your Information has been saved successfully");
    updateFormData(data);
    setIsParentInfoSaved(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Button type="submit" className="">
          Save
        </Button>

        <div>
          <h3 className="text-lg font-medium mb-4">Father's Details</h3>
          <div className="space-y-4">
            {[
              "fullName",
              "phoneNumber",
              "occupation",
              "employer",
              "dateOfBirth",
            ].map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={`fatherDetails.${field}`}
                render={({ field: fieldProps }) => (
                  <FormItem>
                    <FormLabel>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        type={field === "dateOfBirth" ? "date" : "text"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Mother's Details</h3>
          <div className="space-y-4">
            {[
              "fullName",
              "phoneNumber",
              "occupation",
              "employer",
              "dateOfBirth",
            ].map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={`motherDetails.${field}`}
                render={({ field: fieldProps }) => (
                  <FormItem>
                    <FormLabel>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        type={field === "dateOfBirth" ? "date" : "text"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>
      </form>
    </Form>
  );
}
