
function handleCreateProject() {
    alert('Create Project');
}

function handleOpenProject() {
    alert('Open Project');
}

function handleDeleteProject() {
    alert('Delete Project');
}

function Projects() {
    return (
        <div>
            <h1>Projects Page</h1>
            <p>Welcome to the projects page!</p>

            <div className="projects-container">
                <div className="container-header-btn">
                    <button className="btn" onClick={handleCreateProject}>Create Project</button>
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
                        <tr className="table-row-header">
                            <td className="table-data">Sample Project</td>
                            <td className="table-data">Sample description</td>
                            <td className="table-data">5</td>
                            <td className="table-data">3</td>
                            <td className="table-data">2024-01-15</td>
                            <td className="table-data">
                                <div className="actions-container">
                                    <button onClick={() => handleOpenProject()} className="btn">Open</button>
                                    <button onClick={() => handleDeleteProject()} className="btn">Delete</button>

                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default Projects