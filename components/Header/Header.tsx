"use client";
import { RxAvatar } from "react-icons/rx";
import { Button, DatePicker, Space } from "antd";
export default function Header() {
  return (
    <div className="flex rounded-lg bg-white p-2 gap-3 justify-between">
      <div className="flex gap-3">
        <div className="flex gap-1 items-center text-[18px] pl-3">
          <RxAvatar className="text-[18px]" />
          Иванов и.и
        </div>
        <DatePicker
          className="text-[#287EFF] bg-[#EEF5FF] border-none"
          onChange={(date, string) => {}}
        />
      </div>
      <div className="flex gap-2">
        <Button className="border border-gray" shape="round">Выйти</Button>
        <Button className="text-white bg-[#FF6B17] border-none" shape="round">О нас</Button>
      </div>
    </div>
  );
}
