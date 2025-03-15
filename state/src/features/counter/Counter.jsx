import { useDispatch } from "react-redux"
import { increment, decrement, incrementByAmount, reset } from "./counterSlice"

const CounterControls = () => {
    const dispatch = useDispatch()

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "40px",
            }}
        >
            <button onClick={() => dispatch(increment())}>Increment +</button>
            <button onClick={() => dispatch(decrement())}>Decrement -</button>
            <button onClick={() => dispatch(incrementByAmount(5))}>
                Increment +5
            </button>
            <button
                style={{
                    backgroundColor: "red",
                }}
                onClick={() => dispatch(reset())}
            >
                Reset
            </button>
        </div>
    )
}

export default CounterControls
