import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'semantic-ui-css/semantic.min.css'
import { Button, Icon, Card, Image, Modal, Responsive, Segment, Form, Input } from 'semantic-ui-react';




class EditMyProfilePage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_FAMILY', payload: this.props.reduxStore.user.id })
    }


    state = {
        open: false,
        open2: false,
        family_last_name: '',
        first_name: '',
        last_name: '',
        birthdate: '',
        allergies: '',
        medication: '',
        notes: '',
        image: '',
        family_id: '',
        family_image: this.props.reduxStore.family.image

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

    editFamilyProfile = () => {
        this.setState({
            ...this.state,
            open2: !this.state.open2,
            family_id: this.props.reduxStore.family.id,
            family_image: this.props.reduxStore.family.image
        })
    }

    updateFamily = () => {
        let newObjectToSend = {
            id: this.state.family_id,
            family_image: this.state.family_image,
            family_last_name: this.state.family_last_name,
            user_id: this.props.reduxStore.user.id
        }

        console.log('this is newObjectToSend', newObjectToSend)

        this.props.dispatch({ type: 'UPDATE_FAMILY', payload: newObjectToSend })
    }

    render() {
        console.log('THIS IS STATE', this.state)
        return (
            <div>

                <Card className="align">
                    <Card.Content>
                        <Card.Header></Card.Header>
                        <Image
                            className="ui fluid image"
                            src={this.props.reduxStore.family.image ? this.props.reduxStore.family.image : ''}
                            alt="img 1"
                        />
                        <Icon name='pencil alternate' size="large" onClick={this.editFamilyProfile} />
                    </Card.Content>
                </Card>
                <div>
                    <Modal
                        open={this.state.open2}
                        onClose={this.state.open2}
                    >
                        <Input
                            value={this.state.family_last_name}
                            onChange={(event) => this.handleChangeFor(event, 'family_last_name')}

                        />
                        <Image
                            className='ui fluid image'
                            src={this.state.family_image}

                        />
                        <Input
                            placeholder='Add New Image'
                            value={this.state.family_image}
                            onChange={(event) => this.handleChangeFor(event, 'family_image')}
                        />
                        <Button onClick={this.updateFamily}>Submit</Button>
                        <Button onClick={this.editFamilyProfile}>Cancel</Button>


                    </Modal>
                </div>
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
                                        placeholder="Birthday(MM-DD-YYYY)"
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