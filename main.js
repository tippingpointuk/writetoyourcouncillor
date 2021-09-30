$(document).ready(function() {
  $('#action-network-form').osdi({
    endpoint: "https://actionnetwork.org/api/v2/petitions/79303a9c-d737-4eb9-ab65-93e8a2eb421e/signatures",
    body: function() {
      if ($('#action-network-opt-in').is(":checked")){
        var email_subbed = "subscribed"
      }else{
        var email_subbed = null
      }
      console.log(email_subbed)
      return {
          "person" : {
            "given_name" : $('#action-network-form-first').val(),
            "family_name" : $('#action-network-form-last').val(),
            "postal_addresses" : [
              {
                "postal_code" : $('#action-network-form-post_code').val(),
                "country" : $('#action-network-form-country').val()
              }
            ],
            "email_addresses" : [
              {
                "address" : $('#action-network-form-email').val(),
                "status" : "subscribed"
              }
            ],

          },
          "triggers": {
            "autoresponse": {
              "enabled": true
            }
          },
          "add_tags": [
            "write_to_councillor"
          ]
      }
    },
    done: function(data, textStatus, jqXHR) {
      console.log('done');
      console.log(data);
      // Reset fields
      // $(':input','#action-network-form')
      //   .not(':button, :submit, :reset, :hidden')
      //   .val('')
      //   .prop('checked', false)
      //   .prop('selected', false);
      $('#success').html('<p class="success">You\'re in!</p>');
      window.open(`https://writetothem.com/who?pc=${$('#action-network-form-post_code').val()}`, 'name');

    },
    fail: function(jqXHR, textStatus, errorThrown) {
      console.log('fail');
      $('#success').html('<p class="fail">Sorry, that didn\'t work.</p>');
    },
    always: function(data_jqXHR, textStatus, jqXHR_errorThrown) {
      console.log('always');
    }
  });
});
