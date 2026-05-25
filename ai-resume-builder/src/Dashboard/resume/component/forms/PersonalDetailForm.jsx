import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApis from "../../../../../service/GlobalApis";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner"
import { isPersonalDetailComplete } from "@/lib/resumeFormSteps";
import { isProfessionalTemplate, isDeveloperTemplate } from "@/data/resumeTemplates";
import { mergeProgrammingSkillsWithSocial } from "@/lib/resumeLinks";
import { normalizeResume } from "@/lib/normalizeResume";


function PersonalDetailForm({enableNext}) {


  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData,setFormData]=useState();
  const [loading,setLoading]=useState(false);
  const params = useParams();
  const showWebsite =
    isProfessionalTemplate(resumeInfo?.templateId) ||
    isDeveloperTemplate(resumeInfo?.templateId);
  const initializedFor = useRef(null);

  useEffect(() => {
    if (!resumeInfo) return;
    const key = resumeInfo.documentId || params?.resumeid;
    if (!key || initializedFor.current === key) return;
    initializedFor.current = key;

    setFormData({
      firstName: resumeInfo.firstName || "",
      lastName: resumeInfo.lastName || "",
      jobTitle: resumeInfo.jobTitle || "",
      address: resumeInfo.address || "",
      phone: resumeInfo.phone || "",
      email: resumeInfo.email || "",
      website: resumeInfo.website || "",
      linkedin: resumeInfo.linkedin || "",
      github: resumeInfo.github || "",
    });
    if (isPersonalDetailComplete(resumeInfo)) {
      enableNext(true);
    }
  }, [resumeInfo?.documentId, params?.resumeid]);

  const handleInputChange = (e) => {
    enableNext(false);
    const {name,value} = e.target;

    setFormData((prev) => ({
        ...(prev || {}),
        [name]:value
    }));

    setResumeInfo((prev) => {
      if (!prev) return prev;
      const next = { ...prev, [name]: value };
      if (name === "linkedin" || name === "github") {
        next.programmingSkills = mergeProgrammingSkillsWithSocial(next, {
          linkedin: next.linkedin,
          github: next.github,
        });
      }
      return next;
    });
  };

  const onSave = (e)=> {
     e.preventDefault();
     setLoading(true);

     const payload = {
        ...formData,
        linkedin: formData?.linkedin?.trim() || "",
        github: formData?.github?.trim() || "",
        programmingSkills: mergeProgrammingSkillsWithSocial(resumeInfo, {
          linkedin: formData?.linkedin,
          github: formData?.github,
        }),
     };

     GlobalApis.UpdateResumeInfo(params?.resumeid, { data: payload })
     .then((res)=>{
         const saved = normalizeResume(res?.data?.data || payload);
         setResumeInfo((prev) => ({
           ...prev,
           ...saved,
           linkedin: payload.linkedin,
           github: payload.github,
           programmingSkills: payload.programmingSkills,
         }));
         enableNext(true);
         setLoading(false);
         toast("Details Updated");
     },()=>{
        setLoading(false);
        toast.error("Failed to save");
     })

  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started with the basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div className="col-span-2">
            <label className="text-sm">LinkedIn (optional)</label>
            <Input
              name="linkedin"
              value={formData?.linkedin ?? resumeInfo?.linkedin ?? ""}
              placeholder="linkedin.com/in/yourprofile"
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm">GitHub (optional)</label>
            <Input
              name="github"
              value={formData?.github ?? resumeInfo?.github ?? ""}
              placeholder="github.com/yourusername"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="text-sm">First Name</label>
            <Input required name="firstName" value={formData?.firstName ?? ""} onChange={handleInputChange} />
          </div>

           <div>
            <label className="text-sm">Last Name</label>
            <Input required name="lastName" value={formData?.lastName ?? ""} onChange={handleInputChange} />
          </div>

           <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input required name="jobTitle" value={formData?.jobTitle ?? ""} onChange={handleInputChange} />
          </div>

          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input required name="address" value={formData?.address ?? ""} onChange={handleInputChange} />
          </div>

          <div>
            <label className="text-sm">Phone</label>
            <Input required name="phone" value={formData?.phone ?? ""} onChange={handleInputChange} />
          </div>

          <div>
            <label className="text-sm">Email</label>
            <Input required name="email" value={formData?.email ?? ""} onChange={handleInputChange} />
          </div>

          {showWebsite && (
            <div className="col-span-2">
              <label className="text-sm">Website (optional)</label>
              <Input
                name="website"
                value={formData?.website ?? ""}
                placeholder="https://yourportfolio.com"
                onChange={handleInputChange}
              />
            </div>
          )}

        </div>
          <div className="mt-3 flex justify-end">
            <Button type="submit"
            disabled={loading}
            >{
            loading?<LoaderCircle className="animate-spin"/>:'save'
            }</Button>
          </div>
      </form>
    </div>
  );
}

export default PersonalDetailForm;
