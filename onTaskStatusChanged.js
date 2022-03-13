function onEdit(e) {
  const newStatus = e.value.toString();
  // const newStatus = TASK_STATUSES.COMPLETED;
  if (newStatus !== TASK_STATUSES.CANCELLED && newStatus !== TASK_STATUSES.COMPLETED) {
    return;
  }

  try {
    // e.source.toast('onEdit v4 ' + newStatus);
    taskService.onStatusChanged(e.range.getRowIndex(), newStatus)
    e.range.protect().setWarningOnly(true);
  } catch (ex) {
    Logger.log(ex);
    e.source.toast(ex);
  }
}

//e.range.getRowIndex()
