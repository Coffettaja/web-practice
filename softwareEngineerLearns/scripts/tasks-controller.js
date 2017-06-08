tasksController = function() {
	let taskPage;
	let initialized = false;

	// "When rending an underscore template, we want top-level
  // variables to be referenced as part of an object. For
  // technical reasons (scope-chain search), this speeds up
  // rendering; however, more importantly, this also allows our
  // templates to look / feel more like our server-side
  // templates that use the rc (Request Context / Colletion) in
  // order to render their markup."
	 _.templateSettings.variable = "rc";

	return {
		// Any initialization tasks that need to occur when tasks.html loads
		init: function(page) {
			if (!initialized) {
				taskPage = page;  // This is kind of private

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

				// Delete a row upon delete button click
				$(taskPage)
						.find('#tblTasks tbody')
						.on('click', '.deleteRow', evt => {
								evt.preventDefault();
								$(evt.target).parents('tr').remove();
							});

				// Save task button appends a new row to the table with the task info
				// with the help of an _ template
				$(taskPage)
						.find('#saveTask')
						.click(evt => {
								evt.preventDefault();
								if ($(taskPage).find('form').valid()) {
									console.log("Inside IF");
									let task = $(taskPage).find('form').toObject();
									let rowTemplate = $('#addRow').html(); 
									$(taskPage).find('#tblTasks tbody')
											.append(_.template(rowTemplate)(task)); 
								}
							});
			
			initialized = true;
			}
		}
	} 
}(); 	/* Note the last parenthesis! Instantly executed, 
			 therefore tasksController is the return value, not the function.
			 This way no other code can construct another tasksController */