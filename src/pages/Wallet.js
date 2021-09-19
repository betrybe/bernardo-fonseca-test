import React from "react";
import { connect } from "react-redux";

import {
  fetchCurrencyData,
  addExpense,
  deleteExpense,
  editExpense,
} from "../actions/index";

import "../App.css";

class Wallet extends React.Component {
  state = {
    isEdit: false,
    id: "",
  };

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
          Number(despesa.exchangeRates[`${despesa.currency}`].ask)
      );
    }, 0);

    return despesaTotal.toLocaleString("en-us", {
      style: "currency",
      currency: currency,
    });
  };

  deleteRow = (id) => {
    this.props.deleteExpense(id);
  };

  isEdit = (id) => {
    this.setState((state) => {
      return {
        isEdit: !state.isEdit,
        id: id,
      };
    });
  };

  editRow = (event) => {
    event.preventDefault();

    const expenseData = {
      value: this.valueRef.current.value,
      description: this.descriptionRef.current.value,
      currency: this.currencyRef.current.value,
      method: this.paymentMethodRef.current.value,
      tag: this.tagRef.current.value,
      id: this.state.id,
    };

    this.setState((state) => {
      return {
        isEdit: !state.isEdit,
      };
    });

    this.props.editExpense(expenseData);
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

    this.valueRef.current.value = "";
    this.descriptionRef.current.value = "";
  };

  render() {
    const { email, despesas, moedas } = this.props;

    return (
      <div className="wallet_page">
        <header className="wallet_header">
          <h2 data-testid="email-field" className="email_header">
            {email}
          </h2>
          <h2 data-testid="total-field">
            Despesa total: {this.showExpenses(despesas)}
          </h2>
          <h2 data-testid="header-currency-field">BRL</h2>
        </header>
        <form
          onSubmit={
            this.state.isEdit ? this.editRow : this.submitExpensesHandler
          }
          className={this.state.isEdit ? "wallet_form-edit" : "wallet_form"}
        >
          <label>
            Valor:
            <input
              type="number"
              name="value"
              ref={this.valueRef}
              placeholder="0"
              required
              className="wallet_form-input wallet_form-input-valor"
            />
          </label>
          <label>
            Descrição:
            <input
              type="text"
              name="description"
              ref={this.descriptionRef}
              required
              className="wallet_form-input"
            />
          </label>
          <label>
            Moeda:
            <select
              name="currency"
              defaultValue={"USD"}
              ref={this.currencyRef}
              className="wallet_form-input"
            >
              {moedas.map((moeda) => (
                <option key={moeda} value={moeda}>
                  {moeda}
                </option>
              ))}
            </select>
          </label>
          <label>
            Método de pagamento:
            <select
              name="method"
              defaultValue={"Dinheiro"}
              ref={this.paymentMethodRef}
              className="wallet_form-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label>
            Tag:
            <select
              name="tag"
              defaultValue={"Alimentação"}
              ref={this.tagRef}
              className="wallet_form-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="submit"
            className={
              this.state.isEdit
                ? "wallet_form-edit-button"
                : "wallet_form-add-button"
            }
          >
            {this.state.isEdit ? "Editar despesa" : "Adicionar despesa"}
          </button>
        </form>
        <table className="wallet_table">
          <thead>
            <tr>
              <th scope="col">Descrição</th>
              <th scope="col">Tag</th>
              <th scope="col">Método de pagamento</th>
              <th scope="col">Valor</th>
              <th scope="col">Moeda</th>
              <th scope="col">Câmbio utilizado</th>
              <th scope="col">Valor convertido</th>
              <th scope="col">Moeda de conversão</th>
              <th scope="col">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {despesas.map((despesa) => (
              <tr key={despesa.id}>
                <td>{despesa.description}</td>
                <td>{despesa.tag}</td>
                <td>{despesa.method}</td>
                <td>
                  {Number(despesa.value).toLocaleString("en-us", {
                    style: "currency",
                    currency: despesa.currency,
                  })}
                </td>
                <td>{despesa.exchangeRates[`${despesa.currency}`].name}</td>
                <td>
                  {Number(
                    despesa.exchangeRates[`${despesa.currency}`].ask
                  ).toLocaleString("en-us", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>
                  {Number(
                    despesa.value *
                      despesa.exchangeRates[`${despesa.currency}`].ask
                  ).toLocaleString("en-us", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    onClick={() => {
                      this.isEdit(despesa.id);
                    }}
                    className="wallet_table-edite"
                  >
                    Editar
                  </button>
                  <button
                    data-testid="delete-btn"
                    onClick={() => {
                      this.deleteRow(despesa.id);
                    }}
                    className="wallet_table-delete"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.wallet.expenses);
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
    deleteExpense: (id) => dispatch(deleteExpense(id)),
    editExpense: (expenseData) => dispatch(editExpense(expenseData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
