var counterFilter = new CounterFilter;

$('body').on('click', '[data-target="modal-filter"]', function (evt) {

    // если нажимаю на очистить поля
    if($(evt.target).hasClass('js-clear-counter')) return;
    var header = $(this).find('.dropdown__title').text();
    var btnClear = $('<div class="modal__clear text-link">Очистить</div>');

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
                this.modal.find('.modal__title').text(header);
                this.modal.find('.modal__nav').append(btnClear);
                var _this = this;

                btnClear.on('click', function () {
                    counterFilter.clearCounter(_this.modal);
                });
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
