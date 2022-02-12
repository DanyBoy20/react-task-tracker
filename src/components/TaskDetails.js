import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// en react router v6.x ya no se usa match.params
// redirect en react Router V6.x fue reemplazado por Navigate
import Button from './Button';

const TaskDetails = () => {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState({});
  /* const [error, setError] = useState(null); */

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    /* 1. Declaring a boolean flag (componentMounted) fix next error:
    Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    */
    let componentmounted = true;
    const fetchTask = async () => {
      const res = await fetch(`http://localhost:5000/tasks/${params.id}`);
      const data = await res.json();

      if(res.status === 404) {
        navigate('/');
      }

      if(componentmounted) {
        setTask(data);
        setLoading(false);
      }
    }
    fetchTask();
    // 2. after update the state, set to false the flag boolean, in other words
    // when a new effect is to be executed, then it will clean the previous efect.
    return () => {
      componentmounted = false;
    }
  });

  return loading ? (
    <h3>Loading...</h3>
  ) : (
    <div>
      <h3>{task.text}</h3>
      <p>{task.day}</p>  
      <Button onClick={() => {
        navigate(-1);
      }} text='Go back' />    
    </div>
  )

}

export default TaskDetails
