import React, { Component } from 'react';
import "./StatusBar.css";
import { Avatar } from '@material-ui/core';
import statusimg from "../../images/pp1.png";
import uploadimage from "../../images/statusadd.png";
import {storage,auth} from "../firebase";

class StatusBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            statusList: []
         }
    }
    componentDidMount(){
        this.getData();
    }

    getData=()=>{
        // let data=[
        //     {
        //         "username":"anindya_bunny",
        //         "imageURL":"https://darresne.com/img/female-avatar.png"
        //      },
        //      {
        //         "username":"abcs",
        //         "imageURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJYxr247w5ckIok4oLED58Lm7koT7pj4225A&usqp=CAU"
        //      },
        //      {
        //         "username":"qwe",
        //         "imageURL":"https://www.w3schools.com/w3css/img_avatar3.png"
        //      },
        //      {
        //         "username":"jyjj",
        //         "imageURL":"https://darresne.com/img/female-avatar.png"
        //      },
        //      {
        //         "username":"jyjj",
        //         "imageURL":"https://www.w3schools.com/w3css/img_avatar3.png"
        //      },
        //      {
        //         "username":"jyjj",
        //         "imageURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGonDgYzVXUcaKSWbvyH_ICVD23aI4zlRMJQ&usqp=CAU"
        //      },
        //      {
        //         "username":"jyjj",
        //         "imageURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJYxr247w5ckIok4oLED58Lm7koT7pj4225A&usqp=CAU"
        //      },
        //      {
        //         "username":"jyjj",
        //         "imageURL":"../../images/pp1.png"
        //      }
        // ]

        fetch('http://localhost:8080/status')
            .then(response => response.json())
            .then(data => {
                this.setState({statusList: data});
        });
    }   

    uploadStatus =(event)=>{
        let image=event.target.files[0];
        const thisContext=this;
        if(image == null || image == undefined)
            return;

        var uploadTask = storage.ref("status").child(image.name).put(image);
        uploadTask.on(
          "state_changed",
          function (snapshot) {
          },
          function (error) {
          },
          function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log(downloadURL);

                let payload = {
                    "statusId": Math.floor(Math.random()*100000).toString(),
                    "userId": JSON.parse(localStorage.getItem("users")).uid,
                    "path": downloadURL,
                    "timeStamp": new Date().getTime()
                }
    
                const requestOptions ={
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body : JSON.stringify(payload),
                }
    
                fetch("http://localhost:8080/status",requestOptions)
                .then(response => response.json())
                .then(data => {
                    thisContext.getData();
                })
                .catch(error =>{
    
                })
                
            })
            }
        );
    }

    render() { 
        return ( 
        <div>
            <div className="statusbar__container">
            <div className="fileupload">
                <label for="file-upload-status" >
                    <img className="statusbar__upload" src={uploadimage} width="55px" height="55px" />
                </label>
                    <input id="file-upload-status" onChange={this.uploadStatus} type="file"/>
            </div>
                {
                    this.state.statusList.map((item,index)=>(
                        <div className="status">
                            <Avatar className="statusbar__status" src={item.path} />
                            <div className="statusbar__text">{item.userName}</div>
                        </div>
                    ))
                }
            </div>
        </div>
         );
    }
}
 
export default StatusBar;