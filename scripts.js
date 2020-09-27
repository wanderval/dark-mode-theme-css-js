const html = document.querySelector("html");
const checkbox = document .querySelector("input[name=theme]");

const getStyle = (element, style) => 
    window.getComputedStyle(element).getPropertyValue(style);

const setStyle = (element, style, value) =>
    element.style.setProperty(style, value);

const initialColors = {
    bg:getStyle(html, "--bg"),
    bgPanel:getStyle(html, "--bg-panel"),
    colorHeadings:getStyle(html, "--color-heading"),
    colorTest:getStyle(html, "--color-text")
};

const darkMode = {
    bg:"#333333",
    bgPanel:"#434343",
    colorHeadings:"#3664FF",
    colorText:"#B5B5B5"
};

const transformKey = key =>
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();

const changeColors = colors => {
    Object.keys(colors).map(key => 
        setStyle(html, transformKey(key), colors[key])
    )
}

const isExistLocalStorage = (key) => 
  localStorage.getItem(key) != null;

const createOrEditLocalStorage = (key, value) => 
  localStorage.setItem(key, JSON.stringify(value));

const getValeuLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key));

checkbox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColors);
    target.checked ? createOrEditLocalStorage('modo', 'darkMode') : createOrEditLocalStorage('modo', 'initialColors');
});

// Local storage handler
function initialize() {
    if(!isExistLocalStorage('modo'))
      createOrEditLocalStorage('modo', 'initialColors')
    
    if (getValeuLocalStorage('modo') === "initialColors") {
        checkbox.removeAttribute('checked')
        changeColors(initialColors);
    } else {
        checkbox.setAttribute('checked', "")
        changeColors(darkMode);
    }
}

initialize();