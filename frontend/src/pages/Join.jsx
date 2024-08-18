import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Join = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { handleLogin, handleSignup } = useAuth();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    isLogin ? handleLogin(formData) : handleSignup(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="min-w-96">
        <CardHeader>
          <CardTitle>Solana Alerts - {isLogin ? "Login" : "Signup"}</CardTitle>
        </CardHeader>
        <CardContent className="pb-3">
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                placeholder="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Input
                id="password"
                placeholder="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Button type="submit">
              {isLogin ? "Login Now" : "Signup Now"}
            </Button>
          </form>
          <div className="pt-3 flex items-center">
            <hr className="w-full" />
            <CardDescription className="text-nowrap px-2">
              In case you
            </CardDescription>
            <hr className="w-full" />
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button onClick={toggleForm} className="w-full" variant="outline">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Join;
