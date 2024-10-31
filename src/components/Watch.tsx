import { useEffect, useState } from "react";
import { VideoContract } from "../contracts/video-contract";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Watch.css";
import { useCookies } from "react-cookie";

let Watch = ()=>{
    
    const [video, setVideo] = useState<VideoContract>();
    const [videos, setVideos] = useState<VideoContract[]>();
    const videoId = useParams();
    const cookie = useCookies(['email']);

    function loadVideo(){
      axios.get(`http://127.0.0.1:2200/get-video/${videoId.id}`)
      .then(response=>{
         let [video] = response.data;
         setVideo(video);
         loadRelatedVideo(video?.Category);
      })
    }

    function loadRelatedVideo(category:any){
        axios.get(`http://127.0.0.1:2200/get-videos/${category}`)
        .then(response=>{
           setVideos(response.data.reverse());
        })  
    }

    // function addToFavourites(id:any){
    //   if(isAtFavourites(id)){
    //      alert("Already Added!");
    //   }else{
        
    //     let favVideo = {
    //         VideoId: id,
    //         Email: cookie[0].email
    //      }
    //     axios.post(`http://127.0.0.1:2200/add-to-favourites`, favVideo)
    //     .then(()=>{
    //         alert("Added to Favourites!");
    //     })
    //   }    
    // }

    // function isAtFavourites(id:any){
    //      let result;
    //     axios.get(`http://127.0.0.1:2200/get-favourites/${cookie[0].email}`)
    //     .then((response)=>{
    //        let videoPresent =  response.data.find((video:any) => video.VideoId === id);
    //        if(videoPresent === undefined){       
    //           result = 0
    //           console.log(result)
    //        }else{
    //            result = 1
    //            console.log(result)
    //        }
    //     })

    //     // this part of code executing first then axious which making an issue
    //     console.log(result);
    //     return true;    
    // }

    useEffect(()=>{
        loadVideo();
    },[videoId])

    return(
        <div className="wrap p-1">
            <div className="p-1">
            <div>
               <iframe className="rounded-3 frame" height="440px" src={video?.Url} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
               <div className="fw-medium fs-3 p-2">
                   {video?.Title} 
               </div>
               <div className="p-3 mt-1 rounded-3" style={{backgroundColor:"lightgrey"}}>
                 <pre style={{textWrap:"wrap"}}>
                    {video?.Description}
                 </pre>
               </div>
            </div>
            </div>
            <div className="p-1">
                {
                    videos?.map(video =>
                        <Link key={video.VideoId} to={`/watch/${video.VideoId}`} style={{height:"110px"}} className="d-flex text-decoration-none text-dark mb-1">
                            <div className="iframe">
                            <iframe className="rounded iframe" src={video?.Url} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                            </div>
                            <div className="fw-medium fs-6 p-2">
                                {video?.Title}
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}

export default Watch;