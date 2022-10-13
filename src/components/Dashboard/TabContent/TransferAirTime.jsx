import React, { useState, useEffect } from "react";
import {
  StyledInput,
  SellAirTimeWrapper,
} from "../../../styles/DashboardStyles/TabStyles/SellAirTimeStyles";
import { CustomStyles } from "../../../styles/DashboardStyles/TabStyles/selectOptionStyle";
import StyledButton from "../../../styles/ButtonStyles";
import Select from "react-select";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { UseAuth } from "../../../context/useAuth";
// import { containerCSS } from "react-select/dist/declarations/src/components/containers";

const TransferAirTime = () => {
  const Network = [
    { value: "MTN", label: "MTN" },
    { value: "GLO", label: "GLO" },
    { value: "AIRTEL", label: "AIRTEL" },
    { value: "9Mobile", label: "9Mobile" },
  ];

  const [formData, setFormData] = useState({
    Network: "",
    PhoneNumber: "",
    AmountToSell: "",
    Pin: "",
    AmountToReceive: "",
  });

  const [errors, setErrors] = useState({
    Network: false,
    PhoneNumber: false,
    AmountToSell: false,
    Pin: false,
  });

  const { airtime } = UseAuth();

  const Transfer = async (e) => {
    e.preventDefault();
    if (
      formData.Network === "" ||
      formData.PhoneNumber === "" ||
      formData.AmountToSell === 0 ||
      formData.Pin === ""
    ) {
      setErrors({
        Network: formData.Network === "" ? true : false,
        PhoneNumber: formData.PhoneNumber === "" ? true : false,
        AmountToSell: formData.AmountToSell === 0 ? true : false,
        Pin: formData.Pin === "" ? true : false,
      });
    } else {
      setErrors({
        Network: false,
        PhoneNumber: false,
        AmountToSell: false,
        Pin: false,
      });
      try {
        await airtime({
          ...formData,
          AmountToReceive: (70 * formData.AmountToSell) / 100,
        });
          setFormData({
            Network: "",
            PhoneNumber: "",
            AmountToSell: "",
            Pin: "",
            AmountToReceive: "",
          });
      } catch (error) {
      console.log(error);
    }
    
      // .then((res)=>{
      //   console.log(res)
      //   setFormData({
      //     Network: "",
      //     PhoneNumber: "",
      //     AmountToSell: "",
      //     Pin: "",
      //     AmountToReceive: "",
      //   });
      // });
    }
    console.log(formData);
    
  };

  const [copy, setCopy] = useState(false);
  const [copy1, setCopy1] = useState(false);

  const [ussd, setUSSD] = useState("");
  const [destPhoneNumber, setDestPhoneNumber] = useState("");
  const [amountToReceive, setAmountToReceive] = useState("");

  useEffect(() => {
    setUSSD(
      formData.Network === "MTN"
        ? `*600*${process.env.REACT_APP_MTN_NUMBER}*${formData.AmountToSell}*${formData.Pin}#`
        : formData.Network === "GLO"
        ? `*131*${process.env.REACT_APP_GLO_NUMBER}*${formData.AmountToSell}*${formData.Pin}#`
        : formData.Network === "AIRTEL"
        ? `*432*${process.env.REACT_APP_AIRTEL_NUMBER}*${formData.AmountToSell}#`
        : formData.Network === "9Mobile"
        ? `*223*${formData.Pin}*${process.env.REACT_APP_9MOBILE_NUMBER}*${formData.AmountToSell}#`
        : ""
    );
    setDestPhoneNumber(
      formData.Network === "MTN"
        ? process.env.REACT_APP_MTN_NUMBER
        : formData.Network === "GLO"
        ? process.env.REACT_APP_GLO_NUMBER
        : formData.Network === "AIRTEL"
        ? process.env.REACT_APP_AIRTEL_NUMBER
        : formData.Network === "9Mobile"
        ? process.env.REACT_APP_9MOBILE_NUMBER
        : ""
    );
  setAmountToReceive(0.7 * formData.AmountToSell);
  console.log(amountToReceive)

  }, [formData.Network, formData.AmountToSell, formData.Pin]);

  return (
    <SellAirTimeWrapper>
      <form onSubmit={Transfer} className="form-group">
        <h5 className="SellAirtime">Transfer Airtime</h5>
        <div className="input-element">
          <label>
            Network
            {errors.Network && (
              <span style={{ color: "#de3d6d", fontSize: 12 }}>
                {" "}
                | Select Recharge Card Network
              </span>
            )}
          </label>
          <Select
            required
            styles={CustomStyles}
            onChange={(e) => {
              setFormData({ ...formData, Network: e.value });

              setErrors({ ...errors, Network: false });
            }}
            options={Network}
            defaultValue={{ label: "Select Network", value: 0 }}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#0000ff",
              },
            })}
            isClearable // enable isClearable to demonstrate extra error handling
            isSearchable={true}
            noOptionsMessage={() => "Network not found"}
          />
        </div>
        <div className="input-element">
          <label htmlFor="Phone Number">
            Phone Number
            {errors.PhoneNumber && (
              <span style={{ color: "#de3d6d", fontSize: 12 }}>
                {" "}
                | Phone Number is required
              </span>
            )}
          </label>
          <StyledInput
            type="number"
            name="PhoneNumber"
            placeholder="Enter your Phone Number"
            value={formData.PhoneNumber}
            min="0"
            onChange={(e) => {
              setFormData({ ...formData, PhoneNumber: e.target.value.trim() });
              setErrors({ ...errors, PhoneNumber: false });
            }}
          />
        </div>
        <div className="input-element">
          <label htmlFor="Amount to Sell">
            Amount to Transfer
            {errors.AmountToSell && (
              <span style={{ color: "#de3d6d", fontSize: 12 }}>
                {" "}
                | Amount to sell is required
              </span>
            )}
          </label>
          <StyledInput
            type="number"
            name="AmountToSell"
            placeholder="NGN"
            value={formData.AmountToSell}
            min="0"
            onChange={(e) => {
              setFormData({ ...formData, AmountToSell: e.target.value.trim() });
              setErrors({ ...errors, AmountToSell: false });
            }}
          />
        </div>

        <div className="input-element">
          <label htmlFor="Pin">
            Pin
            {errors.Pin && (
              <span style={{ color: "#de3d6d", fontSize: 12 }}>
                {" "}
                | Pin is required
              </span>
            )}
          </label>
          <StyledInput
            type="password"
            name="Pin"
            placeholder="PIN"
            value={formData.Pin}
            autoComplete="off"
            onChange={(e) => {
              setFormData({ ...formData, Pin: e.target.value.trim() });

              setErrors({ ...errors, Pin: false });
            }}
          />
        </div>

        <div className="input-element">
          <label htmlFor="USSD">USSD</label>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <StyledInput
              disabled
              type="text"
              name="ussd"
              value={
                formData.Network === "MTN"
                  ? `*600*${process.env.REACT_APP_MTN_NUMBER}*${formData.AmountToSell}*${'Transfer pin'}#`
                  : formData.Network === "GLO"
                  ? `*131*${process.env.REACT_APP_GLO_NUMBER}*${formData.AmountToSell}*${'Transfer pin'}#`
                  : formData.Network === "AIRTEL"
                  ? `*432*${process.env.REACT_APP_AIRTEL_NUMBER}*${formData.AmountToSell}#`
                  : formData.Network === "9Mobile"
                  ? `*223*${'Transfer pin'}*${process.env.REACT_APP_9MOBILE_NUMBER}*${formData.AmountToSell}#`
                  : ""
              }
            />
            <CopyToClipboard
              text={ussd}
              onCopy={() => {
                setCopy(true);
                setTimeout(() => {
                  setCopy(false);
                }, 1000);
              }}
            >
              <Tooltip
                title={copy ? "Copied!" : "Click to copy"}
                placement="bottom-end"
              >
                <ContentCopyIcon
                  style={{
                    padding: "1.6%",
                    margin: "10px 0",
                    border: "1px solid #D9D9D9",
                    outline: "none",
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            </CopyToClipboard>
          </div>
        </div>
        <div className="input-element">
          <label htmlFor="Amount to Receive">Amount to Receive</label>
          <StyledInput
            disabled
            type="number"
            name="AmountToReceive"
            placeholder="0"
            value={(70 * formData.AmountToSell) / 100}
          />
        </div>

        <div className="input-element">
          <label htmlFor="Destination Phone Number">
            Destination Phone Number
          </label>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <StyledInput
              className="phoneInput"
              disabled
              type="number"
              name="destPhoneNumber"
              placeholder="Destination phone number"
              value={destPhoneNumber}
            />

            <CopyToClipboard
              text={destPhoneNumber}
              onCopy={() => {
                setCopy1(true);
                setTimeout(() => {
                  setCopy1(false);
                }, 1000);
              }}
            >
              <Tooltip
                title={copy1 ? "Copied!" : "Click to copy"}
                placement="bottom-end"
              >
                <ContentCopyIcon
                  style={{
                    padding: "1.6%",
                    margin: "10px 0",
                    border: "1px solid #D9D9D9",
                    outline: "none",
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            </CopyToClipboard>
          </div>
        </div>
        <p style={{ color: "#4285F4", fontSize: 14 }}>
          After transferring the airtime, click on the "Sent, notify Admin"
          button below
        </p>
        <StyledButton
          borderRadius="0%"
          marginTop="3.5%"
          width="198px"
          height="48px"
          type="submit"
        >
          Sent, Notify Admin
        </StyledButton>
      </form>
    </SellAirTimeWrapper>
  );
};

export default TransferAirTime;
