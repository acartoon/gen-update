function ModalTab(params) {
    this._super.call(this, params);
    this.target = params.target;
    this.contentWrapper = $('[data-content=' + params.content + ']');
}


ModalTab.prototype = Object.create(CrazyModal.prototype);

ModalTab.prototype.constructor = CrazyModal;
ModalTab.prototype._super = CrazyModal;


ModalTab.prototype.toggleContent = function() {
    $('.modal-tab.show').removeClass('show');
    this.contentWrapper.addClass('show');
};

ModalTab.prototype.init = function() {
    var width = $(window).width();

    if(width < 768) {
        this.show();
        this.controller();
    } else {
        this.toggleContent();
    }
}