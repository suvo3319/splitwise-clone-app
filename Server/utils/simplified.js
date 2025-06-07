export const simplified = (users) => {
    const balances = users.map(user => ({
        ...user,
        balance: user.debt - user.owed,
        transactions: []
    }));

    const active = balances.filter(user => Math.abs(user.balance) > 1e-6);

    while (true) {
        active.sort((a, b) => a.balance - b.balance);

        const debtor = active[0];
        const creditor = active[active.length - 1];

        if (Math.abs(debtor.balance) < 1e-6 && Math.abs(creditor.balance) < 1e-6) {
            break; // No more transactions needed
        }
        const amount = Math.min(-debtor.balance, creditor.balance);

        debtor.transactions.push({
            to: creditor.name,
            toId: creditor.id,
            amount: amount
        });

        creditor.transactions.push({
            from: debtor.name,
            fromId: debtor.id,
            amount: amount
        });

        debtor.balance += amount;
        creditor.balance -= amount;
    }

    return balances.map(user => ({
        id: user.id,
        name: user.name,
        transactions: user.transactions
    }));
}