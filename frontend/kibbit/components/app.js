var React = require('react');
var QuizzesList = require('./quizzes/quizzes-list');
var Router = require('react-router-component');
var QuizPage = require('./quizzes/quiz-page');
var QuizzingPage = require('./quizzes/quizzing-page');
var Layout = require('./layout.js');
var Locations = Router.Locations;
var Location  = Router.Location;
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

ThemeManager.setTheme(ThemeManager.types.LIGHT);

var App = React.createClass({
  mixins: [],
  render:function(){
    return (
      <Layout>
        <Locations>
          <Location path="/" handler={QuizzesList} />
          <Location path="/quiz/:id" handler={QuizPage} />
          <Location path="/quiz/:id/quizzing" handler={QuizzingPage} />
        </Locations>
      </Layout>
    );
  }
});

module.exports = App;
