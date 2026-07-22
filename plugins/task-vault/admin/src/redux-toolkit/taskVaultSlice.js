const initialState = {
  selectedProject: null,
  sidebarOpen: true,
};


const taskVaultReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'task-vault/setProject':
      return {
        ...state,
        selectedProject: action.payload,
      };

    case 'task-vault/toggleSidebar':
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen,
      };

    default:
      return state;
  }

  x
}


export default taskVaultReducer