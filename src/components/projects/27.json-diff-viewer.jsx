import { useState } from "react";
import { Button } from "../ui/button";

const diffJsonUtils = (obj1, obj2) => {
  const diffs = [];

  function recursive(o1, o2, path = "") {
    const keys = new Set([...Object.keys(o1 || {}), ...Object.keys(o2 || {})]);

    for (let key of keys) {
      const fullPath = path ? `${path}.${key}` : key;

      //key exists only in obj2 -> added
      if (!(key in o1)) {
        diffs.push({
          path: fullPath,
          type: "added",
          newValue: o2[key],
        });
      } else if (!(key in o2)) {
        diffs.push({
          path: fullPath,
          type: "removed",
          oldValue: o1[key],
        });
      } else if (typeof o1[key] === "object" && typeof o2[key] === "object") {
        recursive(o1[key], o2[key], fullPath);
      } else if (o1[key] !== o2[key]) {
        diffs.push({
          path: fullPath,
          type: "modified",
          oldValue: o1[key],
          newValue: o2[key],
        });
      }
    }
  }

  recursive(obj1, obj2);

  return diffs;
};

function JsonDiffViewer() {
  const [json1, setJson1] = useState("");
  const [json2, setJson2] = useState("");
  const [diffs, setDiffs] = useState([]);

  const handleJsonCompare = () => {
    try {
      const parsed1 = JSON.parse(json1 || "{}");
      const parsed2 = JSON.parse(json2 || "{}");

      const diffResults = diffJsonUtils(parsed1, parsed2);
      setDiffs(diffResults);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(diffs);

  return (
    <div className="flex flex-col pt-[150px] justify-center bg-gray-50">
      <h1>JSON Diff Viewer</h1>
      <div className="mt-5 mb-5 flex justify-between gap-5">
        <textarea
          rows={12}
          className="flex-1 border border-green-500 rounded-md p-4 text-sm"
          value={json1}
          onChange={(e) => setJson1(e.target.value)}
          placeholder="Enter your original JSON here..."
        />
        <textarea
          rows={12}
          className="flex-1 border border-green-500 rounded-md p-4 text-sm"
          value={json2}
          onChange={(e) => setJson2(e.target.value)}
          placeholder="Enter your updated JSON here..."
        />
      </div>
      <Button onClick={handleJsonCompare}>Compare</Button>
      {diffs.length > 0 && (
        <div className="mt-6">
          <ul>
            {diffs.map((diff, index) => (
              <li key={index}>
                <strong>{diff.path}</strong>:
                {diff.type === "added" && (
                  <span className="text-green-600">
                    + Added - {JSON.stringify(diff.newValue)}
                  </span>
                )}
                {diff.type === "removed" && (
                  <span className="text-red-600">
                    + Removed - {JSON.stringify(diff.oldValue)}
                  </span>
                )}
                {diff.type === "modified" && (
                  <span className="text-cyan-600">
                    + Modified - {JSON.stringify(diff.oldValue)} to{" "}
                    {JSON.stringify(diff.newValue)}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default JsonDiffViewer;
