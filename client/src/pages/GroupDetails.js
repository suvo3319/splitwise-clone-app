import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addExpense, fetchById, fetchMembersById, simplifiedExpences } from "../api";
import Navbar from "../components/Navbar";
import InputTables from "../components/tables/InputTables";

export default function GroupDetails() {
    const {id} = useParams();
    const [members, setMembers] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchById(id).then(group => {
            const memberId = group.members[0]?.id || '';
            fetchMembersById(id, memberId)
                .then(data => {
                    setMembers(data);
                })
        })
    },[id]);

    const handleSubmitExpenses = async (member) => {
        await addExpense(id, member.id, {owed: member.owed, debt: member.debt});
    }

    const handleSimplify = async () => {
        const res = await simplifiedExpences(id);
        setTransactions(res.transactions || []);
    }

    return (
        <div>
            <Navbar />
            <div className="p-4">
                <InputTables members={members} 
                    onSubmitExpenses={handleSubmitExpenses}
                    onSimplify={handleSimplify}
                    transactions={transactions}
                />
            </div>
        </div>
    )
}