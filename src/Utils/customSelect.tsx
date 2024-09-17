// Reusable custom Select field
import React from 'react';

// Define the type for props
interface CustomSelectProps {
  label: string;
  options: { value: string; label: string }[]; 
  selectedValue: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

// CustomSelect component that accepts label, options, selectedValue, and onChange as props
const CustomSelect: React.FC<CustomSelectProps> = ({ label, options, selectedValue, onChange }) => {
  return (
    <div style={selectContainerStyles}>
      <label style={labelStyles}>{label}</label>
      <select value={selectedValue} onChange={onChange} style={selectStyles}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Styles for the select container
const selectContainerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  marginBottom: '15px',
  width: '100%',
  fontFamily: 'Poppins, sans-serif',
};

// Styles for the label
const labelStyles: React.CSSProperties = {
  marginBottom: '5px',
  fontSize: '16px',
  color: 'goldenrod',
  width: 100,
  padding: '10px',
};

// Styles for the select field
const selectStyles: React.CSSProperties = {
  padding: '10px',
  borderRadius: '8px',
  border: '2px solid goldenrod',
  fontSize: '16px',
  backgroundColor: 'black',
  color: 'goldenrod',
  outline: 'none',
  transition: 'border-color 0.3s ease',
  fontFamily: 'Poppins, sans-serif',
};

export default CustomSelect;
