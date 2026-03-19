
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Project {
    id: string;
    projectName: string;
    description: string;
    files: any[];
    jobs: any[];
    createdDate: string;
}

function ProjectDeatails() {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        
            const projects = JSON.parse(localStorage.getItem('projects') || '[]');
            const foundProject = projects.find((p: Project) => p.id === projectId);
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
                            <span>{project.files?.length || 0} files</span>
                        </div>
                        <div className='project-details-row'>
                            <span className='project-details-label'>Jobs</span>
                            <span>{project.jobs?.length || 0} jobs</span>
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