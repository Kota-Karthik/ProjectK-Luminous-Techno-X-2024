import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from statsmodels.tsa.arima.model import ARIMA
import joblib
import os
import time

solar_data = pd.read_csv('./data/solar_energy_data_2024.csv')
consumption_data = pd.read_csv('./data/energy_consumption_data_2024.csv')
tariff_data = pd.read_csv('./data/tariff_data_2024.csv')

scaler_consumption = StandardScaler()
scaler_solar = StandardScaler()
scaler_tariff = StandardScaler()

total = 0  

temp = None
humidity = None
cloud_cover = None
wind_speed = None
temp_solar = None
humidity_solar = None
cloud_solar = None

def setValues(temp_global, humidity_global, cloud_cover_global, wind_speed_global, temp_solar_global, humidity_solar_global, cloud_solar_global):
    global temp, humidity, cloud_cover, wind_speed
    global temp_solar, humidity_solar, cloud_solar
    
    temp = temp_global
    humidity = humidity_global
    cloud_cover = cloud_cover_global
    wind_speed = wind_speed_global
    
    temp_solar = temp_solar_global
    humidity_solar = humidity_solar_global
    cloud_solar = cloud_solar_global

def forecast_energy_consumption(consumption_data):
    X = consumption_data.drop(columns=['Date', 'Energy Consumption'])
    y = consumption_data['Energy Consumption']
    X_scaled = scaler_consumption.fit_transform(X)
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
    
    consumption_model = RandomForestRegressor(n_estimators=100, random_state=42)
    if os.path.exists("models/consumption_model.pkl"):
        with open("models/consumption_model.pkl", "rb") as f:
            consumption_model = joblib.load(f)
    else:
        start = time.time()
        consumption_model.fit(X_train, y_train)
        endtime = time.time()
        global total
        total += (endtime - start)
        with open("models/consumption_model.pkl", "wb") as f:
            joblib.dump(consumption_model, f)

    # temp = input("Enter tomorrow's temperature ")
    # humidity = input("Enter tomorrow's humidity ")
    # cloud_cover = input("Enter tomorrow's cloud cover  ")
    # wind_speed = input("Enter tomorrow's wind speed ")
    
    tomorrow_features = pd.DataFrame([[temp, humidity, cloud_cover, wind_speed, 1, 0]], columns=X.columns)
    tomorrow_features_scaled = scaler_consumption.transform(tomorrow_features)
    predicted_consumption = consumption_model.predict(tomorrow_features_scaled)
    
    return predicted_consumption[0]

def forecast_solar_energy(solar_data):
    X_solar = solar_data[['temperature_C', 'humidity_%', 'cloud_cover_%']]
    y_solar = solar_data['solar_energy_output_kWh']
    X_solar_scaled = scaler_solar.fit_transform(X_solar)
    X_train_solar, X_test_solar, y_train_solar, y_test_solar = train_test_split(X_solar_scaled, y_solar, test_size=0.2, random_state=42)
    
    solar_model = RandomForestRegressor(n_estimators=100, random_state=42)
    if os.path.exists("models/solar_model.pkl"):
        with open("models/solar_model.pkl", "rb") as f:
            solar_model = joblib.load(f)
    else:
        start = time.time()
        solar_model.fit(X_train_solar, y_train_solar)
        endtime = time.time()
        global total
        total += (endtime - start)
        with open("models/solar_model.pkl", "wb") as f:
            joblib.dump(solar_model, f)
    
    # Get user inputs for solar weather features
    # temp_solar = input("Enter tomorrow's solar temperature  ")
    # humidity_solar = input("Enter tomorrow's solar humidity  ")
    # cloud_solar = input("Enter tomorrow's solar cloud cover  ", )
    
    tomorrow_weather = pd.DataFrame([[temp_solar, humidity_solar, cloud_solar]], columns=X_solar.columns)
    tomorrow_weather_scaled = scaler_solar.transform(tomorrow_weather)
    predicted_solar_energy = solar_model.predict(tomorrow_weather_scaled)
    
    return predicted_solar_energy[0]

def forecast_tariff_rates(tariff_data):
    consumption_data = pd.read_csv('./data/energy_consumption_data_2024.csv')
    consumption_data['Date'] = pd.to_datetime(consumption_data['Date'])
    consumption_data.set_index('Date', inplace=True)
    def forecast_energy_consumption_arima(consumption_data, steps=24):
        model = ARIMA(consumption_data['Energy Consumption'], order=(5, 1, 0))
        model_fit = model.fit()
        forecast = model_fit.forecast(steps=steps)
        return forecast

    arima_forecast = forecast_energy_consumption_arima(consumption_data)
    print("ARIMA Forecast for next 24 hours:")
    print(arima_forecast)
    return arima_forecast

def calculate_energy_savings(remaining_consumption, predicted_tariffs, low_tariff_hours, peak_tariff_hour):
    peak_tariff = predicted_tariffs[peak_tariff_hour]
    low_tariff = np.mean([predicted_tariffs[hour] for hour in low_tariff_hours])
    
    energy_savings = (peak_tariff - low_tariff) * remaining_consumption
    return energy_savings

def optimize_energy_usage():
    tomorrow_consumption = forecast_energy_consumption(consumption_data)
    tomorrow_solar = forecast_solar_energy(solar_data)
    
    remaining_consumption = max(0, tomorrow_consumption - tomorrow_solar)
    predicted_tariffs = forecast_tariff_rates(tariff_data)
    
    low_tariff_hours = np.argsort(predicted_tariffs)[:int(remaining_consumption)]
    peak_tariff_hour = np.argmax(predicted_tariffs)

    energy_savings = calculate_energy_savings(remaining_consumption, predicted_tariffs, low_tariff_hours, peak_tariff_hour)

    result = {
        'predicted_energy_consumption': f'{tomorrow_consumption:.2f} kWh',
        'predicted_solar_energy': f'{tomorrow_solar:.2f} kWh',
        'remaining_consumption': f'{remaining_consumption:.2f} kWh',
        'peak_tariff_hour': int(peak_tariff_hour),
        'low_tariff_hours': low_tariff_hours.tolist(),
        'energy_savings': f'${energy_savings:.2f}',
    }

    return result


# optimize_energy_usage()