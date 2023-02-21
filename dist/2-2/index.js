import fetch from "node-fetch";
const url = 'https://api.ipify.org?format=json';
async function getResponse(url) {
    const response = await fetch(url);
    if (response.ok) {
        return response.json();
    }
    else {
        throw new Error(`Error recuest. status response ${response.status}`);
    }
}
getResponse(url)
    .then(function (ip) { console.log('task1'); console.log(ip); })
    .catch(function (err) { console.error('task1'); console.error(err); });
getResponse(url)
    .then(function (response) { console.log('task2'); console.log(response.ip); })
    .catch(function (err) { console.error('task2'); console.error(err); });
const URL_TASK3 = 'https://random-data-api.com/api/name/random_name';
const urls = [URL_TASK3, URL_TASK3, URL_TASK3];
Promise.all(urls.map(url => fetch(url)))
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(function (r) { console.log('task3.2'); r.forEach((r) => console.log(r.name)); })
    .catch(function (err) { console.error('task3.1'); console.error(err); });
promiseAll(urls.map(url => fetch(url)))
    .then(responses => promiseAll(responses.map((r) => r.json())))
    .then(function (r) { console.log('task3.2'); r.forEach((r) => console.log(r.name)); })
    .catch(function (err) { console.error('task3.2'); console.error(err); });
async function promiseAll(promises) {
    const response = [];
    for (const promise of promises) {
        response.push(await promise);
    }
    return response;
}
promiseAll3(urls.map(url => fetch(url)))
    .then(responses => promiseAll3(responses.map((r) => r.json())))
    .then(function (r) { console.log('task3.3'); r.forEach((r) => console.log(r.name)); })
    .catch(function (err) { console.error('task3.3'); console.error(err); });
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
const URL_TASK4 = 'https://random-data-api.com/api/users/random_user';
function loadJson(url) {
    return fetch(url)
        .then((response) => response.json());
}
function checkGender(user) {
    return user.gender === 'Female';
}
function checkEndOutUserDate(n) {
    return loadJson(URL_TASK4)
        .then((user) => {
        console.log(`task 4.1 n = ${n}, \tuser name = ${user.first_name}, \tgender = ${user.gender}, \tgenderFamale = ${checkGender(user)}`);
        if (!checkGender(user)) {
            checkEndOutUserDate(++n);
        }
    })
        .catch((err) => console.error(err));
}
checkEndOutUserDate(1);
async function loadJson2(url) {
    const response = await fetch(url);
    return await response.json();
}
async function checkEndOutUserDate2(n) {
    try {
        const user = await loadJson2(URL_TASK4);
        console.log(`task 4.2 n = ${n}, \tuser name = ${user.first_name}, \tgender = ${user.gender}, \tgenderFamale = ${checkGender(user)}`);
        if (!checkGender(user)) {
            checkEndOutUserDate2(++n);
        }
    }
    catch (err) {
        return console.error(err);
    }
}
checkEndOutUserDate2(1);
const currentIP = '188.130.177.112';
function callBack(task, param) {
    console.log(task, 'Message func callback:');
    console.log(`you current IP = ${param}`);
    return param;
}
async function f1(callBack) {
    console.log('Task5.\nRun f1...');
    setTimeout(function () {
        console.log('...stop timer f1');
    }, 1000);
    return callBack('Task 5', currentIP);
}
let result = async function () {
    console.log('task5 Start f2');
    return f1(callBack);
};
console.log(`check task5: ${await result()}`);
async function task6F1(url) {
    let response = await fetch(url);
    let obj = await response.json();
    return await obj.ip;
}
async function task6F2(url, f1, callBack) {
    let currIP = await f1(url);
    console.log(`task6 f2. Current IP = ${currIP}`);
    callBack('Task 6', currIP);
}
task6F2(url, task6F1, callBack);
//# sourceMappingURL=index.js.map