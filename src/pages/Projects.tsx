import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';




function handleDeleteProject() {
    alert('Delete Project');
}

function Projects() {
    const navigate = useNavigate();
    const [ projects, setProjects ] = useState<[]>([]);
    const [ newProject, setNewProject ] = useState({
        projectName: 'New Project Name',
        description: 'Project description',
        filesCount: 0,
        jobsCount: 0,
        createdDate: new Date().toISOString().split('T')[0]
    });
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ isNewProject, setIsNewProject ] = useState(false);
    
    useEffect(() => {
        setProjects(JSON.parse(localStorage.getItem('projects') || '[]'));
    }, []);
    
    function handleCreateProject() {
        setIsNewProject(true);
        setModalOpen(true);
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        const newProject = {
            projectName: 'New Project',
            description: 'Project description',
            filesCount: 0,
            jobsCount: 0,
            createdDate: new Date().toISOString().split('T')[0]
        };
        projects.push(newProject);
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    function handleOpenProject(projectId: number) {
        navigate(`/projects/${projectId}`);
    }
    
    return (
        <div>
            <Modal projectDetails={newProject} isNewProject={isNewProject} modalOpen={modalOpen} onClose={setModalOpen} />

            <h1>Projects Page</h1>
            <p>Welcome to the projects page!</p>

            <div className="projects-container">
                <div className="container-header-btn">
                    <button className="btn" onClick={handleCreateProject}>Create Project</button>
                </div>
                
                <table className="projects-table">
                    <thead>
                        <tr className="table-row-header">
                            <th className="table-header">Project Name</th>
                            <th className="table-header">Description</th>
                            <th className="table-header">Files Count</th>
                            <th className="table-header">Jobs Count</th>
                            <th className="table-header">Created Date</th>
                            <th className="table-header">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            projects.map((project: any, index: number) => (
                                <tr key={index} className="table-row">
                                    <td className="table-data">{project.projectName}</td>
                                    <td className="table-data">{project.description}</td>
                                    <td className="table-data">{project.filesCount}</td>
                                    <td className="table-data">{project.jobsCount}</td>
                                    <td className="table-data">{project.createdDate}</td>
                                    <td className="table-data">
                                        <div className="actions-container">
                                            <button onClick={() => handleOpenProject(index)} className="btn">Open</button>
                                            <button onClick={() => handleDeleteProject()} className="btn">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default Projects