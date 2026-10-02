import { Routes, Route } from "react-router-dom";
import type { ReactElement } from "react";
import Home from "./pages/Home";

const HomePage = Home as unknown as () => ReactElement;

function App(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;