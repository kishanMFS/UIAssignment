import { useEffect, useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal/Modal';
import InputText from '../components/InputText';

import projectReducer from '../reducers/projectReducers';

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
    // const [ projects, dispatch ] = useReducer(projectReducer, [])
    
    useEffect(() => {
        setProjects(JSON.parse(localStorage.getItem('projects') || '[]'));
    }, []);

    function handleOpenProject(projectId: number) {
        navigate(`/projects/${projectId}`);
    }

    const handleInputChange = (field: string, value: string) => {
        setNewProject({
            ...newProject,
            [field]: value
        });
    }
    
    const handleOpenCreateProject = () => {
        setModalOpen(true);
    }
    function handleDeleteProject(projectId:number) {
        const updatedProjects = projects.filter((project)=> project.id !== projectId)
        setProjects(updatedProjects)
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
    }

    const handleCreateProject = () => {
        const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
        const newProjectVlaues = {
            ...newProject,
            id: Date.now().toString() // since id is not defined in projectDetails, we can generate a unique id using timestamp
        };
        existingProjects.push(newProjectVlaues);
        setProjects(existingProjects);
        localStorage.setItem('projects', JSON.stringify(existingProjects));
        setModalOpen(false);
        setNewProject({
            projectName:'',
            description: '',
            filesCount: 0,
            jobsCount: 0,
            createdDate: new Date().toISOString().split('T')[0]
        })
    };

    function handleOnClose() {
        setModalOpen(false);
    }

    
    return (
        <div>
            <Modal title="Create New Project" modalOpen={modalOpen} setModalOpen={setModalOpen} footer={
                <>
                    <button className="btn" onClick={handleCreateProject}>
                        Create
                    </button>
                    <button className="btn" onClick={handleOnClose}>
                        Close
                    </button>
                </>
            }>
                <div>
                    <div className="input-group">
                        <label htmlFor="projectName">Project Name:</label>
                        <InputText inputName="projectName" 
                                inputValue={newProject.projectName} 
                                onInputChange={handleInputChange} 
                                errorMessage=''/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="description">Description:</label>
                        <InputText inputName="description" 
                                inputValue={newProject.description}
                                onInputChange={handleInputChange}
                                errorMessage=''/>
                    </div>
                </div>
            </Modal>

            <h1>Projects Page</h1>
            <p>Welcome to the projects page!</p>

            <div className="projects-container">
                <div className="container-header-btn">
                    <button className="btn" onClick={handleOpenCreateProject}>Create Project</button>
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
                            projects.map((project: object, index: number) => (
                                <tr key={index} className="table-row">
                                    <td className="table-data">{project.projectName}</td>
                                    <td className="table-data">{project.description}</td>
                                    <td className="table-data">{project.filesCount}</td>
                                    <td className="table-data">{project.jobsCount}</td>
                                    <td className="table-data">{project.createdDate}</td>
                                    <td className="table-data">
                                        <div className="actions-container">
                                            <button onClick={() => handleOpenProject(project.id)} className="btn">Open</button>
                                            <button onClick={() => handleDeleteProject(project.id)} className="btn">Delete</button>
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