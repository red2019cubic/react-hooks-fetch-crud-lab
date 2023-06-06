import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [data, setData] = useState([
    {
      id: 1,
      prompt:
        "What special prop should always be included for lists of elements?",
      answers: ["id", "name", "key", "prop"],
      correctIndex: 2,
    },
  ]);

  useEffect(() => {
  
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())

      .then((resData) => setData(resData));
  }, []);

  function addQuestion(newQuestion) {
    const config = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    };

    fetch("http://localhost:4000/questions", config)
      .then((response) => response.json())
      .then((newQuestion) => {
        const newQuestions = [...data, newQuestion];
        setData(newQuestions);
      });
  }

  function deleteQuestion(questionID) {
    const config = {
      method: "DELETE",
    };
    fetch(`http://localhost:4000/questions/${questionID}`, config)
      .then((response) => response.json())
      .then(() => {
        const newList = data.filter((filData) => filData.id !== questionID);
        setData(newList);
      });
  }


  function updateQuestion(questionID, updateQuestion) {
    console.log("UPDATE " + updateQuestion + " " + questionID);

    fetch(`http://localhost:4000/questions/${questionID}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: { correctIndex: updateQuestion },
    })
      .then((response) => response.json())
      .then((updateQuestion) => {
        const updateQuestionsList = data.map((data) => {
          if (data.id === questionID) return updateQuestion;
          return data;
        });

        setData(updateQuestionsList);
      });
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm addQuestion={addQuestion} />
      ) : (
        <QuestionList
          mydata={data}
          delQuestion={deleteQuestion}
          updatedQuestion={updateQuestion}
        />
      )}
    </main>
  );
}

export default App;
