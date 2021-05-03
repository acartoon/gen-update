$('body').on('click', '[data-target="modal-map"]', function () {

    var params = {
        template: $(this).attr('data-modal-template'),
        evtClickOverlay: $(this).attr('data-event-overlay'),
        evtClickBtnClose: $(this).attr('data-event-close'),
        eventClickOverlay: $(this).attr('data-event-overlay'),
        modalsOverlay: $(this).attr('data-modal-overlay'),
        modalType: $(this).attr('data-modal-type'),
        animation: $(this).attr('data-animation-type'),
        content: $(this).attr('data-id-content'),
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

    var modal = new CrazyModal(params);
    modal.init();
});