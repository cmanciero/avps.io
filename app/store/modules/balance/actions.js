export const clearAmount = ({
  commit
}) => {
  commit("CLEAR_AMOUNT");
};

export const setAmount = (context, amount) => {
  context.commit("SET_AMOUNT", amount);
};

export const addAmount = (context, amount) => {
  const res = +context.state.amount + +amount
  context.commit("SET_AMOUNT", res);
};

export const reduceAmount = (context, amount) => {
  const res = +context.state.amount - +amount
  context.commit("SET_AMOUNT", res);
};