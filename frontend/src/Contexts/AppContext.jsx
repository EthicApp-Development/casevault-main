import React from "react";

const AppContext = React.createContext({})
export default AppContext


export function useAppContext() {
    const context = React.useContext(AppContext);
    return context;
}