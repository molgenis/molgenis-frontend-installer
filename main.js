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

async function installPackages () {

    return new Promise(resolve => {

        readFile('./frontend_dependencies.yaml', (_, contents) => {
            const ymlContents = contents.toString('utf-8').split('\n');
            const packagesToInstall = ymlContents.filter(pkg => pkg)

            for (const pkg of packagesToInstall) {
                console.log(`installing ${pkg}`)
                execSync(`npm install --omit=dev ${pkg}`);
            }

            console.log('Cleaning up folders')
            cleanup();
            resolve();
        })
    })
}

function prepare () {

    return new Promise(resolve => {
        if (existsSync('package.json')) {
            console.log('Removing package.json');
            fsExtra.remove('package.json')
        }

        if (existsSync('package-lock.json')) {
            console.log('Removing package-lock.json');
            fsExtra.remove('package-lock.json')
        }

        if (existsSync('@molgenis-ui')) {
            console.log('Removing @molgenis-ui');
            fsExtra.emptyDirSync('@molgenis-ui');
            fsExtra.removeSync('@molgenis-ui');
        }
        if (existsSync('@molgenis')) {
            console.log('Removing @molgenis');
            fsExtra.emptyDirSync('@molgenis');
            fsExtra.removeSync('@molgenis');
        }

        console.log('Creating package.json')
        writeFileSync('package.json', packageJson);
        resolve();
    });
}

function cleanup () {
    fsExtra.moveSync('node_modules/@molgenis', '@molgenis');
    fsExtra.moveSync('node_modules/@molgenis-ui', '@molgenis-ui');
    fsExtra.emptyDirSync('node_modules');
    fsExtra.removeSync('node_modules');
}

async function execute () {
    console.log('Installer started');
    console.log('Checking for old files')
    await prepare();

    console.log('Installing packages')
    await installPackages();
}

execute();
