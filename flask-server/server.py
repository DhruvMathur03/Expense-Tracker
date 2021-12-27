from flask import Flask, request

app = Flask(__name__)

@app.route('/table')
def table():
    x = request.args.get('page')
    return f'{x}+10'

    
if __name__ == "__main__":
    app.run(debug=True)
    