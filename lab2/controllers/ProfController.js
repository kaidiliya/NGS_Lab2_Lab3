import fs from 'node:fs';
export function getProf(req, res) {
  try {
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
    const prof = data.profs.find(p => p.number === req.params.number);

    if (!prof) {
      return res.status(404).json({ error: 'Professor not found' });
    }
    res.status(200).json(prof);
  } catch (err) {
    res.status(500).json({ error: 'Data file not found' });
  }
}
