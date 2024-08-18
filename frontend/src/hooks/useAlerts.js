import { useDispatch } from "react-redux";
import useAxiosInstance from "./useAxios";
import { useToast } from "@/components/ui/use-toast";
import { setLoading } from "@/store/slices/app";
import {
  ALERTS_ROUTE,
  CREATE_ALERT_ROUTE,
  DELETE_ALERT_ROUTE,
  TRANSACTIONS_ROUTE,
} from "@/constants";
import { toastFromResponse } from "@/lib/utils";
import { useCallback } from "react";
import {
  setAlerts,
  setIsTransactionsLoading,
  setTransactions,
} from "@/store/slices/user";

const useAlerts = () => {
  const axios = useAxiosInstance();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleCreateAlert = useCallback(
    async (address, setAddress) => {
      dispatch(setLoading(true));
      try {
        const response = await axios.post(CREATE_ALERT_ROUTE, { address });
        setAddress("");
        toastFromResponse(toast, response);
      } catch (e) {
        toastFromResponse(toast, e.response);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [axios, toast, dispatch]
  );

  const handleDeleteAlert = useCallback(
    async (alertId) => {
      dispatch(setLoading(true));
      try {
        const response = await axios.delete(DELETE_ALERT_ROUTE, {
          data: { alertId },
        });
        toastFromResponse(toast, response);
        dispatch(setAlerts(response.data.alerts));
      } catch (e) {
        toastFromResponse(toast, e.response);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [axios, dispatch, toast]
  );

  const handleFetchAlerts = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(ALERTS_ROUTE);
      dispatch(setAlerts(response.data.alerts));
      toastFromResponse(toast, response);
    } catch (e) {
      toastFromResponse(toast, e.response);
    } finally {
      dispatch(setLoading(false));
    }
  }, [axios, dispatch, toast]);

  const handleFetchTransactions = useCallback(
    async (alertId) => {
      dispatch(setIsTransactionsLoading(true));
      try {
        const response = await axios.get(TRANSACTIONS_ROUTE, {
          params: { alertId },
        });
        dispatch(
          setTransactions({ alertId, transactions: response.data.transactions })
        );
        toastFromResponse(toast, response);
      } catch (e) {
        toastFromResponse(toast, e.response);
      } finally {
        dispatch(setIsTransactionsLoading(false));
      }
    },
    [axios, dispatch, toast]
  );

  return {
    handleCreateAlert,
    handleDeleteAlert,
    handleFetchAlerts,
    handleFetchTransactions,
  };
};

export default useAlerts;
