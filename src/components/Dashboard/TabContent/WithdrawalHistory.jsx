import React, { useState, useEffect } from "react";
import {
  TransactionWrapper,
  WrapperLeft,
  TimeStyle,
  WrapperRight,
  ReceivedStyle,
  AmountStyle,
} from "../../../styles/DashboardStyles/TabStyles/TransactionHistoryStyle";
import InfiniteScroll from "react-infinite-scroll-component";
import { UseAuth } from "../../../context/useAuth";
import moment from "moment";

const WithdrawalHistory = ({ amount, date, transactionType }) => {
  const { getUserWithdrawals, userWithdrawals } = UseAuth();

  const [withdrawals, setWithdrawals] = useState(userWithdrawals);

  const handleRefresh = () => {
    setWithdrawals(withdrawals);
  };

  useEffect(() => {
    getUserWithdrawals(`${localStorage.getItem("id")}`);
    // eslint-disable-next-line
  }, []);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: "100vh",
        overflow: "auto",
        Width: "100%",
      }}
    >
      <InfiniteScroll
        dataLength={withdrawals.length} //This is important field to render the next data
        // next={handleAdd}
        hasMore={true}
        // loader={<h4>Loading...</h4>}
        refreshFunction={handleRefresh}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        }
      >
        {withdrawals.length === 0 && (
          <h3 style={{ color: "#012a4a" }}>No withdrawal yet.</h3>
        )}
        {withdrawals.map((withdrawal, index) => (
          <TransactionWrapper key={index}>
            <WrapperLeft>
              <TimeStyle>
                <b>{moment(withdrawal.updatedAt).fromNow()},</b>
                {withdrawal.updatedAt.substring(0, 16).split("T")[1]}
              </TimeStyle>
              <div>Withdraw fund</div>
              <div>{withdrawal.updatedAt.substring(0, 10)}</div>
            </WrapperLeft>
            <WrapperRight>
              <ReceivedStyle
                style={{ color: withdrawal.status === true ? "green" : "red" }}
              >
                {withdrawal.status === true ? "Successful" : "Failed"}
              </ReceivedStyle>
              <AmountStyle> &#8358;{withdrawal.amount}</AmountStyle>
            </WrapperRight>
          </TransactionWrapper>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default WithdrawalHistory;
