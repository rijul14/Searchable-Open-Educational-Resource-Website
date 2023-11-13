import React from "react";
import "./dropdownfilter.css";

export default class DropdownFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    toggleDropdown = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    handleOptionChange = (option, checked) => {
        if (this.props.onChange) {
            this.props.onChange(option, checked);
        }
    }

    render() {
        const { category, options, checkedStates } = this.props;
        const { isOpen } = this.state;

        return (
            <div className="dropdown-container">
                <div onClick={this.toggleDropdown} className="dropdown-header">
                    {category}
                </div>
                {isOpen && (
                    <div className="dropdown-options">
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
                    </div>
                )}
            </div>
        );
    }
}
