import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import CadastroUsuario from "./Paginas/CadastroUsuario/CadastroUsuario";
import Home from './Paginas/Home/Home'
import Share from './Paginas/Share/Share'
import SharesPage from "./Paginas/ShareList/ShareList";
import SharesFavPage from "./Paginas/ShareFavList/ShareFavList.tsx";
import './App.css'

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/share" element={<Share />} />
                    <Route path="/shareList" element={<SharesPage />} />
                    <Route path="/shareFavList" element={<SharesFavPage />} />
                    <Route path="/CadastroUsuarios" element={<CadastroUsuario />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App
