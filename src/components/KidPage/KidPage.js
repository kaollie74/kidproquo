import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Card, Image, Modal, Responsive, Segment, Form, Input } from 'semantic-ui-react';
import Swal from 'sweetalert2';

class KidPage extends Component {

    state = {
        id: this.props.reduxStore.updateKid.id,
        first_name: this.props.reduxStore.updateKid.first_name,
        last_name: this.props.reduxStore.updateKid.last_name,
        birthdate: this.props.reduxStore.updateKid.birthdate,
        allergies: this.props.reduxStore.updateKid.allergies,
        medication: this.props.reduxStore.updateKid.medication,
        image: this.props.reduxStore.updateKid.image,
        family_id: this.props.reduxStore.updateKid.family_id,
        notes: this.props.reduxStore.updateKid.notes,
        user_id: this.props.reduxStore.user.id,
        open: false
    }

    handleChangeFor = (event, propsName) => {
        this.setState({ [propsName]: event.target.value })
    }

    kidPicModal = () => {
        this.setState({
            open: !this.state.open
        })
    }

    setKidImageLocally = () => {
        this.setState({
            image: this.state.image,
            open: false
        })
    }

    updateKid = () => {
        this.props.dispatch({type: 'UPDATE_KID_TO_DB', payload: this.state})
        this.props.history.push('/family-profile')
    }


    render() {
        return (
            <div className="ui container center aligned" className='formBackground'>
                <div className='editProfileHeader'>
                    <h2>Edit Kid</h2>
                </div>


                <div className="ui container center aligned" className="card">
                    <Card className="ui container center aligned" >
                        <Card.Content>
                            <Card.Header></Card.Header>
                            <Image
                                size='huge'
                                className="ui fluid image"
                                src={this.state.image ? this.state.image : ''}
                                alt="img 1"
                            />
                            <div className='editIcon'>
                                <a>
                                    <Icon
                                        name='pencil alternate'
                                        size="large"
                                        onClick={this.kidPicModal}

                                    />
                                    Edit Pic
                            </a>
                            </div>


                        </Card.Content>
                    </Card>
                </div>
                <div className='formInputsBtns'>
                    <Form.Input
                        className='editInputs'
                        placholder='Last Name'
                        fluid label='First name'
                        value={this.state.first_name}
                        onChange={(event) => this.handleChangeFor(event, 'first_name')}


                    />
                    <Form.Input
                        className='editInputs'
                        fluid label='Last Name 1'
                        value={this.state.last_name}
                        onChange={(event) => this.handleChangeFor(event, 'last_name')}

                    />

                    <Form.Input
                        className='editInputs'
                        fluid label='Birthday'
                        value={this.state.birthdate}
                        onChange={(event) => this.handleChangeFor(event, 'birthdate')}

                    />
                    <Form.Input
                        className='editInputs'
                        fluid label='allergies'
                        value={this.state.allergies}
                        onChange={(event) => this.handleChangeFor(event, 'allergies')}

                    />
                    <Form.Input
                        className='editInputs'
                        fluid label='State'
                        value={this.state.medication}
                        onChange={(event) => this.handleChangeFor(event, 'medication')}

                    />
                    <Form.Input
                        className='editInputs'
                        fluid label='Image'
                        value={this.state.image}
                        onChange={(event) => this.handleChangeFor(event, 'image')}

                    />

                    <Form.Input
                        className='editInputs'
                        fluid label='Notes'
                        value={this.state.notes}
                        onChange={(event) => this.handleChangeFor(event, 'notes')}

                    />
                    <div className='editProfileBtns'>


                        <div className='saveChangesBtn'>
                            <Button
                                color='green'
                                onClick={this.updateKid}
                                size='mini'>
                                Save Changes
                                </Button>
                        </div>

                        <div className='addKidBtn'>
                            <Button
                                color='red'
                                size='mini'
                                onClick={this.addKidModal}>
                                Cancel
                             </Button>
                        </div>


                    </div>
                </div>



                <div>
                    {/************************************** Edit Kid Pic ************************************************/}
                    <Modal
                        open={this.state.open}
                        onClose={this.state.open}
                    >

                        <Image
                            className='ui fluid image'
                            src={this.state.image}

                        />
                        <Input
                            placeholder='Add New Image'
                            value={this.state.image}
                            onChange={(event) => this.handleChangeFor(event, 'image')}
                        />
                        <div className='modalBtns'>
                            <div className='modalOkBtn'>
                                <Button
                                    color='blue'
                                    size='small'
                                    onClick={this.setKidImageLocally}>
                                    Ok
                            </Button>
                            </div>
                            <div>
                                <Button
                                    color='red'
                                    size='small'
                                    onClick={this.kidPicModal}>
                                    Cancel
                            </Button>
                            </div>
                        </div>


                    </Modal> */}
                </div>
                <div>
                    {/*************************************** Add Kid Modal ********************************************/}
                    <div>
                        {/* <Responsive>
                            <Modal
                                open={this.state.open}
                                onClose={this.state.open}
                                className='.addKidModal'
                            >
                                <Modal.Header
                                    className="ui container center aligned"
                                >
                                    Add Kid
                            </Modal.Header>

                                <Image
                                    className='ui fluid image'

                                    src={this.state.image}

                                />
                                <Modal.Content
                                    className="ui container center aligned"
                                >

                                    <Form.Field>
                                        <Form.Input
                                            fluid label='First Name'
                                            placeholder="(50 character max)"
                                            value={this.state.first_name}
                                            onChange={(event) => this.handleChangeFor(event, 'first_name')}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Input
                                            fluid label='Last Name'
                                            placeholder="(50 character max)"
                                            value={this.state.last_name}
                                            onChange={(event) => this.handleChangeFor(event, 'last_name')}
                                        />
                                    </Form.Field>
                                    <Form.Input
                                        fluid label='Birthday'
                                        placeholder="(MM-DD-YYYY)"
                                        value={this.state.birthdate}
                                        onChange={(event) => this.handleChangeFor(event, 'birthdate')}
                                    />

                                    <Form.Input
                                        fluid label='Image'
                                        placeholder="URL"
                                        value={this.state.image}
                                        onChange={(event) => this.handleChangeFor(event, 'image')}
                                    />

                                    <Form.Input
                                        fluid label='Medication'
                                        placeholder="(100 character max)"
                                        value={this.state.medication}
                                        onChange={(event) => this.handleChangeFor(event, 'medication')}
                                    />

                                    <Form.Input
                                        fluid label="Allergies"
                                        placeholder="Allergies (500 characters max)"
                                        value={this.state.allergies}
                                        onChange={(event) => this.handleChangeFor(event, 'allergies')}

                                    />

                                    <Form.Input
                                        fluid label="Other Information"
                                        placeholder="Other Info (300 characters max)"
                                        value={this.state.notes}
                                        onChange={(event) => this.handleChangeFor(event, 'notes')}
                                    />

                                </Modal.Content>
                                <div>
                                    <Button
                                        color='red'
                                        floated='right'
                                        size='mini'
                                        onClick={this.addKidModal}>
                                        Cancel
                                </Button>
                                    <Button
                                        color='blue'
                                        floated='right'
                                        size='mini'
                                        onClick={this.submitNewKid}>
                                        Submit
                                </Button>
                                </div>
                            </Modal>
                        </Responsive> */}


                    </div>


                </div>



            </div>
        )
    }
};

const mapStateToProps = reduxStore => ({
    reduxStore
});

export default connect(mapStateToProps)(KidPage);