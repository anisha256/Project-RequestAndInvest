import React from 'react';
import styled from 'styled-components';
const Spinner = () => {
  return (
    <LoadingSpinnerContainer>
      <LoadingSpinner></LoadingSpinner>
    </LoadingSpinnerContainer>
  );
};

export default Spinner;
const LoadingSpinnerContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5000;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 6px solid;
  border-color: #000 transparent #555 transparent;
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
