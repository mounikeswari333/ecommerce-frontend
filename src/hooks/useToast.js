import { useEffect, useState } from "react";

const useToast = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(() => setMessage(""), 2200);
    return () => clearTimeout(timer);
  }, [message]);

  return { message, showToast: setMessage };
};

export default useToast;
