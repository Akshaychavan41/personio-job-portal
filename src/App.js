import "./App.css";

import { createBrowserHistory } from "history";
import { Router, Route } from "react-router-dom";
import { Routes } from "./routes/routes";
import { QueryParamProvider } from "use-query-params";
function App() {
  const history = createBrowserHistory();
  return (
    <div className="App">
      <Router history={history}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <Routes />
        </QueryParamProvider>
      </Router>
    </div>
  );
}

export default App;
