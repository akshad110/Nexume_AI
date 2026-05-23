import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useRef, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeContext";
import { useParams } from "react-router-dom";
import GlobalApis from "../../../../../service/GlobalApis";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

function ExperienceDetails() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const params = useParams();

  const [loading, setLoading] = useState(false);
  const showOnResume = resumeInfo?.sectionVisibility?.experience !== false;

  const [experienceList, setExperienceList] = useState([{ ...formField }]);
  const initializedFor = useRef(null);

  useEffect(() => {
    const id = resumeInfo?.documentId;
    if (!id || initializedFor.current === id) return;
    initializedFor.current = id;
    if (resumeInfo?.experience?.length > 0) {
      setExperienceList(resumeInfo.experience);
    }
  }, [resumeInfo?.documentId]);

  const syncPreview = (list) => {
    setResumeInfo((prev) => ({ ...prev, experience: list }));
  };

  const setShowOnResume = (checked) => {
    const sectionVisibility = {
      ...(resumeInfo?.sectionVisibility || {}),
      experience: checked,
    };
    setResumeInfo((prev) => ({ ...prev, sectionVisibility }));
  };

  const onSave = () => {
    setLoading(true);

    const data = {
      data: {
        experience: experienceList,
        sectionVisibility: {
          ...(resumeInfo?.sectionVisibility || {}),
          experience: showOnResume,
        },
      },
    };

 

    GlobalApis.UpdateResumeInfo(params.resumeid, data).then(
      (res) => {
        toast("Details Updated");

        setLoading(false);
      },
      (error) => {
        setLoading(false);

        toast("Server Error");
      },
    );
  };

  const handleEvent = (index, e) => {
    const newEntries = experienceList.slice();

    const { name, value } = e.target;

    newEntries[index][name] = value;

    setExperienceList(newEntries);
    syncPreview(newEntries);
  };

  const addNewExperience = () => {
    const next = [...experienceList, { ...formField }];
    setExperienceList(next);
    syncPreview(next);
  };

  const removeNewExperience = () => {
    const next =
      experienceList.length > 1
        ? experienceList.slice(0, -1)
        : experienceList;
    setExperienceList(next);
    syncPreview(next);
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e;
    setExperienceList(newEntries);
    syncPreview(newEntries);
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>

        <p>Add your past job experience. Turn off the option below if you are a fresher and want to hide this section on your resume.</p>

        <label className="flex items-center gap-2 mt-4 mb-2 cursor-pointer text-sm">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300"
            checked={showOnResume}
            onChange={(e) => setShowOnResume(e.target.checked)}
          />
          <span>Show experience section on resume</span>
        </label>

        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>

                  <Input
                    name="title"
                    value={item?.title ?? ""}
                    onChange={(e) => handleEvent(index, e)}
                  />
                </div>

                <div>
                  <label className="text-xs">Company Name</label>

                  <Input
                    name="companyName"
                    value={item?.companyName ?? ""}
                    onChange={(e) => handleEvent(index, e)}
                  />
                </div>

                <div>
                  <label className="text-xs">City</label>

                  <Input
                    name="city"
                    value={item?.city ?? ""}
                    onChange={(e) => handleEvent(index, e)}
                  />
                </div>

                <div>
                  <label className="text-xs">State</label>

                  <Input
                    name="state"
                    value={item?.state ?? ""}
                    onChange={(e) => handleEvent(index, e)}
                  />
                </div>

                <div>
                  <label className="text-xs">Start Date</label>

                  <Input
                    type="date"
                    name="startDate"
                    value={item?.startDate ?? ""}
                    onChange={(e) => handleEvent(index, e)}
                  />
                </div>

                <div>
                  <label className="text-xs">End Date</label>

                  <Input
                    type="date"
                    name="endDate"
                    value={item?.endDate ?? ""}
                    onChange={(e) => handleEvent(index, e)}
                  />
                </div>

                <div className="col-span-2">
                  <RichTextEditor
                    index={index}
                    positionTitle={item?.title}
                    defaultValue={item?.workSummery}
                    onRichTextEditorChange={(e) =>
                      handleRichTextEditor(e, "workSummery", index)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-primary"
            onClick={addNewExperience}
          >
            + Add More Experience
          </Button>

          <Button
            variant="outline"
            className="text-primary"
            onClick={removeNewExperience}
          >
            Remove
          </Button>

          <Button onClick={onSave} disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ExperienceDetails;
