import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getCurrencySucess from '../actions/wallet';
import getCurrencyPrice from '../services/currencyPriceAPI';

class Form extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: '',
    tag: '',
    currencies: [],
    exchangeRates: {},
  }

  async componentDidMount() {
    const currencyPrice = await getCurrencyPrice();

    const currenciesCoin = Object.keys(currencyPrice);
    this.setState({ currencies: [...currenciesCoin] });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(() => ({
      [name]: value,
    }));
  }

  handleClick = async (event) => {
    event.preventDefault();

    const currencyPrices = await getCurrencyPrice();
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
      exchangeRates: currencyPrices,
    };
    addexpenses(stateObj);

    this.setState({
      id: (id + 1),
      value: '',
      description: '',
      currency: 'EUR',
      method: '',
      tag: '',
      exchangeRates,
    });
  }

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
      currencies,
    } = this.state;

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
              <option value="" defaultValue disabled hidden>Selecione a Moeda</option>
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

          <button type="button" onClick={ this.handleClick }>
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addexpenses: (state) => dispatch(getCurrencySucess(state)),
});

Form.propTypes = {
  addexpenses: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Form);
