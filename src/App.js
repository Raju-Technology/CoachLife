import React, { Suspense, useEffect, useState, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

//Libraries
import retina from "retinajs";
import { AnimatePresence } from "framer-motion";

//Context
import GlobalContext from "./Context/Context";


//Pages 
const Login = lazy(()=> import("./Pages/Login"))
const Registration = lazy(()=> import("./Pages/Registration"))
const SelectPlayer = lazy(()=> import("./Pages/SelectPlayer"))
const Dashboard = lazy(()=> import("./Pages/Dashboard"))
const UpdatePlayer = lazy(()=> import("./Pages/UpdatePlayer"))
const CreatePlayer = lazy(()=> import("./Pages/CreatePlayer"))
const UpdateStatus = lazy(()=> import("./Pages/UpdateStatus"))
const LearningPathwayInsertion = lazy(()=> import("./Pages/LearningPathwayInsertion"))
const LeaderBoard =lazy(()=> import("./Pages/LeaderBoard"))

function App() {
  const [name, setName] = useState("");
  const [playerUpdateId, setPlayerUpdateId] = useState("");
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customModal, setCustomModal] = useState({
    el: null,
    isOpen: false
  })
  const location = useLocation();

  console.log(name)
  console.log("app.js", playerUpdateId)

  useEffect(() => {
    window.addEventListener('load', retina(document.querySelectorAll('img')));
  }, [])

  useEffect(() => {
    setTimeout(() => {
      import("./Functions/Utilities").then(module => {
        module.SetHeaderMenuPos()
        module.setDocumentFullHeight()
      })
    }, 1000);
  }, [location])

  useEffect(() => {
    if (isModalOpen === true) {
      document.querySelector("body").classList.add("overflow-hidden");
    } else {
      document.querySelector("body").classList.remove("overflow-hidden");
    }
  }, [isModalOpen]);

  // Get the current location and set the window to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    setFooterHeight(0);
    setCustomModal({
      ...customModal,
      el: null,
      isOpen: false
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return(
    <GlobalContext.Provider
      value={{
        headerHeight,
        setHeaderHeight,
        footerHeight,
        setFooterHeight,
        isModalOpen,
        setIsModalOpen,
        customModal,
        setCustomModal,
      }}
    >
        <div className="App" style={{ "--header-height": `${headerHeight}px` }}>
          {
            <main style={{ marginTop: headerHeight, marginBottom: footerHeight }}>
              {/* <AnimatePresence mode="wait"> */}
                  <Suspense fallback={<></>}>
                      <Routes>
                        <Route exact path="/" element={<Login setName={setName} style={{ "--base-color": "#ffeb04" }} />}  />
                        <Route exact path="/registration" element={<Registration style={{ "--base-color": "#ffeb04" }} />}  />
                        <Route exact path="/update-player" element={<UpdatePlayer playerUpdateId={playerUpdateId} />}  />
                        <Route path="/select-player" element={<SelectPlayer style={{ "--base-color": "#ffeb04" }} setPlayerUpdateId={setPlayerUpdateId} /> } />
                        <Route path="/dashboard" element={<Dashboard style={{ "--base-color": "#ffeb04" }} name={name} /> } />
                        <Route path="/create-player" element={<CreatePlayer style={{ "--base-color": "#ffeb04" }}  /> } />
                        <Route path="/update-status" element={<UpdateStatus style={{ "--base-color": "#ffeb04" }} playerUpdateId={playerUpdateId} /> } />
                        <Route path="/learning-pathway-insertion" element={<LearningPathwayInsertion style={{ "--base-color": "#ffeb04" }}  /> } />
                        <Route path="/leader-board" element={<LeaderBoard style={{ "--base-color": "#ffeb04" }}  /> } />
                      </Routes>
                  </Suspense>
              {/* </AnimatePresence> */}
            </main>
          }
        </div>
    </GlobalContext.Provider>
  )

}

export default App
