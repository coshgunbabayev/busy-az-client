// import React from "react";
// import { MdDelete } from "react-icons/md";


// const Bookmarkcard = ({ item }) => {
//   return (
//     <div className="border-b border-gray-300 min-h-10 p-6 flex justify-between">
//       <div>
//         <h1 className="font-medium">{item.title}</h1>
//         <p className="text-sm opacity-85">{item.date}</p>
//       </div>
//       <div>
//         <button className="border-none p-0 m-0 flex items-center justify-center text-white bg-red-400 rounded-full w-10 h-10">
//           <MdDelete  size={22} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Bookmarkcard;


import React from "react";
import { MdDelete } from "react-icons/md";

const Bookmarkcard = ({ item, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`https://busy-az-api-9c92d29fca5a.herokuapp.com/api/vacancy/${item._id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (response.ok) {
        console.log("Item deleted successfully");
        onDelete(item._id);
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="border-b border-gray-300 min-h-10 p-6 flex justify-between">
      <div>
        <h1 className="font-medium">{item.title}</h1>
        <p className="text-sm opacity-85">{item.date}</p>
      </div>
      <div>
        <button
          onClick={handleDelete}
          className="border-none p-0 m-0 flex items-center justify-center text-white bg-red-400 rounded-full w-10 h-10"
        >
          <MdDelete size={22} />
        </button>
      </div>
    </div>
  );
};

export default Bookmarkcard;

