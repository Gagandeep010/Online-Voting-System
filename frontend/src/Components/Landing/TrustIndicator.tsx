
import React from "react";
import "./landing.css"

const TrustIndicator = () => {
  return (
    <div className="testi">
      <div className="flex">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c974e9e28f0e719c0bf833c4ab992aa12181eb8f"
          alt=""
          className="w-[40px] h-[40px] rounded-[9999px] shadow-[0px_0px_0px_2px_#FFF]"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/73b7f5280b864f36a51583aef48e959cd1e4d3cd"
          alt=""
          className="w-[40px] h-[40px] rounded-[9999px] shadow-[0px_0px_0px_2px_#FFF]"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc49ce25a065ffed3276b3b9943c1b0c901f7690"
          alt=""
          className="w-[40px] h-[40px] rounded-[9999px] shadow-[0px_0px_0px_2px_#FFF]"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/08dd1fd9ea926fbc1e0422afbf979221aa260526"
          alt=""
          className="w-[40px] h-[40px] rounded-[9999px] shadow-[0px_0px_0px_2px_#FFF]"
        />
      </div>
      <div className="text-base font-bold text-teal-500">
        We are trusted by 500 students and teachers
      </div>
    </div>
  );
};

export default TrustIndicator;