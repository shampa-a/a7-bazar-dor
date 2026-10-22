"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const SignIn = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি");
        console.error("Sign in error:", error);
        return;
      }

      if (data) {
        toast.success("সাইন ইন সফল হয়েছে!");
        console.log("Sign in success:", data);

        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.error("Unexpected sign in error:", err);
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm"
      >
        <fieldset className="fieldset rounded-2xl border border-base-300 bg-base-200 p-6 shadow-lg">
          <legend className="fieldset-legend px-2 text-xl font-bold">
            আপনার অ্যাকাউন্টে সাইন ইন করুন
          </legend>

          <p className="mb-4 text-sm text-base-content/70">
            বাজার দর ব্যবহার করতে আপনার অ্যাকাউন্টে প্রবেশ করুন।
          </p>

          <label htmlFor="email" className="label">
            ইমেইল
          </label>

          <input
            id="email"
            name="email"
            type="email"
            className="input w-full"
            placeholder="আপনার ইমেইল"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <label htmlFor="password" className="label mt-3">
            পাসওয়ার্ড
          </label>

          <input
            id="password"
            name="password"
            type="password"
            className="input w-full"
            placeholder="আপনার পাসওয়ার্ড"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="btn mt-5 w-full border-0 bg-green-600 text-white hover:bg-green-700"
          >
            {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
          </button>

          <p className="mt-4 text-center text-sm">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-semibold text-green-700 hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default SignIn;