import React, { Component } from 'react'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  state = {
    screen: 'list',
    contacts: []
  }
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }
  removeContact = (contact) => {
    // Use if updating the new state based on the current state
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))

    ContactsAPI.remove(contact)
  }
  render() {
    return (
      <div className='app'>
        {this.state.screen === 'list' && (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
            onNavigate={() => {
              this.setState({screen: 'create'})
            }}
          />
        )}
        {this.state.screen === 'create' && (
          <CreateContact />
        )}
      </div>

    )
  }
}

export default App
