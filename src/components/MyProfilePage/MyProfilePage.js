import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Feed, Container, Header, Label, Progress, Card, Message  } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Moment from 'react-moment';



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
        console.log('confirming event with this id:',item.id)
        let newObject = {
            id: item.id,
            event_confirmed: true,
        };
        this.props.dispatch({ type: 'CONFIRM_EVENT', payload: newObject });

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
                <pre>{JSON.stringify(this.props.reduxStore, null, 2)}</pre>
                <Progress
                    value={this.progressBar()}
                    total='100'
                    progress='ratio'
                    label='Hours'
                    color={this.progressBar() > 50 ? 'green' : 'red'}
                />
                
                <Container text className='my_feed'>
                    <Header as='h1'> {this.props.reduxStore.family.last_name1} Family</Header>
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


                       {this.props.reduxStore.notifications && this.props.reduxStore.notifications.length > 0 ?
                    this.props.reduxStore.notifications.map((item) => {
                        if (item.event_claimed === true && item.event_confirmed === false) {
                       
                        return (
                            
                            <Card>
                                {item.claimer_name} is available to help you out on {item.event_date} from {item.event_time_start} to {item.event_time_end}! &nbsp;
                                <button onClick={() => this.handleConfirm(item)}>CONFIRM</button><button onClick={() => this.handleCancel(item)}>CANCEL</button>
                            </Card>
                        
                        )}
                        else {
                            return(
                            <>
                            </>
                    )}
                    })
                    : <p></p>} 


                    {this.props.reduxStore.feedNeed.map((item, i) => (
                    <div key={i}>
                          <>
                                    <Card >
                                <Feed>
                                    <Feed.Event>
                                        <Feed.Label>
                                        </Feed.Label>
                                        <Feed.Content>
                                            <Feed.Label>
                                                {/* <img src={item.claimer_image} alt="lol" /> */}
                                            </Feed.Label>
                                                <p>The {item.claimer_name} family is sitting for you on {item.event_date} at {item.event_time_start} - {item.event_time_end}.</p>  &nbsp;
                      
                                        </Feed.Content>
                                    </Feed.Event>
                                </Feed>
                                </Card>
                            </>
                        {/* <Feed size='large'>
                            <Feed.Event>
                                <Feed.Label />
                                <Feed.Content>
                    <Feed.Date content= {<Moment format="MM/DD/YYYY">{item.event_date}</Moment>} />
                                    <Feed.Summary>
                                    {item.id === this.props.reduxStore.user.id ? 
                                    <p>{item.event_time_start} - {item.event_time_end}</p> 
                                    : 
                                    <p>The {item.claimer_name} family is sitting for you on {item.event_date} at {item.event_time_start} - {item.event_time_end}.</p> }
                                    </Feed.Summary>
    
                                </Feed.Content>
                            </Feed.Event>
                        </Feed> */}
                    </div>
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