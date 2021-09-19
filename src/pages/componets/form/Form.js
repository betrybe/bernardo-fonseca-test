import React from "react";

import './Form.css';

function Form(props) {
    const {isEdit, editRow, submitExpensesHandler, valueRef, descriptionRef, moedas, currencyRef, paymentMethodRef, tagRef} = props;

  return (
    <form
      onSubmit={isEdit ? editRow : submitExpensesHandler}
      className={isEdit ? "wallet_form-edit" : "wallet_form"}
    >
      <label>
        Valor:
        <input
          type="number"
          name="value"
          ref={valueRef}
          placeholder="0"
          min="0"
          required
          className="wallet_form-input wallet_form-input-valor"
        />
      </label>
      <label>
        Descrição:
        <input
          type="text"
          name="description"
          ref={descriptionRef}
          required
          className="wallet_form-input"
        />
      </label>
      <label>
        Moeda:
        <select
          name="currency"
          defaultValue={"USD"}
          ref={currencyRef}
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
          ref={paymentMethodRef}
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
          ref={tagRef}
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
          isEdit
            ? "wallet_form-edit-button"
            : "wallet_form-add-button"
        }
      >
        {isEdit ? "Editar despesa" : "Adicionar despesa"}
      </button>
    </form>
  );
}

export default Form;
