import * as yup from "yup"

export const sellAirtimeSchema = yup.object().shape({
    Network:yup.string().required(),
    PhoneNumber:yup.number().required(),
    AmountToSell:yup.number().required(),
    USSD:yup.string().required(),
    AmountToReceieve:yup.number().required(),
    DestinationPhoneNumber:yup.number().required()
})


export const AddBankSchema = yup.object().shape({
  bankName: yup
    .object()
    .shape({
      label: yup.string().required("bank is required (from label)"),
      value: yup.string().required("bank is required"),
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required("Bank is required"),
  accountName: yup.string().required(),
  accountNumber: yup.string().required(),
});

export const WithdrawSchema = yup.object().shape({
  amount: yup.number().min(1, 'The minimum amount is one').typeError('The amount invalid').required("Amount is required"),
  accountName: yup.string().required("Account Name is required"),
  accountNumber: yup.string().required("Account Number is required"),
  bank: yup.string().required("Bank Name is required"),
  password: yup.string().required("Password is required"),
});