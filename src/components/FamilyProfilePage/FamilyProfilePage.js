import React, { Component } from 'react';
import { connect } from 'react-redux';
import Coverflow from 'react-coverflow';
import 'semantic-ui-css/semantic.min.css'
import { Button, Icon, Card, Image, Modal, Responsive, Segment, Form, Grid } from 'semantic-ui-react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './FamilyProfilePage.css';



class FamilyProfilePage extends Component {

    state = {
        first_name: '',
        last_name: '',
        allergies: '',
        birthdate: '',
        medication: '',
        image: '',
        notes: '',
        open: false
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_FAMILY', payload: this.props.reduxStore.user.id })
        this.props.dispatch({ type: 'FETCH_KIDS', payload: this.props.reduxStore.user.id })
    }

    closeKidModal = () => {
        this.setState({
            open: false
        })
    }
    editFamilyProfile = () => {

        this.props.history.push('/edit-my-profile');
    }

    kidModal = (item) => {

        console.log('this is item', item)
        this.setState({
            id: item.id,
            first_name: item.first_name,
            last_name: item.last_name,
            allergies: item.allergies,
            birthdate: item.birthdate,
            medication: item.medication,
            image: item.image,
            notes: item.notes,
            open: true

        })
    }

    openModal = () => {

        console.log('in openModal')
        this.setState({
            open: !this.state.open
        })
    }

    updateKid = () => {
        this.props.dispatch({ type: 'UPDATE_KID', payload: this.state })
        this.props.history.push('/kid-page')
    }
    render() {
        return (
            <>

                <div>

                    <h1 align="center">
                        The {this.props.reduxStore.family.last_name1} Family
                    </h1>
                </div>
                &nbsp;
            <div align="center">
                    <Card>
                        <Card.Content>
                            <Card.Header> </Card.Header>
                            <Image className='ui centered medium image' src={this.props.reduxStore.family.image ? this.props.reduxStore.family.image : <>no</>} alt="img 1" />
                            <Icon name='pencil alternate' onClick={this.editFamilyProfile} />
                        </Card.Content>
                    </Card>
                </div>
                &nbsp;
                <div align="center">
                    <Card>
                        <Card.Content>
                            <Card.Header>Info</Card.Header>
                            <Card.Description>
                                {this.props.reduxStore.family.street_address} < br />
                                {this.props.reduxStore.family.city}  <></>
                                {this.props.reduxStore.family.state}, <></>
                                {this.props.reduxStore.family.zip_code}< br />
                                {this.props.reduxStore.family.phone_number}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </div>
                &nbsp;
                <div className='kidCard'>
                    <h1>Meet the Kids</h1>

                    <Grid stackable container centered columns={2} >
                        {this.props.reduxStore.kid.map((item, i) => {

                            return (

                                <Grid.Column>
                                    <Card key={item.id} style={{ 'min-height': '350px' }}>
                                        <Card.Content>

                                            <Card.Header className='kidCardTitle'>
                                                {item.first_name} {item.last_name}
                                            </Card.Header>
                                            <Image
                                                className='ui centered fluid image'
                                                src={item.image}
                                                alt="img 1"
                                                onClick={() => this.kidModal(item)}
                                            />
                                        </Card.Content>

                                    </Card>
                                </Grid.Column>
                            )
                        })}

                    </Grid>

                    <Modal
                        open={this.state.open}
                        onClose={this.state.open}
                    >
                        <Modal.Header align='center'>
                            <h2>{this.state.first_name} {this.state.last_name}</h2>
                        </Modal.Header>
                        <Modal.Content
                            image
                        >
                            <Image
                                wrapped size='medium'
                                src={this.state.image}
                            />
                            <Modal.Description>
                                <h4>Birthdate:</h4>
                                <p>{this.state.birthdate}</p>
                                <h4>Allergies:</h4>
                                <p>{this.state.allergies}</p>
                                <h4>Medicine:</h4>
                                <p>{this.state.medication}</p>
                            </Modal.Description>
                        </Modal.Content>
                        <div align='center'>
                        <Button color='green' onClick={this.updateKid}>Edit</Button>
                        <Button color='red' onClick={this.closeKidModal}>Cancel</Button>
                        </div>
                    </Modal>


                </div>
            </>
        )
    }
};
const mapStateToProps = reduxStore => ({
    reduxStore
});
export default connect(mapStateToProps)(FamilyProfilePage);