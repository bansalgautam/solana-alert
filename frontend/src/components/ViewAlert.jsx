import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import useAlerts from "@/hooks/useAlerts";
import AlertCard from "./AlertCard";
import { useEffect } from "react";
import { Button } from "./ui/button";

const ViewAlert = () => {
  const alerts = useSelector((state) => state.user.alerts);
  const { handleFetchAlerts } = useAlerts();

  useEffect(() => {
    handleFetchAlerts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Your Alerts</CardTitle>
        <CardDescription className="text-center">
          Unable to find your alert?{" "}
          <Button
            variant="ghost"
            className="text-blue-500 px-0 py-0 focus:outline-none h-max"
            onClick={handleFetchAlerts}
          >
            Refresh
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full flex flex-col gap-4 max-h-[500px] overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="text-center">No Alerts to display</div>
        ) : (
          alerts.map((alert) => (
            <AlertCard
              key={alert.id}
              id={alert.id}
              address={alert.address}
              date={alert.createdAt}
              count={alert._count.transactions}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default ViewAlert;
