import { App } from './app';

const PORT = 3000;

const app = App();

app.listen(PORT, () => console.log(`listening - localhost:${PORT}`));