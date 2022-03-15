import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const sumExpenses = expenses
      .reduce((acc, curr) => acc + (curr.value * curr.exchangeRates[curr.currency].ask),
        0);
    return (
      <div>
        <h4>Header</h4>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ sumExpenses.toFixed(2) }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
