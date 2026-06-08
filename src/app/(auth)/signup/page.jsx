"use client";

import React, { useState } from "react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
  Radio,
  RadioGroup,
} from "@heroui/react";

import { useRouter, useSearchParams } from "next/navigation";

const SignUp = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    const image = formData.get("image");
    const role = formData.get("role");

    const res = await authClient.signUp.email({
      email,
      password,
      name,
      image: image || undefined,
      role,
    });

    if (res?.error) {
      toast.error(res.error.message || "Sign up failed");
    } else {
      toast.success("Account created successfully!");

      router.push(`/signin?redirect=${searchParams.get("redirect") || "/"}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#08080f] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
            Create an account
          </h1>
          <p className="text-sm text-white/35">Join HireLoop today.</p>
        </div>

        <Card className="w-full bg-[#0f0f1a] border border-white/[0.07] p-6 rounded-2xl">
          <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
            {/* Name Field */}
            <TextField name="name" className="w-full">
              <Label className="text-xs text-white/40 font-medium mb-1.5 block">
                Full Name
              </Label>
              <Input
                placeholder="Enter your name"
                className="w-full bg-white/[0.04] border border-white/[0.07] text-white rounded-xl px-4 py-3 text-sm focus:border-indigo-500/50 outline-none"
              />
            </TextField>

            {/* Email Field */}
            <TextField isRequired name="email" type="email" className="w-full">
              <Label className="text-xs text-white/40 font-medium mb-1.5 block">
                Email Address
              </Label>
              <Input
                placeholder="Enter your email"
                className="w-full bg-white/[0.04] border border-white/[0.07] text-white rounded-xl px-4 py-3 text-sm focus:border-indigo-500/50 outline-none"
              />
            </TextField>

            {/* Password Field */}
            <TextField
              isRequired
              minLength={8}
              name="password"
              className="w-full"
            >
              <Label className="text-xs text-white/40 font-medium mb-1.5 block">
                Password
              </Label>
              <InputGroup className="bg-white/[0.04] border border-white/[0.07] rounded-xl focus-within:border-indigo-500/50 overflow-hidden">
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
                    className="text-white/30"
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
            </TextField>

            {/* Photo URL Field (Optional) */}
            <TextField name="image" className="w-full">
              <Label className="text-xs text-white/40 font-medium mb-1.5 block">
                Photo URL (Optional)
              </Label>
              <Input
                placeholder="https://example.com/photo.jpg"
                className="w-full bg-white/[0.04] border border-white/[0.07] text-white rounded-xl px-4 py-3 text-sm focus:border-indigo-500/50 outline-none"
              />
            </TextField>

            {/* Role Field */}
            <div className="flex flex-col gap-4 items-center">
              <Label>Sign Up As</Label>
              <RadioGroup
                defaultValue="seeker"
                name="role"
                orientation="horizontal"
              >
                <Radio value="seeker">
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  <Radio.Content>
                    <Label>Seeker</Label>
                  </Radio.Content>
                </Radio>
                <Radio value="recruiter">
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  <Radio.Content>
                    <Label>Recruiter</Label>
                  </Radio.Content>
                </Radio>
              </RadioGroup>
            </div>

            <Button
              type="submit"
              isLoading={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold h-11 rounded-xl mt-2"
            >
              Sign up
            </Button>
          </Form>

          <p className="text-center text-sm text-white/30 mt-4">
            Already have an account?{" "}
            <a
              href={`/signin?redirect=${redirect}`}
              className="text-indigo-600 hover:underline"
            >
              Sign in
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
