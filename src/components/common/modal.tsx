import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

export const Modal = ({addForm, categories, values}: any) => {
    return <div className="modal fade" id="addModal" tabIndex={-1}>
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
                        <dd><input value={values ? values.videoId : ""} name="VideoId" onChange={addForm.handleChange} className="form-control" type="text" /></dd>
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
                                {categories?.map((category: { Category: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined }) =>
                                    <option>{category.Category}</option>
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
}