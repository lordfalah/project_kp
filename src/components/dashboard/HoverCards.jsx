const HoverCards = ({ title, subtitle, icon1, icon2 }) => {
  return (
    <div className="w-full p-4 border-[1px] border-slate-300 relative overflow-hidden group bg-white rounded-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

      {icon1}
      {icon2}

      <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
        {title}
      </h3>
      <p className="text-slate-400 group-hover:text-violet-200 relative z-10 duration-300">
        {subtitle}
      </p>
    </div>
  );
};

export default HoverCards;
