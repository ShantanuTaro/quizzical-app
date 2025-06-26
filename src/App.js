import './App.css';
import React from 'react';
import he from 'he';

function App() {
  const [quizStarted, setQuizStarted] = React.useState(false);
  const [quizData, setQuizData] = React.useState([]);
  const [selectedAnswers, setSelectedAnswers] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);

  const welcomeElement = ()=> (
    <div className="welcome-screen">
      <h1>Quizzical</h1>
      <p>Test your knowledge with our quiz!</p>
      <button className="start-button" onClick={() => setQuizStarted(true)}>Start Quiz</button>
    </div>
  );

  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  React.useEffect(() => {
    if (quizStarted) {
      fetch('https://opentdb.com/api.php?amount=5')
        .then(response => response.json())
        .then(data => {
          const questionsWithShuffled = data.results.map(q => ({
            ...q,
            shuffledOptions: shuffleArray([...q.incorrect_answers, q.correct_answer])
          }));
          setQuizData(questionsWithShuffled);
          setSelectedAnswers({});
          setSubmitted(false);
        })
        .catch(error => console.error('Error fetching quiz data:', error));
    }
  }, [quizStarted]);

  function handleAnswerClick(questionIndex, answer) { 
    if (!submitted) {
      setSelectedAnswers(prev => ({
        ...prev,
        [questionIndex]: answer
      }));
    }
  }
  
  function handleSubmit() {
    setSubmitted(true);
  }

  function handleNewQuiz() {
    setQuizStarted(false);
    setQuizData([]);
    setSelectedAnswers({});
    setSubmitted(false);
  }

  const quizElement = () => (
    <>
      <div className="quiz-container">
        {quizData.map((question, index) => (
          <div key={index} className="quiz-question">
            <h2>{he.decode(question.question)}</h2>
            <div className="quiz-options">
              {question.shuffledOptions.map((answer, i) => {
                let btnClass = "quiz-option";
                if (submitted) {
                  if (answer === question.correct_answer) {
                    btnClass += " correct";
                  } else if (selectedAnswers[index] === answer) {
                    btnClass += " incorrect";
                  }
                } else if (selectedAnswers[index] === answer) {
                  btnClass += " selected";
                }
                return (
                  <button
                    key={i}
                    className={btnClass}
                    onClick={() => handleAnswerClick(index, answer)}
                    disabled={submitted}
                  >
                    {he.decode(answer)}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="submit-container">
        <button className="submit-button" onClick={handleSubmit} disabled={submitted}>Submit Answers</button>
        {submitted && (
          <button className="submit-button" style={{marginLeft: "16px"}} onClick={handleNewQuiz}>
            New Quiz
          </button>
        )}
      </div>
    </>
  );

  return (
    <main>
      <div className="container">
        {!quizStarted && welcomeElement()}
        {quizStarted && quizElement()}
      </div>
    </main>
  );
}

export default App;
