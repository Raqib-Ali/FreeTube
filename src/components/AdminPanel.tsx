import { useEffect, useState } from "react"
import { VideoContract } from "../contracts/video-contract";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import './AdminPanel.css';
import { FormikValues, useFormik } from "formik";
import { Input } from "@mui/material";
import { Modal } from "./Modal";

export function AdminPanel() {
    const [videos, setVideos] = useState<VideoContract[]>([]);
    const navigate = useNavigate();
    const cookie = useCookies(['admin']);
    const [categories, setCategory] = useState<[{ CategoryId: number; Category: string; }]>();
    const [editVideo, setEditVideo] = useState<VideoContract>();
    const [videoDetails, setVideodetails] = useState("");

    const Form = useFormik<FormikValues>({
        initialValues: {
            VideoId: (videoDetails=="true") ? editVideo?.VideoId : videos.length + 1,
            Title: (videoDetails=="true") ? editVideo?.Title : "",
            Description: (videoDetails=="true") ? editVideo?.Description : "",
            Url: (videoDetails=="true") ? editVideo?.Url : "",
            Views: (videoDetails=="true") ? editVideo?.Views : "",
            Like: (videoDetails=="true") ? editVideo?.Like : "",
            Dislike: (videoDetails=="true") ? editVideo?.Dislike : "",
            Comments: (videoDetails=="true") ? editVideo?.Comments : "",
            Category: (videoDetails=="true") ? editVideo?.Category : ""
        },

        onSubmit: (values) => {
            alert(JSON.stringify(values));
            if (videoDetails=="true") {
                axios.put(`http://127.0.0.1:2200/edit-video/${values.VideoId}`, values)
                    .then(() => {
                        alert('video updated!');
                        window.location.reload();
                    })
            } else {
                axios.post("http://127.0.0.1:2200/add-video", values)
                .then(()=>{
                    alert("Video Added!");
                    window.location.reload();
                })
                
            }
        },

        enableReinitialize: true

    })

    useEffect(() => {
        if (cookie[0].admin === undefined) {
            navigate('/admin-login');
        } else {
            loadCategories();
            loadVideos();
        }
    }, []);


    function loadVideos() {
        axios.get('http://127.0.0.1:2200/get-videos')
            .then(response => {
                setVideos(response.data.reverse());
            })
    }

    function deleteClick(VideoId: any) {
        const del = window.confirm("Are you sure you want to delete this video?")
       
        if(del){
            axios.delete(`http://127.0.0.1:2200/delete-video/${VideoId}`)
            .then(() => {
                console.log('video deleted!');
                window.location.reload();
            })            
        }
    }

    function loadCategories() {
        axios.get('http://127.0.0.1:2200/get-categories')
            .then((response) => {
                setCategory(response.data);
            })
    }

    function loadVideo(value: any) {
        setVideodetails("true");

        axios.get(`http://127.0.0.1:2200/get-video/${value}`)
            .then((response) => {
                let [editingVideo] = response.data
                setEditVideo(editingVideo);
            })
    }



    return (
        <div className="p-2">
            <div>
                <h2 className="">Admin</h2>
            </div>
            <div className="p-3 border bg-light rounded rounded-3">
                <button onClick={()=>{setVideodetails("false")}} className="btn btn-primary mb-3" data-bs-target="#Modal" data-bs-toggle="modal"><span className="bi bi-plus-circle"></span><span>Add Video</span></button>

                <Modal Form={Form} categories={categories} />

                <div className="" style={{ height: "400px", overflowY: "scroll" }}>
                    <table className="table table-secondary table-hover overflow-y-scroll">
                        <tbody className="table-body">
                            {videos?.map(video =>
                                <tr key={video.VideoId} className="">
                                    <td className=""><iframe src={video.Url} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe></td>
                                    <td className=""><span className="title">{video.Title}</span></td>
                                    <td className="">
                                        <button onClick={() => { loadVideo(video.VideoId) }} className="btn btn-primary me-1" data-bs-target="#Modal" data-bs-toggle="modal"><span className="bi bi-pencil"></span></button>

                                        <Modal Form={Form} categories={categories} />

                                        <button onClick={() => { deleteClick(video.VideoId) }} className="btn btn-danger"><span className="bi bi-trash-fill"></span></button>
                                    </td>

                                </tr>

                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}