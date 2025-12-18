document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DEL DOM ---
    const loginBtn = document.getElementById('loginBtn');
    const openAccountBtn = document.getElementById('openAccountBtn');
    const openAccountBtnHero = document.getElementById('openAccountBtnHero');
    const loginModal = document.getElementById('loginModal');
    const transferModal = document.getElementById('transferModal');
    const registerModal = document.getElementById('registerModal');
    const requestCardModal = document.getElementById('requestCardModal');
    const payBillsModal = document.getElementById('payBillsModal');
    
    const closeLoginModal = document.getElementById('closeLoginModal');
    const closeRegisterModal = document.getElementById('closeRegisterModal');
    const closeTransferModal = document.getElementById('closeTransferModal');
    const closeRequestCardModal = document.getElementById('closeRequestCardModal');
    const closePayBillsModal = document.getElementById('closePayBillsModal');

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');

    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');

    const transferForm = document.getElementById('transferForm');
    const transferError = document.getElementById('transfer-error');

    const requestCardForm = document.getElementById('requestCardForm');
    const requestCardError = document.getElementById('request-card-error');
    const cardSelectionStep = document.getElementById('cardSelectionStep');
    const cardConfirmationStep = document.getElementById('cardConfirmationStep');
    const goToConfirmBtn = document.getElementById('goToConfirmBtn');
    const confirmCardRequestBtn = document.getElementById('confirmCardRequestBtn');
    const cancelCardRequestBtn = document.getElementById('cancelCardRequestBtn');
    const confirmationText = document.getElementById('confirmationText');
    const cardSuccessStep = document.getElementById('cardSuccessStep');
    const finalCardContainer = document.getElementById('finalCardContainer');
    const finishCardRequestBtn = document.getElementById('finishCardRequestBtn');

    const payBillsForm = document.getElementById('payBillsForm');
    const payBillsError = document.getElementById('pay-bills-error');

    const cardPreviewContainer = document.getElementById('cardPreviewContainer');
    const cardTypeSelect = document.getElementById('cardTypeSelect');

    const authButtons = document.querySelector('.auth-buttons');
    const userMenu = document.getElementById('userMenu');
    const welcomeUser = document.getElementById('welcomeUser');
    const logoutBtn = document.getElementById('logoutBtn');

    const mainContent = document.getElementById('mainContent');
    const dashboard = document.getElementById('dashboard');
    const userFullName = document.getElementById('userFullName');
    const userIdNumber = document.getElementById('userIdNumber');
    const userBalance = document.getElementById('userBalance');
    const transactionList = document.getElementById('transactionList');
    const userCardsContainer = document.getElementById('userCardsContainer');
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notificationMessage');

    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navWrapper = document.getElementById('navWrapper');

    const transferBtn = document.getElementById('transferBtn');
    const requestCardBtn = document.getElementById('requestCardBtn');
    const payBillsBtn = document.getElementById('payBillsBtn');
    const downloadStatementBtn = document.getElementById('downloadStatementBtn');
    const heroCreditBtn = document.getElementById('heroCreditBtn');

    let selectedCardType = null;

    // --- FUNCIONES DE UTILIDAD ---
    const showNotification = (message, isError = false, duration = 3000) => {
        notificationMessage.textContent = message;
        notification.style.backgroundColor = isError ? 'var(--danger)' : 'var(--success)';
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, duration);
    };

    const closeAllModals = () => {
        navWrapper.classList.remove('active');
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
        transferModal.style.display = 'none';
        requestCardModal.style.display = 'none';
        payBillsModal.style.display = 'none';

        loginError.style.display = 'none';
        registerError.style.display = 'none';
        transferError.style.display = 'none';
        requestCardError.style.display = 'none';
        payBillsError.style.display = 'none';
    };

    // --- MANEJO DE MODALES ---
    const openLoginModal = () => {
        closeAllModals();
        loginModal.style.display = 'block';
        loginForm.querySelector('input[name="email"]').focus();
    };

    const openRegisterModal = () => {
        closeAllModals();
        registerModal.style.display = 'block';
        registerForm.querySelector('input[name="name"]').focus();
    };

    const openTransferModal = () => {
        closeAllModals();
        transferForm.reset();
        transferModal.style.display = 'block';
        transferForm.querySelector('input[name="recipientEmail"]').focus();
    };

    const openRequestCardModal = () => {
        closeAllModals();
        requestCardModal.style.display = 'block';
        cardSelectionStep.style.display = 'block';
        cardConfirmationStep.style.display = 'none';
        cardSuccessStep.style.display = 'none';
        selectedCardType = null;
        renderCardPreview('');
        cardTypeSelect.value = '';
    };

    const openPayBillsModal = () => {
        closeAllModals();
        payBillsForm.reset();
        payBillsModal.style.display = 'block';
    };

    // --- EVENT LISTENERS PARA MODALES ---
    loginBtn.addEventListener('click', openLoginModal);
    openAccountBtn.addEventListener('click', openRegisterModal);
    openAccountBtnHero.addEventListener('click', openRegisterModal);
    
    if (transferBtn) transferBtn.addEventListener('click', openTransferModal);
    if (requestCardBtn) requestCardBtn.addEventListener('click', openRequestCardModal);
    if (payBillsBtn) payBillsBtn.addEventListener('click', openPayBillsModal);
    if (heroCreditBtn) heroCreditBtn.addEventListener('click', () => {
        showNotification('Para solicitar un crédito, por favor inicia sesión o crea una cuenta.');
        openLoginModal();
    });

    closeLoginModal.addEventListener('click', closeAllModals);
    closeRegisterModal.addEventListener('click', closeAllModals);
    closeTransferModal.addEventListener('click', closeAllModals);
    closeRequestCardModal.addEventListener('click', closeAllModals);
    closePayBillsModal.addEventListener('click', closeAllModals);

    if (finishCardRequestBtn) finishCardRequestBtn.addEventListener('click', closeAllModals);

    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        openRegisterModal();
    });

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        openLoginModal();
    });

    window.addEventListener('click', (e) => {
        if (e.target === loginModal || e.target === registerModal || 
            e.target === transferModal || e.target === requestCardModal || 
            e.target === payBillsModal) {
            closeAllModals();
        }
    });

    // --- MENÚ MÓVIL ---
    hamburgerMenu.addEventListener('click', () => {
        navWrapper.classList.toggle('active');
    });

    navWrapper.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
            navWrapper.classList.remove('active');
        }
    });

    // --- VISTA PREVIA DE TARJETA ---
    const renderCardPreview = (cardType) => {
        if (!cardType) {
            cardPreviewContainer.innerHTML = '<div class="card-placeholder">Selecciona una tarjeta para previsualizar</div>';
            return;
        }

        let cardClass = '';
        let cardTypeDisplay = '';
        const currentUser = JSON.parse(sessionStorage.getItem('loggedInUser')) || { name: 'TU NOMBRE' };

        switch (cardType) {
            case 'debit': 
                cardClass = 'debit'; 
                cardTypeDisplay = 'Débito';
                break;
            case 'classic': 
                cardClass = 'credit-classic'; 
                cardTypeDisplay = 'Clásica';
                break;
            case 'gold': 
                cardClass = 'credit-gold'; 
                cardTypeDisplay = 'Oro';
                break;
            case 'platinum': 
                cardClass = 'credit-platinum'; 
                cardTypeDisplay = 'Platinum';
                break;
        }

        const exampleNumber = '4210 ' + 
            Array(3).fill(0).map(() => 
                Math.floor(1000 + Math.random() * 9000)
            ).join(' ');

        const exampleExpiry = `${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}/${String(new Date().getFullYear() + 4).slice(-2)}`;

        cardPreviewContainer.innerHTML = `
            <div class="card-design ${cardClass}">
                <div class="card-header">
                    <span class="card-type">${cardTypeDisplay}</span>
                    <i class="fab fa-cc-visa"></i>
                </div>
                <div class="card-chip"></div>
                <div class="card-number">${exampleNumber}</div>
                <div class="card-footer">
                    <div class="card-holder">
                        <span>Titular</span>
                        <div>${(currentUser.name || 'TU NOMBRE').toUpperCase().substring(0, 20)}</div>
                    </div>
                    <div class="card-expiry">
                        <span>Válida hasta</span>
                        <div>${exampleExpiry}</div>
                    </div>
                </div>
            </div>`;
    };

    cardTypeSelect.addEventListener('change', () => {
        renderCardPreview(cardTypeSelect.value);
    });

    // --- GESTIÓN DE USUARIOS ---
    const getUsers = () => JSON.parse(localStorage.getItem('bancoNovaUsers')) || [];
    const saveUsers = (users) => localStorage.setItem('bancoNovaUsers', JSON.stringify(users));

    // --- FUNCIONES PARA TARJETAS ---
    const generateCardNumber = (allUsers) => {
        let newNumber;
        let isUnique = false;
        const allCardNumbers = allUsers.flatMap(user => user.cards.map(card => card.number));

        while (!isUnique) {
            newNumber = '4210 ' + Array(3).fill(0).map(() => 
                Math.floor(1000 + Math.random() * 9000)).join(' ');
            if (!allCardNumbers.includes(newNumber)) {
                isUnique = true;
            }
        }
        return newNumber;
    };

    const generateExpiryDate = () => {
        const month = String(Math.floor(1 + Math.random() * 12)).padStart(2, '0');
        const year = String(new Date().getFullYear() + 4).slice(-2);
        return `${month}/${year}`;
    };

    const generateCVV = () => String(Math.floor(100 + Math.random() * 900)).padStart(3, '0');

    const createDefaultCard = (userName, allUsers) => ({
        type: 'Debit',
        level: 'classic',
        number: generateCardNumber(allUsers),
        expiry: generateExpiryDate(),
        cvv: generateCVV(),
        holder: userName,
        status: 'inactive',
        pin: null
    });

    const createCreditCard = (userName, cardLevel, allUsers) => ({
        type: 'Credit',
        level: cardLevel,
        number: generateCardNumber(allUsers),
        expiry: generateExpiryDate(),
        cvv: generateCVV(),
        holder: userName,
        status: 'inactive',
        pin: null,
        balance: 0,
        limit: cardLevel === 'platinum' ? 20000 : (cardLevel === 'gold' ? 10000 : 5000)
    });

    // --- REGISTRO DE USUARIO ---
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        registerError.style.display = 'none';
        registerError.textContent = '';
        
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData.entries());

        if (data.password !== data.confirmPassword) {
            registerError.textContent = 'Las contraseñas no coinciden.';
            registerError.style.display = 'block';
            return;
        }

        const users = getUsers();
        if (users.some(user => user.email === data.email)) {
            registerError.textContent = 'El correo electrónico ya está registrado.';
            registerError.style.display = 'block';
            return;
        }

        const newUser = {
            name: data.name,
            idType: data.idType,
            idNumber: data.idNumber,
            email: data.email,
            password: data.password,
            balance: (Math.random() * 10000).toFixed(2),
            transactions: [
                { date: new Date().toISOString().split('T')[0], description: 'Depósito inicial', amount: 500.00 },
                { date: new Date().toISOString().split('T')[0], description: 'Pago de servicios', amount: -75.50 },
                { date: new Date().toISOString().split('T')[0], description: 'Transferencia recibida', amount: 200.00 },
            ],
            cards: [createDefaultCard(data.name, users)]
        };

        users.push(newUser);
        saveUsers(users);

        showNotification('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
        registerForm.reset();
        openLoginModal();
    });

    // --- INICIO DE SESIÓN ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        loginError.style.display = 'none';
        loginError.textContent = '';
        
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());

        const users = getUsers();
        const user = users.find(u => u.email === data.email && u.password === data.password);

        if (user) {
            sessionStorage.setItem('loggedInUser', JSON.stringify(user));
            showNotification(`Bienvenido de nuevo, ${user.name.split(' ')[0]}!`, false, 1500);
            updateUIForLogin(user);
            closeAllModals();
        } else {
            loginError.textContent = 'Correo o contraseña incorrectos.';
            loginError.style.display = 'block';
        }
    });

    // --- TRANSFERENCIAS ---
    transferForm.addEventListener('submit', (e) => {
        e.preventDefault();
        transferError.style.display = 'none';
        transferError.textContent = '';

        const formData = new FormData(transferForm);
        const recipientEmail = formData.get('recipientEmail');
        const amount = parseFloat(formData.get('amount'));

        let users = getUsers();
        let sender = JSON.parse(sessionStorage.getItem('loggedInUser'));

        if (amount <= 0 || isNaN(amount)) {
            transferError.textContent = 'Por favor, ingrese un monto válido.';
            transferError.style.display = 'block';
            return;
        }
        
        if (sender.email === recipientEmail) {
            transferError.textContent = 'No puedes transferir dinero a tu propia cuenta.';
            transferError.style.display = 'block';
            return;
        }
        
        if (parseFloat(sender.balance) < amount) {
            transferError.textContent = 'Saldo insuficiente para realizar esta transferencia.';
            transferError.style.display = 'block';
            return;
        }

        const recipientIndex = users.findIndex(u => u.email === recipientEmail);
        if (recipientIndex === -1) {
            transferError.textContent = 'La cuenta del destinatario no existe.';
            transferError.style.display = 'block';
            return;
        }

        const senderIndex = users.findIndex(u => u.email === sender.email);
        const now = new Date().toISOString().split('T')[0];

        users[senderIndex].balance = (parseFloat(users[senderIndex].balance) - amount).toFixed(2);
        users[senderIndex].transactions.unshift({ 
            date: now, 
            description: `Transferencia a ${users[recipientIndex].name}`, 
            amount: -amount 
        });

        users[recipientIndex].balance = (parseFloat(users[recipientIndex].balance) + amount).toFixed(2);
        users[recipientIndex].transactions.unshift({ 
            date: now, 
            description: `Transferencia de ${users[senderIndex].name}`, 
            amount: amount 
        });

        saveUsers(users);
        sessionStorage.setItem('loggedInUser', JSON.stringify(users[senderIndex]));

        updateUIForLogin(users[senderIndex]);
        showNotification('¡Transferencia realizada con éxito!');
        closeAllModals();
    });

    // --- PAGO DE SERVICIOS ---
    payBillsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        payBillsError.style.display = 'none';
        payBillsError.textContent = '';

        const formData = new FormData(payBillsForm);
        const serviceType = formData.get('serviceType');
        const amount = parseFloat(formData.get('amount'));

        let users = getUsers();
        let currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        
        if (amount <= 0 || isNaN(amount)) {
            payBillsError.textContent = 'Por favor, ingrese un monto válido.';
            payBillsError.style.display = 'block';
            return;
        }
        
        if (parseFloat(currentUser.balance) < amount) {
            payBillsError.textContent = 'Saldo insuficiente para realizar este pago.';
            payBillsError.style.display = 'block';
            return;
        }

        const userIndex = users.findIndex(u => u.email === currentUser.email);
        const now = new Date().toISOString().split('T')[0];

        users[userIndex].balance = (parseFloat(users[userIndex].balance) - amount).toFixed(2);
        users[userIndex].transactions.unshift({ 
            date: now, 
            description: `Pago de servicio: ${serviceType}`, 
            amount: -amount 
        });

        saveUsers(users);
        sessionStorage.setItem('loggedInUser', JSON.stringify(users[userIndex]));

        updateUIForLogin(users[userIndex]);
        showNotification(`¡Pago del servicio de ${serviceType} realizado con éxito!`);
        closeAllModals();
    });

    // --- GESTIÓN DE TARJETAS ---
    const activateCardWithPin = (cardNumber, pin) => {
        let users = getUsers();
        let currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

        const userIndex = users.findIndex(u => u.email === currentUser.email);
        const cardIndex = users[userIndex].cards.findIndex(c => c.number === cardNumber);

        if (!/^[0-9]{4}$/.test(pin)) {
            showNotification('El PIN debe tener 4 dígitos', true);
            return;
        }

        users[userIndex].cards[cardIndex].pin = pin;
        users[userIndex].cards[cardIndex].status = 'active';

        saveUsers(users);
        sessionStorage.setItem('loggedInUser', JSON.stringify(users[userIndex]));

        updateUIForLogin(users[userIndex]);
        showNotification('Tarjeta activada correctamente');
    };

    const changeCardPin = (cardNumber, newPin) => {
        let users = getUsers();
        let currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

        const userIndex = users.findIndex(u => u.email === currentUser.email);
        const cardIndex = users[userIndex].cards.findIndex(c => c.number === cardNumber);

        if (!/^[0-9]{4}$/.test(newPin)) {
            showNotification('El PIN debe tener 4 dígitos', true);
            return;
        }

        users[userIndex].cards[cardIndex].pin = newPin;

        saveUsers(users);
        sessionStorage.setItem('loggedInUser', JSON.stringify(users[userIndex]));

        updateUIForLogin(users[userIndex]);
        showNotification('PIN de la tarjeta actualizado correctamente.');
    };

    const toggleCardStatus = (cardNumber) => {
        let users = getUsers();
        let currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

        const userIndex = users.findIndex(u => u.email === currentUser.email);
        const cardIndex = users[userIndex].cards.findIndex(c => c.number === cardNumber);

        const card = users[userIndex].cards[cardIndex];

        if (card.status === 'inactive') {
            showNotification('Debes activar la tarjeta con PIN primero', true);
            return;
        }

        card.status = card.status === 'active' ? 'blocked' : 'active';

        saveUsers(users);
        sessionStorage.setItem('loggedInUser', JSON.stringify(users[userIndex]));

        updateUIForLogin(users[userIndex]);
        showNotification(`Tarjeta ${card.status === 'active' ? 'desbloqueada' : 'bloqueada'}`);
    };

    const deleteCard = (cardNumber) => {
        if (!confirm('¿Estás seguro de que deseas cancelar esta tarjeta? Esta acción no se puede deshacer.')) {
            return;
        }

        let users = getUsers();
        let currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

        const userIndex = users.findIndex(u => u.email === currentUser.email);
        users[userIndex].cards = users[userIndex].cards.filter(c => c.number !== cardNumber);

        saveUsers(users);
        sessionStorage.setItem('loggedInUser', JSON.stringify(users[userIndex]));

        updateUIForLogin(users[userIndex]);
        showNotification('Tarjeta cancelada y eliminada correctamente.');
    };

    // Delegación de eventos para tarjetas
    userCardsContainer.addEventListener('click', (e) => {
        const button = e.target.closest('.card-action-btn');
        if (!button) return;

        const cardNumber = button.dataset.cardNumber;
        const action = button.dataset.action;
        const cardWrapper = button.closest('.card-wrapper');

        if (action === 'toggle') {
            toggleCardStatus(cardNumber);
        }

        if (action === 'delete') {
            deleteCard(cardNumber);
        }

        if (action === 'activate' || action === 'change-pin') {
            const existingPinForm = cardWrapper.querySelector('.pin-form');
            if (existingPinForm) return;

            const pinForm = document.createElement('div');
            pinForm.className = 'pin-form';
            const title = action === 'activate' ? 'Activa tu tarjeta' : 'Cambia tu PIN';
            const buttonText = action === 'activate' ? 'Activar' : 'Cambiar PIN';

            pinForm.innerHTML = `
                <h5>${title}</h5>
                <input type="password" class="pin-input" placeholder="Nuevo PIN de 4 dígitos" maxlength="4" pattern="[0-9]{4}">
                <button class="card-action-btn confirm-pin-btn" data-card-number="${cardNumber}" data-action="${action}-confirm">
                    <i class="fas fa-check"></i> ${buttonText}
                </button>
                <button class="card-action-btn cancel-pin-btn">
                    <i class="fas fa-times"></i> Cancelar
                </button>
            `;
            
            cardWrapper.querySelector('.card-actions').style.display = 'none';
            cardWrapper.appendChild(pinForm);
            pinForm.querySelector('.pin-input').focus();
        }

        if (action === 'activate-confirm' || action === 'change-pin-confirm') {
            const pinInput = cardWrapper.querySelector('.pin-input');
            const pin = pinInput.value;
            
            if (!/^[0-9]{4}$/.test(pin)) {
                showNotification('El PIN debe tener 4 dígitos', true);
                return;
            }
            
            if (action === 'activate-confirm') {
                activateCardWithPin(cardNumber, pin);
            } else {
                changeCardPin(cardNumber, pin);
            }
            
            cardWrapper.querySelector('.pin-form').remove();
            cardWrapper.querySelector('.card-actions').style.display = 'flex';
        }

        if (e.target.closest('.cancel-pin-btn')) {
            cardWrapper.querySelector('.pin-form').remove();
            cardWrapper.querySelector('.card-actions').style.display = 'flex';
        }
    });

    // --- SOLICITUD DE TARJETA ---
    goToConfirmBtn.addEventListener('click', () => {
        requestCardError.style.display = 'none';
        const cardType = cardTypeSelect.value;

        if (!cardType) {
            requestCardError.textContent = 'Por favor, selecciona un tipo de tarjeta.';
            requestCardError.style.display = 'block';
            return;
        }

        const cardTypeName = cardTypeSelect.options[cardTypeSelect.selectedIndex].text;
        confirmationText.textContent = `¿Estás seguro de que deseas solicitar la ${cardTypeName}?`;
        selectedCardType = cardType;
        cardSelectionStep.style.display = 'none';
        cardConfirmationStep.style.display = 'block';
    });

    cancelCardRequestBtn.addEventListener('click', () => {
        cardSelectionStep.style.display = 'block';
        cardConfirmationStep.style.display = 'none';
        selectedCardType = null;
    });

    confirmCardRequestBtn.addEventListener('click', () => {
        const cardType = selectedCardType;
        if (!cardType) {
            showNotification('Error al procesar la tarjeta', true);
            return;
        }
    
        let users = getUsers();
        let currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        if (userIndex === -1) {
            showNotification('Usuario no encontrado', true);
            return;
        }
    
        const newCard = cardType === 'debit'
            ? createDefaultCard(currentUser.name, users)
            : createCreditCard(currentUser.name, cardType, users);
    
        newCard.status = 'inactive';
        newCard.pin = null;
    
        users[userIndex].cards.push(newCard);
        saveUsers(users);
    
        sessionStorage.setItem('loggedInUser', JSON.stringify(users[userIndex]));
    
        renderFinalCard(newCard, currentUser);
    
        cardConfirmationStep.style.display = 'none';
        cardSuccessStep.style.display = 'block';
    
        updateUIForLogin(users[userIndex]);
        showNotification('¡Tarjeta solicitada correctamente!');
        selectedCardType = null;
    });

    const renderFinalCard = (card, user) => {
        let cardClass = '';
        let cardTypeDisplay = '';

        if (card.type === 'Debit') {
            cardClass = 'debit';
            cardTypeDisplay = 'Débito';
        } else {
            cardClass = `credit-${card.level.toLowerCase()}`;
            cardTypeDisplay = card.level.charAt(0).toUpperCase() + card.level.slice(1);
        }

        finalCardContainer.innerHTML = `
            <div class="success-summary">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <h3 style="color: var(--success); margin-bottom: 0.5rem;">¡Tarjeta Aprobada!</h3>
                    <p>Felicidades ${user.name.split(' ')[0]}, tu solicitud ha sido aprobada.</p>
                </div>
                
                <div class="card-design ${cardClass}" style="margin: 1.5rem auto; transform: scale(1.05);">
                    ${card.type === 'Credit' ? `
                        <div class="card-credit-limit">
                            Límite: ${parseFloat(card.limit).toLocaleString('es-CO', { 
                                style: 'currency', 
                                currency: 'COP' 
                            })}
                        </div>
                    ` : ''}
                    <div class="card-header">
                        <span class="card-type">${cardTypeDisplay}</span>
                        <i class="fab fa-cc-visa"></i>
                    </div>
                    <div class="card-chip"></div>
                    <div class="card-number">${card.number}</div>
                    <div class="card-footer">
                        <div class="card-holder">
                            <span>Titular</span>
                            <div>${card.holder.toUpperCase().substring(0, 20)}</div>
                        </div>
                        <div class="card-expiry">
                            <span>Válida hasta</span>
                            <div>${card.expiry}</div>
                        </div>
                    </div>
                </div>

                <div class="success-details">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                        <div>
                            <p><strong>CVV:</strong></p>
                            <div style="background: var(--lighter-gray); padding: 0.5rem; border-radius: 6px; font-family: monospace;">
                                ${card.cvv}
                            </div>
                        </div>
                        <div>
                            <p><strong>Estado:</strong></p>
                            <div style="background: var(--warning); color: white; padding: 0.5rem; border-radius: 6px; text-align: center;">
                                PENDIENTE ACTIVACIÓN
                            </div>
                        </div>
                    </div>
                    
                    <p><strong>📋 Instrucciones importantes:</strong></p>
                    <div class="next-steps-info">
                        <p>1. <strong>Activa tu tarjeta</strong> desde "Mis Tarjetas" en tu panel</p>
                        <p>2. <strong>Crea un PIN de 4 dígitos</strong> durante la activación</p>
                        <p>3. <strong>Recibirás tu tarjeta física</strong> en 5-7 días hábiles</p>
                        <p>4. Tu CVV se mostrará <strong>solo esta vez</strong>, guárdalo en un lugar seguro</p>
                    </div>
                </div>
            </div>`;
    };

    // --- CERRAR SESIÓN ---
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('loggedInUser');
        showNotification('Has cerrado sesión de forma segura.');
        updateUIForLogout();
    });

    // --- ACTUALIZACIÓN DE LA INTERFAZ ---
    const updateUIForLogin = (user) => {
        authButtons.style.display = 'none';
        userMenu.style.display = 'flex';
        welcomeUser.textContent = `Hola, ${user.name.split(' ')[0]}`;

        mainContent.style.display = 'none';
        dashboard.style.display = 'block';

        userFullName.textContent = `Bienvenido, ${user.name}`;
        userIdNumber.textContent = `Documento: ${user.idType} ${user.idNumber}`;
        userBalance.textContent = parseFloat(user.balance).toLocaleString('es-CO', { 
            style: 'currency', 
            currency: 'COP' 
        });

        transactionList.innerHTML = '';
        user.transactions.forEach(tx => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="transaction-item">
                    <div class="transaction-icon ${tx.amount < 0 ? 'expense' : 'income'}">
                        <i class="fas ${tx.amount < 0 ? 'fa-arrow-down' : 'fa-arrow-up'}"></i>
                    </div>
                    <div class="transaction-details">
                        <h4>${tx.description}</h4>
                        <p>${tx.date}</p>
                    </div>
                    <div class="transaction-amount ${tx.amount < 0 ? 'expense' : 'income'}">                        
                        ${parseFloat(tx.amount).toLocaleString('es-CO', { 
                            style: 'currency', 
                            currency: 'COP', 
                            minimumFractionDigits: 2 
                        })}
                    </div>
                </div>
            `;
            transactionList.appendChild(li);
        });

        userCardsContainer.innerHTML = '';
        user.cards.forEach(card => {
            const cardWrapper = document.createElement('div');
            cardWrapper.className = 'card-wrapper';
    
            let cardClass = '';
            if (card.type === 'Debit') {
                cardClass = 'debit';
            } else {
                cardClass = `credit-${card.level.toLowerCase()}`;
            }
    
            if (card.status === 'blocked') {
                cardClass += ' blocked';
            }
            
            const cardTypeDisplay = card.type === 'Debit' ? 'Débito' : `Crédito ${card.level.charAt(0).toUpperCase() + card.level.slice(1)}`;
            
            let statusColor = '';
            let statusText = '';
            switch(card.status) {
                case 'active':
                    statusColor = 'status-active';
                    statusText = 'ACTIVA';
                    break;
                case 'inactive':
                    statusColor = 'status-inactive';
                    statusText = 'INACTIVA';
                    break;
                case 'blocked':
                    statusColor = 'status-blocked';
                    statusText = 'BLOQUEADA';
                    break;
            }
            
            let actionButtonsHTML = '<div class="card-actions">';
            
            if (card.status === 'inactive') {
                actionButtonsHTML += `
                    <button class="card-action-btn" data-card-number="${card.number}" data-action="activate" 
                            style="background: var(--warning); color: white; border-color: var(--warning);">
                        <i class="fas fa-unlock-alt"></i> Activar
                    </button>`;
            } else {
                const actionText = card.status === 'active' ? 'Bloquear' : 'Desbloquear';
                const actionIcon = card.status === 'active' ? 'fa-lock' : 'fa-lock-open';
                
                actionButtonsHTML += `
                    <button class="card-action-btn" data-card-number="${card.number}" data-action="toggle">
                        <i class="fas ${actionIcon}"></i> ${actionText}
                    </button>
                    <button class="card-action-btn" data-card-number="${card.number}" data-action="change-pin">
                        <i class="fas fa-key"></i> Cambiar PIN
                    </button>
                    <button class="card-action-btn danger" data-card-number="${card.number}" data-action="delete">
                        <i class="fas fa-trash-alt"></i> Cancelar
                    </button>`;
            }
            actionButtonsHTML += '</div>';
    
            const creditLimitHTML = card.type === 'Credit' ? `
                <div class="card-credit-limit">
                    Línea: ${parseFloat(card.limit).toLocaleString('es-CO', { 
                        style: 'currency', 
                        currency: 'COP',
                        minimumFractionDigits: 2 
                    })}
                </div>
            ` : '';
    
            cardWrapper.innerHTML = `
                <div class="card-design ${cardClass}">
                    ${card.status !== 'active' ? `
                        <div class="card-overlay">
                            <i class="fas ${card.status === 'blocked' ? 'fa-ban' : 'fa-hourglass-half'}"></i> 
                            ${card.status === 'blocked' ? 'BLOQUEADA' : 'POR ACTIVAR'}
                        </div>
                    ` : ''}
                    
                    ${creditLimitHTML}
                    
                    <div class="card-header">
                        <span class="card-type">${cardTypeDisplay}</span>
                        <i class="fab fa-cc-visa"></i>
                    </div>
                    
                    <div class="card-chip"></div>
                    <div class="card-number">${card.number}</div>
                    
                    <div class="card-footer">
                        <div class="card-holder">
                            <span>TITULAR</span>
                            <div>${card.holder.toUpperCase().substring(0, 20)}</div>
                        </div>
                        <div class="card-expiry">
                            <span>VÁLIDA HASTA</span>
                            <div>${card.expiry}</div>
                        </div>
                    </div>
                </div>
                
                <div class="card-info">
                    <div class="card-info-item">
                        <span class="card-info-label">CVV</span>
                        <span class="card-info-value">${card.cvv}</span>
                    </div>
                    <div class="card-info-item">
                        <span class="card-info-label">ESTADO</span>
                        <span class="card-info-value ${statusColor}">${statusText}</span>
                    </div>
                </div>
                
                ${actionButtonsHTML}
            `;
            
            userCardsContainer.appendChild(cardWrapper);
        });
    };

    const updateUIForLogout = () => {
        authButtons.style.display = 'flex';
        userMenu.style.display = 'none';
        mainContent.style.display = 'block';
        dashboard.style.display = 'none';
    };

    // --- VERIFICACIÓN DE SESIÓN AL CARGAR ---
    const checkSession = () => {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        if (loggedInUser) {
            updateUIForLogin(JSON.parse(loggedInUser));
        } else {
            updateUIForLogout();
        }
    };

    checkSession();

    // --- EFECTOS VISUALES ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const scrollIndicator = document.getElementById('scrollIndicator');
    window.addEventListener('scroll', () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
        scrollIndicator.style.width = `${scrollPercent}%`;
    });

    // --- FUNCIÓN PARA DESCARGAR EXTRACTOS ---
    if (downloadStatementBtn) {
        downloadStatementBtn.addEventListener('click', () => {
            const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
            if (!user) {
                showNotification('Por favor, inicia sesión para descargar tu extracto.', true);
                return;
            }

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Encabezado
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(20);
            doc.setTextColor('#1e3a8a');
            doc.text('Banco Nova', 14, 22);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
            doc.setTextColor('#0f172a');
            doc.text('Extracto de Cuenta', 14, 30);

            const generationDate = new Date().toLocaleDateString('es-ES');
            doc.setFontSize(10);
            doc.text(`Fecha de generación: ${generationDate}`, 14, 36);

            doc.setLineWidth(0.5);
            doc.line(14, 42, 196, 42);

            // Información del cliente
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.text('Información del Cliente:', 14, 50);
            doc.setFont('helvetica', 'normal');
            doc.text(`Nombre: ${user.name}`, 14, 56);
            doc.text(`Documento: ${user.idType} ${user.idNumber}`, 14, 62);
            doc.text(`Saldo Actual: ${parseFloat(user.balance).toLocaleString('es-CO', { 
                style: 'currency', 
                currency: 'COP' 
            })}`, 120, 62);

            doc.line(14, 70, 196, 70);

            // Tabla de transacciones
            const head = [['Fecha', 'Descripción', 'Monto (COP)']];
            const body = user.transactions.map(tx => [
                tx.date,
                tx.description,
                parseFloat(tx.amount).toLocaleString('es-CO', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                })
            ]);

            doc.autoTable({
                startY: 78,
                head: head,
                body: body,
                theme: 'striped',
                headStyles: {
                    fillColor: '#1e3a8a',
                    textColor: '#ffffff'
                },
                didDrawCell: (data) => {
                    if (data.column.index === 2 && data.cell.section === 'body') {
                        const amount = parseFloat(data.cell.raw.replace(/[^0-9\.,-]+/g, '').replace('.', '').replace(',', '.'));
                        if (amount < 0) {
                            doc.setTextColor('#ef4444');
                        }
                    }
                },
                willDrawCell: (data) => {
                    doc.setTextColor('#0f172a');
                }
            });

            doc.save(`Extracto_BancoNova_${user.name.replace(/\s/g, '_')}_${generationDate}.pdf`);
            showNotification('Extracto descargado correctamente');
        });
    }

    // Validación de contraseña en tiempo real
    const passwordInput = registerForm.querySelector('input[name="password"]');
    const confirmPasswordInput = registerForm.querySelector('input[name="confirmPassword"]');

    const validatePasswords = () => {
        if (passwordInput.value && confirmPasswordInput.value) {
            if (passwordInput.value === confirmPasswordInput.value) {
                confirmPasswordInput.style.borderColor = 'var(--success)';
                passwordInput.style.borderColor = 'var(--success)';
                registerError.style.display = 'none';
            } else {
                confirmPasswordInput.style.borderColor = 'var(--danger)';
                registerError.textContent = 'Las contraseñas no coinciden.';
                registerError.style.display = 'block';
            }
        } else {
            confirmPasswordInput.style.borderColor = 'var(--lighter-gray)';
        }
    };

    if (passwordInput) passwordInput.addEventListener('input', validatePasswords);
    if (confirmPasswordInput) confirmPasswordInput.addEventListener('input', validatePasswords);
});dfhfhg