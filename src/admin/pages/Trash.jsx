import toast from "react-hot-toast";
import {  useQuery,  useMutation,  useQueryClient} from "@tanstack/react-query";

import {  getTrashProducts,  restoreProduct,  permanentlyDeleteProduct} from "../services/adminProductService";


function Trash() {

  const queryClient = useQueryClient();


  // Get deleted products
  const {
    data: trashProducts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trashProducts"],
    queryFn: getTrashProducts,
  });


  // Restore product
  const {
    mutate: restoreMutate,
  } = useMutation({

    mutationFn: restoreProduct,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["trashProducts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["adminProducts"],
      });

      toast.success("Product restored successfully");
    },

    onError: () => {
      toast.error("Failed to restore product");
    },

  });


  // Permanently delete product
  const {
    mutate: permanentlyDeleteMutate,
  } = useMutation({

    mutationFn: permanentlyDeleteProduct,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["trashProducts"],
      });

      toast.success("Product permanently deleted");
    },

    onError: () => {
      toast.error("Failed to delete product");
    },

  });


  // Loading
  if (isLoading) {

    return (
      <div className="flex min-h-[400px] items-center justify-center">

        <div className="text-center">

          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-stone-200 border-t-emerald-700" />

          <p className="text-sm text-stone-500">
            Loading trash...
          </p>

        </div>

      </div>
    );

  }


  // Error
  if (isError) {

    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6">

        <p className="text-sm font-medium text-red-600">
          Failed to load trash
        </p>

        <p className="mt-1 text-xs text-red-500">
          Please try again later.
        </p>

      </div>
    );

  }


  return (

    <div className="space-y-8">


      {/* ================= PAGE HEADER ================= */}

      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Store Management
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
            Trash
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-stone-500">
            Manage products that have been moved to trash.
          </p>

        </div>


        {/* Product Count */}

        <div className="w-fit rounded-full bg-stone-100 px-4 py-2">

          <span className="text-sm font-medium text-stone-600">
            {trashProducts.length} Deleted Products
          </span>

        </div>

      </div>



      {/* ================= TRASH CARD ================= */}

      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">


        {/* Card Header */}

        <div className="border-b border-stone-100 px-6 py-5">

          <h2 className="text-lg font-semibold text-stone-900">
            Deleted Products
          </h2>

          <p className="mt-1 text-sm text-stone-500">
            Restore a product or permanently remove it from the database.
          </p>

        </div>



        {/* ================= EMPTY STATE ================= */}

        {trashProducts.length === 0 ? (

          <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">

            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-stone-100">

              <span className="text-2xl">
                🗑
              </span>

            </div>

            <h3 className="text-base font-semibold text-stone-900">
              Trash is empty
            </h3>

            <p className="mt-1 text-sm text-stone-500">
              Deleted products will appear here.
            </p>

          </div>

        ) : (

          /* ================= PRODUCT LIST ================= */

          <div className="divide-y divide-stone-100">

            {trashProducts.map((product) => (

              <div
                key={product.id}
                className="flex flex-col gap-5 px-6 py-5 transition hover:bg-stone-50 sm:flex-row sm:items-center sm:justify-between"
              >


                {/* Product Information */}

                <div className="flex min-w-0 items-center gap-4">


                  {/* Product Image */}

                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-stone-50">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />

                  </div>



                  {/* Product Details */}

                  <div className="min-w-0">

                    <h3 className="truncate text-sm font-semibold text-stone-900">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-sm text-stone-500">
                      ₹{product.price}
                    </p>

                    <span className="mt-2 inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-500">
                      Deleted
                    </span>

                  </div>

                </div>



                {/* Actions */}

                <div className="flex items-center gap-2 sm:shrink-0">


                  {/* Restore */}

                  <button
                    type="button"
                    onClick={() => restoreMutate(product.id)}
                    className="rounded-lg border border-emerald-100 px-4 py-2.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-50"
                  >
                    Restore
                  </button>



                  {/* Permanent Delete */}

                  <button
                    type="button"
                    onClick={() => permanentlyDeleteMutate(product.id)}
                    className="rounded-lg border border-red-100 px-4 py-2.5 text-xs font-medium text-red-500 transition hover:bg-red-50"
                  >
                    Delete Permanently
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}


export default Trash;