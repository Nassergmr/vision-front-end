import { Dispatch, SetStateAction } from "react";

export type AdminData = {
  id: string;
  firstName: string;
  lastName: string;
  avatar?:
    | string
    | "https://res.cloudinary.com/dae5vlvpe/image/upload/f_auto,q_auto/avatar_rccauo.png";
  email: string;
  bio: string;
  location?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  messageButtonAllowed: boolean;
  images?: { id: string; url: string; published: boolean }[];
  likes: { id: string; userUrl: string; imageUrl: string; userId?: string }[];
  collections: { id: string; imageUrl: string }[];
};

export type AdminLikes = {
  id: string;
  userUrl: string;
  imageUrl: string;
  imageId: string;
  userId?: string;
};

export type ImageData = {
  id: string;
  width: number;
  height: number;
  public_id: string;
  title: string;
  location: string;
  published: boolean;
  userId?: string;
  user: {
    id: string;
    slug: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  likes: { id: string; userUrl: string; imageUrl: string; userId?: string }[];
  comments: { id: string; content: string; userId?: string }[];
  addedAt: string;
};

export type AdminCollections = {
  id: string;
  title: string;
  userId?: string;
  images: {
    id: string;
    public_id: string;
    title: string;
    location: string;
    published: boolean;
    user: {
      id: string;
      slug: string;
      firstName: string;
      lastName: string;
      avatar: string;
    };
    likes: { id: string; userUrl: string; imageUrl: string; userId?: string }[];
    comments: { id: string; content: string; userId?: string }[];
    addedAt: string;
  }[];
  e: E;
};

export type CollectionData = {
  id: string;
  title: string;
  userId?: string;
  images: {
    id: string;
    public_id: string;
    title: string;
    width: number;
    height: number;
    location: string;
    published: boolean;
    user: {
      id: string;
      slug: string;
      firstName: string;
      lastName: string;
      avatar: string;
    };
    likes: { id: string; userUrl: string; imageUrl: string; userId?: string }[];
    comments: { id: string; content: string; userId?: string }[];
    addedAt: string;
  }[];
  e: E;
};

export type AdminCollectionImages = {
  id: string;
  title: string;
  images: [
    {
      id: string;
      public_id: string;
    }
  ];
};

type E = {
  id: string;
  public_id: string;
  userId?: string;
  title: string;
  location: string;
  published: boolean;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
};

export type AvatarNameDownloadProps = {
  e: {
    id: string;
    public_id: string;
    userId?: string;
    user: {
      id: string;
      slug: string;
      firstName: string;
      lastName: string;
      avatar: string;
    };
  };
  adminData?: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  userData?: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  galleryPath?: boolean;
};

export type LikeButtonProps = {
  e: {
    id: string;
    public_id: string;
    userId?: string;
  };
  userId?: string;
  loading4: boolean;
  setLoading4: (loading: boolean) => void;
  imageLikes: number;
  setImageLikes: (likes: number) => void;
};

export type AdminCollection = {
  id: string;
  title: string;
  images: {
    public_id: string;
    id: string;
  }[];
};

export type AddToCollectionProps = {
  collectionTitle: string;
  id: string;
  public_id: string;
  imgId: string;
  setCollectionTitle: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setDialogOpen: (dialogOpen: boolean) => void;
  setDialogVisible: (dialogVisible: boolean) => void;
  setDialogVisible2: (dialogVisible2: boolean) => void;
};

export type EProps = {
  e: {
    id: string;
    public_id: string;
    addedAt: string;
    user: {
      id: string;
      avatar?: string;
      firstName?: string;
      lastName: string;
    };
    adminData?: {
      firstName: string;
      lastName: string;
      avatar: string;
    } | null;
  };
  adminData?: {
    firstName: string;
    lastName: string;
    avatar: string;
  } | null;
};

export type Comment = {
  createdAt: string | number | Date;
  id: string;
  content: string;
  user?: {
    id: string;
    slug: string;
    avatar?: string | null;
    firstName?: string;
    lastName?: string;
    createdAt: string;
  };
};

export type CommentComponentProps = {
  imageComments: Comment[];
  setImageComments: Dispatch<SetStateAction<Comment[]>>;
  loading3: boolean;
  setLoading3: Dispatch<SetStateAction<boolean>>;
  imageComment: string;
  setImageComment: Dispatch<SetStateAction<string>>;
  e: ImageData;
};
