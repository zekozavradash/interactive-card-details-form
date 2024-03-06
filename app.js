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

    cardBack.style.display = 'none';

    cardFront.addEventListener('click', function() {
        cardBack.style.display = 'block';
        hideTooltipFront(); //თულტიპის გაქრობა
        
        if (cardBack.style.display === "block") {
            cardFront.style.cursor = "default";
        }
    });

    cardBack.addEventListener('click', function() {
        cardBack.style.display = 'none';
        
        cardFront.style.cursor = "pointer";
    });

    // თულტიპის გამჩენა
    function showTooltipFront() {
        if (cardBack.style.display !== "block") {
            cardFront.setAttribute("data-tooltip", "Click to see the back side and CVC");
        }
    }

    // თულტიპის გაქრობა
    function hideTooltipFront() {
        if (cardBack.style.display === "block") {
            cardFront.removeAttribute("data-tooltip"); 
        }
    }

    // Show tooltip
    function showTooltipBack() {
        cardBack.setAttribute("data-tooltip", "Click to make back side disappear");
    }

    // თულტიპის გაქრობა
    function hideTooltipBack() {
        cardBack.removeAttribute("data-tooltip");
    }

    // თულტიპის ფუნქციონალი
    cardFront.addEventListener("mouseenter", showTooltipFront);
    cardFront.addEventListener("mouseleave", hideTooltipFront);
    cardBack.addEventListener("mouseenter", showTooltipBack);
    cardBack.addEventListener("mouseleave", hideTooltipBack);

    // Confirm ღილაკის ფუნქციონალი
    const confirmBtn = document.getElementById('cornfirmBtn');
    confirmBtn.addEventListener('click', function() {
        //ინპუტების ვალიდურობა
        const cardNumberValue = cardNumberInput.value.replace(/\D/g, '');
        const mmValue = MMInput.value.replace(/\D/g, '');
        const yyValue = YYInput.value.replace(/\D/g, '');
        const cardHolderValue = cardHolderInput.value.trim();
        const cvcValue = cvcInput.value.replace(/\D/g, '');

        // ინპუტის ვალიდაციები
        if (cardNumberValue.length === 16 &&
            mmValue.length <= 2 && yyValue.length === 2 &&
            cardHolderValue !== '' && cvcValue.length === 3 && !/\d/.test(cardHolderValue)) {
            // ბარათის მონაცემების შეცვლა
            cardNumber.textContent = cardNumberValue.match(/.{1,4}/g).join(' ');
            cardExpiration.textContent = `${mmValue}/${yyValue}`;
            cardHolder.textContent = cardHolderValue;
            const cvcElement = document.querySelector('.cvc');
            cvcElement.textContent = cvcValue;

            
            cardNumberInput.style.borderColor = '#DFDEE0';
            MMInput.style.borderColor = '#DFDEE0';
            YYInput.style.borderColor = '#DFDEE0';
            cardHolderInput.style.borderColor = '#DFDEE0';
            cvcInput.style.borderColor = '#DFDEE0';
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

    // ბარათის ნომრის ვალიდაცია
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value;
        // ასოების აკრძალვა
        value = value.replace(/\D/g, '');

        // ოთხ ოთხ ციფრად დაჯგუფება
        let formattedValue = '';
        for (let i = 0; i < value.length; i += 4) {
            formattedValue += value.substr(i, 4) + ' ';
        }
        
        formattedValue = formattedValue.trim();

        e.target.value = formattedValue;
    });

    // MM ინპუტის ვალიდაცია
    MMInput.addEventListener('input', function(e) {
        let value = e.target.value;
        // ასოების აკრძალვა
        value = value.replace(/\D/g, '');
        // MM რეგექსი (რეგექსები ChatGPTს დავაწერინე)
        const mmRegex = /^(0?[1-9]|1[0-2])?$/; 
        //რეგექსის ტესტი
        if (mmRegex.test(value)) {
           
            if (value.length <= 2) {
                e.target.value = value;
            } else {
                
                e.target.value = value.slice(0, 2);
            }
        } else {
            
            e.target.value = value.slice(0, -1);
        }
    });

    // YY input validation
    YYInput.addEventListener('input', function(e) {
        let value = e.target.value;
        // ასოების აკრძალვა
        value = value.replace(/\D/g, '');
        // YY რეგექსი
        const yyRegex = /^(0?[0-9]|1[0-9]|2[0-9]|3[0-9])?$/; 
        // რეგექსის ტესტი
        if (yyRegex.test(value)) {
            
            
            if (value.length <= 2) {
                
                e.target.value = value;
            } else {
               
                e.target.value = value.slice(0, 2);
                
            }
        } else {
            
            e.target.value = value.slice(0, -1);
        }
    });
});
