import './Callon.css'

function Callon({proCode, phoneNo}) {
    return (
        <div className="callon">
            <p>{`Have questions about this product (${proCode})`}</p>
            <h4>Call: {phoneNo}</h4>
        </div>
    )
}

export default Callon
