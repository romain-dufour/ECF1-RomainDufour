import { useEffect, useState } from "react"
import Navbar from "../components/shared/NavBar"
import axios from "axios";
import { Link } from "react-router-dom";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:3001/projects")
          .then(response => {
            setProjects(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error.message);
          });
      }, []);



    const filterModeChangeHandler = (event) => {
        console.log(event.target.value);
        setFilterMode(event.target.value)
    }


    return (
        <>
        <Navbar />
            <div className="row my-3">
                <div className="rounded bg-dark text-light p-3">
                    <div className="d-flex align-items-center">
                        <h3>Projects</h3>
                        <span className="ms-auto">Filtrer selon le statut</span>
                        <select id="statut" className="ms-2 bg-dark text-light form-select w-25"  onChange={filterModeChangeHandler}>
                            <option value="">Sélectionner un filtre</option>
                            <option value="notStarted">Non débuté</option>
                            <option value="inProgress">En cours</option>
                            <option value="standBy">En attente</option>
                            <option value="finished">Terminé</option>
                        </select>
                    </div>
                    <hr />
                    {projects.length === 0 ?
                        <p>il n'y a pas de projet pour le moment!</p> :
                        <>
                            <ul className="row">
                                {projects.map((project) => (
                                    // <li className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gy-4" key={project.id}>{project.title}
                                    //     {/* <Link to={`projects/${project.id}`}>voir le détail</Link> */}
                                    // </li>
                                    <li className="col-10 bg-light rounded text-dark gy-4 offset-1"  key={project.id}>
                                        <div className="px-2">{project.title} <span className="mx-4">{project.statut}</span></div>
                                        <div></div>
                                        <Link to={`detail/${project.id}`}> voir le détail </Link>
                                    </li>
                                ))}
                            </ul>
                        </>}
                </div>
            </div>

        </>
    )

}

export default ProjectList