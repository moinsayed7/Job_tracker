"use client"
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        disabled={isLoading}
        onClick={async () => {
          if (email.trim() === "" || password.trim() === "") {
            setError("Please fill in all fields");
            return;
          }
          setIsLoading(true);
          setError(null);
          const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
          });
          
          if (result?.error) {
            setError("Invalid email or password");
          } else {
            window.location.href = "/";
          }
          setIsLoading(false);
        }}
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
    </div>
  );
}