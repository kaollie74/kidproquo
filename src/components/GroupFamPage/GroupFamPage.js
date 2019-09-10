import React, { Component } from 'react';
import { connect } from 'react-redux';
import Coverflow from 'react-coverflow';
import 'semantic-ui-css/semantic.min.css'
import { Button, Icon, Card, Image, Modal, Responsive, Segment, Form } from 'semantic-ui-react';



class GroupFamPage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_FAMILY', payload: this.props.match.params.id})
        this.props.dispatch({ type: 'FETCH_KIDS', payload: this.props.match.params.id })
    }

    editFamilyProfile = () => {

        this.props.history.push('/edit-my-profile');
    }

    handleBack = () => {
        this.props.history.push('/group-view');
    }

    render() {
        return (
            <>
                <div>
                    {/* {JSON.stringify(this.props.reduxStore)} */}
                    <h1 align="center">
                        The {this.props.reduxStore.family.last_name1}
                    </h1>
                </div>
                &nbsp;
            <div align="center">
                    <Card>
                        <Card.Content>
                            <Card.Header> </Card.Header>
                            {/* <Card.Meta><span>The Olson family</span></Card.Meta> */}
                            <Image className='ui centered medium image' src={this.props.reduxStore.family.image ? this.props.reduxStore.family.image: <>no</> } alt="img 1" />
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
                            >
                                <div
                                    onClick={() => this.handleChangeFor()}
                                    onKeyDown={() => this.handleChangeFor()}
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
                                                    <Modal trigger={<Button align="center"></Button>}>
                                                        <Modal.Header>{item.first_name} {item.last_name}</Modal.Header>
                                                        <Modal.Content image>
                                                            <Image wrapped size='medium' src={item.image} />
                                                            <Modal.Description>
                                                                <h4>Birthdate:</h4>
                                                                <p>{item.birthdate}</p>
                                                                <h4>Allergies:</h4>
                                                                <p>{item.allergies}</p>
                                                                <h4>Medicine:</h4>
                                                                <p>{item.medication}</p>
                                                            </Modal.Description>
                                                        </Modal.Content>
                                                    </Modal>
                                                </Card.Content>
                                            </Card>
                                        </>

                                    )
                                })}

                            </Coverflow>
                        </div>
                    </Card>
                </div>
                <Button variant="contained" color="primary" onClick={this.handleBack}>Back</Button>

            </>
        )
    }
};

const mapStateToProps = reduxStore => ({
    reduxStore
});

export default connect(mapStateToProps)(GroupFamPage);
