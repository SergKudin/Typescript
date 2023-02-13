// task 1
let url = 'https://api.ipify.org?format=json';
async function getResponse(url: string): Promise<any> {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`Error recuest. status response ${response.status}`)
  }
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

const urls: string[] = new Array(URL_TASK3, URL_TASK3, URL_TASK3);

Promise.all(urls.map(url => fetch(url)))
  .then(responses => Promise.all(responses.map(r => r.json())))
  .then(function (r) { console.log('task3.1'); r.forEach(r => console.log(r.name)) })
  .catch(function (err) { console.log('task3.1'); console.log(err); });

// task 3.2
promiseAll(urls.map(url => fetch(url)))
  .then(responses => promiseAll(responses.map((r: any) => r.json())))
  .then(function (r) { console.log('task3.2'); r.forEach((r: any) => console.log(r.name)) })
  .catch(function (err) { console.log('task3.2'); console.log(err); });

async function promiseAll(promises: Promise<any>[]): Promise<any> {
  const response = [];
  for (let promise of promises) {
    response.push(await promise);
  }
  return response;
}

// task 3.3
promiseAll3(urls.map(url => fetch(url)))
  .then(responses => promiseAll(responses.map((r: any) => r.json())))
  .then(function (r) { console.log('task3.3'); r.forEach((r: any) => console.log(r.name)) })
  .catch(function (err) { console.log('task3.3'); console.log(err); });

function promiseAll3(promises: Promise<any>[]): Promise<any> {
  return new Promise((resolve, reject) => {
    const results: any = [];
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

