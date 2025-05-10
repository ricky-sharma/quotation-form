import { Route, Routes } from 'react-router';
import Layout from "./components/core/Layout";
import './components/css/Global.css';
import Home from "./components/pages/Home";
import QuotationViewer from './components/pages/QuotationViewer';

function App() {
    return (
        <Layout>
            <Routes>
                <Route exact={true} path='/' element={<Home />} />
                <Route exact={true} path='/QuotationViewer' element={<QuotationViewer />} />
            </Routes>
        </Layout>
    )
}

export default App
