export const getRandom = (max) => {
  return Math.ceil(Math.random() * max);
};

export const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
};

