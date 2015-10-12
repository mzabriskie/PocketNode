'use strict';

var React = require('react-native');
var format = require('../helpers/format');
var styles = require('../helpers/styles');
var {
  Text,
} = React;

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      row: {},
    };
  },

  shouldComponentUpdate: function () {
    return false;
  },

  render: function () {
    var row = this.props.row;
    return (
      <Text style={styles.text} key={row.id}>
        {row.type === 'in' ? '> ' : ''}
        {row.type === 'out' ? format(row.value) : row.value}
      </Text>
    );
  },
});
