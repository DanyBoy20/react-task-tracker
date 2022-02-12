import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import TaskDetails from "./components/TaskDetails";
const App = () => {

  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks();
      setTasks(taskFromServer);
    }
    getTasks();
  }, []);

  // USING JSON (MOCK) SERVER
  // Fetch data (Tasks) from server
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    /* console.log(data); */
    return data;
  }

  // USING JSON (MOCK) SERVER
  // Fetch single data (single task) from server
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    /* console.log(data); */
    return data;
  }

  // USING JSON (MOCK) SERVER
  // Add new task to server
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()
    setTasks([...tasks, data])
  }

  // NOTA! : JSON SERVER CREA AUTOMATICAMENTE ID, POR LO QUE COMENTAMOS 
  // LAS SIGUIENTES LINEAS (funcion original)
  /* const addTask = (task) => {
    console.log(task)
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = {id, ...task}
    setTasks([...tasks, newTask]);
  } */

  // USING JSON (MOCK) SERVER
  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    });
    /* console.log('delete', id); */
    // con filter indicamos que filtre solo los que
    // en su id no sea igual a task.id (al hacer clic, toma el 
    // id donde se hizo click, y en base a ese id, muestra los otros elementos)
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    // USING JSON (MOCK) SERVER
    const res = await fetch(`http://localhost:5000/tasks/${id}`, { 
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(updTask)
    });
    const data = await res.json();
    /* console.log(id); */
    setTasks(
      // con map, reccorro el arreglo tasks, y por cada task, si el task.id es igual al id que se hizo click
      // entonces tomamos task (...task) y asignamos el valor de reminder obtenido del server, sino, solo devolvemos el task como esta
      tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task)
      )
  }

  return (
    <Router>
      <div className="container">
        <Header 
          onAdd={() => setShowAddTask(!showAddTask)} 
          showAdd={showAddTask} 
        />
        {/* RUTAS */} 
        <Routes>
          <Route 
            path='/' 
            element={ 
              <>
              {showAddTask && <AddTask onAdd={addTask} />}
                {
                tasks.length > 0 ? 
                (
                  <Tasks 
                    tasks={tasks} 
                    onDelete={deleteTask}
                    onToggle={toggleReminder} 
                  />
                ) : (
                  'No tasks to show'
                )}
              </>
            }
          />
          <Route path='/about' element={<About />} />
          <Route path='/task/:id' element={<TaskDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

/* ********************************** */
/* ********************************** */
/* PROPS | DEFAULTPROPS AND PROPTYPES */
/* ********************************** */
/* ********************************** */

// 01 APP1 - HEADER1 PASSING PROPS
/* import Header from "./components/Header";
function App() {
  return (
    <div className="container">
      <Header title="Propiedas desde APP" />
    </div>
  );
}
export default App; */

// 02 DEFAULT PROPS IN HEADER (NOTHING IN APP)
/* import Header from "./components/Header";
function App() {
  return (
    <div className="container">
      <Header />
    </div>
  );
}
export default App; */

// 03 PROPTYPES (DATA TYPE)
/* import Header from "./components/Header";
function App() {
  return (
    <div className="container">
      <Header title={1} />
    </div>
  );
}
export default App; */
