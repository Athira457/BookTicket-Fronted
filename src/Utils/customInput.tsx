// Reusable custom Input field
import React from 'react';

// Define the type for props
interface CustomInputProps {
  label: string;
  inputType: string;
  name: string;
  placeholder?: string; 
  value?: string;
  onChange?:(event: React.ChangeEvent<HTMLInputElement>) => void;
  className?:string;
}

// CustomInput component that accepts label, placeholder and onChange as props
const CustomInput: React.FC<CustomInputProps> = ({ label,name, placeholder, inputType, value, onChange, className}) => {
  return (
    <div style={inputContainerStyles}>
      <label style={labelStyles}>{label}</label>
      <input name={name} type={inputType} placeholder={placeholder} style={inputStyles}  value={value} onChange={onChange} className={className}/>
    </div>
  );
};

// Styles for the input container
const inputContainerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  marginBottom: '15px',
  width: '100%',
  fontFamily: 'Poppins, sans-serif',
};

// Styles for the label
const labelStyles: React.CSSProperties = {
  marginBottom: '5px',
  padding: '10px', 
  fontSize: '16px',
  fontWeight:'400',
  color: 'goldenrod',
  width: 150,
};

// Styles for the input field
const inputStyles: React.CSSProperties = {
  padding: '8px',
};


export default CustomInput;
