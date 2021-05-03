function ModalController() {
    this.modals = [];
    this.defaultIndex = 1000;
    this.index = this.defaultIndex;

    this.init();
}

ModalController.prototype.init = function() {
    var _this = this;

    $('body').on('click', '.overlay.show', function () {
        var typeClose = $(this).attr('data-close');
        var lastElem = _this.modals[_this.modals.length-1];
        console.log(typeClose)
        switch (typeClose) {
            case 'all' :
                $(_this.modals).each(function (val, item) {
                    item.hideModal(item.modal);
                });
                _this.modals = [];
                _this.index = _this.defaultIndex;
                lastElem.hideOverlay();
                break;
            case 'this':
                _this.refreshOverlayIndex();
                lastElem.hideModal(lastElem.modal);
                if(_this.modals.length == 0) {
                    _this.index = _this.defaultIndex;
                }
                break;
        }
    });
};

ModalController.prototype.setIndex = function(index) {
    this.index = index;
}

ModalController.prototype.getIndex = function() {
    return this.index;
}

ModalController.prototype.pushModals = function(modal) {
    this.modals.push(modal);
}

ModalController.prototype.popModals = function() {
    this.modals.pop();
}

ModalController.prototype.refreshOverlayIndex = function() {
    if(this.modals.length != 1) {
        this.modals[this.modals.length-2].refreshOverlayIndex();
    }
}

var Modals = new ModalController();