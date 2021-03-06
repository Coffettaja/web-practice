"use strict";
window.tasksController = function() {
	let taskPage;
	let initialized = false;

	function errorLogger(errorCode, errorMessage) {
			console.log(errorCode + ": " + errorMessage);
	}

	function updateTaskCount() {
		let count = $(taskPage).find('#tblTasks tbody tr').length;
		$('footer').find('#taskCount').text(count);
	}

	function clearTask() {
		$(taskPage).find('form').fromObject({});
	}

	// tokenizes a task using the csv library, and constructs it
	function loadTask(csvTask) {
		let tokens = $.csv.toArray(csvTask);
		if (tokens.length == 3) {
			let task = {};
			task.task = tokens[0];
			task.requiredBy = tokens[1];
			task.category = tokens[2];
			return task;
		}
		return null;
	}

	function loadFromCSV(event) {
		const reader = new FileReader();
		reader.onload = function(evt) {
		 let contents = evt.target.result;
		 let lines = contents.split('\n');
		 let tasks = [];
		 $.each(lines, function(index, val) {
		 	if (index >= 1 && val) { // header line is skipped
		 		let task = loadTask(val);
		 		if (task) {
		 			tasks.push(task);
		 		}
		 	}
		 });

		 storageEngine.saveAll('task', tasks, function() {
		 	tasksController.loadTasks();
		 }, errorLogger);
		};

		reader.onerror = function(evt) {
			errorLogger("cannot_read_file", "The file specified cannot be read.");
		};
		reader.readAsText(event.target.files[0]);
	}

	function renderTable() {
		$.each($(taskPage).find('#tblTasks tbody tr'), function(idx, row) {
			let due = Date.parse($(row).find('[datetime]').text());
			if (due.compareTo(Date.today()) < 0) {
				$(row).addClass("overdue");
			}
			else if (due.compareTo((2).days().fromNow()) <= 0) {
				$(row).addClass("warning");
			}
		});
	}

	// "When rending an underscore template, we want top-level
  // variables to be referenced as part of an object. For
  // technical reasons (scope-chain search), this speeds up
  // rendering; however, more importantly, this also allows our
  // templates to look / feel more like our server-side
  // templates that use the rc (Request Context / Colletion) in
  // order to render their markup."
	 _.templateSettings.variable = "rc";

	return {
		// Any initialization tasks that need to occur when tasks.html loads.
		// callback used to notify its client when loading has finished.
		init: function(page, callback) {
			if (initialized) {
				callback();
			}
			else {
				taskPage = page;
				storageEngine.init(function() {
					// Called here to make sure that storageEngine has already been initialized.
					storageEngine.initObjectStore('task', function() {
						callback();
					}, errorLogger);
				}, errorLogger);

				// Append star * to required fields
				$(taskPage)
						.find('[required]')
						.prev('label')
						.append('<span>*</span>')
						.children('span')
						.addClass('required');

				// On button-click, hide taskCreation section
				$(taskPage)
						.find('#btnAddTask')
						.click(evt => { 
							evt.preventDefault();
							$('#taskCreation').removeClass('not');
						});

				// Highlight rows when clicked
				$(taskPage)
						.find('#tblTasks tbody')
						.on('click', '.taskRow', evt => {
								$(evt.target)
									.closest('td')
									.siblings()
									.addBack()
									.toggleClass('rowHighlight');
							});

				$(taskPage)
					.find('#tblTasks tbody')
					.on('click', '.completeRow', function(evt) {
						storageEngine.findById('task', $(evt.target).data().taskId, function(task) {
							task.complete = true;
							storageEngine.save('task', task, function() {
								tasksController.loadTasks();
							}, errorLogger);
						}, errorLogger);
					});

				// Delete a row upon delete button click
				$(taskPage)
						.find('#tblTasks tbody')
						.on('click', '.deleteRow', function(evt) {
								storageEngine.delete('task', $(evt.target).data().taskId, function() {
									$(evt.target).parents('tr').remove();
								}, errorLogger);
							updateTaskCount();
							});

				// Edit task/row upon edit button click
				$(taskPage)
						.find('#tblTasks tbody')
						.on('click', '.editRow', function(evt) {
							$(taskPage).find('#taskCreation').removeClass('not');
							storageEngine.findById('task', $(evt.target).data().taskId, function(task) {
								$(taskPage).find('form').fromObject(task);
							}, errorLogger)
						});


				// Save task button appends a new row to the table with the task info
				// with the help of an _ template
				$(taskPage)
					.find('#saveTask')
					.click(evt => {
							evt.preventDefault();
							if ($(taskPage).find('form').valid()) {
								let task = $(taskPage).find('form').toObject();
								storageEngine.save('task', task, 
									function() {
										$(taskPage).find('#tblTasks tbody').empty();
										tasksController.loadTasks();
										clearTask();
										$(taskPage).find('#taskCreation').addClass('not');

									// function(savedTask) { // Guarantees that table is not updated unless safe succesful
									// 	let rowTemplate = $('#addRow').html(); 
									// 	$(taskPage).find('#tblTasks tbody')
									// 			.append(_.template(rowTemplate)(task)); 
								}, errorLogger);
							}
						});

				// Clears the input fields for task adding / editing
				$(taskPage)
					.find('#clearTask')
					.click(evt => {
						evt.preventDefault();
						clearTask();
					});

				$('#importFile').change(loadFromCSV);


			initialized = true;
			} // else end
		}, // init end

		loadTasks: function() {
			$(taskPage).find('#tblTasks tbody').empty();
			storageEngine.findAll('task', function(tasks) {

				// Sort by due date (closest first)
				tasks.sort(function(first, second) {
					return Date.parse(first.requiredBy).compareTo(Date.parse(second.requiredBy));
				});
				
				$.each(tasks, (index, task) => {
					if (!task.complete) { // looks stupid but probably makes sure that the property exists...
						task.complete = false;
					}
					let rowTemplate = $('#addRow').html(); 
					$(taskPage).find('#tblTasks tbody')
								.append(_.template(rowTemplate)(task)); // I wonder what I did here with (task)...
				});
			updateTaskCount();
			renderTable();
			}, errorLogger);
		}
	} 
}(); 	/* Note the last parenthesis! Instantly executed, 
			 therefore tasksController is the return value, not the function.
			 This way no other code can construct another tasksController */

