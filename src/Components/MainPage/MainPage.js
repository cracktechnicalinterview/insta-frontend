import React, { Component } from 'react';
import "./MainPage.css";
import Post from '../Post/Post';
import uploadImage from "../../images/upload.png";
import {storage,auth} from "../firebase";


class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            postArray:[],
            progressBar: "",
         }
    }

    componentDidMount(){
        this.getPost();
    }

    getPost=()=>{ //API
        const thisContext=this;
        // let data=[
        //     {
        //         "postId":"123456",
        //         "userName":"anindya",
        //         "postImageURL":"https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg",
        //         "timeStamp":"12345",
        //         "likes":"1234"
        //     },
        //     {
        //         "postId":"123456",
        //         "userName":"anindya",
        //         "postImageURL":"https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg",
        //         "timeStamp":"12345",
        //         "likes":"1234"
        //     },
        //     {
        //         "postId":"123456",
        //         "userName":"anindya",
        //         "postImageURL":"https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg",
        //         "timeStamp":"12345",
        //         "likes":"1234"
        //     }
        // ];

        fetch('http://localhost:8080/post')
            .then(response => response.json())
            .then(data => {
                thisContext.setState({postArray: data});
        });
    }

    upload=(event)=>{
        let image=event.target.files[0];
        const thisContext=this;
        if(image == null || image == undefined)
            return;

        var uploadTask = storage.ref("images").child(image.name).put(image);
        uploadTask.on(
          "state_changed",
          function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            thisContext.setState({progressBar: progress});
          },
          function (error) {
          },
          function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log(downloadURL);

                let payload = {
                    "postId": Math.floor(Math.random()*100000).toString(),
                    "userId": JSON.parse(localStorage.getItem("users")).uid,
                    "postPath": downloadURL,
                    "timeStamp": new Date().getTime(),
                    "likeCount": 0
                }
    
                const requestOptions ={
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body : JSON.stringify(payload),
                }
    
                fetch("http://localhost:8080/post",requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    thisContext.getPost();
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
                <div className="mainpage__container">  
                    <div className="mainpage__divider"></div>
                    <div className="fileupload">
                        <label for="file-upload" >
                            <img className="mainpage__uploadicon" src={uploadImage} />
                        </label>
                         <input onChange={this.upload} id="file-upload" type="file"/>
                     </div>
                    <div className="mainpage__divider"></div>   
                </div>
                <div className="upload_text">{this.state.progressBar}</div>
                {
                    this.state.postArray.map((item,index)=>(
                        <Post id={item.postId} userName={item.userName} postImage={item.postPath} likes={item.likeCount} />
                    ))
                }
            </div>
         );
    }
}
 
export default MainPage;