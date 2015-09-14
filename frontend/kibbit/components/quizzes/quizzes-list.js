var React = require('react');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');
var QuizItem = require('../quizzes/quiz-item');
var QuizzesResource = require('../../stores/quizzes-resource');
var Grid = require('bootstrap-grid-react');
var Container = Grid.Container;
var Row = Grid.Row;
var Col = Grid.Col;

function getQuizzes(component) {

  QuizzesResource.findAll().then(function(quizzes){
    component.setState({items: quizzes});
  });
  return {items: []};
}
function fetchQuizzes() {
  return QuizzesResource.getAll();
}

var QuizzesList = React.createClass({
  mixins: [StoreWatchMixin(getQuizzes)],
  render: function () {

    var items = this.state.items.map(function (item) {
      return (
        <Col sm={4} xs={6} key={item.id}>
          <QuizItem item={item}/>
        </Col>
      )

    });
    return (
      <Container fluid={true}>
        <Row>
          {items}
        </Row>
      </Container>
    )
  }
});

module.exports = QuizzesList;
