$('body').on('click', '.js-select-delivery', function () {
    var nameId = $(this).attr('id');
    var name = $(this).attr('name');
    var value = $('[for="' + nameId + '"]').text();

    $('[data-dropdown-type=' + name +'] .dropdown__title').text(value)
})