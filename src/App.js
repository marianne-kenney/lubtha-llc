import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from './components/Header';
import Home from './pages/Home';

export default function App() {
  return (
    <Router history={{location: '', listen: ()=>{}}}>
      <div className="Lubtha">
        <Header />

        <Route path="/"><Home /></Route>
        <Route path="/software-development" />
        <Route path="/equestrian" />
        <Route path="/about" />
      </div>
    </Router>
  );
}
