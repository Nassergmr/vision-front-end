import { create } from "zustand";
import {
  AdminCollection,
  AdminCollectionImages,
  AdminCollections,
  AdminLikes,
  ImageData,
  LikeButtonProps,
} from "../../types/types";

interface AdminData {
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  email: string;
  password: string;
  bio: string;
  location?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  messageButtonAllowed: boolean;
  images?: ImageData;
  likes: LikeButtonProps;
  collections: AdminCollection;
}

interface Data {
  images: ImageData[];

  searchResults: ImageData[];
  emptySearchResults: boolean;

  adminData: AdminData | null;
  adminAvatar: string | null;
  adminAvatarLoaded: boolean; // loading state when updating avatar
  adminImages: ImageData[] | null;
  adminPublishedImages: ImageData[] | null;
  adminDraftImages: ImageData[] | null;
  adminLikes: AdminLikes[] | null;
  adminLikedImages: ImageData[] | null;
  adminCollections: AdminCollections[] | null;
  adminCollectionsImages: AdminCollectionImages[] | null;
  adminDownloadedImages: ImageData[] | null;

  updateImages: (data: ImageData[]) => void;

  updateSearchResults: (data: ImageData[]) => void;
  updateEmptySearchResults: (data: boolean) => void;

  updateAdminData: (data: AdminData) => void;
  updateAdminAvatar: (data: string) => void;
  updateAdminAvatarLoaded: (data: boolean) => void;
  updateAdminImages: (data: ImageData[]) => void;
  updateAdminPublishedImages: (data: ImageData[]) => void;
  updateAdminDraftImages: (data: ImageData[]) => void;
  updateAdminLikes: (data: AdminLikes[]) => void;
  updateAdminLikedImages: (data: ImageData[]) => void;
  updateAdminDownloadedImages: (data: ImageData[]) => void;
  updateAdminCollections: (data: AdminCollections[]) => void;
  updateAdminCollectionsImages: (data: AdminCollectionImages[]) => void;
}

export const useStore = create<Data>((set) => ({
  images: [],

  searchResults: [],
  emptySearchResults: false,

  adminData: null,
  adminAvatar: null,
  adminAvatarLoaded: false,
  adminImages: null,
  adminPublishedImages: null,
  adminDraftImages: null,
  adminLikes: [],
  adminLikedImages: null,
  adminDownloadedImages: null,
  adminCollections: null,
  adminCollectionsImages: null,

  updateImages: (data) => set({ images: data }),

  updateSearchResults: (data) => set({ searchResults: data }),
  updateEmptySearchResults: (state) => set({ emptySearchResults: state }),

  updateAdminData: (data) => set({ adminData: data }),
  updateAdminAvatar: (data) => set({ adminAvatar: data }),
  updateAdminAvatarLoaded: (data) => set({ adminAvatarLoaded: data }),
  updateAdminImages: (data) => set({ adminImages: data }),
  updateAdminPublishedImages: (data) => set({ adminPublishedImages: data }),
  updateAdminDraftImages: (data) => set({ adminDraftImages: data }),
  updateAdminLikes: (data) => set({ adminLikes: data }),
  updateAdminLikedImages: (data) => set({ adminLikedImages: data }),
  updateAdminDownloadedImages: (data) => set({ adminDownloadedImages: data }),
  updateAdminCollections: (data) => set({ adminCollections: data }),
  updateAdminCollectionsImages: (data) => set({ adminCollectionsImages: data }),
}));
