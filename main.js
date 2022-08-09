/** Made By Jelmer Veen */

import fsExtra from 'fs-extra';

import { execSync } from 'child_process';
import { existsSync, writeFileSync, readFile } from 'fs';

// A package JSON is needed for correct installation.
const packageJson = `{
   "name": "frontend-installfile",
   "version": "1.0.0",
   "description": "Installfile to locally install npm packages that are used for the Molgenis Frontend",
   "author": "Jelmer Veen <github.com/jelmerveen>",
   "license": "ISC"
}`

function createPackageJson () {
    if (!existsSync('package.json')) {
        writeFileSync('package.json', packageJson);
    }
    return;
}

async function installPackages () {

    return new Promise(resolve => {

        readFile('./frontend_dependencies.yaml', (_, contents) => {
            const ymlContents = contents.toString('utf-8').split('\n');
            const packagesToInstall = ymlContents.filter(pkg => !pkg)

            for (const pkg of packagesToInstall) {
                console.log(`installing ${pkg}`)
                execSync(`npm install --omit=dev ${pkg}`);
            }
            resolve();
        })
    })
}

function cleanup () {
    fsExtra.moveSync('node_modules/@molgenis', '@molgenis');
    fsExtra.moveSync('node_modules/@molgenis-ui', '@molgenis-ui');
    fsExtra.emptyDirSync('node_modules');
    fsExtra.removeSync('node_modules');
}

async function execute () {
    console.log('Installer started');
    console.log('Creating package.json')
    createPackageJson();

    console.log('Installing packages')
    await installPackages();

    console.log('Cleaning up folders')
    cleanup();
}

execute();
