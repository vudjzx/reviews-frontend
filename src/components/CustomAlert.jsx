import React from "react";

function CustomAlert({ message, error }) {
  const color = error ? "bg-red-500" : "bg-yellow-600";
  return (
    <div className="flex items-center justify-center my-4">
      <h3 className={`${color} p-3 px-6 rounded-lg`}>{message}</h3>
    </div>
  );
}

export default CustomAlert;
