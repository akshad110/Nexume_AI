import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import GlobalApis from '../../service/GlobalApis'
import { useUser } from '@clerk/react'
import ResumeItem from './components/ResumeItem';

function Dashboard() {

  const {user} = useUser();
  const [resumeList,setResumeList] = useState([]);
  useEffect(()=>{
   user&&GetUserResumesList()
  },[user])
   const GetUserResumesList=()=>{
    GlobalApis.GetUserResume(user?.primaryEmailAddress?.emailAddress)
    .then(res=>{
      setResumeList(res.data.data);
    })
   }


  return (
    <div className='p-10 md:px-20 lg:px-32'>
     <h2 className='font-bold text-2xl'>My Resume</h2>
     <p>Start Creating AI resume to your next Job role</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
         <AddResume/>
         {
          resumeList.length>0&&resumeList.map((resume,index)=>{
            return <ResumeItem resume={resume} key={index} refreshData={GetUserResumesList}/>
          })
         }
      </div>
    </div>
  )
}

export default Dashboard
