import React, { type ReactElement } from "react";


interface CheckboxLabelProps {
  label: string;
  isChecked: string;
  onChange: () => void;
}

function CheckboxLabel({ 
  label, 
  isChecked, 
  onChange 
}: CheckboxLabelProps): ReactElement {
  return (
    <label className="dark text-gray-900">
      <input
        type="checkbox"
        value={isChecked}
        onChange={onChange}
        className="mr-2 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
      />
      {label}
    </label>
  );
};

export default CheckboxLabel;