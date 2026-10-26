import express from 'express';
import { getMain } from './controllers/MainController.js';
import { getStudent, createStudent, updateStudent, deleteStudent } from './controllers/StudentController.js';
import { getProf } from './controllers/ProfController.js';
import { getModule } from './controllers/ModuleController.js';
import bodyParser from 'body-parser';



const app = express();
const port = 3000;
app.use(bodyParser.json());

app.get('/', getMain);
app.get('/students/:ine', getStudent);
app.post('/students', createStudent);
app.put('/students/:ine', updateStudent);
app.delete('/students/:ine', deleteStudent);

app.get('/profs/:number', getProf);
app.get('/modules/:id', getModule);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
