export interface ExpensesByCategory {

    salary: number;
    supplies: number;
    service: number;

}
export interface Month {
    id: string,
    month: string,
    revenue: number,
    expenses: number,
    nonOperationalExpenses: number
    operationalExpenses: number
}

export interface day {
    id: string,
    month: string,
    revenue: number,
    expenses: number,
}

export interface GetkpisResponse {
    id: string;
    _id: string;
    __v: number;
    totalProfit: number;
    totalRevenue: number;
    totalExpenses: number;
    expensesByCategory: ExpensesByCategory;
    monthlyData: Array<Month>;
    dailyData: Array<day>;
    createdAt: string;
    updateddAt: string;
}
export interface GetProductsResponse {
    id: string;
    _id: string;
    __v: number;
    price: number;
    expense: number;
    transactions: number;
    expensesCategort: Array<string>;
    createdAt: string;
    updateddAt: string;
}

export interface GetTransactionsResponse {
    id: string;
    _id: string;
    __v: number;
    buyer: string;
    amount: number;
    productIds: Array<string>;
    createdAt: string;
    updateddAt: string;
}