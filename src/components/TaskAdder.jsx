import React, { useState, useEffect } from "react";

const TaskAdder = (props) => {
  // Fetching data from localStorage
  const getDataFromLocalStorage = () => {
    let taskData = localStorage.getItem("tasks");

    if (taskData) {
      return JSON.parse(taskData);
    }
  };

  // useStates
  const [data, setdata] = useState("");
  const [taskArray, setTaskArray] = useState(getDataFromLocalStorage());
  const [msg, setMsg] = useState("");
  const [listmsg, setlistMsg] = useState("");

  // Adding Task
  const addTask = () => {
    if (data) {
      let dataWithID = {
        id: new Date().getTime().toString(),
        name: data,
      };
      setTaskArray([...taskArray, dataWithID]);
      setdata("");
      setMsg("Task Added Succesfully");

      setTimeout(() => {
        setMsg("");
      }, 3000);
      setlistMsg("");
    } else {
      setMsg("Please fill Out The Field");
      setTimeout(() => {
        setMsg("");
      }, 3000);
    }
  };

  // Deleting Task
  const deleteTask = (index) => {
    let deletedTask = taskArray.filter((item) => {
      return item.id !== index;
    });
    setTaskArray(deletedTask);
  };

  // Clear the List at one click
  const clearAll = () => {
    if (
      window.confirm(
        "Are you sure you want to delete all the tasks? \n \nOnce Task is Delete it cannot be retrieve."
      )
    ) {
      setTaskArray([]);
      setlistMsg(" Add Some Task Using Above Field 👆");
    }
  };

  // Toggle ClassName to check and uncheck
  const toggleList = (e) => {
    e.target.classList.toggle("task-done");
  };

  // Adding Data to LoaclStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskArray));
  }, [taskArray]);

  return (
    <>
      <h1 className="text-center">{props.heading}</h1>
      <form id="form" className="card-light text-center lg m-1 ">
        <label htmlFor="title">Task:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={data}
          placeholder="Enter Your Task"
          className="input-title"
          onChange={(e) => {
            setdata(e.target.value);
          }}
          required
        />
        <input
          type="button"
          value="ADD"
          onClick={addTask}
          className="btn-add"
        />
        <div className={msg === "Please fill Out The Field" ? "Emsg" : "Smsg"}>
          {msg}
        </div>
      </form>
      <div className="container">
        <h1 className="text-center my-1">{props.title}</h1>
        <div className="lists my-1">
          <div style={{ textAlign: "center" }}>{listmsg}</div>
          {taskArray.map((item) => {
            return (
              <li className="" onClick={toggleList} key={item.id}>
                {item.name}
                <input
                  type="button"
                  onClick={() => deleteTask(item.id)}
                  value="DELETE"
                  className="btn-delete"
                  key={item.id}
                />
              </li>
            );
          })}
        </div>
        <center>
          <button className="btn-delete-all text-center m-1" onClick={clearAll}>
            Clear All
          </button>
        </center>
      </div>
    </>
  );
};

export default TaskAdder;
