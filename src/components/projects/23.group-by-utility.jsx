import { groupByProducts } from "@/config";
import { useEffect, useState } from "react";

const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    const groupKey = currentValue[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }

    result[groupKey].push(currentValue);
    return result;
  }, {});
};

function GroupByUtility() {
  const [groupedProducts, setGroupedProducts] = useState({});

  useEffect(() => {
    const result = groupBy(groupByProducts, "category");
    console.log(result);

    setGroupedProducts(result);
  }, []);

  return (
    <div className="flex flex-col pt-[150px] justify-center bg-gray-50">
      <h1>GroupBy Utility</h1>
      <div className="mt-5">
        {Object.keys(groupedProducts).map((categoryItem) => (
          <div key={categoryItem}>
            <h3 className="font-bold">{categoryItem}</h3>
            <ul>
              {groupedProducts[categoryItem].map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupByUtility;
