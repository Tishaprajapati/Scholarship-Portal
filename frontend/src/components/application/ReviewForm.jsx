import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReviewForm({ formData }) {
  const renderSection = (title, data) => {
    if (!data) return null;

    return (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="mb-2">
              <strong>
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                :
              </strong>{" "}
              {renderValue(value)}
            </div>
          ))}
        </CardContent>
      </Card>
    );
  };

  const renderValue = (value) => {
    if (value === null || value === undefined) return "Not provided";
    if (typeof value === "object") {
      if (value instanceof File) return value.name;
      return JSON.stringify(value);
    }
    return value.toString();
  };

  return (
    <div>
      {renderSection("Student Information", {
        studentName: formData.studentName,
        studentType: formData.studentType,
        schoolOrCollegeName: formData.schoolOrCollegeName,
        yearOrStandard: formData.yearOrStandard,
      })}
      {renderSection("Father's Details", formData.fatherDetails)}
      {renderSection("Mother's Details", formData.motherDetails)}
      {renderSection("Documents", formData.documents)}
    </div>
  );
}
