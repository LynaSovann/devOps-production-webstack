"use server";

import { uploadProfileImage } from "@/service/profileImageService";

export const uploadProfileImageAction = async (file: File) => {
  await uploadProfileImage(file);
};
