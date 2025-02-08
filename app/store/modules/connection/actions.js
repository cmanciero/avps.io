export const clearMetamaskAddress = ({commit}) => {
  commit("CLEAR_METAMASK_ADDRESS");
};

export const setMetamaskAddress = (context, address) => {
  context.commit("SET_METAMASK_ADDRESS", address);
};
