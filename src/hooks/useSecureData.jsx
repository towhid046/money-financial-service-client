import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useSecureData = (name, url) => {
  const axiosInstance = useAxios();
  const { data, refetch, error, isError, isLoading } = useQuery({
    queryKey: [name],
    queryFn: async () => {
      const res = await axiosInstance.get(url);
      return res.data;
    },
  });

  return { data, refetch, isLoading, isError, error };
};

export default useSecureData;
