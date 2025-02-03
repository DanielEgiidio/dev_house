import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="loading">
      <Loader2 className="loading__spinner" />
      <span className="loading__text"> Carregando...</span>
    </div>
  );
};

export default Loading;
