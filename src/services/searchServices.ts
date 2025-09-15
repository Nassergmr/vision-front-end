import axiosInstance from "../../lib/axios";

export const getSearchedImages = async (query: string) => {
  try {
    const res = await axiosInstance.get(
      `/vision/search/get-searched-images/${query}`
    );
    return res.data.results;
  } catch (error) {
    console.error(error);
  }
};
