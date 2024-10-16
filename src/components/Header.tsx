import { Link } from "react-router-dom";

export function Header(){

    return (
        <div className="d-flex justify-content-between p-2 shadow bg-dark text-white">
             <div><Link className="fw-bold fs-4 text-decoration-none text-light" to={'/'}>Video Library</Link></div>
             <div>
                <span><Link className=" me-3 btn btn-light" to={'/register'}>Register</Link></span>
                <span><Link className="btn btn-primary" to={'admin'}>Admin</Link></span>
             </div>
        </div>
    )
}