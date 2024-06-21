import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

export const Select = ({ options, value, handleChange, ...props }) => {
  return (
    <StyledSelect value={value} {...props}>
      {options.map((option) => (
        <option value={option.value} key={option.value} onChange={handleChange}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};