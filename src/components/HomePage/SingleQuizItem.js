import React, { Component } from 'react';
import Card from '../Card';
import { Redirect } from 'react-router-dom';

//TODO : error when the quizGroup is empty 

export default class SingleQuizItem extends Component {
  static defaultProps = {
    quiz: {
      question: "no questions saved yet",
      answers: "no answers saved yet"
    }
  }

  state = {
    quiz: this.props.location.state,
  }

  render = () => {
    const quiz = this.state.quiz;
    console.log(this.props.location.quizGroup);

    return (
      this.state.quiz ? (
        quiz.map((quiz, i) => (
          <div key={i}>
            <Card question={quiz.question} answers={quiz.answers} />
            {/* {quiz.question}
            {quiz.answers} */}
          </div>
        ))
      ) : (
          <div>
            <p>Whoops! Invalid access. Please select a valid quiz</p>
            {/* <Redirect to="/" /> */}
          </div>
        )
    )
  }
}

