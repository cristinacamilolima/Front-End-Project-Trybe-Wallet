import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import infoUser from '../actions/infoUser';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    btnDisabled: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(() => ({
      [name]: value,
    }), () => this.validateEmail());
  }

  // referência projeto em grupo e Stackoverflow

  validateEmail = () => {
    const { password, email } = this.state;
    const passwordSize = 6;
    const resultEmail = (/\S+@\S+\.\S+/).test(email);

    if (resultEmail && password.length >= passwordSize) {
      return this.setState({ btnDisabled: false });
    } return this.setState({ btnDisabled: true });
  };

  handleClick = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { createUserDispatch } = this.props;

    createUserDispatch(email);

    const { history } = this.props;
    history.push('/carteira');
  };

  render() {
    const { email, password, btnDisabled } = this.state;
    return (
      <section>
        <form>
          <label htmlFor="email-input">
            Email:
            <input
              data-testid="email-input"
              id="email-input"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="password-input">
            Senha:
            <input
              data-testid="password-input"
              type="password"
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="button"
            disabled={ btnDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createUserDispatch: (email) => dispatch(infoUser(email)),
});

Login.propTypes = {
  createUserDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
