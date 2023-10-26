import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:3001/projects/${id}`)
            .then(response => {
                setProject(response.data)
            })
    }, [id])

    const deleteProject = () => {
        axios.delete(`http://127.0.0.1:3001/projects/${id}`)
            .then(() => {
                console.log("projet avec id " + id + " supprimée");
                navigate("/")
            })
    }

    const modifProject = () => {
        navigate(`/add?id=${id}`)
    }

    if (!project) {
        return <p>Chargement...</p>
    }

    return (
        <>
            <h1>Détail du projet</h1>
            <h3>{project.title}</h3>
            <p>{project.content}</p>
            <button className="btn btn-danger" onClick={deleteProject}>Supprimer</button>
            <button className="btn btn-secondary" onClick={modifProject}>Modifier</button>
            <hr />        
            <Link to="/">Menu principal</Link>
        </>
    )

}

export default ProjectDetail