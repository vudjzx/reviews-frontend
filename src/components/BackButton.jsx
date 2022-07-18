import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
function BackButton({ navigateRoute }) {
  const navigate = useNavigate();

  const onBack = () => {
    navigate(navigateRoute ?? -1);
  };

  return (
    <button onClick={onBack} className="flex items-center my-2 pr-4">
      <IoMdArrowRoundBack size="32" />
      <p className="px-2 py-4">Back</p>
    </button>
  );
}

export default BackButton;
