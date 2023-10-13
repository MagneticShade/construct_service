import { ProfileAvatar } from "@/src/shared/Avatar";
import { ChangeEvent, useState } from "react";
import cat from "/cat.jpg";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { Filter } from "@/src/shared/Filter";
import { InputDefault } from "@/src/shared/Inputs/InputDefault";
import { Social } from "@/src/shared/Social";
import { InputChecked } from "@/src/shared/Inputs/InputChecked";
import { CheckedButton } from "@/src/shared/Buttons/CheckedButton";
import { SubmitButton } from "@/src/shared/Buttons/SubmitButton";
import { patchUserById, postUserImage } from "@/src/axios";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { getUserWithProjectsByIdThunk } from "@/src/store/slice/UserSlice";
import Loader from "@/src/shared/Loader";

const PageDefaultProfile = () => {
    const profile = useAppSelector((state) => state.profile);
    const user = useAppSelector((state) => state.user.user);
    const { isLoading } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const [visible, setVisible] = useState({
        birthday: false,
        phone: false,
        social: false,
    });
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
            handleFiles(event.target.files);
        }
    };
    const [file, setFile] = useState<File | null>();
    const [phone_number, set_phone_number] = useState(user.phone_number);
    const [birthday, set_birthday] = useState(user.birthday);

    async function handleSubmit() {
        const formData = new FormData();
        if (file) {
            formData.append("file", file);
            await postUserImage(user.telegramID, formData);
            setFile(undefined);
        } else {
            await patchUserById(user.telegramID, {
                birthday,
                first_name: user.first_name,
                last_name: user.last_name,
                phone_number,
            });
        }
        await dispatch(
            getUserWithProjectsByIdThunk({ userId: user.telegramID })
        );
    }
    const [images, setImages] = useState<ImageData[]>([]);

    interface ImageData {
        src: string;
        file: File;
    }

    const handleFiles = (files: FileList | null) => {
        if (!files) return;

        const imageFiles = Array.from(files).filter((file) =>
            file.type.startsWith("image/")
        );

        const imagePromises: Promise<ImageData>[] = imageFiles.map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    resolve({ src: e.target?.result as string, file });
                };
                reader.readAsDataURL(file);
            });
        });

        Promise.all(imagePromises).then((imageData) => {
            setImages([...imageData]);
        });
    };
    return isLoading ? (
        <Loader />
    ) : (
        <div className="h-full relative font-montserrat overflow-scroll pb-12">
            {/* АВАТАР ПОЛЬЗОВАТЕЛЯ */}
            {file === undefined ? (
                <ProfileAvatar
                    imgUser={`https://practice-test.ru:8080/user/${user.telegramID}/image`}
                    bgImg={cat}
                    userFIO={`${user.first_name} ${user.last_name} `}
                    userStatus={profile.status}
                />
            ) : (
                images.map((imageData, index) => (
                    <ProfileAvatar
                        key={index}
                        imgUser={imageData.src}
                        bgImg={cat}
                        userFIO={`${user.first_name} ${user.last_name} `}
                        userStatus={profile.status}
                    />
                ))
            )}

            <div className=" flex justify-center">
                <label className=" cursor-pointer" htmlFor="file">
                    Выберать фотографию
                </label>
                <input
                    onChange={(e) => handleFileChange(e)}
                    className=" opacity-0 h-0 w-0"
                    id="file"
                    type="file"
                />
            </div>

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
                            valueInp={birthday}
                            handleChange={(e) => {
                                console.log(e);

                                set_birthday(e);
                            }}
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
                            handleChange={(e) => {
                                set_phone_number(e);
                            }}
                            valueInp={phone_number}
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
                                handleChange={() => {}}
                                name="soc"
                                type="text"
                                placeholder="Введите ссылку"
                            />
                        </div>
                    ) : null}
                </div>
                <div className="pt-4 pb-10">
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
                {phone_number !== user.phone_number ||
                birthday !== user.birthday ||
                file !== undefined ? (
                    <div className="fixed left-0 bottom-0 w-full">
                        <SubmitButton
                            buttonActive={false}
                            title="Изменить профиль"
                            handleClick={() => handleSubmit()}
                        />
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export { PageDefaultProfile };
