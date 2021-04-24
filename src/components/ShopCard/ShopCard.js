import './ShopCard.css';

function ShopCard({inStock, shopImg, shopName, price, disPrice}) {
    return (
        <div className="shopcard">
            <div className="shopcard__stock">{inStock > 0 ? "STOCK AVAILABLE": "OUT OF STOCK"}</div>
            <div className="shopcard__img" onClick={()=>{}}>
                <img src={shopImg} alt="shop"/>
            </div>
            <div className="shopcard__details">
                <h4 onClick={()=>{}}>{shopName}</h4>
                <p><span className="old"><del>{price}</del></span> <span className="new">{disPrice}</span></p>
            </div>
            <div className="shopcard__buttons">
                <button className="chat" onClick={()=>{}}>Chat</button>
                <button className="buy" onClick={()=>{}}>Buy now</button>
            </div>
        </div>
    )
}

export default ShopCard
