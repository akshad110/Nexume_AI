import React, { useState } from "react";
import PersonalDetailForm from "./forms/PersonalDetailForm";
import { ArrowRight, LayoutGrid, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SummeryDetails from "./forms/SummeryDetails";
import ExperienceDetails from "./forms/ExperienceDetails";
import EducationDetails from "./forms/EducationDetails";


function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext,setEnableNext]=useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <Button className="flex gap-2" variant="outline">
          {" "}
          <LayoutGrid /> Theme
        </Button>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex-1)}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
          disabled={!enableNext}
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Perosnal Detail*/}
      {activeFormIndex==1?<PersonalDetailForm enableNext={(v)=>setEnableNext(v)} />:null}
      {/* Summery */}
         {activeFormIndex==2?<SummeryDetails enableNext={(v)=>setEnableNext(v)}/>:null}
      {/* Experience */}
           {activeFormIndex==3?<ExperienceDetails enableNext={(v)=>setEnableNext(v)}/>:null}
      {/* Educational Details*/}
         {activeFormIndex==4?<EducationDetails/>:null}
      {/* Skills*/}
    </div>
  );
}4

export default FormSection;
