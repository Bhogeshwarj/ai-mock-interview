import { Lightbulb, Loader2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface Question {
  question: string;
  answer: string;
}

interface QuestionSectionProps {
  mockInterviewQuestion?: Question[];
  activeQuestionIndex: number;
}

const QuestionSection: React.FC<QuestionSectionProps> = ({ mockInterviewQuestion = [], activeQuestionIndex }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate fetching data with a promise
        await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust the delay as needed

        if (mockInterviewQuestion && mockInterviewQuestion.length > 0) {
          setQuestions(mockInterviewQuestion);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [mockInterviewQuestion]);

  if (isLoading) {
      return <p><Loader2 className='animate-spin'
      /></p>;
  }

  return (
    <div className="p-5 border rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {questions.map((question, index) => (
          <h2
            key={index}
            className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex === index ? 'bg-purple-700 text-white' : ''}`}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>
      {questions.length > 0 && (
        <h2 className="">{questions[activeQuestionIndex]?.question}</h2>
      )}
    <div className='border rounded-sm p-5 bg-purple-100 mt-10'>
        <h2 className='flex flex-col gap-2 items-center text-purple-700'>
            <div className='mr-auto'>
<span className='flex gap-2'><Lightbulb /><strong> Note :</strong></span>
            </div>
            
            <div>
            <p>Click on Record Answer when you want to answer the question . At the end of interview we will give you feedback along with the correct answer for each question and your answer to compare it .</p>
            </div>
        </h2>
        <h2></h2>
    </div>
    </div>
  );
}

export default QuestionSection;
