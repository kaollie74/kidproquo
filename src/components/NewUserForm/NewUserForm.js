import React, { Component } from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class NewUserForm extends Component {

    state = {
        firstName: '',
        lastName: '', 
        address: '', 
        cityState: '', 
        email: '', 
        phone: '', 
        key: '', 
      };


  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }
    
    render() {
        console.log(this.state);
        return (
        <div>
             <form onSubmit={this.registerUser}>
             <h1>Register Form</h1>
            <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name (Required)"
              value={this.state.firstName}
              onChange={this.handleInputChangeFor('firstName')}
              />
              </div>
              <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name (Required)"
              value={this.state.lastName}
              onChange={this.handleInputChangeFor('lastName')}
              />
              </div>
              <div>
            <input
              type="text"
              name="address"
              placeholder="Address (Required)"
              value={this.state.address}
              onChange={this.handleInputChangeFor('address')}
              />
              </div>
              <div>
            <input
              type="text"
              name="cityState"
              placeholder="City, State (Required)"
              value={this.state.cityState}
              onChange={this.handleInputChangeFor('cityState')}
              />
              </div> 
            <div>
            <input
              type="text"
              name="email"
              placeholder="Email (Required)"
              value={this.state.email}
              onChange={this.handleInputChangeFor('email')}
              />
              </div>
              <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone (Required)"
              value={this.state.phone}
              onChange={this.handleInputChangeFor('phone')}
              />
              </div>
              <div>
            <input
              type="text"
              name="key"
              placeholder="Key Code"
              value={this.state.key}
              onChange={this.handleInputChangeFor('key')}
              />
              </div>
              <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>    
              <center>
                <button
                    type="button"
                    className="link-button"
                    onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}>
                    Login
                </button>
                </center>
              </form>

        </div>
        )
    }
};

export default NewUserForm;