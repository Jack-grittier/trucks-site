import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductDetailComponent from "../../../components/ProductDetailComponent";
import router from "next/router";
import { useRouter } from "next/router";

const domain = process.env.NEXT_PUBLIC_API_DOMAIN_NAME;

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [variations, setVariations] = useState(null);
  const [arr, setArr] = useState(null);

  // NOTE Init
  useEffect(async () => {
    // LINK product variation details

    var product_id = null;
    if (id != undefined && id != null) {
      window.localStorage.setItem("product_id", id);
      product_id = id;
    } else {
      product_id = window.localStorage.getItem("product_id");
    }

    await getProduct(product_id, setProduct);

    await getVariations(setVariations);

    // LINK Array for amount of product this is a fix for bug
    var temp_arr = Array(100).fill(1);
    setArr(temp_arr);
  }, []);

  // NOTE Components
  return product == undefined || product == null ? (
    <div></div>
  ) : (
    <div className={styles.container}>
      <Head>
        <title lang="en-us">Truck Signs Adhesive Vinyl Product</title>
        <meta
          name="description"
          content="In here the adhesive vinal can be customized."
        />
         <meta
          property="og:title"
          content="Truck Signs Adhesive Vinyl Product"
        />
        <meta
          property="og:description"
          content="In here the adhesive vinal can be customized."
        />
        <meta
          property="og:url"
          content={`https://truck-signs-frontend-nextjs.vercel.app/product/${product.id}/`}
        />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />

        <link
          rel="canonical"
          href={`https://truck-signs-frontend-nextjs.vercel.app/product/${product.id}/`}
        />
      </Head>

      <main className={styles.main}>
        <ProductDetailComponent product={product} variations={variations} />
      </main>
    </div>
  );
}

// NOTE Helpers

const getProduct = async (id, setProduct) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const product_url = domain + `truck-signs/product-detail/${id}/`;
  axios
    .get(product_url, config)
    .then(async (res) => {
      const product = await res.data;
      setProduct(product);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getVariations = async (setVariations) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const variations_url = domain + `truck-signs/lettering-item-categories/`;
  axios
    .get(variations_url, config)
    .then(async (res) => {
      const product = await res.data;
      setVariations(product);
    })
    .catch((error) => {
      console.log(error);
    });
};
