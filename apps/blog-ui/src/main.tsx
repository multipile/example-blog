import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import { Post } from "./pages/Post.tsx";
import { Tag } from "./pages/Tag.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:slug" element={<Post />} />
        <Route path="/tags/:tag" element={<Tag />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
