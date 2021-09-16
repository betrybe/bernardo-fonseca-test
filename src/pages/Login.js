import React from "react";
import { connect } from "react-redux";

import { auth } from "../actions";

class Login extends React.Component {
  emailRef = React.createRef();
  passwordRef = React.createRef();

  submitCredentialsHandler = (event) => {
    event.preventDefault();

    this.props.auth(
      this.emailRef.current.value,
      this.passwordRef.current.value
    );
    this.props.history.push("/carteira");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitCredentialsHandler}>
          <div>
            <label htmlFor="email">E-mail: </label>
            <input
              data-testid="email-input"
              type="email"
              id="email"
              ref={this.emailRef}
              required
            />
          </div>
          <div>
            <label data-testid="password-input" htmlFor="password">
              Password:{" "}
            </label>
            <input
              type="password"
              id="password"
              minLength="6"
              ref={this.passwordRef}
              required
            />
          </div>
          <button>Entrar</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password) => dispatch(auth(email, password)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
