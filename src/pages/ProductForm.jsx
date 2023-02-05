import axios from "axios";
import React, { useState } from "react";
import styles from "../styles/ProductForm.module.css";
import cloudLogo from "../resources/cloud-plus.svg";
import cancel from "../resources/cancel.svg";

function ProductForm() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [heigth, setHeigth] = useState(0);
  const [weigth, setWeigth] = useState(0);
  // const [bestSelling, setBestSelling] = useState(0);
  const [itsInOffers, setItsInOffers] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [stock, setStock] = useState(0);
  // const [categoryId, setCategoryId] = useState(null);
  const [image, setImage] = useState(null);

  const createProduct = (e) => {
    e.preventDefault();

    const newProduct = {
      productName: productName,
      description: description,
      price: price,
      height: heigth,
      width: weigth,
      bestSelling: 0,
      itsInOffers: itsInOffers,
      discount: discount,
      image: image,
      stock: stock,
      category: {
        id: 1,
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
  console.log(styles);

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1>Add a new product</h1>
        <form onSubmit={createProduct}>
          <div className={styles.form}>
            {/* General information */}
            <div>
              <section className={styles.section}>
                <label for="productName">Product name</label>
                <input
                  type="text"
                  name="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </section>
              <section className={styles.section}>
                <label htmlFor="productDescription">Description</label>
                <textarea
                  type="text"
                  name="productDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                />
              </section>
              <section className={styles.section}>
                <label htmlFor="productStock">Set the product category: </label>
                <input
                  id="category"
                  type="number"
                  name="productStock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className={styles.category}
                />
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
                />
              </section>

              <section className={styles.section}>
                <label htmlFor="productWeigth">Weigth</label>
                <input
                  id="weigth"
                  type="number"
                  name="productWeigth"
                  value={weigth}
                  onChange={(e) => setWeigth(e.target.value)}
                  className={styles.weight}
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
                <input type="file" id="image" onChange={handleFile} />
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
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className={styles.stock}
                />
              </section>

              {/* podriamos creaer un select para cada categoria*/}
            </div>
          </div>

          <button type="submit" className={styles.btn}>
            Create
          </button>
        </form>
      </div>
    </main>
  );
}

export default ProductForm;
