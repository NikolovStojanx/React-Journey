import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectDetails from "./components/ProjectDetails";
import ProjectsSidebar from "./components/ProjectsSideBar";
import { useState } from 'react'

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text){
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      };
    });    
  }

  function handleDeleteTask(id) {
      setProjectsState((prevState) => {
        const newTasks = prevState.tasks.filter(
          (task) => task.id !== id
        );
        return {
          ...prevState,
          tasks: newTasks,
        };
      });    
  }

    function handleDeleteProject(id) {
      setProjectsState((prevState) => {
        const newProjects = prevState.projects.filter((project) => project.id !== id)

        return {
          // null => adding new project
          ...prevState,
          projects: newProjects,
          selectedProjectId: undefined,
        };
      });
    }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        // null => adding new project
        ...prevState,
        selectedProjectId: id,
      };
    });    
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        // null => adding new project
        ...prevState,
        selectedProjectId: null
      }
    })
  }

  function handleRemoveAddNewProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    })
  }

  function handleAddProject(projectData) {
    const newProject = {
      ...projectData,
      id: Math.random()
    };
    console.log('projectData: ')
    console.log(projectData)

    setProjectsState(prevState => {
      return {
        ...prevState,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = (
    <ProjectDetails
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );
  
  if(projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        onAdd={handleAddProject}
        onCancelSave={handleRemoveAddNewProject}
      />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <ProjectsSidebar
          projectsState={projectsState}
          onStartAddProject={handleStartAddProject}
          onSelectProject={handleSelectProject}
          />
        {content}
      </main>
    </>
  );
}

export default App;
