var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var QuizzesResource = require('./quizzes-resource');
var _ = require('lodash');

const CHANGE_EVENT = 'change';
const CORRECT_CLASS = 'is-correct';
const INCORRECT_CLASS = 'is-incorrect';

var _data = {};

function _removeItem(index) {
  _cartItems[index].inCart = false;
  _cartItems.splice(index, 1);
}

function _increaseItem(index) {
  _cartItems[index].qty++;
}

function _decreaseItem(index) {
  if (_cartItems[index].qty > 1) {
    _cartItems[index].qty--;
  }
  else {
    _removeItem(index);
  }
}

function _addItem(item) {
  if (!item.inCart) {
    item['qty'] = 1;
    item['inCart'] = true;
    _cartItems.push(item);
  }
  else {
    _cartItems.forEach(function (cartItem, i) {
      if (cartItem.id === item.id) {
        _increaseItem(i);
      }
    });
  }
}

function _cartTotals() {
  var qty = 0, total = 0;
  _cartItems.forEach(function (cartItem) {
    qty += cartItem.qty;
    total += cartItem.qty * cartItem.cost;
  });
  return {'qty': qty, 'total': total};
}

function _nextQuestion() {
  if (_data.questions.length) {

  _data.currentQuestion = _data.questions.shift();
  _data.currentQuestion.answers = _.shuffle(_data.currentQuestion.answers);

  } else {
    _data.currentQuestion = null;
    _data.finished = true;
  }
  _data.answered = false;

}
function _setQuiz(quiz) {
  _data.quiz = quiz;
  _data.finished = false;
  _data.answered = false;
  _data.correctAnswers = 0;
  _data.incorrectAnswers = 0;
  _data.questions = _.cloneDeep(quiz.questions);
  _nextQuestion();

}
function _resetQuiz() {
  _setQuiz(_data.quiz);

}
function _chooseAnswer(_answer) {
  if (!_data.answered) {
    var answer = _.find(_data.currentQuestion.answers, {answer: _answer.answer});
    _data.answered = true;
    if (answer.is_correct) {
      _data.correctAnswers++;
      answer.className = CORRECT_CLASS;
    } else {
      _data.incorrectAnswers++;
      answer.className = INCORRECT_CLASS;
      _data.currentQuestion.answers.forEach(item => {
        if (item.is_correct) {
          item.className = CORRECT_CLASS;
        }
      });
    }
  }
}

var QuizStore = assign(EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT)
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  setQuiz: function (quiz) {
    _setQuiz(quiz);
  },
  getQuizState: function () {
    return _data;
  },
  getCurrentQuestion: function () {
    return _data.currentQuestion;
  },
  getAnswerByText: function (text) {
    return {
      answer: _.find(_data.currentQuestion.answers, {answer: text})
    };
  },

  dispatcherIndex: AppDispatcher.register(function (payload) {
    var action = payload.action; // this is our action from handleViewAction
    switch (action.actionType) {
      case AppConstants.CHOOSE_ANSWER:
        _chooseAnswer(action.answer);
        break;

      case AppConstants.NEXT_QUESTION:
        _nextQuestion();
        break;

      case AppConstants.RESET_QUIZ:
        _resetQuiz();
        break;
    }

    QuizStore.emitChange();
    return true;
  })

});

module.exports = QuizStore;
