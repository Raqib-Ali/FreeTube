 

export function Modal(props:any){

    return (
        <div className="modal fade" id="Modal" tabIndex={-1}>
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" >Add Video</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
                <form onSubmit={props.Form.handleSubmit} >
                    <dl>
                        <dt>VideoId</dt>
                        <dd><input required name="VideoId" onChange={props.Form.handleChange} value={props.Form.values.VideoId} className="form-control" type="text" /></dd>
                        <dt>Video Title</dt>
                        <dd><input required name="Title" onChange={props.Form.handleChange} value={props.Form.values.Title} className="form-control" type="text" /></dd>
                        <dt>Description</dt>
                        <dd><textarea name="Description" className="form-control" value={props.Form.values.Description} onChange={props.Form.handleChange} /></dd>
                        <dt>Url</dt>
                        <dd><input required name="Url" className="form-control" value={props.Form.values.Url} onChange={props.Form.handleChange} type="text" /></dd>
                        <dt>Views</dt>
                        <dd><input name="Views" className="form-control" value={props.Form.values.Views} onChange={props.Form.handleChange} type="text" /></dd>
                        <dt>Like</dt>
                        <dd><input name="Like" className="form-control" value={props.Form.values.Like} onChange={props.Form.handleChange} type="text" /></dd>
                        <dt>Dislike</dt>
                        <dd><input name="Dislike" value={props.Form.values.Dislike} className="form-control" type="text" /></dd>
                        <dt>Comments</dt>
                        <dd><input name="Comments" value={props.Form.values.Comments} className="form-control" onChange={props.Form.handleChange} type="text" /></dd>
                        <dt>Category</dt>
                        <dd>
                            <select required value={props.Form.values.Category} name="Category" onChange={props.Form.handleChange} id="">
                                {props.categories?.map((category:any) =>
                                    <option key={category.Category}>{category.Category}</option>
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
    )
}

