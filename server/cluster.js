/** cluster.js **/
const os = require("os");
const cluster = require("cluster");

if (cluster.isMaster) {
    const number_of_cpus = os.cpus().length;
    for (let index = 0; index < number_of_cpus; index++) {
        cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            console.log(`Worker ${worker.process.pid} died`);
            cluster.fork();
        }
    });
} else {
    require("./index");
}
