import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { VideoContract } from "../contracts/video-contract";
import './Dashboard.css';



export function Dashboard() {

    const [videos, setVideos] = useState<VideoContract[]>();
    const cookie = useCookies(['email'])
    const navigate = useNavigate();
    

    useEffect(() => {
        if (cookie[0].email === undefined) {
            navigate('/');
        } else {
           loadVideos();
        }
    },[]);

    function loadVideos(){
        axios.get('http://127.0.0.1:2200/get-videos')
        .then(response => {
            setVideos(response.data);
        })
    }

    return (
        <div style={{ height: "85vh" }} className="wrapper">
            <div className="card-wrapper">
                {videos?.map(video =>
                    <div key={video.VideoId} style={{ flex:1, }} className="card">
                        <iframe className="card-img-top"  src={video.Url} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                        <div className="p-3">
                            <div className="fs-5 fw-bold">{video.Title}</div>                 
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

