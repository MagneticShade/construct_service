import  { FC } from "react";
import { IEqualizerProps } from "./EqualizerInterface";

const Equalizer: FC<IEqualizerProps> = ({ handleChange, state }) => {
    return (
        <div className="w-full pt-[54px] pb-[37px] bg-[#292230]">
            <div className="container flex h-[140px] justify-between">
                <input
                    type="range"
                    value={state.speed}
                    step={0.2}
                    max={5}
                    min={1}
                    style={{
                        // appearance: "slider-vertical",
                        width: "20px",
                    }}
                    onChange={(e) =>
                        handleChange({ ...state, speed: +e.target.value })
                    }
                />
                <input
                    type="range"
                    value={state.count}
                    step={1}
                    max={10}
                    min={3}
                    style={{
                        // appearance: "slider-vertical",
                        width: "20px",
                    }}
                    onChange={(e) =>
                        handleChange({ ...state, count: +e.target.value })
                    }
                />
                <input
                    type="range"
                    value={state.size}
                    step={0.2}
                    max={30}
                    min={1}
                    style={{
                        // appearance: "slider-vertical",
                        width: "20px",
                    }}
                    onChange={(e) =>
                        handleChange({ ...state, size: +e.target.value })
                    }
                />
                <input
                    type="range"
                    value={state.blur}
                    step={0.2}
                    max={50}
                    min={10}
                    style={{
                        // appearance: "slider-vertical",
                        width: "20px",
                    }}
                    onChange={(e) =>
                        handleChange({ ...state, blur: +e.target.value })
                    }
                />
                <input
                    type="range"
                    value={state.vectorX}
                    step={0.2}
                    max={5}
                    min={1}
                    style={{
                        // appearance: "slider-vertical",
                        width: "20px",
                    }}
                    onChange={(e) =>
                        handleChange({ ...state, vectorX: +e.target.value })
                    }
                />
                <input
                    type="range"
                    value={state.vectorY}
                    step={0.2}
                    max={5}
                    min={1}
                    style={{
                        // appearance: "slider-vertical",
                        width: "20px",
                    }}
                    onChange={(e) =>
                        handleChange({ ...state, vectorY: +e.target.value })
                    }
                />
            </div>
        </div>
    );
};

export default Equalizer;
