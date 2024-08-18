import useAlerts from "@/hooks/useAlerts";
import propTypes from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardDescription } from "./ui/card";
import { Link } from "react-router-dom";
import { LinkIcon } from "lucide-react";

const Transactions = ({ alertId }) => {
  const { transactions, isTransactionsLoading } = useSelector(
    (state) => state.user
  );
  const { handleFetchTransactions } = useAlerts();

  useEffect(() => {
    handleFetchTransactions(alertId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isTransactionsLoading) {
    return <TransactionsSkeleton />;
  }

  if (transactions?.[alertId]?.length === 0) {
    return <div className="mt-4 text-center">No Transactions Found</div>;
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      {transactions?.[alertId]?.map((transaction) => {
        const transactionDateAndTime = new Date(
          transaction.transactionReportedAt
        ).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <Card key={transaction.id}>
            <CardContent className="px-2 py-1 flex flex-col h-20 justify-between">
              <CardDescription>Date: {transactionDateAndTime}</CardDescription>
              <CardDescription>
                Amount:{" "}
                <span className="font-bold">
                  {Number(transaction.solAmount).toFixed(6)}
                </span>
              </CardDescription>
              <Link
                target="_blank"
                to={`https://explorer.solana.com/tx/${transaction.txHash}?cluster=devnet`}
                className="hover:underline focus-visible:underline text-blue-600 text-sm flex gap-1 items-center"
              >
                View on Explorer <LinkIcon size={16} />
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

const TransactionsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {Array.from({ length: 5 })
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} className="h-20 w-full" />
        ))}
    </div>
  );
};

Transactions.propTypes = {
  alertId: propTypes.string,
};

export default Transactions;
