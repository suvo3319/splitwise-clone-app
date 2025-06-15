import { useEffect, useState } from "react";
import { fetchAll } from "../api";
import Navbar from "../components/Navbar";
import GroupCard from "../components/GroupCard";

export default function Home() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetchAll()
            .then(data => {
                setGroups(data);
            })
            .catch(error => {
                console.error("Error fetching groups:", error);
            });
    }, []);
    console.log(`Groups fetched successfully `,groups);

    return (
        <div>
         <Navbar />
            <div className="p-4 flex flex-wrap gap-4">
                {groups.map(group => <GroupCard key={group.id} group={group} />)}
            </div>
        </div>
    )
}