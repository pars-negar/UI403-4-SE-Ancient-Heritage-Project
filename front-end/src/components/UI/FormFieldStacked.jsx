import React from "react";

const FormFieldStacked = ({ label, children }) => {
  return (
    <div className="flex flex-col mb-4">
      {label && <label className="mb-1 font-medium">{label}</label>}
      {children}
    </div>
  );
};

export default FormFieldStacked;
