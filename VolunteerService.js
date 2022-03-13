class VolunteerService {
	getVolunteers() {
		return sheetService.getCollection(
			this.columnMapping.email,
			this.columnMapping.isSubscribed,
		).map(row => new Volunteer(...row));
	}

	getEmails() {
		return this.getVolunteers().map(vol => vol.email);
	}

	addVolunteer(email, name, phone) {
		sheetService.pushToRange(
			[new Volunteer(email, name, phone, true)],
			this.columnMapping
		);
	}
}

VolunteerService.prototype.columnMapping = {
  email: 21,
  name: 22,
  phone: 23,
  isSubscribed: 24,
}

const volunteerService = new VolunteerService();