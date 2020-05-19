import React from 'react';
import './index.css';

// User can finish and save their quiz to the homescreen

class MakerSpace extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      missingQuestion: false,
      missingAnswer: false,
      errorMessage: '',
    }
  } 

  // Error handlers for Form
  addCardHandler = (event) => {
    event.preventDefault();

    // Reset the error messages
    this.setState({
      missingQuestion: false,
      missingAnswer: false,
      errorMessage: '',
    });


    // Check for correct number of answers and correct choice
    let numCorrect = 0;
    let numGiven = 0;
    let answers = this.props.answers;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i][0]) {
        numGiven++;
      }
      if (answers[i][1] && answers[i][0]) {
        numCorrect++;
      }
    }

    if (this.props.question === '') {
      this.setState({
        missingQuestion: true,
        errorMessage: 'You must enter a question'
      });
      return;
    } else if (numGiven < 2) {
      this.setState({
        missingAnswer: true,
        errorMessage: 'You must give at least 2 answer choices'
      });
      return;
    } else if (numCorrect < 1) {
      this.setState({
        missingAnswer: true,
        errorMessage: 'You must have at least 1 correct answer option'
      });
      return;
    } 

    // Either submit the quiz or add another card
    if (event.target.value === 'add') {
      this.props.addCard(event);
    } else {
      this.props.submitQuiz(event);
    }
  }

  deleteCardHandler = (event) => {
    event.preventDefault();

    // Reset the error messages
    this.setState({
      missingQuestion: false,
      missingAnswer: false,
      errorMessage: '',
    });
    this.props.deleteCard(event);
  }

  render() {
    let answerChoices = [];
    for (let i = 0; i < 4; i++) {
      answerChoices.push(<AnswerChoice 
                          answer={this.props.answers[i][0]} 
                          handleInput={this.props.handleInput} 
                          handleCorrect={this.props.handleCorrect} 
                          missingAnswer={this.state.missingAnswer} 
                          key={i} index={i}  />);
    }

    return (
      <div className="maker-cover">
        <h3>Maker Space</h3>
        <form>
            <label>
              Question
                <input
                  className={`text-input${this.state.missingQuestion ? ' error-notif': ''}`}
                  name='question'
                  type='text'
                  value={this.props.question}
                  onChange={this.props.handleInput} 
                />
            </label>
            {answerChoices}
            <button value='add' onClick={this.addCardHandler}>Add Question</button>
            <button value='delete' onClick={this.deleteCardHandler}>Delete Question</button>
            <button value='submit' onClick={this.addCardHandler}>Submit Quiz</button>
          </form>
          <p>Question #{this.props.numCards + 1}</p>
          <p className='error-message'>{this.state.errorMessage}</p>
      </div>
    )
  }
}

// Groups similar Answer Fields together
function AnswerChoice(props) {
    let inputName = 'ans' + props.index;
    return (
      <label className="answer-choice">
        Answer #{props.index + 1}
          <input name={inputName} type="checkbox" value="true" onClick={props.handleCorrect} />
          <input  className={`text-input${props.missingAnswer ? ' error-notif': ''}`}
                  name={inputName} 
                  type='text' 
                  value={props.answer} 
                  onChange={props.handleInput} 
          />
      </label>
    );
}

export default MakerSpace;