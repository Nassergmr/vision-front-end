import axiosInstance from "../../lib/axios";

export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const res = await axiosInstance.post("/vision/auth/register", {
      userFirstName: firstName,
      userLastName: lastName,
      userEmail: email,
      userPassword: password,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axiosInstance.post("/vision/auth/login", {
      userEmail: email,
      userPassword: password,
    });
    return res.data.accessToken;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    const res = await axiosInstance.post(
      "/vision/auth/send-reset-password-mail",
      {
        userEmail: email,
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const UpdatePassword = async (
  password: string,
  token: string | null
) => {
  try {
    const res = await axiosInstance.patch(
      `/vision/auth/update-password?token=${token}`,
      {
        password,
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const ChangePassword = async (
  email: string,
  currentPassword: string,
  newPassword: string
) => {
  try {
    const res = await axiosInstance.patch(`/vision/auth/change-password`, {
      email,
      currentPassword,
      newPassword,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
