import DashboardBox from '@/components/DashboardBox'
import FlexBetween from '@/components/FlexBetween'
import { useGetKpisQuery } from '@/state/api'
import { Box, Button, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { CartesianGrid, Tooltip, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Label } from 'recharts'
import regression, { DataPoint } from "regression";


const Predictions = () => {

    const [isPrediction, setIsPrediction] = useState(false)
    const { data: kpisData } = useGetKpisQuery();

    const formattedData = useMemo(() => {
        if (!kpisData) return [];
        const monthData = kpisData[0].monthlyData;
        const formatted: Array<DataPoint> = monthData.map(
            ({ revenue }, i: number) => {
                return [i, revenue]
            }
        )
        const regressionLine = regression.linear(formatted)
        return monthData.map(({ month, revenue }, i: number) => {
            return {
                name: month,
                "Actual Revenue": revenue,
                "Regression Line": regressionLine.points[i][1],
                "Predicted Revenue": regressionLine.predict(i + 12)[1],
            }
        })
    }, [kpisData])

    return (
        <DashboardBox width="100%" height="100%" padding="1rem" overflow="hidden" >
            <FlexBetween m="1rem 2.5rem" gap="1rem" >
                <Box>
                    <Typography variant='h3' >Revenue and Predictions</Typography>
                    <Typography variant='h6' >Charted Revenue and predicted revenue based on a simple linear regression model</Typography>
                </Box>
                <Button onClick={() => setIsPrediction(true)} sx={{
                    color: "#242427",
                    bgcolor: "#6b6d74",
                    boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)"
                }} >
                    Show Predicted Revenue for Next Year
                </Button>
            </FlexBetween>
            <ResponsiveContainer width="100%" height={"100%"} >
                <LineChart
                    data={formattedData}
                    margin={{
                        top: 20,
                        right: 75,
                        left: 20,
                        bottom: 80,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#48494e" />

                    <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} >
                        <Label value="Month" offset={-5} position="insideBottom" />
                    </XAxis>

                    <YAxis domain={[12000, 26000]} tickLine={false} axisLine={{ strokeWidth: '0' }} tickFormatter={(v) => `$${v}`} style={{ fontSize: "10px" }} >
                        <Label value="Revenue in USD" angle={-90} offset={-5} position="insideLeft" />
                    </YAxis>

                    <Tooltip />

                    <Legend verticalAlign='top' />
                    <Line dataKey="Actual Revenue" type="monotone" stroke="#12efc8" strokeWidth='0' dot={{ strokeWidth: 5 }} />
                    <Line dataKey="Regression Line" type="monotone" stroke="#8884d8" dot={false} />
                    {
                        isPrediction && (
                            <Line dataKey="Predicted Revenue" strokeDasharray="5 5" stroke="#f2b455" />
                        )
                    }
                </LineChart>
            </ResponsiveContainer>
        </DashboardBox>
    )
}

export default Predictions