import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import RouteWrapper from "./components/RouteWrapper";
import SideBar from "./components/SideAndTopBar";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import TVs from "./pages/TVs";
import Computers from "./pages/Computers";
import CellPhones from "./pages/CellPhones";
import Accessories from "./pages/Accessories";
import Create from "./pages/Create";
import { useDispatch, useSelector } from "react-redux";
import SignIn from "./components/SignIn";
import Update from "./pages/Update";
import Details from "./pages/Details";
import Orders from "./pages/Orders";
import Reviews from "./pages/Reviews";
import { toggleOrderOptions } from "./redux/features/stateSlice";
import PostModal from "./components/reviews/PostModal";
import DeleteReviewModal from "./components/reviews/DeleteReviewModal";

const App = () => {
  const [theme, colorMode] = useMode();

  const { admin } = useSelector((state) => state.auth);
  const { isModalOpen } = useSelector((state) => state.states);
  const { isPostModalOpen } = useSelector((state) => state.postModal);
  const { isDelReviewModalOpen } = useSelector((state) => state.delReviewModal);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!admin?.id || isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => (document.body.style.overflow = "unset");
  }, [admin, isModalOpen]);

  const handleCloseModal = () => {
    dispatch(toggleOrderOptions(false));
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" onClick={handleCloseModal}>
          {!admin?.id && <SignIn />}
          <div className="col-1">
            <SideBar />
          </div>
          <div className="col-2">
            <div className="page-contents">
              <RouteWrapper>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/tvs" element={<TVs />} />
                  <Route path="/computers" element={<Computers />} />
                  <Route path="/cellphones" element={<CellPhones />} />
                  <Route path="/accessories" element={<Accessories />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/create/:product" element={<Create />} />
                  <Route path="/update/:product/:name" element={<Update />} />
                  <Route
                    path="/details/:contentType/:id"
                    element={<Details />}
                  />
                </Routes>
              </RouteWrapper>
            </div>
          </div>

          {isPostModalOpen ? <PostModal /> : null}
          {isDelReviewModalOpen ? <DeleteReviewModal /> : null}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
