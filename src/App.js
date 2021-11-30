import React, { Component } from 'react';
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact';
import { Routes, Route, useNavigate } from 'react-router-dom';

class App extends Component {
  state = {
    contacts: [],
  }

  componentDidMount() {
    ContactsAPI.getAll()
      .then(contacts => {
        this.setState(() => ({ contacts }))
      })
  }

  removeContact = (contact) => {
    this.setState(currentState => (
      {
        contacts: currentState.contacts.filter(
          c => {
            return c.id !== contact.id
          })
      }
    ))
  }

  createContact = (contact) => {
    ContactsAPI.create(contact)
      .then((contact) => {
        this.setState((currentState) => ({
          contacts: currentState.contacts.concat([contact])
        }))
      })
  }

  render() {
    return (
      <Routes>
        <Route
          path="/"
          element={<ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
          />}
        />
        <Route
          path="/create"
          element={<CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact);
              // let navigate = useNavigate()
              // navigate("/");
            }}
          />}
        />
      </Routes >
    )
  }
}

export default App;
