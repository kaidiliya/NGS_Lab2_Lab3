import fs from 'node:fs';
export function getStudent(req, res) {
  try {
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
    const student = data.students.find(s => s.ine === req.params.ine);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: 'Data file not found' });
  }
}
// POST
export function createStudent(req, res) {
  try {
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
    const student = req.body;

    if (!student.ine || !student.lastname || !student.firstname) {
      return res.status(400).json({ error: 'ine, lastname and firstname are required' });
    }
    if (data.students.some(s => s.ine === student.ine)) {
      return res.status(409).json({ error: 'Student already exists' });
    }

    data.students.push(student);
    fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: 'Data file error' });
  }
}

// PUT
export function updateStudent(req, res) {
  try {
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
    const index = data.students.findIndex(s => s.ine === req.params.ine);

    if (index === -1) {
      return res.status(404).json({ error: 'Student not found' });
    }

    data.students[index] = { ...data.students[index], ...req.body, ine: req.params.ine };
    fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
    res.status(200).json(data.students[index]);
  } catch (err) {
    res.status(500).json({ error: 'Data file error' });
  }
}

// DELETE
export function deleteStudent(req, res) {
  try {
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
    const index = data.students.findIndex(s => s.ine === req.params.ine);

    if (index === -1) {
      return res.status(404).json({ error: 'Student not found' });
    }

    data.students.splice(index, 1);
    fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Data file error' });
  }
}
