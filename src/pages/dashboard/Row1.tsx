import BoxHeaders from '@/components/BoxHeaders';
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery } from '@/state/api'
import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Line, CartesianGrid, Legend, LineChart, BarChart, Bar, Rectangle } from 'recharts';

const Row1 = () => {

    const { data } = useGetKpisQuery();
    const { palette } = useTheme()

    const revenueExpenses = useMemo(() => {
        return (
            data && data[0].monthlyData.map(({ month, revenue, expenses }) => {
                return {

                    name: month.substring(0, 3),
                    revenue: revenue,
                    expenses: expenses
                }
            })
        )
    }, [data])

    const revenueProfit = useMemo(() => {
        return (
            data && data[0].monthlyData.map(({ month, revenue, expenses }) => {
                return {

                    name: month.substring(0, 3),
                    revenue: revenue,
                    profit: (revenue - expenses).toFixed(2),
                }
            })
        )
    }, [data])

    const revenue = useMemo(() => {
        return (
            data && data[0].monthlyData.map(({ month, revenue }) => {
                return {

                    name: month.substring(0, 3),
                    revenue: revenue
                }
            })
        )
    }, [data])


    return (
        <>
            <DashboardBox gridArea="a" style={{height:"95%"}} >
                <BoxHeaders title='Revenue and Expenses' subtitle='top line reprsents revenue, bottom line represents expenses' sidetext='+4%' />
                <ResponsiveContainer width="100%" height={"90%"} >
                    <AreaChart
                        width={500}
                        height={400}
                        data={revenueExpenses}
                        margin={{
                            top: 15,
                            right: 25,
                            left: -5,
                            bottom: 60,
                        }}
                    >
                        <defs>
                            <linearGradient id='colorRevenue' x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
                                <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id='colorExpenses' x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
                                <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
                        <YAxis tickLine={false} axisLine={{ strokeWidth: "10px" }} domain={[8000, 23000]} style={{ fontSize: "10px" }} />
                        <Tooltip />
                        <Area type="monotone" dot={true} dataKey="revenue" stroke={palette.primary.main} fillOpacity={1} fill="url(#colorRevenue)" />
                        <Area type="monotone" dot={true} dataKey="expenses" stroke={palette.primary.main} fillOpacity={1} fill="url(#colorExpenses)" />
                    </AreaChart>
                </ResponsiveContainer>
            </DashboardBox>

            <DashboardBox gridArea="b" style={{height:"90%"}} >
                <BoxHeaders title='Revenue and Expenses' subtitle='Revenue and profit' sidetext='+4%' />
                <ResponsiveContainer width="100%" height={"80%"} >
                    <LineChart
                        data={revenueProfit}
                        margin={{
                            top: 20,
                            right: 0,
                            left: -10,
                            bottom: 55,
                        }}
                    >
                        <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                        <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
                        <YAxis yAxisId="left" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
                        <YAxis yAxisId="right" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} orientation='right' />
                        <Tooltip />
                        <Legend height={20} wrapperStyle={{ margin: "0 0 10px 0" }} />
                        <Line dataKey="profit" yAxisId="left" type="monotone" stroke={palette.grey[500]} />
                        <Line dataKey="revenue" yAxisId="right" type="monotone" stroke={palette.primary.main} />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardBox>

            <DashboardBox gridArea="c" style={{height:"95%"}} >
                <BoxHeaders title='Revenue and Expenses' subtitle='graph representing the revenue month by month' sidetext='+4%' />
                <ResponsiveContainer width="100%" height={"90%"}>
                    <BarChart
                        width={500}
                        height={300}
                        data={revenue}
                        margin={{
                            top: 17,
                            right: 15,
                            left: -5,
                            bottom: 58,
                        }}
                    >
                        <defs>
                            <linearGradient id='colorRevenue' x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: "10px" }} />
                        <YAxis axisLine={false} tickLine={false} style={{ fontSize: "10px" }} />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="url(#colorRevenue)" />
                    </BarChart>
                </ResponsiveContainer>
            </DashboardBox>

        </>
    )
}

export default Row1