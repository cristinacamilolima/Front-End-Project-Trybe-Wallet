import React from 'react';
import Header from '../Components/Header';
import Form from '../Components/Form';
import Table from '../Components/Table';

class Wallet extends React.Component {
  render() {
    return (

      <div>
        <Header />
        <Form />
        <Table />
      </div>
    );
  }
}

export default Wallet;

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
