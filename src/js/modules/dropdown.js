function dropdownModal(params) {
    this._super.call(this, params);
    this.target = params.target;
}

dropdownModal.prototype = Object.create(CrazyModal.prototype);

dropdownModal.prototype.constructor = CrazyModal;
dropdownModal.prototype._super = CrazyModal;


dropdownModal.prototype.openDropDown = function() {
    var dropdownWrapper = this.target.closest('.dropdown');

    if(dropdownWrapper.hasClass('show')) {
        dropdownWrapper.removeClass('show');
    } else {
        $('.dropdown.show').removeClass('show');
        dropdownWrapper.addClass('show');
    }
};

dropdownModal.prototype.init = function() {

    var width = $(window).width();
    if(width < 768) {
        this.show();
        this.controller();
    } else {
        this.openDropDown();
        $('body').on('click', closeDropDown)
    }
}



