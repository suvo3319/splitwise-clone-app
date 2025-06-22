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
        const fetchGroupDetails = async () => {
            try {
                const group = await fetchById(id);
                const memberDetails = await Promise.all(
                    group.members.map(async (member) => {
                        const memberData = await fetchMembersById(id, member.id);
                        return {
                            id: member.id,
                            name: member.name,
                            owed: memberData.owed || 0,
                            debt: memberData.debt || 0,
                        };
                    })
                );
                setMembers(memberDetails);
            } catch (error) {
                console.error("Error fetching group details:", error);
            }
        };

        fetchGroupDetails();
    }, [id]);

    //console.log(`Members fetched successfully `, members);

    const handleSubmitExpenses = async (member) => {
        await addExpense(id, member.id, {owed: member.owed, debt: member.debt});
    }

    const handleSimplify = async () => {
        try {
            const res = await simplifiedExpences(id);
            const transactionDetails = res.flatMap(member => 
                member.transactions.map(transaction => ({
                    id: member.id,
                    from: transaction.from || member.name,
                    fromId: transaction.fromId || member.id,
                    to: transaction.to || member.name,
                    toId: transaction.toId || member.id,
                    amount: transaction.amount,
                }))
            );
            setTransactions(transactionDetails);
        } catch (error) {
            console.error("Error simplifying transactions:", error);
        }
    }
    //console.log(`Transactions in GroupDetails: ${transactions}`, transactions);

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