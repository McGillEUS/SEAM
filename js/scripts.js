/* global jQuery */
jQuery(document).ready(function() {
    jQuery('.form-success').hide();
    jQuery('.pirate-forms-file-upload-button').on('click', function () {
        var $button = jQuery(this);
        $button.parent().find('input[type=file]').on('change', function(){
            $button.parent().find('input[type=text]').val(jQuery(this).val()).change();
        });
	    $button.parent().find('input[type=file]').focus().click();
    });

    jQuery('.pirate-forms-file-upload-input').on('click', function(){
        jQuery(this).parent().find('.pirate-forms-file-upload-button').trigger('click');
    });
    jQuery('.pirate-forms-file-upload-input').on('focus', function(){
        jQuery(this).blur();
    });
    
    jQuery('#pirate-forms-contact-submit').on('click', function(){
	var subject = document.getElementsByName("pirate-forms-contact-name")[0].value + " : " + document.getElementsByName("pirate-forms-contact-subject")[0].value
	var body = document.getElementsByName("pirate-forms-contact-message")[0].value
	var formData = {
		'subject': subject,
		'body': body,
	}
	console.log(formData)
	jQuery.post({
  		url: "http://seam.mcgilleus.ca/sendemail",
  		data: JSON.stringify(formData),
  		success: function(){jQuery('.pirate_forms_wrap').hide(); jQuery('.form-success').show();},
  		dataType: "json",
  		contentType : "application/json"
     	});
    });
});
