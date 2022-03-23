import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getCurrencySucess from '../actions/wallet';
import getCurrencyPrice from '../services/currencyPriceAPI';
import Table from './Table';
import editExpenseAction from '../actions/editExpense';
import setExchangeAction from '../actions/setExchange';

class Form extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
    btnValue: 'Adicionar despesa',
    shouldEdit: false,
  }

  async componentDidMount() {
    const { setexchange } = this.props;
    const currencyPrice = await getCurrencyPrice();
    setexchange(Object.keys(currencyPrice));
  }

  handleChange = ({ target: { name, value } }) => {
    if (name === 'select') {
      this.setState(() => ({
        currency: value,
      }));
      return;
    }
    this.setState(() => ({
      [name]: value,
    }));
  }

  handleClick = async () => {
    const currencyPrices = await getCurrencyPrice();
    this.setState(() => ({ exchangeRates: currencyPrices }));
    const { addexpenses } = this.props;
    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    } = this.state;
    const stateObj = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };

    addexpenses(stateObj);
    this.setState(() => ({
      id: (id + 1),
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
      exchangeRates,
    }));
  }

  handleEditExpense = () => {
    const { editExpense } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
      id,
    } = this.state;
    const newEditExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    editExpense(id, newEditExpense);
    this.setState(() => (
      { value: '', description: '', btnValue: 'Adicionar despesa', shouldEdit: false }));
  };

  flowAddOrEdit = async () => {
    const { shouldEdit } = this.state;
    if (!shouldEdit) {
      this.handleClick();
    } else {
      this.handleEditExpense();
    }
  };

  expenseFormEdit = (id) => {
    const { expenses } = this.props;
    const expense = expenses.find((expenseItem) => expenseItem.id === id);
    this.setState(() => ({
      value: expense.value,
      description: expense.description,
      currency: expense.currency,
      method: expense.method,
      tag: expense.tag,
      btnValue: 'Editar despesa',
      exchangeRates: expense.exchangeRates,
      shouldEdit: true,
      id,
    }));
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
      btnValue,
    } = this.state;

    const { currencies } = this.props;

    return (
      <div>
        <form>
          <label htmlFor="value-input">
            Valor
            <input
              type="text"
              name="value"
              data-testid="value-input"
              id="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description-input">
            Descrição
            <input
              type="text"
              name="description"
              data-testid="description-input"
              id="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency-input">
            Moeda
            <select
              name="select"
              id="currency-input"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
              {
                currencies.filter((curr) => curr !== 'USDT').map((curr) => (
                  <option
                    data-testid={ curr }
                    key={ curr }
                    value={ curr }
                  >
                    { curr }
                  </option>
                ))
              }
            </select>
          </label>

          <label htmlFor="method-input">
            Métdo de Pagamento
            <select
              name="method"
              id="method-input"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro" defaultValue>Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag-input">
            Categoria
            <select
              name="tag"
              id="tag-input"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação" defaultValue>Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <button type="button" onClick={ this.flowAddOrEdit }>
            { btnValue }
          </button>
        </form>
        <Table edit={ this.expenseFormEdit } />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addexpenses: (state) => dispatch(getCurrencySucess(state)),
  editExpense: (id, updates) => dispatch(editExpenseAction(id, updates)),
  setexchange: (currencies) => dispatch(setExchangeAction(currencies)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

Form.propTypes = {
  addexpenses: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  editExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  setexchange: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
