import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const uploadProfileImage = async (file: File) => {
  const session = await getServerSession(authOptions);
  console.log(session);
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/account-info`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.payload?.token}`,
      },
      body: formData,
    },
  );
  const data = await res.json();
};
