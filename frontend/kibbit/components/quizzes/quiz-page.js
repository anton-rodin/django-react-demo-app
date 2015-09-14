var React = require('react');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');
var Link = require('react-router-component').Link;
var Grid = require('bootstrap-grid-react');
var Container = Grid.Container;
var Row = Grid.Row;
var Col = Grid.Col;
var mui = require('material-ui');
var MUITheme = require('../../mixins/MUITheme.js');
var RaisedButton = mui.RaisedButton;
var QuizzesResource = require('../../stores/quizzes-resource');

function getCatalogItem(component){
  QuizzesResource.find(component.props.id).then(data => {
    component.setState(data)
  });
  return {}
}

var QuizPage = React.createClass({
  mixins:[StoreWatchMixin(getCatalogItem), MUITheme()],
  render:function(){
    var imageStyle = {
      width: '100%'
    };

    return (
      <Container fluid={true}>
        <Row>
          <Col sm={4} xs={12}>
            <img src={this.state.picture} style={imageStyle}/>
          </Col>
          <Col sm={8} xs={12}>
            <h2>{this.state.title}</h2>
            <p>{this.state.description}</p>
            <Link href={'/quiz/' + this.props.id + '/quizzing'}>
              <RaisedButton label="Start quiz" secondary={true}/>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>

          </Col>

        </Row>
      </Container>
    );
  }
});

module.exports = QuizPage;
