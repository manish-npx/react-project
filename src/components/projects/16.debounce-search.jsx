import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";

function useDebounce(value, delay) {
  const [deboucedValue, setDeboucedValue] = useState(value);
  const handler = useRef();

  useEffect(() => {
    if (handler.current) clearTimeout(handler.current);

    handler.current = setTimeout(() => {
      setDeboucedValue(value);
    }, delay);

    return () => clearTimeout(handler.current);
  }, [value, delay]);

  return deboucedValue;
}

function DebounceSearchWithApiCall() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedTerm = useDebounce(searchTerm, 500);

  async function fetchListOfProducts(debouncedTerm) {
    setIsLoading(true);
    const apiResponse = await fetch(
      `https://dummyjson.com/products/search?q=${debouncedTerm}`
    );
    const result = await apiResponse.json();

    if (result) {
      setResults(result?.products);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setResults([]);
    }
  }

  useEffect(() => {
    if (!debouncedTerm.trim()) {
      setResults([]);
      return;
    }

    fetchListOfProducts(debouncedTerm);
  }, [debouncedTerm]);

  console.log(results);

  return (
    <div className="flex flex-col pt-[150px] justify-center bg-gray-50">
      <h1>Debouce Search With API Call</h1>
      <div className="mt-5">
        <Card className={"w-full max-w-md mx-auto"}>
          <CardHeader>
            <CardTitle>Product Search</CardTitle>
          </CardHeader>
          <CardContent className={"space-y-4"}>
            <Input
              placeholder="Search For Products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {isLoading && (
              <div className="flex justify-center py-5">
                <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
              </div>
            )}

            {!isLoading && results?.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {results?.length} Results
                </p>
                <ul className="space-y-3">
                  {results?.map((p) => (
                    <li key={p.id} className="border p-3 rounded-md">
                      <div className="font-medium">{p.title}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DebounceSearchWithApiCall;
