import "./App.css";
import TaskAdder from "./components/TaskAdder";

function App() {
  return (
    <>
      <div className="App">
        <TaskAdder heading="ToD0s List" title="Your Tasks" />
      </div>
    </>
  );
}

export default App;
