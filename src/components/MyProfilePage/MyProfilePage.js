import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Feed, Container, Header, Label, Progress, Card, Message  } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Moment from 'react-moment';
import Swal from 'sweetalert2';




class MyProfilePage extends Component {

    state = {
        color: '',
        total: '',
        visible: false
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_YOUR_FEED' });
        this.props.dispatch({ type: 'FETCH_GROUP_NOTIFICATIONS',
         payload: {group_id: this.props.reduxStore.userGroups[0],
                    user_id: this. props.reduxStore.user.id} });

    }
    
   

    progressBar = () => {
        let feedNeed= this.props.reduxStore.feedNeed;
        let needHours = 0
        let offeredHours = 0
        for(let hour of feedNeed){
            // console.log(`this is hour, ${hour.needed_total_hours}` )
            if(hour === 'hour.needed_total_hours'){
                needHours += Number(hour.needed_total_hours)
            }
            if (hour.offered_totalhours) {
                offeredHours += Number(hour.offered_total_hours)
            }
        }
        // console.log(needHours)
        // console.log(offeredHours)
        let total = ( needHours - offeredHours );
        // console.log('total', total)
        return total;
    }

    handleConfirm = (item) => {
        Swal.fire({
            title: 'Are you sure you want to confirm this request?',
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
                    event_confirmed: true,
                };
                // let newObject = {
                //     id: item.id,
                //     claimer_id: this.props.reduxStore.family.id,
                //     event_claimed: true,
                //     event_date: item.event_date,
                //     event_time_start: item.event_time_start,
                //     event_time_end: item.event_time_end,
                //     last_name1: this.props.reduxStore.family.last_name1,
                //     claimer_notes: this.state.claimer_notes,
                //     group_id: this.props.reduxStore.userGroups[0],
                // }
                this.props.dispatch({ type: 'CONFIRM_EVENT', payload: newObject });

            } else if (response.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled Claim'
                )
            }
        })
        console.log('confirming event with this id:',item.id)

    }

    handleCancel = (item) => {
        console.log('confirming event with this id:', item.id)
        // let newObject = {
        //     id: item.id,
        //     //probs can just send req user id on server
        //     // claimer_id: this.props.reduxStore.user.id,
        //     event_confirmed: true,
        // };

        // this.props.dispatch({ type: 'CONFIRM_EVENT', payload: newObject });

    }


    render() {

        return (
            <>
                {/* <pre>{JSON.stringify(this.props.reduxStore, null, 2)}</pre> */}
                <Progress
                    value={this.progressBar()}
                    total='100'
                    progress='ratio'
                    label='Hours'
                    color={this.progressBar() > 50 ? 'green' : 'red'}
                />
                
               
                    <Header align="center"> {this.props.reduxStore.family.last_name1} Family</Header>
                    <Label>
                        Hours Used: 
                        <Label.Detail>
                            20
                        </Label.Detail>
                    </Label>
                    <Label>
                        Hours Banked:
    <Label.Detail>23</Label.Detail>

                    </Label>
                <h3 align="center">Feed</h3>
                <Container align="center" className='my_feed'>
                       {this.props.reduxStore.notifications && this.props.reduxStore.notifications.length > 0 ?
                    this.props.reduxStore.notifications.map((item) => {
                        if (item.event_claimed === true && item.event_confirmed === false) {
                       
                        return (
                            <>
                            <Card>
                                    <Feed>
                                        <Feed.Event>
                                            <Feed.Content>
                                {item.claimer_name} is available to help you out on {item.event_date} from {item.event_time_start} to {item.event_time_end}! &nbsp;
                                <button onClick={() => this.handleConfirm(item)}>CONFIRM</button><button onClick={() => this.handleCancel(item)}>CANCEL</button>
                                            </Feed.Content>
                                        </Feed.Event>
                                    </Feed>
                            </Card>
                            </>
                        
                        )}
                        else {
                            return(
                            <>
                            </>
                    )}
                    })
                    : <p></p>} 


                    {this.props.reduxStore.feedNeed.map((item, i) => (
                     <>
                                    <Card >
                                <Feed>
                                    <Feed.Event>
                                     <Feed.Content>
                                                <p>The {item.claimer_name} family is sitting for you on {item.event_date} at {item.event_time_start} - {item.event_time_end}.</p>
                                                <button onClick={() => this.handleCancel(item)}>CANCEL</button>  &nbsp;
                                        </Feed.Content>
                                    </Feed.Event>
                                </Feed>
                                </Card>
                            </>
            
                    ))}
                </Container>
            </>

        )
    }
};

const mapReduxStoreToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapReduxStoreToProps)(MyProfilePage);