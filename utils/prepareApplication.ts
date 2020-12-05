import { createInitialDirs } from './files';

export async function prepareApplication() {
    await createInitialDirs()
}