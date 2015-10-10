'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StatusBarIOS,
} = React;

var PocketNode = require('./lib/components/PocketNode');

StatusBarIOS.setStyle('light-content');

AppRegistry.registerComponent('PocketNode', () => PocketNode);
