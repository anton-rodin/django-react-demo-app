var React = require('react');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();

var MUITheme = function () {
  return {
    childContextTypes: {
      muiTheme: React.PropTypes.object
    },
    getChildContext() {
      return {
        muiTheme: ThemeManager.getCurrentTheme()
      };
    }
  }
};

module.exports = MUITheme;

