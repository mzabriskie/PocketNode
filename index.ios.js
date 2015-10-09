'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StatusBarIOS,
} = React;

var NodeREPL = require('./lib/components/NodeREPL');

StatusBarIOS.setStyle('light-content');

AppRegistry.registerComponent('NodeREPL', () => NodeREPL);
