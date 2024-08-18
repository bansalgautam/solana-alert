const logoutUser = (res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({
    message: "User logged out",
  });
};

export default logoutUser;
