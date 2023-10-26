import express from "express"
import { ProjectDao } from "./dao/ProjectDao.js"
import { Project } from "./models/Project.js"
import cors from 'cors'

const app = express()


const projectDao = new ProjectDao();

app.use(cors())
app.use(express.json())

// app.listen(3001, () =>{
//     projectDao.readFile();
//     console.log('http://127.0.0.1:3001');
// })  

//renvoie la liste de tous les projets
app.get('/projects', (req, res) => {

    res.json(projectDao.getAll())

})

// ajoute un nouveau projet
app.post('/projects', (req, res) =>{
    const{title, content, startDate, endDate, statut} = req.body;
    let project = new Project(null, title, content, startDate, endDate, statut);
    res.json(projectDao.save(project))

})

// récupère les détails d'un projet spécifique
app.get('/projects/:projectId', (req ,res) => {
    let project = projectDao.findById(req.params.projectId);

    if(project == undefined) {
        res.status(404).json({code : 404, message: "aucun project trouvé"});
    }
    res.json(project);
});


// met à jour les détails d'un projet spécifique
app.put('/projects/:projectId', (req, res) => {
    const {id, title, content, startDate, endDate, statut}= req.body;

    if(req.params.projectId != id) res.sendStatus(404);

    let project = new Project(id, title, content, startDate, endDate, statut)

    projectDao.updateProject(project) ? res.sendStatus(200) : res.status(400).json({code: 400, message: "problème lors de la mise à jour du todo"})
    //a verifier si ok lors de la mise a jour
})

//supprime un projet spécifique

app.delete('/projects/:projectId', (req, res) => {
    projectDao.deleteProject(req.params.projectId);
    res.sendStatus(200)
})

app.listen(3001, () =>{
    projectDao.readFile();
    console.log('http://127.0.0.1:3001');
})    

