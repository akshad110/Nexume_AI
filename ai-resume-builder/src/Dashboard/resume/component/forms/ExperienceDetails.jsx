import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeContext";
import { useParams } from "react-router-dom";
import GlobalApis from "../../../../../service/GlobalApis";
import { toast } from "sonner";


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
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    const params = useParams();
  const [experienceList, setExperienceList] = useState([
    
      formField
    
  ]);

const onSave = () => {

  const data = {
    data:{
      experience:experienceList
    }
  }

  GlobalApis.UpdateResumeInfo(
    params.resumeid,
    data
  ).then(res=>{

    toast("Details Updated");

  })

}
  const handleEvent = (index, e) => {
    const newEntries=experienceList.slice();
    const {name,value}=e.target;
    newEntries[index][name]=value;
    setExperienceList(newEntries);
  };
  const addNewExperience=()=>{
    setExperienceList([...experienceList,formField])
  }

  const removeNewExperience=()=>{
    setExperienceList(experienceList=>experienceList.slice(0,-1));
  }
  
  const handleRichTextEditor=(e,name,index)=>{
      const newEntries=experienceList.slice();
      newEntries[index][name]=e;
      setExperienceList(newEntries)
  }

  useEffect(()=>{
     setResumeInfo({
        ...resumeInfo,
        experience:experienceList
     })
  },[experienceList])


  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add your past Job Experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input name="title" onChange={(e) => handleEvent(index, e)} />
                </div>

                <div>
                  <label className="text-xs">Company Name</label>
                  <Input name="companyName" onChange={(e) => handleEvent(index, e)} />
                </div>

                <div>
                  <label className="text-xs">City</label>
                  <Input name="city" onChange={(e) => handleEvent(index, e)} />
                </div>

                <div>
                  <label className="text-xs">State</label>
                  <Input name="state" onChange={(e) => handleEvent(index, e)} />
                </div>

                <div>
                  <label className="text-xs">Start Date</label>
                  <Input type="date" name="startDate" onChange={(e) => handleEvent(index, e)} />
                </div>

                <div>
                  <label className="text-xs">End Date</label>
                  <Input type='date' name="endDate" onChange={(e) => handleEvent(index, e)} />
                </div>

                <div className="col-span-2">
                  <RichTextEditor index={index} onRichTextEditorChange={(e)=>handleRichTextEditor(e,'workSummery',index)}/>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
            <Button variant='outline' className='text-primary' onClick={addNewExperience}>+ Add More Experience</Button>
             <Button variant='outline' className='text-primary' onClick={removeNewExperience}>Remove</Button>
            <Button onClick={onSave}>Save</Button>
        </div>
      </div>
    </div>
  );
}

export default ExperienceDetails;
