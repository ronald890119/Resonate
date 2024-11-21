function encode(number) {
	let chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
	if(number < 32) {
		return '0' + chars[number];
	}
	let result = "";

	while(number > 0) {
		result = chars[number % 32] + result;
		number = Math.floor(number / 32);
	}

	return result;
}

function encodeTransactionId(number) {
	let chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
	let result = "";

	while(number > 0) {
		result = chars[number % 32] + result;
		number = Math.floor(number / 32);
	}

	let temp = "";
	if(result.length < 3) {
		for(let i = 0; i < 3 - result.length; i++) {
			temp = temp + "0";
		}
	}

	return temp + result;
}

function getDecimal(encoded) {
	let chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
	let result = 0;

	for(let i = encoded.length - 1; i >= 0; i--) {
		if(encoded[i] === '0') {
			continue;
		} else {
			result += chars.indexOf(encoded[i]) * Math.floor(Math.pow(32, encoded.length - 1 - i));
		}
	}

	return result;
}

// TODO: Modify this function
function generateShortCode(storeId, transactionId) {
	let chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
	let startDate = new Date('2024-01-01T00:00:00');
	let now = new Date();
	let diff = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));

	let result = encode(storeId) + encode(diff) + encodeTransactionId(transactionId);
	let checksum = 0;
	for(let i = 0; i < result.length; i++) {
		checksum += chars.indexOf(result[i]);
	}

	// store date transaction checksum
	return encode(storeId) + encode(diff) + encodeTransactionId(transactionId) + encode(checksum);
}

// TODO: Modify this function
function decodeShortCode(shortCode) {
	// Logic goes here
	let chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
	let code = shortCode.substring(0, 7);
	let encodedChecksum = shortCode.substring(7);
	let checksum = 0;
	for(let i = 0; i < code.length; i++) {
		checksum += chars.indexOf(code[i]);
	}

	if(encode(checksum).localeCompare(encodedChecksum) != 0) {
		throw new Error("Invalid docket");
	}

	let transactionId = getDecimal(shortCode.substring(4, 7));
	let storeId = getDecimal(shortCode.substring(0, 2));
	let day = getDecimal(shortCode.substring(2, 4));

	if(transactionId > 10000 || storeId >= 200) {
		throw new Error("Invalid docket");
	}

	let shopDate = new Date('2024-01-01T00:00:00');
	shopDate.setDate(shopDate.getDate() + day);
	console.log(shopDate);

	return {
		storeId: storeId, // store id goes here,
		shopDate: shopDate, // the date the customer shopped,
		transactionId: transactionId, // transaction id goes here
	};
}

// ------------------------------------------------------------------------------//
// --------------- Don't touch this area, all tests have to pass --------------- //
// ------------------------------------------------------------------------------//
function RunTests() {

	var storeIds = [175, 42, 0, 9]
	var transactionIds = [9675, 23, 123, 7]

	storeIds.forEach(function (storeId) {
		transactionIds.forEach(function (transactionId) {
			var shortCode = generateShortCode(storeId, transactionId);
			var decodeResult = decodeShortCode(shortCode);
			$("#test-results").append("<div>" + storeId + " - " + transactionId + ": " + shortCode + "</div>");
			AddTestResult("Length <= 9", shortCode.length <= 9);
			AddTestResult("Is String", (typeof shortCode === 'string'));
			AddTestResult("Is Today", IsToday(decodeResult.shopDate));
			AddTestResult("StoreId", storeId === decodeResult.storeId);
			AddTestResult("TransId", transactionId === decodeResult.transactionId);
		})
	})
}

function IsToday(inputDate) {
	// Get today's date
	var todaysDate = new Date();
	// call setHours to take the time out of the comparison
	return (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0));
}

function AddTestResult(testName, testResult) {
	var div = $("#test-results").append("<div class='" + (testResult ? "pass" : "fail") + "'><span class='tname'>- " + testName + "</span><span class='tresult'>" + testResult + "</span></div>");
}