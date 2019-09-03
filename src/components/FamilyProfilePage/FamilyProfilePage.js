import React, { Component } from 'react';
import { connect } from 'react-redux';
import Coverflow from 'react-coverflow';
import 'semantic-ui-css/semantic.min.css'
import { Button, Icon, Card, Image, Modal, Responsive, Segment, Form } from 'semantic-ui-react';



// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class FamilyProfilePage extends Component {

    componentDidMount(){
        this.props.dispatch({ type:'FETCH_FAMILY', payload: this.props.reduxStore.user.id})
    }



    render() {
        return (
            <>
            <div>
                {JSON.stringify(this.props.reduxStore)}
                <h1>
                   This is Family Profile Page
                </h1>
            </div>
            <div>
                <Coverflow
                    width={960}
                    height={480}
                    displayQuantityOfSide={2}
                    navigation={true}
                    enableHeading={false}
                    swipeable={true}
                >
                    <div
                        onClick={() => this.handleChangeFor()}
                        onKeyDown={() => this.handleChangeFor()}
                        role="menuitem"
                        tabIndex="0"
                    ></div>
                    <Card>
                        <Image className='ui centered small image' src="images/logo192.png" alt="img 1" />
                        <Card.Content>
                            <Card.Header>Kyle</Card.Header>
                            <Card.Meta><span>The Olson family</span></Card.Meta>
                            <Card.Description>
                                Kyle is allergic to nothing
                            </Card.Description>
                        </Card.Content>
                    </Card>
                    <img src="images/logo192.png" alt="img 1" />
                    <img src="images/logo192.png" alt='img2' />
                    <img src="images/logo192.png" alt='img3' />
                </Coverflow>
            </div>
            </>
        )
    }
};

const mapStateToProps = reduxStore => ({
    reduxStore
});

export default connect(mapStateToProps)(FamilyProfilePage);