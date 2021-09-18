import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import { auth } from "../actions";

class Login extends React.Component {
  state = {
    email: "",
    senha: "",
    redirect: false
  };

  setEmail = (event) => {
    event.preventDefault();
    this.setState({ email: event.target.value });
  };

  setPassword = (event) => {
    event.preventDefault();
    this.setState({ senha: event.target.value });
  };

  credentialValidationHandler = () => {
    let checkIsValid = false;

    const pattern = {
      email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})$/,
    };

    checkIsValid =
      pattern.email.test(this.state.email) && this.state.senha.length >= 6
        ? true
        : false;

    return checkIsValid;
  };

  submitCredentialsHandler = (event) => {
    event.preventDefault();

    this.props.auth(this.state.email, this.state.senha);
    this.setState({redirect: true});
  };
  
  render() {
    if(this.state.redirect) return <Redirect to="/carteira" />
    return (
      <div>
        <form onSubmit={this.submitCredentialsHandler}>
          <div>
            <label htmlFor="email">
              E-mail:
              <input
                data-testid="email-input"
                type="email"
                id="email"
                onChange={(event) => {
                  this.setEmail(event);
                }}
                required
              />
            </label>
          </div>
          <div>
            <label data-testid="password-input" htmlFor="password">
              Senha:{" "}
              <input
                type="password"
                id="password"
                minLength="6"
                onChange={(event) => {
                  this.setPassword(event);
                }}
                required
              />
            </label>
          </div>
          <button disabled={!this.credentialValidationHandler()}>Entrar</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, senha) => dispatch(auth(email, senha)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
