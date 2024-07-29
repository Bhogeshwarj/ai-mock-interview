import InterviewList from "../_component/InterviewList"

function page() {
  return (
    <div>
        <div className ='p-10 bg-gray-100   rounded-lg shadow-lg w-full my-10 '>
        <h2 className='font-bold text-2xl'>My Previous Interviews</h2>
        <h2 className='text-gray-500'>See the result and feedacks of your interviews.</h2>
    <InterviewList/>
    </div>

    </div>
  )
}

export default page
