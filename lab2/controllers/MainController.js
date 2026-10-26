import fs from 'node:fs';
export function getMain(req, res) {
  try {
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
    const result = {
      name: data.name,
      _links: {
        students: { href: '/students' },
        profs: { href: '/profs' },
        modules: { href: '/modules' }
      },
      head: data.responsibles.map(num => {
        const prof = data.profs.find(p => p.number === num);
        return {
          name: `${prof.lastname} ${prof.firstname[0]}.`,
          href: `/profs/${num}`
        };
      })
    };
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Data file not found' });
  }
}
