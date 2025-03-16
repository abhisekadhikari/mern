import { useState } from "react"
import { Check, Trash } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { addTodo } from "./features/todoSlice"

export default function App() {
    const [task, setTask] = useState("")
    const dispatch = useDispatch()
    const todos = useSelector((state) => state.todo)

    console.log(typeof todos)

    todos.todos.map((todo) => {
        console.log(todo)
    })

    const addTask = () => {
        if (task.trim() !== "") {
            dispatch(addTodo({ title: task }))
            setTask("")
        }
    }

    return (
        <div
            style={{
                maxWidth: "400px",
                margin: "20px auto",
                padding: "20px",
                background: "white",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
            }}
        >
            <h1
                style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                }}
            >
                To-Do List
            </h1>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <input
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Add a new task"
                    style={{
                        flex: 1,
                        padding: "8px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                    }}
                />
                <button
                    onClick={addTask}
                    style={{
                        padding: "8px 12px",
                        background: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Add
                </button>
            </div>
            {/* <div>
                {todos.map((t, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            background: "#f5f5f5",
                            padding: "10px",
                            borderRadius: "5px",
                            marginBottom: "5px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                textDecoration: t.completed
                                    ? "line-through"
                                    : "none",
                                color: t.completed ? "gray" : "black",
                            }}
                        >
                            <button
                                // onClick={() => dispatch(toggleTodo(index))}
                                style={{
                                    padding: "5px",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                <Check
                                    style={{
                                        color: t.completed ? "green" : "gray",
                                    }}
                                />
                            </button>
                            {t.title}
                        </div>
                        <button
                            // onClick={() => dispatch(deleteTodo(index))}
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "red",
                            }}
                        >
                            <Trash size={18} />
                        </button>
                    </motion.div>
                ))}
            </div> */}
        </div>
    )
}
