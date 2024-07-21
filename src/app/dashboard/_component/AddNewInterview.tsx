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
  
function AddNewInterview() {
    const [openDailog, setOpenDailog] = React.useState(false);
    const[jobPosition,setJobPosition] = React.useState();
    const[jobDescription,setJobDescription] = React.useState();
    const[yearsOfExperience,setYearsOfExperience] = React.useState();
    const onSubmit = (e)=>{
        e.preventDefault();
        console.log(jobPosition,jobDescription,yearsOfExperience);
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
                 onChange={(event)=>setYearsOfExperience(event.target.value)}/>
            </div>
        </div>
       <div className=''>
            <Button type='button' variant = 'ghost' onClick={()=>setOpenDailog(false)}>Cancel</Button>
            <Button type='submit'> Start Interview</Button>
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
