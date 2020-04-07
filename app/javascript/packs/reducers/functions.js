const OPEN_MENU = 'OPEN_MENU';
const CLOSE_MENU = 'CLOSE_MENU';

const functionsReducer = (state = { open: true }, action) => {
  let { open } = action;
  switch (action.type) {
    case OPEN_MENU:
      open = open && window.innerWidth <= 700;
      if (open) {
        document.getElementById('menu-cover').style.display = 'block';
        document.querySelector('.hide').style.clipPath = 'polygon(0 0%, 100% 0, 100% 100%, 0 100%)';
        document.querySelectorAll('.logoHome')[1].style.boxShadow = '-5px -5px 5px #242424';
        document.querySelectorAll('.logoHome')[1].style.transform = 'rotate(90deg)';
      } else {
        document.getElementById('menu-cover').style.display = 'none';
        document.querySelector('.hide').style.clipPath = 'polygon(0 0%, 100% 0, 100% 0%, 0 0%)';
        document.querySelectorAll('.logoHome')[1].style.boxShadow = '5px 5px 5px #242424';
        document.querySelectorAll('.logoHome')[1].style.transform = 'rotate(0)';
      }
      return { open: !open };
    case CLOSE_MENU:
      return { open: !open };
    default:
      return state;
  }
};

export default functionsReducer;
