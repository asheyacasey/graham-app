import Footer from "@/layout/Footer";
import Navbar from "@/layout/Navbar";
import Sidebar from "@/layout/Sidebar";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
interface CommonProps {
  children: React.ReactNode;
}
const Common = ({ children }: CommonProps) => {
  const [isOpen, setisOpen] = useState(false);
  const toggleSideBar = () => {
    setisOpen((prev) => !prev);
  };
  return (
    <div className={`bg-brand_white-500 relative min-h-screen w-full`}>
      <Sidebar
        close={() => {
          setisOpen(false);
        }}
        open={isOpen}
      />
      <Navbar toggleSideBard={toggleSideBar} />
      <div className="p-3 md:px-30 md:py-3.5">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Common;
