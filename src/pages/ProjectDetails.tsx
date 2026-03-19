
import { useParams } from 'react-router-dom';

function ProjectDeatails() {
    const { projectId } = useParams();

    function getProjectDetails () {
        // Fetch project details using projectId
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        const project = projects.find((p: any) => p.id === projectId);
        return project; 
    };


    return (
        <div>
            <h1>Project Details Page</h1>
            <p>Welcome to the project details page!</p>
            <ul>
                <li>Project Info</li>
                <li>Files</li>
                <li>Jobs</li>
            </ul>
        </div>
    )
}

export default ProjectDeatails