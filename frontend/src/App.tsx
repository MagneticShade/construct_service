import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import { Modal } from "./components/Modal";
import PageBlanks from "./pages/Blanks";
import PageBlanksItem from "./pages/BlanksItem";
import PageProjects from "./pages/Projects";
import PageEdit from "./pages/Edit";
// import PageGallery from "./pages/Background/Gallery";
// import PageBackgroundEdit from "./pages/Background";
// import { PageDefaultProfile } from "./pages/Profile";
import { PageTextEdit } from "./pages/TextEdit";
// import YourSite from "./pages/YourSite";
import { useEffect } from "react";
import { tg } from "./tg";
// import EditLogo from "./pages/EditLogo";
import { useAppDispatch } from "./hooks/useAppDispatch";
import {
    getUserWithProjectsByIdThunk,
    setUser,

} from "./store/slice/UserSlice";
import PageBackgroundEdit from "./pages/Background";
import YourSite from "./pages/YourSite";
import { getUserById, postUserById } from "./axios";
interface telegram {
    id: number;
    first_name: string;
    last_name: string;
}

function App() {
    const dispatch = useAppDispatch();
    let navigate = useNavigate();
    const tgUser: telegram = tg.initDataUnsafe.user;
    useEffect(() => {
        const projectId = localStorage.getItem("projectId");
        if (!projectId) navigate("/constructorpractice/");
        tg.ready();
        tg.expand();
        tg.enableClosingConfirmation();
        async function validUser() {
            if (tgUser === undefined) {
                dispatch(getUserWithProjectsByIdThunk({ userId: "string" }));
            } else {
                const resp = await getUserById(`${tgUser.id}`); // Используйте await для ожидания результата getUser()
                if (resp.status === 400) {
                    // Выполнить POST-запрос
                    await postUserById(`${tgUser.id}`, {
                        first_name: `${tgUser.first_name}`,
                        last_name: `${tgUser.last_name}`,
                        birthday: "",
                        phone_number: "",
                    });
                    const resp2 = await getUserById(`${tgUser.id}`); // Используйте await для ожидания результата getUser()
                    dispatch(setUser(await resp2.user));
                } else {
                    dispatch(
                        getUserWithProjectsByIdThunk({ userId: `${tgUser.id}` })
                    );
                }
            }
        }

        validUser();
    }, []);

    return (
        <>
            <Home />
            <Routes>
                <Route path="/constructorpractice/" element={<></>} />
                <Route
                    path="/constructorpractice/list/edit/"
                    element={
                        <Modal>
                            <PageEdit />
                        </Modal>
                    }
                />
                <Route
                    path="/constructorpractice/blanks"
                    element={
                        <Modal>
                            <PageBlanks />
                        </Modal>
                    }
                />
                <Route
                    path="/constructorpractice/blanks/:id"
                    element={
                        <Modal>
                            <PageBlanksItem />
                        </Modal>
                    }
                />
                <Route
                    path="/constructorpractice/list"
                    element={
                        <Modal>
                            <PageProjects />
                        </Modal>
                    }
                />
                <Route
                    path="/constructorpractice/list/edit/text/:id"
                    element={
                        <Modal>
                            <PageTextEdit />
                        </Modal>
                    }
                />

                <Route
                    path="/constructorpractice/list/edit/background/:id"
                    element={
                        <Modal>
                            <PageBackgroundEdit />
                        </Modal>
                    }
                />

                <Route
                    path="/constructorpractice/yoursite/:id"
                    element={
                        <Modal>
                            <YourSite />
                        </Modal>
                    }
                />
                {/* 
                <Route
                    path="/constructorpractice/gallery/"
                    element={
                        <Modal>
                            <PageGallery />
                        </Modal>
                    }
                />
 
                <Route
                    path="/constructorpractice/profile/"
                    element={
                        <Modal>
                            <PageDefaultProfile />
                        </Modal>
                    }
                />

 
                <Route
                    path="/constructorpractice/list/logo"
                    element={
                        <Modal>
                            <EditLogo />
                        </Modal>
                    }
                /> */}
            </Routes>
        </>
    );
}

export default App;
