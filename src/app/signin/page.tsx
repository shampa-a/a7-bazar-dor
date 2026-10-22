"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  // Email and password login
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি");
        return;
      }

      toast.success("সাইন ইন সফল হয়েছে!");
      router.replace("/");
      router.refresh();
    } catch (err) {
      console.error("Sign in error:", err);
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // Google and GitHub login
  const handleSocialLogin = async (
    provider: "google" | "github"
  ) => {
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
        errorCallbackURL: "/signin",
      });

      if (error) {
        toast.error(error.message || "লগইন করা যায়নি");
        setSocialLoading(null);
      }
    } catch (err) {
      console.error(`${provider} login error:`, err);
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setSocialLoading(null);
    }
  };

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-base-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-base-300 bg-base-200 p-6 shadow-lg sm:p-8">

        {/* Header */}
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="text-2xl font-bold text-green-700"
          >
            🛒 বাজার দর
          </Link>

          <h1 className="mt-4 text-2xl font-bold">
            আপনার অ্যাকাউন্টে সাইন ইন করুন
          </h1>

          <p className="mt-2 text-sm text-base-content/70">
            বাজার দর ব্যবহার করতে আপনার অ্যাকাউন্টে প্রবেশ করুন।
          </p>
        </div>

        {/* Email Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="label mb-1">
              ইমেইল
            </label>

            <input
              id="email"
              name="email"
              type="email"
              className="input w-full"
              placeholder="আপনার ইমেইল লিখুন"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="label mb-1">
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              name="password"
              type="password"
              className="input w-full"
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || socialLoading !== null}
            className="btn mt-2 w-full border-0 bg-green-600 text-white hover:bg-green-700"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                সাইন ইন হচ্ছে...
              </>
            ) : (
              "ইমেইল দিয়ে সাইন ইন"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="divider my-5">অথবা</div>

        {/* Google Login */}
        <button
          type="button"
          onClick={() => handleSocialLogin("google")}
          disabled={loading || socialLoading !== null}
          className="btn btn-outline w-full"
        >
          {socialLoading === "google" ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.03 13.22l7.98 6.19C11.9 13.72 17.5 9.5 24 9.5Z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.95 46.98 31.83 46.98 24.55Z"
              />
              <path
                fill="#FBBC05"
                d="M10.02 28.59A14.4 14.4 0 0 1 9.25 24c0-1.6.27-3.15.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.46-6.19Z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.45-4.89 2.3-8.18 2.3-6.5 0-12.1-4.22-14-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
              />
            </svg>
          )}

          Google দিয়ে লগইন
        </button>

        {/* GitHub Login */}
        <button
          type="button"
          onClick={() => handleSocialLogin("github")}
          disabled={loading || socialLoading !== null}
          className="btn btn-neutral mt-3 w-full"
        >
          {socialLoading === "github" ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.68-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.62 1.22 3.26.93.1-.73.39-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.12 2.96.72.78 1.15 1.78 1.15 3.01 0 4.29-2.62 5.24-5.12 5.52.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
            </svg>
          )}

          GitHub দিয়ে লগইন
        </button>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-semibold text-green-700 hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>

        {/* Home Link */}
        <p className="mt-3 text-center text-sm">
          <Link
            href="/"
            className="text-base-content/70 hover:text-green-700"
          >
            ← হোমপেজে ফিরে যান
          </Link>
        </p>
      </div>
    </main>
  );
}