'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBarIOS,
} = React;

StatusBarIOS.setStyle('light-content');

var NodeREPL = React.createClass({
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
      <View style={styles.container}>
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
      </View>
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

function getIndent() {
  var str = '';
  var i = formatIndent;

  while (i-- > -1) {
    str += '  ';
  }

  return str;
}

var formatIndent = -1;
function format(value) {
  var result;
  formatIndent++;

  switch(typeof value) {
    case 'string':
      result = <Text style={formats.string}>'{value}'</Text>;
      break;

    case 'boolean':
      result = <Text style={formats.number}>{value ? 'true' : 'false'}</Text>;
      break;

    case 'number':
      result = <Text style={formats.number}>{value}</Text>;
      break;

    case 'undefined':
      result = <Text style={formats.undefined}>undefined</Text>;
      break;

    case 'function':
      result = (
        <Text style={formats.object}>
          [Function{(value.name ? ': ' + value.name : '')}]
        </Text>
      );
      break;

    case 'object':
      if (value instanceof Error) {
        result = (
          <Text style={formats.error}>
            {value.constructor.name + ': ' + value.message}
          </Text>
        );
      }
      else if (value instanceof Date) {
        result = <Text style={formats.date}>{value.toString()}</Text>;
      }
      else if (value === null) {
        result = <Text style={formats.null}>null</Text>;
      }
      else if (Array.isArray(value)) {
        result = recurse(value);
      }
      else {
        if (formatIndent > 0) {
          result = <Text style={formats.object}>[Object]</Text>;
        }
        else {
          result = recurse(value);
        }
      }
      break;

    default:
      result = <Text>{value}</Text>;
  }

  formatIndent--;
  return result;
}

function recurse(value) {
  var isArray = Array.isArray(value);
  var collection = isArray ? value : Object.keys(value);

  return (
    <Text>
      {isArray ? '[ ' : '{ '}
        {
          collection.map((t, i) => {
            return (
              <Text>
                {collection.length > 10 && i > 0 ? getIndent() : ''}
                {!isArray && (<Text>{t}: </Text>)}
                {format(isArray ? t : value[t])}
                {i < collection.length - 1 && (
                  <Text>,{collection.length > 10 ? "\n" : ' '}</Text>
                )}
              </Text>
            );
          })
        }
      {isArray ? ' ]' : ' }'}
    </Text>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1628',
    padding: 5,
    paddingTop: 25,
  },

  text: {
    color: '#F4FFFF',
    fontFamily: 'Courier New',
    fontSize: 12,
  },

  input: {
    height: 15,
  },
});

var formats = StyleSheet.create({
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

AppRegistry.registerComponent('NodeREPL', () => NodeREPL);
