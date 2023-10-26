import { createBrowserRouter } from "react-router-dom";
import ProjectList from "./routes/ProjectList";
import AddProject from "./routes/AddProject";
import ProjectDetail from "./routes/ProjectDetail"


const router = createBrowserRouter([
    {
        path: "/",
        element: <ProjectList />
    },
    {
        path: "/add",
        element: <AddProject />
    },
    {
        path: "/detail/:id",
        element: <ProjectDetail />
    }

])

export default router