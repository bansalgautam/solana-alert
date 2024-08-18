import { Card, CardDescription } from "./ui/card";
import PropTypes from "prop-types";
import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "./ui/tooltip";
import { ChevronRight, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import useAlerts from "@/hooks/useAlerts";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Transactions from "./Transactions";

const AlertCard = ({ id, address, date, count }) => {
  const { handleDeleteAlert } = useAlerts();

  const handleDelete = () => {
    handleDeleteAlert(id);
  };
  return (
    <Card className="p-6 flex items-center justify-between">
      <div className="flex flex-col w-[60%]">
        <div className="text-ellipsis overflow-hidden text-nowrap">
          Alert #{id}
        </div>
        <CardDescription>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="max-w-full">
                <p className="overflow-hidden text-ellipsis">{address}</p>
              </TooltipTrigger>
              <TooltipContent>{address}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardDescription>
        <CardDescription className="flex gap-1">
          <span className="hidden sm:flex">Created on:</span>
          {new Date(date).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </CardDescription>
      </div>
      <div className="flex gap-4 items-center">
        <CardDescription className="text-center hidden md:flex">
          {count} {count === 1 ? "Transaction" : "Transactions"}
        </CardDescription>
        <Button variant="destructive" onClick={handleDelete}>
          <Trash2 size={20} />
        </Button>
        <Sheet>
          <SheetTrigger disabled={count === 0}>
            <Button
              variant="ghost"
              disabled={count === 0}
              className="disabled:"
            >
              <ChevronRight size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:w-96">
            <SheetHeader>
              <SheetTitle>Transactions</SheetTitle>
              <SheetDescription>Alert #{id}</SheetDescription>
            </SheetHeader>
            <Transactions alertId={id} />
          </SheetContent>
        </Sheet>
      </div>
    </Card>
  );
};

AlertCard.propTypes = {
  id: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default AlertCard;
