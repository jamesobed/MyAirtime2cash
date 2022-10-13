import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {BsThreeDots} from 'react-icons/bs'
import { OverviewWrapper } from '../../styles/AdminDashboardStyle/OverviewStyle';
import useFetch from '../../context/useFetch';
import { useEffect } from 'react';
import ThreeDots from 'react-loading-icons/dist/esm/components/three-dots';
// format: (value) => value.toLocaleString('en-US'),  This convert the number to a string with commas



const Transactions = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [rowData, setRowData] = useState([])

  let  { result, showLoading } = useFetch(`transfer/alltransactions?page=${page}&size=${rowsPerPage}`);

  const transactionData = () =>{ 
    return result.content?.map((data)=>createData(data.createdAt,data.email, data.phoneNumber, data.network, data.amountToSell, data.amountToReceive, data.transactionStatus))
  }

  
  useEffect(() => {
    console.log('re render')
    setRowData(transactionData)
  }, [result]);

  // console.log(rowData)


const columns = [ 
  { id: 'date', label: 'Time Stamp', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'phonenumber', label: 'Phone Number', minWidth: 100 },
  { id: 'network', label: 'Network', minWidth: 50 },
  { id: 'amountsent', label: 'Amount Sent', minWidth: 100, align: 'right', },
  { id: 'amountreceived', label: 'Amount Received', minWidth: 100,align: 'right', },
  { id: 'status', label: 'Status', minWidth: 20, align:'left' }
];

function createData(date, email, phonenumber, network, amountsent, amountreceived, status) {
  date  = new Date(date?.slice(0, -1)).toLocaleString()
  if(status === "sent"){
    status = <span style={{color: "green"}}>{status}</span>
  }else if(status === "pending"){
    status = <span style={{color: "orange"}}>{status}</span>
  }else{
    status = <span style={{color: "red"}}>{status}</span>
  }
  return {date, email, phonenumber, network,  amountsent, amountreceived, status };
}




  const handleChangePage = (event, newPage) => {
    setPage(newPage); 
    result=[]

  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    result=[]
    setPage(0); 


  };

  return (
    <OverviewWrapper>
      <h2>Admin Dashboard</h2>
    <Paper className="paper" sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }} className="tableBody">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell className="tableHead"
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {showLoading && (
              <TableRow> 
                <TableCell colSpan={7}>
                  <ThreeDots className="loading" height="1rem" fill="#DE3D6D" />
                </TableCell>
              </TableRow>
            )} 

             {result.content?.length === 0 && (
              <TableRow> 
                <TableCell colSpan={7}>
                  <h3 className="loading" >NO TRANSACTION RECORD FOUND</h3>
                </TableCell>
              </TableRow>
            )}
          {rowData &&
          <TableBody>
            {rowData
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell className="row" key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
}
        </Table>
      </TableContainer>
    </Paper>
    {rowData &&
      <TablePagination className="pagination"
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={result?.totalTransactions}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />}
    </OverviewWrapper>
  );
}

export default Transactions;