import { categoryTree } from "@/config";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function FlatArray() {
  const [flatCategories, setFlatCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const flattenCategories = (categories) => {
    const result = [];

    const processCategory = (category) => {
      const { children, ...categoryWithoutChildren } = category;
      result.push(categoryWithoutChildren);

      if (children && children.length > 0) {
        for (const childItem of children) {
          processCategory(childItem);
        }
      }
    };

    for (const singleCategory of categories) {
      processCategory(singleCategory);
    }

    return result;
  };

  useEffect(() => {
    const result = flattenCategories(categoryTree);

    console.log(result, "result");

    setFlatCategories(result);
  }, []);

  return (
    <div className="flex flex-col pt-[150px] justify-center bg-gray-50">
      <h1>Flat Array Without Array.flat()</h1>

      <Select
        value={selectedCategory}
        onValueChange={(value) => setSelectedCategory(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {flatCategories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default FlatArray;
