import { useEffect, useState } from "react";

export default function InputTables({ members, onSubmitExpenses, onSimplify, transactions }) {
    //console.log(`Members in InputTables component: ${members}`, members);
    //console.log(`Transactions in InputTables component: ${transactions}`, transactions);
    const [data, setData] = useState([]);
    const [simplified, setSimplified] = useState([]);

    useEffect(() => {
        const initializeData = async () => {
            await new Promise(resolve => setTimeout(resolve, 0)); // Simulate async behavior
            setData([...members.map(member => ({
                ...member,
                owed: member.owed || 0,
                debt: member.debt || 0
            }))]);
            setSimplified([...transactions.map(transaction => ({
                from: transaction.from,
                to: transaction.to,
                amount: transaction.amount
            }))] || []);
        };
        initializeData();
    }, [members, transactions]);

    const handleChange = (index, field, value) => {
        const newData = [...data];
        newData[index][field] = value;
        setData(newData);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        data.forEach((member) => {
            if (member.owed || member.debt) {
                onSubmitExpenses(member);
            }
        });
        setData(members);
    }
    const handleSimplify = () => {
        onSimplify();
        setSimplified(transactions);
    }
    //console.log(`data in InputTables component: ${data}`, data);
    //console.log(`Transactions in InputTables: ${transactions}`, transactions);
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Group Expenses</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Member</th>
                            <th className="py-2 px-4 border-b">Owed</th>
                            <th className="py-2 px-4 border-b">Debt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((member, index) => (
                            <tr key={member.id}>
                                <td className="py-2 px-4 border-b">{member.name}</td>
                                <td className="py-2 px-4 border-b">
                                    <input
                                        type="number"
                                        value={member.owed || ''}
                                        onChange={(e) => handleChange(index, 'owed', e.target.value)}
                                        className="border rounded px-2 py-1 w-full"
                                    />
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <input
                                        type="number"
                                        value={member.debt || ''}
                                        onChange={(e) => handleChange(index, 'debt', e.target.value)}
                                        className="border rounded px-2 py-1 w-full"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Submit Expenses
                    </button>
                    <button
                        type="button"
                        onClick={handleSimplify}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
                    >
                        Simplify Expenses
                    </button>
                </div>
            </form>
            {simplified.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-4">Simplified Transactions</h2>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">From</th>
                                <th className="py-2 px-4 border-b">To</th>
                                <th className="py-2 px-4 border-b">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {simplified.map((transaction, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b">{transaction.from}</td>
                                    <td className="py-2 px-4 border-b">{transaction.to}</td>
                                    <td className="py-2 px-4 border-b">{transaction.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
