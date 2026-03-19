

// import { useState } from 'react';
import InputText from './InputText';

type ModalType = { 
    projectDetails: {
        projectName: string;
        description: string;
        filesCount: number;
        jobsCount: number;
        createdDate: string;
    },
    setProjectDetails: (details: ModalType['projectDetails']) => void,
    setProjects: (projects: []) => void,
    isNewProject: boolean,
    modalOpen: boolean,
    setModalOpen: (open: boolean) => void,
}

function Modal( { projectDetails, setProjectDetails, setProjects, isNewProject, modalOpen, setModalOpen }: ModalType ) {
    
    function handleOnClose() {
        setModalOpen(false);
    }

    const handleInputChange = (field: string, value: string) => {
        setProjectDetails({
            ...projectDetails,
            [field]: value
        });
    }

    const handleCreateProject = () => {
        const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
        const newProject = {
            ...projectDetails,
            id: Date.now().toString() // since id is not defined in projectDetails, we can generate a unique id using timestamp
        };
        existingProjects.push(newProject);
        setProjects(existingProjects);
        localStorage.setItem('projects', JSON.stringify(existingProjects));
        setModalOpen(false);
    };


    return (
        <div>
            {
                modalOpen && 
                (
                    <div className="modal-container">
                        <div className="modal-overlay"></div>
                        <div className="modal">
                            <div className="modal-content">
                                <div className="modal-header">
                                    {
                                        isNewProject ? (
                                            <h2>Create New Project</h2>
                                        ) :
                                        (
                                            <h2>Project Details</h2>
                                        )
                                    }
                                    <div className="close-btn" onClick={handleOnClose}>
                                        &times;
                                    </div>
                                </div>
                                <div className="modal-body">
                                    {
                                        isNewProject ? (
                                            <div>
                                                <div className="input-group">
                                                    <label htmlFor="projectName">Project Name:</label>
                                                    <InputText inputName="projectName" 
                                                            inputValue={projectDetails.projectName} 
                                                            onInputChange={handleInputChange} 
                                                            errorMessage=''/>
                                                </div>
                                                <div className="input-group">
                                                    <label htmlFor="description">Description:</label>
                                                    <InputText inputName="description" 
                                                            inputValue={projectDetails.description} 
                                                            onInputChange={handleInputChange} 
                                                            errorMessage=''/>
                                                </div>
                                            </div>
                                        ) : 
                                        (
                                            <div>
                                                <p>This is a modal content.</p>
                                                <h3>Project Details</h3>
                                                <p><strong>Project Name:</strong> {projectDetails.projectName}</p>
                                                <p><strong>Description:</strong> {projectDetails.description}</p>
                                                <p><strong>Files Count:</strong> {projectDetails.filesCount}</p>
                                                <p><strong>Jobs Count:</strong> {projectDetails.jobsCount}</p>
                                                <p><strong>Created Date:</strong> {projectDetails.createdDate}</p>
                                            </div>
                                        )
                                    }
                                    
                                </div>
                                <div className="modal-footer">
                                    {isNewProject && <button className="btn" onClick={handleCreateProject}>
                                        Create
                                    </button>}
                                    <button className="btn" onClick={handleOnClose}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Modal