
import { useEffect, useRef } from "react"
import "./ProductImage.css"
import { addZoom } from "../../utils/zoomImage";
function ProductImage({imgUrl}) {
    const imgRef = useRef(null)
    useEffect(() => {
        let target = imgRef.current
        if(imgUrl !== ''){
            addZoom(target)
        }
        return () => {
            addZoom(target)
        }
    }, [imgUrl])
    return (
        <div className="product__image">
            <img src={imgUrl} alt="thumb"/>
            <div className="product__zoom" ref={imgRef} style={{backgroundImage: `url(${imgUrl})`}}></div>
        </div>
    )
}

export default ProductImage
