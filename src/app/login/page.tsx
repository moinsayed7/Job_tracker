"use client"
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex justify-center">
      <div className="bg-blue-200 flex flex-col items-center py-7 px-7 rounded-xl mt-22 shadow-xl" >
      <h1 className="text-center text-2xl mb-10">Login</h1>
      <div>
        <input className="border bg-white px-2 w-50 mb-3"
          placeholder="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input className="border bg-white px-2 w-50 mb-7"
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="mb-3 text-red" >{error}</p>}
      <button className="w-50 bg-green-200 mb-7 rounded-md shadow-md"
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

      <p className="w-50 text-center">Don't have an account? <a className="text-blue-900 underline" href="/register">Sign up</a></p>
        </div>
    </div>
  );
}



// Email: terimeri@example.com
// Password: idktjmakd



