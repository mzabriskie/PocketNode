'use strict';

var React = require('react-native');
var {
  AppRegistry,
} = React;

process.env.PLATFORM = 'android';
var NodeREPL = require('./lib/components/NodeREPL');

AppRegistry.registerComponent('NodeREPL', () => NodeREPL);
