import { useState } from "react";

export default function InputTables({ members, onSubmitExpenses, onSimplify, transactions }) {
    const [data, setData] = useState(Array.isArray(members) && members.map(member => ({...member, owed: 0, debt: 0, total: 0})));
    const handleChange = (id, field, value) => {
        setData(prevData => 
            prevData.map(member => 
                member.id === id ? {...member, [field]: Number(value),total: (field === 'owed' || field === 'debt') ? Number(value) + member.total : member.total} : member
            )
        );
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        data.forEach(d => {
            onSubmitExpenses(d);
        })
    };
    return (
        <div>
            <table className="w-full border table-auto">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Owed</th>
                        <th className="border px-4 py-2">Debt</th>
                        <th className="border px-4 py-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) && data.map(member => (
                        <tr key={member.id} className="text-center">
                            <td className="border px-4 py-2">{member.name}</td>
                            <td className="border px-4 py-2">
                                <input 
                                    type="number" 
                                    value={member.owed} 
                                    onChange={(e) => handleChange(member.id, 'owed', e.target.value)} 
                                    className="w-20 border"
                                />
                            </td>
                            <td className="border px-4 py-2">
                                <input 
                                    type="number" 
                                    value={member.debt} 
                                    onChange={(e) => handleChange(member.id, 'debt', e.target.value)} 
                                    className="w-20 border"
                                />
                            </td>
                            <td className="border px-4 py-2">{member.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex gap-3 mt-4">
                <button 
                    onClick={handleSubmit} 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Submit Expenses
                </button>
                <button 
                    onClick={onSimplify} 
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                    Simplify Expenses
                </button>
                {transactions?.length > 0 && (
                    <div className="mt-5">
                        <h2 className="text-lg font-semibold">Transactions</h2>
                        <ul className="list-disc ml-6">
                            {transactions.map((transaction, index) => (
                                <li key={index} className="text-gray-700">
                                    {transaction.from} owes {transaction.to} ₹{transaction.amount}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}
