export default function TechSupport() {
  return (
    <div className="w-full bg-[#171D2C] py-5 px-3 flex flex-col gap-2 text-white text-[13px] rounded-lg">
      <div>Техническая поддержка</div>
      <div className="w-full flex">
        <div className="w-[50%]">
          <div className="text-[10px] text-[#56617F]">Номер поддержки</div>
          <div>8 (999) 999 99 99</div>
        </div>
        <div className="w-[50%]">
          <div className="text-[10px] text-[#56617F]">Почта поддержки</div>
          <div>pf1@werthesest.ru</div>
        </div>
      </div>
      <div>
        <div className="text-[10px] text-[#56617F]">часы работы</div>
        <div>Пн - Пт с 9:00  до 19:00 мск</div>
      </div>
      <div className="text-[11px] text-[#56617F] border-b border-solid border-[#56617F] py-2">пользовательское соглашение</div>
      <div className="text-[11px] text-[#56617F] border-b border-solid border-[#56617F] py-2">политика конфиденциальности</div>
      <div className="text-[11px] text-[#56617F] border-b border-solid border-[#56617F] py-2">Юридическая информация</div>
      <div className="text-[11px] text-[#56617F] py-2">публичная оферта</div>
    </div>
  );
}
