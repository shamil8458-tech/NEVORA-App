

// function ProductTable({ products , onEdit , onDelete}) {
//   return (
//     <table>

//         <thead>
//             <tr>
//           <th>Name</th>
//           <th>Brand</th>
//           <th>Category</th>
//           <th>Price</th>
//           <th>Stock</th>
//           <th>Action</th>

//             </tr>
//         </thead>

//         <tbody>
//             {products.map((item) => (
//                 <tr key={item.id}>
//                     <td>{item.name}</td>
//                     <td>{item.brand}</td>
//                     <td>{item.category}</td>
//                     <td>{item.price}</td>
//                     <td>{item.stock}</td>

//                     <td>
//                         <button
//                         type="button"
//                         onClick={() =>  onEdit(item)}>
//                              Edit
//                         </button>

//                         <button
//                         type="button"
//                         onClick={() => onDelete(item.id)}>
//                                    Delete
//                         </button>
//                     </td>
//                 </tr>
//             ))}
//         </tbody>


//     </table>
//   )
// }

// export default ProductTable
















































function ProductTable({
  products,
  onEdit,
  onDelete,
}) {

  return (

    <div className="overflow-x-auto">


      <table className="w-full min-w-[800px] text-left">


        {/* ================= TABLE HEADER ================= */}

        <thead>

          <tr className="border-b border-stone-200 bg-stone-50/70">

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
              Product
            </th>

            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
              Brand
            </th>

            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
              Category
            </th>

            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
              Price
            </th>

            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
              Stock
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
              Action
            </th>

          </tr>

        </thead>



        {/* ================= TABLE BODY ================= */}

        <tbody>

          {products.map((item) => (

            <tr
              key={item.id}
              className="border-b border-stone-100 transition duration-200 hover:bg-stone-50/70"
            >


              {/* Product */}

              <td className="px-6 py-4">

                <div className="flex items-center gap-3">


                  {/* Image */}

                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-stone-100 bg-stone-100">

                    {item.image ? (

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />

                    ) : (

                      <div className="flex h-full w-full items-center justify-center text-xs text-stone-400">
                        N/A
                      </div>

                    )}

                  </div>


                  {/* Name */}

                  <div>

                    <p className="text-sm font-medium text-stone-900">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-stone-400">
                      Product ID: {item.id}
                    </p>

                  </div>

                </div>

              </td>



              {/* Brand */}

              <td className="px-4 py-4 text-sm text-stone-600">
                {item.brand}
              </td>



              {/* Category */}

              <td className="px-4 py-4">

                <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  {item.category}
                </span>

              </td>



              {/* Price */}

              <td className="px-4 py-4">

                <span className="text-sm font-semibold text-stone-800">
                  ₹{item.price}
                </span>

              </td>



              {/* Stock */}

              <td className="px-4 py-4">

                {Number(item.stock) > 0 ? (

                  <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                    {item.stock} in stock
                  </span>

                ) : (

                  <span className="inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                    Out of stock
                  </span>

                )}

              </td>



              {/* Actions */}

              <td className="px-6 py-4">

                <div className="flex items-center gap-2">


                  {/* Edit */}

                  <button
                    type="button"
                    onClick={() => onEdit(item)}
                    className="rounded-lg border border-stone-200 px-3 py-2 text-xs font-medium text-stone-600 transition duration-200 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    Edit
                  </button>



                  {/* Delete */}

                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    className="rounded-lg border border-red-100 px-3 py-2 text-xs font-medium text-red-500 transition duration-200 hover:bg-red-50 hover:text-red-600"
                  >
                    Delete
                  </button>

                </div>

              </td>


            </tr>

          ))}

        </tbody>

      </table>



      {/* ================= EMPTY STATE ================= */}

      {products.length === 0 && (

        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-stone-100">

            <span className="text-xl text-stone-400">
              +
            </span>

          </div>

          <p className="text-sm font-medium text-stone-700">
            No products found
          </p>

          <p className="mt-1 text-xs text-stone-400">
            Add your first skincare product to get started.
          </p>

        </div>

      )}

    </div>

  );

}

export default ProductTable;