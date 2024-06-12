import DashboardBox from '@/components/DashboardBox'
import { Box, Typography } from '@mui/material';
import { useGetTransactionsQuery, useGetProductsQuery, useGetKpisQuery } from '@/state/api'
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import BoxHeaders from '@/components/BoxHeaders';
import FlexBetween from '@/components/FlexBetween';
import { Cell, Pie, PieChart } from 'recharts';
import { useMemo } from 'react';

const Row3 = () => {

    const { data: productData } = useGetProductsQuery();
    const { data: kpisData } = useGetKpisQuery();
    const { data: transactionsData } = useGetTransactionsQuery();



    const pieChartData = useMemo(() => {
        if (kpisData) {
            const totalExpenses = kpisData[0].totalExpenses;
            return Object.entries(kpisData[0].expensesByCategory).map(
                ([key, value]) => {
                    return [
                        {
                            name: key,
                            value: value,
                        },
                        {
                            name: `${key} of Total`,
                            value: totalExpenses - value,
                        },
                    ]
                }
            )
        }
    }, [kpisData])
    const productColumns = [
        {
            field: "_id",
            headerName: "id",
            flex: 1
        },
        {
            field: "expense",
            headerName: "Expense",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `${params.value}`,
        },
        {
            field: "price",
            headerName: "Price",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `${params.value}`,
        },
    ]
    const transactionsColumns = [
        {
            field: "_id",
            headerName: "id",
            flex: 1
        },
        {
            field: "buyer",
            headerName: "Buyer",
            flex: 0.67,
        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 0.35,
            renderCell: (params: GridCellParams) => `${params.value}`,
        },
        {
            field: "productIds",
            headerName: "Count",
            flex: 0.35,
            renderCell: (params: GridCellParams) => (params.value as Array<string>).length,
        },
    ]

    return (
        <>
            <DashboardBox gridArea="g" style={{ height: "290px" }} >
                <BoxHeaders title='List of Products' sidetext={`${productData?.length} products`} />
                <Box mt="0.5rem" p="0 0.5rem" height="75%" sx={{
                    "& .MuiDataGrid-root": {
                        color: "#d1d3da",
                        border: "none"
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: `1px solid #48494e !important`
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        borderBottom: `1px solid #48494e !important`
                    },
                    "& .MuiDataGrid-columnSeperator": {
                        visibility: "hidden"
                    },
                }} >
                    <DataGrid
                        getRowId={(row) => row._id}
                        columnHeaderHeight={25}
                        rowHeight={35}
                        hideFooter={true}
                        rows={productData || []}
                        columns={productColumns}
                    />
                </Box>
            </DashboardBox>

            <DashboardBox gridArea="h" style={{ height: "290px" }} >
                <BoxHeaders title='Recent Orders' sidetext={`${transactionsData?.length} latest transactions`} />
                <Box mt="1rem" p="0 0.5rem" height="80%" sx={{
                    "& .MuiDataGrid-root": {
                        color: "#d1d3da",
                        border: "none"
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: `1px solid #48494e !important`
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        borderBottom: `1px solid #48494e !important`
                    },
                    "& .MuiDataGrid-columnSeperator": {
                        visibility: "hidden"
                    },
                }} >
                    <DataGrid
                        getRowId={(row) => row._id}
                        columnHeaderHeight={25}
                        rowHeight={35}
                        hideFooter={true}
                        rows={transactionsData || []}
                        columns={transactionsColumns}
                    />
                </Box>
            </DashboardBox>

            <DashboardBox gridArea="i" >
                <BoxHeaders title='Expenses Breakdown By Category' sidetext="+4%" />
                <FlexBetween mt="0.5rem" gap="0.5rem" textAlign="center" >
                    {
                        pieChartData?.map((data, i) =>
                        (

                            <Box key={`${data[0].name}-${i}`} >
                                <PieChart
                                    width={110}
                                    height={100}
                                >
                                    <Pie
                                        stroke='none'
                                        data={data}
                                        innerRadius={18}
                                        outerRadius={35}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {data.map((index: any) => (
                                            <Cell key={`cell-${index}`} fill={"#71f5de"} />
                                        ))}
                                    </Pie>
                                </PieChart>
                                <Typography variant='h5' >{data[0].name}</Typography>
                            </Box>
                        )
                        )
                    }

                </FlexBetween>
            </DashboardBox>

            <DashboardBox gridArea="j" >
                <BoxHeaders title='Overall Summary and Explanation Data' sidetext="+50%" />
                <Box height="15px" margin={"1.5rem 1rem 0.4rem 1rem"} bgcolor="#076050" borderRadius="1rem" >
                    <Box width="40%" borderRadius="1rem" height="15px" bgcolor="#0ebfa0" >

                    </Box>
                </Box>
                <Typography variant='h6' margin="0 1rem" >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo tempore, sit expedita aut ipsa inventore ab consectetur ea voluptates eum. Vel deserunt libero quas aut esse, hic sunt! Libero, sunt!
                    Exercitationem dolor error laudantium, debitis et molestiae nulla architecto aut ad amet dolorem magni totam cumque. Molestias facere recusandae excepturi fuga natus voluptas sunt dolores repudiandae, obcaecati, quas nihil inventore?
                </Typography>
            </DashboardBox>
        </>
    )
}

export default Row3