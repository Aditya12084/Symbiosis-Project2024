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

const prodArray = [
  {
    id: 1,
    title: "Tomatoes",
    farmerRatings: 4.5,
    price: 40,
    unit: "1kg",
    img: tomatoes,
    qty: 1,
    category: "Vegetables",
  },
  // {
  //   id: 2,
  //   title: "Fresh chicken",
  //   farmerRatings: 4.5,
  //   price: 50,
  //   unit: "1kg",
  //   img:
  //     "data:image/jpeg;base64,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",
  //   qty: 1,
  //   category: "Meat",
  // },
  {
    id: 2,
    title: "Potatoes",
    farmerRatings: 4.5,
    price: 50,
    unit: "500gm",
    img:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTEhMWFhUXFxgYFhcVGRoVFxgaGhcYFxgXFxgYHSgjGB0lGxUVIjEhJSkrLi4wFx8zODMtNygtLisBCgoKDg0OGxAQGy0mICUrLS0tLy0tLS01Ly0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLi0tLS0tLS0tLS0tLS0tNf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUCAwYBB//EADoQAAIBAgMFBgQEBgIDAQAAAAABAgMRBCExBRJBUWEGInGBkaEyscHwE1LR4RRCYnKC8TOSU6LiFv/EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAmEQADAAEFAAICAgMBAAAAAAAAAQIRAwQSITETQSJRMmEzQoEF/9oADAMBAAIRAxEAPwD7iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAacTio01eT8FxfgiG0llhLJuBUT2m5fDl7v9CLKb1bb8TkveRPnZvOhT9OgTPTnY1c8nn0JNLGTjrK/RlY30P0mtvS8LkEKntGP8yt7olwkmrp3XQ641Jv+LMalz6ZAAuVAAAAAAAAAAAAAAAAAAABW7T2mqfdjZz+XiUu5hcqJmXTwixlJLXIrsVtmnHJd6XJaevk9ORQvEym++3e/H1y8vqSI07voefe/z/BHVO3x/I21NpzqNpT3Fw3dfVr5GdOrLPvydur+gjh7O5u/C8jnetqU+2X4wjFVpL+Z+rN2G2lZ2m7p8eK8ehGqU+UnZefX6kCvG+iydndeJC3GpDzkn45pHR7Sx8aNN1JZpaJayb0S8TkI42dSW9Uebza4JcEjHajbhbefdztw5X8Ssw730ld68yu63nPCRfQ0FPZ0uHnexIbbemXzNOGiml09DdvX0MUui7MoLNq3nzPZUuR7CVuBshItxRm2zVJHlLGOm09Yt95fVdRVqXb9iHXlKzcmrLgTNOHmWTx5LDOrhJNJrR6HpT9mMRv0mm77rsvB5r6lwe9p3zlV+zz7njTQABcqAAAAAAAeHoAAAAAABU7d2p+Et2Hxy0/pXN/QoMJRcs5O7Zp2rXbxNS/CVkuiVvvxJeDkrWfTXpmvkeFutR6mph+I9DSjhJJq2gnlp0ubqE7oSs195mLqLRXVlf1M8YZb02pPevfKzurceDv96mSSbTeunH5EL+Kz6fMweJV27+T0XgR8iHBsmYjNro/fMiYutup24fb9iJVxm7/Nflcp9p7V3eFzG9ZI1jTZNxU014/XL6nO4TGOMnHk2vTInrFqUbp3vnrkfPV2lj/ETvo5ys+HxOxgtKtXPH6OiVj0+s4HHNwu8nbNakrZ0273nm7aZJW5cjldi4xVFr1y+R0OGhLgn0yEXWUUqUi6jVtle5jVqFZOU46p+lyBW2lbJvNeRpWtj0otPPhaYzG7kW27vTLIg7X2hvUrLWVln1yKvFY8g18a31fyKTr5eC/xo6bsVtVU1LfWVSbkuaSslfysd3GSautD5hhbpK1vO50GxNqzpPdm7w5cudj1tpvkvwrw49xt2/yXp2AMac1JJp3T0Mj2DzwAAAAAAAAAAVW1Nrfh92FnLrpH9X0KXahZZMy6eEWkpJZt28TSsXT/ADx9UcjiMfOcrNt82/otERa1Zx52XE5K3qXiOhbZ/Zv7RwUa7at3kpJ8+D90QaeMz3bp8/DgQMbiE9ZKPK5UVNtwi3fKSyus/tHla1crb/Z26cYWDsMPjO6rs2PaCOOw21oO7jK93ez0j4dDKW1lnmznq2ujT4zpJ4j0vchYjEcG8syintTl5lfi9qO+Rl3XhopLzE4xN87exExVVTjZv6FBVx+6rt+NtF1bNOGq1MQ1Gle3Gb08vzF1o0+34X6Q7R7X/h4ShSl36iskuF73lb5FD2d7GYvE1IXhKlTecqk1ay6RebfI+m9n+zFOD3mt6pxnLOXr9Do8C105I69HcrSnjC/6zn1E285M9g7FpYaCjTV7LOU+9N9W9F4JJF4syBCokrvJWu75epvgtIq60KK2ZtZMZUryd1ndWvyPMZgadVWnFPxya8GZ14O9zFRb10K8n4Tj7OJ7RbErUU50k6kFql8cer5rql5FDsucpyu9OR9bSVjm9q7GjGf4lNJXffS0/uXJ8/Xnempprg3KNY1e8UZbLo5X9SyqUFbI1YKNo2XvxJtOd75EQsSVp9kjs7jGpOnJ5POPR8V5nRnGU5blSDXCS+Z1tbFwh8U4rxav6HubDVzp4p+Hn7mMVlfZuBGhj6T0nH1JEZJ6O/gdypPw52mj0AEkAAAEPa2K/DptrXReL4nLUqLkm5Z8eb/2XPaKd3CPCzf0Kulikot/LPoePvb5anH6R26E4nP7NWIopwyUle2SykvR/U0vDt3usss+fSxOo1E8/vmb6tGMo2dmms0+P7HGpz2dHLHRyeOwLk3Z+OXPqcVt7YWru78M2j63Vpxtp6nP7WwkXHT5u339SrVS+SZrN/R8QxWIr0JfG7cnmSKPaa1t9N9V+h0PajZaabsfP3hZd5bryzdle2ds+h6Wh8e4jNLsrqOo8OpfaOHDe9D2htKrV/46dk8rz/REvsx2Nk4qdXV2ajbRdep3uztjUqdlZK7y6vX9Tk1b0YeIWS6dNZZyOz+zjm97ESb42fw+UV/s77ZGzYQSio2yvpw8TeqGm4k37ettf1LXZ+H7uas/G9/PiczVW/yFVhGuhQUYOSS0byVr6vMh4Casn6FzWjla9lnc5XD1WlGLe64yz5ZZW6FbXEpP5HRU6l8ifT0uUUJLOS5521usvYucJVlaOXjnbg8/X5mkdlKRvjB2zefy6GNOD4v6eBJlJa6mLmi7hGapmpxd7W8fviexw/dz9DOpUR5/EJL098iVxTJbog16G5osiFiNoqPdS7zLPG4iPMosZC8rq2mfrl9StY+jSM/ZsoS32+9dr0Rs3bcr87fUi0VJWTd/FfXzJdOE+PDTjchV10S0IVG20zOEpU3eMmvDJnlVNLwMJptZ8OQ5tDGToNkbbU2oTa3uD0v0a4Muz51Wjo1qdl2fxzrUk5fFHuy69T1dlunqfhXpxbjRU/lPhZgA9A5Sj7S0naMl1T+a+pzeIg7Z3ato9Xwszu8TQU4uL0f3c5DGYaUW4Sya91+h5W+0Xnmvs7NvqdcSuw+J7v8Ak075Zp6+qJdTHpJXyty4EbFO1t1Xd7ctXm/Q0QoXl3novhemq82ea8z0diwyVVxt1ln7lXtGtUayhL06f6Laoll7f6N0aCtYzaz9kp4+j5xtShVll+FN5a7rOZ2Vs2ssU96lUjFq13CSWqerVuB9veFXI11MInpa3gXjVrTlyl6WbVFPs5pK3CKzfS2pZQoxhG6W9py4u7fvcynhYxaVjXjMPNLK9vkUTwQ+2SHOybWds0tPLoeYfE6N+S5c0UVXEfh5S9Xnfz5kaljnnvSvra2Stwy9iHrYJ+M6PF7Q4cChgk5yfN38OL9yJPGxu+b/AEsaaO0oxqK71dvPh7/Mo7dMlRxOrwrzt0+/vqWEcSorwK/BNcOOZvqxWhvPSMn6SqdZ2yMvxOL1XEi052MJ1iroYJkpKas7NZP0zXubKfIr6VQlwqpCe2GQcfXWafDX5mmjUvlmS8RQi7u2bIWEg27LJ3/YPMllhk+jTz6G6WHysrrwJVGCVlxZv/AV7pZ8+P3mzVQzN0VmIpNxyefUjRpytZ+f7Fl/C2lfpotNb6c+prqQzKtFuRBnyLTstVtUceEo+6f+ytq6sm9l43ry/pj8/tnRsv8AIjLX/gzrgAe+eaCHtLAqrHlJfC/o+hMIe2Km7QqNflfvl9St44vJM5z0cXhLTqPx8vUl0cGoSnL81r/K3RGjAz3Y+JKxFZbrPmn32eqiA5XmT8JmQJQtYn4SXApC77LUT3BcjxUjbG3MzWRvwyZciJWoX0PIRVrMk1ZpLoRZrPLjYq5SeSyptFHtzZ0Zxaaun9pnzTaGPdGcqcnpo3xXBn2XFwW7mcL/APnoV8eqkleNOGnBy3nu38LS9UUSlVivDaa6KDZeyMXWW8o7sHo53TtzS1fnYnYrstl3pyk+NrJeh9DVK3A0YjCb37cCl1X+vRKv9nLbP2jKCUJ6rJN8f3LOljpb2mXO+X3+h5idgqV75lVW2XiIZUpby5S+jX7mc1S9LYll/wDjX9jJ1Ec/GriYrvUn/i0172IOM21OGtGp/wCv6llWXjBXgdgsQjP8dJ+PofN8V2zpxnuzo1d5K60t5ZkvD9qJSzhS8N5pW9LnR8VJZpdFeOfDt8Ri+681l92JGzHxfHP1OS2fUqVWpTfkvhXgjo8FNowq81/Q44WDpYSyyt5m6Myqp1Mj1Yh3sbfLgx4E6rLiQq87idbIg16zTvfXL6/Rk55EpBxfDXK9/rY6HsxQ+OfNqPpr9CmoQc2ktXlbqzr8FhlThGC4L1erfqejstHvkc24vrBvAB6hxg1YqipwlB6STXqjaCGsg+fYilKDcXdNOxrVRtnXbb2V+It+C761X5l+pxtrTad1nnwa6ZngbnbPTr+j09HVVr+yaob1nyN8VbNGMIZK3Q11ZtOxg00Xzkl0sUZVK7IOGvfMkSdiE2MLJs/H5mKr8U+eRFqSNLqkcmWwatrY1rS+Szse9l4NwdR6zbfkskvRX8ym25iZyUoUoSnKz7sIuUtOSLTsvW3sLQa404af2orMvPJl6aU4RfYiTSdld2McJRlduXE20qql6aklWyz8TXhl5MeWFgxhSXEylh0Zp3NqiaKEUdNFfUwiadkmQMVsmMlnEvYJGNWPQpWimWnUZ87232apVItOOa0fFPmmc3g9nypydOWqfryZ9R2jGK8Tl9v0EnCa1vu+qb+jMaVTLleHRN59GzKSVlbQu4QzyKnC1LZlrQqpq6efEiZK0yaonjPJTyPN9aGy0zLJ7OfJX8DTVpOTUUr3eSWv3qWGC2dOpnFWX5np5czocBs6FJZZy4yevlyR36G0dLvww1NZT4aNjbMVJXl8b16dEWYB6sQpWEcVU6eWAAWIAAABX7T2RTr5yVpcJxyl+68SwBFSqWGSm12jiq2wcVRk3TtWpvgmozXgpNJr/IhY3D1NXCcfGMl72PoQOO9jp150bzuKR84wcqu9ZRlL+2LfyLWeGqW/45/9WdkCi/8APnHpZ7pv6OIeEqN5Uql/7Xb3yJeF7OTnnVe5HkrOXtkvc6wF52Omnl9la3NPwi4DZ1OirU4pX1erfi3mzisPhnRq16Tut2rOUeThUf4kGuiUtzxgzvyu2rspVrST3ZpWT5r8sunyNNxoK9PjP0V0tTjWWUEJ2PFiO9npwfjqYYzCVKXxRy5rOPqtPMxhNNHi3FS8M7k01knud1dO331N0a7sk2V9Oow6jIyw0WManh1PalYrVVPalZ2HJkcURMdO7vb75k3sxs/em5zV0lazzV3lp4OXqY0MDOs+7kuMnov1fQ6nBYWNKKjHzfFvmzs2W3br5H4Za+qlPFFbiezGHlmoOD/oe6vTT2Ii7KKPw1WvGKfyaOkB6NbbSp5cnKta19nPLs7L/wAq/wCv/wBE7CbFpwzfff8AVp5IswTO3057SD1bfrPEj0A2MwAADw9AAAAAAAAAAAAAAAAAAAAPGik2nsBS71FqEuMf5JenwvqvQvAUvTm1ikWmnLyjjKmCrxupU2+q7y9VoR2mtU14ndnkop6q5x3sJfjN1uWvUcPC/MkYeg5y3Yq7+XV8kdTLBU3rCPojbTpRjlFJeCsUjYYfbJe5/SMMJh1Tgorh8+LNwB6KSSwjlbyAASAAAAAAAAADw9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPD0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8PTw9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//Z",
    qty: 1,
    category: "Vegetables",
  },
  {
    id: 3,
    title: "Fresh Milk",
    farmerRatings: 4.5,
    price: 50,
    unit: "1ltr",
    img:
      "data:image/jpeg;base64,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",
    qty: 1,
    category: "Dairy",
  },
];

const Products = () => {
  const [mainArr] = useState(prodArray);

  // const [filtArr, setFiltArr] = useState(mainArr);

  // const [filtUnitArr, setFiltUnitArr] = useState([]);

  const [prodCat, setProdCat] = useState({ products: "All", unit: "All" });

  const [prodArrays, setProdArrays] = useState({
    filtArr: mainArr,
    filtUnitArr: [],
  });

  console.log(prodCat.products);

  const { state } = useContext(SearchContext);

  useEffect(() => {
    if (prodCat.products !== "All") {
      setProdArrays((prev) => ({
        ...prev,
        filtArr: mainArr.filter((item) => item.category === prodCat.products),
        filtUnitArr: mainArr.filter(
          (item) => item.category === prodCat.products
        ),
      }));
    } else {
      setProdArrays((prev) => ({
        ...prev,
        filtArr: mainArr,
        filtUnitArr: mainArr,
      }));
    }
  }, [prodCat.products]);

  useEffect(() => {
    if (prodCat.unit !== "All") {
      setProdArrays((prev) => ({
        ...prev,
        filtUnitArr: prodArrays.filtArr.filter(
          (item) => item.unit === prodCat.unit
        ),
      }));
    } else {
      setProdArrays((prev) => ({
        ...prev,
        filtUnitArr: prodArrays.filtArr,
      }));
    }

    console.log(prodArrays.filtUnitArr);
  }, [prodCat.unit, prodArrays.filtArr]);

  useEffect(() => {
    const searchText = state.searchText.toLowerCase();
    const filteredProducts = mainArr.filter((item) =>
      item.title.toLowerCase().includes(searchText)
    );

    setProdArrays((prev) => ({
      ...prev,
      filtArr: filteredProducts,
      filtUnitArr: filteredProducts,
    }));
  }, [state.searchText]);

  return (
    <div className="px-[5vw]">
      <div className="py-5 space-y-2">
        <span className="text-[20px]">
          {" "}
          <NavLink>Products</NavLink> |{" "}
          <NavLink className="font-bold"></NavLink>{" "}
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
        <section className="border basis-[80%] flex py-5">
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
              />
            ))}
        </section>
      </div>
    </div>
  );
};

export default Products;
