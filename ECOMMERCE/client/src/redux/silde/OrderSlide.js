import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    users: {}
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { userId, orderItems } = action.payload;
            if (!state.users[userId]) {
                state.users[userId] = {
                    orderItems: [],
                    selecedItemOrder: [],
                    shippingAddress: {},
                    paymentMethod: '',
                    itemsPrice: 0,
                    shippingPrice: 0,
                    taxiPrice: 0,
                    totalPrice: 0,
                    user: '',
                    isPaid: false,
                    paidAt: '',
                    isDelivered: false,
                    deliverAt: '',
                };
            }
            const userCart = state.users[userId];
            const itemOrder = userCart.orderItems.find((item) => item.product === orderItems.product);
            if (itemOrder) {
                itemOrder.amount += orderItems.amount;
            } else {
                userCart.orderItems.push(orderItems);
            }
        },
        increaseAmount: (state, action) => {
            const { userId, idProduct } = action.payload
            const userCart = state.users[userId];
            const itemOder = userCart.orderItems.find((item) => item.product === idProduct)
            const orderItemSelected = userCart.selecedItemOrder.find((item) => item.product === idProduct)
            itemOder.amount++
            if (orderItemSelected) {
                orderItemSelected.amount++
            }
        },
        descreaseAmount: (state, action) => {
            const { userId, idProduct } = action.payload
            const userCart = state.users[userId];
            const itemOder = userCart.orderItems.find((item) => item.product === idProduct)
            const orderItemSelected = userCart.selecedItemOrder.find((item) => item.product === idProduct)
            itemOder.amount--
            if (orderItemSelected) {
                orderItemSelected.amount--
            }
        },
        RemoveCart: (state, action) => {
            const { userId, idProduct } = action.payload
            const userCart = state.users[userId];
            const itemOder = userCart.orderItems.filter((item) => item.product !== idProduct)
            const orderItemSelected = userCart.selecedItemOrder.filter((item) => item.product !== idProduct)
            userCart.orderItems = itemOder
            userCart.selecedItemOrder = orderItemSelected
        },
        RemoveAllCart: (state, action) => {
            const { userId, Ids } = action.payload
            const userCart = state.users[userId];
            const itemOrder = userCart.orderItems.filter((item => !Ids.includes(item.product)))
            userCart.orderItems = itemOrder
            userCart.selecedItemOrder = itemOrder
        },
        selecedItemOrder: (state, action) => {
            const { userId, listChecked } = action.payload;
            const userCart = state.users[userId];
            const selectedChecked = [];
            if (userCart) {
                userCart.orderItems.forEach(order => {
                    if (listChecked.includes(order.product)) {
                        selectedChecked.push(order);
                    }
                });
                userCart.selecedItemOrder = selectedChecked;
            }
        },
    },
})


export const { addOrderProduct, increaseAmount, descreaseAmount, RemoveCart, RemoveAllCart, selecedItemOrder } = orderSlice.actions

export default orderSlice.reducer