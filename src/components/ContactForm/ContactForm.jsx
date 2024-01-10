import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

export default class ContactForm extends Component {
  static propTypes = {
    onAddContact: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;
    const { onAddContact } = this.props;
    const id = nanoid(5);

    onAddContact({ id, name, number });

    this.setState({
      name: '',
      number: '',
    });
  };

  handleChange = e => {
    const { name, value } = e.target;

    // Verificare pentru litere în câmpul "Name"
    if (name === 'name' && !/^[a-zA-Zа-яА-Я' -]+$/.test(value)) {
      alert(
        'Please enter only letters, apostrophe, dash, and spaces in the Name field.'
      );
      return;
    }

    // Verificare pentru cifre în câmpul "Number"
    if (name === 'number' && !/^[0-9 +()-]+$/.test(value)) {
      alert(
        'Phone number must be digits and can contain spaces, dashes, parentheses, and can start with +'
      );
      return;
    }

    this.setState({ [name]: value });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <label className={styles.label}>
          Number
          <input
            className={styles.input}
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit" className={styles.button}>
          Add contact
        </button>
      </form>
    );
  }
}
