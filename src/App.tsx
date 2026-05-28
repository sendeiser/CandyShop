import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import SearchResults from './pages/SearchResults'
import CategoryPage from './pages/CategoryPage'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import Contact from './pages/Contact'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/Dashboard'
import AdminProducts from './admin/AdminProducts'
import AdminCategories from './admin/AdminCategories'
import AdminOrders from './admin/AdminOrders'
import AdminCustomers from './admin/AdminCustomers'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
        <div className="noise">
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="productos" element={<AdminProducts />} />
            <Route path="categorias" element={<AdminCategories />} />
            <Route path="pedidos" element={<AdminOrders />} />
            <Route path="clientes" element={<AdminCustomers />} />
          </Route>
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <main className="min-h-screen">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalogo" element={<Catalog />} />
                    <Route path="/catalogo/:slug" element={<CategoryPage />} />
                    <Route path="/buscar" element={<SearchResults />} />
                    <Route path="/producto/:slug" element={<ProductDetail />} />
                    <Route path="/carrito" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/nosotros" element={<About />} />
                    <Route path="/contacto" element={<Contact />} />
                    <Route path="/gomitas" element={<CategoryPage />} />
                    <Route path="/combos" element={<CategoryPage />} />
                    <Route path="/eventos" element={<CategoryPage />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
        </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
