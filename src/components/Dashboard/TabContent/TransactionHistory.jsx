import React, { useState, useEffect } from 'react'
import { UseAuth } from "../../../context/useAuth";
import {
  TransactionWrapper,
  WrapperLeft,
  TimeStyle,
  WrapperRight,
  ReceivedStyle,
  AmountStyle,
} from "../../../styles/DashboardStyles/TabStyles/TransactionHistoryStyle";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";

export const TransactionHistory = () => {
     const { getUserTransactions, userTransactions } = UseAuth();

      const [transactions, setTransactions] = useState(userTransactions);

      const handleRefresh = () => {
        setTransactions(transactions);
      };

          useEffect(() => {
            getUserTransactions(`${localStorage.getItem("id")}`);
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
        dataLength={transactions.length} //This is important field to render the next data
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
        {userTransactions.length === 0 && (
          <h3 style={{ color: "#012a4a" }}>No transactions yet.</h3>
        )}
        {userTransactions.map((transaction, index) => (
          <TransactionWrapper key={index}>
            <WrapperLeft>
              <TimeStyle>
                <b>{moment(transaction.updatedAt).fromNow()},</b>
                {transaction.updatedAt.substring(0, 16).split("T")[1]}
              </TimeStyle>
              <TimeStyle>{transaction.network} Airtime Transfer</TimeStyle>
              <div>{transaction.updatedAt.substring(0, 10)} </div>
            </WrapperLeft>
            <WrapperRight>
              <ReceivedStyle
                style={{
                  color:
                    transaction.transactionStatus === "pending"
                      ? "#FFA500"
                      : transaction.transactionStatus === "sent"
                      ? "green"
                      : "red",
                }}
              >
                {transaction.transactionStatus}
              </ReceivedStyle>
              <AmountStyle> &#8358;{transaction.amountToSell}</AmountStyle>
            </WrapperRight>
          </TransactionWrapper>
        ))}
      </InfiniteScroll>
    </div>
  );
};
