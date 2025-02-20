import React,{useState} from 'react';
import styled from 'styled-components';

const MatchesDetails = ({match, onClose}) => {
    const [selectedRound, setSelectedRound] = useState(0);
    if (!match) return null;
    return (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={onClose}>X</CloseButton>
            <MatchTitle>{match.player1} vs {match.player2}</MatchTitle>
            <RoundSelector>
              {Array.from({ length: 12 }).map((_, index) => (
                <RoundButton
                  key={index}
                  onClick={() => setSelectedRound(index)}
                  $isSelected={selectedRound === index}
                >
                  Ronda {index + 1}
                </RoundButton>
              ))}
            </RoundSelector>
            <Round>
              <SetsContainer>
                <Set>
                  <SetInput type="number" min="0" max="3" />
                  <SetLabel>Set 1</SetLabel>
                  <SetInput type="number" min="0" max="3" />
                </Set>
                <Set>
                  <SetInput type="number" min="0" max="3" />
                  <SetLabel>Set 2</SetLabel>
                  <SetInput type="number" min="0" max="3" />
                </Set>
                <Set>
                  <SetInput type="number" min="0" max="3" />
                  <SetLabel>Set 3</SetLabel>
                  <SetInput type="number" min="0" max="3" />
                </Set>
              </SetsContainer>
            </Round>
          </ModalContent>
        </ModalOverlay>
      );
    }; 
export default MatchesDetails;
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;
const ModalContent = styled.div`
    background: white;
    border-radius: 8px;
    padding: 16px;
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    position: relative;
`;
const CloseButton = styled.button`
    position: absolute;
    top: 8px;
    right: 8px;
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        color: red;
    }
`;
const MatchTitle = styled.h2`
    margin-bottom: 16px;
    text-align: center;
`;
const RoundSelector = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 32px;
    overflow-x: auto;
    white-space: nowrap;
    padding: 8px;
    max-width: 100%;

    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
        height: 7px; 
        display: block;
    }
    
    &::-webkit-scrollbar-track {
        background: #f0f0f0; /* Color de fondo de la barra */
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: #007bff !important; /* Color de la barra */
        border-radius: 4px;
        transition: background 0.3s ease; /* Transición suave */
    }
    /* Cambia el color cuando el usuario presiona la barra */
    &::-webkit-scrollbar-thumb:active {
        background: rgb(255, 0, 0) !important;
    }
`;
const RoundButton = styled.button.attrs(({ isSelected }) => ({
    'aria-pressed': isSelected, // Accesibilidad mejorada
  }))`
    min-width: 100px; 
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: ${({ $isSelected }) => ($isSelected ? '#007bff' : '#000')};
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${({ $isSelected }) => ($isSelected ? '#0056b3' : '#e70b0b')};
    }
  `;
const Round = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;
const SetsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 9px;
    width: 95%;
`;
const Set = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between; 

    @media (max-width: 600px) {
        flex-wrap: wrap; 
        justify-content: center;
    }
`;
const SetLabel = styled.span`
    font-weight: bold;
    text-align: center;
    flex: 1;
`;  
const SetInput = styled.input`
    width: 60px; 
    padding: 8px;
    font-size: 16px;
    border: 2px solid #ccc;
    border-radius: 4px;  
    margin-left: 90px;
    margin-right: 90px;
    margin: 0 10px; 

    @media (max-width: 600px) {
        width: 40px; 
    }
`;
