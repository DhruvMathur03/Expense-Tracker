from flask import Flask, request
import json

app = Flask(__name__)

@app.route('/table')
def table():
    x = request.args.get('amt')
    y = request.args.get('purp')
    resp = {
        "purpose": y,
        "amount": x
    }
    return json.dumps(resp)

if __name__ == "__main__":
    app.run(debug=True)
    