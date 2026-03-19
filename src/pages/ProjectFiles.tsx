
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface projectType {
    id: string;
    projectName: string;
    description: string;
    files: any[];
    jobs: any[];
    createdDate: string;
}
interface fileType {
    name: string;
    size: number;
    type: string;
    fileData: string;
    uploadedDate: string;
}

function ProjectFiles() {
    const [files, setFiles ] = useState<File[]>([]);
    const [ progressBar, setProgressBar ] = useState<number>(0);
    const [ projects, setProjects ] = useState<projectType[]>([]);
    const { projectId } = useParams<{ id: string }>()
    const [ hasFiles, setHasFiles ] = useState(false);
    const [ message, setMessage ] = useState('');
    const [ btnDisabled, setBtnDisabled ] = useState(true);
    const [ currentProjectFiles, setCurrentProjectFiles ] = useState<any[]>([]);

    function handleFileChange (e:any) {
        if(!e.target.files || e.target.files.length === 0) return
        setFiles(Array.from(e.target.files))
        // setCurrentProjectFiles(Array.from(e.target.files))
        setHasFiles(true);
        setBtnDisabled(false);
    }

    async function handleFileUpload(e: any) {
        const foundProject = projects.find((project: projectType) => project.id === projectId);
        
        const convertToBase64 = ((file: File) =>{
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = () => resolve(reader.result)
                reader.onerror = reject
                reader.readAsDataURL(file)
            })
        })

        const newFiles = []
        for (const file of files) {
            const base64File = await convertToBase64(file)
            newFiles.push({
                name: file.name,
                size:file.size,
                type: file.type,
                fileData: base64File,
                uploadedDate: new Date().toISOString().split('T')[0]
            })
        }

        const existingFiles = foundProject.projectFiles || [];
        const updatedProject = {
            ...foundProject,
            projectFiles: [...existingFiles, ...newFiles]
        }
        setCurrentProjectFiles([...existingFiles, ...newFiles]);
        
        const updatedProjects = projects.map((project: projectType) => 
            project.id === projectId ? updatedProject : project
        );
        setProjects(updatedProjects);

        localStorage.setItem('projects', JSON.stringify(updatedProjects));

        setMessage('Files uploaded successfully!');
        setTimeout( () =>{
            setMessage('');
        }, 1000)
        setFiles([]);
        setHasFiles(false);
        setBtnDisabled(true);
    }

    function handleFileDelete(index: number) {
        const updatedFiles = currentProjectFiles.filter((file: any, i: number) => i !== index);
        setCurrentProjectFiles(updatedFiles);
        const foundProject = projects.find((project: projectType) => project.id === projectId);
        const updatedProject = {
            ...foundProject,
            projectFiles: updatedFiles
        }
        const updatedProjects = projects.map((project: projectType) => 
            project.id === projectId ? updatedProject : project
        );
        setProjects(updatedProjects);
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
    }

    const handleDrop = (e:any) => {
        e.preventDefault();
        if(!e.dataTransfer.files) return
        setHasFiles(true);
        setBtnDisabled(false)
        setFiles(Array.from(e.dataTransfer.files))
    }

    const handleDragOver = (e:any) => {
        e.preventDefault();
    }

    useEffect (() =>{
        const data = JSON.parse(localStorage.getItem('projects') || '[]') 
        const foundProject = data.find((project: projectType) => project.id === projectId);
        if (data.length === 0 || !foundProject) {
            setMessage('No project found. Please create a project first.');
            return;
        }
        setProjects(data);
        
        setCurrentProjectFiles(foundProject.projectFiles || []);
    }, [])

    return (
        <div>

            {message.length ? <div className="message">{message}</div> : 
            <div className="project-files-page">
                <h1>Project Files Page</h1>
                <p>Welcome to the project files page!</p>

                <div className='upload-area'>

                    <div className="file-upload-section" onDrop={handleDrop} onDragOver={handleDragOver}>

                        <label htmlFor="ProjectFile" className="file-upload-btn">
                            <div className="drag-section">
                                {
                                    files.map((file: File, index: number) => (
                                        <div className="drag-files-field" key={index}>{file.name} )</div>
                                    ))
                                    
                                }
                                <div className="drag-area">
                                    <p className={hasFiles ? "hide-me" : ""}>Drag and drop files here</p>
                                </div>    
                                <input type="file" id="ProjectFile" name="ProjectFile" multiple onChange={handleFileChange} />
                            </div>
                        </label>

                    </div>
                    <div>
                        <button type="button" disabled={btnDisabled} onClick={handleFileUpload}>Upload</button>
                    </div>
                </div>
                <div className="files-container">
                    <div className="preview-section files-section">
                        <h2>Files Preview</h2>
                        {
                            files.map((file: File, index: number) => (
                                <div className="files-field" key={index}>
                                    <div>{file.name}</div>
                                    <div className="file-size">size : {file.size} bytes</div>
                                </div>
                            ))
                        }

                    </div>
                    <div className="uploaded-files-section files-section">
                        <h2>Uploaded Files</h2>
                        <div className="files-content">
                            {
                                currentProjectFiles.map((file: fileType, index: number) => (
                                    <div className="files-field" key={index}>
                                        <div className="file-delete-btn">
                                            <span className="file-delete" onClick={() => handleFileDelete(index)}>x</span>
                                        </div>
                                        <div>{file.name}</div>
                                        <div className="file-size">size : {file.size} bytes | Uploaded Date: {file.uploadedDate}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                
            </div>
            }
        </div>
    )
}

export default ProjectFiles