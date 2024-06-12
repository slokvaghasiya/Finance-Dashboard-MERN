import BoxHeaders from '@/components/BoxHeaders'
import DashboardBox from '@/components/DashboardBox'
import FlexBetween from '@/components/FlexBetween'
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api'
import { Box, Typography } from '@mui/material'
import { useMemo } from 'react'
import { CartesianGrid, Tooltip, Line, LineChart, ResponsiveContainer, XAxis, YAxis, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis } from 'recharts'


const pieData = [
    { name: "Group A", value: 600 },
    { name: "Group B", value: 400 },
]


const Row2 = () => {
    const { data: operationalData } = useGetKpisQuery();
    const { data: productData } = useGetProductsQuery();

    const OperationalExpenses = useMemo(() => {
        return (
            operationalData && operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => {

                return {

                    name: month.substring(0, 3),
                    "Operational Expenses": operationalExpenses,
                    "Non Operational Expenses": nonOperationalExpenses,

                }
            })
        )
    }, [operationalData])

    const productExpenseData = useMemo(() => {
        return (
            productData && productData.map(({ _id, price, expense }) => {
                return {
                    id: _id,
                    price: price,
                    expense: expense
                }
            })
        )
    }, [productData])

    return (
        <>
            <DashboardBox gridArea="d" >
                <BoxHeaders title='Operational vs Non-Operational Expenses' sidetext='+4%' />
                <ResponsiveContainer height={"85%"}>
                    <LineChart
                        data={OperationalExpenses}
                        margin={{
                            top: 20,
                            right: 0,
                            left: -10,
                            bottom: 55,
                        }}
                    >
                        <CartesianGrid vertical={false} stroke="#48494e" />
                        <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
                        <YAxis yAxisId="left" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} orientation='right' />
                        <YAxis yAxisId="right" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} orientation='right' />
                        <Tooltip />
                        <Line dataKey="Non Operational Expenses" yAxisId="left" type="monotone" stroke="#b3b6c2" />
                        <Line dataKey="Operational Expenses" yAxisId="right" type="monotone" stroke="#12efc8" />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardBox>

            <DashboardBox gridArea="e" >
                <BoxHeaders title='Campagies and Targets' sidetext='+4%' />
                <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem" >
                    <PieChart
                        width={110}
                        height={100}
                        margin={{
                            top: 0,
                            right: -10,
                            left: 10,
                            bottom: 0,
                        }} >
                        <Pie
                            stroke='none'
                            data={pieData}
                            innerRadius={18}
                            outerRadius={38}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {pieData.map((index: any) => (
                                <Cell key={`cell-${index}`} fill={"#71f5de"} />
                            ))}
                        </Pie>
                    </PieChart>
                    <Box flexBasis="40%"  >
                        <Typography variant='h5'>Target Sales</Typography>
                        <Typography m="0.3rem 0" variant='h3' color="#71f5de" >83</Typography>
                        <Typography variant='h6' >Final Goals of the campaging that is desired </Typography>
                    </Box>
                    <Box ml="-0.7rem" flexBasis="40%" textAlign="center" >

                        <Typography variant='h5'>Losses in revenue</Typography>
                        <Typography variant='h6' >Losses are down 25%</Typography>
                        <Typography mt="0.4rem" variant='h6' >Profit Margin </Typography>
                        <Typography variant='h6' >Margin are up by 30% from last month</Typography>
                    </Box>
                </FlexBetween>
            </DashboardBox>

            <DashboardBox gridArea="f" >
                <BoxHeaders title='Product Price vs Expenses' sidetext='+4%' />
                <ResponsiveContainer width="100%" height="75%">
                    <ScatterChart
                        margin={{
                            top: 20,
                            right: 25,
                            bottom: 40,
                            left: -10,
                        }}
                    >
                        <CartesianGrid stroke="#48494e" />
                        <XAxis
                            type="number"
                            dataKey="price"
                            name="price"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                            tickFormatter={(v) => `$${v}`} />
                        <YAxis
                            type="number"
                            dataKey="expense"
                            name="expense"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                            tickFormatter={(v) => `$${v}`} />
                        <ZAxis
                            type='number'
                            range={[20]}
                        />
                        <Tooltip formatter={(v) => `$${v}`} />
                        <Scatter name="Product Expense Ratio" data={productExpenseData} fill="#8884d8" />
                    </ScatterChart>
                </ResponsiveContainer>
            </DashboardBox>
        </>
    )
}

export default Row2