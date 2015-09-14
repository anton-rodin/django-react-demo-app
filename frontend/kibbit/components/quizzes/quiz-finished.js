var React = require('react');
var Link = require('react-router-component').Link;
var mui = require('material-ui');
var MUITheme = require('../../mixins/MUITheme.js');
var CircularProgress = mui.CircularProgress;
var RaisedButton = mui.RaisedButton;
var FlatButton = mui.FlatButton;
var FontIcon = mui.FontIcon;

var QuizFinished = React.createClass({
  mixins: [MUITheme()],
  render: function () {
    return (
      <div className="QuizFinished">
        <FontIcon className="material-icons" color="#8CD564" style={{fontSize:48}}>thumb_up</FontIcon>
        <div className="QuizFinished-correct"> Correct answers: <b>{this.props.mechanic.correctAnswers}</b></div>
        <div className="QuizFinished-incorrect"> Incorrect answers: <b>{this.props.mechanic.incorrectAnswers}</b></div>
        <div style={{marginTop: 16}}>
          <Link href="/">
            <RaisedButton label="Home page" secondary={true}/>
          </Link>
        </div>
        <div style={{marginTop: 8}}>
          <FlatButton label="Try again" onClick={this.props.tryAgain} secondary={true}/>
        </div>
      </div>
    );
  }
});

module.exports = QuizFinished;
