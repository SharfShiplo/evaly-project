import './ProductSpecification.css'

const ProductSpecification = ({title, description}) => {
    return (
        <div className="productspecification">
            <div className="productspecification__title"><h2>Product details of {title}</h2></div>
            <div className="productspecification__description">{description}</div>
        </div>
    )
}

export default ProductSpecification
