import { ProfileAvatar } from "@/src/shared/Avatar";
import { useState } from "react";
import cat from "/cat.jpg";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { Filter } from "@/src/shared/Filter";
import { InputDefault } from "@/src/shared/Inputs/InputDefault";
import { Social } from "@/src/shared/Social";
import { InputChecked } from "@/src/shared/Inputs/InputChecked";
import { CheckedButton } from "@/src/shared/Buttons/CheckedButton";

const PageDefaultProfile = () => {
    const profile = useAppSelector((state) => state.profile);
    const [visible, setVisible] = useState({
        birthday: false,
        phone: false,
        social: false,
    });

    return (
        <div className="h-full relative font-montserrat overflow-scroll pb-12">
            {/* АВАТАР ПОЛЬЗОВАТЕЛЯ */}
            <ProfileAvatar
                imgUser={profile.avatar}
                bgImg={cat}
                userFIO={`${profile.firstName} ${profile.lastName} `}
                userStatus={profile.status}
            />

            {/* Фильтр */}
            <div className="container overflow-hidden">
                <Filter
                    setIndex={() => {}}
                    filterName={["Профиль", "Награды", "Испытания", "Роли"]}
                />

                <div className="flex  pt-4 flex-col">
                    <div className="flex justify-between items-center">
                        <span>День рождения</span>
                        <InputDefault
                            name="date"
                            type="date"
                            valueInp="2004-01-20"
                            handelFocus={() =>
                                setVisible({ ...visible, birthday: true })
                            }
                        />
                    </div>

                    {visible.birthday ? (
                        <div className="flex items-center justify-between pt-4 ">
                            <span>отображать пользователям</span>
                            <CheckedButton checked={false} />
                        </div>
                    ) : null}
                </div>
                <div className="pt-4 flex flex-col">
                    <div className="">
                        <span>Телефон</span>
                        <InputDefault
                            name="tel"
                            type="tel"
                            valueInp="+79052418161"
                            handelFocus={() =>
                                setVisible({ ...visible, phone: true })
                            }
                        />
                    </div>
                    {visible.phone ? (
                        <div className="flex items-center justify-between pt-4 ">
                            <span>отображать пользователям</span>
                            <CheckedButton checked={false} />
                        </div>
                    ) : null}
                </div>
                <div className="pt-4">
                    <Social
                        handleClick={() =>
                            setVisible({ ...visible, social: true })
                        }
                    />
                    {visible.social ? (
                        <div className="pt-4">
                            <InputDefault
                                name="soc"
                                type="text"
                                placeholder="Введите ссылку"
                            />
                        </div>
                    ) : null}
                </div>
                <div className="pt-4">
                    <h4 className="h4">Био</h4>
                    <InputChecked
                        reduxOnChange={() => {}}
                        reduxVal={""}
                        checked={false}
                        name="tel"
                        type="text"
                        placeholder="О себе"
                    />
                </div>
            </div>
        </div>
    );
};

export { PageDefaultProfile };
