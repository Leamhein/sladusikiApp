const TASK_STATUSES = {
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  IN_PROGRESS: 'In Progress',
}

class TaskService {
  getTasks() {
    return sheetService.getCollection(
      this.columnMapping.volunteerName,
      this.columnMapping.status,
    ).map(row => new Task(...row));
  }

  addTasks(tasksCollection) {
    tasksCollection.forEach(tasks => {
      sheetService.pushToRange(
        tasks,
        this.columnMapping
      );
      tasks.forEach(task => demandService.onTaskCreated(task.item, task.quantity));
    });
  }

  getTaskByRowIndex(rowIndex) {
    return new Task(...sheetService.getRecord(
      rowIndex,
      this.columnMapping.volunteerName,
      this.columnMapping.status,
    ));
  }

  onStatusChanged(rowIndex, newStatus) {
    const task = this.getTaskByRowIndex(rowIndex);
    if (newStatus === TASK_STATUSES.COMPLETED) {
      demandService.onTaskCompleted(task.item, task.quantity);
    } else if (newStatus === TASK_STATUSES.CANCELLED) {
      demandService.onTaskCancelled(task.item, task.quantity);
    }
  }
}

TaskService.prototype.columnMapping = {
  volunteerName: 11,
  volunteerPhone: 12,
  volunteerEmail: 13,
  category: 14,
  subCategory: 15,
  item: 16,
  quantity: 17,
  time: 18,
  status: 19,
}

const taskService = new TaskService();