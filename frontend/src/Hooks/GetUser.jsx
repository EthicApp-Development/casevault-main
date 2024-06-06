import { useState, useEffect } from "react";
import { getUser } from "../API/user";

export default function getCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            const accountString = localStorage.getItem("account");
            if (accountString) {
                console.log("accountString", accountString);
                const account = JSON.parse(accountString);
                const userId = account.id;
                try {
                    const response = await getUser(userId);
                    setUser(response.data.info);
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            }
        };

        fetchUser();
    }, []);

    return user;
}
