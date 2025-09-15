import axiosInstance from "../../lib/axios";

export const getImage = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/vision/image/get-image/${id}`);
    return res.data.image;
  } catch (error) {
    throw error;
  }
};

export const getImages = async () => {
  try {
    const res = await axiosInstance.get("/vision/image/get-images");
    return res.data.image;
  } catch (error) {
    throw error;
  }
};

export const getPopularImages = async () => {
  try {
    const res = await axiosInstance.get("/vision/image/get-popular-images");
    return res.data.image;
  } catch (error) {
    throw error;
  }
};

export const getImageLikes = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/vision/image/get-likes/${id}`);
    return res.data.image.likes.length;
  } catch (error) {
    throw error;
  }
};

export const getImageComments = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/vision/image/get-comments/${id}`);
    return res.data.comments;
  } catch (error) {
    throw error;
  }
};

export const getImageViews = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/vision/image/get-views/${id}`);
    return res.data.views.views;
  } catch (error) {
    throw error;
  }
};

export const getImageDownloads = async (id: string) => {
  try {
    const res = await axiosInstance.get(
      `/vision/image/get-downloads-count/${id}`
    );
    return res.data.downloadsCount.downloadsCount;
  } catch (error) {
    throw error;
  }
};

export const updateImageVisibility = async (id: string) => {
  try {
    const res = await axiosInstance.post("/vision/image/update-image", {
      id,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateImageComments = async (
  imageComment: string,
  imageId: string,
  imageUrl: string,
  userId: string
) => {
  try {
    await axiosInstance.post("/vision/image/update-comments", {
      content: imageComment,
      imageId,
      imageUrl,
      userId,
    });
  } catch (error) {
    throw error;
  }
};

export const updateImageViews = async (imageId: string) => {
  try {
    await axiosInstance.post("/vision/image/update-views", {
      imageId,
    });
  } catch (error) {
    throw error;
  }
};

export const updateImageDownloads = async (
  imageId: string,
  userId?: string
) => {
  try {
    await axiosInstance.post("/vision/image/update-downloads", {
      imageId,
      userId,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteImage = async (id: string) => {
  try {
    await axiosInstance.patch(`/vision/image/delete-image/${id}`);
  } catch (error) {
    throw error;
  }
};
