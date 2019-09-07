import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Feed, Container, Header, Label, Progress, FeedContent } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Moment from 'react-moment';



class MyProfilePage extends Component {

    state = {
        color: '',
        total: ''
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_YOUR_FEED' });
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

        
        console.log(needHours)
        console.log(offeredHours)
        let total = ( needHours - offeredHours );
        console.log('total', total)
        return total;
    }



    render() {

        console.log('this is state', this.state)

        return (
            <>
            {/* {JSON.stringify(this.props.reduxStore)} */}
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
                    {this.props.reduxStore.feedNeed.map((item, i) => (
                    <div key={i}>
                        <Feed size='large'>
                            <Feed.Event>
                                <Feed.Label />
                                <Feed.Content>
                    <Feed.Date content= {<Moment format="MM/DD/YYYY">{item.event_date}</Moment>} />
                                    <Feed.Summary>
                                    {item.id === this.props.reduxStore.user.id ? 
                                    <p>{item.event_time_start} - {item.event_time_end}</p> 
                                    : 
                                    <p>{item.first_name1} is sitting for you at {item.event_time_start} - {item.event_time_end} </p> }
                                    </Feed.Summary>
    
                                </Feed.Content>
                            </Feed.Event>
                        </Feed>
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