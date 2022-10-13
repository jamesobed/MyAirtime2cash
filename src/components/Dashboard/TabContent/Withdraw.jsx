import React, { useEffect, useState } from "react";
import Select from "react-select";
import Button from "../../../styles/ButtonStyles";
// import * as yup from "yup";
import Swal from "sweetalert2";
// import { WithdrawSchema } from "../../../Validations/FormValidation";
import { CustomStyles } from "../../../styles/DashboardStyles/TabStyles/selectOptionStyle";
import {
  ButtonWrapper,
  TabTitle,
  WithdrawWrapper,
} from "../../../styles/DashboardStyles/TabStyles/WithdrawStyles";
import useFetch from "../../../context/useFetch";
import { UseAuth } from "../../../context/useAuth";

// import { yupResolver } from "@hookform/resolvers/yup";
// import { Controller, useForm } from "react-hook-form";
import ThreeDots from "react-loading-icons/dist/esm/components/three-dots";
import OtpInputUser from "../../OtpInputUser";

const Withdraw = () => {
  const [isValid, setIsValid] = useState(false);
  const [toggleEnable, setToggleEnable] = useState(true);

  const [bankList, setBankList] = useState([]);
  const [accountNumber, setAccountNumber] = useState(0);
  const [accountName, setAccountName] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [closeOtp, setCloseOtp] = useState(true)

  // const [amount, setAmount] = useState(0)

  const [formData, setFormData] = useState({
    bank: "",
    accountNumber: "",
    accountName: "",
    amount: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    bank: false,
    accountNumber: false,
    accountName: false,
    amount: false,
    password: false,
  });

  // FETCHING BANK LIST
  let { result } = useFetch(`user/userAccount/${localStorage.getItem("id")}`);
  result = result.data
  let bankArr = result?.map((bank) => bank.bankName);
  let banks = [...new Set(bankArr)];
// console.log(banks)
  useEffect(() => {
    // console.log(result)
    setBankList(banks?.map((val) => ({ value: val, label: val })));
  }, [result]);

  const handleSelectBank = (e) => {
    setAccountNumber(null);
    let newArr = result.filter((bank) => {
      return bank.bankName === e.label;
    });
    setAccountNumber(
      newArr?.map((val) => ({
        value: val.accountNumber,
        label: val.accountNumber,
        accountName: val.accountName,
      }))
    );
    setFormData({ ...formData, bank: e.value.trim() });
    setToggleEnable(false);
  };

  const handleSelectAccountNumber = (e) => {
    setAccountName(e.accountName);
    setFormData({
      ...formData,
      accountNumber: e.value.trim(),
      accountName: e.accountName.trim(),
    });
  };

  const { withdraw, generateOtp } = UseAuth();


  const generateToken = async() => {
    await generateOtp('To Confirm withdraw', 'sendOTPUser').then((data) => {
      console.log(data.status)
      if(data.status===201){
        setCloseOtp(false)
      }
    }).catch((error) => {
      console.log(error)
    });
  }


  const Submit = (e) => {
    e.preventDefault();
    if (
      formData.bank === "" ||
      formData.accountNumber === "" ||
      formData.accountName === "" ||
      formData.amount === "0" ||
      formData.amount === 0 ||
      formData.amount === "" ||
      formData.password === ""
    ) {
      setErrors({
        bank: formData.bank === "" ? true : false,
        accountNumber: formData.accountNumber === "" ? true : false,
        accountName: formData.accountName === "" ? true : false,
        amount: (formData.amount === "0" || formData.amount === "" || formData.amount === 0) ? true : false,
        password: formData.password === "" ? true : false,
      });
      if (formData.amount === "") {
        setErrors({ ...errors, amount: true });
      }
    } else {
      setShowLoading(true);
      generateToken()
      // withdraw(formData).then(()=>{
        setShowLoading(false);
      // });
      // withdraw(formData).then(() => {
      //   setShowLoading(false);
        // setFormData({
        //   bank: "",
        //   accountNumber: "",
        //   accountName: "",
        //   amount: "",
        //   password: "",
        // });
      // });

      // console.log(formData);
    }
  };

  return (
    <WithdrawWrapper>
      {!closeOtp && <OtpInputUser setCloseOtp={setCloseOtp} setFormData={setFormData} data={formData}/>}

      <TabTitle>
        <b>Withdraw</b>
      </TabTitle>
      <form name="withdrawform" onSubmit={Submit} autoComplete="off">
        <div className="form-group">
          <label>
            Select Account
            {errors.bank && (
              <span style={{ color: "#de3d6d", fontSize: 12 }}>
                {" "}
                | Select your bank
              </span>
            )}
          </label>
          <Select
            name="bank"
            styles={CustomStyles}
            placeholder={"Select bank"}
            noOptionsMessage={() => "Bank not found"}
            // value={formData.bank}
            onChange={(e) => handleSelectBank(e)}
            // onChange={(e) => setFormData({ ...formData, bank: e.value.trim() })}
            options={bankList}
            defaultValue={{ label: "Select Bank", value: 0 }}
            theme={(theme) => ({
              ...theme,
              // borderRadius: 0,

              colors: {
                ...theme.colors,
                primary: "#de3d6d",
              },
            })}
          />
        </div>

        <div className="form-group">
          <label>
            Account Number
            {errors.accountNumber && (
              <span style={{ color: "#de3d6d", fontSize: 12 }}>
                {" "}
                | Select your bank
              </span>
            )}
          </label>

          <Select
            name="accountNumber"
            // isSearchable={false}
            styles={CustomStyles}
            noOptionsMessage={() => "Account not found"}
            isDisabled={toggleEnable}
            type="number"
            onChange={(e) => handleSelectAccountNumber(e)}
            options={accountNumber}
            defaultValue={{ label: "Select Account Number", value: 0 }}
            theme={(theme) => ({
              ...theme,
              // height:"10px",
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary: "#de3d6d",
              },
            })}
          />
        </div>

        <div className="form-group">
          <label>Account Name </label>
          <input
            disabled
            value={formData.accountName}
            onChange={(e) =>
              setFormData({ ...formData, accountName: e.target.value.trim() })
            }
            placeholder="Account Name"
          />
        </div>

        <div className="form-group">
          <label>
            Amount
            {errors.amount && (
              <span style={{ color: "#de3d6d", fontSize: 12 }}>
                {" "}
                | Amount is required
              </span>
            )}
          </label>
          <input
            style={{ color: "#012A4A" }}
            name="amount"
            type="number"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value.trim() })
            }
            placeholder="NGN"
          />
        </div>

        <div className="form-group">
          <label>
            Password
            {errors.password && (
              <span style={{ color: "#de3d6d", fontSize: 12 }}>
                {" "}
                | Password is required
              </span>
            )}
          </label>

          <input
            style={{ color: "#012A4A" }}
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value.trim() })
            }
            autoComplete="off"
            name="password"
            placeholder="Password"
          />
        </div>
        <ButtonWrapper>
          <Button
            disabled={showLoading}
            borderRadius="0%"
            type="submit"
            height="48px"
            width="198px"
          >
            {!showLoading ? (
              <span>Withdraw</span>
            ) : (
              <ThreeDots height="1rem" fill="#DE3D6D" />
            )}
          </Button>
        </ButtonWrapper>
      </form>
    </WithdrawWrapper>
  );
};

export default Withdraw;
