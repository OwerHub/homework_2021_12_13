const checkBox = document.querySelector(".sale");
const dropDownMenu = document.querySelector(".order");
const products = document.querySelector(".products");
const allProduct = document.querySelectorAll(".product");

const orderParameters = [
  ["product-price", false],
  ["product-price", true],
  ["product-name", false],
  ["product-name", true],
];

const reorder = (type, reverse) => {
  const numberTypeDatas = ["product-price"];
  const frag = document.createDocumentFragment();

  const getTextContent = (node) => {
    return node.querySelector(`.${type}`).textContent;
  };

  const sortedList = [...allProduct].sort((a, b) => {
    let c = getTextContent(a);
    let d = getTextContent(b);

    const stringToPrice = (string) => {
      return parseInt(string.replace(/\./g, "").split(" ")[0]);
    };

    if (numberTypeDatas.includes(type)) {
      c = stringToPrice(c);
      d = stringToPrice(d);
    }

    return reverse ? (c > d ? -1 : c < d ? 1 : 0) : c < d ? -1 : c > d ? 1 : 0;
  });

  for (const item of sortedList) {
    frag.appendChild(item);
  }
  products.appendChild(frag);
};

const addOrderParameter = () => {
  const [a, b] = orderParameters[dropDownMenu.value];
  reorder(a, b);
};

addOrderParameter();
dropDownMenu.addEventListener("change", addOrderParameter);

// show the discount items

const hideNonDiscount = () => {
  for (const element of allProduct) {
    if (!element.querySelector(".product-old-price")) {
      element.closest(".product").style.display = checkBox.checked
        ? "none"
        : "inline-block";
    }
  }
};

hideNonDiscount();
checkBox.addEventListener("change", hideNonDiscount);
