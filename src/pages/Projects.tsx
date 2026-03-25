import { useEffect, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import InputText from "../components/InputText";

import GlobalModuleCSS from "../styles/Global.module.css";
import ProjectsModuleCSS from "../styles/Projects.module.css";

import type { projectType } from "../reducers/projectReducers";
import { projectReducer, getProjects } from "../reducers/projectReducers";

function Projects() {
  const navigate = useNavigate();
  const [newProject, setNewProject] = useState({
    projectName: "New Project Name",
    description: "Project description",
    projectFiles: [],
    projectJobs: [],
    createdDate: new Date().toISOString().split("T")[0],
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [projects, dispatchProjectReducer] = useReducer(
    projectReducer,
    [],
    getProjects,
  );

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  function handleOpenProject(projectId: string) {
    navigate(`/projects/${projectId}`);
  }

  const handleInputChange = (field: string, value: string) => {
    setNewProject({
      ...newProject,
      [field]: value,
    });
  };

  const handleOpenCreateProject = () => {
    setModalOpen(true);
  };
  function handleDeleteProject(projectId: string) {
    dispatchProjectReducer({ type: "DELETE_PROJECT", payload: projectId });
  }

  const handleCreateProject = () => {
    const newProjectVlaues: projectType = {
      ...newProject,
      id: Date.now().toString(), // since id is not defined in projectDetails, we can generate a unique id using timestamp
    };
    dispatchProjectReducer({ type: "ADD_PROJECT", payload: newProjectVlaues });
    setModalOpen(false);
    setNewProject({
      projectName: "",
      description: "",
      projectFiles: [],
      projectJobs: [],
      createdDate: new Date().toISOString().split("T")[0],
    });
  };

  function handleOnClose() {
    setModalOpen(false);
  }

  return (
    <div>
      <Modal
        title="Create New Project"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        footer={
          <>
            <button
              className={GlobalModuleCSS.btn}
              onClick={handleCreateProject}
            >
              Create
            </button>
            <button className={GlobalModuleCSS.btn} onClick={handleOnClose}>
              Close
            </button>
          </>
        }
      >
        <div>
          <div className={GlobalModuleCSS.inputGroup}>
            <label htmlFor="projectName">Project Name:</label>
            <InputText
              inputName="projectName"
              inputValue={newProject.projectName}
              onInputChange={handleInputChange}
              errorMessage=""
            />
          </div>
          <div className={GlobalModuleCSS.inputGroup}>
            <label htmlFor="description">Description:</label>
            <InputText
              inputName="description"
              inputValue={newProject.description}
              onInputChange={handleInputChange}
              errorMessage=""
            />
          </div>
        </div>
      </Modal>

      <h1>Projects Page</h1>
      <p>Welcome to the projects page!</p>

      <div className={ProjectsModuleCSS.projectsContainer}>
        <div className={ProjectsModuleCSS.containerHeaderBtn}>
          <button
            className={GlobalModuleCSS.btn}
            onClick={handleOpenCreateProject}
          >
            Create Project
          </button>
        </div>

        <table>
          <thead>
            <tr align="center">
              <th>Project Name</th>
              <th>Description</th>
              <th>Files Count</th>
              <th>Jobs Count</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project: projectType, index: number) => (
              <tr align="left" key={index}>
                <td className={ProjectsModuleCSS.tableCell}>
                  {project.projectName}
                </td>
                <td className={ProjectsModuleCSS.tableCell}>
                  {project.description}
                </td>
                <td className={ProjectsModuleCSS.tableCell}>
                  {project.projectFiles.length}
                </td>
                <td className={ProjectsModuleCSS.tableCell}>
                  {project.projectJobs.length}
                </td>
                <td className={ProjectsModuleCSS.tableCell}>
                  {project.createdDate}
                </td>
                <td>
                  <div className={ProjectsModuleCSS.actionsContainer}>
                    <button
                      onClick={() => handleOpenProject(project.id)}
                      className={GlobalModuleCSS.btn}
                    >
                      Open
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className={GlobalModuleCSS.btn}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Projects;
