import React, { useEffect, useState, useReducer } from "react";
import { useParams } from "react-router-dom";

import type { projectType } from "../reducers/projectReducers";
import { projectReducer, getProjects } from "../reducers/projectReducers";
import { useErrorContext } from "../context/ErrorContext.tsx";

interface fileType {
  name: string;
  size: number;
  type: string;
  fileData: string;
  uploadedDate: string;
}

function ProjectFiles() {
  const [files, setFiles] = useState<File[]>([]);
  const FILE_MAX_SIZE = 1024 * 10; // 10kb
  const { showErrorMessage } = useErrorContext();

  const [projects, dispatchProjectReducer] = useReducer(
    projectReducer,
    [],
    getProjects,
  );

  const { projectId } = useParams<string>();
  const [hasFiles, setHasFiles] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const foundProject = projects.find(
    (project: projectType) => project.id === projectId,
  );
  const [currentProjectFiles, setCurrentProjectFiles] = useState<fileType>(
    foundProject?.projectFiles || [],
  );

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    setFiles(Array.from(e.target.files));
    setHasFiles(true);
    setBtnDisabled(false);
  }

  const convertToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  async function handleFileUpload() {
    const newFiles = await Promise.all(
      files
        .filter((file) => file.size / 1000 <= FILE_MAX_SIZE)
        .map(async (file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          fileData: await convertToBase64(file),
          uploadedDate: new Date().toISOString().split("T")[0],
        })),
    );

    const existingFiles = foundProject.projectFiles || [];
    const updatedProject = {
      ...foundProject,
      projectFiles: [...existingFiles, ...newFiles],
    };
    setCurrentProjectFiles([...existingFiles, ...newFiles]);

    dispatchProjectReducer({ type: "UPDATE_PROJECT", payload: updatedProject });

    showErrorMessage("Files uploaded successfully!");
    setTimeout(() => {
      showErrorMessage("");
    }, 1000);
    setFiles([]);
    setHasFiles(false);
    setBtnDisabled(true);
  }

  function handleFileDelete(index: number) {
    const updatedFiles = currentProjectFiles.filter(
      (file: fileType, i: number) => i !== index,
    );
    setCurrentProjectFiles(updatedFiles);
    // const foundProject = projects.find((project: projectType) => project.id === projectId);
    const updatedProject = {
      ...foundProject,
      projectFiles: updatedFiles,
    };
    dispatchProjectReducer({ type: "UPDATE_PROJECT", payload: updatedProject });
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!e.dataTransfer.files) return;
    setHasFiles(true);
    setBtnDisabled(false);
    setFiles(Array.from(e.dataTransfer.files));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!foundProject) {
      showErrorMessage("No project found. Please create a project first.");
    } else {
      showErrorMessage("");
    }
  }, [foundProject, showErrorMessage]);

  return (
    <div>
      {foundProject ? (
        <div className="project-files-page">
          <h1>Project Files Page</h1>
          <p>Welcome to the project files page!</p>

          <div className="upload-area">
            <div
              className="file-upload-section"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <label htmlFor="ProjectFile" className="file-upload-btn">
                <div className="drag-section">
                  {files.map((file: File, index: number) => (
                    <div className="drag-files-field" key={index}>
                      {file.name} )
                    </div>
                  ))}
                  <div className="drag-area">
                    <p className={hasFiles ? "hide-me" : ""}>
                      Drag and drop files here
                    </p>
                  </div>
                  <input
                    type="file"
                    id="ProjectFile"
                    name="ProjectFile"
                    multiple
                    onChange={handleFileChange}
                  />
                </div>
              </label>
            </div>
            <div>
              <button
                className="btn"
                type="button"
                disabled={btnDisabled}
                onClick={handleFileUpload}
              >
                Upload
              </button>
            </div>
          </div>
          <div className="files-container">
            <div className="preview-section files-section">
              <h2>Files Preview</h2>
              {files.map((file: File, index: number) => (
                <div className="files-field" key={index}>
                  <div>{file.name}</div>
                  <div className="file-size">size : {file.size / 1000} Kb</div>
                  <div className="file-error">
                    {file.size > FILE_MAX_SIZE ? "File size too big" : ""}
                  </div>
                </div>
              ))}
            </div>
            <div className="uploaded-files-section files-section">
              <h2>Uploaded Files</h2>
              <div className="files-content">
                {currentProjectFiles.map((file: fileType, index: number) => (
                  <div className="files-field" key={index}>
                    <div className="file-delete-btn">
                      <span
                        className="file-delete"
                        onClick={() => handleFileDelete(index)}
                      >
                        x
                      </span>
                    </div>
                    <div>{file.name}</div>
                    <div className="file-size">
                      size : {file.size / 1000} Kb | Uploaded Date:{" "}
                      {file.uploadedDate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ProjectFiles;
