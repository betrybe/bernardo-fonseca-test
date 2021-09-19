import React from "react";

import "./Table.css";

function Table(props) {
  const { despesas, currencyToExchange, isEdit, deleteRow } = props;

  return (
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
                currency: `${currencyToExchange}`,
              })}
            </td>
            <td>
              {Number(
                despesa.value * despesa.exchangeRates[`${despesa.currency}`].ask
              ).toLocaleString("en-us", {
                style: "currency",
                currency: `${currencyToExchange}`,
              })}
            </td>
            <td>Real</td>
            <td>
              <button
                data-testid="edit-btn"
                onClick={() => {
                  isEdit(despesa.id);
                }}
                className="wallet_table-edite"
              >
                Editar
              </button>
              <button
                data-testid="delete-btn"
                onClick={() => {
                  deleteRow(despesa.id);
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
  );
}

export default Table;
