// app/auth/signin/page.tsx

"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SignIn = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      console.error("Error logging in:", error);
    }
  }, [error]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Sign In</h1>
      <button onClick={() => signIn("google")} style={buttonStyles}>
        Sign in with Google
      </button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

const buttonStyles = {
  backgroundColor: "#4285F4",
  color: "white",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  borderRadius: "5px",
};

export default SignIn;
