/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AppLayout } from "./components/layout/AppLayout";
import { Home } from "./pages/Home";
import { Medications } from "./pages/Medications";
import { Records } from "./pages/Records";
import { AIAssistant } from "./pages/AIAssistant";
import { Profile } from "./pages/Profile";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="meds" element={<Medications />} />
            <Route path="records" element={<Records />} />
            <Route path="ai" element={<AIAssistant />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
