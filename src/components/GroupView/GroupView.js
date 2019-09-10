import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image, Icon, Button, Feed, Modal, Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Swal from 'sweetalert2';


class GroupView extends Component {

    componentDidMount() {
        // this.props.dispatch({ type: 'FETCH_FAMILY', payload: this.props.reduxStore.user.id })
        this.props.dispatch({ type: 'FETCH_GROUP', payload: this.props.reduxStore.userGroups[0]});
        this.props.dispatch({ type: 'FETCH_FAM_GROUP', payload: this.props.reduxStore.userGroups[0] });
    }

    state = {
        event_date: new Date(),
        event_time_start: new Date(),
        event_time_end: new Date(),
        open: false,
        request_id: '',
        notes: '',
        offer_needed: true,
        claimer_notes: '',
        claimer_id: '',
        groud_id: '',
    };


    viewFam = (item) => {
        console.log('view fam item', item)
        this.props.history.push(`/view/${item.user_id}`);
        
    }

    handleCancel = (item) => {
        console.log('IN GROUP VIEW / HANDLE CANCEL WITH ITEM:', item)
        let objectToSend = {
            event_date: item.event_date,
            event_time_start: item.event_time_start,
            event_time_end: item.event_time_end,
            requester_name: item. requester_name,
            id: item.id,
            group_id: this.props.reduxStore.userGroups[0],
        }
        this.props.dispatch({type: 'CANCEL_REQUEST', payload: objectToSend})
    }
    
    // handleClaim = (item) => {
    //         let newObject = {
    //             id: this.props.reduxStore.family.id,
    //             // claimer_id: this.props.reduxStore.user.id,
    //             event_claimed: true
    //         }
    //         this.props.dispatch({ type: 'CLAIM_EVENT', payload: newObject });
    // }

    handleClaim = (item) => {
        console.log('in handle Claim', item)
        let inputValue = this.state.claimer_notes;
        Swal.fire({
            title: 'Are you sure you want to claim this request?',
            type: 'question',
            html:
                '<input style="width: 300px; outline: none; border: solid #c9dae1 2px; border-radius: 3px; padding: 5px;" placeholder="Add Notes (optional)" id="swal-input1">',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, claim it!'
        }).then((response) => {
            if (response.value) {
                this.setState({
                    claimer_notes: document.getElementById('swal-input1').value
                })
                let newObject = {
                    id: item.id,
                    claimer_id: this.props.reduxStore.family.id,
                    event_claimed: true,
                    event_date: item.event_date,
                    event_time_start: item.event_time_start,
                    event_time_end: item.event_time_end,
                    last_name1: this.props.reduxStore.family.last_name1,
                    claimer_notes: this.state.claimer_notes,
                    group_id: this.props.reduxStore.userGroups[0],
                }
                this.props.dispatch({ type: 'CLAIM_EVENT', payload: newObject })
            } else if (response.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled Claim'
                )
            }
        })
    }  

    

    seeCalendar = () => { this.props.history.push('/calendar') }

    render() {
    
        return (
            <div align="center" >
                {/* {JSON.stringify(this.props.reduxStore.family)} */}
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
                {/* the group reducer actually holds requests relevant to group */}
                {this.props.reduxStore.group && this.props.reduxStore.group.length > 0 ?
                    this.props.reduxStore.group.map((item) => {
                        if (item.event_claimed === false && item.requester_name === this.props.reduxStore.family.last_name1) 
                        {
                            return (
                                <>
                                    <Card >
                                        <Feed>
                                            <Feed.Event>
                                                <Feed.Label>
                                                </Feed.Label>
                                                <Feed.Content>
                                                    The {item.requester_name} family needs a sitter on {item.event_date} from {item.event_time_start} - {item.event_time_end}. &nbsp;
                                 <></>
                                                    {<Button basic color='red' onClick={() => this.handleCancel(item)}>Cancel</Button>}
                                                </Feed.Content>
                                            </Feed.Event>
                                        </Feed>
                                    </Card>
                                </>
                            )
                      }
                        else if (item.event_claimed === false && item.requester_name !== this.props.reduxStore.family.last_name1) 
                         {
                            return (
                                <>
                                    <Card >
                                        <Card.Content>
                                            <Feed>
                                                <Feed.Event>
                                                    <Feed.Content>
                                                        The {item.requester_name} family needs a sitter on {item.event_date} from {item.event_time_start} - {item.event_time_end}. &nbsp;
                                 <></>
                                                        {<Button basic color='blue' onClick={() => this.handleClaim(item)}>CLAIM</Button>}
                                                    </Feed.Content>
                                                </Feed.Event>
                                            </Feed>
                                        </Card.Content>
                                    </Card>
                                </>
                            )
                           
                        }
                        else if (item.event_claimed === true)
                        {
                            return(
                            <>
                                    <Card >
                                <Feed>
                                    <Feed.Event>
                                        <Feed.Label>
                                        </Feed.Label>
                                        <Feed.Content>
                                               The {item.claimer_name} family has agreed to help the {item.requester_name} family on {item.event_date} from {item.event_time_start} - {item.event_time_end}. &nbsp;
                                        </Feed.Content>
                                    </Feed.Event>
                                </Feed>
                                </Card>
                            </>
                    )}
                    })
                    : <p></p>} 
               
               <h3>Calendar</h3>
                <div>
                    <Button onClick={(event) => this.seeCalendar()} icon labelPosition='right'>
                        View Calendar
      <Icon name='calendar' />
                    </Button>
                </div>
                
                <h3>Members</h3>
                {this.props.reduxStore.groupFam && this.props.reduxStore.groupFam.length > 0 ?
                    
                    
                    
                        this.props.reduxStore.groupFam.map((item) => {
                            return (
                                <>
                                    <Card className="car" key={item.id} onClick={() => this.viewFam(item)}>
                                        <Image wrapped size='medium' src={item.image}  />
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