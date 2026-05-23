import { Button } from '@/components/ui/button'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { ResumeInfoContext } from '@/context/ResumeContext'
import { useParams } from 'react-router-dom';
import GlobalApis from "../../../../../service/GlobalApis";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from 'sonner';
import { generateAIContent } from '../../../../../service/AIModal';


const prompt =
  'Job title: {jobTitle}. Return a JSON array of exactly 3 objects for resume summaries (Fresher, Mid-Level, Experienced). Each object: {"experienceLevel":"Fresher","summary":"4-5 lines of text"}. Valid JSON only, no markdown.';
function SummeryDetails({enableNext}) {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const [summery,setSummery]=useState();
    const [loading,setLoading]=useState(false);
    const [aiGeneratedSummary,setAiGeneratedSummary]=useState([]);
    const params=useParams();
    const initializedFor = useRef(null);

    useEffect(() => {
        const id = resumeInfo?.documentId;
        if (!id || initializedFor.current === id) return;
        initializedFor.current = id;
        if (resumeInfo?.summery) {
            setSummery(resumeInfo.summery);
            enableNext(true);
        }
    }, [resumeInfo?.documentId]);

    const GenerateSummeryFromAI = async () => {
      const jobTitle = (resumeInfo?.jobTitle ?? "").trim();
      if (!jobTitle) {
        toast.error("Please add a Job Title on the Personal Details step first.");
        return;
      }
      if (!import.meta.env.VITE_GOOGLE_AI_API_KEY) {
        toast.error(
          "Google AI key is missing. Add VITE_GOOGLE_AI_API_KEY in .env.local or Render.",
        );
        return;
      }

      setLoading(true);
      try {
        const PROMPT = prompt.replace("{jobTitle}", jobTitle);
        const parsed = await generateAIContent(PROMPT);
        const list = Array.isArray(parsed) ? parsed : parsed?.suggestions ?? [parsed];
        setAiGeneratedSummary(list.filter(Boolean));
      } catch (err) {
        console.error("Generate summary AI error:", err);
        toast.error(err?.message || "Failed to generate summary.");
      } finally {
        setLoading(false);
      }
    };

    const onSave = (e)=>{
        e.preventDefault();
         setLoading(true);
     const data={

        data:{
            summery:summery
        }
     }
     GlobalApis.UpdateResumeInfo(params?.resumeid,data)
     .then(res=>{
         enableNext(true);
         setLoading(false);
         toast("Details Updated");
     },(error)=>{
        setLoading(false);
     })

    }

  return (
    <div>
       <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Summery</h2>
      <p>Add Your Summery for the job role</p>

      <form className='mt-7' onSubmit={onSave}>
        <div className='flex items-end justify-between'>
            <label>Add Summery</label>
            <Button variant='outline' type='button' size='sm' className="border-primary text-primary flex gap-2"
            onClick={()=>GenerateSummeryFromAI()}
            ><Brain className='h-4 w-4'/> Generate With AI</Button>
        </div>
        <Textarea
        className='mt-5'
        required
        value={summery ?? ""}
        onChange={(e) => {
          const value = e.target.value
          setSummery(value)
          setResumeInfo((prev) => ({ ...prev, summery: value }))
        }}
        />
      <div className='mt-2 flex justify-end'>
         <Button type="submit"
            disabled={loading}
            >{
            loading?<LoaderCircle className="animate-spin"/>:'save'
            }</Button>
      </div>
      </form>

      </div>



{
    aiGeneratedSummary&&
    <div>
    <h2 className='font-bold text-lg'>Suggestions</h2>
    {aiGeneratedSummary.map((item,index)=>(
    <div key={index}>
        <h2 className='font-bold my-1'>
          Level: {item?.experienceLevel}
        </h2>

        <p>{item?.summary}</p>
    </div>
))}
    </div>
}

    </div>
  )
}

export default SummeryDetails
