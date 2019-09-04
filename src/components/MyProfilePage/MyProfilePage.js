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

        let needHours = this.props.reduxStore.feedNeed.needed_total_hours;
        let offeredHours = this.props.reduxStore.feedNeed.offered_total_hours;
        let total = ( needHours - offeredHours );
    
        return total;
    }



    render() {

        let need = this.props.reduxStore.feedNeed;
        let offered = this.props.reduxStore.feedOffered;
        let image = '/images/avatar/small/jenny.jpg'
        let date = <Moment format="MM/DD/YYYY">{need.offered_date}</Moment>;
        let summary = need.need_start
        let summary2 = need.need_end

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
                
                <Container text className='my_feed'>
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

                            <Feed.Event>
                                <Feed.Label />
                                <Feed.Content>
                                    <Feed.Date content={date} />
                                    <Feed.Summary> Sitting: {summary} - {summary2}</Feed.Summary>
    
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