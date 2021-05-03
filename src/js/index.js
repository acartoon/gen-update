$('body').on('click', '[data-target="modal"]', function (evt) {
    evt.preventDefault();

    var params = {
        template: $(this).attr('data-modal-template'),
        evtClickOverlay: $(this).attr('data-event-overlay'),
        evtClickBtnClose: $(this).attr('data-event-close'),
        content: $(this).attr('data-id-content'),
        eventClickOverlay: $(this).attr('data-event-overlay'),
        modalsOverlay: $(this).attr('data-modal-overlay'),
        modalType: $(this).attr('data-modal-type'),
        animation: $(this).attr('data-animation-type'),
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

    var modal = new CrazyModal(params);
    modal.init();
    Modals.pushModals(modal);
});



