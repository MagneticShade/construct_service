import { FC } from "react";
import { IEqualizerProps } from "./EqualizerInterface";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { setBlur, setCount, setSpeed } from "@/src/store/slice/ProcedurSlice";
import { useAppSelector } from "@/src/hooks/useAppSelector";

const Equalizer: FC<IEqualizerProps> = ({ handleChange, state }) => {
    const dispatch = useAppDispatch()
    const {blur: procedurBlur} = useAppSelector(state => state.protcedur)
    return (
        <div className="w-full pt-[54px] pb-[37px] bg-[#292230]">
            <div className="container flex flex-col w-full h-[140px] justify-between">
                <input
                    type="range"
                    value={state.speed}
                    step={0.2}
                    max={5}
                    min={1}
                    style={{
                        // appearance: "slider-vertical",
                        // width: "20px",
                    }}
                    onChange={(e) =>
                        dispatch(setSpeed(+e.target.value ))
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
                        // width: "20px",
                    }}
                    onChange={(e) =>
                        dispatch(setCount(+e.target.value))
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
                        // width: "20px",
                    }}
                    onChange={(e) =>
                        handleChange({ ...state, size: +e.target.value })
                    }
                />
                <input
                    type="range"
                    value={procedurBlur}
                    step={0.2}
                    max={50}
                    min={10}
                    style={{
                        // appearance: "slider-vertical",
                        // width: "20px",
                    }}
                    onChange={(e) =>
                        dispatch(setBlur(+e.target.value ))
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
                        // width: "20px",
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
                        // width: "20px",
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
