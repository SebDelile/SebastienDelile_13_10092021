const isPendingAction = (name) => (action) =>
  action.type?.endsWith('/pending') && action.type?.startsWith(name);
const pendingActionCallback = (state, action) => {
  state.loading = 'pending';
  state.error = '';
};

const isCompletedAction = (name) => (action) =>
  action.type?.startsWith(name) &&
  (action.type?.endsWith('/fulfilled') || action.type?.endsWith('/rejected'));
const completedActionCallback = (state, action) => {
  state.loading = 'idle';
};

/**
 * function that return both functions to test if the action is pending and the corresponding callback.
 * * used to manage the state.loading of the slice and clean the state.error on each request.
 * @memberof redux
 * @function
 * @param {string} name - the slice's name
 * @returns {array} the matcher test function and the matcher callback
 */
export const pendingActionHandler = (name) => [
  isPendingAction(name),
  pendingActionCallback,
];

/**
 * function that return both functions to test if the action is completed (fulfilled or rejected) and the corresponding callback.
 * used to manage the state.loading of the slice.
 * @memberof redux
 * @param {string} name - the slice's name
 * @returns {array} the matcher test function and the matcher callback
 */
export const completedActionHandler = (name) => [
  isCompletedAction(name),
  completedActionCallback,
];
