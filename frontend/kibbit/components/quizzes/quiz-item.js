var React = require('react');
var Link = require('react-router-component').Link;
var mui = require('material-ui');
var MUITheme = require('../../mixins/MUITheme.js');
var Card = mui.Card;
var CardMedia = mui.CardMedia;
var CardTitle = mui.CardTitle;
var CardActions = mui.CardActions;
var FlatButton = mui.FlatButton;

var QuizItem = React.createClass({
  mixins: [MUITheme()],
  render: function () {
    var itemStyle = {
      marginBottom: 16
    };
    var imageStyle = {
      backgroundImage: 'url(' + this.props.item.picture + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      width: '100%',
      height: '100%',
      minHeight: 200
    };
    return (
      <Card style={itemStyle}>
        <CardMedia>
          <div style={imageStyle}/>
        </CardMedia>
        <CardTitle title={this.props.item.title} subtitle={this.props.item.description}/>
        <CardActions>
          <Link href={'/quiz/' + this.props.item.id}>
            <FlatButton label="Start quiz" secondary={true}/>
          </Link>
        </CardActions>
      </Card>
    );
  }
});

module.exports = QuizItem;
