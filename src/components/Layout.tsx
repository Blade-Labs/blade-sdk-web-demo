import { Routes, Route } from "react-router-dom";
import Init from "./Init";
import Account from "./Account";
import Tokens from "./Tokens";
import Contract from "./Contract";
import Exchange from "./Exchange";

export default function Layout() {
    return (
      <Routes>
        <Route path="/" element={<Init />} />
        <Route path="/init" element={<Init />} />
        <Route path="/account" element={<Account />} />
        <Route path="tokens" element={<Tokens />} />
        <Route path="contract" element={<Contract />} />
        <Route path="exchange" element={<Exchange />} />
      </Routes>
    );
}