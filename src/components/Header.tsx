import React from "react";
import Image from "next/image";
import Navlinks from "./Navlinks";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full bg-green-400 p-2"
            src="/images/logo-icon.png"
            alt="Bazar Dor Logo"
            width={48}
            height={48}
          />

          <div>
            <h1 className="text-xl font-bold">বাজার দর</h1>
            <p className="text-sm">{date}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="btn">সাইন ইন</button>
          <button className="btn bg-green-400 text-white">
            সাইন আপ 
          </button>
        </div>
      </div>
<div className="mx-auto my-4 w-full max-w-7xl">
  <div className="h-px w-full bg-gray-300" />

  <div className="flex justify-center py-3">
    <Navlinks />
  </div>
</div>
 
    </header>
  );
};

export default Header;

