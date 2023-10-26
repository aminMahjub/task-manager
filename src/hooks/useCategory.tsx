import { useEffect, useState } from "react";
import api from "../api/api";

import { Category, FecthResponse } from "../types";
import { AxiosError, AxiosRequestConfig } from "axios";

const useCategory = (config?: AxiosRequestConfig) => {
  const [category, setCategory] = useState<Category[] | Category>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api<FecthResponse<Category[]>>("/categories", config)
      .then((data) => {
        setCategory(data.data.);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return { category, error, loading };
};

export default useCategory;
