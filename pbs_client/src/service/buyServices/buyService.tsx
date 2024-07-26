import { orderService } from '../httpServices';
import useOrderState from '../../store/useOrderStore';
import { toast } from 'react-toastify';

export default {
    handleAddToCart: async (id: number) => {
        try {
            const { orderItem, setOrderItem } = useOrderState();
            const response = await orderService.addCartItem(id);
            setOrderItem({ ...orderItem, books: [...orderItem.books, response] });
            toast.success('Book added to cart successfully');
        } catch (error) {
            console.error('Error adding book to cart:', error);
            toast.error('Error adding book to cart');
        }
    },
};
