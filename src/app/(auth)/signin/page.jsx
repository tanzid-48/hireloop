"use client";

import React, { useState } from "react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await authClient.signIn.email({ email, password });

    if (res?.error) {
      toast.error(res.error.message || "Sign in failed");
    } else {
      toast.success("Signed in successfully!");
      router.push("/");
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    const res = await authClient.signIn.social({ provider: "google" });
    if (res?.error) toast.error("Google sign in failed");
  };

  return (
    <div className="min-h-screen bg-[#08080f] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
            Welcome back
          </h1>
          <p className="text-sm text-white/35 leading-relaxed">
            HireLoop connects top talent with world-class companies.
          </p>
        </div>

        <Card className="w-full bg-[#0f0f1a] border border-white/[0.07] shadow-2xl rounded-2xl p-6">
          <Form className="flex flex-col gap-6" onSubmit={onSubmit}>
            {/* Email Field with Validation */}
            <TextField
              isRequired
              name="email"
              type="email"
              className="w-full"
              validate={(value) =>
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                  ? "Invalid email address"
                  : null
              }
            >
              <Label className="text-xs text-white/40 font-medium mb-1.5 block">
                Email Address
              </Label>
              <Input
                placeholder="Enter your email"
                className="w-full bg-white/[0.04] border border-white/[0.07] text-white rounded-xl px-4 py-3 text-sm focus:border-indigo-500/50 outline-none transition-all"
              />
              <FieldError className="text-red-400 text-xs mt-1" />
            </TextField>

            {/* Password Field with Advanced Validation */}
            <TextField
              isRequired
              minLength={8}
              name="password"
              className="w-full"
              validate={(value) => {
                if (value.length < 8) return "Must be at least 8 characters";
                if (!/[A-Z]/.test(value))
                  return "Must contain at least one uppercase letter";
                if (!/[0-9]/.test(value))
                  return "Must contain at least one number";
                return null;
              }}
            >
              <Label className="text-xs text-white/40 font-medium mb-1.5 block">
                Password
              </Label>

              <InputGroup className="bg-white/[0.04] border border-white/[0.07] rounded-xl focus-within:border-indigo-500/50 transition-all overflow-hidden">
                <InputGroup.Input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  className="bg-transparent text-white text-sm placeholder:text-white/20 py-3"
                />
                <InputGroup.Suffix className="pr-3">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    className="text-white/30 hover:text-white"
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? (
                      <EyeSlash size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>

              <Description className="text-[10px] text-white/30 mt-1">
                Must be at least 8 characters with 1 uppercase and 1 number.
              </Description>
              <FieldError className="text-red-400 text-xs mt-1" />
            </TextField>

            <Button
              type="submit"
              isLoading={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold h-11 rounded-xl transition-all"
            >
              Sign in
            </Button>

            {/* Divider and Google Button remain same */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/20" />
              <span className="text-xs text-white/20 uppercase font-semibold">
                or
              </span>
              <div className="flex-1 h-px bg-white/20" />
            </div>

            <Button
              type="button"
              onPress={handleGoogleSignIn}
              className="w-full bg-white/[0.04] border border-white/[0.07] text-white/60 hover:text-white h-11 rounded-xl text-sm"
            >
              <FcGoogle size={18} />
              Continue with Google
            </Button>
          </Form>
          <p className="text-center text-sm text-white/30 mt-4">
            Do not have an account?{" "}
            <a href="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
