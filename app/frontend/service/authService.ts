export const signUpService = async (email: string, password: string) => {
  console.log("url = ", process.env.NEXT_PUBLIC_BACKEND_URL);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/accounts/create-account`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    },
  );

  const data = await res.json();

  return data;
};
