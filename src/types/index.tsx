import { OutputFileEntry } from "@uploadcare/blocks";
import { User } from "firebase/auth";

export interface UserSignIn {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FileEntry {
  files: OutputFileEntry[];
}

export interface Post {
  caption: string;
  photos: PhotoMeta[];
  likes: number;
  userlikes: string[];
  userId: string | null;
  username?: string;
  photoURL?: string;
  date: Date;
  comments: Comment[];
}

export interface Comment {
  content: string;
  author: string;
}

export interface PhotoMeta {
  cdnUrl?: string;
  uuid?: string;
}

export interface documentResponse {
  caption?: string;
  photos?: PhotoMeta[];
  likes?: number;
  userlikes?: string[];
  username?: string;
  photoURL?: string;
  id?: string;
  date?: Date;
}

export interface ProfileInfo {
  user?: User;
  displayName?: string;
  photoURL?: string;
}

export interface UserProfile {
  userId?: string;
  displayName?: string;
  photoURL?: string;
  userBio?: string;
}

export interface ProfileResponse {
  id?: string;
  userId?: string;
  displayName?: string;
  photoURL?: string;
  userBio?: string;
}
