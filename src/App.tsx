import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Menus } from "./components/Menus";

function App() {
  return (
    <div className="h-screen">
      <Header roomID="XXXX" />
      <Menus />
      <Footer />
    </div>
  );
}

export default App;
