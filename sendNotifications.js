function sendNotifications(){
	const emailText = sheetService.getSingleValue(...EMAIL_BODY_CELL);
	Logger.log(emailText)

	const demands = demandService.getDemands();

	const demandsText = demands.reduce((acc, demand) => {
		return `${acc}${demand.item}, Quantity:${demand.currentQuantity}, Comments: ${demand.comments || ''}, Expected Delivery Time: ${demand.date} ${demand.time} <br/> `;
	}, '');

	Logger.log(demandsText);

	const body =`${emailText} <br/><br/> ${demandsText}`;

	const url = "https://prod-72.westeurope.logic.azure.com:443/workflows/8d0cc62507e74833b7dc09696787babf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=dqwkXoF1x_E-flSSAFid61nVeqyQwUAmZxuvzvMRI7c"

	const emails = volunteerService.getEmails();

	const formData = {
	subject: 'Krakow, Opolska114 Volunteer Help Needed!',
	body: body,
	to: emails.join(';')
	};

	var options = {
	method : 'post',
	contentType: 'application/json',
	payload : JSON.stringify(formData)
	};  

	var response = UrlFetchApp.fetch(url, options);
	Logger.log(response.getContentText());
}
