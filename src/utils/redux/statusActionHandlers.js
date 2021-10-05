const isPendingAction = (name) => (action) =>
  action.type.endsWith('/pending') && action.type.startsWith(name);
const pendingActionCallback = (state, action) => {
  state.loading = 'pending';
  state.error = '';
};

const isCompletedAction = (name) => (action) =>
  action.type.startsWith(name) &&
  (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'));
const completedActionCallback = (state, action) => {
  state.loading = 'idle';
};

export const pendingActionHandler = (name) => [
  isPendingAction(name),
  pendingActionCallback,
];

export const completedActionHandler = (name) => [
  isCompletedAction(name),
  completedActionCallback,
];
