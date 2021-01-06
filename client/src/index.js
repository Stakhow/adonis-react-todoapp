import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './redux/index'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {ErrorBoundary} from 'react-error-boundary'

const theme = createMuiTheme({
  palette: {},
});

function ErrorFallback({error, componentStack, resetErrorBoundary}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <pre>{componentStack}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

const myErrorHandler = (error, componentStack) => {
  console.log('error, componentStack', error, componentStack);
};

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        console.log('reset');
        // reset the state of your app so the error doesn't happen again
      }}
      onError={myErrorHandler}
    >
      <ThemeProvider theme={theme}>
        {/*<React.StrictMode>*/}
          <App />
        {/*</React.StrictMode>*/}
      </ThemeProvider>
    </ErrorBoundary>
  </Provider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
