import { useCallback, useState, useEffect, useRef } from 'react';
import ImageButton from '../../components/ImageButton/ImageButton';
import ProductImage from '../ProductImage/ProductImage';
import ShopCard from '../../components/ShopCard/ShopCard';
import Button from '../../components/Ui/Button/Button';
import Callon from '../../components/Ui/Callon/Callon';
import SelectOption from '../../components/Ui/SelectOption/SelectOption';
import Warranty from '../../components/Ui/Warranty/Warranty';
import './ProductDetails.css'
import {compareArrays} from '../../utils/compareArray';
import ProductSpecification from '../../components/Specification/ProductSpecification';
const productUrl = "https://api-dev.evaly.com.bd/go-catalog/api/v1/public/products/";
const shopUrl = "https://api-dev.evaly.com.bd/go-catalog/api/v1/public/shop-items/shops/";
const slug =  "bangladesh-cricket-jersey-from-evaly-6bad62271";
function ProductDetails() {
    const [productAttrs, setProductAttrs] = useState([]);
    const [productVariants, setProductVariants] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [currentSize, setCurrentSize] = useState('');
    const [currentColor, setCurrentColor] = useState('');
    const [variantId, setVariantId] = useState(null);
    const [currntImg, setCurrentImg] = useState('');
    const [shops, setShops] = useState([]);
    const shopRef = useRef(null);
    const fetchProDtl = useCallback(async ()=> {
        try{
            const response = await fetch(productUrl+slug);
            let resData = await response.json();
            setProductAttrs(resData.data.attributes);
            setProductVariants(resData.data.product_variants);
            resData.data.attributes.forEach(att => {
                if(att.attribute_name === 'color'){
                    setCurrentColor(att.attribute_data.values[0].key);
                }else if(att.attribute_name === 'size'){
                    setCurrentSize(att.attribute_data.values[0].key);
                }
            });
            
        }catch (error) {
            if(error) return alert(error);
        }
      }, []);
      useEffect(() => {
        fetchProDtl();
        return ()=>{
            fetchProDtl();
        }
      }, [fetchProDtl]);

      const updateCurrentProduct = useCallback((currentColor, currentSize)=>{
          let updatedVariants = productVariants.filter(variant => compareArrays(variant.attribute_values, [+currentColor, +currentSize]));
          setCurrentProduct(updatedVariants[0]);
          setVariantId(updatedVariants[0]?.variant_id);
          setCurrentImg(updatedVariants[0]?.product_images[0])
      }, [productVariants])

      useEffect(()=>{
        updateCurrentProduct(currentColor, currentSize);
      }, [currentColor, currentSize, updateCurrentProduct]);

      const fetchShop = useCallback(async ()=> {
        if(variantId){
        try{
            const response = await fetch(shopUrl+variantId);
            let resData = await response.json();
            setShops(resData.data);
            
        }catch (error) {
            if(error) return alert(error);
        }}
      }, [variantId]);
      useEffect(()=>{
            fetchShop();
      },[fetchShop])

      const gotoBottom=()=> {
        shopRef.current.scrollIntoView({behavior: "smooth",})
      }

    return (
        <div className="productDetails">
            <div className="productDetails__container">
                <div className="productDetails__left">
                    {currentProduct && <ProductImage imgUrl={currntImg}/>}
                    <div className="productDetails__imgButtons">
                        {currentProduct?.product_images.map((image)=> <ImageButton key={image} thumbSrc={image} chandeImage={()=>setCurrentImg(image)}/>) }
                    </div>
                </div>
                <div className="productDetails__middle">
                    <div className="productDetails__middleContainer">
                        <h2>{currentProduct?.product_name}</h2>
                        <div className="productDetails__codeBrand">
                            <p><span>SKU:</span><span>{currentProduct?.sku}</span></p>
                            <div className="productDetails__brand">
                                <div className="flex__box"><span>Brand:</span><p className="link"><span>{currentProduct?.brand_name}</span>|<span>{`More ${currentProduct?.category_name} from ${currentProduct?.brand_name}`}</span></p></div>
                            </div>
                        </div>
                        <div className="productDetails__price">
                            <h3>Tk {currentProduct?.min_price}</h3>
                            <span>Starting price</span>
                        </div>
                        <div className="productDetails__options">
                            {productAttrs.length > 0 ? (
                                <>
                                <SelectOption options={productAttrs[0]?.attribute_data.values} value={currentColor} changed={(e)=>setCurrentColor(e.target.value)} label={productAttrs[0]?.attribute_name}/>
                                <SelectOption options={productAttrs[1]?.attribute_data.values} value={currentSize} changed={(e)=>setCurrentSize(e.target.value)} label={productAttrs[1]?.attribute_name}/>
                                </>
                            ) : null}
                        </div>
                        <div className="productDetails__button">
                        <Button clicked={gotoBottom} label="Check Avaliable Shop"/>
                        </div>
                        <Callon proCode={`SKU: ${currentProduct?.sku}`} phoneNo="09638111666"/>
                    </div>
                </div>
                <div className="productDetails__right"><Warranty text="100% Authentic"/></div>
            </div>
        
            <ProductSpecification title={currentProduct?.product_name} description={currentProduct?.product_description} />

            <div className="productDetails__shops" ref={shopRef}>
                <h2>Available Shops</h2>
                <div className="poductDetails__shopBox">
                    { shops?.map((shop)=> <ShopCard key={shop.shop_item_id} inStock={shop.in_stock} shopImg={shop.shop_image} shopName={shop.shop_name} price={shop.price} disPrice={shop.discounted_price} />)}
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
