import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';

function RecordAnswerSection() {
    const [userAnswer,setUserAnswer] = React.useState('');
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
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
            onClick={isRecording?
            stopSpeechToText
            :startSpeechToText}>
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
