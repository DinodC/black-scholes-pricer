from flask import Flask
from flask import url_for, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/About/')
def about():
    return render_template('about.html')

@app.route('/Contact/')
def contact():
    return render_template('contact.html')

if __name__ == '__main__':
    app.run()
