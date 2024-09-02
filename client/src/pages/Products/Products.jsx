import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { NavLink } from "react-router-dom";
import tomatoes from "../../assets/images/tomatoes.jpg";
import ItemCard from "../../components/ItemCard/ItemCard";
import { useRef } from "react";
import { SEARCH_BOX, serachReducer } from "../../reducers/searchReducer";
import { SearchContext } from "../../context/SearchContext";
import { getAllProducts } from "../../services/Apis";

const Products = () => {
  const [mainArr, setMainArr] = useState([]);
  const [prodCat, setProdCat] = useState({ products: "All", unit: "All" });
  const [prodArrays, setProdArrays] = useState({
    filtArr: [],
    filtUnitArr: [],
  });
  const [searchedArr, setSearchedArr] = useState([]);

  const fetchProducts = async () => {
    const res = await getAllProducts();
    console.log(res);
    setMainArr(res.data);
    setSearchedArr(res.data); // Initialize searchedArr with the full product list
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredByCategory =
      prodCat.products !== "All"
        ? searchedArr.filter((item) => item.category === prodCat.products)
        : searchedArr;

    setProdArrays((prev) => ({
      ...prev,
      filtArr: filteredByCategory,
      filtUnitArr: filteredByCategory,
    }));
  }, [prodCat.products, searchedArr]);

  useEffect(() => {
    if (prodCat.unit !== "All") {
      setProdArrays((prev) => ({
        ...prev,
        filtUnitArr: prev.filtArr.filter((item) => item.unit === prodCat.unit),
      }));
    } else {
      setProdArrays((prev) => ({
        ...prev,
        filtUnitArr: prev.filtArr,
      }));
    }
  }, [prodCat.unit, prodArrays.filtArr]);

  const { state } = useContext(SearchContext);

  useEffect(() => {
    const searchText = state.searchText.toLowerCase();
    const filteredProducts = mainArr.filter((item) =>
      item.title.toLowerCase().includes(searchText)
    );
    setSearchedArr(filteredProducts); // Update searchedArr based on the search text
  }, [state.searchText, mainArr]); // Include mainArr as a dependency

  return (
    <div className="px-[5vw]">
      <div className="py-5 space-y-2">
        <span className="text-[20px]">
          {" "}
          <NavLink>Products</NavLink> |{" "}
          <NavLink className="font-bold">{prodCat.products}</NavLink>{" "}
        </span>
        <h3 className="text-[40px] font-bold text-green-500">
          Products{" "}
          <span className="text-[20px] font-normal">in your area..</span>
        </h3>
        <hr className="bg-yellow-600/40 h-1 rounded-md" />
      </div>
      <div className="flex my-5">
        <section className="border basis-[20%] px-4 py-6 space-y-3">
          <div className="space-y-2">
            <h3 className="font-semibold text-[18px] ">Products</h3>
            <div className="space-x-3">
              <input
                type="radio"
                value="All"
                name="products"
                onChange={(e) =>
                  setProdCat((prev) => ({ ...prev, products: "All" }))
                }
                defaultChecked
                className="border-2 cursor-pointer"
              />
              <span>All</span>
            </div>
            <div className="space-x-3">
              <input
                type="radio"
                value="Vegetables"
                name="products"
                onChange={(e) =>
                  setProdCat((prev) => ({ ...prev, products: "Vegetables" }))
                }
                className="border-2 cursor-pointer"
              />
              <span>Vegetables</span>
            </div>
            <div className="space-x-3">
              <input
                type="radio"
                value="Dairy"
                name="products"
                onChange={(e) =>
                  setProdCat((prev) => ({ ...prev, products: "Dairy" }))
                }
                className=""
              />
              <span>Dairy</span>
            </div>
            <div className="space-x-3">
              <input
                type="radio"
                value="Meat"
                name="products"
                onChange={(e) =>
                  setProdCat((prev) => ({ ...prev, products: "Meat" }))
                }
                className=""
              />
              <span>Meat</span>
            </div>
            <div className="space-x-3">
              <input
                type="radio"
                value="Poultry"
                name="products"
                onChange={(e) =>
                  setProdCat((prev) => ({ ...prev, products: "Poultry" }))
                }
                className=""
              />
              <span>Poultry</span>
            </div>
          </div>
          <div className="space-y-2 ">
            <h3 className="font-semibold text-[18px]">Unit</h3>
            <div className="space-x-3">
              <input
                type="radio"
                name="unit"
                onChange={(e) =>
                  setProdCat((prev) => ({ ...prev, unit: "All" }))
                }
                className=""
                defaultChecked
              />
              <span>All</span>
            </div>
            <div className="space-x-3">
              <input
                type="radio"
                name="unit"
                onChange={(e) =>
                  setProdCat((prev) => ({ ...prev, unit: "250gm" }))
                }
                className=""
              />
              <span>250gm</span>
            </div>
            <div className="space-x-3">
              <input
                type="radio"
                name="unit"
                className=""
                onChange={(e) =>
                  setProdCat((prev) => ({ ...prev, unit: "500gm" }))
                }
              />
              <span>500gm</span>
            </div>
            <div className="space-x-3">
              <input
                type="radio"
                name="unit"
                onChange={(e) =>
                  setProdCat((prev) => ({ ...prev, unit: "1ltr" }))
                }
                className=""
              />
              <span>1ltr</span>
            </div>
            <div className="space-x-3">
              <input
                type="radio"
                name="unit"
                onChange={(e) =>
                  setProdCat((prev) => ({ ...prev, unit: "1kg" }))
                }
                className=""
              />
              <span>1kg</span>
            </div>
            <div className="space-x-3">
              <input
                type="radio"
                name="unit"
                onChange={(e) =>
                  setProdCat((prev) => ({ ...prev, unit: "2kg" }))
                }
                className=""
              />
              <span>2kg</span>
            </div>
          </div>
        </section>
        <section className="border basis-[80%] grid py-1 grid-cols-3 ">
          {prodArrays.filtUnitArr &&
            prodArrays.filtUnitArr.map((item) => (
              <ItemCard
                id={item.id}
                img={item.img}
                price={item.price}
                unit={item.unit}
                title={item.title}
                key={item.id}
                qty={item.qty}
                farmerId={item.farmerId}
                category={item.category}
                farmerInfo={item.farmerInfo}
                farmerRatings={item.farmerRatings}
              />
            ))}
        </section>
      </div>
    </div>
  );
};

export default Products;
