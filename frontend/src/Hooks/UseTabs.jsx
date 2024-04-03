import { useState } from "react"

export default function useTabs(initial = 0) {
    const [state, setState] = useState(initial)
    function onChange(e, v) { setState(v) }
    return [state, onChange, setState]
}