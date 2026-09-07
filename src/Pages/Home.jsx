// import { useEffect, useState } from 'react'
// import hero1 from '../assets/hero1.png'
// import hero2 from '../assets/hero2.png'
// import hero3 from '../assets/hero3.png'
// import hero4 from '../assets/hero4.png'

// function Home() {

//     const [currentImage , setCurrentImage] = useState(0);

//     const heroImage= [hero1 , hero2 , hero3 , hero4] ;

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentImage((prev) => (prev + 1) % heroImage.length);

//         },3000);
//         return () => clearInterval(interval)
//     },[]);


//   return (
//      <section className="relative min-h-screen w-full overflow-hidden">

//              {/* Hero Image */}

//              <img src={heroImage[currentImage]} alt="NEVORA skincare products"
//              className='absolute inset-0 h-full w-full object-cover transition-opacity duration-700' />


//              {/* Hero Content */}


//              <div className='relative z-10 mx-auto flex min-h-[600px] max-w-7xl items-center px-6 md:px-10'>

//             <div className='max-w-lg'>

//                 <p className='mb-4 text-sm font-medium uppercase tracking-[0.25em] text-gray-700 '>
//                      Naturally Pure
//                 </p>

//                 <h1 className='text-4xl font-semibold leading-tight text-gray-900 md:text-6xl'>
//                     Beautiful Skin.
//                     <br />
//                       Naturally.
//                 </h1>

//                 <p className='mt-5 max-w-md text-sm leading-6 text-gray-700 md:text-base'>
//                       Discover gentle and effective skincare made for
//                       healthy, fresh and naturally glowing skin.
//                 </p>

//                 <button className='mt-7 bg-gray-900 px-7 py-3 text-sm font-medium text-white transition hover:bg-gray-700'>
//                     Shop Now
//                 </button>

//                          </div>
//              </div>
             

//      </section>
//   )
// }

// export default Home





import { useEffect, useState } from "react";

import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import hero3 from "../assets/hero3.png";
import hero4 from "../assets/hero4.png";

import { Leaf, Droplets, Heart, Recycle } from "lucide-react";


function Home() {

  const [currentImage, setCurrentImage] = useState(0);

  const heroImage = [hero1, hero2, hero3, hero4];

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentImage(
        (prev) => (prev + 1) % heroImage.length
      );
    }, 17000);

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
       </>
  );
}

export default Home;