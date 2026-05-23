import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import GlobalApis from "../../../../../service/GlobalApis";
import { useParams } from "react-router-dom";
import { ResumeInfoContext } from "@/context/ResumeContext";
import { toast } from "sonner";

function formatSkillsForPreview(list) {
  return list.map((item) => ({
    title: item.title,
    skills: item.skills
      ? item.skills.split(",").map((s) => s.trim()).filter(Boolean)
      : [],
  }));
}

function SkillsDetails() {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [skillsList, setSkillsList] = useState([{ title: "", skills: "" }]);
  const initializedFor = useRef(null);

  useEffect(() => {
    const id = resumeInfo?.documentId;
    if (!id || initializedFor.current === id) return;
    initializedFor.current = id;
    if (resumeInfo?.skills?.length > 0) {
      setSkillsList(
        resumeInfo.skills.map((item) => ({
          title: item.title || "",
          skills: Array.isArray(item.skills)
            ? item.skills.join(", ")
            : item.skills || "",
        })),
      );
    }
  }, [resumeInfo?.documentId]);

  const syncPreview = (list) => {
    setResumeInfo((prev) => ({
      ...prev,
      skills: formatSkillsForPreview(list),
    }));
  };

  const handleEvent = (index, e) => {
    const newEntries = skillsList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setSkillsList(newEntries);
    syncPreview(newEntries);
  };

  const addNewSkills = () => {
    const next = [...skillsList, { title: "", skills: "" }];
    setSkillsList(next);
    syncPreview(next);
  };

  const removeNewSkills = () => {
    const next = skillsList.length > 1 ? skillsList.slice(0, -1) : skillsList;
    setSkillsList(next);
    syncPreview(next);
  };

  const onSave = () => {
    const invalid = skillsList.some(
      (row) => !row.title?.trim() || !row.skills?.trim(),
    );
    if (invalid) {
      toast.error("Fill Skills Type and comma-separated skills for each row");
      return;
    }

    setLoading(true);
    const formattedSkills = formatSkillsForPreview(skillsList);
    GlobalApis.UpdateResumeInfo(params.resumeid, {
      data: { skills: formattedSkills },
    })
      .then(() => {
        setLoading(false);
        toast.success("Details updated");
      })
      .catch(() => {
        setLoading(false);
        toast.error("Server Error");
      });
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add your skills here</p>
      <div>
        {skillsList.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-3 border p-3 my-5 rounded-lg"
          >
            <div>
              <label className="text-xs">Skills Type</label>
              <Input
                name="title"
                required
                placeholder="Frontend"
                value={item.title}
                onChange={(e) => handleEvent(index, e)}
              />
            </div>
            <div>
              <label className="text-xs">Skills (Comma Separated)</label>
              <Input
                name="skills"
                required
                placeholder="React,Tailwind CSS"
                value={item.skills}
                onChange={(e) => handleEvent(index, e)}
              />
            </div>
          </div>
        ))}
        <div className="flex gap-2">
          <Button variant="outline" className="text-primary" onClick={addNewSkills}>
            + Add More Skills
          </Button>
          <Button variant="outline" className="text-primary" onClick={removeNewSkills}>
            Remove
          </Button>
          <Button type="submit" disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SkillsDetails;
