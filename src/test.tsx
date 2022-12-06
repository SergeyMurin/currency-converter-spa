import React, {useState} from 'react';
import Select from 'react-select';

const options = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'},
];

export const Test: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (selectedOption: any) => {
        setSelectedOption(selectedOption);
    }

    return (
        <div className="App">
            <Select
                defaultValue={selectedOption}
                onChange={handleChange}
                options={options}
            />
        </div>
    );
}