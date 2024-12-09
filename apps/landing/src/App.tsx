import { Suspense } from "react";
import { Routes } from 'react-router-dom';
import { Route } from "react-router-dom";
import { Spinner } from "./components/spinner";
import HomeMainPage from "./app/(landing)/home/page";

export function App() {
  return (
    <Routes>
      <Route path={'/'} element={<HomeMainPage />} />
    </Routes>
  );
}
export default function AppWrap() {
  return (
    <Suspense fallback={<Spinner />}>
      <App />
    </Suspense>
  );
}
