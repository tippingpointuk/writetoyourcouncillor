const sendFormToAN = function() {
  if ($('#action-network-opt-in').is(":checked")){
    var email_subbed = "subscribed"
  }else{
    var email_subbed = null
  }
  console.log(email_subbed)
  var formBody = {
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
          "address" : $('#action-network-form-email').val()
        }
      ],
      "custom_fields":{}
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
  if ($('#action-network-opt-in').is(":checked")){
    formBody["person"]["email_addresses"][0]['status'] = "subscribed";
    formBody["person"]['custom_fields']['subscribed'] = "subscribed";
  }else{
    // formBody["person"]["email_addresses"][0]['status'] = "unsubscribed";
    formBody["person"]['custom_fields']['subscribed'] = false;
  }
  console.log(formBody);
  return formBody;
}
const copyLetterText = function(e){
  console.log(e);
  var letterText = $("#letter-text").text();
  navigator.clipboard.writeText(letterText);
}

const afterFormSubmit = function(data, textStatus, jqXHR) {
  console.log('done');
  console.log(data);

  $('#success').html('<p class="success">You\'re in!</p>');
  var letterText = $("#letter-text").text();
  var lettertextLineList = letterText.split("\n")
  for (var i in lettertextLineList){
    lettertextLineList[i] = lettertextLineList[i].trim();
  }
  var letterText = lettertextLineList.join('\n\n')
  navigator.clipboard.writeText(letterText);
  var procede = window.confirm(
    `We are about to redirect you to WriteToThem, where you can write to one of your representatives.`);
  if (procede){
    window.open(`https://writetothem.com/who?pc=${$('#action-network-form-post_code').val()}`, 'name');
  }
  // Reset fields
  $(':input','#action-network-form')
    .not(':button, :submit, :reset, :hidden')
    .val('')
    .prop('checked', false)
    .prop('selected', false);
}

const anSubmitFailed = function(jqXHR, textStatus, errorThrown) {
  console.log('fail');
  $('#success').html('<p class="fail">Sorry, that didn\'t work.</p>');
}

$(document).ready(function() {
  $('#action-network-form').osdi({
    endpoint: "https://actionnetwork.org/api/v2/petitions/79303a9c-d737-4eb9-ab65-93e8a2eb421e/signatures",
    body: sendFormToAN,
    done: afterFormSubmit,
    fail: anSubmitFailed,
    always: function(data_jqXHR, textStatus, jqXHR_errorThrown) {
      console.log('always');
    }
  });
});

$("#action-network-form").keyup(function(e) {
  $("#first-name-in-letter").html($('#action-network-form-first').val());
  $("#last-name-in-letter").html($('#action-network-form-last').val());
  $("#post-code-in-letter").html($('#action-network-form-post_code').val());
})

$("#copy-letter-text").on("click",copyLetterText)
