import React, { FC } from "react";
import { IEqualizerProps } from "./EqualizerInterface";


const Equalizer: FC<IEqualizerProps> = ({ handleChange, state }) => {
    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(+e.target.value);
    };
    return (
        <div className="w-full pt-[54px] pb-[37px] bg-[#292230]">
            <div className="container flex h-[140px] justify-between">
                {[...new Array(6)].map((_, i) => {
                    return (
                        <input
                            key={i}
                            type="range"
                            value={state}
                            step={0.2}
                            max={5}
                            min={1}
                            style={{
                                // appearance: "slider-vertical",
                                width: "20px",
                            }}
                            onChange={(e) => change(e)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Equalizer;
