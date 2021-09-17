import React from "react";
import { connect } from "react-redux";

import { fetchCurrencyData, addExpense } from "../actions/index";

class Wallet extends React.Component {
  valueRef = React.createRef();
  descriptionRef = React.createRef();
  currencyRef = React.createRef();
  paymentMethodRef = React.createRef();
  tagRef = React.createRef();

  componentDidMount() {
    this.props.fetchCurrencyData();
  }

  showExpenses = (despesas, currency = "BRL") => {
    const despesaTotal = despesas.reduce((total, despesa) => {
      return (
        total +
        Number(despesa.value) *
          Number(despesa.exchangeRates[`${despesa.currency}`].bid)
      );
    }, 0);

    return despesaTotal.toLocaleString("pt-br", {
      style: "currency",
      currency: currency,
    });
  };

  submitExpensesHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      value: this.valueRef.current.value,
      description: this.descriptionRef.current.value,
      currency: this.currencyRef.current.value,
      method: this.paymentMethodRef.current.value,
      tag: this.tagRef.current.value,
    };

    this.props.addExpense(expenseData);
  };

  render() {
    const { email, despesas, moedas } = this.props;

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
        <form onSubmit={this.submitExpensesHandler}>
          <label>
            Valor:
            <input
              type="number"
              name="value"
              ref={this.valueRef}
              placeholder="0,00"
              min="0"
              required
            />
          </label>
          <label>
            Descrição:
            <input type="text" name="drescription" ref={this.descriptionRef} />
          </label>
          <label>
            Moeda:
            <select name="currency" defaultValue={"USD"} ref={this.currencyRef}>
              {moedas.map((moeda) => (
                <option key={moeda.code} value={moeda.code}>
                  {moeda.code}
                </option>
              ))}
            </select>
          </label>
          <label>
            Método de pagamento:
            <select
              name="paymentMethod"
              defaultValue={"Dinheiro"}
              ref={this.paymentMethodRef}
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de Crédito">Cartão de Crédito</option>
              <option value="Cartão de Débito">Cartão de Débito</option>
            </select>
          </label>
          <label>
            Tag:
            <select name="tag" defaultValue={"Alimentação"} ref={this.tagRef}>
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button type="submit">Adicionar despesa</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.user.email,
    despesas: state.wallet.expenses,
    moedas: state.wallet.currencies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrencyData: () => dispatch(fetchCurrencyData()),
    addExpense: (expenseData) => dispatch(addExpense(expenseData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
