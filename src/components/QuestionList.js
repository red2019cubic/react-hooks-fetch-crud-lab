
import QuestionItem from "./QuestionItem";


function QuestionList({mydata, delQuestion, updatedQuestion}) {
 
  const dispData = mydata.map((val)=>{
    return <QuestionItem question ={val} delQuestion={delQuestion} updatedQuestion={updatedQuestion}/>
  })
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {dispData}
      </ul>
    </section>
  );
}

export default QuestionList;