import React, { Component } from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class EditMyProfilePage extends Component {
    render() {
        return (
            <div>
                <h1>
                   This is Edit My Profile Page
                </h1>
            </div>
        )
    }
};

export default EditMyProfilePage;