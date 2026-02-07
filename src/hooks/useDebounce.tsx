import {useEffect, useState} from "react";
function useDebouce(value: any, delay = 300) {
    const [debouceValue, setDebouceValue] = useState(value)
    useEffect(() => {
        const handler = window.setTimeout(() => {
            setDebouceValue(value)
        }, delay)
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])
    return debouceValue
}

export default useDebouce;