import http from "k6/http";
import { sleep } from "k6";

const Load = [
    { target: 200, duration: '2m' },
    { target: 200, duration: '5m' },
    { target: 0, duration: '2m' }
]
const Stress = [
    { target: 100, duration: "1m" },
    { target: 100, duration: "1m" },
    { target: 200, duration: "1m" },
    { target: 200, duration: "1m" },
    { target: 0, duration: "5m" },
]
const Spike = [
    { target: 40, duration: "1m15s" },
    { target: 40, duration: "1m15s" },
    { target: 200, duration: "1m55s" },
    { target: 0, duration: "1m15s" },
]
const Soak = [
    { target: 200, duration: "1m" },
    { target: 200, duration: "9m" },
    { target: 0, duration: "1m" },
]

export let options = {
    stages: Load,
}


export default function () {
    let response;

    // /api/v1/products/
    response = http.get("http://localhost:5000/api/v1/products");

    // /api/v1/products/:id
    response = http.get("http://localhost:5000/api/v1/products/3");

    // /api/v1/products/all
    response = http.get("http://localhost:5000/api/v1/products/all");

    // /api/v1/products/
    response = http.del("http://localhost:5000/api/v1/products/998");

    // Automatically added sleep
    sleep(1);
}