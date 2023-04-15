import { useState } from "react";

const useRerender = () => {
  const [render, setRender] = useState(false);

  function reRender() {
    setRender(!render);
  }

  return {
    render,
    reRender,
  };
};

export default useRerender;
