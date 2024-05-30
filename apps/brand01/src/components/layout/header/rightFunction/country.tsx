// import { LANG_GROUP_COUNTRY, languageGroup } from "@constants";
// import classNames from "classnames";
import React, { useRef } from "react";
// import { useBoolean, useOnClickOutside } from "usehooks-ts";

const Country = () => {
  const ref = useRef(null);
  //   const { value: isActive, toggle, setFalse } = useBoolean(false);

  //   useOnClickOutside(ref, setFalse);
  return (
    <div ref={ref} className="flex items-center">
      <button
        className="h-8 w-8 cursor-pointer object-cover"
        type="button"
        aria-label="country-flag"
        // onClick={toggle}
        style={{ whiteSpace: "nowrap" }}
      >
        <img
          src="https://t3.ftcdn.net/jpg/00/62/19/82/360_F_62198244_HcI4q6pS86tREeUYuseBfTzPP7nLaSPi.jpg"
          alt="en"
          className="h-full w-full rounded-full"
        />
      </button>

      {/* <div className={classNames("countryList", { active: isActive })}>
        {Object.entries(languageGroup).map(([lang, item]) => (
          <Fragment key={lang}>
            <div className="countryName" key={lang}>
              {LANG_GROUP_COUNTRY[lang]}
            </div>
            <div className={classNames("flag", lang)} key={`flag_${lang}`}>
              {item?.map(({ value, currencyId, displayText }) => {
                return (
                  <button
                    key={`${lang}_${value}`}
                    type="button"
                    onClick={() => {
                      // onSetLanguage({
                      // 	langCode: value,
                      // 	currencyId,
                      // })
                      toggle();
                    }}
                  >
                    {displayText}
                  </button>
                );
              })}
            </div>
          </Fragment>
        ))}
      </div> */}
    </div>
  );
};

export default Country;
