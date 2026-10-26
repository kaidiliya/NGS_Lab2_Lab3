import http from 'node:http';
import { getMain } from './controllers/MainController.js';
import { getStudent, createStudent, updateStudent, deleteStudent } from './controllers/StudentController.js';
import { getProf } from './controllers/ProfController.js';
import { getModule } from './controllers/ModuleController.js';

// 1. Routing table
const routes = [];

// Register a route
function addRoute(method, path, handler) {
  // Stores the parameter names found in the path
  const keys = [];
  const pattern = path.replace(/:([a-zA-Z0-9_]+)/g, (_, name) => {
    keys.push(name);
    return '([a-zA-Z0-9-]+)';
  });

  routes.push({
    method: method.toUpperCase(),
    regex: new RegExp('^' + pattern + '/?$'), // ^ and $ force the whole path to match
    keys,
    handler
  });
}


// 2. Create the server
const server = http.createServer((req, res) => {
  // res.status(code): sets the status code and returns res
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };

  // res.json(object): sends an object as JSON
  res.json = (object) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(object));
  };

  // res.send(text): sends plain text
  res.send = (text = '') => res.end(text);

  const chunks = [];
  req.on('data', (chunk) => chunks.push(chunk));
  req.on('end', () => {
    const raw = Buffer.concat(chunks).toString();

    try {
      req.body = raw ? JSON.parse(raw) : {};
    } catch (err) {

      return res.status(400).json({ error: 'Invalid JSON' });
    }

    const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;

    for (const route of routes) {
      if (route.method !== req.method) continue;

      const match = pathname.match(route.regex);
      if (!match) continue;

      // match[0] is the whole matched path, match[1], match[2], ... are the values captured by each pair of parentheses
      req.params = {};
      route.keys.forEach((key, i) => {
        req.params[key] = match[i + 1];
      });

      return route.handler(req, res);
    }
    res.status(404).json({ error: 'Route not found' });
  });
});


// 3. Register the routes of the Mosig REST API
addRoute('get', '/', getMain);
addRoute('get', '/students/:ine', getStudent);
addRoute('post', '/students', createStudent);
addRoute('put', '/students/:ine', updateStudent);
addRoute('delete', '/students/:ine', deleteStudent);
addRoute('get', '/profs/:number', getProf);
addRoute('get', '/modules/:id', getModule);


// 4. Start the server
// Port 3001 avoids a conflict with the Express version port 3000
server.listen(3001, () => console.log('Server listening on port 3001'));
