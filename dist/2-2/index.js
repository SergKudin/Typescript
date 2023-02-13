"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// task 1
let url = 'https://api.ipify.org?format=json';
function getResponse(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        if (response.ok) {
            return response.json();
        }
        else {
            throw new Error(`Error recuest. status response ${response.status}`);
        }
    });
}
getResponse(url)
    .then(function (ip) { console.log('task1'); console.log(ip); })
    .catch(function (err) { console.log('task1'); console.log(err); });
// task 2
getResponse(url)
    .then(function (response) { console.log('task2'); console.log(response.ip); })
    .catch(function (err) { console.log('task2'); console.log(err); });
// task 3.1
const URL_TASK3 = 'https://random-data-api.com/api/name/random_name';
const urls = new Array(URL_TASK3, URL_TASK3, URL_TASK3);
Promise.all(urls.map(url => fetch(url)))
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(function (r) { console.log('task3.1'); r.forEach(r => console.log(r.name)); })
    .catch(function (err) { console.log('task3.1'); console.log(err); });
// task 3.2
promiseAll(urls.map(url => fetch(url)))
    .then(responses => promiseAll(responses.map((r) => r.json())))
    .then(function (r) { console.log('task3.2'); r.forEach((r) => console.log(r.name)); })
    .catch(function (err) { console.log('task3.2'); console.log(err); });
function promiseAll(promises) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = [];
        for (let promise of promises) {
            response.push(yield promise);
        }
        return response;
    });
}
// task 3.3
promiseAll3(urls.map(url => fetch(url)))
    .then(responses => promiseAll(responses.map((r) => r.json())))
    .then(function (r) { console.log('task3.3'); r.forEach((r) => console.log(r.name)); })
    .catch(function (err) { console.log('task3.3'); console.log(err); });
function promiseAll3(promises) {
    return new Promise((resolve, reject) => {
        const results = [];
        let resolvedCount = 0;
        promises.forEach((promise, index) => {
            promise
                .then((result) => {
                results[index] = result;
                resolvedCount++;
                if (resolvedCount === promises.length) {
                    resolve(results);
                }
            })
                .catch((err) => reject(err));
        });
    });
}
