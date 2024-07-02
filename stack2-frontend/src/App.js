import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import './App.css';
import './safarie.jpg'
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { MdUpdate } from "react-icons/md";




function App() {
  const [isCompleteScreen,setIsCompleteScreen] = useState(false);
  const [allTodos,setTodos] = useState ([]);
  const [newTitle,setNewTitle] = useState("");
  const [newDescription,setNewDescription] = useState("");
  const [completedTodos,setCompletedTodos] = useState ([]);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:5000/');
    const todos = response.data;
    setTodos(todos.filter(todo => !todo.isCompleted));
    setCompletedTodos(todos.filter(todo => todo.isCompleted));
  };

  const handleAddTodo = async () => {
    const newTodo = {
      title: newTitle,
      description: newDescription
    };
    await axios.post('http://localhost:5000/add', newTodo);
    fetchTodos();
  };

  const handleUpdateTodos = async (id) => {
    const newTitle = prompt("Entrez le nouveau titre de la tâche");
    const newDescription = prompt("Entrez la nouvelle description de la tâche");
    await axios.put(`http://localhost:5000/update/${id}`, {
      title: newTitle,
      description: newDescription
    });
    fetchTodos();
  };

  const handleDeleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/delete/${id}`);
    fetchTodos();
  };
  

  const handleComplete = async (id) => {
    await axios.put(`http://localhost:5000/${id}`, {
      isCompleted: true,
      completedOn: new Date()
    });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);


  return (
    <div className="App">
      <Header />
      <div className="App-wrapper">
        <div className="App-input">
          <div className="App-input-item">
            <label>Title</label>
            <input type="text" name="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Entrez le titre de votre tâche" required />
          </div>
          <div className="App-input-item">
            <label>Description</label>
            <input type="text" name="description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Décrivez votre tâche" required />
          </div>
          <div className="App-input-item">
            <button type="button" className="primaryBtn" onClick={handleAddTodo}>Add</button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="App-list">
          {isCompleteScreen === false && allTodos.map((item, index) => (
            <div className="App-list-item" key={item._id}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div>
                <AiOutlineDelete className="icon" onClick={() => handleDeleteTodo(item._id)} title="Delete?" />
                <MdUpdate className="icon2" onClick={() => handleUpdateTodos(item._id)} title="Update?" />
                <BsCheckLg className="check-icon" onClick={() => handleComplete(item._id)} title="Completed?" />
              </div>
            </div>
          ))}

          {isCompleteScreen === true && completedTodos.map((item, index) => (
            <div className="App-list-item" key={item._id}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p><small>Completed on : {item.completedOn}</small></p>
              </div>
              <div>
                <AiOutlineDelete
                  className="icon"
                  onClick={() => handleDeleteTodo(item._id)}
                  title="Delete?" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );


 /*  return (  
    <div className="App">
      <Header />
      <div className="App-wrapper">
        <div className="App-input">
          <div className="App-input-item">
            <label>Title</label>   
            <input type="text" name="title" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="Entrez le titre de votre tâche" required/>
          </div>  
          <div className="App-input-item">
            <label>Description</label>
            <input type="text" name="description" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="Décrivez votre tâche" required/>
          </div>
          <div className="App-input-item">
            <button type="button" className="primaryBtn" onClick={handleAddTodo}>Add</button>
          </div>
        </div>

        <div className="btn-area">
          <button 
            className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
            onClick={()=>setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button 
            className={`secondaryBtn ${isCompleteScreen===true && 'active'}`} 
            onClick={()=>setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
      
        <div className="App-list">
            {isCompleteScreen===false && allTodos.map((item,index)=>{
              return(
                <div className="App-list-item" key={index}>
                  <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                  </div>
                  <div>
                      <AiOutlineDelete className="icon" onClick={()=>handleDeleteTodo(index)} title="Delete?"/>
                      <MdUpdate className="icon2" onClick={()=>handleUpdateTodos(index)} title="Update?" />

                      <BsCheckLg className="check-icon" onClick={()=>handleComplete(index)} title="Completed?"/>
                  </div>
                </div>
              )
            })}   

            {isCompleteScreen===true && completedTodos.map((item,index)=>{
              return(
                <div className="App-list-item" key={index}>
                  <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <p><small>Completed on : {item.CompletedOn}</small></p>
                  </div>
                  <div>
                      <AiOutlineDelete 
                        className="icon" 
                        onClick={()=>handleDeleteTodo(index)}
                        title="Delete?"/>
                  </div>
                </div>
              )
            })}        
        </div>
      </div>
    </div>
  ); */
}

export default App;

