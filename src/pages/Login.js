import React from "react";

class Login extends React.Component {
  submitCredentialsHandler = () => {
    console.log("aqui");
  };

  render() {
    return (
      <div>
        Login
        <form onSubmit={this.submitCredentialsHandler}>
          <div>
            <label htmlFor="email">E-mail: </label>
            <input data-testid="email-input" type="email" id="email" required />
          </div>
          <div>
            <label data-testid="password-input" htmlFor="password">
              Password:{" "}
            </label>
            <input
              type="password"
              id="password"
              required
              minLength="6"
              maxLength="21"
            />
          </div>
          <button>Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
