import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store.js';
import { createMemoryHistory } from 'history';
import { logout } from '../../features/authentication.js';

export const renderWithRouterAndStore = async ({
  currentContent,
  otherRoutes,
  outsideSwitch,
  initialActions,
}) => {
  const history = createMemoryHistory({ initialEntries: ['currentContent'] });

  //store intialization
  store.dispatch(logout());
  if (initialActions) {
    for (let action of initialActions) {
      store.dispatch(action);
      await new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          const state = store.getState();
          let isReady = true;
          for (let slice in state)
            if (state[slice].loading === 'pending') isReady = false;
          if (isReady) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });
    }
  }

  //need to wait for action resolution before running next one or returning UI

  return render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="currentContent">{currentContent}</Route>
          {otherRoutes
            ? otherRoutes.map((route, i) => (
                <Route key={i} exact={route.exact ?? false} path={route.path}>
                  {route.content}
                </Route>
              ))
            : null}
        </Switch>
        {outsideSwitch
          ? outsideSwitch.map((content, i) => (
              <React.Fragment key={i}>{content}</React.Fragment>
            ))
          : null}
      </Router>
    </Provider>
  );
};
