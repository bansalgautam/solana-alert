import { SetAlert, ViewAlert } from "@/components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { email } = useSelector((state) => state.user);
  return (
    <>
      <section>
        <h1>
          Welcome, <span className="font-bold">{email}</span>
        </h1>
      </section>
      <section className="py-4">
        <h1>Your Actions</h1>
        <Tabs defaultValue="create-alert">
          <TabsList>
            <TabsTrigger value="create-alert">Create new alert</TabsTrigger>
            <TabsTrigger value="view-alerts">View Alerts</TabsTrigger>
          </TabsList>
          <TabsContent value="create-alert" tabIndex="-1">
            <SetAlert />
          </TabsContent>
          <TabsContent value="view-alerts" tabIndex="-1">
            <ViewAlert />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};

export default Dashboard;
