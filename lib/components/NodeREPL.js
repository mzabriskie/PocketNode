'use strict';

var React = require('react-native');
var { UIManager } = require('NativeModules');
var format = require('../helpers/format');
var {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
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
    var code = e.nativeEvent.text.trim();
    var wrap = false;
    var result;

    // Need to wrap object literals, otherwise they are expressed as a block
    // See http://stackoverflow.com/questions/17382024/why-is-a-bare-array-valid-javascript-syntax-but-not-a-bare-object
    if (code.indexOf('{') === 0 &&
        code.indexOf('}') === code.length - 1) {
      wrap = true;
    }

    // Evaluate code that was entered
    try {
      result = eval.call(null, (wrap ? '(' : '') + code + (wrap ? ')' : ''));
    } catch (x) {
      result = x;
    }

    // Add input/output to state
    io.push({ id: io.length, type: 'in', value: code });
    io.push({ id: io.length, type: 'out', value: result });

    // Re-render, and clear input
    this.setState({ io, inputValue: ' ' }, () => {
      // Return defaultValue, and set focus
      this.setState({ inputValue: null }, () => {
        setTimeout(() => {
          this.refs.textInput.focus();          
        }, 100);
      });
     
      // Keep scrolling to the bottom for iOS
      // Android already handles this natively
      if (!isAndroid) {
        var outerNode = React.findNodeHandle(this.refs.scrollView);
        var innerNode = this.refs.scrollView.getInnerViewNode();
        UIManager.measure(outerNode, (oX, oY, oW, oH, oL, oT) => {
          UIManager.measure(innerNode, (iX, iY, iW, iH, iL, iT) => {
            // TODO: No idea where 200 is coming from, but scrolling is off without it
            iH = (iH | 0) + 200;
            if (iH > oH) {
              this.refs.scrollView.scrollTo(iH - oH);
            }
          });
        });
      }
    });
  },

  render: function() {
    return (
      <ScrollView
        ref="scrollView"
        style={styles.container}>
        <Text style={styles.text}>$ node</Text>
        {this.state.io.map((row) => this.renderRow(row))}
        <View style={styles.view}>
          <Text style={[styles.text, styles.caret]}>> </Text>
          <TextInput
            ref="textInput"
            autoFocus={true}
            autoCorrect={false}
            defaultValue=""
            value={this.state.inputValue}
            style={[styles.text, styles.input]}
            onSubmitEditing={this.handleInputSubmitEditing}
          />
        </View>
      </ScrollView>
    );
  },

  renderRow: function (row) {
    return (
      <Text style={styles.text} key={row.id}>
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

  view: {
    flex: 1,
    flexDirection: 'row',
    marginTop: isAndroid ? - 5.75 : 0,
  },

  caret: {
    width: isAndroid ? 11 : 14.25,
    marginTop: isAndroid ? 5.75 : 0,
  },

  input: {
    height: isAndroid ? 33 : 15,
    flex: 1,
    backgroundColor: 'transparent',
  },
});

