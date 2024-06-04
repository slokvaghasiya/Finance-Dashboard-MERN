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
    __v: string;
    totalProfit: number;
    totalRevenue: number;
    totalExpenses: number;
    expensesCategort: ExpensesByCategory;
    monthlyData: Array<Month>
    dailyData: Array<day>
}