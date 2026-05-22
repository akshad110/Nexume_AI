import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

function EducationDetails() {
  const [educationList, setEducationList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const handleEvent=(e,index)=>{
     
  }

  const addNewExperience=()=>{

  }

  const removeNewExperience=()=>{

  }

  const onSave=()=>{

  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your Educational details here</p>
      <div>
        {educationList.map((item, index) => (
          <div>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div>
                <label>University Name</label>
                <Input name='universityName' onChange={(e)=>handleEvent}/>
              </div>

               <div>
                <label>Degree</label>
                <Input name='Degree' onChange={(e)=>handleEvent}/>
              </div>

               <div>
                <label>Major</label>
                <Input name='Major' onChange={(e)=>handleEvent}/>
              </div>

               <div>
                <label>Start Date</label>
                <Input name='startDate' onChange={(e)=>handleEvent}/>
              </div>

               <div>
                <label>End Date</label>
                <Input name='endDate' onChange={(e)=>handleEvent}/>
              </div>

               <div>
                <label>University Name</label>
                <Textarea name='universityName' onChange={(e)=>handleEvent}/>
              </div>


            <div className="flex gap-2">
            <Button variant='outline' className='text-primary' onClick={addNewExperience}>+ Add More Education</Button>
             <Button variant='outline' className='text-primary' onClick={removeNewExperience}>Remove</Button>
            <Button type="submit"
            disabled={loading}
            onClick={onSave}
            >{
            loading?<LoaderCircle className="animate-spin"/>:'save'
            }</Button>
        </div>


            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EducationDetails;
