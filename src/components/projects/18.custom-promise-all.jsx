import { useState } from "react";
import { Button } from "../ui/button";

const customPromiseAll = (promises) => {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    const totalPromises = promises.length;

    promises.forEach((promise, index) => {
      promise
        .then((result) => {
          results[index] = { status: "fulfilled", value: result };
        })
        .catch((error) => {
          results[index] = { status: "rejected", reason: error };
        })
        .finally(() => {
          completed++;

          if (completed === totalPromises) {
            resolve(results);
          }
        });
    });
  });
};

const fetchProducts = () => {
  return fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => `Fetched ${data.products.length} products successfully`)
    .catch((err) => Promise.reject("Failed to fetch list of products"));
};

const fetchUsers = () => {
  return fetch("https://dummyjson.com/users")
    .then((res) => res.json())
    .then((data) => `Fetched ${data.users.length} users successfully`)
    .catch((err) => Promise.reject("Failed to fetch list of users"));
};

const fetchCarts = () => {
  return fetch("https://dummyjson.com/carts")
    .then((res) => res.json())
    .then((data) => `Fetched ${data.carts.length} products successfully`)
    .catch((err) => Promise.reject("Failed to fetch list of carts"));
};

function CustomPromiseAll() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchData = async () => {
    setLoading(true);
    setResults([]);

    const promises = [fetchProducts(), fetchUsers(), fetchCarts()];

    try {
      const response = await customPromiseAll(promises);
      setResults(response);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  console.log(results);

  return (
    <div className="flex flex-col pt-[150px] justify-center bg-gray-50">
      <h1>Custom Promise All With API Call</h1>

      <div className="mt-5">
        <Button onClick={handleFetchData}>
          {loading ? "Loading..." : "Fetch Data"}
        </Button>

        <div className="flex flex-col gap-5">
          {results.map((r, i) => (
            <div key={i}>{r.status === "fulfilled" ? r.value : r.reason}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomPromiseAll;
