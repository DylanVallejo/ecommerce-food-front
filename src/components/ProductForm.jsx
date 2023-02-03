import axios from 'axios';
import React, { useState } from 'react'

function ProductForm() {
  
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [heigth, setHeigth] = useState(0);
  const [weigth, setWeigth] = useState(0);
  const [bestSelling, setBestSelling] = useState(0);
  const [itsInOffers, setItsInOffers] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState(null);
  const [image, setImage] = useState(null);
  
  
  const createProduct = ( e ) => {
    
    e.preventDefault();
    
    
    const newProduct = {
      "productName":productName,
      "description":description,
      "price": price,
      "height": heigth,
      "width":weigth,
      "bestSelling":0,
      "itsInOffers":itsInOffers,
      "discount":discount,
      "image":image,
      "stock":stock,
      "category":{
        "id":1
      }
    }
    
    axios.post('http://localhost:8082/api/product', newProduct )
    .then(res=>{
      console.log(newProduct)
      console.log(res)
    })
    .catch(error=>{
      console.log(error)
      alert(error)
    })
  }

  
  function handleFile(e) {
    const element = e.target;
    const file = element.files[0];
    
    console.log(file);
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = function () {
        setImage(reader.result.toString())
        console.log(reader.result.toString());
    }
    

  }
  
  return (
    
    <form  onSubmit={createProduct}>
      <section>
        <label for='productName'>Product name</label>
        <input type="text" name="productName" value={productName} onChange={e=> setProductName(e.target.value)}/>
      </section>
      
      <section>   
        <label for='productDescription'>Description</label>
        <input type="text" name="productDescription" value={description} onChange={e=> setDescription(e.target.value)}/>
      </section>
      
      <section> 
        <label for='productPrice'>Price</label>
        <input type="number" name="productPrice" value={price} onChange={e=> setPrice(e.target.value)}/>
      </section>
      
      <section>
        <label for='productHeigth'>Heigth</label>
        <input type="number" name="productHeigth" value={heigth} onChange={e=> setHeigth(e.target.value)} />
      </section>
      
      <section>
        <label for='productWeigth'>Weigth</label>
        <input type="number" name="productWeigth" value={weigth} onChange={e=> setWeigth(e.target.value)} />
      </section>
      <section >
        <div>Image</div>
        <input  type='file' name='image' onChange={handleFile} />
        <div>{!!image ? <img src={image} width='200' alt='preview' /> : ''}</div>
      </section>
      
      
      {/* bestselling 
        <section>
          <label for='bestSelling'>Best Selling</label>
          <input type="number" name="bestSelling" />
        </section>
      */}
      
      <section>
        <label for='productOffer'>Set item on offer</label>
        <input type="select" name="productOffer" value={itsInOffers} onChange={e=> setItsInOffers(e.target.value)}/>
      </section>
      
      {/* discount 
        <section>
          <label for='discount'>Discount</label>
          <input type="number" name="discount" />
        </section>
      */}
          
      <section>
        <label for='productStock'>Set the product stock: </label>
        <input type="number" name="productStock" value={discount} onChange={e=> setDiscount(e.target.value)} />
      </section>
      
      {/* podriamos creaer un select para cada categoria*/}
      <section>
        <label for='productStock'>Set the product category: </label>
        <input type="number" name="productStock" value={stock} onChange={e=> setStock(e.target.value)} />
      </section>
      
      <button type='submit'>Create</button>
    </form>
  )
}

export default ProductForm