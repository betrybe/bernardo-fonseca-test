import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Login from "./pages/Login";
//const Wallet = React.lazy(() => import("./pages/Wallet.js"));
import Wallet from "./pages/Wallet";

function App(props) {
  // let pages = (
  //   <Switch>
  //     <Route path="/" exact component={Login} />
  //   </Switch>
  // );

  //if (props.isLoggedIn)
  //pages = (
  //<Suspense fallback={<div>Loading...</div>}>
  //<Switch>
  //<Route path="/" exact component={Login} />
  //<Route path="/carteira" component={Wallet} />
  // </Switch>
  //</Suspense>
  //);

  return (
    <div>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/carteira" component={Wallet} />
      </Switch>
    </div>
  );
}

const mapDispatchToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

export default connect(mapDispatchToProps)(App);
