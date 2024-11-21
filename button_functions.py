from flask import Flask, request, render_template

@app.route('/mealplanner', methods=['POST', 'GET'])
def mealplanner():
    error = None
    if request.method == 'POST':
        meals = request.form.getlist('meal')  # Get all selected checkboxes

        return f"Selected meals: {', '.join(meals)}"
    
    # The code below is executed if the request method was GET or credentials were invalid
    return render_template('index.html', error=error)
