import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Feed, Container, Header, Label, Progress } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Moment from 'react-moment';

 const image = '/images/family.jpg'
const date = '3 days ago'
const summary = 'Sitting:'
const extraText = "9/20 Johnson's 5-9 PM"

class MyProfilePage extends Component {

    state = {
        color: '',
        total: ''
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_YOUR_FEED' });
    }

    progressBar = () => {
        let needHours = this.props.reduxStore.feedNeed.total_hours;
        let offeredHours = this.props.reduxStore.feedOffered.total_hours;
        let total = (offeredHours - needHours);

        return total;
    }



    render() {

        let need = this.props.reduxStore.feedNeed;
        let offered = this.props.reduxStore.feedOffered;

        console.log('this is state', this.state)

        return (
            <>
                <Progress
                    value={this.progressBar()}
                    total='100'
                    progress='ratio'
                    label='Hours'
                    color={this.progressBar() > 50 ? 'green' : 'red'}
                />

                <Container text>
                    <Header as='h1'>Johnson Family</Header>
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
                    <div>
                        <Feed size='large'>
                            <Feed.Event
                                image={image}
                                date= {<Moment format="MM/DD/YYYY">{offered.event_date}</Moment>}

                                summary={summary}

                                extraText= {offered.event_time_start} 
                                

                            />

                            <Feed.Event>
                                <Feed.Label image={image} />
                                <Feed.Content  date= {<Moment format="MM/DD/YYYY">{offered.event_date}</Moment>}  summary={summary} extraText={offered.event_time_start} />
                            </Feed.Event>

                            <Feed.Event>
                                <Feed.Label image={image} />
                                <Feed.Content>
                                    <Feed.Date content={date} />
                                    <Feed.Summary content={summary} />
                                    <Feed.Extra text content={extraText} />
                                </Feed.Content>
                            </Feed.Event>
                        </Feed>
                    </div>
                </Container>
            </>

        )
    }
};

const mapReduxStoreToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapReduxStoreToProps)(MyProfilePage);