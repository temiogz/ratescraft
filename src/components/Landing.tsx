import { FC } from "react";
import { Link } from "react-scroll";
import { HexToTextConverter } from "../lib/utils";
import { APP_NAME, lpHeroButtonText, lpHeroText } from "../lib";

const Landing: FC = () => {
  return (
    <div className="bg-gradient-to-r from-slate-700 via-slate-900 to-slate-800 min-h-screen flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold mb-6 tracking-wide">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 font-serif">
            {HexToTextConverter.hex2t(APP_NAME)}
          </span>
        </h1>
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          {lpHeroText}
        </p>
        <Link
          to="conversionSection"
          smooth={true}
          duration={500}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg cursor-pointer transition duration-300 inline-block"
        >
          {lpHeroButtonText}
        </Link>
      </div>
    </div>
  );
};

export default Landing;
