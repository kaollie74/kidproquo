import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Feed, Container, Header, Label, Progress, Card, Button, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import './MyProfile.css';



class MyProfilePage extends Component {

    state = {
        color: '',
        total: '',
        visible: false,
        minutesUsed: '',
        minutesGained: '',
        hours_used: '',
        hours_gained: '',
        total_hours: '',
    }

    componentDidMount() {
       console.log( 'userFAM:', this.props.reduxStore.userFamily)
     
        this.props.dispatch({
            type: 'FETCH_GROUP_NOTIFICATIONS',
            payload: {
                group_id: this.props.reduxStore.userGroups[0],
                user_id: this.props.reduxStore.user.id
            }
        });
        this.props.dispatch({ type: 'FETCH_HOURS_USED', payload: this.props.reduxStore.userFamily.id });
        this.props.dispatch({ type: 'FETCH_HOURS_GAINED', payload: this.props.reduxStore.userFamily.id });
        // this.props.dispatch({ type: 'FETCH_FAMILY', payload: this.props.reduxStore.user.id })
        // this.props.dispatch({ type: 'FETCH_HOURS_USED', payload: this.props.reduxStore.family.id });
        // this.props.dispatch({ type: 'FETCH_HOURS_GAINED', payload: this.props.reduxStore.family.id });
    }


    // handleEquityHoursUsedOne = () => {
    //     let array = this.props.reduxStore.notifications;
    //     console.log('IN HANDLE EQUITY 1 WITH:', array);
    //     let minutesUsed = 0;
    //     let minutesGained = 0;
    //     // CALCULATE TOTAL MINUTES USED
    //     for (let item of array ){
    //         if (this.props.reduxStore.family.id === item.requester_id && item.offer_needed === false && item.event_confirmed === true){
    //             minutesUsed += Number(item.total_hours);
    //             console.log(item)
    //             console.log('IN FIRST LOOP WITH:', minutesUsed)
    //         }}
    //     for (let item of array) {
    //         if (this.props.reduxStore.family.id === item.claimer_id && item.offer_needed === true && item.event_confirmed === true){
    //             minutesUsed += Number(item.total_hours);
    //             console.log(item)
    //             console.log('IN SECOND LOOP WITH:', minutesUsed)
    //         }}
    //     let totalMinutesUsed = minutesUsed;
    //     this.setState({
    //         minutesUsed: totalMinutesUsed
    //     })
    //     console.log('IN FUNCTION WITH TOTAL MINUTES USED:', totalMinutesUsed)
    //     // CALCULATE TOTAL MINUTES GAINED
    //     for (let item of array) {
    //         if (this.props.reduxStore.family.id === item.requester_id && item.offer_needed === true && item.event_confirmed === true){
    //             minutesGained += Number(item.total_hours);
    //             console.log(item)
    //             console.log('IN THIRD LOOP WITH:', minutesGained)
    //         }}
    //     for (let item of array) {
    //         if (this.props.reduxStore.family.id === item.claimer_id && item.offer_needed === false && item.event_confirmed === true){
    //                 minutesGained += Number(item.total_hours);
    //                 console.log(item)
    //                 console.log('IN FOURTH LOOP WITH:', minutesGained)
    //             }}
    //     let totalMinutesGained = minutesGained;
    //     this.setState({
    //         minutesGained: totalMinutesGained
    //     })
    // }

    // handleEquityHoursGainedOne = () => {
    //     let array = this.props.reduxStore.notifications;
    //     console.log('IN HANDLE EQUITY 3 WITH:', array);
    //     let minutesGained = this.state.minutesGained;
    //     for (let item of array) {
    //         if (this.props.reduxStore.family.id === item.requester_id && item.offer_needed === true && item.event_confirmed === true){
    //             minutesGained += Number(item.total_hours);
    //             console.log(item)
    //             console.log('IN THIRD LOOP WITH:', minutesGained)
    //             this.setState({
    //                 minutesGained: minutesGained
    //             })
    //         }}
    //     this.handleEquityHoursGainedTwo();
    // }

    // handleEquityHoursGainedTwo = () => {
    //     let array = this.props.reduxStore.notifications;
    //     console.log('IN HANDLE EQUITY 4 WITH:', array);
    //     let minutesUsed = this.state.minutesUsed;
    //     let minutesGained = this.state.minutesGained;
    //     for (let item of array) {
    //         if (this.props.reduxStore.family.id === item.claimer_id && item.offer_needed === false && item.event_confirmed === true){
    //                 minutesGained += Number(item.total_hours);
    //                 console.log(item)
    //                 console.log('IN FOURTH LOOP WITH:', minutesGained)
    //                 this.setState({
    //                     minutesGained: minutesGained
    //                 })
    //             }}
    // }


    // progressBar = () => {
    //     let feedNeed= this.props.reduxStore.feedNeed;
    //     let needHours = 0
    //     let offeredHours = 0
    //     for(let hour of feedNeed){
    //         // console.log(`this is hour, ${hour.needed_total_hours}` )
    //         if(hour === 'hour.needed_total_hours'){
    //             needHours += Number(hour.needed_total_hours)
    //         }
    //         if (hour.offered_totalhours) {
    //             offeredHours += Number(hour.offered_total_hours)
    //         }
    //     }
    //     // console.log(needHours)
    //     // console.log(offeredHours)
    //     let total = ( needHours - offeredHours );
    //     // console.log('total', total)
    //     return total;
    // }

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
                    group_id: this.props.reduxStore.userGroups[0],
                    user_id: this.props.reduxStore.user.id
                };
                this.props.dispatch({ type: 'CONFIRM_EVENT', payload: newObject });
                //Twilio
                let textMessage = {
                    claimer_phone: item.claimer_number,
                    requester_name: this.props.reduxStore.family.last_name1,
                    event_date: item.event_date,
                    event_time_start: item.event_time_start,
                    event_time_end: item.event_time_end,
                }
                console.log('this is the text message object in CONFIRM event', textMessage)

                //Twilio
                this.props.dispatch({ type: 'SEND_CONFIRM_TEXT', payload: textMessage });

            } else if (response.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled Confirm'
                )
            }
        })
        console.log('confirming event with this id:', item.id)
    }

    handleCancel = (item) => {
        console.log('cancel event with this id:', item.id)
        let newObject = {
            id: item.id,
            group_id: this.props.reduxStore.userGroups[0],
            user_id: this.props.reduxStore.user.id
        };

        this.props.dispatch({ type: 'CANCEL_CONF_REQUEST', payload: newObject })
        //Twilio
        let textMessage = {
            claimer_phone: item.claimer_number,
            claimer_name: this.props.reduxStore.family.last_name1,
            event_date: item.event_date,
            event_time_start: item.event_time_start,
            event_time_end: item.event_time_end,
        }
        console.log('this is the text message object in CANCEL event', textMessage)

        //Twilio
        this.props.dispatch({ type: 'SEND_CANCEL_TEXT', payload: textMessage });

    }


    render() {

        // console.log('this is STATE IN MY PROFILE PAGE VIEW:', this.state)
        console.log('IN PROFILE WITH:', this.props.reduxStore.hoursUsed, this.props.reduxStore.hoursGained)
        let hours_used = (this.props.reduxStore.hoursUsed.hours_used / 60).toFixed(1);
        let hours_gained = (this.props.reduxStore.hoursGained.hours_gained / 60).toFixed(1);
        let total_hours = Number(hours_gained - hours_used).toFixed(1);
        // console.log('IN PROFILE WITH TOTAL HOURS:', hours_used, hours_gained, total_hours)
                    return (

            <>
                <pre>{JSON.stringify(this.props.reduxStore.userFamily, null, 2)}</pre>
                {/* <Progress
                    value={this.handleEquity()}
                /> */}
                <h1 style={{textAlign: 'center'}}> The {this.props.reduxStore.family.last_name1} Profile </h1>
                <h3 style={{textAlign: 'center'}}> Equity</h3>
                <div className="slidecontainer">
                        <p className="negative"> - </p><input type="range" min="-20" max="20" value={total_hours} className={total_hours >= 0 ? "GreenSlider" : "RedSlider"} id="myRange"></input><p className="positive">+</p>
                    </div>
                    <div className="totalHours">
                        <div className="hoursUsed">
                        <p style={{fontWeight: 'bold'}}> Hours Used: {hours_used} </p>
                    </div>
                    <div className="hoursBanked">
                        <p style={{fontWeight: 'bold'}}> Hours Gained: {hours_gained} </p>
                    </div>
                </div>
                <hr style={{ backgroundColor: '#8298ca', width: '80%', borderRadius: '5px', height: '5px', border: 'none', marginTop: '30px', marginBottom: '30px' }} />
                {/* <Button onClick={()=> this.handleEquityHoursUsedOne()}>EQUITY</Button> */}

                {/* <Header align="center"> {this.props.reduxStore.family.last_name1} Family</Header>
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
                 */}
                <Container align="center" className='my_feed'>
                    <h3 align="center"> YOUR CLAIMED REQUESTS</h3>
                    {this.props.reduxStore.notifications && this.props.reduxStore.notifications.length > 0 ?

                        this.props.reduxStore.notifications.map((item) => {
                            // -------------------------------------------------- USER/FAMILY CLAIMED AN EVENT ---------------------------------------------------------------

                            // ------------------  NOT CONFIRMED ---------------------------
                            // care is NEEDED
                            if (item.claimer_id === this.props.reduxStore.family.id && item.event_confirmed === false && item.offer_needed === false) {
                                return (
                                    <>
                                        <Card>
                                            <Feed style={{ borderRight: 'solid #FE9A76 3px', borderBottom: 'solid #FE9A76 3px', borderRadius: '5px' }}>
                                                <Feed.Content>
                                                    <div class="ui orange circular empty label" style={{ float: 'left', marginLeft: '10px', marginTop: '10px' }}></div>
                                                    <Feed.Label style={{ paddingTop: '10px' }}>
                                                        <a style={{ fontWeight: 'bold', color: 'black', color: '#FE9A76', fontSize: '15px' }}>The {item.requester_name} Family Needs Care</a>
                                                    </Feed.Label>
                                                </Feed.Content>
                                                <Feed.Event style={{ display: 'block', margin: '10px 0px', textAlign: 'center' }}>

                                                    <Feed.Content style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                        <a style={{ fontWeight: 'bold', color: 'black' }}>{item.event_date}</a>
                                                    </Feed.Content>

                                                    <Feed.Content style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                        {item.event_time_start} - {item.event_time_end}
                                                    </Feed.Content>

                                                </Feed.Event>
                                                <p style={{ fontWeight: 'bold', color: 'grey' }}>PENDING APPROVAL</p>
                                                {<Button style={{ padding: '10px', marginBottom: '10px' }} color='red' onClick={() => this.handleCancel(item)}>Cancel</Button>}
                                            </Feed>
                                        </Card>
                                    </>

                                )
                            }
                            // care is OFFERED
                            else if (item.claimer_id === this.props.reduxStore.family.id && item.event_confirmed === false && item.offer_needed === true && item.event_claimed === true) {

                                return (
                                    <>
                                        <Card>
                                            <Feed style={{ borderRight: 'solid #008080 3px', borderBottom: 'solid #008080 3px', borderRadius: '5px' }}>
                                                <Feed.Content>
                                                    <div class="ui teal circular empty label" style={{ float: 'left', marginLeft: '10px', marginTop: '10px' }}></div>
                                                    <Feed.Label style={{ paddingTop: '10px' }}>
                                                        <a style={{ fontWeight: 'bold', color: 'black', color: '#008080', fontSize: '15px' }}>The {item.requester_name} Family is Offering Care</a>
                                                    </Feed.Label>
                                                </Feed.Content>
                                                <Feed.Event style={{ display: 'block', margin: '10px 0px', textAlign: 'center' }}>

                                                    <Feed.Content style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                        <a style={{ fontWeight: 'bold', color: 'black' }}>{item.event_date}</a>
                                                    </Feed.Content>

                                                    <Feed.Content style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                        {item.event_time_start} - {item.event_time_end}
                                                    </Feed.Content>

                                                </Feed.Event>
                                                <p style={{ fontWeight: 'bold', color: 'grey' }}>PENDING APPROVAL</p>
                                                {<Button style={{ padding: '10px', marginBottom: '10px' }} color='red' onClick={() => this.handleCancel(item)}>Cancel</Button>}
                                            </Feed>
                                        </Card>
                                    </>

                                )
                            }
                            // ----------------- CONFIRMED ------------------------

                            // care is NEEDED
                            else if
                                (item.claimer_id === this.props.reduxStore.family.id && item.event_confirmed === true && item.offer_needed === false && item.event_claimed === true) {
                                return (
                                    <>
                                        <Card>
                                            <Feed style={{ borderRight: 'solid #FE9A76 3px', borderBottom: 'solid #FE9A76 3px', borderRadius: '5px' }}>
                                                <Feed.Content>
                                                    <div class="ui orange circular empty label" style={{ float: 'left', marginLeft: '10px', marginTop: '10px' }}></div>
                                                    <Feed.Label style={{ paddingTop: '10px' }}>
                                                        <a style={{ fontWeight: 'bold', color: 'black', color: '#FE9A76', fontSize: '15px' }}>The {item.requester_name} Family Needs Care</a>
                                                    </Feed.Label>
                                                </Feed.Content>
                                                <Feed.Event style={{ display: 'block', margin: '10px 0px', textAlign: 'center' }}>

                                                    <Feed.Content style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                        <a style={{ fontWeight: 'bold', color: 'black' }}>{item.event_date}</a>
                                                    </Feed.Content>

                                                    <Feed.Content style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                        {item.event_time_start} - {item.event_time_end}
                                                    </Feed.Content>

                                                </Feed.Event>
                                                <p style={{ fontWeight: 'bold', color: 'green' }}>CONFIRMED</p>
                                                {<Button style={{ padding: '10px', marginBottom: '10px' }} color='red' onClick={() => this.handleCancel(item)}>Cancel</Button>}
                                            </Feed>
                                        </Card>
                                    </>

                                )
                            }
                            // care is OFFERED
                            else if (item.claimer_id === this.props.reduxStore.family.id && item.event_confirmed === true && item.offer_needed === true) {

                                return (
                                    <>
                                        <Card>
                                            <Feed style={{ borderRight: 'solid #008080 3px', borderBottom: 'solid #008080 3px', borderRadius: '5px' }}>
                                                <Feed.Content>
                                                    <div class="ui teal circular empty label" style={{ float: 'left', marginLeft: '10px', marginTop: '10px' }}></div>
                                                    <Feed.Label style={{ paddingTop: '10px' }}>
                                                        <a style={{ fontWeight: 'bold', color: 'black', color: '#008080', fontSize: '15px' }}>The {item.requester_name} Family is Offering Care</a>
                                                    </Feed.Label>
                                                </Feed.Content>
                                                <Feed.Event style={{ display: 'block', margin: '10px 0px', textAlign: 'center' }}>

                                                    <Feed.Content style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                        <a style={{ fontWeight: 'bold', color: 'black' }}>{item.event_date}</a>
                                                    </Feed.Content>

                                                    <Feed.Content style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                        {item.event_time_start} - {item.event_time_end}
                                                    </Feed.Content>

                                                </Feed.Event>
                                                <p style={{ fontWeight: 'bold', color: 'green' }}>CONFIRMED</p>
                                                {<Button style={{ padding: '10px', marginBottom: '10px' }} color='red' onClick={() => this.handleCancel(item)}>Cancel</Button>}
                                            </Feed>
                                        </Card>
                                    </>

                                )
                            }
                        })
                        : <h4 style={{ fontSize: '20px', color: 'grey' }}> You have no claimed requests </h4>}
                    <hr style={{ backgroundColor: '#8298ca', width: '80%', borderRadius: '5px', height: '5px', border: 'none', marginTop: '30px' }} />
                    <h3 align="center">YOUR REQUESTS</h3>
                    {this.props.reduxStore.notifications && this.props.reduxStore.notifications.length > 0 ?

                        this.props.reduxStore.notifications.map((item) => {
                            // -------------------------------------------------- USER/FAMILY REQUESTED AN EVENT ---------------------------------------------------------------
                            // ------------------ NOT CLAIMED / NOT CONFIRMED ---------------------------

                            // care is NEEDED
                            if (item.requester_id === this.props.reduxStore.family.id && item.event_confirmed === false && item.offer_needed === true && item.event_claimed === false) {

                                return (
                                    <>
                                        <Card>
                                            <Feed style={{ borderRight: 'solid #FE9A76 3px', borderBottom: 'solid #FE9A76 3px', borderRadius: '5px' }}>
                                                <Feed.Content>
                                                    <div class="ui orange circular empty label" style={{ float: 'left', marginLeft: '10px', marginTop: '10px' }}></div>
                                                    <Feed.Label style={{ paddingTop: '10px' }}>
                                                        <a style={{ fontWeight: 'bold', color: '#FE9A76', fontSize: '15px' }}>You Need Care</a>
                                                    </Feed.Label>
                                                </Feed.Content>
                                                <Feed.Event style={{ display: 'block', margin: '10px 0px', textAlign: 'center' }}>

                                                    <Feed.Content style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                        <a style={{ fontWeight: 'bold', color: 'black' }}>{item.event_date}</a>
                                                    </Feed.Content>

                                                    <Feed.Content style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                        {item.event_time_start} - {item.event_time_end}
                                                    </Feed.Content>

                                                </Feed.Event>
                                                <p style={{ fontWeight: 'bold', color: 'grey' }}>NOT CLAIMED YET</p>
                                                {<Button style={{ padding: '10px', marginBottom: '10px' }} color='red' onClick={() => this.handleCancel(item)}>Cancel</Button>}
                                            </Feed>
                                        </Card>
                                    </>

                                )
                            }
                            // care is OFFERED
                            else if (item.requester_id === this.props.reduxStore.family.id && item.event_confirmed === false && item.offer_needed === false && item.event_claimed === false) {

                                return (
                                    <>
                                        <Card>
                                            <Feed style={{ borderRight: 'solid #008080 3px', borderBottom: 'solid #008080 3px', borderRadius: '5px' }}>
                                                <Feed.Content>
                                                    <div class="ui teal circular empty label" style={{ float: 'left', marginLeft: '10px', marginTop: '10px' }}></div>
                                                    <Feed.Label style={{ paddingTop: '10px' }}>
                                                        <a style={{ fontWeight: 'bold', color: '#008080', fontSize: '15px' }}>You're Offering Care</a>
                                                    </Feed.Label>
                                                </Feed.Content>
                                                <Feed.Event style={{ display: 'block', margin: '10px 0px', textAlign: 'center' }}>

                                                    <Feed.Content style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                        <a style={{ fontWeight: 'bold', color: 'black' }}>{item.event_date}</a>
                                                    </Feed.Content>

                                                    <Feed.Content style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                        {item.event_time_start} - {item.event_time_end}
                                                    </Feed.Content>

                                                </Feed.Event>
                                                <p style={{ fontWeight: 'bold', color: 'grey' }}>NOT CLAIMED YET</p>
                                                {<Button style={{ padding: '10px', marginBottom: '10px' }} color='red' onClick={() => this.handleCancel(item)}>Cancel</Button>}
                                            </Feed>
                                        </Card>
                                    </>

                                )
                            }
                            // ------------------ CLAIMED / NOT CONFIRMED ---------------------------

                            // care is OFFERED
                            else if (item.requester_id === this.props.reduxStore.family.id && item.event_confirmed === false && item.offer_needed === true) {

                                return (
                                    <>
                                        <Card>
                                            <Feed style={{ borderRight: 'solid #008080 3px', borderBottom: 'solid #008080 3px', borderRadius: '5px' }}>
                                                <Feed.Content>
                                                    <div class="ui teal circular empty label" style={{ float: 'left', marginLeft: '10px', marginTop: '10px' }}></div>
                                                    <Feed.Label style={{ paddingTop: '10px' }}>
                                                        <a style={{ fontWeight: 'bold', color: 'black', fontSize: '15px' }}>The {item.claimer_name} Family Claimed Your Request!</a>
                                                    </Feed.Label>
                                                </Feed.Content>
                                                <Feed.Event style={{ display: 'block', margin: '10px 0px', textAlign: 'center' }}>

                                                    <Feed.Content style={{ textAlign: 'center' }}>
                                                        <a style={{ fontWeight: 'bold', color: '#008080' }}>You're Offering Care </a>
                                                    </Feed.Content>

                                                    <Feed.Content style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                        <a style={{ fontWeight: 'bold', color: 'black' }}>{item.event_date}</a>
                                                    </Feed.Content>

                                                    <Feed.Content style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                        {item.event_time_start} - {item.event_time_end}
                                                    </Feed.Content>

                                                </Feed.Event>
                                                <Button style={{ padding: '10px', marginBottom: '10px' }} color='green' onClick={() => this.handleConfirm(item)}>APPROVE</Button>
                                                {<Button style={{ padding: '10px', marginBottom: '10px' }} color='red' onClick={() => this.handleCancel(item)}>DENY</Button>}
                                            </Feed>
                                        </Card>
                                    </>

                                )
                            }
                            // care is NEEDED
                            else if (item.requester_id === this.props.reduxStore.family.id && item.event_confirmed === false && item.offer_needed === false) {

                                return (
                                    <>
                                        <Card>
                                            <Feed style={{ borderRight: 'solid #FE9A76 3px', borderBottom: 'solid #FE9A76 3px', borderRadius: '5px' }}>
                                                <Feed.Content>
                                                    <div class="ui orange circular empty label" style={{ float: 'left', marginLeft: '10px', marginTop: '10px' }}></div>
                                                    <Feed.Label style={{ paddingTop: '10px' }}>
                                                        <a style={{ fontWeight: 'bold', color: 'black', fontSize: '15px' }}>The {item.claimer_name} Family Claimed Your Request!</a>
                                                    </Feed.Label>
                                                </Feed.Content>
                                                <Feed.Event style={{ display: 'block', margin: '10px 0px', textAlign: 'center' }}>

                                                    <Feed.Content style={{ textAlign: 'center' }}>
                                                        <a style={{ color: '#FE9A76', fontWeight: 'bold' }}>You Need Care </a>
                                                    </Feed.Content>

                                                    <Feed.Content style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                        <a style={{ fontWeight: 'bold', color: 'black' }}>{item.event_date}</a>
                                                    </Feed.Content>

                                                    <Feed.Content style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                        {item.event_time_start} - {item.event_time_end}
                                                    </Feed.Content>
                                                </Feed.Event>
                                                <Button style={{ padding: '10px', marginBottom: '10px' }} color='green' onClick={() => this.handleConfirm(item)}>APPROVE</Button>
                                                {<Button style={{ padding: '10px', marginBottom: '10px' }} color='red' onClick={() => this.handleCancel(item)}>DENY</Button>}
                                            </Feed>
                                        </Card>
                                    </>

                                )
                            }

                            // ---------------------- CLAIMED AND CONFIRMED -------------------

                            // care is NEEDED
                            else if (item.requester_id === this.props.reduxStore.family.id && item.event_confirmed === true && item.offer_needed === false) {

                                return (
                                    <>
                                        <Card>
                                            <Feed style={{ borderRight: 'solid #FE9A76 3px', borderBottom: 'solid #FE9A76 3px', borderRadius: '5px' }}>
                                                <Feed.Content>
                                                    <div class="ui orange circular empty label" style={{ float: 'left', marginLeft: '10px', marginTop: '10px' }}></div>
                                                    <Feed.Label style={{ paddingTop: '10px' }}>
                                                        <a style={{ fontWeight: 'bold', color: 'black', fontSize: '15px' }}>The {item.claimer_name} Family Claimed Your Request!</a>
                                                    </Feed.Label>
                                                </Feed.Content>
                                                <Feed.Event style={{ display: 'block', margin: '10px 0px', textAlign: 'center' }}>

                                                    <Feed.Content style={{ textAlign: 'center' }}>
                                                        <a style={{ color: '#FE9A76', fontWeight: 'bold' }}>You Need Care </a>
                                                    </Feed.Content>

                                                    <Feed.Content style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                        <a style={{ fontWeight: 'bold', color: 'black' }}>{item.event_date}</a>
                                                    </Feed.Content>

                                                    <Feed.Content style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                        {item.event_time_start} - {item.event_time_end}
                                                    </Feed.Content>

                                                </Feed.Event>
                                                <p style={{ fontWeight: 'bold', color: 'green' }}>APRROVED</p>
                                                {<Button style={{ padding: '10px', marginBottom: '10px' }} color='red' onClick={() => this.handleCancel(item)}>Cancel</Button>}
                                            </Feed>
                                        </Card>
                                    </>

                                )
                            }
                            // care is OFFERED 
                            else if (item.requester_id === this.props.reduxStore.family.id && item.event_confirmed === true && item.offer_needed === true) {

                                return (
                                    <>
                                        <Card>
                                            <Feed style={{ borderRight: 'solid #008080 3px', borderBottom: 'solid #008080 3px', borderRadius: '5px' }}>
                                                <Feed.Content>
                                                    <div class="ui teal circular empty label" style={{ float: 'left', marginLeft: '10px', marginTop: '10px' }}></div>
                                                    <Feed.Label style={{ paddingTop: '10px' }}>
                                                        <a style={{ fontWeight: 'bold', color: 'black', fontSize: '15px' }}>The {item.claimer_name} Family Claimed Your Request!</a>
                                                    </Feed.Label>
                                                </Feed.Content>
                                                <Feed.Event style={{ display: 'block', margin: '10px 0px', textAlign: 'center' }}>

                                                    <Feed.Content style={{ textAlign: 'center' }}>
                                                        <a style={{ fontWeight: 'bold', color: '#008080' }}>You're Offering Care </a>
                                                    </Feed.Content>

                                                    <Feed.Content style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                        <a style={{ fontWeight: 'bold', color: 'black' }}>{item.event_date}</a>
                                                    </Feed.Content>

                                                    <Feed.Content style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                        {item.event_time_start} - {item.event_time_end}
                                                    </Feed.Content>

                                                </Feed.Event>
                                                <p style={{ fontWeight: 'bold', color: 'green' }}>APPROVED</p>
                                                {<Button style={{ padding: '10px', marginBottom: '10px' }} color='red' onClick={() => this.handleCancel(item)}>Cancel</Button>}
                                            </Feed>
                                        </Card>
                                    </>

                                )
                            }
                            else {
                                return (
                                    <>
                                    </>
                                )
                            }
                        })
                        : <h4 style={{ fontSize: '20px', color: 'grey' }}> You have no requests </h4>}


                </Container>
            </>

        )
    }
};

const mapReduxStoreToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapReduxStoreToProps)(MyProfilePage);