import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { VideoContract } from "../contracts/video-contract";
import './Dashboard.css';



export function Dashboard() {

    const [videos, setVideos] = useState<VideoContract[]>();
    const [categories, setCategories] = useState<[{CategoryId:string, Category:string}]>();
    const [status, setStatus] = useState("inactive");
    const cookie = useCookies(['email'])
    const navigate = useNavigate();
    

    useEffect(() => {
        if (cookie[0].email === undefined) {
            navigate('/');
        } else {
           loadCategories();
           loadVideos("get-videos");
        }
    },[]);

    function loadCategories(){
        axios.get('http://127.0.0.1:2200/get-categories')
        .then(response =>{
            setCategories(response.data);
        })
    }

    function loadVideos(category:any){
        if(category !== "get-videos"){
            axios.get(`http://127.0.0.1:2200/get-videos/${category}`)
            .then(response => {
                setVideos(response.data);
            })
        }else{
            axios.get(`http://127.0.0.1:2200/${category}`)
        .then(response => {
            setVideos(response.data);
        })
        }
    }

    function categoryClick(category:any){
         loadVideos(category);
    }

    return (
        <div style={{ height: "90vh"}} className="wrapper">
            <div className="mb-1 cat-bar">

                 {   categories?.map((category) => 
                      <span key={category.CategoryId} onClick={()=>{categoryClick(category.Category)}}  className="p-1 me-2 rounded-1 category">{category.Category}</span>
                    )
                 }
                
            </div>
            <div className="card-wrapper">
                {videos?.map(video =>
                     <Link key={video.VideoId} style={{maxHeight:"320px"}} className="text-decoration-none" to={`/watch/${video.VideoId}`}>
                    <div >
                       <iframe className="border border-1 rounded-3" src={video.Url} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                        <div className="p-2">
                            <div className="fs-5 fw-bold text-dark">{video.Title}</div>                 
                        </div>
                    </div>
                    </Link>
                )}
            </div>
        </div>
    )
}

