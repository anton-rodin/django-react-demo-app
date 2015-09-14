var React = require('react');
var MUITheme = require('../mixins/MUITheme.js');
var mui = require('material-ui');
var AppBar = mui.AppBar;
var IconButton = mui.IconButton;
var FontIcon = mui.FontIcon;
var Link = require('react-router-component').Link;


var Layout = React.createClass({
  mixins: [MUITheme()],
  render:function(){

    var itemStyle = {
      marginTop: 16
    };
    return (
      <div>
        <AppBar title="Learn with quizzes" iconElementLeft={<Link href="/"><IconButton><FontIcon className="material-icons" color="#FFF">home</FontIcon></IconButton></Link>}/>
        <div className="container" style={itemStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Layout;
