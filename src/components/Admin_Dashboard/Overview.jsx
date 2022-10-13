import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { BsThreeDots } from "react-icons/bs";
import {
  MiniMenu,
  OverviewWrapper,
} from "../../styles/AdminDashboardStyle/OverviewStyle";
import useOutsideClick from "../../context/useOutsideClick";
import InputAlert from "./InputAlert";
import useFetch from "../../context/useFetch";
import ThreeDots from "react-loading-icons/dist/esm/components/three-dots";
import Swal from "sweetalert2";
import { UseAuth  } from "../../context/useAuth";
import OtpInput from "../OtpInput";


const Overview = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [ShowMenu, setShowMenu] = useState(null);
  const [ShowInputAlert, setShowInputAlert] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState({});
  const [rowData, setRowData] = useState([]);
  const [closeOtp, setCloseOtp] = useState(true)
  // const [showLoading, setShowLoading] = useState(false);
  const { creditWallet, generateOtp } = UseAuth();

  let { result, showLoading } = useFetch(
    `transfer/pendingTransactions?page=${page}&size=${rowsPerPage}&allPending=pending`
  );
    
  const transactionData = () => {
    // setShowLoading(true);
    return result.content?.map((data) =>
      createData(
        data.id,
        data.createdAt,
        data.email,
        data.phoneNumber,
        data.network,
        data.amountToSell,
        data.amountToReceive
      )
    );
  };

  useEffect(() => { 
    console.log('re-ran')
    setRowData(transactionData);
  }, [result, ShowInputAlert]);

  const showMenu = (id) => {
    ShowMenu === id ? setShowMenu(null) : setShowMenu(id);
  };

  const closeMenu = () => {
    setShowMenu(null);
  };

  const closeModal = () => {
    setShowInputAlert(false);
  };
  const closeInputAlert = useOutsideClick(closeModal);
  const closeMiniMenu = useOutsideClick(closeMenu);

  const columns = [
    { id: "date", label: "Time Stamp", minWidth: 100 },
    { id: "email", label: "Email", minWidth: 100 },
    { id: "phonenumber", label: "Phone Number", minWidth: 100 },
    { id: "network", label: "Network", minWidth: 50 },
    { id: "amountsent", label: "Amount Sent", minWidth: 100, align: "right" },
    {
      id: "amountreceived",
      label: "Amount To Receive",
      minWidth: 100,
      align: "right",
    },
    { id: "action", label: "Action", minWidth: 10, align: "center" },
  ];

  function createData(
    id,
    date,
    email,
    phonenumber,
    network,
    amountsent,
    amountreceived
  ) {
    date = new Date(date.slice(0, -1)).toLocaleString();
    return {id, date, email, phonenumber, network, amountsent, amountreceived };
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    result = [];
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    result = [];
    setPage(0);
  };

  const handleHeaderClick = (event) => {
    event.stopPropagation();
  };

  const handleCancelTransaction =  (transactionDetails, transactionIndex) => {
    Swal.fire({
      title: "Are you sure you want to cancel this transaction?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText:"No",
    }).then((result) => {
      if (result.isConfirmed) {
      Swal.isLoading()
      generateToken()
      setTransactionDetails({...transactionDetails,status:'cancel'})
      closeMenu();
        // Swal.fire("Cancelled!", "Transaction cancelled.", "success");
      }else{
    closeMenu();

      }
    });
  };
      // rowData.splice(transactionIndex, 1);

 
  const handleShowInput = (value, index) => {
    setTransactionDetails({...value,rowIndex: index});
    // console.log(transactionDetails)
    // setTransactionDetails({...transactionDetails, rowIndex: index})

    setShowInputAlert(true); 
    closeMenu();
  };
  const generateToken = async() => {
    await generateOtp('To Cancel transaction', 'sendOTPAdmin').then((data) => {
      
      if(data.status===201){
        setCloseOtp(false)
        
      }
    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <OverviewWrapper>
      {!closeOtp && <OtpInput setCloseOtp={setCloseOtp} data={transactionDetails}/>}

      {ShowInputAlert && (
        <InputAlert
          setClose={setShowInputAlert}
          transactionDetails={transactionDetails}
          rowData={setRowData}
          innerRef={closeInputAlert}
        />
      )}
      <h2>Admin Dashboard</h2>
      <Paper className="paper" sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }} className="tableBody">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    className="tableHead"
                    key={index}
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
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              className="row"
                              key={column.id}
                              align={column.align}
                            >
                              {column.id === "action" ? (
                                <div
                                  ref={closeMiniMenu}
                                  onClick={handleHeaderClick}
                                >
                                  <BsThreeDots
                                    onClick={() => showMenu(index)}
                                    className="showMenu"
                                  />

                                  <div className="action">
                                    {ShowMenu === index && (
                                      <MiniMenu>
                                        <div
                                          onClick={() => handleShowInput(row, index)}
                                        >
                                          Edit
                                        </div>
                                        <div onClick={() => handleCancelTransaction(row, index)}>
                                          Cancel
                                        </div>
                                      </MiniMenu>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                value
                              )}
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
        <TablePagination
          className="pagination"
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
};

export default Overview;
