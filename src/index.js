import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import ViewContainer from './containers/ViewContainer';
import initReactFastclick from 'react-fastclick';
initReactFastclick();

// Render the main component into the dom
ReactDOM.render(<ViewContainer />, document.getElementById('app'));
