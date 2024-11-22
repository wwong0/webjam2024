from flask import Flask, render_template, request, redirect, url_for, jsonify

app = Flask(__name__)

header_text = "MONDAY"

@app.route('/')
def index():
    return render_template('index.html', header_text=header_text)

@app.route('/change-header', methods=['GET'])
def change_header():
    global header_text
    header_text = "TUESDAY"
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
