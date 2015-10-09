'use strict';

var NodeREPL = require('./lib/components/NodeREPL');
var React = require('react-native');
var {
  AppRegistry,
} = React;

AppRegistry.registerComponent('NodeREPL', () => NodeREPL);
