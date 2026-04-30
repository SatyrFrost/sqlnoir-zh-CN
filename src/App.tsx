import { Routes, Route } from "react-router-dom";
import { GameApp } from "./components/GameApp";
import { Blog } from "./components/Blog";
import { BlogPost } from "./components/blog/BlogPost";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GameApp />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  );
}
