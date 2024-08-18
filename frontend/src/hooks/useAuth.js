import useAxiosInstance from "./useAxios";
import {
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  REFRESH_TOKEN_ROUTE,
  SIGNUP_ROUTE,
} from "../constants";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken, setEmail } from "../store/slices/user";
import { setLoading } from "../store/slices/app";
import { useToast } from "@/components/ui/use-toast";
import { toastFromResponse } from "@/lib/utils";

const useAuth = () => {
  const axios = useAxiosInstance();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleSignup = useCallback(
    async ({ email, password }) => {
      dispatch(setLoading(true));
      try {
        const response = await axios.post(SIGNUP_ROUTE, { email, password });
        dispatch(setEmail(response.data.email));
        dispatch(setAccessToken(response.data.accessToken));
        toastFromResponse(toast, response);
      } catch (error) {
        toastFromResponse(toast, error.response);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [axios, dispatch, toast]
  );

  const handleLogin = useCallback(
    async ({ email, password }) => {
      dispatch(setLoading(true));
      try {
        dispatch(setEmail(email));
        const response = await axios.post(LOGIN_ROUTE, { email, password });
        dispatch(setAccessToken(response.data.accessToken));
        toastFromResponse(toast, response);
      } catch (error) {
        toastFromResponse(toast, error.response);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [axios, dispatch, toast]
  );

  const handleLogout = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(LOGOUT_ROUTE);
      toastFromResponse(toast, response);
    } catch (error) {
      toastFromResponse(toast, error.response);
    } finally {
      dispatch(setEmail(null));
      dispatch(setAccessToken(null));
      dispatch(setLoading(false));
    }
  }, [axios, dispatch, toast]);

  const handleRefreshToken = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(REFRESH_TOKEN_ROUTE);
      dispatch(setEmail(response.data.email));
      dispatch(setAccessToken(response.data.accessToken));
      toast({
        description: "Session refreshed",
      });
    } finally {
      dispatch(setLoading(false));
    }
  }, [axios, dispatch, toast]);

  return { handleLogin, handleLogout, handleRefreshToken, handleSignup };
};

export default useAuth;
