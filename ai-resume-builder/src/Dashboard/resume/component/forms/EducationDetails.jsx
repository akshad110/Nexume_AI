import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApis from "../../../../../service/GlobalApis";
import { toast } from "sonner";

const emptyEducation = {
  universityName: "",
  degree: "",
  major: "",
  startDate: "",
  endDate: "",
  description: "",
};

function EducationDetails() {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [educationList, setEducationList] = useState([{ ...emptyEducation }]);
  const initializedFor = useRef(null);

  useEffect(() => {
    const id = resumeInfo?.documentId;
    if (!id || initializedFor.current === id) return;
    initializedFor.current = id;
    if (resumeInfo?.education?.length > 0) {
      setEducationList(resumeInfo.education);
    }
  }, [resumeInfo?.documentId]);

  const syncPreview = (list) => {
    setResumeInfo((prev) => ({ ...prev, education: list }));
  };

  const handleEvent = (e, index) => {
    const newEntries = educationList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);
    syncPreview(newEntries);
  };

  const addNewEducation = () => {
    const next = [...educationList, { ...emptyEducation }];
    setEducationList(next);
    syncPreview(next);
  };

  const removeNewEducation = () => {
    const next =
      educationList.length > 1 ? educationList.slice(0, -1) : educationList;
    setEducationList(next);
    syncPreview(next);
  };

  const onSave = () => {
    setLoading(true);
    GlobalApis.UpdateResumeInfo(params.resumeid, {
      data: { education: educationList },
    })
      .then(() => {
        setLoading(false);
        toast.success("Details updated");
      })
      .catch(() => {
        setLoading(false);
        toast.error("Server Error, Please try again!");
      });
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your Educational details here</p>
      <div>
        {educationList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label>University Name</label>
                <Input
                  name="universityName"
                  value={item.universityName ?? ""}
                  onChange={(e) => handleEvent(e, index)}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input
                  name="degree"
                  value={item.degree ?? ""}
                  onChange={(e) => handleEvent(e, index)}
                />
              </div>
              <div>
                <label>Major</label>
                <Input
                  name="major"
                  value={item.major ?? ""}
                  onChange={(e) => handleEvent(e, index)}
                />
              </div>
              <div>
                <label>Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  value={item.startDate ?? ""}
                  onChange={(e) => handleEvent(e, index)}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  value={item.endDate ?? ""}
                  onChange={(e) => handleEvent(e, index)}
                />
              </div>
              <div className="col-span-2">
                <label>Description</label>
                <Textarea
                  name="description"
                  value={item.description ?? ""}
                  onChange={(e) => handleEvent(e, index)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="text-primary" onClick={addNewEducation}>
          + Add More Education
        </Button>
        <Button variant="outline" className="text-primary" onClick={removeNewEducation}>
          Remove
        </Button>
        <Button type="submit" disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default EducationDetails;
