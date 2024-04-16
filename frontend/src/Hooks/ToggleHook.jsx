import { useState } from "react"

export default function useToggle(initial = false) {
    const [state, setState] = useState(initial)
    function toggle(value) {
        if (typeof value === "object") {
            value.stopPropagation()
        }
        if (!typeof value === "boolean") return setState(!value)
        if (typeof value === "boolean") return setState(value)
        setState(!state)
    }
    return [state, toggle]
}