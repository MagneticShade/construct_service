import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import { Modal } from "./components/Modal";
import PageBlanks from "./pages/Blanks";
import PageBlanksItem from "./pages/BlanksItem";
import PageProjects from "./pages/Projects";
import PageEdit from "./pages/Edit";
// import PageGallery from "./pages/Background/Gallery";
// import PageBackgroundEdit from "./pages/Background";
import { PageDefaultProfile } from "./pages/Profile";
import { PageTextEdit } from "./pages/TextEdit";
// import YourSite from "./pages/YourSite";
import { useEffect } from "react";
import { tg } from "./tg";
import EditLogo from "./pages/EditLogo";
import { useAppDispatch } from "./hooks/useAppDispatch";
import {
    getUserWithProjectsByIdThunk,
    setUser,

} from "./store/slice/UserSlice";
import PageBackgroundEdit from "./pages/Background";
import YourSite from "./pages/YourSite";
import { axiosInstance, getUserById, postUserById } from "./axios";
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
        if (!projectId) navigate("/");
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
        
            const file = new File(["photo"], "https://a-ttgme.stel.com/i/userpic/320/oclLm9BMhRFG6BqvK1XPTYF3vLuiFoVK-JVN8T9FBCGDno3b7oqxr8PPwwIxt8a1.svg", {
            type: "image/svg+xml",
          });
          console.log(file);
          
          const fromData = new FormData();
          fromData.append(`file`,file)
          axiosInstance.post("user/string/image",fromData).then((e)=>console.log("success")).catch((err)=>console.log(err)
          );

    
        
     
          
    }, []);

    return (
        <>
            <Home />
            <Routes>
                <Route path="/" element={<></>} />
                <Route
                    path="/list/edit/"
                    element={
                        <Modal>
                            <PageEdit />
                        </Modal>
                    }
                />
                <Route
                    path="/blanks"
                    element={
                        <Modal>
                            <PageBlanks />
                        </Modal>
                    }
                />
                <Route
                    path="/blanks/:id"
                    element={
                        <Modal>
                            <PageBlanksItem />
                        </Modal>
                    }
                />
                <Route
                    path="/list"
                    element={
                        <Modal>
                            <PageProjects />
                        </Modal>
                    }
                />
                <Route
                    path="/list/edit/text/:id"
                    element={
                        <Modal>
                            <PageTextEdit />
                        </Modal>
                    }
                />

                <Route
                    path="/list/edit/background/:id"
                    element={
                        <Modal>
                            <PageBackgroundEdit />
                        </Modal>
                    }
                />

                <Route
                    path="/yoursite/:id"
                    element={
                        <Modal>
                            <YourSite />
                        </Modal>
                    }
                />
                <Route
                    path="/list/logo/"
                    element={
                        <Modal>
                            <EditLogo />
                        </Modal>
                    }   
                />
                {/* 
                <Route
                    path="/gallery/"
                    element={
                        <Modal>
                            <PageGallery />
                        </Modal>
                    }
                />
 
                <Route
                    path="/profile/"
                    element={
                        <Modal>
                            <PageDefaultProfile />
                        </Modal>
                    }
                />
                {/* 
                <Route
                    path="/gallery/"
                    element={
                        <Modal>
                            <PageGallery />
                        </Modal>
                    }
                />


 
                */}
            </Routes>
        </>
    );
}

export default App;
