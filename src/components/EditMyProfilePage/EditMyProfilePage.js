import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'semantic-ui-css/semantic.min.css'
import { Button, Icon, Card, Image, Modal, Responsive, Segment, Form, Input } from 'semantic-ui-react';



class EditMyProfilePage extends Component {



    state = {
        city: this.props.reduxStore.family.city,
        email: this.props.reduxStore.family.email,
        family_passcode: this.props.reduxStore.family.family_passcode,
        first_name1: this.props.reduxStore.family.first_name1,
        first_name2: this.props.reduxStore.family.first_name2,
        group_id: this.props.reduxStore.family.group_id,
        id: this.props.reduxStore.family.id,
        image: this.props.reduxStore.family.image,
        last_name1: this.props.reduxStore.family.last_name1,
        last_name2: this.props.reduxStore.family.last_name2,
        phone_number: this.props.reduxStore.family.phone_number,
        state: this.props.reduxStore.family.state,
        street_address: this.props.reduxStore.family.street_address,
        user_id: this.props.reduxStore.family.user_id,
        zip_code: this.props.reduxStore.family.zip_code
    }

    render() {
        return (
            <div>
                
                <Card className="align">
                    <Card.Content>
                        <Card.Header></Card.Header>
                        {/* <Card.Meta><span>The Olson family</span></Card.Meta> */}
                        <Image className="ui fluid image" src="https://www.roundlakedentistry.com/wp-content/uploads/2016/09/generic-family-at-table.jpg" alt="img 1" />
                        <Icon name='pencil alternate' size="large" onClick={this.editFamilyProfile} />
                    </Card.Content>
                </Card>
                <div>
                    <Button>Add Kid</Button>
                    <Button>Save Changes</Button>
                    
                </div>
            </div>
        )
    }
};

const mapStateToProps = reduxStore => ({
    reduxStore
});

export default connect(mapStateToProps)(EditMyProfilePage);