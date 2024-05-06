import Routing from "../../Routing/Routing/Routing";
import Background from "../Background/Background";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Layout.css";

function Layout(): JSX.Element {
  return (
    <div className="Layout">
      <Background />
      <header>
        <Header />
      </header>
      <main>
        <Routing />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
