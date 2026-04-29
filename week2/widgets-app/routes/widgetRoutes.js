import { Router } from 'express';
import * as WidgetsDao from '../daos/widgets';

const router = Router();

// GET
router.get('/', async (req, res) => {
  const widgets = await WidgetsDao.getAll()
  res.status(200).json(widgets);
})

// Create
router.post('/', async (req, res) => {
  const widget = req.body;
  if (!widget || JSON.stringify(widget) === '{}') {
    res.status(400).send('widget is required');
  } else {
    // TODO: save widget here
    const newWidget = await WidgetsDao.create(widget)
    res.status(201).send(newWidget);
  }
});

// Read - single widget
router.get('/:id', async (req, res) => {
  const widgetId = req.params.id;
  const widget = await WidgetsDao.getById(widgetId)// TODO: get widget here;
  if (widget) {
    res.json(widget);
  } else {
    res.sendStatus(404);
  }
});

// Update
router.patch('/:id', async (req, res) => {
  const widgetId = req.params.id;
  const widget = req.body;
  if (!widget || JSON.stringify(widget) === '{}') {
    res.status(400).send('widget is required"');
  } else {
    // TODO: update widget here
    await WidgetsDao.update(widgetId, widget);
    res.status(204).send();
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  const widgetId = req.params.id;
  // TODO: delete widget here
  await WidgetsDao.deleteById(widgetId)
  res.status(204).send();

});

export default router;
