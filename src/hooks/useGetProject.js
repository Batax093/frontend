import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import apiProvider from "../config/handleAPI";

const useGetProjects = () => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  const getProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiProvider.GetProjects();
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setProjects(data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  return { loading, projects, getProjects };
};

export default useGetProjects;
