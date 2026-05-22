import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { v4 as uuidv4 } from "uuid";
import GlobalApis from '../../../service/GlobalApis'
import { useUser } from '@clerk/react'
import { useNavigate } from 'react-router-dom'



function AddResume() {
   const [openDialog,setOpenDialog] = useState(false)
   const [resumeTitle,setResumeTitle] = useState("");
   const [loading,setLoading]=useState(false);
   const {user} = useUser();
   const navigation = useNavigate();

   const onCreate = () => {
    setLoading(true);
    const uuid = uuidv4();
    const data={
        data:{
            title:resumeTitle,
            resumeid:uuid,
            userEmail:user?.primaryEmailAddress?.emailAddress,
            userName:user?.fullName
        }
    }

       GlobalApis.CreateNewResume(data).then(res => {
        console.log(res.data.data.documentId);
        if(res){
            setLoading(false);
            navigation('/dashboard/resume/'+res.data.data.documentId+'/edit')
        }
       },(error)=>{
        setLoading(false);
       })
   }
  return (
    <div>
      <div className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg
      h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed'
      onClick={() => setOpenDialog(true)}
      >
        <PlusSquare/>
      </div>

      <Dialog open={openDialog}>

  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New Resume</DialogTitle>
      <DialogDescription>
         Add title for your New Resume
        <Input className="mt-2" placeholder="Ex.Full Stack Developer Resume"
        onChange={(e)=> setResumeTitle(e.target.value)}
        
        />
      </DialogDescription>
      <div className='flex justify-end gap-5'>
        <Button onClick={()=> setOpenDialog(false)} variant='ghost'>Cancel</Button>
        <Button 
        disabled={!resumeTitle || loading}
        onClick={()=> onCreate()}>
        {
            loading?
            <Loader2 className='animate-spin'/>:'create'
        }
        </Button>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddResume
