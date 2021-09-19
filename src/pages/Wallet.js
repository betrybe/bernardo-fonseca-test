import React from "react";
import { connect } from "react-redux";

import Header from "./componets/header/Header";
import Form from './componets/form/Form';
import Table from './componets/table/Table';
import Spinner from './componets/UI/spinner/Spinner';

import {
  fetchCurrencyData,
  addExpense,
  deleteExpense,
  editExpense,
} from "../actions/index";

import './Wallet.css';

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
    this.setState({
      isEdit: false
    });
    this.props.deleteExpense(id);
  };

  isEdit = (id) => {
    this.setState({
        isEdit: true,
        id: id,
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

    this.setState({
      isEdit: false
    })

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
    const { email, despesas, moedas, isFetching, currencyToExchange } =
      this.props;

    return (
      <div className="wallet_page">
        {isFetching ? (
          <Spinner />
        ) : (
          ""
        )}
       <Header email={email} currencyToExchange={currencyToExchange} totalExpenses={()=> this.showExpenses(despesas)}/>
        <Form isEdit={this.state.isEdit} editRow={this.editRow} submitExpensesHandler={this.submitExpensesHandler}
        valueRef={this.valueRef}
        descriptionRef={this.descriptionRef}
        moedas={moedas}
        currencyRef={this.currencyRef}
        paymentMethodRef={this.paymentMethodRef}
        tagRef={this.tagRef}
        />
        <Table despesas={despesas} currencyToExchange={currencyToExchange}
        isEdit={this.isEdit} deleteRow={this.deleteRow}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.user.email,
    despesas: state.wallet.expenses,
    moedas: state.wallet.currencies,
    isFetching: state.wallet.isFetching,
    currencyToExchange: state.wallet.currencyToExchange,
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
