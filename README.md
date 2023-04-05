# Molgenis Frontend Installer

## Development

How to build:

```
npm run build
```

This will create a script in the ``` /dist/``` folder

## Manually Running the script on the server

> You need to have nodejs installed on the server.

1. Copy ```dist/install-frontend.js``` file to ```/usr/share/nginx/html/``` (only the file, not the folder)

2. Copy the ```manual install files/frontend_dependencies.yaml``` to ```/usr/share/nginx/html/```(only the file, not the folder)

> now you should see both the javascript and the yaml file in the same directory

3. Run the script in ```/usr/share/nginx/html/``` by typing
```node install-frontend.js```

3. Copy the ```manual install files/molgenis.conf``` to ```/etc/nginx/default.d/``` overwriting the existing file.

4. Reboot nginx.

