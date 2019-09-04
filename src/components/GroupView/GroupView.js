import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image, Icon, Button, Feed } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class GroupView extends Component {

    // componentDidMount() {
    //     this.props.dispatch({ type: 'FETCH_GROUP' });
    // }

    seeCalendar = () => { this.props.history.push('/calendar') }

    render() {
        return (
            <div>
                <h1>
                    Whittier Group
                </h1>
                <div>
                    <Button.Group size='small'>
                        <Button>EDIT</Button>
                        <Button.Or />
                        <Button>ADD MEMBERS</Button>
                    </Button.Group>
                </div>
                <div>
                    <Feed>
                        <Feed.Event>
                            <Feed.Label>
                                <img src='/images/family.jpg' alt="lol" />
                            </Feed.Label>
                            <Feed.Content>
                                Johnson Family needs a sitter on 10/2/19 from 5:00pm - 9:00pm <p>Whittier Group</p> 
                                <Button basic color='blue'>
                                    CLAIM
                                </Button>
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                </div>
                <div>
                    <Feed>
                        <Feed.Event>
                            <Feed.Label>
                                <img src='/images/family.jpg' alt="lol"/>
                            </Feed.Label>
                            <Feed.Content>
                                Olson Family needs a sitter on 10/9/19 from 5:00pm - 9:00pm <p>Whittier Group</p>
                                <Button basic color='blue'>
                                    CLAIM
                                </Button>
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                </div>
                <div>
                    <Feed>
                        <Feed.Event>
                            <Feed.Label>
                                <img src='/images/family.jpg' alt="lol"/>
                            </Feed.Label>
                            <Feed.Content>
                                Flavin Family needs a sitter on 10/16/19 from 5:00pm - 9:00pm <p>Whittier Group</p>
                                <Button basic color='blue'>
                                    CLAIM
                                </Button>
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                </div>
                <div>
                    <Button onClick={(event) => this.seeCalendar()} icon labelPosition='right'>
                        View Calendar
      <Icon name='calendar' />
                    </Button>
                </div>
                <Card>
                    <Image src='/images/family.jpg' wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>Johnson Family</Card.Header>
                        
                    </Card.Content>
                    <Card.Content extra>
                        <p>
                            <Icon name='user' />
                            Whittier Group
      </p>
                    </Card.Content>
                </Card>

                <Card>
                    <Image src='/images/family2.jpg' wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>Olson Family</Card.Header>
                        <Card.Meta>
                            <span className='date'>Joined in 2019</span>
                        </Card.Meta>
                        <Card.Description>
                            The Olson's are a family and stuff.
      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <p>
                            <Icon name='user' />
                            Whittier Group
      </p>
                    </Card.Content>
                </Card>


            </div>
        )
    }
};

const mapReduxStoreToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapReduxStoreToProps)(GroupView);