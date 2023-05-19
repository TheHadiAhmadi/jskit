const $ = (selector, callback) => {
  console.log("$", selector, callback);
  document.querySelectorAll(selector).forEach(callback);
};

function toggle(selector, className) {
  $(selector, (el) => {
    el.classList.toggle(className);
  });
}

function set(selector, classname, value) {
  if (value === "false") {
    $(selector, (el) => el.classList.remove(classname));
  }
  if (value === "true") {
    $(selector, (el) => el.classList.add(classname));
  }
}

function execute(code) {
  const action = code.split("(")[0].trim();
  const params = code
    .split("(")[1]
    .split(")")[0]
    .split(",")
    .map((str) => str.trim());

  if (action === "toggle") {
    toggle(...params);
  } else {
    window[action](...params);
  }
}

function onInit(el) {
  execute(el.getAttribute("uon-init"));
  el.removeAttribute(`uon-init`);
}

function onEvent(event, el) {
  const value = el.getAttribute("uon-" + event);
  el.removeAttribute(`uon-` + event);

  el.addEventListener(event, () => {
    execute(value);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  $("[uon-click]", (el) => onEvent("click", el));
  $("[uon-init]", (el) => onInit(el));
});
