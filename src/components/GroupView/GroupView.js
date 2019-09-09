import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image, Icon, Button, Feed, Modal, Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


class GroupView extends Component {

    componentDidMount() {
        // this.props.dispatch({ type: 'FETCH_FAMILY', payload: this.props.reduxStore.user.id })
        this.props.dispatch({ type: 'FETCH_GROUP', payload: this.props.reduxStore.userGroups[0]});
        this.props.dispatch({ type: 'FETCH_FAM_GROUP', payload: this.props.reduxStore.userGroups[0] });
    }

    viewFam = (item) => {
        console.log('view fam item', item)
        this.props.history.push(`/view/${item.user_id}`);
        
    }
    
    handleClaim = (item) => {
            let newObject = {
                id: this.props.reduxStore.family.id
                // claimer_id: this.props.reduxStore.user.id,
                event_claimed: true,
            }
            this.props.dispatch({ type: 'CLAIM_EVENT', payload: newObject });

    }

    

    seeCalendar = () => { this.props.history.push('/calendar') }

    render() {
    
        return (
            <div align="center">
                <h1 align="center">
                   Welcome to the {this.props.reduxStore.userGroups && this.props.reduxStore.userGroups.length > 0 ?
                     this.props.reduxStore.userGroups[0].group_name : <p></p>} group!
                </h1>
                <div>
                    <Button.Group size='small'>
                        <Button>EDIT</Button>
                        <Button.Or />
                        <Button>ADD MEMBERS</Button>
                    </Button.Group>
                </div>
                {/* <pre>{JSON.stringify(this.props.reduxStore, null, 2)}</pre> */}
                
                {this.props.reduxStore.group && this.props.reduxStore.group.length > 0 ?
                    this.props.reduxStore.group.map((item) => {
                        if (item.event_claimed === false) {
                       
                        return (
                            <>
                            <Card>
                                    <Card.Content>

                            <Feed>
                        <Feed.Event>
                            <Feed.Label>
                            </Feed.Label>
                            <Feed.Content>
                                 The {item.requester_name} family needs a sitter on {item.event_date} from {item.event_time_start} - {item.event_time_end}. &nbsp;
                                 <></>             
                                                    <Modal trigger={<Button basic color='blue'>CLAIM</Button>}>
                                                        <Modal.Header>{item.event_time_start} - {item.event_time_end} on {item.event_date}</Modal.Header>
                                                        <Modal.Content image>
                                                            <Image wrapped size='facebook' src={item.requester_image ? item.requester_image : <>No</>}/>
                                                            
                                                                <h5>Are you sure you want to deal with us?</h5>
                                                            <Button class="circular icon" size="mini" basic color='green' onClick={() => this.handleClaim(item)}>CLAIM</Button><br/><Button size="mini"  basic color='red'>CANCEL</Button>
                                                        
                                                        </Modal.Content>
                                                    </Modal>
                                                    
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                                        </Card.Content>

                     </Card>
                            </>
                        )}
                        else {
                            return(
                            <>
                            <Card>
                                <Feed>
                                    <Feed.Event>
                                        <Feed.Label>
                                        </Feed.Label>
                                        <Feed.Content>
                                            <Feed.Label>
                                                {/* <img src={item.claimer_image} alt="lol" /> */}
                                            </Feed.Label>
                                               The {item.claimer_name} family has agreed to help the {item.requester_name} family on {item.event_date} from {item.event_time_start} - {item.event_time_end}. &nbsp;
                    
                                        </Feed.Content>
                                    </Feed.Event>
                                </Feed>
                                </Card>
                            </>
                    )}
                    })
                    : <p></p>} 
               
                <div>
                    <Button onClick={(event) => this.seeCalendar()} icon labelPosition='right'>
                        View Calendar
      <Icon name='calendar' />
                    </Button>
                </div>
                
                {this.props.reduxStore.groupFam && this.props.reduxStore.groupFam.length > 0 ?
                    
                    
                    
                        this.props.reduxStore.groupFam.map((item) => {
                            return (
                                <>
                                    <Card key={item.id} onClick={() => this.viewFam(item)}>
                                        <Image wrapped size='medium' src={item.image} />
                                    <Card.Content>
                                        <Card.Header>{item.last_name1} Family</Card.Header>
                                    </Card.Content>
                                    </Card>
                                </>

                            )
                        })
                    
                    : <p></p>} 


            </div>
        )
    }
};

const mapReduxStoreToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapReduxStoreToProps)(GroupView);