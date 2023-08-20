import ProductCard from "../Components/ProductCard/ProductCard";

export const ProductsUtility = (category, allProducts, width) => {
  return (
    <div className="row d-flex">
      <h3 className="text-start my-3  fw-semibold text-capitalize">
        {category} Products
      </h3>
      {allProducts
        .filter((allProduct) => allProduct.category.includes(category))
        .map((Products) => {
          return (
            <div
              className="col-md-3 col-6  d-flex  justify-content-center"
              key={Products.id}
            >
              {width <= 576 ? (
                <ProductCard
                  id={Products.id}
                  width={width}
                  title={Products.title.substring(0, 40)}
                  description={Products.description.substring(0, 70)}
                  image={Products.image}
                  price={Products.price}
                  category={Products.category}
                />
              ) : (
                <ProductCard
                  id={Products.id}
                  width={width}
                  title={Products.title.substring(0, 50)}
                  description={Products.description.substring(0, 110)}
                  image={Products.image}
                  price={Products.price}
                  category={Products.category}
                />
              )}
            </div>
          );
        })}
    </div>
  );
};
