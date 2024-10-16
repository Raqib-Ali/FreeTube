import { useEffect, useState } from "react"
import { VideoContract } from "../contracts/video-contract";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import './AdminPanel.css';
import { FormikValues, useFormik } from "formik";
import { Input } from "@mui/material";

export function AdminPanel() {
    const [videos, setVideos] = useState<VideoContract[]>();
    const navigate = useNavigate();
    const cookie = useCookies(['admin']);
    const [categories, setCategory] = useState<[{CategoryId:number;Category:string;}]>();
    const [editVideo, setEditVideo] = useState<VideoContract>();

    const editForm = useFormik<FormikValues>({
        initialValues:{
            VideoId: editVideo?.VideoId,
            Title: editVideo?.Title,
            Description:editVideo?.Description,
            Url: editVideo?.Url,
            Views: editVideo?.Views,
            Like: editVideo?.Like,
            Dislike: editVideo?.Dislike,
            Comments: editVideo?.Comments,
            CategoryId: editVideo?.CategoryId
        },

        onSubmit:(values) => {
             alert(JSON.stringify(values));
             axios.put(`http://127.0.0.1:2200/edit-video/${values.VideoId}`, values);
        },

        enableReinitialize: true

    })

    const addForm = useFormik<FormikValues>({
        initialValues:{
            VideoId: "",
            Title: "",
            Description: "",
            Url: "",
            Views: 0,
            Like: "",
            Dislike: "",
            Comments: "",
            CategoryId: ""
        },

        onSubmit:(values) => {
             console.log(values)
             axios.post("http://127.0.0.1:2200/add-video", values);
        }
          
    })

    useEffect(() => {
        if (cookie[0].admin === undefined) {
            navigate('/admin-login');
        } else {
            loadCategories();
            loadVideos();
        }
    }, [])
   

    function loadVideos() {
        axios.get('http://127.0.0.1:2200/get-videos')
            .then(response => {
                setVideos(response.data.reverse());
            })
    }

    function deleteClick(VideoId:any){
        axios.delete(`http://127.0.0.1:2200/delete-video/${VideoId}`)
        .then(()=>{
            console.log('video deleted!');
        })
    }

    function loadCategories(){
        axios.get('http://127.0.0.1:2200/get-categories')
        .then((response)=>{
            setCategory(response.data);
        })
    }

    function loadVideo(value:any){
        
        axios.get(`http://127.0.0.1:2200/get-video/${value}`)
        .then((response)=>{
            let [editingVideo] = response.data
            setEditVideo(editingVideo);
            alert(JSON.stringify(editingVideo));
        })
    }

  

    return (
        <div className="p-2">
            <div>
                <h2 className="">Admin</h2>

            </div>
            <div className="p-3 border bg-light rounded rounded-3">
                <button className="btn btn-primary mb-3" data-bs-target="#addModal" data-bs-toggle="modal"><span className="bi bi-plus-circle"></span><span>Add Video</span></button>
                                    <div className="modal fade" id="addModal" tabIndex={-1}>
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" >Add Video</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <form onSubmit={addForm.handleSubmit} >
                                                        <dl>
                                                            <dt>VideoId</dt>
                                                            <dd><input name="VideoId" onChange={addForm.handleChange} className="form-control" type="text" /></dd>
                                                            <dt>Video Title</dt>
                                                            <dd><input name="Title" onChange={addForm.handleChange} className="form-control" type="text" /></dd>
                                                            <dt>Description</dt>
                                                            <dd><input name="Description" className="form-control" onChange={addForm.handleChange} type="text" /></dd>
                                                            <dt>Url</dt>
                                                            <dd><input name="Url" className="form-control" onChange={addForm.handleChange} type="text" /></dd>
                                                            <dt>Views</dt>
                                                            <dd><input name="Views" className="form-control" onChange={addForm.handleChange} type="text" /></dd>
                                                            <dt>Like</dt>
                                                            <dd><input name="Like" className="form-control" onChange={addForm.handleChange} type="text" /></dd>
                                                            <dt>Dislike</dt>
                                                            <dd><input name="Dislike" className="form-control" type="text" /></dd>
                                                            <dt>Comments</dt>
                                                            <dd><input name="Comments" className="form-control" onChange={addForm.handleChange} type="text" /></dd>
                                                            <dt>Category</dt>
                                                            <dd>
                                                                <select name="CategoryId" onChange={addForm.handleChange} id="">
                                                                    {categories?.map(category =>
                                                                        <option key={category.CategoryId}>{category.Category}</option>
                                                                    )}
                                                                </select>
                                                            </dd>
                                                        </dl>
                                                        <button className="btn btn-info" type="submit">Add</button>
                                                    </form>
                                             </div>  
                                        </div>
                                    </div>   
                                </div>         
                <div className="" style={{height:"400px", overflowY:"scroll"}}>
                <table  className="table table-secondary table-hover overflow-y-scroll">
                    <tbody className="table-body">
                        {videos?.map(video =>
                            <tr key={video.VideoId} className="">
                                <td className=""><iframe src={video.Url} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe></td>
                                <td className=""><span className="title">{video.Title}</span></td>
                                <td className="">
                                    <button onClick={()=>{loadVideo(video.VideoId)}}  className="btn btn-primary me-1" data-bs-target="#editModal" data-bs-toggle="modal"><span className="bi bi-pencil"></span></button>
                                    <div className="modal fade" id="editModal" tabIndex={-1}>
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <form onSubmit={editForm.handleSubmit} action="">
                                                        <dl>
                                                            <dt>VideoId</dt>
                                                            <dd><input value={editForm.values.VideoId} name="VideoId" onChange={editForm.handleChange} className="form-control" disabled type="text" /></dd>
                                                            <dt>Video Title</dt>
                                                            <dd><input value={editForm.values.Title} name="Title" onChange={editForm.handleChange} className="form-control" type="text" /></dd>
                                                            <dt>Description</dt>
                                                            <dd><input value={editForm.values.Description} name="Description" className="form-control" onChange={editForm.handleChange} type="text" /></dd>
                                                            <dt>Url</dt>
                                                            <dd><input value={editForm.values.Url} name="Url" className="form-control" onChange={editForm.handleChange} type="text" /></dd>
                                                            <dt>Views</dt>
                                                            <dd><input value={editForm.values.Views} name="Views" className="form-control" onChange={editForm.handleChange} type="text" /></dd>
                                                            <dt>Like</dt>
                                                            <dd><input value={editForm.values.Like} name="Like" className="form-control" onChange={editForm.handleChange} type="text" /></dd>
                                                            <dt>Dislike</dt>
                                                            <dd><input value={editForm.values.Dislike} name="Dislike" className="form-control" type="text" /></dd>
                                                            <dt>Comments</dt>
                                                            <dd><input value={editForm.values.Comments} name="Comments" className="form-control" onChange={editForm.handleChange} type="text" /></dd>
                                                            <dt>Category</dt>
                                                            <dd>
                                                                <select value={editForm.values.CategoryId} name="CategoryId" onChange={editForm.handleChange} id="">
                                                                    {categories?.map(category =>
                                                                        <option key={category.CategoryId} value={category.CategoryId}>{category.Category}</option>
                                                                    )}
                                                                </select>
                                                            </dd>
                                                        </dl>
                                                        <button className="btn btn-info" type="submit">Save</button>
                                                    </form>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={()=>{deleteClick(video.VideoId)}} className="btn btn-danger"><span className="bi bi-trash-fill"></span></button>
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