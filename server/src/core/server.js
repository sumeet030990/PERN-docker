/* eslint-disable no-console */
import cluster from 'cluster';
import config from 'config';
import http from 'http';
import { cpus } from 'os';

const Server = (app) => {
  const server = http.createServer(app);
  const port = config.get('PORT') || 5000; // for azure 8080 port is required

  // on local start only 1 thread
  if (process.env.NODE_ENV === 'localhost') {
    server.listen(port, () => {
      console.log(
        `${config.get('APP_ENV')} ${config.get('APP_NAME')} app listening on port ${port} with process id ${process.pid
        }!`,
      );
    });
  } else {
    // on qa, stage, production start multiple thread of server
    const numCPUs = cpus().length; // find no of core in cpu
    if (cluster.isMaster) {
      // Fork workers.
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      cluster.on('exit', () => {
        cluster.fork(); // create new process if any process is died
      });
    } else {
      server.listen(port, () => {
        console.log(` ${config.get('APP_NAME')} app listening on port ${port} with process id ${process.pid}!`);
      });
    }
  }
}

export default Server;
