import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image, Icon, Button, Feed } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class GroupView extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_FAMILY', payload: this.props.reduxStore.user.id })
        this.props.dispatch({ type: 'FETCH_GROUP', payload: this.props.reduxStore.userGroups[0]});

    }

    grabName = (object) => {
    console.log(object)
    }
    

    seeCalendar = () => { this.props.history.push('/calendar') }

    render() {
        console.log('family.id:',this.props.reduxStore.family.id)
        console.log('family.id:' + this.props.reduxStore.userGroups)

        
        return (
            <div>
                <h1>
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
                <pre>{JSON.stringify(this.props.reduxStore, null, 2)}</pre>
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
                
                {this.props.reduxStore.group && this.props.reduxStore.group.length > 0 ?
                    
                    
                    
                        this.props.reduxStore.group.map((item) => {
                            console.log(item)
                            return (
                                <>
                                    <Card key={item.id}>
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