import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './css/vars.css';
import './css/animations.css';

import HomePage from "./pages/home.tsx";
import AboutPage from "./pages/about.tsx";
import ContactPage from "./pages/contact.tsx";
import ProjectsPage from "./pages/projects.tsx";
import TerminalPage from "./pages/terminalGamePage.tsx";
import WebPage from "./pages/web.tsx";

const homePage = HomePage();
const projectsPage = ProjectsPage();
const aboutPage = AboutPage();
const contactPage = ContactPage();
const terminalGamePage = TerminalPage();
const webPage = WebPage();

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element = {homePage} />
        <Route path="/projects" element={projectsPage} />
        <Route path="/about" element={aboutPage} />
        <Route path="/contact" element={contactPage} />
        <Route path="/terminalGame" element={terminalGamePage} />
        <Route path="/web" element={webPage} />
      </Routes>
    </HashRouter>
  );
}

export default App;