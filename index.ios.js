'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StatusBarIOS,
} = React;

StatusBarIOS.setStyle('light-content');

process.env.PLATFORM = 'ios';
var NodeREPL = require('./lib/components/NodeREPL');

AppRegistry.registerComponent('NodeREPL', () => NodeREPL);
