const variable = {
  BASE_API: process.env.BASE_API || "http://localhost:5000/",
  LOGIN: "auth/login",
  REGISTER: "auth/register",
  LOGOUT: "auth/logout",
  OTP: "auth/otp",
  CHECKOTP: "auth/check-otp",
  EDIT: "auth/edit-profile",
};

export default variable;
