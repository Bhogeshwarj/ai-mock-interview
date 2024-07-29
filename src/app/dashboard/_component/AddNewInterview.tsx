'use client'
import React from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModelApi';
import { LoaderCircle } from 'lucide-react';
import { MockInterview } from '@/utils/schema';
import { db } from '@/utils/db';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
    const [jobPosition, setJobPosition] = React.useState('');
    const [jobDescription, setJobDescription] = React.useState('');
    const [jobExperience, setJobExperience] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [jsonResponse, setJsonResponse] = React.useState([]);
    const { user } = useUser();
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDescription}, years of experience: ${jobExperience}. Give me ${process.env.NEXT_PUBLIC_INTERVIEW_QCOUNT} interview questions along with answers in JSON format. Provide the question and answer fields in JSON without extra information. Everything should be in JSON.`;

        try {
            const result = await chatSession.sendMessage(InputPrompt);
            const mockJsonResp = (await result.response.text()).replace('```json', '').replace('```', '');

            setJsonResponse(mockJsonResp);

            if (mockJsonResp) {
                const resp = await db.insert(MockInterview).values({
                    mockId: uuidv4(),
                    jsonMockResp: mockJsonResp,
                    jobPosition: jobPosition,
                    jobDescription: jobDescription,
                    jobExperience: jobExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD-MM-yyyy')
                }).returning({ mockId: MockInterview.mockId });

                if (resp) {
                    router.push('/dashboard/interview/' + resp[0]?.mockId);
                }
            } else {
                console.error("Error: No response received.");
            }
        } catch (error) {
            console.error("Error during submission:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" flex items-center justify-center   my-10">
            <div className="bg-gray-100  p-8 rounded-lg shadow-lg ">
            <h2 className='font-bold text-2xl'>Create and start your AI mock up interview .</h2>
                <h2 className="text-l font-bold text-gray-700 mb-6 ">Add New Interview</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Job Role/Job Position</label>
                        <Input
                            placeholder="Ex. Full stack developer"
                            required
                            value={jobPosition}
                            onChange={(event) => setJobPosition(event.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Job Description / Tech Stack (In Short)</label>
                        <Textarea
                            placeholder="Ex. React, C++, Svelte"
                            value={jobDescription}
                            onChange={(event) => setJobDescription(event.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Years of Experience</label>
                        <Input
                            placeholder="Ex. 5"
                            type="number"
                            value={jobExperience}
                            onChange={(event) => setJobExperience(event.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-6">
                        {/* <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button> */}
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <LoaderCircle className="animate-spin mr-2" /> Generating from AI
                                </>
                            ) : 'Start Interview'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddNewInterview;