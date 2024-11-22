from flask import Flask, render_template, request, redirect, url_for, jsonify
import fuzzywuzzy.process
import datetime
import weekly_menu
app = Flask(__name__)

data = weekly_menu.Weekly_Menu(datetime.date.today())

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/fuzz_search', methods = ['POST'])
def fuzzy_search():
    query = request.json.get('query', {})
    search_term = query.get('search_term', '')
    date = query.get('date')
    hall = query.get('hall')
    meal_type = query.get('meal_type')
    vegan = query.get('vegan')
    vegetarian = query.get('vegetarian')
    search_order = query.get('search_order')
    asc_desc = query.get('asc_desc')

    searched_data = data.search(date, meal_type, hall, vegan, vegetarian, search_order, asc_desc)

    searched_data_dict = {}
    for idx, row in searched_data.reset_index().iterrows():
        name = row['Item']
        if name is not None:
            searched_data_dict[str(name)] = row

    matches = []
    if search_term:
        results = fuzzywuzzy.process.extract(search_term, searched_data_dict.keys(), limit = 10)
        for result in results:
            name = result[0]
            row = searched_data_dict[name]
            matches.append(row.to_dict())
    else:
        for name, row in searched_data_dict.items():
            matches.append(row.to_dict())

    return jsonify(matches)




if __name__ == '__main__':
    app.run(debug=True)
