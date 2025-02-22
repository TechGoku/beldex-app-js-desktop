"use strict"
require('dotenv').config();
require('events').EventEmitter.defaultMaxListeners = 25;

if (process.env.NODE_ENV !== 'development') {
	console.log = function() {}
}
//	
const {/*crashReporter, */app} = require('electron')
// if (process.env.NODE_ENV !== 'development') {
// 	{ // Crash reporting
// 		const options_template = require('../reporting/crashReporterOptions.electron')
// 		const options = JSON.parse(JSON.stringify(options_template)) // quick n dirty copy
// 		options.extra.process = "electron_main"
// 		crashReporter.start(options)
// 	}
// 	{ // Exception reporting
// 		const Raven = require('raven')
// 		const appVersion = app.getVersion()
// 		const options = require('../reporting/exceptionReporterOptions.electron')(appVersion, "electron_main")
// 		const sentry_dsn = options.sentry_dsn
// 		const raven_params = 
// 		{
// 			autoBreadcrumbs: options.autoBreadcrumbs,
// 			release: options.release,
// 			environment: options.environment,
// 			extra: options.extra
// 		}
// 		Raven.config(sentry_dsn, raven_params).install()
// 	}
// }

function isNonCriticalError(errorObject) {
	return errorObject.message === "net::ERR_CONNECTION_CLOSE" ||
		errorObject.message === "net::ERR_INTERNET_DISCONNECTED" ||
		errorObject.message === "net::ERR_CONNECTION_RESET" ||
		errorObject.message === "net::ERR_NETWORK_CHANGED" ||
		errorObject.message === "net::ERR_NETWORK_IO_SUSPENDED" ||
		errorObject.message === "net::ERR_CONNECTION_TIMED_OUT";
}

{ // `app` configuration
	const appId = "com.mymonero.mymonero-desktop" // aka bundle id; NOTE: cannot currently access package.json in production pkging (cause of asar?… needs a little work)
	app.setAppUserModelId(appId) // for Windows, primarily; before any windows set up
}
const { dialog } = require("electron")
process.on(
	'uncaughtException', 
	function(error)
	{
		// NodeJS throws a number of painful errors that are typically network-specific 
		// (these are not MyMonero bugs, but in hindsight, they should have been handled with proper try-catch logic in our codebase)
		// We're going to evaluate the error and silently return if the error type is one of these
		if (isNonCriticalError(error)) {
			return // Suppress dialog for this. We don't want people to think that MyMonero has bugs because of internet problems on their side
		}

		var errStr = "";
		const error_toString = error.toString()

		if (error_toString.indexOf("IPC_CHANNEL_CLOSED") !== -1) {
			errStr = ```Your operating system has deallocated RAM that was in use by Beldex. This often happens when a device goes into sleep or hibernate mode.
			This is not a bug in Beldex. 
			To ensure that Beldex works properly, please restart Beldex.
			Beldex will now exit.
			```;
			dialog.showErrorBox("Memory deallocated", errStr);
			process.exit(1);
		}

		errStr = "Please let us know of ";
		if (error) {
			
			errStr += "the following error message as it could be a bug:\n\n"+ error_toString
			if (error.stack) {
				errStr += "\n\n" + error.stack
			}
			if (error_toString.indexOf("electron-updater") !== -1) {
				console.error(errStr)
				return // avoid doing a dialog for this, since electron-updater emits an exception for 'no internet' (a bit excessive), and because we already show errors for those emitted in AppUpdatesController.electron.main.js
			}
		} else {
			errStr += "this issue as it could be a bug."
		}
		// temporary for hotfix
		// dialog.showErrorBox("Application Error", errStr);
	}
)
{ // Application
	const context = require('./electron_main_context').NewHydratedContext(app) // electron app can be accessed at context.app; context is injected into instances of classes described in ./electron_main_context.js
	module.exports = context
	global.context = context
}

var gotLock = app.requestSingleInstanceLock() // ensure only one instance of the app can be run... not only for UX reasons but so we don't get any conditions which might mess with db consistency
app.on('second-instance', function(argv, workingDirectory)
{ // Single instance context being passed control when user attempted to launch duplicate instance. Emit event so that main window may be focused
	app.emit('launched-duplicatively', argv) // custom event
})
if (gotLock == false) { // would be true if this is a duplicative app instance
	console.log("💬  Will quit as app should be single-instance.")
	app.quit()
	return
}