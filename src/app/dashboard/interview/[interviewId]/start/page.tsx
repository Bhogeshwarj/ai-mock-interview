"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import QuestionSection from './_component/QuestionSection';
import RecordAnswerSection from './_component/RecordAnswerSection';
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

const StartInterview: React.FC<InterviewProps> = ({ params }) => {
  const [interviewData, setInterviewData] = useState<InterviewData | null>(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState<any>(null);
const [activeQuestionIndex,setActiveQuestionIndex] = useState<any>(0);
  useEffect(() => {
    // console.log(params.interviewId);
    getInterviewDetails();
  }, [params.interviewId]);

  // Function to get Interview details by MockId
  const getInterviewDetails = async () => {
    try {
      const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (result.length > 0) {
        const interview = result[0];
        // console.log('Interview result:', interview);

        // Sanitize and parse the JSON response
        try {
          const cleanedJsonMockResp = interview.jsonMockResp.replace(/[\n\r]/g, '').trim();
          const jsonMockResp = JSON.parse(cleanedJsonMockResp);
          setMockInterviewQuestion(jsonMockResp);

        } catch (parseError) {
          console.error('Error parsing JSON response:', parseError);
          console.error('Invalid JSON:', interview.jsonMockResp);
        }

        setInterviewData({
          mockId: interview.mockId,
          jobPosition: interview.jobPosition,
          jobDescription: interview.jobDescription,
          jobExperience: interview.jobExperience || '', // Handle missing or undefined jobExperience
        });
      } else {
        console.error('No interview found for the given ID.');
      }
    } catch (error) {
      console.error('Error fetching interview details:', error);
    }
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
      {/* <h1>Start Interview</h1>
      {interviewData && (
        <div>
          <h2>Job Position: {interviewData.jobPosition}</h2>
          <p>Description: {interviewData.jobDescription}</p>
          <p>Experience Required: {interviewData.jobExperience}</p>
        </div>
      )}
      {mockInterviewQuestion && (
        <div>
          <h2>Mock Interview Questions:</h2>
          {mockInterviewQuestion.map((qa: { question: string; answer: string }, index: number) => (
            <div key={index}>
              <h3>Question: {qa.question}</h3>
              <p>Answer: {qa.answer}</p>
            </div>
          ))}
        </div>
      )} */}
      {/* Questions  */}
      <div>
        <QuestionSection mockInterviewQuestion = {mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}/>

      </div>
      {/* Video/audio recording  */}
      <RecordAnswerSection  mockInterviewQuestion = {mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        interviewData={interviewData}
        />
      <div className='flex justify-end gap-4'>
      {activeQuestionIndex >0 &&   
      <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)} >Previous Question</Button>}
        <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>
        {/* {activeQuestionIndex==mockInterviewQuestion?.length-1 && 
        <Button>End Interview</Button>} */}
        <Link href={'/dashboard/interview/' + interviewData?.mockId+"/feedback"}>
        <Button>End Interview</Button>
        </Link>
      </div>
    </div>
  );
};

export default StartInterview;
