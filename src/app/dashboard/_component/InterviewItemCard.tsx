import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import React from 'react'

function InterviewItemCard({interview}) {

    const router = useRouter();

    const onStart=()=>{
        router.push(`/dashboard/interview/${interview?.mockId}/start`)
    }
    const onFeedback=()=>{
        router.push(`/dashboard/interview/${interview?.mockId}/feedback`)
    }

  return (
    <div className='border shadow-sm rounded-lg p-3 '>
        <h2 className='font-bold text-primary '>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-400'>{interview?.jobExperience} Years pf Experience</h2>
        <h2 className='text-sm text-gray-400'>Created At: {interview.createdAt}</h2>
        <div className='flex justify-between mt-2 gap-5 '>
            <Button className='w-full'onClick={onFeedback}  variant='outline'>Feedback</Button>
            <Button className='w-full' onClick={onStart} >Start</Button>
        </div>
    </div>

  )
}

export default InterviewItemCard
