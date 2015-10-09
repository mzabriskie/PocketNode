'use strict';

var React = require('react-native');
var format = require('../helpers/format');
var {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
} = React;
var isAndroid = Platform.OS === 'android';

module.exports = React.createClass({
  getInitialState: function () {
    return {
      io: [],
      inputValue: null,
    };
  },

  handleInputSubmitEditing: function (e) {
    var io = this.state.io;
    var text = e.nativeEvent.text.replace(/^> /, '');
    var result;

    try {
      result = eval.call(null, text);
    } catch (x) {
      result = x;
    }

    io.push({ type: 'in', value: text });
    io.push({ type: 'out', value: result });

    this.setState({ io, inputValue: '' }, () => {
      this.setState({ inputValue: null }, () => {
        setTimeout(() => {
          this.refs.input.focus();
        }, 100);
      });
    });
  },

  render: function() {   
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>$ node</Text>
        {this.state.io.map((row) => this.renderRow(row))}
        <TextInput
          ref="input"
          autoFocus={true}
          autoCorrect={false}
          defaultValue="> "
          value={this.state.inputValue}
          style={[styles.text, styles.input]}
          onSubmitEditing={this.handleInputSubmitEditing}
        />
      </ScrollView>
    );
  },

  renderRow: function (row) {
    return (
      <Text style={styles.text}>
        {row.type === 'in' ? '> ' : ''}
        {row.type === 'out' ? format(row.value) : row.value}
      </Text>
    );
  }
});

var styles = StyleSheet.create({
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

  input: {
    height: isAndroid ? 35 : 15,
  },
});

