import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './HamNav.css';
import { Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';



class HamNav extends Component {

// Set the width of the side navigation to 250px and the left margin of the page content to 250px
openNav = () => {
    document.getElementById("sidenav").style.width = "250px";
    //document.getElementById("main").style.marginLeft = "250px";
}

// Set the width of the side navigation to 0 and the left margin of the page conent to 0
closeNav = () => {
    document.getElementById("sidenav").style.width = "0";
    //document.getElementById("main").style.marginLeft = "0";
}


  render() {
    return (
      <>
        <Icon name='bars' className='bars icon' size='huge' onClick={(event) => this.openNav(event)} />
      

      <div id="sidenav" className="sidenav">
          <Icon name='x' className='x icon' size='large' onClick={(event) => this.closeNav(event)} />
      <div id="sidenav" className="sidenav closebtn"></div>
      
        <div>
         
          
         
                <ul>
                  <li><Link className="sidenav-a" to="/my-profile-page">My Profile</Link></li>
                  <li><Link className="sidenav-a" to="/group-view">My Groups</Link></li>
                  <li><Link className="sidenav-a" to="/family-profile">My Family</Link></li>
                  <li><Link className="sidenav-a" to="/about">About</Link></li> 
                  <li><LogOutButton className="sidenav-a" /></li>
                </ul>
                  
            
            

         
        </div>
      </div>
      </>
    )
  }
}

export default HamNav;