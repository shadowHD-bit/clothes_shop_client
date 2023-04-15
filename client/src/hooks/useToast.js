import { useState } from "react";

const useToast = () => {
  const [showToast, setShowToast] = useState(false);
  const [sysMessage, setSysMessage] = useState("");

  function handleCloseToast() {
    setShowToast(false);
  }

  function handleOpenToast() {
    setShowToast(true);
  }

  return {
    showToast,
    handleOpenToast,
    handleCloseToast,
    setSysMessage,
    sysMessage,
  };
};

export default useToast;
