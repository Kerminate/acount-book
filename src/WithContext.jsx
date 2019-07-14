import React from 'react';
import { AppContext } from './Appcontext';

const withContext = Component => props => (
  <AppContext.Consumer>
    {({ state, actions }) => <Component {...props} data={state} actions={actions} />}
  </AppContext.Consumer>
);

export default withContext;
