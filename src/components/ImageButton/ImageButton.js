import './ImageButton.css';

function ImageButton({thumbSrc, chandeImage}) {
    return (
        <button onClick={chandeImage} className="imageButton">
            <img src={thumbSrc} alt='thumb'/>
        </button>
    )
}

export default ImageButton
