import { AxiosError } from "axios";
import axiosInstance from "../../lib/axios";

export const fetchAdminData = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axiosInstance.get("/vision/user/get-admin-data", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        throw error;
      }
      throw error;
    }
  }
};

export const fetchAdminAvatar = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axiosInstance.get("/vision/user/get-admin-avatar", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.avatar;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        throw error;
      }
      throw error;
    }
  }
};

export const fetchAdminLikes = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axiosInstance.get("/vision/user/get-admin-likes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.likes;
  } catch (error) {
    throw error;
  }
};

export const fetchAdminLikedImages = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axiosInstance.get("/vision/user/get-admin-liked-images", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAdminDownloadedImages = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axiosInstance.get(
      "/vision/user/get-admin-downloaded-images",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.downloadedImages;
  } catch (error) {
    throw error;
  }
};

export const fetchAdminCollections = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axiosInstance.get("/vision/user/get-admin-collections", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAdminCollection = async (id: string) => {
  try {
    const res = await axiosInstance.get(
      `/vision/user/get-admin-collection/${id}`,
      {
        params: { id: id },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAdminImages = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axiosInstance.get("/vision/user/get-admin-images", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAdminPublishedImages = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axiosInstance.get(
      "/vision/user/get-admin-published-images",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAdminDraftImages = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axiosInstance.get("/vision/user/get-admin-draft-images", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserProfile = async (slug: string) => {
  try {
    const res = await axiosInstance.get(`/vision/user/profile/${slug}`, {
      params: { slug: slug },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserImages = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/vision/user/get-user-images/${id}`);
    return res.data.image;
  } catch (error) {
    throw error;
  }
};

export const fetchUserPopularImages = async (id: string) => {
  try {
    const res = await axiosInstance.get(
      `/vision/user/get-user-popular-images/${id}`
    );
    return res.data.image;
  } catch (error) {
    throw error;
  }
};

export const updateImageUpload = async (
  imageUpload: string | Blob,
  imageTitle: string,
  imageLocation: string,
  imageTags: string
) => {
  const token = localStorage.getItem("token");

  try {
    const formData = new FormData();
    formData.append("image", imageUpload);
    formData.append("title", imageTitle);
    formData.append("location", imageLocation);
    formData.append("tags", imageTags);

    const res = await axiosInstance.post("/vision/user/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateImageLikes = async (
  imageId: string,
  imageUrl: string,
  userId: string
) => {
  try {
    const res = await axiosInstance.post("/vision/image/update-like", {
      imageId,
      imageUrl,
      userId,
    });
    return res.data;
  } catch (error) {
    throw error;
  } finally {
  }
};

export const updateAdminAvatar = async (file: string | Blob) => {
  const token = localStorage.getItem("token");

  try {
    const formData = new FormData();
    formData.append("avatar", file);
    const res = await axiosInstance.patch(
      "/vision/user/edit-avatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const sendUserMessage = async (
  adminEmail: string,
  userEmail: string,
  message: string
) => {
  try {
    const res = await axiosInstance.post("/vision/user/send-message", {
      sender: adminEmail,
      reciever: userEmail,
      content: message,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const profileEdit = async (
  adminId: string,
  adminFirstName: string,
  adminLastName: string,
  adminPassword: string,
  adminBio: string,
  adminLocation: string,
  adminWebsite: string,
  adminFacebook: string,
  adminInstagram: string,
  adminYoutube: string,
  adminTiktok: string,
  messageButtonAllowed: boolean
) => {
  try {
    await axiosInstance.patch("/vision/user/edit-profile", {
      id: adminId,
      firstName: adminFirstName,
      lastName: adminLastName,
      password: adminPassword,
      bio: adminBio,
      location: adminLocation,
      website: adminWebsite,
      facebook: adminFacebook,
      instagram: adminInstagram,
      youtube: adminYoutube,
      tiktok: adminTiktok,
      messageButtonAllowed: messageButtonAllowed,
    });
  } catch (error) {
    throw error;
  }
};

export const collectionEdit = async (
  collectionId: string,
  collectionTitle: string
) => {
  try {
    await axiosInstance.patch("/vision/user/edit-collection", {
      id: collectionId,
      title: collectionTitle,
    });
  } catch (error) {
    throw error;
  }
};

export const addToNewCollection = async (
  title: string,
  userId: string,
  imageId: string,
  imageUrl: string
) => {
  try {
    const res = await axiosInstance.post("/vision/user/create-collection", {
      title,
      userId,
      imageId,
      imageUrl: [imageUrl],
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addToExistingCollection = async (id: string, imageId: string) => {
  try {
    const res = await axiosInstance.post("/vision/user/update-collection", {
      id,
      imageId,
    });
    await fetchAdminCollections();
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCollection = async (id: string) => {
  try {
    const res = await axiosInstance.delete(
      `/vision/user/delete-collection/${id}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
