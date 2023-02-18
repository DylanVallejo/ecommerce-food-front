import axios from "axios";
import React, { useState,useEffect } from "react";
import styles from "../styles/ProductForm.module.scss";
import cloudLogo from "../resources/cloud-plus.svg";
import cancel from "../resources/cancel.svg";
import Swal from 'sweetalert2'


function ProductForm() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(0);
  const [heigth, setHeigth] = useState(0);
  const [weigth, setWeigth] = useState(0);
  
  
  const [categoryName, setCategoryName] = useState("")
  const [categoryDescription, setCategoryDescription] = useState("")
  
  // const [width, setWidth] = useState(0);
  // const [bestSelling, setBestSelling] = useState(0);
  const [itsInOffers, setItsInOffers] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [stock, setStock] = useState(0);
  
  
  //haciendo fetch de las categorias existentes y seteando el estado 
  const [categorys, setCategorys] = useState(null)
  //manejando el valor de la categoria con el select
  const [selectedValue, setSelectedValue] = useState(0)
  
  const [cambio, setCambio] = useState(0)
  
  const categoryUrl = `http://localhost:8082/api/category`
  
  
  
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  
  useEffect(() => {
    axios.get(categoryUrl)
    .then(res => {
      setCategorys(res.data)      
    })
    .catch(error=>console.log(error))

  }, [cambio])
  

  const createProduct = (e) => {
    e.preventDefault();

    const newProduct = {
      "productName": productName,
      "description": description,
      "image": image,
      "price": price,
      "height": heigth,
      "width": weigth,
      "bestSelling": 0,
      "itsInOffers": itsInOffers,
      "discount": discount,
      "stock": stock,
      "category": {
        "id": selectedValue,
      },
    };

    axios
      .post("http://localhost:8082/api/product", newProduct)
      .then((res) => {
        console.log(newProduct);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  function handleFile(e) {
    const element = e.target;
    const file = element.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result.toString());
    };
  }
  
  const handleChangeCategory = (event) => {
    console.log(event.target.value)
    setSelectedValue(event.target.value);
  };
  
  const createCategory = (event) =>{
    event.preventDefault();
    
    axios.post(categoryUrl,{
      "name" : categoryName,
      "description": categoryDescription
    }).then (res=>{
      console.log(res)
      setCambio(cambio+1)
      Toast.fire({
        icon: 'success',
        title: 'Cateogria creada'
      })
    })
    .catch(error=>{
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error!!!',
      })
    })
    
  }


  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1>Add a new product</h1>
        <form onSubmit={createProduct}>
          <div className={styles.form}>
            <div>
              <section className={styles.section}>
                <label for="productName">Product name</label>
                <input
                  type="text"
                  name="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </section>
              <section className={styles.section}>
                <label htmlFor="productDescription">Description</label>
                <textarea
                  type="text"
                  name="productDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </section>
              <section className={styles.section}>
                <label htmlFor="productPrice">Price</label>
                <input
                  type="number"
                  id="price"
                  name="productPrice"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={styles.price}
                  required
                />
              </section>

              {/* <section className={styles.section}>
                <label htmlFor="productCategory">Set the product category: </label>
                <input
                  id="category"
                  type="number"
                  name="productCategory"
                  value={stock}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className={styles.category}
                  required
                />
              </section> */}
              
              <section className={styles.section}>
                <label htmlFor="productCategorys">Set the product category: </label>
                  <select value={selectedValue} onChange={handleChangeCategory} className='headerListSelectors' required>
                    {categorys?.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select> 
              </section>
            </div>

            <div>
              <section className={styles.section}>
                <label htmlFor="productHeigth">Heigth</label>
                <input
                  id="heigth"
                  type="number"
                  name="productHeigth"
                  value={heigth}
                  onChange={(e) => setHeigth(e.target.value)}
                  className={styles.height}
                  required
                />
              </section>

              <section className={styles.section}>
                <label htmlFor="productWeigth">Width</label>
                <input
                  id="weigth"
                  type="number"
                  name="productWeigth"
                  value={weigth}
                  onChange={(e) => setWeigth(e.target.value)}
                  className={styles.weight}
                  required
                />
              </section>
              <section className={styles.addFile}>
                <label htmlFor="image">
                  <div>
                    <img src={cloudLogo} alt="Cloud icon" />
                    <p>Add an image</p>
                  </div>
                  {!!image ? (
                    <button type="button" onClick={() => setImage(null)}>
                      <img src={cancel} alt="cancel icon" />
                    </button>
                  ) : (
                    ""
                  )}
                </label>
                <input type="file" id="image" onChange={handleFile} required/>
                <div className="my-3">
                  {!!image ? <img src={image} width="200" alt="preview" /> : ""}
                </div>
              </section>
              {/* bestselling 
                <section>
                  <label for='bestSelling'>Best Selling</label>
                  <input type="number" name="bestSelling" />
                </section>
              */}

              <section className={styles.offerSection}>
                <input
                  type="checkbox"
                  id="productOffer"
                  value={itsInOffers}
                  onChange={() => setItsInOffers((prev) => !prev)}
                  
                />
                <label htmlFor="productOffer">Set item on offer</label>
              </section>

              {/* discount 
                <section>
                  <label for='discount'>Discount</label>
                  <input type="number" name="discount" />
                </section>
              */}

              <section className={styles.section}>
                <label htmlFor="productStock">
                  How many products add to stock?{" "}
                </label>
                <input
                  id="stock"
                  type="number"
                  name="productStock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className={styles.stock}
                  required
                />
              </section>
            </div>
          </div>
          <button type="submit" className={styles.btn}>
            Create Product
          </button>
        </form>
        <div className="addcategory">
          <section className={styles.section}>
            <label htmlFor="categoryName">
              Set the category Name
            </label>
            <input
              id="categoryName"
              type="text"
              name="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className={styles.stock}
            />
          </section>
          <section className={styles.section}>
            <label htmlFor="categoryDescription">
              Set the category Description
            </label>
            <input
              id="categoryDescription"
              type="text"
              name="categoryDescription"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              className={styles.stock}
            />
          </section>
          <button onClick={createCategory} className={styles.btn}>
            Add Category
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductForm;
