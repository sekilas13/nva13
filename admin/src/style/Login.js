import styled from "styled-components";
import { Form, Card as card } from "react-bootstrap";

const { Control: ctrl, Label: lbl } = Form;

const Card = styled(card)`
  background-color: #242423;
`;

const Label = styled(lbl)`
  color: white;
`;

const Control = styled(ctrl)`
  border-color: rgba(126, 239, 104, 0.8);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset,
    0 0 8px rgba(51, 53, 51, 0.6);
  outline: 0 none;
`;

const Error = ({ msg }) => <small className="text-danger">{msg}</small>;

export { Card, Label, Error, Control };
