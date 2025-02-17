import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";

const studentInfoSchema = z.object({
  studentName: z.string().min(2, "Name must be at least 2 characters"),
  studentType: z.enum(["school", "college"]),
  schoolOrCollegeName: z
    .string()
    .min(2, "School/College name must be at least 2 characters"),
  yearOrStandard: z.string().min(1, "Year/Standard is required"),
  studentCaste: z.string().min(1, "caste is required"),
});

export default function StudentInfoForm({ formData, updateFormData }) {
  const form = useForm({
    resolver: zodResolver(studentInfoSchema),
    defaultValues: formData,
  });

  const onSubmit = (data) => {
    console.log("student infol", data);
    updateFormData(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Button type="submit" className="">
          Save
        </Button>
        <FormField
          control={form.control}
          name="studentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="studentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="school">School</SelectItem>
                  <SelectItem value="college">College</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="schoolOrCollegeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School/College Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="yearOrStandard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year/Standard</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="studentCaste"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Caste</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
