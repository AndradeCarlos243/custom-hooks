import { useState } from "react";

export const useCounter = (initialState = 10) => {
    const [counter, setCounter] = useState(initialState);
    
    const increment = (valor = 1) => {
        setCounter((current) => current + valor);
    };
    
    const decrement = (valor = 1) => {
        if ((counter - valor) <= 0) return setCounter(0);
        setCounter((current) => current - valor);
    };
    
    const reset = () => {
        setCounter(initialState);
    };
    
    return {
        counter,
        increment,
        decrement,
        reset,
    };
};

export default useCounter;