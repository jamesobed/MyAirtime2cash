import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { ResendVerification } from "../pages/ResendVerification";
import Swal from "sweetalert2";

export const AuthContext = createContext();

const initialState = {
  loggedIn: false,
  token: localStorage.getItem("token") || "",
  user: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "REGISTER":
      return {
        ...state,
        loggedIn: false,
        user: action.data,
      };

    case "VERIFY_EMAIL":
      return {
        ...state,
        user: action.data,
      };

    case "LOGIN":
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
      };
    case "GETUSER":
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
      };

    case "FORGOT_PASSWORD":
      return {
        ...state,
        loggedIn: false,
        user: action.payload,
      };

    case "RESET_PASSWORD":
      return {
        ...state,
        loggedIn: false,
        user: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        loggedIn: false,
      };

    case "GETALLACCOUNT":
      return {
        ...state,
        bankAccounts: action.payload,
      };

    case "TRANSFER_AIRTIME":
      return {
        ...state,
        transferDetails: action.data,
      };

    default:
      throw new Error();
  }
}

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userbank, setUserBank] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);
  const [userWithdrawals, setUserWithdrawals] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  const register = async (formData) => {
    try {
      const registerUser = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        userName: formData.userName,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };
      await axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/user/register`,
          registerUser
        )
        .then((res) => {
          if (res.status === 201) {
            dispatch({ type: "REGISTER", payload: res.data });
            toast.success(res.data.message, {
              autoClose: 1000,
            });
            localStorage.setItem("email", registerUser);
            setTimeout(() => {
              navigate("/verify-emailsent");
              toast.success("Verify your email", {
                autoClose: 3000,
              });
            }, 2000);
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            autoClose: 3000,
          });
        });
    } catch (err) {
      toast.error(err.response.data.Error, {
        autoClose: 3000,
      });
      throw new Error(`${err}`);
    }
  };

  const login = async (formData) => {
    try {
      const loginUser = {
        emailOrUsername: formData.emailOrUsername,
        password: formData.password,
      };

      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, loginUser)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.id);
            localStorage.setItem("firstName", res.data.user_info.firstName);
            localStorage.setItem("lastName", res.data.user_info.lastName);
            localStorage.setItem(
              "walletBalance",
              res.data.user_info.walletBalance
            );
            localStorage.setItem("phoneNumber", res.data.user_info.phoneNumber);
            localStorage.setItem("avatar", res.data.user_info.avatar);
            localStorage.setItem("userName", res.data.user_info.userName);
            dispatch({ type: "LOGIN", payload: res.data });
            toast.success(res.data.message, {
              autoClose: 3000,
            });
            const id = localStorage.getItem("id");
            // setTimeout(() => {
            if (res.data.user_info.role === "user") {
              navigate(`/dashboard/${id}`);
            } else {
              localStorage.setItem("admin", res.data.user_info.role);
              navigate("/dashboard/admin");
            }
            // }, 2000);
            return;
          }
        })
        .catch((err) => {
          if (err.response.data.message === "Please verify your email") {
            toast.error(err.response.data.message, {
              autoClose: 3000,
            });
            ResendVerification();
          } else {
            toast.error(err.response.data.message, {
              autoClose: 3000,
            });
          }
        });
    } catch (err) {
      toast.error("Please kindly register", {
        autoClose: 3000,
      });
      throw new Error(`${err}`);
    }
  };

  const walletBalance = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/user/walletBalance`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) { 
            localStorage.setItem("walletBalance", res.data.data.walletBalance);
          }
        })
        .catch((err) => {
          toast.error("Unable to get wallet balance at this time", {
            autoClose: 3000,
          });
        });
    } catch (err) {
      toast.error("Unable to get wallet balance at this time", {
        autoClose: 3000,
      });
    }
  }


  const forgotPassword = async (formData) => {
    try {
      const email = {
        email: formData.email,
      };

      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/user/forgetPassword`, email)
        .then((res) => {
          console.log(res);
          if (res.status === 200 && res.data.email_response.info) {
            console.log(res);
            // should take you to a check your email-for-reset-password-link page
            navigate("/emailsent");
            toast.success("Reset password sent to you email", {
              autoClose: 3000,
            });
            dispatch({ type: "FORGOT_PASSWORD", payload: res.data });
          } else {
            toast.error(
              "Unable to send verification Email check connectivity",
              {
                autoClose: 3000,
              }
            );
          }
        });
    } catch (err) {
      console.log(err);
      toast.error("No user found, kindly register", {
        autoClose: 3000,
      });
      throw new Error(`${err}`);
    }
  };

  const resetPassword = async (formData, token) => {
    try {
      const password = {
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      await axios
        .patch(
          `${process.env.REACT_APP_BACKEND_URL}/user/resetPassword/${token}`,
          password
        )
        .then((res) => {
          console.log(res);
          if (res.status === 202) {
            dispatch({
              type: "RESET_PASSWORD",
              payload: res.data,
            });
            setTimeout(() => {
              navigate("/login");
              toast.success("Password reset successfully", {
                autoClose: 1500,
              });
            }, 2000);
          }
        });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, {
        autoClose: 3000,
      });
      if (err.response.data.Error) {
        toast.error(err.response.data.Error, {
          autoClose: 3000,
        });
      }
      throw new Error(`${err}`);
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
    navigate("/login");
  };

  const getUser = async (id) => {
    try {
      //
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/user/singleUser/${id}`)
        .then((res) => {
          //  localStorage.setItem("user", res.data.user.id);
          if (res.status === 200) {
            dispatch({ type: "GETUSER", payload: res.data });
            return;
          }
        })
        .catch((err) => {
          throw new Error(`${err}`);
        });
    } catch (err) {
      throw new Error(`${err}`);
    }
  };

  const getUserAccount = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/userAccount/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setUserBank(response.data.data);
        // console.log(userbank);
      }
    } catch (err) {
      // console.log(err);
      throw new Error(err);
    }
  };

  useEffect(() => {
    getUserAccount(`${localStorage.getItem("id")}`);
    // eslint-disable-next-line
  }, []);

  const updateProfile = async (formData) => {
    try {
      const form = {
        firstName: formData.firstName || localStorage.getItem("firstName"),
        lastName: formData.lastName || localStorage.getItem("lastName"),
        userName: formData.userName || localStorage.getItem("userName"),
        phoneNumber:
          formData.phoneNumber || localStorage.getItem("phoneNumber"),
        avatar: formData.avatar || localStorage.getItem("avatar"),
      };
      const id = localStorage.getItem("id");
      await axios
        .patch(`${process.env.REACT_APP_BACKEND_URL}/user/update/${id}`, form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          toast.success(response.data.message);
          console.log(response);
          localStorage.setItem(
            "firstName",
            response.data.updatedRecord.firstName
          );
          localStorage.setItem(
            "lastName",
            response.data.updatedRecord.lastName
          );
          localStorage.setItem(
            "phoneNumber",
            response.data.updatedRecord.phoneNumber
          );
          localStorage.setItem("avatar", response.data.updatedRecord.avatar);
          localStorage.setItem(
            "userName",
            response.data.updatedRecord.userName
          );
          localStorage.setItem("email", response.data.updatedRecord.email);
        })
        .catch((err) => {
          throw new Error(`${err}`);
        });
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const AddBank = async (formData) => {
    try {
      const form = {
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        accountName: formData.accountName,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/account/createaccount`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        return response;
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteBank = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/account/deleteaccount/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.message);
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const withdraw = async (formData) => {
    try {
      const form = {
        amount: formData.amount,
        bank: formData.bank,
        accountNumber: formData.accountNumber,
        accountName: formData.accountName,
        otp: formData.Otp,
        password: formData.password,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/cash/withdraw`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if(response.status === 201){
         Swal.fire("Success!", "Withdrawal was successful!", "success");
         return response
        }

      if (response.status !== 201) {
        toast.warning(response.data.message);
      } else {
        console.log(response.data.newBalance);
        localStorage.setItem("walletBalance", response.data.newBalance);
        // toast.success(response.data.message);
        // window.location.reload(true);
      }
    } catch (error) {
      console.log(error);
      
      toast.error(error.response.data.message);
    }
  };

  const airtime = async (formData) => {
    try {
      const transferAirtime = {
        network: formData.Network,
        phoneNumber: formData.PhoneNumber,
        amountToSell: formData.AmountToSell,
        sharePin: formData.Pin,
        amountToReceive: formData.AmountToReceive,
      };

      await axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/transfer/sellairtime`,
          transferAirtime,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 201) {
            dispatch({ type: "TRANSFER_AIRTIME", payload: res.data });
            Swal.fire(
              "success",
              "Admin has been notified, Your wallet would be credited soon",
              "success"
            );
            // navigate(`/dashboard/${localStorage.getItem("id")}`);
            // window.location.reload(true);
          }
        })
        .catch((err) => {
          if (err.response.data.startsWith("sharePin")) {
            toast.error("PIN must be 4 digits", {
              autoClose: 3000,
            });
          } else {
            toast.error(err.response.data, {
              autoClose: 3000,
            });
          }
        });
    } catch (err) {
      toast.error(err.response.data.Error, {
        autoClose: 3000,
      });
      throw new Error(`${err}`);
    }
  };

  const getUserTransactions = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/userTransaction/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        // console.log(response.data.data);
        setUserTransactions(response.data.data);
      }
    } catch (err) {
      // console.log(err);
      throw new Error(err);
    }
  };

  const getUserWithdrawals = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/userWithdrawals/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setUserWithdrawals(response.data.data);
      }
    } catch (err) {
      // console.log(err);
      throw new Error(err);
    }
  };

  const generateOtp = async (purpose, url) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/${url}`,{  purpose },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(response);
      if (response.status === 201) {
        toast.success("Otp Sent Successfully ", {
          autoClose: 1000,
        });
        return response
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);

    }
  };


    useEffect(() => {
      getUserWithdrawals(`${localStorage.getItem("id")}`);
      // eslint-disable-next-line
    }, []);

  const creditWallet = async (formData) => {
    console.log(formData)
    try {
      const transactionDetails = {
        email: formData.email,
        amountReceived: formData.amountsent,
        amountToSend: formData.amountreceived,
        otp:formData.Otp,
        status: formData.status,
        transactionID: formData.id,
      };
      console.log(transactionDetails);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/wallet/credit`,
        transactionDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Transaction was successful", {
          autoClose: 1000,
        });
        return response;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        getUser,
        forgotPassword,
        updateProfile,
        resetPassword,
        AddBank,
        withdraw,
        getUserAccount,
        deleteBank,
        userbank,
        creditWallet,
        airtime,
        getUserTransactions,
        userTransactions,
        getUserWithdrawals,
        userWithdrawals,
        logout,
        state,
        walletBalance,
        generateOtp
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
