"use strict";

listenChange("#profileImage", function () {
    let extension = isValidDocument($(this), "#customValidationErrorsBox");
    if (!isEmpty(extension) && extension != false) {
        $("#customValidationErrorsBox").html("").hide();
        displayPhoto(this, "#previewImage");
    }
});

window.isValidDocument = function (inputSelector, validationMessageSelector) {
    let ext = $(inputSelector).val().split(".").pop().toLowerCase();
    if ($.inArray(ext, ["gif", "png", "jpg", "jpeg"]) == -1) {
        $(inputSelector).val("");
        $(validationMessageSelector)
            .html(Lang.get("js.validate_image_type"))
            .removeClass("d-none")
            .show();

        setTimeout(function () {
            $(validationMessageSelector).slideUp(300);
        }, 5000);

        return false;
    }
    $(validationMessageSelector).addClass("d-none");

    return ext;
};
window.displayPhoto = function (input, selector) {
    let displayPreview = true;
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                $(selector).attr("src", e.target.result);
                displayPreview = true;
            };
        };
        if (displayPreview) {
            reader.readAsDataURL(input.files[0]);
            $(selector).show();
        }
    }
};
