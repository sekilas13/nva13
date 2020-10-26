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
  color: #eaeaea;
  background-color: #333533;
  border-color: rgba(73, 80, 87, 0.4);
  &:focus {
    color: white;
    background-color: #333533;
    border-color: rgba(73, 80, 87, 1);
    box-shadow: 10px 5px 15px rgba(0, 0, 0, 0.075) inset,
      0px 0px 0px rgba(73, 80, 87, 0.6);
    outline: 0 none;
  }
`;

const Error = ({ msg }) => <small className="text-danger">{msg}</small>;

export { Card, Label, Error, Control };
