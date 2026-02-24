import { fileExplorerSystemData } from "@/config";
import { ChevronDown, ChevronRight, File, Folder } from "lucide-react";
import { useState } from "react";

function FileExplorer() {
  const [expandedFolders, setExpandedFolders] = useState(new Set(["1"]));
  const [selectedFile, setSelectedFile] = useState(null);

  const toggleFolder = (id) => {
    const newExpandedFolders = new Set(expandedFolders);

    if (newExpandedFolders.has(id)) {
      newExpandedFolders.delete(id);
    } else {
      newExpandedFolders.add(id);
    }

    setExpandedFolders(newExpandedFolders);
  };

  const selectFile = (id) => {
    setSelectedFile(id);
  };

  const FileSystemItem = ({ item, depth = 0 }) => {
    const isFolder = item.type === "folder";
    const isExpanded = isFolder && expandedFolders.has(item.id);
    const isSelected = selectedFile === item.id;

    return (
      <div>
        <div
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          className={`flex items-center py-1 px-3 rounded cursor-pointer ${
            isSelected ? "bg-blue-100" : "not-last-of-type:"
          }`}
          onClick={() => {
            if (isFolder) {
              toggleFolder(item.id);
            } else {
              selectFile(item.id);
            }
          }}
        >
          {isFolder ? (
            <span className="flex items-center">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 mr-1" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-2" />
              )}
              <Folder className="h-4 w-4 text-blue-500" />
              {item.name}
            </span>
          ) : (
            <span className="flex items-center">
              <span className="w-4 mr-1" />
              <File className="h-4 w-4 mr-2 text-gray-500" />
              {item.name}
            </span>
          )}
        </div>
        {isFolder && isExpanded && item.children && (
          <div>
            {item.children.map((childItem) => (
              <FileSystemItem
                key={childItem.id}
                item={childItem}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col pt-[150px] justify-center bg-gray-50">
      <h1>File Explorer</h1>
      <div className="mt-5">
        {fileExplorerSystemData.map((item) => (
          <FileSystemItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default FileExplorer;
