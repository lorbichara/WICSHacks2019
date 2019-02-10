/* Ajax call for getting the currency*/
	var countryCurrency;
	$.ajax({
        url: 'http://country.io/currency.json',
        type: 'GET',
        dataType: "json",
        success: function(data) {
        	countryCurrency=data;
        },
        error: function() {
        	console.log('Error');
        },
    });

/* Ajax call for getting the country code*/
$.ajax({
    url: 'http://country.io/names.json',
    type: 'GET',
    dataType: "json",
    success: function(data) {
    	var newHTML = "";
    	for(var key in data)
    	{
    		newHTML += `<option value="${key}">${data[key]}</option>`;
    	}
    	$("#destinationCountry").append(newHTML);
    	console.log(data);
   	},
    error: function() {
    	console.log('Error');
    },
});

$('#calculateButton').on('click', function(event) {
	event.preventDefault();

	let countryCode = $("#destinationCountry").val();

	endpoint = 'live';
	access_key = 'd6f6935ce95233cf350f387f1323d07f';

	$.ajax({
	    url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key,  
	    dataType: 'jsonp',
	    success: function(json) {
	        let countryCurr = countryCurrency[countryCode];
	        let statement = "json.quotes.USD" + countryCurr;
	        let amount = $("#amount").val();
	        let multiplication = eval(statement) * $("#amount").val();
	        document.getElementById("exchange-rate").innerHTML= "$" + String(amount);

	        let benDeductionFee = amount * 0.10;
	        document.getElementById("beneficiaryDedFee").innerHTML= "$" + String(benDeductionFee);
	        document.getElementById("amountToConvert").innerHTML= "$" + String(amount - benDeductionFee - 40);
	    },
	    error: function() {
	    	console.log("Error");
	    }
	});
});

