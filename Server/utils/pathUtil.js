import path from 'path';
import { fileURLToPath } from 'url';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);
const directoryName = path.join(__dirname, '..');

export default directoryName;