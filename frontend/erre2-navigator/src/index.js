import React from 'react';
import ReactDOM from 'react-dom';

// Fonts
// =====
// Import as needed! If you start using a certain font type, enable it here!
// -----
import "@fontsource/fira-sans";
import "@fontsource/fira-sans/500.css";
import "@fontsource/fira-sans/600.css";
import "@fontsource/fira-code";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorkerRegistration.register()
reportWebVitals();

