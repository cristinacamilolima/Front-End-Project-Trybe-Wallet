import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import infoUser from '../actions/infoUser';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    buttonisDisabled: true,
  }

  handleChange = ({ target }) => {
    this.setState(() => ({
      [target.name]: target.value,
    }), () => this.validateForm());
  };
  // Inspirado na resolução das mesmas funcionalidades no Projeto Trivia feito em grupo com os colegas @Lorenne e Laecio
  // https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/

  validateForm = () => {
    const { email, password } = this.state;
    const validateEmail = /\S+@\S+\.\S+/;
    const MIN_LENGTH = 6;
    const isValid = validateEmail.test(email) && password.length >= MIN_LENGTH;
    this.setState({
      buttonisDisabled: !isValid,
    });
  };

  handleSubmit = () => {
    const { email } = this.state;
    const { setUser, history } = this.props;
    setUser(email);
    history.push('/carteira');
  };

  render() {
    const { email, password, buttonisDisabled } = this.state;

    return (
      <main>

        <h1>
          TrybeWallet
        </h1>

        <form>
          <label htmlFor="email">
            E-mail:
            <input
              data-testid="email-input"
              name="email"
              type="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="password">
            Senha:
            <input
              data-testid="password-input"
              name="password"
              type="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="button"
            disabled={ buttonisDisabled }
            onClick={ this.handleSubmit }

          >
            Entrar
          </button>

        </form>
      </main>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  setUser: (email) => dispatch(infoUser(email)),
});

Login.propTypes = {
  setUser: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
