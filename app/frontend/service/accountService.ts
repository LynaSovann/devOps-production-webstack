import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const getAccountInfor = async () => {
  const session = await getServerSession(authOptions);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/account-info`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.payload?.token}`,
      },
    },
  );
  const data = await res.json();
  return data;
};
