import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const UserProductDetail = () => {

   const {productId} = useParams()
    
    useEffect(() => {
        getProductDetail()

    }, [])
    
    const [productData, setproductData] = useState({})

    const getProductDetail = async()=>{

       await axios.get("/api/products/"+productId)
        .then((res)=>{
            console.log(res);
            setproductData(res.data.product)
        })
        .catch((err)=>{
            console.log(err);
        })

    }

  return (
    <div className='product-container'>
     
      <div className="main">
        <div className="left">
            <img src={productData.image} alt="" />
        </div>
        <div className="right">
            <h1>{productData.title}</h1>
            <p>{productData.description}</p>

            <div className="bottom">
                <button>Buy now</button>
                <button>Add to Cart</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default UserProductDetail