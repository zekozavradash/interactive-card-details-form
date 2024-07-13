document.addEventListener("DOMContentLoaded", function() {
    const cardFront = document.getElementById('cardfront');
    const cardBack = document.getElementById('cardback');
    const cardNumber = document.querySelector('.cardnumber');
    const cardExpiration = document.querySelector('.expiration');
    const cardHolder = document.querySelector('.cardholder');

    const cvcInput = document.getElementById('cvcinpt');
    const cardNumberInput = document.getElementById('cardNumberInput');
    const MMInput = document.getElementById('MMinpt');
    const YYInput = document.getElementById('YYinpt');
    const cardHolderInput = document.getElementById('cardHolderInput');
    const detailInputs = document.querySelector('.detailinputs');
    const thanks = document.querySelector('.thanks');

    cardBack.style.display = 'none';

    const defaultCardNumber = cardNumber.textContent;
    const defaultExpiration = cardExpiration.textContent;
    const defaultCardHolder = cardHolder.textContent;
    const cvcElement = document.querySelector('.cvc');
    const defaultCvc = cvcElement.textContent;

    cardFront.addEventListener('click', function() {
        cardBack.style.display = 'block';
        hideTooltipFront();

        if (cardBack.style.display === "block") {
            cardFront.style.cursor = "default";
        }
    });

    cardBack.addEventListener('click', function() {
        cardBack.style.display = 'none';

        cardFront.style.cursor = "pointer";
    });

    function showTooltipFront() {
        if (cardBack.style.display !== "block") {
            cardFront.setAttribute("data-tooltip", "Click to see the back side and CVC");
        }
    }

    function hideTooltipFront() {
        if (cardBack.style.display === "block") {
            cardFront.removeAttribute("data-tooltip"); 
        }
    }

    function showTooltipBack() {
        cardBack.setAttribute("data-tooltip", "Click to make back side disappear");
    }

    function hideTooltipBack() {
        cardBack.removeAttribute("data-tooltip");
    }

    cardFront.addEventListener("mouseenter", showTooltipFront);
    cardFront.addEventListener("mouseleave", hideTooltipFront);
    cardBack.addEventListener("mouseenter", showTooltipBack);
    cardBack.addEventListener("mouseleave", hideTooltipBack);

    const confirmBtn = document.getElementById('cornfirmBtn');
    confirmBtn.addEventListener('click', function() {
        if (confirmBtn.textContent === "Refresh") {
            location.reload();
            return;
        }

        const cardNumberValue = cardNumberInput.value.replace(/\D/g, '');
        const mmValue = MMInput.value.replace(/\D/g, '');
        const yyValue = YYInput.value.replace(/\D/g, '');
        const cardHolderValue = cardHolderInput.value.trim();
        const cvcValue = cvcInput.value.replace(/\D/g, '');

        if (cardNumberValue.length === 16 &&
            mmValue.length <= 2 && yyValue.length === 2 &&
            cardHolderValue !== '' && cvcValue.length === 3 && !/\d/.test(cardHolderValue)) {

            cardNumber.textContent = formatCardNumber(cardNumberValue);
            cardExpiration.textContent = `${mmValue}/${yyValue}`;
            cardHolder.textContent = cardHolderValue;
            cvcElement.textContent = formatCVCWithPlaceholders(cvcValue);

            cardNumberInput.style.borderColor = '#DFDEE0';
            MMInput.style.borderColor = '#DFDEE0';
            YYInput.style.borderColor = '#DFDEE0';
            cardHolderInput.style.borderColor = '#DFDEE0';
            cvcInput.style.borderColor = '#DFDEE0';

            detailInputs.style.display = 'none';
            thanks.style.display = 'flex';

            confirmBtn.textContent = "Refresh";
        } else {
            if (cardNumberValue.length !== 16) {
                cardNumberInput.style.borderColor = 'red';
            } else {
                cardNumberInput.style.borderColor = '#DFDEE0';
            }
            if (mmValue.length > 2 || yyValue.length !== 2) {
                MMInput.style.borderColor = 'red';
                YYInput.style.borderColor = 'red';
            } else {
                MMInput.style.borderColor = '#DFDEE0';
                YYInput.style.borderColor = '#DFDEE0';
            }
            if (cardHolderValue === '') {
                cardHolderInput.style.borderColor = 'red';
            } else {
                cardHolderInput.style.borderColor = '#DFDEE0';
            }
            if (cvcValue.length !== 3 || /\d/.test(cardHolderValue)) {
                cvcInput.style.borderColor = 'red';
            } else {
                cvcInput.style.borderColor = '#DFDEE0';
            }
        }
    });

    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        cardNumber.textContent = formatCardNumberWithPlaceholders(value);
        e.target.value = formatCardNumber(value);
    });

    MMInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        const mmRegex = /^(0?[1-9]|1[0-2])?$/;
        if (mmRegex.test(value)) {
            if (value.length <= 2) {
                e.target.value = value;
                cardExpiration.textContent = `${value}/${YYInput.value}` || defaultExpiration;
            } else {
                e.target.value = value.slice(0, 2);
                cardExpiration.textContent = `${value.slice(0, 2)}/${YYInput.value}` || defaultExpiration;
            }
        } else {
            e.target.value = value.slice(0, -1);
        }
    });

    YYInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        const yyRegex = /^(0?[0-9]|1[0-9]|2[0-9]|3[0-9])?$/;
        if (yyRegex.test(value)) {
            if (value.length <= 2) {
                e.target.value = value;
                cardExpiration.textContent = `${MMInput.value}/${value}` || defaultExpiration;
            } else {
                e.target.value = value.slice(0, 2);
                cardExpiration.textContent = `${MMInput.value}/${value.slice(0, 2)}` || defaultExpiration;
            }
        } else {
            e.target.value = value.slice(0, -1);
        }
    });

    cardHolderInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
        cardHolder.textContent = value || defaultCardHolder;
        e.target.value = value;
    });

    cvcInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        cvcElement.textContent = formatCVCWithPlaceholders(value);
        e.target.value = value;
    });

    function formatCardNumber(value) {
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';
        return formattedValue.trim();
    }

    function formatCardNumberWithPlaceholders(value) {
        let formattedValue = value.padEnd(16, '0').match(/.{1,4}/g).join(' ');
        return formattedValue.replace(/0/g, (_, index) => (index < value.length ? value[index] : '0'));
    }

    function formatCVCWithPlaceholders(value) {
        let formattedValue = value.padEnd(3, '0');
        return formattedValue.replace(/0/g, (_, index) => (index < value.length ? value[index] : '0'));
    }
});
