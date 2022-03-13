function makeMagic() {
  const taskFormService = new TaskFormService();
  const demands = demandService.getDemands();

  processFormResponses(taskFormService.getTaskForm());
  taskFormService.setTaskForm(demands);
}

function processFormResponses(form) {
  const responses = form.getResponses();

  form.deleteAllResponses();

  const temp = responses.map(item => item.getItemResponses())
    .filter(response => Array.isArray(response) && !!response.length)
    .map(response => {
      return response.map(response => ({
        item: response.getItem(),
        response: response.getResponse(),
        itemTitle: response.getItem().getTitle(),
      }));
    });
  const demandResponses = temp.map(response => {
    const responseObject = response
      .filter(itemResponse => !!itemResponse.response)
      .reduce((acc, item) => {
        acc[item.itemTitle] = item.response;

        return acc;
      }, {});

    return Object.keys(responseObject)
      .filter(responseItemTitle => !Object.values(TASK_FIELDS_TOITEM_TITLE_MAP).includes(responseItemTitle))
      .map(responseItemTitle => new Task(
        responseObject[TASK_FIELDS_TOITEM_TITLE_MAP.volunteerName],
        responseObject[TASK_FIELDS_TOITEM_TITLE_MAP.volunteerPhone],
        responseObject[TASK_FIELDS_TOITEM_TITLE_MAP.volunteerEmail],
        '',
        '',
        responseItemTitle,
        responseObject[responseItemTitle],
        responseObject[TASK_FIELDS_TOITEM_TITLE_MAP.time],
      ));

  });

  if (demandResponses.length) {
    taskService.addTasks(demandResponses);
  }
}

// class Task {
// 	constructor(
// 		volunteerName,
// 		volunteerPhone,
// 		volunteerEmail,
// 		category,
// 		subCategory,
// 		item,
// 		quantity,
// 		time,
// 		status,
// 	) {
// 		this.volunteerName = volunteerName;
// 		this.volunteerPhone = volunteerPhone;
// 		this.volunteerEmail = volunteerEmail;
// 		this.category = category;
// 		this.subCategory = subCategory;
// 		this.item = item;
// 		this.quantity = quantity;
// 		this.time = time;
// 		this.status = status || TASK_STATUSES.IN_PROGRESS;
// 	}	
// }

// { item: [Object],
//       response: 'leamhein@gmail.com',
//       itemTitle: 'Email' },
//     { item: [Object],
//       response: 'ULADZIMIR APENKA',
//       itemTitle: 'Name' },
//     { item: [Object], response: '576303237', itemTitle: 'Phone' },
//     { item: [Object],
//       response: '123',
//       itemTitle: 'Commited Date/Time' },
//     { item: [Object], response: '1', itemTitle: 'fruits' },
//     { item: [Object], response: '2', itemTitle: 'Bread' },
//     { item: [Object], response: '', itemTitle: 'Shampoo' },
//     { item: [Object], response: '', itemTitle: 'Tooth paste' },
//     { item: [Object], response: '', itemTitle: 'Tooth brush' },
//     { item: [Object], response: '', itemTitle: 'Blanket' },
//     { item: [Object], response: '', itemTitle: 'NAN for 2yo' },
//     { item: [Object], response: '', itemTitle: 'T-shirt Woman' }

const TASK_FIELDS_TOITEM_TITLE_MAP = {
  volunteerName: 'Name',
  volunteerPhone: 'Phone',
  volunteerEmail: 'Email',
  time: 'Commited Date/Time',
}