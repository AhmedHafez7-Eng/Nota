const addBox = document.querySelector('.add-box'),
    popupBox = document.querySelector('.popup-box'),
    popupBoxClose = document.querySelector('.popup-box header i');


addBox.addEventListener('click', () => {
    popupBox.classList.add('show');
});

popupBoxClose.addEventListener('click', () => {
    popupBox.classList.remove('show');
});