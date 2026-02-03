import { api, SignupSchemaData } from "@/src/lib";
import { useCallback, useState } from "react";

export function useRegister() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const register = useCallback(async (data: SignupSchemaData) => {
    try {
      setError(false);
      setLoading(true);
      await api.post("/users/signup", data);

      setLoading(false);
      return true;
    } catch {
      setLoading(false);
      setError(true);
      return false;
    }
  }, []);

  return { register, error, loading };
}
