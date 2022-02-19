import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppLogin from "containers/Login";
import Home from "containers/Home";
import ProtectedRoutes from "./ProtectedRoutes";

import "antd/dist/antd.less";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={AppLogin} />
          <ProtectedRoutes exact path="/home" component={Home} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
