import React, { createContext, useState, useContext } from 'react';

const TabContext = createContext();

export const TabProvider = ({ children }) => {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <TabContext.Provider value={{ selectedTab, setSelectedTab }}>
            {children}
        </TabContext.Provider>
    );
};

export const useTabContext = () => useContext(TabContext);