import React from 'react';

// Define the type for props
interface CustomButtonProps {
  label: string;
  onClick?: () => void;
}

// CustomButton component that accepts 'label' as a prop
const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick }) => {
  return (
    <button style={buttonStyles} onClick={onClick}>
      {label}
    </button>
  );
};

// Styles for the button
const buttonStyles: React.CSSProperties = {
  backgroundColor: 'goldenrod',
  color: 'black',
  padding: '10px 20px',
  marginLeft:'20px',
  borderRadius: '8px', // Rounded corners
  border: '2px solid goldenrod',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease', // Smooth transition on hover
  outline: 'none',
};

export default CustomButton;
