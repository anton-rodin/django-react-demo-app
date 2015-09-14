var React = require('react');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');
var QuizActions = require('../../actions/quiz-actions');
var QuizStore = require('../../stores/quiz-store.js');

const CORRECT_CLASS = 'is-correct';
const INCORRECT_CLASS = 'is-incorrect';

var Answer = React.createClass({
  onclick: function () {
    QuizActions.chooseAnswers(this.props.answer)
  },
  render: function () {
    return <div onClick={this.onclick} key={this.props.answer.id}
                className={'Answer '+this.props.answer.className}>{this.props.answer.answer}</div>;
  }
});

function getCurrentQuestion(component) {
  var currentQuiestion = QuizStore.getCurrentQuestion();
  console.log('currentQuiestion', currentQuiestion, component);
  component.setState(currentQuiestion);
  return currentQuiestion;
}

var Question = React.createClass({
  mixins: [StoreWatchMixin(getCurrentQuestion)],
  render: function () {
    var answers = this.state.answers.map((answer, i) => {
      return <Answer answer={answer}/>;
    });

    return (
      <div className="Question">
        <div className="Question-title">{this.state.question}</div>
        <div className="Question-answers">{answers}</div>
      </div>
    )
  }

});

module.exports = Question;
