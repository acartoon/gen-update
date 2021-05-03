function AjaxModal(params) {
    this._super.call(this, params);
    this.target = params.target;
    this.content = $('<p>я заглушка</p>');
}

AjaxModal.prototype = Object.create(CrazyModal.prototype);
AjaxModal.prototype.constructor = CrazyModal;
AjaxModal.prototype._super = CrazyModal;


AjaxModal.prototype.replaceContent = function(content) {
    this.content = content;
    this.modal.find('.modal__body').empty();
    this.modal.find('.modal__body').append(this.content);
}