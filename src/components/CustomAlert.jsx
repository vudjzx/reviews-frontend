import React from "react";

function CustomAlert({ message, error }) {
  const color = error
    ? "bg-red-500 text-slate-50"
    : "bg-indigo-600 text-slate-50";
  return (
    <div className="flex items-center justify-center my-4 animate-fade">
      <h3 className={`${color} p-3 px-6 rounded-lg text-center`}>{message}</h3>
    </div>
  );
}

export default CustomAlert;
