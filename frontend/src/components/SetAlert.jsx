import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useAlerts from "@/hooks/useAlerts";

const SetAlert = () => {
  const [publickKey, setPublicKey] = useState("");
  const { handleCreateAlert } = useAlerts();

  const handleChange = (e) => {
    setPublicKey(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateAlert(publickKey, setPublicKey);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Create new alert</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label htmlFor="address">Address</label>
            <Input
              id="address"
              name="address"
              placeholder="Enter Solana Public Key here"
              onChange={handleChange}
              value={publickKey}
            />
          </div>
          <Button type="submit" className="w-max">
            Create Alert
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <CardDescription>
          Setting up alerts on Solana were never this easy! Just add your public
          key and we will take care of the rest.
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default SetAlert;
