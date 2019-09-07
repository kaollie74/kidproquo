import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'semantic-ui-css/semantic.min.css'
import { Button, Icon, Card, Image, Modal, Responsive, Segment, Form, Input } from 'semantic-ui-react';




class EditMyProfilePage extends Component {



    // state = {
    //     city: this.props.reduxStore.family.city,
    //     email: this.props.reduxStore.family.email,
    //     family_passcode: this.props.reduxStore.family.family_passcode,
    //     first_name1: this.props.reduxStore.family.first_name1,
    //     first_name2: this.props.reduxStore.family.first_name2,
    //     group_id: this.props.reduxStore.family.group_id,
    //     id: this.props.reduxStore.family.id,
    //     image: this.props.reduxStore.family.image,
    //     last_name1: this.props.reduxStore.family.last_name1,
    //     last_name2: this.props.reduxStore.family.last_name2,
    //     phone_number: this.props.reduxStore.family.phone_number,
    //     state: this.props.reduxStore.family.state,
    //     street_address: this.props.reduxStore.family.street_address,
    //     user_id: this.props.reduxStore.family.user_id,
    //     zip_code: this.props.reduxStore.family.zip_code,
    //     open: false
    // }

    state = {
        open: false,
        first_name: '',
        last_name: '',
        birthdate: '',
        allergies: '',
        medication: '',
        notes: '',
        image: '',
        family_id: this.props.reduxStore.family.id

    }

    addKidModal = () => {
        this.setState({
            open: !this.state.open
        })
    }

    handleChangeFor = (event, propsName) => {
        this.setState({ [propsName]: event.target.value })
    }

    submitNewKid = () => {

        this.props.dispatch({ type: 'ADD_NEW_KID', payload: this.state })
    }

    render() {
        console.log('THIS IS STATE', this.state)
        return (
            <div>

                <Card className="align">
                    <Card.Content>
                        <Card.Header></Card.Header>
                        {/* <Card.Meta><span>The Olson family</span></Card.Meta> */}
                        <Image className="ui fluid image" src="https://www.roundlakedentistry.com/wp-content/uploads/2016/09/generic-family-at-table.jpg" alt="img 1" />
                        <Icon name='pencil alternate' size="large" onClick={this.editFamilyProfile} />
                    </Card.Content>
                </Card>
                <div>
                    <Button onClick={this.addKidModal}>Add Kid</Button>
                    <div>
                        <Modal
                            open={this.state.open}
                            onClose={this.state.open}

                        >
                            <Modal.Header>Add Kid</Modal.Header>
                            <Modal.Content>
                                <Form className="ui fluid">
                                    <Form.Field>
                                        <Input
                                            placeholder="First Name(50 character max)"
                                            value={this.state.first_name}
                                            onChange={(event) => this.handleChangeFor(event, 'first_name')}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <Input
                                            placeholder="Last Name(50 character max)"
                                            value={this.state.last_name}
                                            onChange={(event) => this.handleChangeFor(event, 'last_name')}
                                        />
                                    </Form.Field>
                                    <Input
                                        placeholder="Birthday(MM/DD/YYYY)"
                                        value={this.state.birthdate}
                                        onChange={(event) => this.handleChangeFor(event, 'birthdate')}
                                    />

                                    <Input
                                        placeholder="Image"
                                        value={this.state.image}
                                        onChange={(event) => this.handleChangeFor(event, 'image')}
                                    />

                                    <Input
                                        placeholder="Medication"
                                        value={this.state.medication}
                                        onChange={(event) => this.handleChangeFor(event, 'medication')}
                                    />

                                    <Form.TextArea
                                        placeholder="Allergies (500 characters max)"
                                        value={this.state.allergies}
                                        onChange={(event) => this.handleChangeFor(event, 'allergies')}

                                    />

                                    <Form.TextArea
                                        placeholder="Other Info (300 characters max)"
                                        value={this.state.notes}
                                        onChange={(event) => this.handleChangeFor(event, 'notes')}
                                    />

                                </Form>


                            </Modal.Content>
                            <Button onClick={this.addKidModal}>Cancel</Button>
                            <Button onClick={this.submitNewKid}>Submit</Button>
                        </Modal>
                    </div>
                    <Button>Save Changes</Button>

                </div>



            </div>
        )
    }
};

const mapStateToProps = reduxStore => ({
    reduxStore
});

export default connect(mapStateToProps)(EditMyProfilePage);