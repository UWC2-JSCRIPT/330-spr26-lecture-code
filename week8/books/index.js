import mongoose from 'mongoose';
import server from './server';

const port = process.env.PORT || 3000;

mongoose
  .connect('mongodb://127.0.0.1:27017/jscript-330-week-8', {})
  .then(() => {
    server.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is listening on http://localhost:${port}`);
    });
  });
