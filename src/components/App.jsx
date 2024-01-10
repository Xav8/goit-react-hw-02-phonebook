import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from '../components/App.module.css';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    ],
    filter: '',
  };

  componentDidMount() {
    document.title = 'HW-2 Phonebook';
  }

  // Add contact
  handleAddContact = contact => {
    const { contacts } = this.state;
    const { name } = contact;

    // Verify contact
    if (contacts.find(contact => contact.name === name)) {
      Notify.failure(`${name} is already in contacts`);
      return;
    }

    this.setState(prevState => {
      return { contacts: [...prevState.contacts, contact] };
    });
  };

  // Delete contact
  handleDeleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  // Add filter
  handleFilter = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <div className={css.section}>
        <h2 className={css.title}>Phonebook</h2>
        <ContactForm onAddContact={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter onFilter={this.handleFilter} filter={this.state.filter} />
        <ContactList
          contacts={contacts}
          filter={filter}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
