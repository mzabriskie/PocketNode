'use strict';

var React = require('react-native');
var {
  Platform,
  StyleSheet,
} = React;
var isAndroid = Platform.OS === 'android';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1628',
    padding: 5,
    paddingTop: isAndroid ? 5 : 25,
  },

  text: {
    color: '#F4FFFF',
    fontFamily: isAndroid ? 'monospace' : 'Courier New',
    fontSize: 12,
  },

  view: {
    flex: 1,
    flexDirection: 'row',
    marginTop: isAndroid ? - 6.75 : 0,
  },

  caret: {
    width: isAndroid ? 11 : 14.25,
    marginTop: isAndroid ? 6.75 : 0,
  },

  input: {
    height: isAndroid ? 34 : 15,
    flex: 1,
    backgroundColor: 'transparent',
  },
});

module.exports.format = StyleSheet.create({
  error: {
    color: '#B70009',
  },

  string: {
    color: '#33A333',
  },

  number: {
    color: '#BBBB06',
  },

  undefined: {
    color: '#666663',
  },

  null: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  date: {
    color: '#A333A3',
  },

  object: {
    color: '#33A3A3',
  },
});
