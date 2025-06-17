const product = {
    motsart: {
        name: 'МОЦАРТ',
        price: 472,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
    },
    alternativechristmas: {
        name: 'ALTERNATIVE CHRISTMAS',
        price: 2552,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
    },
    bobdylan: {
        name: 'BOB DYLAN',
        price: 2290,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },

    },
    motorhead: {
        name: 'MOTORHEAD',
        price: 3992,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    scottwalker: {
        name: 'SCOTT WALKER',
        price: 8990,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
    },
    yesyesalbum: {
        name: 'YES',
        price: 3990,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
    },
    queen: {
        name: 'QUEEN',
        price: 5490,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
    },
    arianagrande: {
        name: 'ARINA GRANDE',
        price: 21990,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
    },
    stephenstills: {
        name: 'STEPHEN STILLS',
        price: 5990,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
    },
    yevgeniymravinskiy: {
        name: 'ЕВГЕНИЙ МРАВИНСКИЙ',
        price: 632,
        kcall: 400,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    free: {
        name: 'FREE',
        price: 5990,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
    },
    maskovskiy: {
        name: 'МОСКОВСКИЙ КАМЕРНЫЙ',
        price: 472,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
    },
    Pretenders: {
        name: 'PRETENDERS',
        price: 1790,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
    },
    "NOT AFRAID": {
        name: 'NOT AFRAID',
        price: 5112,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
    },
    jamesbrown: {
        name: 'JAMES BROWN',
        price: 2312,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
    },
}

const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 2000,
        kcall: 150
    },
    lettuce: {
        name: 'Салатный лист',
        price: 3000,
        kcall: 100
    },
    cheese: {
        name: 'Сыр',
        price: 4000,
        kcall: 130
    }
}

const btnPlusOrMinus = document.querySelectorAll('.main__product-btn');
const checkExtraProduct = document.querySelectorAll('.main__product-checkbox');
const addCart = document.querySelector('.addCart');
const receipt = document.querySelector('.receipt');
const receiptOut = receipt.querySelector('.receipt__window-out');
const receiptWindow = receipt.querySelector('.receipt__window');
const btnReceipt = receipt.querySelector('.receipt__window-btn');


for (let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener('click', function () {
        plusOrMinus(this);
    })
}

function plusOrMinus(element) {
    const parent = element.closest('.main__product');
    const parentId = parent.getAttribute('id');
    const out = parent.querySelector('.main__product-num');
    const price = parent.querySelector('.main__product-price span');
    const kcall = parent.querySelector('.main__product-kcall span');
    const elemntData = element.getAttribute('data-symbol');

    if (elemntData == '+' && product[parentId].amount < 10) {
        product[parentId].amount++;
    } else if (elemntData == '-' && product[parentId].amount > 0) {
        product[parentId].amount--;
    }

    out.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].Summ;
    kcall.innerHTML = product[parentId].Kcall;
}

for (let i = 0; i < checkExtraProduct.length; i++) {
    checkExtraProduct[i].addEventListener('click', function () {
        addExtraProduct(this);
    })
}

function addExtraProduct(element) {
    const parent = element.closest('.main__product');
    const parentId = parent.getAttribute('id');
    const kcall = parent.querySelector('.main__product-kcall span');
    const price = parent.querySelector('.main__product-price span');
    const elAtr = element.getAttribute('data-extra');

    product[parentId][elAtr] = element.checked;

    if (product[parentId][elAtr] == true) {
        product[parentId].kcall += extraProduct[elAtr].kcall
        product[parentId].price += extraProduct[elAtr].price
    } else {
        product[parentId].kcall -= extraProduct[elAtr].kcall
        product[parentId].price -= extraProduct[elAtr].price
    }

    kcall.innerHTML = product[parentId].Kcall;
    price.innerHTML = product[parentId].Summ;
}

let arrayProduct = [];
let totalName = '';
let totalPrice = 0;
let totalKcall = 0;

addCart.addEventListener('click', function () {
    for (const key in product) {
        const po = product[key];
        if (po.amount > 0) {
            arrayProduct.push(po);
            for (const infoKey in po) {
                console.log(infoKey);
                if (po[infoKey] === true) {
                    po.name += '\n' + extraProduct[infoKey].name;
                }
            }
        }
        po.price = po.Summ;
        po.kcall = po.Kcall;
    }
    for (let i = 0; i < arrayProduct.length; i++) {
        const el = arrayProduct[i];
        totalPrice += el.price;
        totalKcall += el.kcall;
        totalName += '\n' + el.name + '\n';
    }
    receiptOut.innerHTML = `Вы купили: \n ${totalName} \n Стоимость покупки ${totalPrice} сумм`;
    receipt.style.display = 'flex';
    setTimeout(function () {
        receipt.style.opacity = '1';
    }, 100);
    setTimeout(function () {
        receiptWindow.style.top = '0';
    }, 200);
    document.body.style.overflow = 'hidden';
    const outNum = document.querySelectorAll('.main__product-num');
    for (let i = 0; i < outNum.length; i++) {
        outNum[i].innerHTML = 0;
    }
    const outPrice = document.querySelectorAll('.main__product-price span');
    for (let i = 0; i < outPrice.length; i++) {
        outPrice[i].innerHTML = 0;
    }
});
btnReceipt.addEventListener('click', function () {
    location.reload();
})
