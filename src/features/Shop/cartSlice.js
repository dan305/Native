import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: {
      user: "userLogged",
      updatedAt: new Date().toLocaleString(),
      total: null,
      items: [],
    },
  },
  reducers: {
    addItem: (state, action) => {
      const productRepeated = state.value.items.find(
        (item) => item.id === action.payload.id
      );
      if (productRepeated) {
        const itemsUpdated = state.value.items.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity += action.payload.quantity;
            return item;
          }
          return item;
        });
        const total = itemsUpdated.reduce(
          (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
          0
        );
        state.value = {
          ...state.value,
          items: itemsUpdated,
          total,
          updatedAt: new Date().toLocaleString(),
        };
      } else {
        state.value.items.push(action.payload);
        const total = state.value.items.reduce(
          (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
          0
        );
        state.value = {
          ...state.value,
          total,
          updatedAt: new Date().toLocaleString(),
        };
      }
    },
    clearCart(state) {
      state.value = {
        ...state.value,
        items: [],
        total: 0,
        updatedAt: new Date().toLocaleString(),
      };
    },
    removeItem: (state, action) => {
      const productIdToRemove = action.payload.productId;
      state.value = {
        ...state.value,
        items: state.value.items.filter((item) => item.id !== productIdToRemove),
        total: state.value.items.reduce(
          (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
          0
        ),
        updatedAt: new Date().toLocaleString(),
      };
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

