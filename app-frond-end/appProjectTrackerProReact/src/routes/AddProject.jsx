import { useRef, useEffect } from "react"
import { useNavigate , useSearchParams} from "react-router-dom";
import axios from "axios";

function AddProject() {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const titleRef = useRef();
    const contentRef = useRef();
    const startDateRef = useRef();
    const endDateRef = useRef();
    const statutRef = useRef();

    const id = params.get("id") ?? null

    useEffect(() => {
        if (id != null) {
            axios.get(`http://127.0.0.1:3001/projects/${id}`)
                .then((response => {
                    titleRef.current.value = response.data.title,
                    contentRef.current.value = response.data.content,
                    startDateRef.current.value = response.data.startDate,
                    endDateRef.current.value = response.data.endDate,
                    statutRef.current.select.value = response.data.statut
                }))
        }
    }, [id])

    const submitHandler = () => {

        console.log(
    titleRef.current.value,
      
);
        if (id != null) {
            axios.put(`http://127.0.0.1:3001/projects/${id}`,
                {
                    title: titleRef.current.value,
                    content: contentRef.current.value,
                    startDate: startDateRef.current.value,
                    endDate: endDateRef.current.value,
                    statut: statutRef.current.value
                }
            )
                .then(response => {
                    console.log(response.data)
                    navigate("/")
                })
        } else {
            axios.post('http://127.0.0.1:3001/projects', {
                title: titleRef.current.value,
                content: contentRef.current.value,
                startDate: startDateRef.current.value,
                endDate: endDateRef.current.value,
                statut: statutRef.current.value
            })
                .then(response => {
                    console.log(response.data)
                    navigate("/")
                })
        }
        navigate("/")
    }

    return (
        <>
            <h3> project</h3>
            <hr />
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Titre du projet :</label>
                    <input type="text" className="form-control" required ref={titleRef} />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Description du projet :</label>
                    <input type="text" className="form-control" required ref={contentRef} />
                </div>
                <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">Date de début :</label>
                    <input type="date" className="form-control" required ref={startDateRef} />
                </div>
                <div className="mb-3">
                    <label htmlFor="endDate" className="form-label">Date de fin :</label>
                    <input type="date" className="form-control" required ref={endDateRef} />
                </div>
                <div className="mb-3">
                    <label htmlFor="endDate" className="form-label">Etat du projet :</label>
                    <select id="statut" className="ms-2  text-dark form-select w-25" required ref={statutRef}>
                        <option value="Non débuté">Non débuté</option>
                        <option value="En cours">En cours</option>
                        <option value="En attente">En attente</option>
                        <option value="Terminé">Terminé</option>
                    </select>
                </div>
                <button className="btn btn-success ms-auto">{id ? "Modifier todo" : "Ajout Projet"}</button>
            </form>
        </>
    )
}

export default AddProject