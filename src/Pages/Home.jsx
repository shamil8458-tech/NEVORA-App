
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";


import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import hero3 from "../assets/hero3.png";
import hero4 from "../assets/hero4.png";


import bestSeller from "../assets/categories/best-seller.png";
import cleanser from "../assets/categories/cleanser.png";
import serum from "../assets/categories/serum.png";
import moisturiser from "../assets/categories/moisturiser.png";
import sunscreen from "../assets/categories/sunscreen.png";
import skincareKit from "../assets/categories/skincare-kit.png";

import banner from '../assets/Banner/banner.png'

import { Leaf, Droplets, Heart, Recycle } from "lucide-react";
import { useNavigate } from "react-router-dom";


function Home() {

    const navigate = useNavigate();

  const [currentImage, setCurrentImage] = useState(0);

  const heroImage = [hero1, hero2, hero3, hero4];


  const {data : products , isLoading , isError} = useQuery({
    queryKey : ["products"],
    queryFn : getProducts,
  })

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentImage(
        (prev) => (prev + 1) % heroImage.length
      );
    }, 15000);

    return () => clearInterval(interval);

  }, []);

  return (

    <>
   
    <section className="relative h-screen w-full overflow-hidden">

      {/* Hero Image */}

      <img
        src={heroImage[currentImage]}
        alt="NEVORA skincare products"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Hero Content */}

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 md:px-10">

        <div className="max-w-lg">

          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-gray-700">
            Naturally Pure
          </p>

          <h1 className="text-4xl font-semibold leading-tight text-gray-900 md:text-6xl">
            Beautiful Skin.
            <br />
            Naturally.
          </h1>

          <p className="mt-5 max-w-md text-sm leading-6 text-gray-700 md:text-base">
            Discover gentle and effective skincare made for
            healthy, fresh and naturally glowing skin.
          </p>

          <button className="mt-7 bg-gray-900 px-7 py-3 text-sm font-medium text-white transition hover:bg-gray-700 rounded-[5px]">
            Shop Now
          </button>

        </div>

      </div>

    </section>


       <section className="w-full border-b border-gray-200 bg-[#ebe7df] px-6 py-10 md:px-10">

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">

          {/* Item 1 */}
          <div className="flex items-center justify-center gap-4">

            <Leaf size={32} strokeWidth={1.5} />

            <div>
              <h4 className="text-sm font-semibold text-gray-900">
                Natural Ingredients
              </h4>

              <p className="mt-1 text-xs text-gray-500">
                Pure and gentle care
              </p>
            </div>

          </div>


          {/* Item 2 */}
          <div className="flex items-center justify-center gap-4">

            <Droplets size={32} strokeWidth={1.5} />

            <div>
              <h4 className="text-sm font-semibold text-gray-900">
                Deep Hydration
              </h4>

              <p className="mt-1 text-xs text-gray-500">
                Long-lasting moisture
              </p>
            </div>

          </div>


          {/* Item 3 */}
          <div className="flex items-center justify-center gap-4">

            <Heart size={32} strokeWidth={1.5} />

            <div>
              <h4 className="text-sm font-semibold text-gray-900">
                Gentle Care
              </h4>

              <p className="mt-1 text-xs text-gray-500">
                Suitable for daily use
              </p>
            </div>

          </div>


          {/* Item 4 */}
          <div className="flex items-center justify-center gap-4">

            <Recycle size={32} strokeWidth={1.5} />

            <div>
              <h4 className="text-sm font-semibold text-gray-900">
                Sustainable Care
              </h4>

              <p className="mt-1 text-xs text-gray-500">
                Better for the planet
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* Shop By Category */}

      <section id="categories" className="bg-[#faf9f6] px-6 py-16 md:px-10">

        <div className="mx-auto max-w-7xl ">
          
          <h2 className="mb-10 text-center text-2xl font-semibold text-gray-900 md:text-3xl">Shop By Category</h2>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6 ">
               
               <div onClick={() => navigate(`/products?category=Cleansers`)}
                className="cursor-pointer text-center ">
                <img src={cleanser} alt="Cleansers" 
                className="h-40 w-full object-cover transition duration-300 hover:scale-105 md:h-48"
                />
                <h3 className="mt-4 text-sm font-medium text-gray-900"
                >CLEANSERS</h3>
               </div>


               <div onClick={() => navigate(`/products?category=Serums`)}
                className="cursor-pointer text-center">
                 <img src={serum} alt="serum" 
                 className="h-40 w-full object-cover transition duration-300 hover:scale-105 md:h-48"
                 />
                 <h3 className="mt-4 text-sm font-medium text-gray-900">SERUMS</h3>
               </div>


               <div onClick={() => navigate(`/products?category=Moisturisers`)}
                className="cursor-pointer text-center">
                <img src={moisturiser} alt="moisturiser" 
                className="h-40 w-full object-cover transition duration-300 hover:scale-105 md:h-48"
                />
                <h3 className="mt-4 text-sm font-medium text-gray-900">MOISTURIZERS</h3>
               </div>

               <div onClick={() => navigate(`products?category=Sunscreens`)}
                className="cursor-pointer text-center">
                <img src={sunscreen} alt="sunscreen"
                className="h-40 w-full object-cover transition duration-300 hover:scale-105 md:h-48"
                />
                <h3 className="mt-4 text-sm font-medium text-gray-900">SUN CARE</h3>
               </div>


               <div onClick={() => navigate(`products?category=Skin Care Kits`)}
                className="cursor-pointer text-center">
                <img src={skincareKit} alt="skincareKit"
                className="h-40 w-full object-cover transition duration-300 hover:scale-105 md:h-48"
                />
                <h3 className="mt-4 text-sm font-medium text-gray-900">SKIN CARE KITS</h3>
               </div>


               <div onClick={() => navigate(`products?category=Best Sellers`)}
                className="cursor-pointer text-center">
                <img src={bestSeller} alt="bestSeller" 
                className="h-40 w-full object-cover transition duration-300 hover:scale-105 md:h-48"
                />
                <h3 className="mt-4 text-sm font-medium text-gray-900">BEST SELLER</h3>
               </div>
          </div>
          </div>
      </section>


      {/* Offer Banner */}


      <section className="relative h-[350px] w-full overflow-hidden">

        <img src={banner} alt="NEVORA special offer"
        className="absolute inset-0 h-full w-full object-cover" />

        <div className="relative z-10 flex h-full items-center px-6 md:px-16">

            <div className="max-w-md">

                <p className="text-sm font-medium uppercase tracking-wider text-gray-700">
                 Special Offer
                </p>

                <h2 className="mt-2 text-3xl font-semibold text-gray-900 md:text-4xl">
                    Up to 25% Off
                </h2>

                <p className="mt-2 text-sm text-gray-700">
                    Discover our skincare essentials at special prices.
                </p>

                <button className="mt-5 bg-gray-900 px-6 py-3 text-sm font-medium text-white">
                 Explore Offers
                </button>

            </div>

        </div>

      </section>




      {/* ////offer Banner/// */}


      <section className="px-6 py-16 md:px-10">

        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex items-center justify-between">
                 <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">
                  New Arrivals
                 </h2>

                 <button onClick={() => navigate("/products")}
                  className="text-sm font-medium text-gray-700 underline">
                     View All
                 </button>
          </div>

          {isLoading && (
            <p>Loading products...</p>
          )}

          {isError && (
            <p>Failed to load products</p>
          )}

          {products && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {products.slice(4,8).map((item) => (
                <ProductCard key={item.id}
                product={item}/>
              ))}

            </div>
          )}

        </div>

      </section>
       </>
  );
}

export default Home;