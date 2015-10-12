'use strict';

var React = require('react-native');
var { UIManager } = require('NativeModules');
var Item = require('./Item');
var evaluate = require('../helpers/evaluate');
var styles = require('../helpers/styles');
var {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} = React;
var isAndroid = Platform.OS === 'android';
var orientation = 'portrait';

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
    var result = evaluate(code);

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
            // TODO: No idea where 200/30 is coming from, but scrolling is off without it
            iH = (iH | 0) + (orientation === 'portrait' ? 200 : 30);
            if (iH > oH) {
              this.refs.scrollView.scrollTo(iH - oH);
            }
          });
        });
      }
    });
  },
  
  handleLayoutChange: function (e) {
    var layout = e.nativeEvent.layout;
    orientation = layout.width < layout.height ? 'portrait' : 'landscape';
  },

  render: function () {
    return (
      <ScrollView
        ref="scrollView"
        style={styles.container}
        onLayout={this.handleLayoutChange}>
        <Text style={styles.text}>$ pocket-node</Text>
        {this.state.io.map((row) => <Item row={row}/>)}
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
});
