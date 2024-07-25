"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface InterviewProps {
  params: {
    interviewId: string;
  };
}

interface InterviewData {
  jobPosition: string;
  jobDescription: string;
  jobExperience: string;
}

const Interview: React.FC<InterviewProps> = ({ params }) => {
  const [interviewData, setInterviewData] = useState<InterviewData | null>(null);
  const [webcamEnable, setWebcamEnable] = useState<boolean>(false);

  useEffect(() => {
    console.log(params.interviewId);
    getInterviewDetails();
  }, [params.interviewId]);

  // Used to get Interview detail by MockId
  const getInterviewDetails = async () => {
    const result = await db.select().from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    console.log(result);
    setInterviewData(result[0] as InterviewData); // Type assertion
  };

  return (
    <div className='my-10 flex justify-center flex-col items-center'>
      <h2 className='font-bold text-2xl'>Lets get Started</h2>
      <div className=' my-5 grid grid-cols-1 md:grid-cols-2 gap-5'>
      <div>
        {interviewData && (
          <div className='flex flex-col my-5 gap-5'>

          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg"><strong>Job Role/Job Position: </strong>{interviewData.jobPosition}</h2>
            <h2 className="text-lg"><strong>Job Description: </strong>{interviewData.jobDescription}</h2>
            <h2 className="text-lg"><strong>Years of Experience: </strong>{interviewData.jobExperience}</h2>
          </div>
          <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-50'>
            <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb/><strong>Information</strong></h2>
            <h3>Enable Video Web Cam and Microphone to Start your Al Generated Mock Interview, It Has 5 question which you can answer and at the last you will get the report on the basis of your answer. NOTE: We never record your video, Web cam access you can disable at any time if you want</h3>
          </div>
          </div>

        )}
      </div>
      <div>
        {webcamEnable ? (
          <Webcam
            onUserMedia={() => setWebcamEnable(true)}
            onUserMediaError={() => setWebcamEnable(false)}
            mirrored={true}
            style={{
              height: 300,
              width: 300
            }}
          />
        ) : (
          <>
            <WebcamIcon className='h-72 my-6 p-20 w-full bg-secondary rounded-lg border' />
            <Button variant="ghost" className='w-full' onClick={() => setWebcamEnable(true)}>Enable webcam and microphone</Button>
          </>
        )}
      </div>
      </div>
      <div>
        <Link href={params.interviewId+'/start'}>
        <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;