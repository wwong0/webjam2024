from flask import Flask, render_template, request, redirect, url_for, jsonify
import fuzzywuzzy.process
app = Flask(__name__)
print(app.template_folder)
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods = ['POST'])
def fuzzy_search():
    query = request.json.get('query', '')
    if query != '':
        results = fuzzywuzzy.process.extract(query, data, limit = 10)
        matches = [result[0] for result in results]
    else:
        matches = []

    return jsonify(matches)



if __name__ == '__main__':
    app.run(debug=True)
