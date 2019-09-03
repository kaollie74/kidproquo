import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Feed, Container, Header, Label } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const image = '/images/family.jpg'
const date = '3 days ago'
const summary = 'Sitting:'
const extraText = "9/20 Johnson's 5-9 PM"

class MyProfilePage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_YOUR_FEED'});
    }
    render() {
        return (
            <Container text>
                <Header as='h1'>Johnson Family</Header>  
            <Label>
                Hours Used:
    <Label.Detail>20</Label.Detail>
            </Label>
            <Label>
                Hours Banked:
    <Label.Detail>23</Label.Detail>
            </Label>
                <div>
                    <Feed size='large'>
                        <Feed.Event
                            image={image}
                            date={date}
                            summary={summary}
                            extraText={extraText}
                        />

                        <Feed.Event>
                            <Feed.Label image={image} />
                            <Feed.Content date={date} summary={summary} extraText={extraText} />
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

        )
    }
};

const mapReduxStoreToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapReduxStoreToProps)(MyProfilePage);