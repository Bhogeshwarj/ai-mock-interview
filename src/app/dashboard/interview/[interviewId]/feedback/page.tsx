"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'



function Page({params}) {

  const [feedbackList,setFeedbackList] = useState([]);
  const router = useRouter();
  useEffect(()=>{
    getFeedback();
  },[]);
  const getFeedback = async () =>{
    const result = await db.select()
    .from(UserAnswer)
    .where(eq(UserAnswer.mockIdRef,params.interviewId))
    .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);
  }
  return (
    <div className = 'p-10'>
    
    {feedbackList?.length==0 ?
  <h2 className='font-bold text-xl text-gray-500'>No interview feedback record found .</h2>  
  :
  <>
    <h2 className='text-3xl font-bold text-green-600'>
        Congratulations
      </h2>
      <h2 className='font-bold text-1xl'>Here is your feedback :</h2>
      <h2 className='text-primary text-lg my-4'>Your overall rating : 7/10</h2>
      <h2 className='text-sm text-gray-500'>Find below the answer of questions and the feedback for your answer : </h2>

      {feedbackList && feedbackList.map((item,index) => (
        <Collapsible key = {index} className='mt-7'>
        <CollapsibleTrigger className='p-2 bg-secondary rounded-lg
         my-2 text-left flex justify-between gap-10 w-full'>
        {item.question} <ChevronsUpDownIcon  className='h-5 w-5'/>
        </CollapsibleTrigger>
        <CollapsibleContent>
            <div className='flex flex-col gap-2 '>
              <h2 className='text-red-500 p-2 border rounded-lg'>
                <strong>Rating: {item.rating}</strong></h2>
                <h2 className='p-2 border rounded-lg bg-red-100 text-sm text-red-700'><strong> Your Answer : </strong>{item.userAns}</h2>
                <h2 className='p-2 border rounded-lg bg-green-100 text-sm text-green-700' ><strong> Correct Answer : </strong>{item.correctAns}</h2>
                <h2 className='p-2 border rounded-lg bg-blue-100 text-sm text-blue-700' ><strong> Feedback : </strong>{item.feedback}</h2>
            </div>
        </CollapsibleContent>
      </Collapsible>
      
      ))}
</>
  }
      <Button className='mt-5' onClick={()=>router.replace('/dashboard')}> Go Home</Button>
    </div>
  )
}

export default Page
