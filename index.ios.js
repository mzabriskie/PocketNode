'use strict';

var NodeREPL = require('./lib/components/NodeREPL');
var React = require('react-native');
var {
  AppRegistry,
  StatusBarIOS,
} = React;

StatusBarIOS.setStyle('light-content');

AppRegistry.registerComponent('NodeREPL', () => NodeREPL);
