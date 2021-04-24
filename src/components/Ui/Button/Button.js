import "./Button.css";

function Button({clicked, label}) {
    return (
        <button className="my_button" onClick={clicked}>
            {label}
        </button>
    )
}

export default Button
