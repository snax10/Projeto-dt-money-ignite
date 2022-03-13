import { createContext, useEffect, useState, ReactNode } from 'react'
import { api } from './services/api';


interface transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

// interface TransactionInput {
//     title: string;
//     amount: number;
//     type: string;
//     category: string;
// }

// type TransactionInput = Pick<transaction, 'title' | 'amount' | 'type' | 'category'>
type TransactionInput = Omit<transaction, 'id' | 'createdAt'>


interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}


export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<transaction[]>([])

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, [])

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date().toISOString()
        })
        const { transaction } = response.data

        setTransactions([...transactions, transaction])

    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}
