
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProducPage from "../pages/ProductPage/ProducPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ProflieUserPage from "../pages/ProflieUserPage/ProflieUserPage";
import Admin from "../pages/Admin/Admin";
import ProducDetailsPage from "../pages/ProducDetailsPage/ProducDetailsPage";
import ProductTypePage from "../pages/ProductTypePage/ProductTypePage";
import CartPage from "../pages/CartPage/CartPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import OrderSucces from "../components/OrderSuccess/OrderSuccess";
import MyOder from "../components/MyOrder/MyOder";
import MyDetailOrder from "../components/MyDetailOrder/MyDetailsOrder";
import ChangeHeader from "../pages/ChangeHeader/ChangeHeader";
import ForgotPassWord from "../pages/ForgotPassWord/ForgotPassWord";
import ForgotUpdatePassWord from "../pages/ForgotUpdatePass/ForgotUpdatePass";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/order-success',
        page: OrderSucces,
        isShowHeader: true
    },
    {
        path: '/forgot-password',
        page: ForgotPassWord,
    },
    {
        path: '/update-forgot',
        page:   ForgotUpdatePassWord,
    },
    {
        path: '/my-order',
        page: MyOder,
        isShowHeader: true
    },
    {
        path: '/detail-order',
        page: MyDetailOrder,
        isShowHeader: true
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true
    },
    {
        path: '/change-header',
        page: ChangeHeader,
    },
    {
        path: '/product',
        page: ProducPage,
        isShowHeader: true
    },
    {
        path: '/productdetails/:id',
        page: ProducDetailsPage,
        isShowHeader: true
    },
    {
        path: '/product-type/:type',
        page: ProductTypePage,
        isShowHeader: true
    },
    {
        path: '/login',
        page: LoginPage
    },
    {
        path: '/register',
        page: RegisterPage
    },
    {
        path: '/proflie',
        page: ProflieUserPage,
        isShowHeader: true
    },
    {
        path: '/cart',
        page: CartPage,
        isShowHeader: true
    },
    {
        path: '/admin',
        page: Admin,
        isShowHeader: true,
        isPrivate: true,
    },
    {
        path: '*',
        page: NotFoundPage,
        isShowHeader: false // Thay đổi ở đây
    }

]

