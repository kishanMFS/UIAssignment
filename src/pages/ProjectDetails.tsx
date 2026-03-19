
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Project {
    id: string;
    projectName: string;
    description: string;
    files: any[];
    jobs: any[];
}

function ProjectDeatails() {
    const { projectId } = useParams();

    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        
            const projects = JSON.parse(localStorage.getItem('projects') || '[]');
            const foundProject = projects.find((p: Project) => p.id === projectId);
            setProject(foundProject);
        
    }, [projectId]);

    return (
        <div>
            <h1>Project Details Page</h1>
            <p>Welcome to the project details page!</p>
            {project && (
                <div>
                    <div className="project-details-container">
                        <div className='project-details-row'>
                            <span>Project Name</span>
                            <span>{project.projectName}</span>
                        </div>
                        <div className="project-details-row">
                            <span>Project Info</span>
                            <span>{project.description}</span>
                        </div>
                        <div className='project-details-row'>
                            <span>Files</span>
                            <span>{project.files?.length || 0} files</span>
                        </div>
                        <div className='project-details-row'>
                            <span>Jobs</span>
                            <span>{project.jobs?.length || 0} jobs</span>
                        </div>
                    </div> </div>
            )}
        </div>
    )
}

export default ProjectDeatails