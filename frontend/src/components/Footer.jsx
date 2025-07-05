import React from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="mt-auto p-4 flex flex-col items-center justify-center">
        <p className="text-center text-gray-400 text-sm font-semibold">
          &#xA9; {currentYear} Made by{" "}
          <span className="text-blue-500">Ishatva Singh Panwar</span>
        </p>
      </div>
    </footer>
  );
};
