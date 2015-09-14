var React = require('react');
var Question = require('./question');
var QuizFinished = require('./quiz-finished');
var QuizStore = require('../../stores/quiz-store.js');
var QuizActions = require('../../actions/quiz-actions');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');
var mui = require('material-ui');
var MUITheme = require('../../mixins/MUITheme.js');
var CircularProgress = mui.CircularProgress;
var RaisedButton = mui.RaisedButton;
var QuizzesResource = require('../../stores/quizzes-resource');

function getCatalogItem(component) {
  QuizzesResource.find(component.props.id).then(quiz => {
    QuizStore.setQuiz(quiz);
    component.setState({
      mechanic: QuizStore.getQuizState(),
      loading: false
    })
  });
  return {
    loading: true,
    mechanic: {}
  }
}
function getQuizState() {
  var newM = QuizStore.getQuizState();
  console.log(newM);
  return {
    mechanic: newM
  };
}

var QuizzingPage = React.createClass({
  mixins: [StoreWatchMixin(getCatalogItem, getQuizState), MUITheme()],
  nextQuestion: () => {
    QuizActions.nextQuestion();
  },
  tryAgain: () => {
    QuizActions.resetQuiz();
  },
  render: function () {

    var loaderStyles = {
      margin: '10px auto',
      display: 'block'
    };

    return (
      <div className="QuizzingPage">
        { this.state.loading ? <CircularProgress mode="indeterminate" style={loaderStyles}/> : this.state.mechanic.finished ?
          '' : <Question question={this.state.currentQuestion}/> }
        { this.state.mechanic.answered ? <RaisedButton style={{marginTop: 16}} label="Next question" onClick={this.nextQuestion} secondary={true} /> : ''}
        { this.state.mechanic.finished ? <QuizFinished mechanic={this.state.mechanic} tryAgain={this.tryAgain}/> : ''}
      </div>
    );
  }
});

module.exports = QuizzingPage;
