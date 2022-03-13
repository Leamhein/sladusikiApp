class Task {
	constructor(
		volunteerName,
		volunteerPhone,
		volunteerEmail,
		category,
		subCategory,
		item,
		quantity,
		time,
		status,
	) {
		this.volunteerName = volunteerName;
		this.volunteerPhone = volunteerPhone;
		this.volunteerEmail = volunteerEmail;
		this.category = category;
		this.subCategory = subCategory;
		this.item = item;
		this.quantity = quantity;
		this.time = time;
		this.status = status || TASK_STATUSES.IN_PROGRESS;
	}	
}