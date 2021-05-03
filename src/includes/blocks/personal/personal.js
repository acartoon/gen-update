$('body').on('click', '[data-target="modal-tab"]', function () {

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

    var modal = new ModalTab(params);
    modal.init();
});
$('body').on('click', '[data-target="modal-ajax"]', function () {

    var params = {
        template: $(this).attr('data-modal-template'),
        evtClickOverlay: $(this).attr('data-event-overlay'),
        evtClickBtnClose: $(this).attr('data-event-close'),
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

    var modal = new AjaxModal(params);
    modal.init();

    setInterval(function () {
        modal.replaceContent($('<p> а теперь я умный контент</p>'))
    }, 500)
});