import DashboardBox from '@/components/DashboardBox'
import { Box, useTheme } from '@mui/material';
import { useGetTransactionsQuery, useGetProductsQuery, useGetKpisQuery } from '@/state/api'
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import BoxHeaders from '@/components/BoxHeaders';

type Props = {}

const Row3 = (props: Props) => {

    const { palette } = useTheme();
    const { data: productData } = useGetProductsQuery();
    const { data: kpisData } = useGetKpisQuery();
    const { data: transactionsData } = useGetTransactionsQuery();

    // console.log("..",productData);

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

    return (
        <>
            <DashboardBox gridArea="g" style={{height:"290px"}} >
                <BoxHeaders title='List of Products' sidetext={`${productData?.length} products`} />
                <Box mt="0.5rem" p="0 0.5rem" height="75%" sx={{
                    "& .MuiDataGrid-root": {
                        color: palette.grey[300],
                        border: "none"
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: `1px solid ${palette.grey[800]} !important`
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        borderBottom: `1px solid ${palette.grey[800]} !important`
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
            <DashboardBox gridArea="h" ></DashboardBox>
            <DashboardBox gridArea="i" ></DashboardBox>
            <DashboardBox gridArea="j" ></DashboardBox>
        </>
    )
}

export default Row3