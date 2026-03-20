
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useReducer } from 'react';

import type { projectType } from '../reducers/projectReducers';
import { projectReducer, initialProject } from '../reducers/projectReducers';

function ProjectDeatails() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [ projects, dispatchProjectReducer ] = useReducer(projectReducer, [], initialProject)
    const [ project, setProject ] = useState<projectType>() 

    useEffect(() => {
        dispatchProjectReducer({ type:"GET_PROJECT", payload: projectId })
        const foundProject = projects.find((p: projectType) => p.id === projectId);
        setProject(foundProject);        
    }, [projectId]);

    function handleSubmitFiles() {
        navigate(`/projects/${projectId}/files`); // Navigate to the upload page
    }

    return (
        <div>
            <h1>Project Details Page</h1>
            <p>Welcome to the project details page!</p>
            {project && (
                <div>
                    <div className="project-details-container">
                        <div className='project-details-row'>
                            <span className='project-details-label'>Project Name</span>
                            <span>{project.projectName} - ({project.id})</span>
                        </div>
                        <div className="project-details-row">
                            <span className='project-details-label'>Project Info</span>
                            <span>{project.description}</span>
                        </div>
                        <div className='project-details-row'>
                            <span className='project-details-label'>Files</span>
                            <span>{project.projectFiles.length || 0} files</span>
                        </div>
                        <div className='project-details-row'>
                            <span className='project-details-label'>Jobs</span>
                            <span>{project.projectJobs.length || 0} jobs</span>
                        </div>
                        <div className='project-details-row'>
                            <span className='project-details-label'>Created Date</span>
                            <span>{project.createdDate}</span>
                        </div>
                        <div className='project-details-row'>
                            <input type="button" value="Upload Files" onClick={handleSubmitFiles} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProjectDeatails