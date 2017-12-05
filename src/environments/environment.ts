// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCYr1QkvkI0mgbbso0lTMiVQ3Gc-qzQGlg',
    authDomain: 'voting-app-mcc-fewd.firebaseapp.com',
    databaseURL: 'https://voting-app-mcc-fewd.firebaseio.com',
    projectId: 'voting-app-mcc-fewd',
    storageBucket: 'voting-app-mcc-fewd.appspot.com',
    messagingSenderId: '210770723469'
  }
};
