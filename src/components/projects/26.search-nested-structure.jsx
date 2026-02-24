import { useState } from "react";
import { Input } from "../ui/input";
import { nestedSearchData } from "@/config";

const searchInNestedStructureUtils = (data, query) => {
  let results = [];

  for (const item of data) {
    if (item.name.toLowerCase().includes(query.toLowerCase())) {
      results.push(item);
    }

    if (item.children) {
      results = results.concat(
        searchInNestedStructureUtils(item.children, query)
      );
    }
  }

  return results;
};

function SearchInNestedStructure() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function handleSearch(event) {
    const searchQuery = event.target.value;
    setQuery(searchQuery);

    if (searchQuery) {
      const results = searchInNestedStructureUtils(
        nestedSearchData,
        searchQuery
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }

  return (
    <div className="flex flex-col pt-[150px] justify-center bg-gray-50">
      <h1>Search In Nested Structure</h1>
      <div className="mt-5">
        <Input
          value={query}
          onChange={handleSearch}
          type="text"
          placeholder="Search for a product, category or brand..."
          className={"w-full p-3 border border-gray-500 rounded-md"}
        />
        <div className="mt-6">
          {searchResults.length > 0 ? (
            <div>
              <h3>Search Results:</h3>
              <ul className="space-y-2">
                {searchResults.map((item) => (
                  <li key={item.id} className="p-3 bg-gray-100 rounded-md">
                    {item.name}
                    {item.children && (
                      <ul className="ml-4 mt-2 text-sm text-gray-500">
                        {item.children.map((child) => (
                          <li key={child.id}>{child.name}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            query && <p>No results found for "{query}"</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchInNestedStructure;
