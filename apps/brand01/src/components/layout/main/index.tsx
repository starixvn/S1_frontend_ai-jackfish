import React, { ReactNode } from "react";

interface IMainProps {
  children: ReactNode;
}
// 本頁原本以為也要切在layout, 後來不用先擱置
const Main = ({ children }: IMainProps) => {
  return (
    <main className="mx-auto w-[1180px] flex-grow">
      <div className="grid grid-flow-col grid-cols-12 gap-4">
        <div className="col-span-12 h-[300px] w-full bg-primary-200 text-center text-3xl text-neutral-100">
          BANNER
        </div>
        <div className="lg:bg-sk-side-menu- col-span-3 row-span-3 flex h-fit justify-center border-2 pl-4 text-neutral-100 lg:order-first lg:p-4">
          SIDEBAR
        </div>
        <div className="col-span-12 row-span-2 flex justify-center bg-tertiary-400 pr-0 pb-8">
          {children}
        </div>
      </div>
    </main>
  );
};

export default Main;
