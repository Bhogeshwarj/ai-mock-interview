'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModelApi';
import { LoaderCircle } from 'lucide-react';
import { MockInterview } from '@/utils/schema';
import { db } from '@/utils/db';
import {v4 as uuidv4} from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';
  
function AddNewInterview() {
    const [openDailog, setOpenDailog] = React.useState(false);
    const[jobPosition,setJobPosition] = React.useState();
    const[jobDescription,setJobDescription] = React.useState();
    const[jobExperience,setjobExperience] = React.useState();
    const[loading,setLoading] = React.useState(false);
    const [jsonResponse, setJsonResponse] = React.useState([]);
    const {user} = useUser();
    const router = useRouter();

    const onSubmit = async (e)=>{
      setLoading(true);
        e.preventDefault();
        console.log(jobPosition,jobDescription,jobExperience);

        const InputPrompt = "Job Poistion: "+ jobPosition  +", Job Description : "+ jobDescription + ", years of experience : " +jobExperience + " give me "+ process.env.NEXT_PUBLIC_INTERVIEW_QCOUNT+" interview question alang with answer in Json format . Give the question and answer field on JSON" 

        const result = await chatSession.sendMessage(InputPrompt);

        const mockJsonResp = (result.response.text()).replace('```json','').replace('```','');

        console.log(mockJsonResp);

        setJsonResponse(mockJsonResp);
      
        if(mockJsonResp)
        {

          const resp = await db.insert(MockInterview)
          .values({
            mockId:uuidv4(),
            jsonMockResp:mockJsonResp,
            jobPosition:jobPosition,
            jobDescription:jobDescription,
            jobExperience:jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-yyyy')
            
          }).returning({mockId:MockInterview.mockId});
          
          console.log("Inserted Id", resp)
          if(resp)
          {
            setOpenDailog(false);
            router.push('/dashboard/interview/' + resp[0]?.mockId);
          }

        }
        else{
          console.log("Error ");
        }
          setLoading(false);
    };
  return (
    <div>
        <div className='m-5 p-12 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={()=>setOpenDailog(true)}>
            <h2 className='font-bold text-lg text-center'>+ Add new</h2>
        </div>
    <Dialog open={openDailog}>
  <DialogContent className = 'max-w-2xl'>
    <DialogHeader>
      <DialogTitle className='text-2xl'>       Tell us more about your interviewing </DialogTitle>
      <DialogDescription>
        <form onSubmit={onSubmit}>
        <div>
            <h2>
                Add details about your job position/role , Job description ?
            </h2>
            <div className='mt-4 my-3'>
                <label>Job Role/Job Position</label>
                <Input placeholder='Ex. Full stack developer' required
                 onChange={(event)=>setJobPosition(event.target.value)}/>
            </div>
            <div className='my-3'>
                <label>Job Description / Tech Stack(In Short)</label>
                <Textarea placeholder='Ex. React, C++ , Svelte' 
                 onChange={(event)=>setJobDescription(event.target.value)}/>
            </div>
            <div className='my-3'>
                <label>Years of experience</label>
                <Input placeholder='Ex. 5 ' type="number" 
                 onChange={(event)=>setjobExperience(event.target.value)}/>
            </div>
        </div>
       <div className=''>
            <Button type='button' variant = 'ghost' onClick={()=>setOpenDailog(false)}>Cancel</Button>
            <Button type='submit' disabled={loading}>
               {loading ?<>
                <LoaderCircle className='animate-spin'/>Generating from AI
               </> : 'Start Interview'
               }
              </Button>
        </div>
        </form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddNewInterview
