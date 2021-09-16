import React from "react";
import { connect } from "react-redux";

class Wallet extends React.Component {
  showExpenses = (despesas, currency = "BRL") => {
    const despesaTotal = despesas.reduce((total, despesa) => {
      return total + despesa;
    }, 0);

    return despesaTotal.toLocaleString("pt-br", {
      style: "currency",
      currency: currency,
    });
  };

  render() {
    const { email, despesas } = this.props;

    return (
      <div>
        <header>
          <ul>
            <li data-testid="email-field">{email}</li>
            <li data-testid="total-field">
              Despesa total: {this.showExpenses(despesas)}
            </li>
            <li data-testid="header-currency-field">BRL</li>
          </ul>
        </header>
        <form>
          <label>
            Valor:
            <input type="number" name="value" />
          </label>
          <label>
            Descrição:
            <input type="text" name="drescription" />
          </label>
          <label>
            Moeda:
            <select name="currency" defaultValue={"BRL"}>
              <option value="BRL">BRL</option>
            </select>
          </label>
          <label>
            Método de pagamento:
            <select name="paymentMethod" defaultValue={"Dinheiro"}>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de Crédito">Cartão de Crédito</option>
              <option value="Cartão de Débito">Cartão de Débito</option>
            </select>
          </label>
          <label>
            Tag:
            <select name="tag" defaultValue={"Alimentação"}>
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.user.email,
    despesas: state.wallet.expenses,
  };
};

export default connect(mapStateToProps)(Wallet);
