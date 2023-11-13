import React from "react";
import "./dropdownfilter.css";
import Accordion from 'react-bootstrap/Accordion';

export default class DropdownFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true, 
        };
    }

    handleOptionChange = (option, checked) => {
        if (this.props.onChange) {
            this.props.onChange(option, checked);
        }
    }

    render() {
        const { category, options, checkedStates } = this.props;

        return (
                <Accordion alwaysOpen>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>{category}</Accordion.Header>
                        <Accordion.Body>
                            {options.map((option, index) => (
                                <div key={index}>
                                    <input
                                        checked={checkedStates && checkedStates.includes(option === "Formulario de Google" ? "Google Form" : option)}
                                        onChange={(e) => this.handleOptionChange(option, e.currentTarget.checked)}
                                        className="input"
                                        type="checkbox"
                                    />
                                    {option}
                                </div>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
        );
    }
}
