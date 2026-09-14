import { Camera, Play, ArrowRight } from "lucide-react";

function Footer() {
  return (
 <footer className="bg-[#ebe7df] px-6 py-10 text-black md:px-10">

    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          

          {/* ///Brand/// */}

          <div>
            <h2 className="text-2xl font-semibold tracking-wider">
               NEVORA
            </h2>

            <p className="mt-4 max-w-xs leading-5 text-gray-900">
            Advanced skincare solutions for every skin concern.
            Designed with care for healthy and naturally glowing skin.
            </p>

            <div className="mt-5 flex gap-4">
                <Camera size={17} />
               <Play size={17} />

            </div>

          </div>



          {/* Shop */}

         <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider">
           Shop
           </h4>

             <div className="mt-4 flex flex-col gap-2 text-xs text-gray-900">
                <span>All Products</span>
                <span>Best Sellers</span>
                <span>New Arrivals</span>
                <span>Value Sets</span>
                 <span>Gift Cards</span>
            </div>
        </div>


          <div>
             <h4 className="text-xs font-semibold uppercase tracking-wider">
                  Concerns
             </h4>

             <div className="mt-4 flex flex-col gap-2 text-xs text-gray-900">
            <span>Acne & Breakouts</span>
            <span>Dry & Irritated Skin</span>
            <span>Eczema & Dermatitis</span>
            <span>Pigmentation</span>
            <span>Fungal Infections</span>
             </div>
          </div>


          {/* ///help//// */}


          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider">
                Help
            </h4>

            <div className="mt-4 flex flex-col gap-2 text-xs text-gray-900">
             <span>FAQs</span>
            <span>Shipping & Delivery</span>
            <span>Returns & Refunds</span>
            <span>Track Your Order</span>
            <span>Contact Us</span>
            </div>

          </div>


           {/* Newsletter */}
           <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider">
                 Stay Connected
            </h4>

            <p className="mt-4 text-xs leading-5 text-gray-900">
            Subscribe for exclusive offers,
            skincare tips and more.
            </p>

            <div className="mt-4 flex">
              <input type="email"
              placeholder="Enter your email" 
              className="w-full px-3 py-3 text-xs text-gray-900 outline-none"/>

              <button className="flex items-center justify-center bg-white px-4 text-gray-900 "
              aria-label="Subscribe"
              >
                  <ArrowRight size={17} />
              </button>
            </div>
           </div>
    </div>



      {/* Bottom */}
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-gray-600 pt-5 text-xs text-gray-900 md:flex-row md:items-center md:justify-between">

        <p>
          © 2026 NEVORA. All Rights Reserved.
        </p>

        <div className="flex gap-5">
          <span>Privacy Policy</span>
          <span>|</span>
          <span>Terms & Conditions</span>
        </div>

      </div>


 </footer>
  )
}

export default Footer
