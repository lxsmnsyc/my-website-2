import React, { Fragment } from 'react';
import { createGlobalStyle } from 'styled-components';
import useTimeout from 'react-use/lib/useTimeout';
import PageLoader from './components/PageLoader/PageLoader';
import PageTransition from './components/PageTransition/PageTransition';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0px;
    margin: 0px;
    background-color: #eceff1;
  }
`;

const App = () => {
  const wow = !useTimeout(3000);
  return (
    <Fragment>
      <GlobalStyle />
      <PageTransition mounted={wow} />
      <PageLoader />
    </Fragment>
  );
};

export default App;
