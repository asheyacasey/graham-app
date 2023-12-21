import React from "react";
import { File } from "../../../public/assets/assets/svg";

const ImagePicker = () => {
  return (
    <label
      htmlFor="actual-btn"
      className="cursor-pointer bg-brand_yellow-500 flex justify-center items-center h-28 w-28 xl:h-36 xl:w-36 rounded-lg "
    >
      <div className="bg-white flex justify-center items-center h-20 w-20 xl:h-28 xl:w-28 rounded-lg ">
        <input type="file" id="actual-btn" className="hidden" />
        <File />
      </div>
    </label>
  );
};

export default ImagePicker;
