from flask import Flask, request, jsonify
from server.main import optimize_energy_usage,setValues

app = Flask(__name__)


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

# Handle preflight requests
@app.route('/', methods=['OPTIONS'])
def options():
    response = jsonify({'message': 'CORS preflight request successful'})
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    return response

@app.route('/optimize_energy_usage', methods=['POST'])
def optimize_energy_usage_route():
    try:
        data = request.get_json()

        temp_value = data.get('temperature')
        humidity_value = data.get('humidity')
        cloud_cover_value = data.get('cloud_cover')
        wind_speed_value = data.get('wind_speed')
        temp_solar_value = data.get('solar_temperature')
        humidity_solar_value = data.get('solar_humidity')
        cloud_solar_value = data.get('solar_cloud_cover')

        setValues(temp_value, humidity_value, cloud_cover_value, wind_speed_value, 
                  temp_solar_value, humidity_solar_value, cloud_solar_value)
        output = optimize_energy_usage()  # Ensure this refers to the correct function
        print(output)
        return jsonify({'status': 'success', 'result': output})
    except Exception as e:
        return jsonify({'status': 'failed', 'error': str(e)})



if __name__ == '__main__':
    app.run(debug=True)