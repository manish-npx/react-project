import { useState } from "react";

//RLE - run length encoding

const compressString = (str) => {
  let compressed = "";
  let count = 1;

  for (let i = 1; i <= str.length; i++) {
    if (str[i] === str[i - 1]) {
      count++;
    } else {
      compressed += str[i - 1] + count;
      count = 1;
    }
  }

  return compressed;
};

function StringCompression() {
  const [desc, setDesc] = useState("");
  const [compressDesc, setCompressDesc] = useState("");

  const handleCompressString = (event) => {
    const text = event.target.value;
    setDesc(text);

    const compressedResult = compressString(text);
    console.log(compressedResult, "compressedResult");

    setCompressDesc(compressedResult);
  };

  return (
    <div className="flex flex-col pt-[150px] justify-center bg-gray-50">
      <h1>String Compression</h1>
      <div className="mt-5">
        <textarea
          className="w-full h-64 p-3 border border-gray-300 rounded text-sm resize-none"
          placeholder="Enter the string..."
          value={desc}
          onChange={handleCompressString}
        />

        <div className="mt-2">
          <p className="p-3 bg-gray-100 rounded-md">
            {compressDesc || "Compression preview will appear here"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StringCompression;
