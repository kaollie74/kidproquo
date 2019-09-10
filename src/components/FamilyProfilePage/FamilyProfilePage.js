import React, { Component } from 'react';
import { connect } from 'react-redux';
import Coverflow from 'react-coverflow';
import 'semantic-ui-css/semantic.min.css'
import { Button, Icon, Card, Image, Modal, Responsive, Segment, Form } from 'semantic-ui-react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";



class FamilyProfilePage extends Component {

    state = {
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

    openModal = () => {

        console.log('in openModal')
        this.setState({
            open: !this.state.open
        })
    }

    updateKid = (event, item) => {
        this.props.dispatch({ type: 'UPDATE_KID', payload: item })
        this.props.history.push('/kid-page')
    }
    render() {
        return (
            <>

                <div>
                    {/* {JSON.stringify(this.props.reduxStore)} */}
                    <h1 align="center">
                        The {this.props.reduxStore.family.last_name1} Family
                    </h1>
                </div>
                &nbsp;
            <div align="center">
                    <Card>
                        <Card.Content>
                            <Card.Header> </Card.Header>
                            {/* <Card.Meta><span>The Olson family</span></Card.Meta> */}
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
                <div align="center">
                    <Card>
                        <h4 align="center">
                            Kids
                </h4>
                        <div>
                            <Coverflow
                                width={300}
                                height={300}
                                displayQuantityOfSide={1}
                                navigation={false}
                                enableHeading={false}
                                swipeable={true}
                                enableScroll={true}
                                clickable={true}
                                infiniteScroll={false}
                                dots={true}
                            >
                                <div
                                    // onClick={() => this.handleChangeFor()}
                                    onClick={this.openModal}
                                    onKeyDown={this.openModal}
                                    // onKeyDown={() => this.handleChangeFor()}
                                    role="menuitem"
                                    tabIndex="0"
                                ></div>
                                {this.props.reduxStore.kid.map((item, i) => {
                                    console.log(item)
                                    return (
                                        <>
                                            <Card key={item.id}>
                                                <Card.Content>
                                                    <Image className='ui centered small image' src={item.image} alt="img 1" />
                                                    <Card.Header align="center">{item.first_name}</Card.Header>
                                                    <Modal
                                                     trigger={<Button align="center">{item.first_name}</Button>}
                                                    >
                                                        <Modal.Header>
                                                            {item.first_name}
                                                            {item.last_name}
                                                        </Modal.Header>
                                                        <Modal.Content
                                                            image
                                                        >
                                                            <Image
                                                                wrapped size='medium'
                                                                src={item.image}
                                                            />
                                                            <Modal.Description>
                                                                <h4>Birthdate:</h4>
                                                                <p>{item.birthdate}</p>
                                                                <h4>Allergies:</h4>
                                                                <p>{item.allergies}</p>
                                                                <h4>Medicine:</h4>
                                                                <p>{item.medication}</p>
                                                            </Modal.Description>
                                                        </Modal.Content>
                                                        <Button color='green' onClick={(event) => this.updateKid(event, item)}>Edit</Button>
                                                        <Button color='red' onClick={this.closeKidModal}>Cancel</Button>
                                                    </Modal>
                                                </Card.Content>

                                            </Card>
                                        </>
                                    )
                                })}
                            </Coverflow>
                        </div>
                    </Card>

                    <Carousel
                        showArrows={true} width='50%' height='50%'
                        autoPlay={true}
                        stopOnHover={true}
                        swipeable={true}
                        infiniteLoop={true}
                        onClickItem={this.openModal}

                    >

                        {this.props.reduxStore.kid.map(item => (
                            <div key={item.id}>
                                <img src={item.image}
                                />


                            </div>
                        ))}


                    </Carousel>
                </div>
            </>
        )
    }
};
const mapStateToProps = reduxStore => ({
    reduxStore
});
export default connect(mapStateToProps)(FamilyProfilePage);