import { useState, useEffect } from "react";
import { getUser } from "../API/user";
import { GetFromLocalStorage } from '../../storage-commons'

export default function getCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            const accountString = GetFromLocalStorage("account");
            if (accountString) {
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
