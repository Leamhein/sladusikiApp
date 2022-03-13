class Demand {
	constructor(
		item,
		currentQuantity,
		commitedQuantity,
		completedQuantity,
		date,
		time,
		comments,
	) {
		this.item = item;
		this.date = date;
		this.time = time;
		this.currentQuantity = currentQuantity;
		this.commitedQuantity = commitedQuantity;
		this.completedQuantity = completedQuantity;
		this.comments = comments;
	}	
}
