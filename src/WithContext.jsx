import React from 'react';
import { AppContext } from './AppContext';

const withContext = Component => props => (
  <AppContext.Consumer>
    {({ state, actions }) => <Component {...props} data={state} actions={actions} />}
  </AppContext.Consumer>
);

export default withContext;
