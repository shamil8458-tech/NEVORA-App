

function ProductTable({ products , onEdit , onDelete}) {
  return (
    <table>

        <thead>
            <tr>
          <th>Name</th>
          <th>Brand</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Action</th>

            </tr>
        </thead>

        <tbody>
            {products.map((item) => (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.brand}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>{item.stock}</td>

                    <td>
                        <button
                        type="button"
                        onClick={() =>  onEdit(item)}>
                             Edit
                        </button>

                        <button
                        type="button"
                        onClick={() => onDelete(item.id)}>
                                   Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>


    </table>
  )
}

export default ProductTable
