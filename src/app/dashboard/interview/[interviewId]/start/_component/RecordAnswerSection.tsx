import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useToast } from "@/components/ui/use-toast"
import { chatSession } from '@/utils/GeminiAIModelApi';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';


function RecordAnswerSection({mockInterviewQuestion=[],activeQuestionIndex,interviewData}) {
    const { toast } = useToast()
    const [userAnswer,setUserAnswer] = React.useState('');
    const [loading,setLoading] = React.useState(false);
    const {user} = useUser();


    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
      useEffect(()=>{
        results.map((result)=>(
            setUserAnswer(prevAns=>result?.transcript)
        ))
      },[results])
    
      if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

      useEffect(()=>{
        if(!isRecording && userAnswer?.length>10){

            updateUserAnswer();
        }
      //   if(userAnswer?.length<10){
      //     setLoading(false);
      //     toast({
      //         description: "Error recording . Please Try again ...",
      //       })
      //       return;
      // }
      },[userAnswer])

      const startStopRecording = async () => {
        if (isRecording) {
            stopSpeechToText();

        } else {
            startSpeechToText();
        }
    };
    const updateUserAnswer = async ()=>{
      setLoading(true)
      const feedbackPrompt = "Queston : "+mockInterviewQuestion[activeQuestionIndex] + 
      "User Answer: " +userAnswer + ",Depends on question and user Answer for given interview question . Please give us rating for answer and feedback as area of improvement if any , in just 3 to 5 lines to imporve it in JSON format only with rating and feedback field . I want the whole response in JSON format only nothing extraa . "

      const result = await chatSession.sendMessage(feedbackPrompt);


      const mockJsonResp = (result.response.text()).replace('```json','').replace('```','');
      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      const resp = await db.insert(UserAnswer)
      .values({
          mockIdRef:interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns:userAnswer,
          feedback:JsonFeedbackResp?.feedback,
          rating:JsonFeedbackResp?.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt:moment().format('DD-MM-yyyy')
      })
      
      if(resp){
          toast({
              description: "Answer Recorded Successfully",
            })
            setResults([]);
      }
      setResults([]);
      setUserAnswer('');
      setLoading(false);

    }
    
  return (
    <div className='flex flex-col justify-center items-center my-20 bg-secondary round-lg p-5'>
      <Image src={'/icons8-webcam-64.png'} width={200} height={200} alt='Webcam' className='absolute'/>
      <Webcam
      mirrored={true}
      style={{
height:300,
width:'100%',
zIndex:10,
} }
      />
    <div>
      {/* <h1>Recording: {isRecording.toString()}</h1>
      <Button variant="outline" onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Button>
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul> */}

            <Button variant="outline" className='my-10'
            disabled={loading} 
            onClick={startStopRecording}>
                {isRecording?
            <h2 className='flex items-center justify-center gap-2 text-red-600'>
                < Mic/> Recording...
            </h2> 
            :'Record'   
            }
            </Button>
        {/* <Button onClick={()=>console.log(userAnswer)}>Show User Answer</Button> */}
    </div>

</div>
    
  )
}

export default RecordAnswerSection
