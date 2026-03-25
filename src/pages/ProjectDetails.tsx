import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";

import type { projectType } from "../reducers/projectReducers";
import { projectReducer, getProjects } from "../reducers/projectReducers";

import ProjectDetailsModuleCSS from "../styles/ProjectDetails.module.css";
import GlobalModuleCSS from "../styles/Global.module.css";

function ProjectDeatails() {
  const { projectId } = useParams<string>();
  const navigate = useNavigate();
  const [projects, dispatchProjectReducer] = useReducer(
    projectReducer,
    [],
    getProjects,
  );
  const project: projectType =
    projects.find((p: projectType) => p.id === projectId) || [];

  useEffect(() => {
    dispatchProjectReducer({ type: "GET_PROJECT" });
  }, [projectId]);

  function handleSubmitFiles() {
    navigate(`/projects/${projectId}/files`); // Navigate to the upload page
  }

  return (
    <div>
      <div className={ProjectDetailsModuleCSS.productDetailsPageHeader}>
        <h1>Project Details Page</h1>
        <p>Welcome to the project details page!</p>
      </div>
      {project && (
        <div>
          <div className={ProjectDetailsModuleCSS.projectDetailsContainer}>
            <div className={ProjectDetailsModuleCSS.projectDetailsRow}>
              <span className={ProjectDetailsModuleCSS.projectDetailsLabel}>
                Project Name
              </span>
              <span>
                {project.projectName} - ({project.id})
              </span>
            </div>
            <div className={ProjectDetailsModuleCSS.projectDetailsRow}>
              <span className={ProjectDetailsModuleCSS.projectDetailsLabel}>
                Project Info
              </span>
              <span>{project.description}</span>
            </div>
            <div className={ProjectDetailsModuleCSS.projectDetailsRow}>
              <span className={ProjectDetailsModuleCSS.projectDetailsLabel}>
                Files
              </span>
              <span>{project.projectFiles.length || 0} files</span>
            </div>
            <div className={ProjectDetailsModuleCSS.projectDetailsRow}>
              <span className={ProjectDetailsModuleCSS.projectDetailsLabel}>
                Jobs
              </span>
              <span>{project.projectJobs.length || 0} jobs</span>
            </div>
            <div className={ProjectDetailsModuleCSS.projectDetailsRow}>
              <span className={ProjectDetailsModuleCSS.projectDetailsLabel}>
                Created Date
              </span>
              <span>{project.createdDate}</span>
            </div>
            <div
              className={` ${ProjectDetailsModuleCSS.projectDetailsRow} ${ProjectDetailsModuleCSS.productDetailsBtn}`}
            >
              <input
                type="button"
                className={GlobalModuleCSS.btn}
                value="Upload Files"
                onClick={handleSubmitFiles}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDeatails;
