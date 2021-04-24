import './SelectOption.css'

function SelectOption({options, value, changed, label}) {
    return (
        <div className="selectOption">
        <label>{label}</label>
        <select value={value} onChange={changed}>
        {options.map((option) => (<option key={option.key} value={option.key}>{option.value}</option>))}
        </select>
        </div>
    )
}

export default SelectOption
