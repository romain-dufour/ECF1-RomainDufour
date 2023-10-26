import {Link} from "react-router-dom"

const NavBar = () => {
    
    return (
        <nav className='navbar navbar-expand-lg bg-body-tertiary' data-bs-theme="dark">
            <div className='container-fluid'>
                <Link className='navbar-brand' to={"/"}><i class="bi bi-award"></i>MyProjectApp</Link>
                <div className='navbar-brand' id='navbarSupportedContent'>
                    <Link className="btn btn-success ms-auto" to="/add">Ajouter un projet</Link>
                </div>
            </div>

        </nav>
        
    )
}

export default NavBar