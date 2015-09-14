var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');

var QuizActions = {
  chooseAnswers: function(answer){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.CHOOSE_ANSWER,
      answer: answer
    })
  },
  nextQuestion: function(){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.NEXT_QUESTION
    })
  },
  resetQuiz: function(){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RESET_QUIZ
    })
  }
};

module.exports = QuizActions;
