import React, { useState } from "react";
import {
  StyledInput,
  SellAirTimeWrapper,
} from "../../../styles/DashboardStyles/TabStyles/SellAirTimeStyles";
import { CustomStyles } from "../../../styles/DashboardStyles/TabStyles/selectOptionStyle";
import StyledButton from "../../../styles/ButtonStyles";
import Select from "react-select";
import Swal from "sweetalert2";

const SellAirTime = () => {
  const [checkNetwork, setCheckNetwork] = useState(false);
  const Network = [
    { value: "MTN", label: "MTN" },
    { value: "GLO", label: "GLO" },
    { value: "AIRTEL", label: "AIRTEL" },
  ];

  const [formData, setFormData] = useState({
    Network: "",
    PhoneNumber: 0,
    AmountToSell: 0,
    // USSD:"",
    // AmountToReceieve:0,
    // DestinationPhoneNumber:e.target[5].value
  });

  const [errors, setErrors] = useState({
    Network: false,
    PhoneNumber: false,
    AmountToSell: false,
  });
  const Sell = async (e) => {
    e.preventDefault();
    if (
      formData.Network === "" ||
      formData.PhoneNumber === 0 ||
      formData.AmountToSell === 0
    ) {
      setErrors({
        Network: formData.Network === "" ? true : false,
        PhoneNumber: formData.PhoneNumber === 0 ? true : false,
        AmountToSell: formData.AmountToSell === 0 ? true : false,
      });
    } else {
      setErrors({
        Network: false,
        PhoneNumber: false,
        AmountToSell: false,
      });
      Swal.fire("success", "Airtime sold", "success");
    }
    setFormData({
      Network: "",
      PhoneNumber: 0,
      AmountToSell: 0,
    });
  };

  // const { getFieldDecorator } = props.form;

  // eslint-disable-next-line
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <SellAirTimeWrapper>
      <form onSubmit={Sell} className="form-group">
        <h5 className="SellAirtime">Sell Airtime</h5>
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
              setErrors({ ...errors, Network: true });
            }}
            options={Network}
            defaultValue={{ label: "Select Network", value: 0 }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary: "#de3d6d",
              },
            })}
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
            required
            type="number"
            name="PhoneNumber"
            placeholder="Enter your Phone Number"
            value={formData.PhoneNumber}
            onKeyUp={(e) => {
              setErrors({ ...errors, PhoneNumber: true });
            }}
            onChange={(e) => {
              setFormData({ ...formData, PhoneNumber: e.target.value.trim() });
              setErrors({ ...errors, PhoneNumber: true });
            }}
          />
        </div>
        <div className="input-element">
          <label htmlFor="Amount to Sell">
            Amount to Sell
            {errors.AmountToSell && (
              <span style={{ color: "#de3d6d", fontSize: 12 }}>
                {" "}
                | This field is required
              </span>
            )}
          </label>
          <StyledInput
            required
            type="number"
            name="AmountToSell"
            placeholder="NGN"
            value={formData.AmountToSell}
            onChange={(e) =>
              setFormData({ ...formData, AmountToSell: e.target.value.trim() })
            }
          />
        </div>

        <div className="input-element">
          <label htmlFor="USSD">USSD</label>
          <StyledInput
            disabled
            type="text"
            name="USSD"
            placeholder="*780*amount*09088756433*5000#"
          />
        </div>
        <div className="input-element">
          <label htmlFor="Amount to Receive">Amount to Receive</label>
          <StyledInput
            disabled
            type="number"
            name="AmountToReceive"
            placeholder="NGN"
          />
        </div>
        <div className="input-element">
          <label htmlFor="Destination Phone Number">
            Destination Phone Number
          </label>
          <StyledInput
            className="phoneInput"
            disabled
            type="number"
            name="DestinationPhoneNumber"
            placeholder="Destination phone number"
          />
        </div>
        <StyledButton
          borderRadius="0%"
          marginTop="3.5%"
          width="198px"
          height="48px"
          type="submit"
        >
          Sell Airtime
        </StyledButton>
      </form>
    </SellAirTimeWrapper>
  );
};

export default SellAirTime;
