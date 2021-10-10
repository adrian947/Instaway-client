import React from "react";
import { routes } from "./routes";
import {
  BrowserRouter as Router,
  Switch,
  Route /* Link */,
} from "react-router-dom";
import { map } from "lodash";

export const Navigation = () => {
  return (
    <Router>
      <Switch>
        {map(routes, (route, index) => (
          <Route
            exact={route.exact}
            path={route.path}
            key={index}
            render={(props) => (
              <route.layout>
                <route.component {...props} />
              </route.layout>
            )}
          />
        ))}
      </Switch>
    </Router>
  );
};
