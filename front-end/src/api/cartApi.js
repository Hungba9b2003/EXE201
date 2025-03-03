import axiosClient from './axiosClient';

const cartsApi = {
    // async getAll(userId) {
    //     // Transform _page to _start
    //     const cartList = await axiosClient.get(`/api/user/${userId}`,
    //         //  { params: newParams }
    //         );
    //     return cartList;
    // },
    async getAll(userId) {
        const url = `api/carts/user/${userId}`;
        return axiosClient.get(url);
    },

    get(id) {
        const url = `api/carts/${id}`;
        return axiosClient.get(url);
    },

    add(payload) {
        const url = 'api/carts';
        return axiosClient.post(url, payload);
    },

    update(data) {
        const url = `api/cars/${data.id}`;
        return axiosClient.patch(url, data);
    },

    updateQuantity(data){
        const url = `api/carts/quantity`;
        return axiosClient.put(url, data);
    },
    delete(userId, cartId) {
        const url = `api/carts/user/${userId}`;
        return axiosClient.put(url, { cartId });
    },
};

export default cartsApi;
