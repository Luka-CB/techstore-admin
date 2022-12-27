import { Route, Routes } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import SideBar from "./components/SideAndTopBar";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import TVs from "./pages/TVs";
import Computers from "./pages/Computers";
import CellPhones from "./pages/CellPhones";
import Accessories from "./pages/Accessories";
import Create from "./pages/Create";

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <div className="col-1">
            <SideBar />
          </div>
          <div className="col-2">
            <div className="page-contents">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/tvs" element={<TVs />} />
                <Route path="/computers" element={<Computers />} />
                <Route path="/cellphones" element={<CellPhones />} />
                <Route path="/accessories" element={<Accessories />} />
                <Route path="/create/:product" element={<Create />} />
              </Routes>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
