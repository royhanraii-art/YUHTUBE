import axios from 'axios';

const apiKey = 'dd3e936ca789d015487ecda9d59bd5fc'; 
const bearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDNlOTM2Y2E3ODlkMDE1NDg3ZWNkYTlkNTliZDVmYyIsIm5iZiI6MTczMDQwMTg2NC4xNzg2Nzg1LCJzdWIiOiI2NmQ0NzcyOGQ5YWRhMmNkZTY0Y2M3M2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.iMcYPRI0uYxYiuWBCC6psulerjvfMm_JmkLIPHCoY_0'; // Your Bearer token

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/', // TMDB base URL
    headers: {
        'Authorization': `Bearer ${bearerToken}` // Set the Bearer token here
    },
});

// Optional: Automatically append the API key to requests if needed
api.interceptors.request.use(config => {
    config.params = {
        ...config.params,
        api_key: apiKey, // Include the API key in each request if required
    };
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;