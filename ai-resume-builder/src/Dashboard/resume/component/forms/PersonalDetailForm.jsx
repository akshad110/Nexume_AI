import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApis from "../../../../../service/GlobalApis";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner"


function PersonalDetailForm({enableNext}) {


  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData,setFormData]=useState();
  const [loading,setLoading]=useState(false);
  const params = useParams();

  useEffect(()=>{
    console.log(params);
  },[])

  const handleInputChange = (e) => {
    enableNext(false);
    const {name,value} = e.target;

    setFormData({
        ...formData,
        [name]:value
    })
    setResumeInfo({
        ...resumeInfo,
        [name]:value
    })
  };
  const onSave = (e)=> {
     e.preventDefault();
     setLoading(true);
     const data={

        data:formData
     }
     GlobalApis.UpdateResumeInfo(params?.resumeid,data)
     .then(res=>{
         enableNext(true);
         setLoading(false);
         toast("Details Updated");
     },(error)=>{
        setLoading(false);
     })

  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started with the basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input required name="firstName" defaultValue={resumeInfo?.firstName} onChange={handleInputChange} />
          </div>

           <div>
            <label className="text-sm">Last Name</label>
            <Input required name="lastName" defaultValue={resumeInfo?.lastName}  onChange={handleInputChange} />
          </div>

           <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input required name="jobTitle"  defaultValue={resumeInfo?.jobTitle} onChange={handleInputChange} />
          </div>

          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input required name="address" defaultValue={resumeInfo?.address} onChange={handleInputChange} />
          </div>

          <div>
            <label className="text-sm">Phone</label>
            <Input required name="phone" defaultValue={resumeInfo?.phone} onChange={handleInputChange} />
          </div>

          <div>
            <label className="text-sm">Email</label>
            <Input required name="email" defaultValue={resumeInfo?.email}  onChange={handleInputChange} />
          </div>

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
