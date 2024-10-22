import { useState } from 'react';

const InputPage = () => {
    const [formData, setFormData] = useState({
        temperature: '',
        humidity: '',
        cloud_cover: '',
        wind_speed: '',
        solar_temperature: '',
        solar_humidity: '',
        solar_cloud_cover: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/optimize_energy_usage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            console.log(JSON.stringify(result));
            // alert('Optimization result: ' + JSON.stringify(result));
        } catch (error) {
            // console.error('Error:', error);
            alert('An error occurred');
        }
    };

    return (
        <form
            id="energyUsageForm"
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto mt-[10%] p-4 bg-white shadow-lg rounded-lg dark:bg-gray-800 border-[1px] "
        >
            <div className="grid gap-4 mb-4 md:grid-cols-2">
                <div>
                    <label htmlFor="temperature" className="align-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Temperature
                    </label>
                    <input
                        type="text"
                        id="temperature"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Temperature"
                        required
                        value={formData.temperature}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="humidity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Humidity
                    </label>
                    <input
                        type="text"
                        id="humidity"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Humidity"
                        required
                        value={formData.humidity}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="cloud_cover" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Cloud Cover
                    </label>
                    <input
                        type="text"
                        id="cloud_cover"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Cloud Cover"
                        required
                        value={formData.cloud_cover}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="wind_speed" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Wind Speed
                    </label>
                    <input
                        type="text"
                        id="wind_speed"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Wind Speed"
                        required
                        value={formData.wind_speed}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="solar_temperature" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Solar Temperature
                    </label>
                    <input
                        type="text"
                        id="solar_temperature"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Solar Temperature"
                        required
                        value={formData.solar_temperature}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="solar_humidity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Solar Humidity
                    </label>
                    <input
                        type="text"
                        id="solar_humidity"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Solar Humidity"
                        required
                        value={formData.solar_humidity}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="solar_cloud_cover" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Solar Cloud Cover
                    </label>
                    <input
                        type="text"
                        id="solar_cloud_cover"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Solar Cloud Cover"
                        required
                        value={formData.solar_cloud_cover}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Submit
            </button>
        </form>
    );
};

export default InputPage;
