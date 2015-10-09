'use strict';

var React = require('react-native');
var {
  AppRegistry,
} = React;

var NodeREPL = require('./lib/components/NodeREPL');

AppRegistry.registerComponent('NodeREPL', () => NodeREPL);
