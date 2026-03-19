

import { useState } from 'react';
import InputText from './InputText';

type ModalType = { 
    projectDetails: {
        projectName: string;
        description: string;
        filesCount: number;
        jobsCount: number;
        createdDate: string;
    }, 
    isNewProject: boolean,
    modalOpen: boolean,
    onClose: (open: boolean) => void,
}

function Modal( { projectDetails, isNewProject, modalOpen, onClose }: ModalType ) {
    const [isDeleteAvailable, setIsDeleteAvailable] = useState<boolean>(false);
    
    function handleOnClose() {
        // alert('Close Modal');
        onClose(false);
    }

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
                                                    <InputText value={projectDetails.projectName} onInputChange={(value) => {}} />
                                                </div>
                                                <div className="input-group">
                                                    <label htmlFor="description">Description:</label>
                                                    <InputText value={projectDetails.description} onInputChange={(value) => {}} />
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
                                    {isDeleteAvailable && <button className="btn">Update</button>}
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