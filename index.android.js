'use strict';

var React = require('react-native');
var {
  AppRegistry,
} = React;

var PocketNode = require('./lib/components/PocketNode');

AppRegistry.registerComponent('PocketNode', () => PocketNode);
