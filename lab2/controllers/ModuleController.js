import fs from 'node:fs';
export function getModule(req, res) {
  try {
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
    const id = req.params.id.toLowerCase();
    const mod = data.modules.find(m => m.code_module.toLowerCase() === id);

    if (!mod) {
      return res.status(404).json({ error: 'Module not found' });
    }
    res.status(200).json(mod);
  } catch (err) {
    res.status(500).json({ error: 'Data file not found' });
  }
}
