import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { TASKS_URL, COMPLETE_TASK_URL, DELETE_TASK_URL } from '../util/api';

const Task = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [isCreatingTask, setIsCreatingTask] = useState(false); 
  const [isCompletingTask, setIsCompletingTask] = useState(false); 
  const [isDeletingTask, setIsDeletingTask] = useState(false); 

  const auth = useSelector(state => state.auth);
  const token = auth.token;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(TASKS_URL, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setIsCreatingTask(true);
    try {
      const response = await axios.post(TASKS_URL, {
        title,
        description,
        status: 'PENDING',
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks([...tasks, response.data]);
      setIsCreating(false);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreatingTask(false);
    }
  };

  const handleCompleteTask = async (taskId) => {
    setIsCompletingTask(true);
    try {
      await axios.put(COMPLETE_TASK_URL(taskId), null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, status: 'COMPLETED' };
        }
        return task;
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsCompletingTask(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    setIsDeletingTask(true);
    try {
      await axios.delete(DELETE_TASK_URL(taskId), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeletingTask(false);
    }
  };

  const openCreateTaskDialog = () => {
    setIsCreating(true);
  };

  const closeCreateTaskDialog = () => {
    setIsCreating(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      {isLoading && <div className="loading-overlay"><div className="loading-message">Cargando...</div></div>}
      {isCreatingTask && <div className="loading-overlay"><div className="loading-message">Creando tarea...</div></div>}
      {isCompletingTask && <div className="loading-overlay"><div className="loading-message">Completando tarea...</div></div>}
      {isDeletingTask && <div className="loading-overlay"><div className="loading-message">Eliminando tarea...</div></div>}
      
      <button className="btn btn-secondary" onClick={() => navigate('/login')} style={{ margin: '10px', marginBottom: '10px' }}>
        Volver
      </button>

      <button className="btn btn-primary" onClick={openCreateTaskDialog} style={{ margin: '10px' }}>
        Crear Tarea
      </button>

      {isCreating && (
        <div className="task-dialog">
          <div className="task-dialog-content" style={{ width: '400px', padding: '20px' }}>
            <form onSubmit={handleCreateTask} className="task-form">
              <div className="form-group">
                <label htmlFor="title">Titulo:</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Descripción:</label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="form-control"
                />
              </div>

              <button type="submit" className="btn btn-success" style={{ margin: '7px' }}>
                Aceptar
              </button>
              <button type="button" className="btn btn-danger" style={{ margin: '7px' }} onClick={closeCreateTaskDialog}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="task-grid">
        {tasks.map(task => (
          <div key={task.id} className={`task-card ${task.status === 'COMPLETED' ? 'completed' : 'pending'}`}>
            <h4 className="task-title">Titulo: {task.title}</h4>
            <p className="task-description">Descripción: {task.description}</p>
            <div className="task-status">
              <label htmlFor={`status-${task.id}`}>Estado:</label>
              {task.status === 'COMPLETED' ? (
                <span className="badge badge-success">Completada</span>
              ) : (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={() => handleCompleteTask(task.id)}
                    checked={task.status === 'COMPLETED'}
                    id={`status-${task.id}`}
                    disabled={task.status === 'COMPLETED'}
                    style={{ boxShadow: '0px 0px 3px 2px #888888', backgroundColor: '#555555' }}
                  />
                  <label className="form-check-label" htmlFor={`status-${task.id}`}>
                    Pendiente
                  </label>
                </div>
              )}
            </div>
            <button className="btn btn-danger mt-2" onClick={() => handleDeleteTask(task.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
