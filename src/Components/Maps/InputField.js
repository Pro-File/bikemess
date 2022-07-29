import React from "react";
import styled from "styled-components";
import useInput from "./useInput";

const InputField = (props) => {
  const address = useInput("");

  return (
    <Wrapper>
      <Input
        placeholder='Click Here to Search Your Desired Location to view Available Parking Spaces'
        {...address}
        isTyping={address.value !== ""}
      />
      {address.suggestions?.length > 0 && (
        <SuggestionWrapper>
          {address.suggestions.map((suggestion, index) => {
            return (
              <Suggestion
                key={index}
                onClick={() => {
                  props.setSearchedLocation(suggestion);
                  address.setValue(suggestion.place_name);
                  address.setSuggestions([]);
                }}
              >
                {suggestion.place_name}
              </Suggestion>
            );
          })}
        </SuggestionWrapper>
      )}
    </Wrapper>
  );
};

export default InputField;

const Wrapper = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  background: #000000aa;
  color: #ffff;
  border: none;
  padding: 10px 20px;
  border-radius: 10px 10px 0px 0px;
  position: relative;
  display: grid;
  justify-self: center;
  &:focus {
    outline: none;
    border-radius: ${(props) => props.isTyping && "10px 10px 0px 0px"};
  }
  &::placeholder {
    color: #ffa13b;
  }
`;

const SuggestionWrapper = styled.div`
  background: #ffff;
  position: absolute;
  z-index: 1000;
  width: 90%;
  padding: 0px 20px;
  border-radius: 0px 0px 10px 10px;
`;

const Suggestion = styled.p`
  cursor: pointer;
  z-index: 1000;
  border-bottom: 1px solid black;
  max-width: 100%;
  margin: 10px 0px;
`;
