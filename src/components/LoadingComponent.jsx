import React from "react";

function LoadingComponent() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex h-full py-2">
        <div className="w-full h-full flex justify-center items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingComponent;
