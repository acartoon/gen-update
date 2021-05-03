/**
 * сворачивает все выпадающие блоки
 * */
function closeDropDown(evt) {
    var _this = $(evt.target);
    if(_this.closest('.dropdown').length) return;
    $('.dropdown.show').removeClass('show');
    $('body').off('click', closeDropDown);

}

$('body').on('click', '[data-target="modal-dropdown"]', function () {

    var params = {
        template: $(this).attr('data-modal-template'),
        evtClickOverlay: $(this).attr('data-event-overlay'),
        evtClickBtnClose: $(this).attr('data-event-close'),
        content: $(this).attr('data-id-content'),
        eventClickOverlay: $(this).attr('data-event-overlay'),
        modalsOverlay: $(this).attr('data-modal-overlay'),
        modalType: $(this).attr('data-modal-type'),
        animation: $(this).attr('data-animation-type'),
        target: $(this),
        cb: {
            beforeOpen: function () {

            },
            afterOpen: function () {

            },
            beforeClose: function () {

            },
            afterClose: function () {

            },
        }
    }

    var modal = new dropdownModal(params);
    modal.init();
})

