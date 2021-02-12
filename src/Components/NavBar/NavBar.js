import React, { Component } from 'react';
import "./NavBar.css";
import Grid from '@material-ui/core/Grid';
import insta_log from "../../images/logoinsta.png"
import home from "../../images/home.svg";
import message from "../../images/message.svg";
import find from "../../images/find.svg";
import react from "../../images/love.svg";
import Avatar from '@material-ui/core/Avatar';
import pp from "../../images/pp1.png"

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <div className="navbar__barContent">
                    <Grid container>
                        <Grid item xs={2}> </Grid>
                        <Grid item xs={3}>
                            <img className="navbar_logo" src={insta_log} width="105px" />
                        </Grid>
                        <Grid item xs={3}>
                           <input text="text" className="navbar__searchBar" placeholder="Search" />
                        </Grid>
                        <Grid item xs={3} style={{"display":"flex"}}>
                            <img className="navbar__img" src={home} width="25px"/>
                            <img className="navbar__img" src={message} width="25px" />
                            <img className="navbar__img" src={find} width="25px" />
                            <img className="navbar__img" src={react} width="25px" />
                            <Avatar src={pp} className="navbar__img" style={{"maxWidth":"25px","maxHeight":"25px"}} />
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                </div>
            </div>
         );
    }
}
 
export default NavBar;