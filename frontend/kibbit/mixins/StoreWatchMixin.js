var React = require('react');
var QuizStore = require('../stores/quiz-store');

var StoreWatchMixin = function(cb, onChange){
  return {
    getInitialState:function(){
      return cb(this)
    },
    componentWillMount:function(){
      QuizStore.addChangeListener(this._onChange)
    },
    componentWillUnmount:function(){
      QuizStore.removeChangeListener(this._onChange)
    },
    _onChange: function(){
      this.setState((onChange || cb)(this));
    }
  }
};

module.exports = StoreWatchMixin;
