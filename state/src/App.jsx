import "./App.css"
import CounterControls from "./features/counter/Counter"
import { useSelector } from "react-redux"

const CounterDisplay = () => {
    const count = useSelector((state) => state.counter.value)
    return <h1>Count: {count}</h1>
}

function App() {
    return (
        <>
            <CounterControls />
            <CounterDisplay />
        </>
    )
}

export default App
