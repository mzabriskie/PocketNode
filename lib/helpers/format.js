'use strict';

var React = require('react-native');
var formatIndent = require('./formatIndent');
var styles = require('./styles').format;
var {
  Text,
} = React;
var indentDepth = -1;
var GLOBAL = this;

module.exports = format;

// Format the output of a value
function format(value) {
  var result;
  indentDepth++;

  switch(typeof value) {
    case 'string':
      result = <Text style={styles.string}>'{value}'</Text>;
      break;

    case 'boolean':
      result = <Text style={styles.number}>{value ? 'true' : 'false'}</Text>;
      break;

    case 'number':
      result = <Text style={styles.number}>{value}</Text>;
      break;

    case 'undefined':
      result = <Text style={styles.undefined}>undefined</Text>;
      break;

    case 'function':
      result = (
        <Text style={styles.object}>
          [Function{(value.name ? ': ' + value.name : '')}]
        </Text>
      );
      break;

    case 'object':
      if (value instanceof Error) {
        result = (
          <Text style={styles.error}>
            {value.constructor.name + ': ' + value.message}
          </Text>
        );
      }
      else if (value instanceof Date) {
        result = <Text style={styles.date}>{value.toString()}</Text>;
      }
      else if (value === null) {
        result = <Text style={styles.null}>null</Text>;
      }
      else if (Array.isArray(value)) {
        result = recurse(value);
      }
      else {
        if ((indentDepth > 0 && GLOBAL === value) || indentDepth > 1) {
          var label = GLOBAL === value ? 'Circular' : 'Object';
          result = <Text style={styles.object}>[{label}]</Text>;
        }
        else {
          try {
            result = recurse(value);
          } catch (e) {
            // Errors happen when trying to render React components
            // Probably better to detect that it's a component but ¯\_(ツ)_/¯
            result = <Text style={styles.object}>[Object]</Text>;
          }
        }
      }
      break;

    default:
      result = <Text>{value}</Text>;
  }

  indentDepth--;
  return result;
}

// Recursively format an Array, or Object
function recurse(value) {
  var isArray = Array.isArray(value);
  var collection = isArray ? value : Object.keys(value);

  return (
    <Text>
      {isArray ? '[ ' : '{ '}
        {
          collection.map((t, i) => {
            return (
              <Text key={i}>
                {collection.length > 5 && i > 0 ? formatIndent(indentDepth) : ''}
                {!isArray && (<Text>{t}: </Text>)}
                {format(isArray ? t : value[t])}
                {i < collection.length - 1 && (
                  <Text>,{collection.length > 5 ? "\n" : ' '}</Text>
                )}
              </Text>
            );
          })
        }
      {isArray ? ' ]' : ' }'}
    </Text>
  );
}
