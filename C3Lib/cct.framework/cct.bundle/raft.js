(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cct"] = factory();
	else
		root["cct"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdatecct"];
/******/ 	this["webpackHotUpdatecct"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = 10000;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "a7e8b1e7035a8b148a8d"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest().then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 1;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate).then(function(result) {
/******/ 				deferred.resolve(result);
/******/ 			}, function(err) {
/******/ 				deferred.reject(err);
/******/ 			});
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					dependency = moduleOutdatedDependencies[i];
/******/ 					cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(i = 0; i < callbacks.length; i++) {
/******/ 					cb = callbacks[i];
/******/ 					try {
/******/ 						cb(moduleOutdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "accept-errored",
/******/ 								moduleId: moduleId,
/******/ 								dependencyId: moduleOutdatedDependencies[i],
/******/ 								error: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err;
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return Promise.resolve(outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(277)(__webpack_require__.s = 277);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(46);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var core = __webpack_require__(0);
var ctx = __webpack_require__(16);
var hide = __webpack_require__(17);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["Log"] = Log;
/* harmony export (immutable) */ __webpack_exports__["setLog"] = setLog;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toArray__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_argCheck__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_utils__ = __webpack_require__(13);






var _logFunctions, _logColors;




/**
 * A log interface that is exposed via the singleton `cct.log`.
 *
 * Log messages are sent using one of the five log functions, one for each log level:
 * {@link Log#error}, {@link Log#warning}, {@link Log#info}, {@link Log#debug}, {@link Log#verbose}.
 *
 * Each message is sent to a log category, which is identified by a string. The log level
 * of each category can be set separately, allowing heigher or lower log levels to be
 * set for specific categories.
 *
 * The log messages that don't get filtered out because of their level are forwarded
 * to the log handler for that log level. The default log handlers will use the built-in
 * `console` functions to print the category in square brackets followed by the message.
 *
 * @example <caption>Show all messages and in color, except for own events</caption>
 * cct.log.setLogLevel('own-events', cct.log.NONE);
 * cct.log.setLogLevel(cct.log.VERBOSE);
 * cct.log.color = true;
 *
 * @example <caption>Logging an info message in the gizmo category</caption>
 * cct.log.info('gizmo', 'widget initialized');
 *
 * @abstract
 * @class Log
 */
function Log() {
  this._defaultLogLevel = this.WARNING;
  this._categoryLevels = {};
  this._logHandlers = {};
}

/**
 * @callback LogHandlerFunction
 *
 * @param {number} mask - The log level mask of the message.
 * @param {string} category - The message category.
 * @param {string} message - The log message.
 */

/**
 * Sets the log handler for one or more log levels. The handler will be called whenever
 * anything is logged that doesn't get filtered because of it's log level.
 *
 * Setting a log handler will replace the default log handler for that log level.
 *
 * @example <caption>Setting log handler for multiple levels</caption>
 * log.setLogHandler(log.ERROR|log.WARNING, function (mask, category, ...args) {
 *     ...
 * });
 *
 * @param {number} [levels=ALL] - A mask that describles which log levels the handler
 *  should be applied to. If omitted the handler will be used for all log levels.
 * @param {LogHandlerFunction} handler - The log handler that will be called.
 */
Log.prototype.setLogHandler = function (levels, handler) {
  if (arguments.length <= 1) {
    handler = levels;
    levels = this.ALL;
  }
  if (typeof levels !== 'number') {
    throw new TypeError('Log.setLogHandler: levels must be a number');
  }
  if (typeof handler !== 'function' && handler) {
    throw new TypeError('Log.setLogHandler: handler must be a function');
  }
  this.levels.forEach(function (level, index) {
    if (1 << index & levels) {
      this._logHandlers[level] = handler;
    }
  }.bind(this));
};

/**
 * Sets the log level either globally, or for a specific category.
 * The log handler will only be called for messages whose log level is
 * equal or lower than the log level for that category.
 *
 * The log level of any category is equal to the specific log level that has
 * been set for that category, and if none has been set, the gobal log level.
 *
 * @param {string} [category] - Optional log category to set the level of.
 *  If this is excluded, the global log level will be set instead.
 * @param {number} level - The new log level.
 */
Log.prototype.setLogLevel = function (category, level) {
  if (arguments.length <= 1) {
    level = category;
    if (typeof level !== 'number') {
      throw new TypeError('Log.setLogLevel: level must be a number');
    }
    this._defaultLogLevel = level;
  } else {
    if (typeof category !== 'string') {
      throw new TypeError('Log.setLogLevel: category must be a string');
    }
    if (typeof level !== 'number') {
      throw new TypeError('Log.setLogLevel: level must be a number');
    }
    this._categoryLevels[category] = level;
  }
};

function createLogFunction(level, mask) {
  return function (category, message) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    __WEBPACK_IMPORTED_MODULE_3_common_argCheck__["a" /* default */].string('log.' + level, 'category', category);
    var logLevel = 0;
    if (typeof category !== 'string') {
      throw new TypeError('Log.' + level + ': category has to be a string');
    }
    if (category in this._categoryLevels) {
      logLevel = this._categoryLevels[category];
    } else {
      logLevel = this._defaultLogLevel;
    }
    if (logLevel < mask) {
      return;
    }
    if (typeof message === 'string') {
      __WEBPACK_IMPORTED_MODULE_3_common_argCheck__["a" /* default */].string('log.' + level, 'message', message);
    } else {
      var object = message;
      __WEBPACK_IMPORTED_MODULE_3_common_argCheck__["a" /* default */].object('log.' + level, 'object', object);

      var _args = args,
          _args2 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toArray___default()(_args),
          objectMessage = _args2[0],
          objectArgs = _args2.slice(1);

      __WEBPACK_IMPORTED_MODULE_3_common_argCheck__["a" /* default */].string('log.' + level, 'object message', objectMessage);

      message = object + ' ' + objectMessage;
      args = objectArgs;
    }
    var handler = this._logHandlers[level];
    if (handler) {
      handler.call.apply(handler, [this, mask, category, message].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(args)));
    }
  };
}

/**
 * An array of the names of all log levels, in lowercase.
 * @type {string[]}
 */
Log.prototype.levels = ['error', 'warning', 'info', 'debug', 'verbose'];

Log.prototype.levels.forEach(function (level, index) {
  var mask = 1 << index;
  Log.prototype[level.toUpperCase()] = mask;
  Log.prototype[level] = createLogFunction(level, mask);
});

/**
 * The error log function. Will call the error log handler if the log
 * level of the given category is set to error or higher.
 * @function Log#error
 * @param {string} category - The category of this log message
 * @param {...*} args - The rest of the arguments to pass to the log handler
 */
/**
 * The warning log function. Will call the warning log handler if the log
 * level of the given category is set to warning or higher.
 * @function Log#warning
 * @param {string} category - The category of this log message
 * @param {...*} args - The rest of the arguments to pass to the log handler
 */
/**
 * The info log function. Will call the info log handler if the log
 * level of the given category is set to info or higher.
 * @function Log#info
 * @param {string} category - The category of this log message
 * @param {...*} args - The rest of the arguments to pass to the log handler
 */
/**
 * The debug log function. Will call the debug log handler if the log
 * level of the given category is set to debug or higher.
 * @function Log#debug
 * @param {string} category - The category of this log message
 * @param {...*} args - The rest of the arguments to pass to the log handler
 */
/**
 * The verbose log function. Will call the verbose log handler if the log
 * level of the given category is set to verbose or higher.
 * @function Log#verbose
 * @param {string} category - The category of this log message
 * @param {...*} args - The rest of the arguments to pass to the log handler
 */

/**
 * Log level representing no logging at all.
 * @member {number} Log#NONE
 * @readonly
 */
/**
 * Error level.
 * @member {number} Log#ERROR
 * @readonly
 */
/**
 * Warning level.
 * @member {number} Log#WARNING
 * @readonly
 */
/**
 * Info level.
 * @member {number} Log#INFO
 * @readonly
 */
/**
 * Debug level.
 * @member {number} Log#DEBUG
 * @readonly
 */
/**
 * Verbose level.
 * @member {number} Log#VERBOSE
 * @readonly
 */
/**
 * Log level representing a mask of all log levels.
 * @member {number} Log#ALL
 * @readonly
 */

Log.prototype.NONE = 0;
Log.prototype.ALL = Log.prototype.levels.reduce(function (mask, ignored, index) {
  return mask | 1 << index;
}, 0);

var log = new Log();

/* harmony default export */ __webpack_exports__["default"] = (log);

function setLog(_log) {
  log = _log;
}

/**
 * Whether or not the default log handler should use color to represent log levels.
 * @member {boolean} Log#color
 */

var logFunctions = (_logFunctions = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_logFunctions, log.ERROR, (console.error || console.log).bind(console)), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_logFunctions, log.WARNING, (console.warn || console.log).bind(console)), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_logFunctions, log.INFO, (console.info || console.log).bind(console)), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_logFunctions, log.DEBUG, (console.debug || console.log).bind(console)), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_logFunctions, log.VERBOSE, console.log.bind(console)), _logFunctions);
var logColors = (_logColors = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_logColors, log.ERROR, '#F74333'), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_logColors, log.WARNING, '#F79743'), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_logColors, log.INFO, '#3343F7'), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_logColors, log.DEBUG, '#43C733'), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_logColors, log.VERBOSE, '#F743F7'), _logColors);

function defaultLogHandler(level, category, message) {
  var _logFunctions$level;

  for (var _len2 = arguments.length, args = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
    args[_key2 - 3] = arguments[_key2];
  }

  (_logFunctions$level = logFunctions[level]).call.apply(_logFunctions$level, [console, '[' + category + '] ' + message].concat(args));
}

function colorLogHandler(level, category, message) {
  for (var _len3 = arguments.length, args = Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
    args[_key3 - 3] = arguments[_key3];
  }

  if (this.color) {
    var _logFunctions$level2;

    (_logFunctions$level2 = logFunctions[level]).call.apply(_logFunctions$level2, [console, '%c[' + category + ']%c ' + message].concat(['color: ' + logColors[level], 'color:'], args));
  } else {
    var _logFunctions$level3;

    (_logFunctions$level3 = logFunctions[level]).call.apply(_logFunctions$level3, [console, '[' + category + '] ' + message].concat(args));
  }
}

log.color = false;
log.colors = logColors;

var defaultHandler;

if (__WEBPACK_IMPORTED_MODULE_4_common_utils__["isChrome"] || __WEBPACK_IMPORTED_MODULE_4_common_utils__["isFirefox"]) {
  defaultHandler = colorLogHandler;
} else {
  defaultHandler = defaultLogHandler;
}

log.setLogHandler(log.ALL, defaultHandler);
log.defaultHandler = defaultHandler;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(55)('wks');
var uid = __webpack_require__(40);
var Symbol = __webpack_require__(6).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(110), __esModule: true };

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(105);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(64);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(36);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(36);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(15);
var IE8_DOM_DEFINE = __webpack_require__(72);
var toPrimitive = __webpack_require__(57);
var dP = Object.defineProperty;

exports.f = __webpack_require__(12) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);



function optArgCheck(prop) {
  return function (context, name, value, extra) {
    if (value !== undefined && value !== null) {
      try {
        this[prop](context, name, value, extra);
      } catch (e) {
        e.message += ' if present';
        throw e;
      }
    }
    return value;
  };
}

var argCheck = {
  count: function count(context, requiredCount, actualCount) {
    if (requiredCount > actualCount) {
      throw new TypeError(context + ' requires at least' + requiredCount + ' arguments');
    }
  },
  error: function error(context, name, criteria) {
    if ((typeof context === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(context)) === 'object') {
      context = context.constructor && context.constructor.name || 'Unknown';
      context += ' constructor';
    }
    throw new TypeError(context + ': argument \'' + name + '\' must ' + criteria);
  },
  optObject: optArgCheck('object'),
  object: function object(context, name, value) {
    if ((typeof value === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(value)) !== 'object') {
      this.error(context, name, 'be an object');
    } else if (value === null) {
      this.error(context, name, 'be an object, not null');
    } else if (Array.isArray(value)) {
      this.error(context, name, 'be an object, not an array');
    } else if (value instanceof RegExp) {
      this.error(context, name, 'be an object, not a RegExp instance');
    }
    return value;
  },
  optInstance: optArgCheck('instance'),
  instance: function instance(context, name, value, constructor) {
    if (!constructor) {
      throw new Error('Failed instance argument check for ' + name + ' in ' + context + ', constructor is ' + constructor + '.');
    }
    if (Array.isArray(constructor)) {
      var atLeastOneMatch = constructor.some(function (constructor) {
        return value instanceof constructor;
      });
      if (!atLeastOneMatch) {
        var names = constructor.map(function (constructor) {
          return constructor.name;
        }).join(', ');
        this.error(context, name, 'be an instance of any of ' + names);
      }
    } else if (!(value instanceof constructor)) {
      this.error(context, name, 'be an instance of ' + constructor.name);
    }
    return value;
  },

  optFunc: optArgCheck('func'),
  func: function func(context, name, value) {
    if (typeof value !== 'function') {
      this.error(context, name, 'be a function');
    }
    return value;
  },
  optArray: optArgCheck('array'),
  array: function array(context, name, value) {
    if (!Array.isArray(value)) {
      this.error(context, name, 'be an array');
    }
    return value;
  },
  optString: optArgCheck('string'),
  string: function string(context, name, value) {
    if (typeof value !== 'string') {
      this.error(context, name, 'be a string');
    } else if (value === '') {
      this.error(context, name, 'not be an empty string');
    }
    return value;
  },
  optStringOrEmpty: optArgCheck('string'),
  stringOrEmpty: function stringOrEmpty(context, name, value) {
    if (typeof value !== 'string') {
      this.error(context, name, 'be a string');
    }
    return value;
  },
  optValues: optArgCheck('values'),
  values: function values(context, name, value, _values) {
    if (_values.indexOf(value) === -1) {
      this.error(context, name, 'be one of ' + _values.join(', '));
    }
    return value;
  },
  optNumber: optArgCheck('number'),
  number: function number(context, name, value) {
    if (isNaN(value)) {
      this.error(context, name, 'not be NaN');
    } else if (!isFinite(value)) {
      this.error(context, name, 'not be Infinite');
    } else if (typeof value !== 'number') {
      this.error(context, name, 'be a number');
    }
    return value;
  },
  optBoolean: optArgCheck('boolean'),
  boolean: function boolean(context, name, value) {
    if (typeof value !== 'boolean') {
      this.error(context, name, 'be a boolean');
    }
    return value;
  },
  options: function options(context, name, value) {
    this.object(context, name, value);
    return new OptionsArgChecker(context, name, value);
  },
  optOptions: function optOptions(context, name, value) {
    if (value !== undefined) {
      try {
        return this.options(context, name, value);
      } catch (e) {
        e.message += ' if present';
        throw e;
      }
    }
    return new OptionsArgChecker(0, 0, 0, true);
  }
};

/* harmony default export */ __webpack_exports__["a"] = (argCheck);

function OptionsArgChecker(context, name, value, empty) {
  this.context = context;
  this.name = name;
  this.value = value;
  this.empty = empty;
}

function optOptionsArgCheck(type) {
  return function (prop, extra) {
    if (!this.empty && prop in this.value) {
      if (this.value[prop] !== undefined && this.value[prop] !== null) {
        try {
          this[type](prop, extra);
        } catch (e) {
          e.message += ' if present';
          throw e;
        }
      }
    }
    return this;
  };
}

OptionsArgChecker.prototype = {
  optObject: optOptionsArgCheck('object'),
  object: function object(prop) {
    if (!this.empty) {
      argCheck.object(this.context, this.name + '.' + prop, this.value[prop]);
    }
    return this;
  },
  optInstance: optOptionsArgCheck('instance'),
  instance: function instance(prop, constructor) {
    if (!this.empty) {
      argCheck.instance(this.context, this.name + '.' + prop, this.value[prop], constructor);
    }
    return this;
  },
  optFunc: optOptionsArgCheck('func'),
  func: function func(prop) {
    if (!this.empty) {
      argCheck.func(this.context, this.name + '.' + prop, this.value[prop]);
    }
    return this;
  },
  optArray: optOptionsArgCheck('array'),
  array: function array(prop) {
    if (!this.empty) {
      argCheck.array(this.context, this.name + '.' + prop, this.value[prop]);
    }
    return this;
  },
  optString: optOptionsArgCheck('string'),
  string: function string(prop) {
    if (!this.empty) {
      argCheck.string(this.context, this.name + '.' + prop, this.value[prop]);
    }
    return this;
  },
  optStringOrEmpty: optOptionsArgCheck('stringOrEmpty'),
  stringOrEmpty: function stringOrEmpty(prop) {
    if (!this.empty) {
      argCheck.stringOrEmpty(this.context, this.name + '.' + prop, this.value[prop]);
    }
    return this;
  },
  optValues: optOptionsArgCheck('values'),
  values: function values(prop, _values2) {
    if (!this.empty) {
      argCheck.values(this.context, this.name + '.' + prop, this.value[prop], _values2);
    }
    return this;
  },
  optNumber: optOptionsArgCheck('number'),
  number: function number(prop) {
    if (!this.empty) {
      argCheck.number(this.context, this.name + '.' + prop, this.value[prop]);
    }
    return this;
  },
  optBoolean: optOptionsArgCheck('boolean'),
  boolean: function boolean(prop) {
    if (!this.empty) {
      argCheck.boolean(this.context, this.name + '.' + prop, this.value[prop]);
    }
    return this;
  }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(21)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["find"] = find;
/* harmony export (immutable) */ __webpack_exports__["fill"] = fill;
/* harmony export (immutable) */ __webpack_exports__["filter"] = filter;
/* harmony export (immutable) */ __webpack_exports__["forEach"] = forEach;
/* harmony export (immutable) */ __webpack_exports__["map"] = map;
/* harmony export (immutable) */ __webpack_exports__["mapValues"] = mapValues;
/* harmony export (immutable) */ __webpack_exports__["values"] = values;
/* harmony export (immutable) */ __webpack_exports__["diff"] = diff;
/* harmony export (immutable) */ __webpack_exports__["toArray"] = toArray;
/* harmony export (immutable) */ __webpack_exports__["hiddenProp"] = hiddenProp;
/* harmony export (immutable) */ __webpack_exports__["prop"] = prop;
/* harmony export (immutable) */ __webpack_exports__["getter"] = getter;
/* harmony export (immutable) */ __webpack_exports__["range"] = range;
/* harmony export (immutable) */ __webpack_exports__["defer"] = defer;
/* harmony export (immutable) */ __webpack_exports__["shallowCopy"] = shallowCopy;
/* harmony export (immutable) */ __webpack_exports__["assign"] = assign;
/* harmony export (immutable) */ __webpack_exports__["wait"] = wait;
/* harmony export (immutable) */ __webpack_exports__["randomString"] = randomString;
/* harmony export (immutable) */ __webpack_exports__["arrayBufferSha1IfSupported"] = arrayBufferSha1IfSupported;
/* harmony export (immutable) */ __webpack_exports__["base64ToUtf8"] = base64ToUtf8;
/* harmony export (immutable) */ __webpack_exports__["utf8ToBase64"] = utf8ToBase64;
/* harmony export (immutable) */ __webpack_exports__["urlSafeBase64ToUtf8"] = urlSafeBase64ToUtf8;
/* harmony export (immutable) */ __webpack_exports__["utf8ToUrlSafeBase64"] = utf8ToUrlSafeBase64;
/* harmony export (immutable) */ __webpack_exports__["binaryStringToArrayBuffer"] = binaryStringToArrayBuffer;
/* harmony export (immutable) */ __webpack_exports__["unicodeStringToArrayBuffer"] = unicodeStringToArrayBuffer;
/* harmony export (immutable) */ __webpack_exports__["arrayBufferToBinaryString"] = arrayBufferToBinaryString;
/* harmony export (immutable) */ __webpack_exports__["arrayBufferToUnicodeString"] = arrayBufferToUnicodeString;
/* harmony export (immutable) */ __webpack_exports__["parseDataUri"] = parseDataUri;
/* harmony export (immutable) */ __webpack_exports__["createDataUri"] = createDataUri;
/* harmony export (immutable) */ __webpack_exports__["blobToArrayBuffer"] = blobToArrayBuffer;
/* harmony export (immutable) */ __webpack_exports__["bufferToFile"] = bufferToFile;
/* harmony export (immutable) */ __webpack_exports__["bufferToHex"] = bufferToHex;
/* harmony export (immutable) */ __webpack_exports__["hexToBuffer"] = hexToBuffer;
/* harmony export (immutable) */ __webpack_exports__["concatenateArrayBuffers"] = concatenateArrayBuffers;
/* harmony export (immutable) */ __webpack_exports__["noVendor"] = noVendor;
/* harmony export (immutable) */ __webpack_exports__["registerInstance"] = registerInstance;
/* harmony export (immutable) */ __webpack_exports__["unregisterInstance"] = unregisterInstance;
/* harmony export (immutable) */ __webpack_exports__["priv"] = priv;
/* harmony export (immutable) */ __webpack_exports__["assertPriv"] = assertPriv;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFirefox", function() { return isFirefox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isChrome", function() { return isChrome; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "browser", function() { return browser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIE", function() { return isIE; });
/* harmony export (immutable) */ __webpack_exports__["isObject"] = isObject;
/* harmony export (immutable) */ __webpack_exports__["notInNode"] = notInNode;
/* harmony export (immutable) */ __webpack_exports__["maybeConvertStringToNumber"] = maybeConvertStringToNumber;
/* harmony export (immutable) */ __webpack_exports__["getStringByteLength"] = getStringByteLength;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReadOnlyMap", function() { return ReadOnlyMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReadOnlySet", function() { return ReadOnlySet; });
/* harmony export (immutable) */ __webpack_exports__["createTimedBuffer"] = createTimedBuffer;
/* harmony export (immutable) */ __webpack_exports__["errorForwarder"] = errorForwarder;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_typeof__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_core_js_object_create__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_core_js_object_create___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_babel_runtime_core_js_object_create__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_promise__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_babel_runtime_core_js_object_define_property__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_babel_runtime_core_js_set__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_babel_runtime_core_js_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_babel_runtime_core_js_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_babel_runtime_core_js_object_keys__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_babel_runtime_core_js_object_keys__);















function find(collection, func, thisArg) {
  for (var key in collection) {
    if (collection.hasOwnProperty(key)) {
      if (func.call(thisArg, collection[key], key, collection)) {
        return collection[key];
      }
    }
  }
  return null;
}

function fill(array) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  var len = array.length | 0;

  for (var i = 0; i < len; i += 1) {
    array[i] = value;
  }

  return array;
}

function filter(collection, func, thisArg) {
  var arr = [];
  for (var key in collection) {
    if (collection.hasOwnProperty(key)) {
      if (func.call(thisArg, collection[key], key, collection)) {
        arr.push(collection[key]);
      }
    }
  }
  return arr;
}

function forEach(collection, func, thisArg) {
  for (var key in collection) {
    if (collection.hasOwnProperty(key)) {
      func.call(thisArg, collection[key], key, collection);
    }
  }
}

function map(collection, func, thisArg) {
  var arr = [];
  for (var key in collection) {
    if (collection.hasOwnProperty(key)) {
      arr.push(func.call(thisArg, collection[key], key, collection));
    }
  }
  return arr;
}

function mapValues(collection, func, thisArg) {
  var obj = {};
  for (var key in collection) {
    if (collection.hasOwnProperty(key)) {
      obj[key] = func.call(thisArg, collection[key], key, collection);
    }
  }
  return obj;
}

function values(collection) {
  if (!collection) {
    return [];
  }
  if (Array.isArray(collection)) {
    throw new TypeError('tried to call utils.values() on array');
  }
  return __WEBPACK_IMPORTED_MODULE_12_babel_runtime_core_js_object_keys___default()(collection).map(function (key) {
    return collection[key];
  });
}

function diff(collection1, collection2) {
  var set1 = new __WEBPACK_IMPORTED_MODULE_11_babel_runtime_core_js_set___default.a(collection1);
  var set2 = new __WEBPACK_IMPORTED_MODULE_11_babel_runtime_core_js_set___default.a(collection2);
  var added = [];
  var removed = [];
  set1.forEach(function (element) {
    if (!set2.has(element)) {
      removed.push(element);
    }
  });
  set2.forEach(function (element) {
    if (!set1.has(element)) {
      added.push(element);
    }
  });
  return [added, removed];
}

function toArray(arrayLike) {
  var arr = [];
  for (var i = 0; i < arrayLike.length; i += 1) {
    arr[i] = arrayLike[i];
  }
  return arr;
}

function hiddenProp(obj, name, value) {
  __WEBPACK_IMPORTED_MODULE_10_babel_runtime_core_js_object_define_property___default()(obj, name, {
    enumerable: false,
    configurable: true,
    writable: false,
    value: value
  });
}

function prop(obj, name, func) {
  __WEBPACK_IMPORTED_MODULE_10_babel_runtime_core_js_object_define_property___default()(obj, name, {
    enumerable: true,
    configurable: false,
    writable: false,
    value: func
  });
}

function getter(obj, name, func) {
  __WEBPACK_IMPORTED_MODULE_10_babel_runtime_core_js_object_define_property___default()(obj, name, {
    enumerable: true,
    configurable: false,
    get: func
  });
}

function range(from, to, step) {
  if (arguments.length === 1) {
    to = from;
    from = 0;
    step = 1;
  } else if (arguments.length === 2) {
    step = 1;
  }
  var arr = [];
  for (var i = from; i < to; i += step) {
    arr.push(i);
  }
  return arr;
}

function defer() {
  var deferred = {};
  deferred.promise = new __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
}

function shallowCopy(obj, keys) {
  if (!obj) {
    return null;
  }
  var result = {};
  var key;
  if (keys) {
    for (var index in keys) {
      key = keys[index];
      result[key] = obj[key];
    }
  } else {
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = obj[key];
      }
    }
  }
  return result;
}

function assign(obj, other, keys) {
  if (!obj) {
    return null;
  }
  if (!other) {
    return obj;
  }
  var key;
  if (keys) {
    for (var index in keys) {
      key = keys[index];
      obj[key] = other[key];
    }
  } else {
    for (key in other) {
      if (other.hasOwnProperty(key)) {
        obj[key] = other[key];
      }
    }
  }
  return obj;
}

function wait(time) {
  return function () {
    var args = arguments;
    return new __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_promise___default.a(function (resolve) {
      setTimeout(function () {
        resolve.apply(null, args);
      }, time);
    });
  };
}

function randomString(size) {
  var array = null;
  var now;
  var i;
  var crypto = noVendor(globalObject, 'crypto');
  if (false) {
    array = require('crypto').randomBytes(size);
  } else if (crypto && window.Uint8Array) {
    array = new window.Uint8Array(size);
    crypto.getRandomValues(array);
  } else {
    now = new Date().getTime();
    array = [];
    for (i = 0; i < size; i += 1) {
      array[i] = Math.random() * now & 255;
    }
  }

  var rawString = String.fromCharCode.apply(null, array);
  var base64String = utf8ToBase64(rawString);
  return base64String.replace(/\-_/g, '').slice(0, size);
}

function arrayBufferSha1IfSupported(arrayBuffer) {
  var subtleCrypto = window.crypto && window.crypto.subtle;
  if (subtleCrypto && subtleCrypto.digest) {
    return subtleCrypto.digest('SHA-1', arrayBuffer);
  }
  return __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_promise___default.a.resolve(null);
}

function base64ToUtf8(base64) {
  if (false) {
    /* global global */
    return global.Buffer.from(base64, 'base64').toString('utf8');
  } else {
    return atob(base64);
  }
}

function utf8ToBase64(utf8) {
  if (false) {
    /* global global */
    return global.Buffer.from(utf8, 'utf8').toString('base64');
  } else {
    return btoa(utf8);
  }
}

function urlSafeBase64ToUtf8(urlSafeBase64) {
  return base64ToUtf8(urlSafeBase64.replace(/[-_]/g, charFromUrlSafeBase64));
}

function utf8ToUrlSafeBase64(utf8) {
  return utf8ToBase64(utf8).replace(/[+/=]/g, charToUrlSafeBase64);
}

function charToUrlSafeBase64(char) {
  switch (char) {
    case '+':
      return '-';
    case '/':
      return '_';
  }
  return '';
}

function charFromUrlSafeBase64(char) {
  switch (char) {
    case '-':
      return '+';
    case '_':
      return '/';
  }
  return '';
}

function binaryStringToArrayBuffer(binaryString) {
  var buffer = new ArrayBuffer(binaryString.length);
  var view = new Uint8Array(buffer);
  var length = binaryString.length;
  for (var i = 0; i < length; i += 1) {
    view[i] = binaryString.charCodeAt(i);
  }
  return buffer;
}

function unicodeStringToArrayBuffer(unicodeString) {
  var buffer = new ArrayBuffer(unicodeString.length * 2);
  var view = new Uint16Array(buffer);
  var length = unicodeString.length;
  for (var i = 0; i < length; i += 1) {
    view[i] = unicodeString.charCodeAt(i);
  }
  return buffer;
}

function bufferViewToString(view) {
  var chunkSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0x1000;

  var length = view.length;
  var result = '';
  for (var i = 0; i < length; i += chunkSize) {
    result += String.fromCharCode.apply(null, view.subarray(i, i + chunkSize));
  }
  return result;
}

function arrayBufferToBinaryString(buffer) {
  var view = new Uint8Array(buffer.buffer || buffer, buffer.byteOffset, buffer.byteLength);
  return bufferViewToString(view);
}

function arrayBufferToUnicodeString(buffer) {
  var view = new Uint16Array(buffer.buffer || buffer, buffer.byteOffset, buffer.byteLength >> 1);
  return bufferViewToString(view);
}

function parseDataUri(dataUri) {
  var split = dataUri.split(/:|;|,/g);
  if (split[0] !== 'data') {
    throw new Error('invalid data uri: ' + dataUri.slice(0, 100));
  }
  if (split[2] !== 'base64') {
    throw new Error('invalid data uri: ' + dataUri.slice(0, 100));
  }
  return {
    mimeType: split[1],
    binaryString: base64ToUtf8(split[3])
  };
}

function createDataUri(_ref) {
  var mimeType = _ref.mimeType,
      binaryString = _ref.binaryString;

  return 'data:' + mimeType + ';base64,' + utf8ToBase64(binaryString);
}

function blobToArrayBuffer(blob) {
  var reader = new FileReader();
  return new __WEBPACK_IMPORTED_MODULE_9_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
}

function bufferToFile(buffer, fileName, mimeType) {
  var file = new Blob([buffer], {
    type: mimeType
  });
  file.name = fileName;
  file.lastModifiedDate = new Date();
  return file;
}

function bufferToHex(buffer) {
  var view = new Uint8Array(buffer);
  return Array.prototype.map.call(view, function (x) {
    return ('00' + x.toString(16)).slice(-2);
  }).join('');
}

function hexToBuffer(hex) {
  if (hex.length % 2 !== 0) {
    throw new TypeError('hexToBuffer: hex length must be even');
  }
  var buffer = new Uint8Array(hex.length / 2);
  for (var i = 0; hex.substr(i, 2); i += 2) {
    buffer[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return buffer;
}

function concatenateArrayBuffers(buffers) {
  var totalLength = 0;
  for (var index in buffers) {
    totalLength += buffers[index].byteLength;
  }

  var result = new Uint8Array(totalLength);
  var offset = 0;
  for (var _index in buffers) {
    var view = new Uint8Array(buffers[_index]);
    result.set(view, offset);
    offset += view.byteLength;
  }

  return result;
}

function noVendor(obj, name) {
  var upper = name[0].toUpperCase() + name.slice(1);
  var unprefixed = obj[name] || obj['moz' + upper] || obj['webkit' + upper] || obj['ms' + upper];
  if (!unprefixed) {
    return null;
  }
  if (typeof unprefixed === 'function') {
    return unprefixed.bind(obj);
  } else {
    return unprefixed;
  }
}

var globalObject;
if (false) {
  /* global global */
  globalObject = global;
} else {
  globalObject = window;
}

if (globalObject) {
  globalObject.__C3_SDK_INSTANCES__ = {
    listeners: new __WEBPACK_IMPORTED_MODULE_11_babel_runtime_core_js_set___default.a(),
    addListener: function addListener(listener) {
      this.listeners.add(listener);
    },
    removeListener: function removeListener(listener) {
      this.listeners.delete(listener);
    }
  };
}

function registerInstance(collectionName, instance) {
  if (globalObject) {
    var collection = globalObject.__C3_SDK_INSTANCES__[collectionName];
    if (!collection) {
      globalObject.__C3_SDK_INSTANCES__[collectionName] = [instance];
    } else if (collection.indexOf(instance) === -1) {
      collection.push(instance);
    }
    globalObject.__C3_SDK_INSTANCES__.listeners.forEach(function (listener) {
      listener('added', collectionName, instance);
    });
  }
}

function unregisterInstance(collectionName, instance) {
  if (globalObject) {
    var collection = globalObject.__C3_SDK_INSTANCES__[collectionName];
    var index = collection.indexOf(instance);
    if (index !== -1) {
      collection.splice(index, 1);
    }
    globalObject.__C3_SDK_INSTANCES__.listeners.forEach(function (listener) {
      listener('removed', collectionName, instance);
    });
  }
}

function priv(constructor) {
  var args = [priv];
  var len = arguments.length;
  for (var i = 1; i < len; i += 1) {
    args[i] = arguments[i];
  }
  var instance = __WEBPACK_IMPORTED_MODULE_8_babel_runtime_core_js_object_create___default()(constructor.prototype);
  constructor.apply(instance, args);
  return instance;
}

function assertPriv(name, providedPriv) {
  if (priv !== providedPriv) {
    throw new TypeError(name + ': cannot be used as a constructor');
  }
}

var isFirefox = /firefox/i.test(typeof navigator !== 'undefined' && navigator.userAgent);
var isGoogle = /google inc/i.test(typeof navigator !== 'undefined' && navigator.vendor);
var isChrome = isGoogle && /chrome/i.test(typeof navigator !== 'undefined' && navigator.userAgent);
var browser = isChrome ? 'chrome' : isFirefox ? 'firefox' : 'other';
// Internet Explorer 6-11
var isIE = /* @cc_on!@*/false || !!globalObject.document && !!globalObject.document.documentMode;

function isObject(obj) {
  return (typeof obj === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_typeof___default()(obj)) === 'object' && obj !== null && !Array.isArray(obj) && !(obj instanceof RegExp);
}

function notInNode(thing) {
  if (false) {
    throw new TypeError(thing + ' is not available in NodeJS');
  }
}

function maybeConvertStringToNumber(string) {
  if (!isNaN(string)) {
    if (Number(string) % 1 === 0) {
      return parseInt(string);
    }
    return parseFloat(string);
  }
  return string;
}

function getStringByteLength(string) {
  var bytes = string.length;
  for (var i = string.length - 1; i >= 0; i -= 1) {
    var charCode = string.charCodeAt(i);
    if (charCode > 0x7f && charCode <= 0x7ff) {
      bytes += 1;
    } else if (charCode > 0x7ff && charCode <= 0xffff) {
      bytes += 2;
    }if (charCode >= 0xDC00 && charCode <= 0xDFFF) {
      // trailing surrogate
      i -= 1;
    }
  }
  return bytes;
}

/**
 * A read-only version of the built-in Map class.
 *
 * @class ReadOnlyMap
 */
var ReadOnlyMap = function (_Map) {
  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(ReadOnlyMap, _Map);

  function ReadOnlyMap() {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, ReadOnlyMap);

    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (ReadOnlyMap.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(ReadOnlyMap)).call(this));

    if (arguments.length) {
      throw new TypeError('ReadOnlyMap does not support constructor arguments');
    }
    return _this;
  }

  /**
   * The number of entries in the map.
   *
   * @member {number} ReadOnlyMap#size
   */

  /**
   * Provides a way to iterate through all the entries in this map. Each entry is represented
   * by an array with two elements, were the first element is the key and the second is the value.
   *
   * @function ReadOnlyMap#entries
   * @returns {Iterator<Array<*>>} - An iterator of all entries in this map.
   */

  /**
   * Provited a way to iterate though all the keys in this map.
   *
   * @function ReadOnlyMap#keys
   * @returns {Iterator<*>} - An iterator of all keys in this map.
   */

  /**
   * Provited a way to iterate though all the values in this map.
   *
   * @function ReadOnlyMap#values
   * @returns {Iterator<*>} - An iterator of all values in this map.
   */

  /**
   * Returns the value for the given key.
   *
   * @function ReadOnlyMap#get
   * @param {*} key - The key of the value to retreive.
   * @returns {*} The value, if it exists, `undefined` otherwise
   */

  /**
   * Returns true if the map has an entry for the given key.
   *
   * @function ReadOnlyMap#has
   * @param {*} key - The key to look for.
   */

  /**
   * Synchronously calls an interator function once for each entry in the map.
   *
   * Errors thrown inside the iterator function will cancel the iteration
   *
   * @function ReadOnlyMap#forEach
   * @param {ReadOnlyMapForEachCallback} func - The iterator function.
   * @param {*} [thisArg] - The value to use as `this` inside the iterator function.
   */

  /**
   * The iterator function passed to {@link ReadOnlyMap#forEach}.
   *
   * @callback ReadOnlyMapForEachCallback
   * @param {*} key - The key of the current entry.
   * @param {*} value - The value of the current entry.
   * @param {ReadOnlyMap} map - The map itself.
   */

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(ReadOnlyMap, [{
    key: 'set',
    value: function set() {
      throw new TypeError('Map is read-only');
    }
  }, {
    key: 'delete',
    value: function _delete() {
      throw new TypeError('Map is read-only');
    }
  }, {
    key: 'clear',
    value: function clear() {
      throw new TypeError('Map is read-only');
    }

    /* private */

  }, {
    key: '_set',
    value: function _set(key, value) {
      return __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(ReadOnlyMap.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(ReadOnlyMap.prototype), 'set', this).call(this, key, value);
    }
  }, {
    key: '_delete',
    value: function _delete(key) {
      return __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(ReadOnlyMap.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(ReadOnlyMap.prototype), 'delete', this).call(this, key);
    }
  }, {
    key: '_clear',
    value: function _clear() {
      return __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(ReadOnlyMap.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(ReadOnlyMap.prototype), 'clear', this).call(this);
    }
  }]);

  return ReadOnlyMap;
}(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map___default.a);

var ReadOnlySet = function (_Set2) {
  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(ReadOnlySet, _Set2);

  function ReadOnlySet() {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, ReadOnlySet);

    var _this2 = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (ReadOnlySet.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(ReadOnlySet)).call(this));

    if (arguments.length) {
      throw new TypeError('ReadOnlySet does not support constructor arguments');
    }
    return _this2;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(ReadOnlySet, [{
    key: 'add',
    value: function add() {
      throw new TypeError('Set is read-only');
    }
  }, {
    key: 'delete',
    value: function _delete() {
      throw new TypeError('Set is read-only');
    }
  }, {
    key: 'clear',
    value: function clear() {
      throw new TypeError('Set is read-only');
    }
  }, {
    key: '_add',
    value: function _add(value) {
      return __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(ReadOnlySet.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(ReadOnlySet.prototype), 'add', this).call(this, value);
    }
  }, {
    key: '_delete',
    value: function _delete(value) {
      return __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(ReadOnlySet.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(ReadOnlySet.prototype), 'delete', this).call(this, value);
    }
  }, {
    key: '_clear',
    value: function _clear() {
      return __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(ReadOnlySet.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(ReadOnlySet.prototype), 'clear', this).call(this);
    }
  }]);

  return ReadOnlySet;
}(__WEBPACK_IMPORTED_MODULE_11_babel_runtime_core_js_set___default.a);

function createTimedBuffer(time, callback) {
  var args = [];
  var timeout = 0;
  return function (arg) {
    args.push(arg);
    if (!timeout) {
      timeout = setTimeout(onTimeout, time);
    }
    function onTimeout() {
      timeout = 0;
      try {
        callback(args);
      } catch (error) {
        console.error('error in timed buffer callback: ' + error);
      }
      args = [];
    }
  };
}

function errorForwarder(handler, location) {
  return function (error) {
    if (!location) {
      handler(error);
    } else {
      var newError = new Error('Error in ' + location + ': ' + error.message);
      newError.reason = error;
      handler(newError);
    }
  };
}

/**
 * Types that can be serialized as JSON.
 *
 * This is identical to the parameters that can be passed to the built-in `JSON.stringify`.
 * Circular references are not allowed, and `toJSON` methods will be used.
 *
 * @typedef JsonTypes {string|number|boolean|null|Array<JsonTypes>|Object<JsonTypes>}
 */

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(33);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(10);
var createDesc = __webpack_require__(26);
module.exports = __webpack_require__(12) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(68);
var defined = __webpack_require__(49);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(125)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(51)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(144), __esModule: true };

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(49);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(16);
var call = __webpack_require__(75);
var isArrayIter = __webpack_require__(73);
var anObject = __webpack_require__(15);
var toLength = __webpack_require__(39);
var getIterFn = __webpack_require__(66);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(10).f;
var has = __webpack_require__(20);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(142), __esModule: true };

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(81);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(128);
var global = __webpack_require__(6);
var hide = __webpack_require__(17);
var Iterators = __webpack_require__(24);
var TO_STRING_TAG = __webpack_require__(5)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 34 */,
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(79);
var enumBugKeys = __webpack_require__(50);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(99);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(98);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(172);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(164);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(15);
var dPs = __webpack_require__(101);
var enumBugKeys = __webpack_require__(50);
var IE_PROTO = __webpack_require__(54)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(61)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(85).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(56);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 42 */
/***/ (function(module, exports) {



/***/ }),
/* 43 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(31);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(108), __esModule: true };

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(3);
var core = __webpack_require__(0);
var fails = __webpack_require__(21);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(160), __esModule: true };

/***/ }),
/* 49 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 50 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(41);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(80);
var hide = __webpack_require__(17);
var has = __webpack_require__(20);
var Iterators = __webpack_require__(24);
var $iterCreate = __webpack_require__(123);
var setToStringTag = __webpack_require__(28);
var getPrototypeOf = __webpack_require__(78);
var ITERATOR = __webpack_require__(5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(40)('meta');
var isObject = __webpack_require__(14);
var has = __webpack_require__(20);
var setDesc = __webpack_require__(10).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(21)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(43);
var createDesc = __webpack_require__(26);
var toIObject = __webpack_require__(19);
var toPrimitive = __webpack_require__(57);
var has = __webpack_require__(20);
var IE8_DOM_DEFINE = __webpack_require__(72);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(12) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(55)('keys');
var uid = __webpack_require__(40);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 56 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(14);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(41);
var wksExt = __webpack_require__(59);
var defineProperty = __webpack_require__(10).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);


/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
var document = __webpack_require__(6).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(17);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(107), __esModule: true };

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(143), __esModule: true };

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(45);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(24);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(7);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(97);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(31);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(33);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 70 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 71 */,
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(12) && !__webpack_require__(21)(function () {
  return Object.defineProperty(__webpack_require__(61)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(24);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(31);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(15);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(79);
var hiddenKeys = __webpack_require__(50).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(20);
var toObject = __webpack_require__(25);
var IE_PROTO = __webpack_require__(54)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(20);
var toIObject = __webpack_require__(19);
var arrayIndexOf = __webpack_require__(117)(false);
var IE_PROTO = __webpack_require__(54)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(17);


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(106), __esModule: true };

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(10).f;
var create = __webpack_require__(38);
var redefineAll = __webpack_require__(62);
var ctx = __webpack_require__(16);
var anInstance = __webpack_require__(60);
var forOf = __webpack_require__(27);
var $iterDefine = __webpack_require__(51);
var step = __webpack_require__(76);
var setSpecies = __webpack_require__(89);
var DESCRIPTORS = __webpack_require__(12);
var fastKey = __webpack_require__(52).fastKey;
var validate = __webpack_require__(63);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(45);
var from = __webpack_require__(116);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(6);
var $export = __webpack_require__(3);
var meta = __webpack_require__(52);
var fails = __webpack_require__(21);
var hide = __webpack_require__(17);
var redefineAll = __webpack_require__(62);
var forOf = __webpack_require__(27);
var anInstance = __webpack_require__(60);
var isObject = __webpack_require__(14);
var setToStringTag = __webpack_require__(28);
var dP = __webpack_require__(10).f;
var each = __webpack_require__(118)(0);
var DESCRIPTORS = __webpack_require__(12);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(6).document;
module.exports = document && document.documentElement;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(3);
var aFunction = __webpack_require__(33);
var ctx = __webpack_require__(16);
var forOf = __webpack_require__(27);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(3);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(6);
var core = __webpack_require__(0);
var dP = __webpack_require__(10);
var DESCRIPTORS = __webpack_require__(12);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(46);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 91 */,
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(81);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  return Array.isArray(arr) ? arr : (0, _from2.default)(arr);
};

/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(15);
var isObject = __webpack_require__(14);
var newPromiseCapability = __webpack_require__(69);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(15);
var aFunction = __webpack_require__(33);
var SPECIES = __webpack_require__(5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(16);
var invoke = __webpack_require__(145);
var html = __webpack_require__(85);
var cel = __webpack_require__(61);
var global = __webpack_require__(6);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(31)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(113), __esModule: true };

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(114), __esModule: true };

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(19);
var gOPN = __webpack_require__(77).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(10);
var anObject = __webpack_require__(15);
var getKeys = __webpack_require__(35);

module.exports = __webpack_require__(12) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 102 */,
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ConfigurationData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Members; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Votes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_set__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_common_argCheck__ = __webpack_require__(11);













var Configuration = function () {
  function Configuration() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        ownId = _ref.ownId;

    __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_classCallCheck___default()(this, Configuration);

    this._ownId = __WEBPACK_IMPORTED_MODULE_9_common_argCheck__["a" /* default */].string(this, 'ownId', ownId);
    this._members = new Members();
  }

  __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_createClass___default()(Configuration, [{
    key: 'toString',
    value: function toString() {
      return 'config{members=' + [].concat(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_toConsumableArray___default()(this._members)).join(',') + '}';
    }
  }, {
    key: 'createMembersChange',
    value: function createMembersChange(newMembers) {
      __WEBPACK_IMPORTED_MODULE_9_common_argCheck__["a" /* default */].instance('Configuration.createMembersChange', 'newMembers', newMembers, Members);
      return new ConfigurationData(newMembers);
    }
  }, {
    key: 'get',
    value: function get() {
      return new ConfigurationData(this._members);
    }
  }, {
    key: 'set',
    value: function set(data) {
      __WEBPACK_IMPORTED_MODULE_9_common_argCheck__["a" /* default */].instance('Configuration.set', 'data', data, ConfigurationData);
      this._members = data.members;
    }

    // for each server, including self

  }, {
    key: 'forEach',
    value: function forEach(func, thisArg) {
      this.members.forEach(func, thisArg);
    }

    // for each peer in the cluster

  }, {
    key: 'forEachPeer',
    value: function forEachPeer(func, thisArg) {
      var _this = this;

      this.members.forEach(function (peerId) {
        if (peerId !== _this._ownId) {
          func.call(_this.members, peerId);
        }
      }, thisArg);
    }
  }, {
    key: 'hasMajority',
    value: function hasMajority(grantedVotes) {
      return this._members.hasMajority(grantedVotes);
    }
  }, {
    key: 'getMajorityIndex',
    value: function getMajorityIndex(matchIndices) {
      return this._members.getMajorityIndex(matchIndices);
    }
  }, {
    key: 'ownId',
    get: function get() {
      return this._ownId;
    }
  }, {
    key: 'members',
    get: function get() {
      return new Members(this._members);
    }
  }]);

  return Configuration;
}();

/* harmony default export */ __webpack_exports__["a"] = (Configuration);


var ConfigurationData = function () {
  __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_createClass___default()(ConfigurationData, null, [{
    key: 'parse',
    value: function parse(data) {
      var _argCheck$object = __WEBPACK_IMPORTED_MODULE_9_common_argCheck__["a" /* default */].object(this, 'data', data),
          members = _argCheck$object.members;

      return new ConfigurationData(new Members(members));
    }
  }]);

  function ConfigurationData(members) {
    __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_classCallCheck___default()(this, ConfigurationData);

    __WEBPACK_IMPORTED_MODULE_9_common_argCheck__["a" /* default */].instance(this, 'members', members, Members);
    this._members = members;
  }

  __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_createClass___default()(ConfigurationData, [{
    key: 'toString',
    value: function toString() {
      return 'configData{members=' + [].concat(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_toConsumableArray___default()(this._members)).join(',') + '}';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      // Only polyfilled sets serialize to arrays, so be explicit
      return { members: [].concat(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_toConsumableArray___default()(this._members)) };
    }
  }, {
    key: 'includes',
    value: function includes(id) {
      if (this._members.has(id)) {
        return true;
      }
      return false;
    }
  }, {
    key: 'members',
    get: function get() {
      return this._members;
    }
  }]);

  return ConfigurationData;
}();

var Members = function (_Set) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Members, _Set);

  function Members() {
    __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_classCallCheck___default()(this, Members);

    return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Members.__proto__ || __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of___default()(Members)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_createClass___default()(Members, [{
    key: 'voteCount',
    value: function voteCount(grantedVotes /* Set */) {
      var voteCount = 0;
      this.forEach(function (id) {
        if (grantedVotes.has(id)) {
          voteCount += 1;
        }
      });
      return voteCount;
    }
  }, {
    key: 'hasMajority',
    value: function hasMajority(grantedVotes /* Set */) {
      var voteCount = this.voteCount(grantedVotes);
      return voteCount >= this.majorityCount;
    }

    // Finds the greatest log index that a majority is guaranteed to have received

  }, {
    key: 'getMajorityIndex',
    value: function getMajorityIndex(matchIndices /* {[clientId]: matchIndex} */) {
      var indices = [];
      this.forEach(function (id) {
        if (matchIndices.hasOwnProperty(id)) {
          indices.push(matchIndices[id]);
        } else {
          indices.push(0);
        }
      });
      var majorityPosition = this.majorityIndexPosition;
      if (indices.length === 0 || indices.length < majorityPosition) {
        return 0;
      } else {
        return indices.sort()[majorityPosition - 1];
      }
    }
  }, {
    key: 'majorityCount',
    get: function get() {
      return (this.size / 2 | 0) + 1;
    }
  }, {
    key: 'minorityCount',
    get: function get() {
      return (this.size - 1) / 2 | 0;
    }
  }, {
    key: 'majorityIndexPosition',
    get: function get() {
      return (this.size + 1) / 2 | 0;
    }
  }]);

  return Members;
}(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_set___default.a);

var Votes = function () {
  function Votes(ownId) {
    __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_classCallCheck___default()(this, Votes);

    this._votes = new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map___default.a();
    if (ownId) {
      this.set(ownId, true);
    }
  }

  __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_createClass___default()(Votes, [{
    key: 'toString',
    value: function toString() {
      return 'votes{' + [].concat(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_toConsumableArray___default()(this._votes)).map(function (_ref2) {
        var _ref3 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default()(_ref2, 2),
            peerId = _ref3[0],
            granted = _ref3[1];

        return granted ? '>' + peerId + '<' : peerId;
      }) + '}';
    }
  }, {
    key: 'set',
    value: function set(peerId, granted) {
      return this._votes.set(peerId, granted);
    }
  }, {
    key: 'has',
    value: function has(peerId) {
      return this._votes.has(peerId);
    }
  }, {
    key: 'grantedVotes',
    get: function get() {
      var voters = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_set___default.a();
      this._votes.forEach(function (granted, peerId) {
        if (granted) {
          voters.add(peerId);
        }
      });
      return voters;
    }
  }]);

  return Votes;
}();

/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ConfigurationEntry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return OpEntry; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_slicedToArray__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_common_argCheck__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_common_log__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_conference_raftConfiguration__ = __webpack_require__(103);














var TAG = 'raft';

var RaftLogEntry = function () {
  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass___default()(RaftLogEntry, null, [{
    key: 'parse',
    value: function parse(json, index) {
      // configuration entries have 2 elements, op entries have 3
      if (json.length === 2) {
        var _json = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_slicedToArray___default()(json, 2),
            term = _json[0],
            data = _json[1];

        return new ConfigurationEntry({ term: term, index: index, data: __WEBPACK_IMPORTED_MODULE_9_conference_raftConfiguration__["b" /* ConfigurationData */].parse(data) });
      } else if (json.length === 4) {
        var _json2 = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_slicedToArray___default()(json, 4),
            _term = _json2[0],
            id = _json2[1],
            op = _json2[2],
            args = _json2[3];

        return new OpEntry({ term: _term, index: index, id: id, op: op, args: args });
      } else {
        throw new TypeError('Failed to parse log entry data, invalid length: ' + json.length);
      }
    }
  }]);

  function RaftLogEntry(_ref) {
    var term = _ref.term,
        index = _ref.index;

    __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck___default()(this, RaftLogEntry);

    if (this.constructor === RaftLogEntry) {
      throw new TypeError('RaftLogEntry should not by constructed directly');
    }
    this._term = term;
    this._index = index;
  }

  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass___default()(RaftLogEntry, [{
    key: 'term',
    get: function get() {
      return this._term;
    }
  }, {
    key: 'index',
    get: function get() {
      return this._index;
    }
  }]);

  return RaftLogEntry;
}();

/* harmony default export */ __webpack_exports__["c"] = (RaftLogEntry);


var ConfigurationEntry = function (_RaftLogEntry) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(ConfigurationEntry, _RaftLogEntry);

  function ConfigurationEntry(_ref2) {
    var term = _ref2.term,
        index = _ref2.index,
        data = _ref2.data;

    __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck___default()(this, ConfigurationEntry);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (ConfigurationEntry.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(ConfigurationEntry)).call(this, { term: term, index: index }));

    __WEBPACK_IMPORTED_MODULE_7_common_argCheck__["a" /* default */].instance(_this, 'data', data, __WEBPACK_IMPORTED_MODULE_9_conference_raftConfiguration__["b" /* ConfigurationData */]);
    _this._data = data;
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass___default()(ConfigurationEntry, [{
    key: 'toString',
    value: function toString() {
      return 'config{t=' + this.term + ',i=' + this.index + ',' + this.data + '}';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return [this.term, this.data];
    }
  }, {
    key: 'data',
    get: function get() {
      return this._data;
    }
  }]);

  return ConfigurationEntry;
}(RaftLogEntry);

var OP = {
  noop: 0,
  set: 1,
  append: 2
};

var opNames = {
  0: 'noop',
  1: 'set',
  2: 'append'
};

var OpEntry = function (_RaftLogEntry2) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(OpEntry, _RaftLogEntry2);

  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass___default()(OpEntry, null, [{
    key: 'idSize',
    get: function get() {
      return 8;
    }
  }]);

  function OpEntry(_ref3) {
    var term = _ref3.term,
        index = _ref3.index,
        _ref3$id = _ref3.id,
        id = _ref3$id === undefined ? 0 : _ref3$id,
        op = _ref3.op,
        _ref3$args = _ref3.args,
        args = _ref3$args === undefined ? [] : _ref3$args;

    __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck___default()(this, OpEntry);

    var _this2 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (OpEntry.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(OpEntry)).call(this, { term: term, index: index }));

    _this2._id = id;
    _this2._op = op;
    _this2._args = args;
    return _this2;
  }

  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass___default()(OpEntry, [{
    key: 'toString',
    value: function toString() {
      var name = opNames[this.op];
      var args = this.args.join(',');
      var shortId = this.id ? this.id.slice(0, 4) : '<no>';
      return 'op{id=' + shortId + ',t=' + this.term + ',i=' + this.index + ',' + name + ',[' + args + ']}';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return [this.term, this.id, this.op, this.args];
    }
  }, {
    key: 'apply',
    value: function apply(state) {
      if (this[this.op]) {
        __WEBPACK_IMPORTED_MODULE_8_common_log__["default"].debug(TAG, 'applying ' + this);
        return this[this.op].apply(this, [state].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(this.args)));
      } else {
        throw new TypeError('Failed to apply OpEntry, unknown op code: \'' + this.op + '\'');
      }
    }

    // methods for each op to modify state, args are passed in as parameters 2+
    // If the state is modified it should always be returned, and the other way around.

  }, {
    key: OP.noop,
    value: function value(state) {}
  }, {
    key: OP.set,
    value: function value(state, key, _value) {
      if (typeof key !== 'string') {
        throw new TypeError('Invalid OpEntry, set key must be a string');
      }
      if (typeof _value === 'undefined') {
        delete state[key];
      }
      state[key] = _value;
      return state;
    }
  }, {
    key: OP.append,
    value: function value(state, key, _value2) {
      if (typeof key !== 'string') {
        throw new TypeError('Invalid OpEntry, append key must be a string');
      }
      if (typeof _value2 === 'undefined') {
        return;
      }
      if (state[key]) {
        state[key].push(_value2);
      } else {
        state[key] = [_value2];
      }
      return state;
    }
  }, {
    key: 'id',
    get: function get() {
      return this._id;
    }
  }, {
    key: 'op',
    get: function get() {
      return this._op;
    }
  }, {
    key: 'args',
    get: function get() {
      return this._args;
    }
  }]);

  return OpEntry;
}(RaftLogEntry);

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(111), __esModule: true };

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(22);
__webpack_require__(127);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(129);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(130);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(131);
var $Object = __webpack_require__(0).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(132);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(133);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(42);
__webpack_require__(22);
__webpack_require__(32);
__webpack_require__(134);
__webpack_require__(138);
__webpack_require__(137);
__webpack_require__(136);
module.exports = __webpack_require__(0).Set;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(135);
__webpack_require__(42);
__webpack_require__(139);
__webpack_require__(140);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(22);
__webpack_require__(32);
module.exports = __webpack_require__(59).f('iterator');


/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(27);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(19);
var toLength = __webpack_require__(39);
var toAbsoluteIndex = __webpack_require__(126);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(16);
var IObject = __webpack_require__(68);
var toObject = __webpack_require__(25);
var toLength = __webpack_require__(39);
var asc = __webpack_require__(120);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
var isArray = __webpack_require__(74);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(119);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(10);
var createDesc = __webpack_require__(26);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(35);
var gOPS = __webpack_require__(70);
var pIE = __webpack_require__(43);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(38);
var descriptor = __webpack_require__(26);
var setToStringTag = __webpack_require__(28);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(17)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(14);
var anObject = __webpack_require__(15);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(16)(Function.call, __webpack_require__(53).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(56);
var defined = __webpack_require__(49);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(56);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(16);
var $export = __webpack_require__(3);
var toObject = __webpack_require__(25);
var call = __webpack_require__(75);
var isArrayIter = __webpack_require__(73);
var toLength = __webpack_require__(39);
var createProperty = __webpack_require__(121);
var getIterFn = __webpack_require__(66);

$export($export.S + $export.F * !__webpack_require__(86)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(115);
var step = __webpack_require__(76);
var Iterators = __webpack_require__(24);
var toIObject = __webpack_require__(19);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(51)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(38) });


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(12), 'Object', { defineProperty: __webpack_require__(10).f });


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(19);
var $getOwnPropertyDescriptor = __webpack_require__(53).f;

__webpack_require__(47)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(25);
var $getPrototypeOf = __webpack_require__(78);

__webpack_require__(47)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(3);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(124).set });


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(82);
var validate = __webpack_require__(63);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(84)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(6);
var has = __webpack_require__(20);
var DESCRIPTORS = __webpack_require__(12);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(80);
var META = __webpack_require__(52).KEY;
var $fails = __webpack_require__(21);
var shared = __webpack_require__(55);
var setToStringTag = __webpack_require__(28);
var uid = __webpack_require__(40);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(59);
var wksDefine = __webpack_require__(58);
var enumKeys = __webpack_require__(122);
var isArray = __webpack_require__(74);
var anObject = __webpack_require__(15);
var toIObject = __webpack_require__(19);
var toPrimitive = __webpack_require__(57);
var createDesc = __webpack_require__(26);
var _create = __webpack_require__(38);
var gOPNExt = __webpack_require__(100);
var $GOPD = __webpack_require__(53);
var $DP = __webpack_require__(10);
var $keys = __webpack_require__(35);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(77).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(43).f = $propertyIsEnumerable;
  __webpack_require__(70).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(41)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(17)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(87)('Set');


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(88)('Set');


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(3);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(83)('Set') });


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(58)('asyncIterator');


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(58)('observable');


/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AppendEntriesRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return AppendEntriesResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return RequestVoteRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return RequestVoteResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return PreVoteRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return PreVoteResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return SnapshotRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return SnapshotResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return StateOpRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return StateOpResponse; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_toArray__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_toArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_toArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_common_argCheck__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_conference_raftConfiguration__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_conference_raftLogEntry__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_conference_meshTopology__ = __webpack_require__(158);
















var RaftMessage = function () {
  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default()(RaftMessage, null, [{
    key: 'parse',
    value: function parse(body) {
      if (!Array.isArray(body)) {
        throw new TypeError('RaftMessage body must be an array');
      }

      var _body = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_toArray___default()(body),
          id = _body[0],
          params = _body.slice(1);

      var MessageConstructor = messageConstructors[id];
      if (!MessageConstructor) {
        throw new TypeError('Failed to parse invalid raft message, unknown id: ' + id);
      }
      return new (Function.prototype.bind.apply(MessageConstructor, [null].concat(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_toConsumableArray___default()(params))))();
    }
  }]);

  function RaftMessage(term) {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck___default()(this, RaftMessage);

    this._term = __WEBPACK_IMPORTED_MODULE_8_common_argCheck__["a" /* default */].number(this, 'term', term);
  }

  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default()(RaftMessage, [{
    key: 'toJSON',
    value: function toJSON() {
      return [this.constructor.id].concat(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_toConsumableArray___default()(this.params));
    }
  }, {
    key: 'term',
    get: function get() {
      return this._term;
    }
  }, {
    key: 'isRequest',
    get: function get() {
      return !(this.constructor.id & 1);
    }
  }]);

  return RaftMessage;
}();

/* harmony default export */ __webpack_exports__["a"] = (RaftMessage);


var AppendEntriesRequest = function (_RaftMessage) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(AppendEntriesRequest, _RaftMessage);

  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default()(AppendEntriesRequest, null, [{
    key: 'create',
    value: function create(_ref) {
      var term = _ref.term,
          topologyIndex = _ref.topologyIndex,
          prevIndex = _ref.prevIndex,
          prevTerm = _ref.prevTerm,
          commitIndex = _ref.commitIndex,
          entries = _ref.entries;

      return new AppendEntriesRequest(term, topologyIndex, prevIndex, prevTerm, commitIndex, entries);
    }
  }]);

  function AppendEntriesRequest(term, topologyIndex, prevIndex, prevTerm, commitIndex, entries) {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck___default()(this, AppendEntriesRequest);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (AppendEntriesRequest.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(AppendEntriesRequest)).call(this, term));

    _this._topologyIndex = __WEBPACK_IMPORTED_MODULE_8_common_argCheck__["a" /* default */].number(_this, 'topologyIndex', topologyIndex);
    _this._prevIndex = __WEBPACK_IMPORTED_MODULE_8_common_argCheck__["a" /* default */].number(_this, 'prevIndex', prevIndex);
    _this._prevTerm = __WEBPACK_IMPORTED_MODULE_8_common_argCheck__["a" /* default */].number(_this, 'prevTerm', prevTerm);
    _this._commitIndex = __WEBPACK_IMPORTED_MODULE_8_common_argCheck__["a" /* default */].number(_this, 'commitIndex', commitIndex);
    _this._entries = entries.map(function (entry, index) {
      var entryIndex = _this._prevIndex + index + 1;
      entry = entry instanceof __WEBPACK_IMPORTED_MODULE_10_conference_raftLogEntry__["c" /* default */] ? entry : __WEBPACK_IMPORTED_MODULE_10_conference_raftLogEntry__["c" /* default */].parse(entry, entryIndex);
      __WEBPACK_IMPORTED_MODULE_8_common_argCheck__["a" /* default */].number(_this, 'entry.term', entry.term);
      return entry;
    });
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default()(AppendEntriesRequest, [{
    key: 'toString',
    value: function toString() {
      return 'appendRequest{' + ('term=' + this.term + ',ti=' + this._topologyIndex + ',') + ('pi=' + this._prevIndex + ',pt=' + this._prevTerm + ',') + ('ci=' + this._commitIndex + ',es=[' + this._entries + ']}');
    }
  }, {
    key: 'response',
    value: function response() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _options$term = options.term,
          term = _options$term === undefined ? this._term : _options$term,
          _options$success = options.success,
          success = _options$success === undefined ? false : _options$success,
          _options$needSnapshot = options.needSnapshot,
          needSnapshot = _options$needSnapshot === undefined ? false : _options$needSnapshot,
          meshTopology = options.meshTopology,
          _options$matchIndex = options.matchIndex,
          matchIndex = _options$matchIndex === undefined ? this._prevIndex - 1 : _options$matchIndex;


      var localTopologyInfo = meshTopology && meshTopology.localTopologyInfo;
      var topologyInfo = null;
      var topologyIndex = localTopologyInfo && localTopologyInfo.topologyIndex;
      if (topologyIndex > this.topologyIndex) {
        topologyInfo = localTopologyInfo;
      }
      var volume = localTopologyInfo ? localTopologyInfo.volume : 0;

      var flag = APPEND_ENTRIES_RESPONSE_FLAG_SUCCESS;
      if (!success) {
        flag = APPEND_ENTRIES_RESPONSE_FLAG_FAILURE;
      }
      if (needSnapshot) {
        flag = APPEND_ENTRIES_RESPONSE_FLAG_NEED_SNAPSHOT;
      }

      return new AppendEntriesResponse(term, flag, topologyIndex, topologyInfo, volume, matchIndex);
    }
  }, {
    key: 'params',
    get: function get() {
      return [this._term, this._topologyIndex, this._prevIndex, this._prevTerm, this._commitIndex, this._entries];
    }

    // topologyIndex is an addition to the Raft algorithm. The purpose is for the leader
    // to get a complete view of the topology of the cluster, while keeping network use low.
    // Each member will send information about their active connections in the AppendEntries
    // response, but only if the received topology index is lower than their own one.
    //
    // Followers will increment their topologyIndex whenever a significant change is made to
    // their active connections, e.g. added and removed connections, as well as changes in
    // latency or bandwidth. The initial implementation will only take added and removed
    // connections into account, and use a timeout to make sure relatively up-to-date network
    // information is transmitted. The downside is that it will require slightly more bandwidth,
    // and that bit changes in network characteristics won't be detected as quickly by the leader.
    //
    // Just like terms and log indices, the topology index is an integer that is always
    // incremented during normal operation. The follower increments it as discussed above
    // and the leader increments their topologyIndex as updates are received from the follower.
    // Just like the matchIndex the leader keeps track of the remote topologyIndex separately
    // for each cluster member.
    //
    // New leaders will use a topologyIndex of 0 in the first appendEntries request sent to
    // all members when they get elected, and the followers will then always respond with their
    // current connection state and topologyIndex.

  }, {
    key: 'topologyIndex',
    get: function get() {
      return this._topologyIndex;
    }
  }, {
    key: 'prevIndex',
    get: function get() {
      return this._prevIndex;
    }
  }, {
    key: 'prevTerm',
    get: function get() {
      return this._prevTerm;
    }
  }, {
    key: 'commitIndex',
    get: function get() {
      return this._commitIndex;
    }
  }, {
    key: 'entries',
    get: function get() {
      return this._entries;
    }
  }]);

  return AppendEntriesRequest;
}(RaftMessage);

var APPEND_ENTRIES_RESPONSE_FLAG_SUCCESS = 0;
var APPEND_ENTRIES_RESPONSE_FLAG_FAILURE = 1;
var APPEND_ENTRIES_RESPONSE_FLAG_NEED_SNAPSHOT = 2;

var AppendEntriesResponse = function (_RaftMessage2) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(AppendEntriesResponse, _RaftMessage2);

  function AppendEntriesResponse(term, flag) {
    var topologyIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
    var topologyInfo = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var volume = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var matchIndex = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : -1;

    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck___default()(this, AppendEntriesResponse);

    var _this2 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (AppendEntriesResponse.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(AppendEntriesResponse)).call(this, term));

    _this2._flag = __WEBPACK_IMPORTED_MODULE_8_common_argCheck__["a" /* default */].number(_this2, 'flag', flag);
    _this2._topologyIndex = __WEBPACK_IMPORTED_MODULE_8_common_argCheck__["a" /* default */].number(_this2, 'topologyIndex', topologyIndex);
    _this2._matchIndex = __WEBPACK_IMPORTED_MODULE_8_common_argCheck__["a" /* default */].number(_this2, 'matchIndex', matchIndex);
    if (topologyInfo) {
      _this2._topologyInfo = __WEBPACK_IMPORTED_MODULE_11_conference_meshTopology__["b" /* PeerTopologyInfo */].parseUpdate(topologyInfo);
    } else {
      _this2._topologyInfo = null;
    }
    _this2._volume = volume;
    return _this2;
  }

  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default()(AppendEntriesResponse, [{
    key: 'toString',
    value: function toString() {
      var topologyInfo = null;
      if (this._topologyInfo) {
        topologyInfo = 'topologyInfo{power=' + this._topologyInfo.power + ',' + this._topologyInfo.links + '}';
      }
      return 'appendResponse{' + ('term=' + this.term + ',flag=' + this._flag + ',mi=' + this._matchIndex + ',v=' + this._volume + ',') + ('ti=' + this._topologyIndex + ',' + topologyInfo + '}');
    }
  }, {
    key: 'params',
    get: function get() {
      return [this._term, this._flag, this._topologyIndex, this._topologyInfo || 0, this._volume || 0, this._matchIndex];
    }
  }, {
    key: 'success',
    get: function get() {
      return this._flag === APPEND_ENTRIES_RESPONSE_FLAG_SUCCESS;
    }
  }, {
    key: 'needSnapshot',
    get: function get() {
      return this._flag === APPEND_ENTRIES_RESPONSE_FLAG_NEED_SNAPSHOT;
    }
  }, {
    key: 'topologyIndex',
    get: function get() {
      return this._topologyIndex;
    }
  }, {
    key: 'topologyInfo',
    get: function get() {
      return this._topologyInfo;
    }
  }, {
    key: 'matchIndex',
    get: function get() {
      return this._matchIndex;
    }
  }, {
    key: 'volume',
    get: function get() {
      return this._volume;
    }
  }]);

  return AppendEntriesResponse;
}(RaftMessage);

var RequestVoteRequest = function (_RaftMessage3) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(RequestVoteRequest, _RaftMessage3);

  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default()(RequestVoteRequest, null, [{
    key: 'create',
    value: function create(_ref2) {
      var term = _ref2.term,
          lastLogTerm = _ref2.lastLogTerm,
          lastLogIndex = _ref2.lastLogIndex;

      return new RequestVoteRequest(term, lastLogTerm, lastLogIndex);
    }
  }]);

  function RequestVoteRequest(term, lastLogTerm, lastLogIndex) {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck___default()(this, RequestVoteRequest);

    var _this3 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (RequestVoteRequest.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(RequestVoteRequest)).call(this, term));

    _this3._lastLogTerm = __WEBPACK_IMPORTED_MODULE_8_common_argCheck__["a" /* default */].number(_this3, 'lastLogTerm', lastLogTerm);
    _this3._lastLogIndex = __WEBPACK_IMPORTED_MODULE_8_common_argCheck__["a" /* default */].number(_this3, 'lastLogIndex', lastLogIndex);
    return _this3;
  }

  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default()(RequestVoteRequest, [{
    key: 'toString',
    value: function toString() {
      return 'voteRequest{term=' + this.term + '}';
    }
  }, {
    key: 'compareLog',
    value: function compareLog(other) {
      var lastLogTerm = other.lastLogTerm;

      if (this.lastLogTerm !== lastLogTerm) {
        return this.lastLogTerm - lastLogTerm;
      } else {
        return this.lastLogIndex - other.lastLogIndex;
      }
    }
  }, {
    key: 'response',
    value: function response(_ref3) {
      var _ref3$granted = _ref3.granted,
          granted = _ref3$granted === undefined ? false : _ref3$granted;

      return new RequestVoteResponse(this._term, granted);
    }
  }, {
    key: 'params',
    get: function get() {
      return [this._term, this._lastLogTerm, this._lastLogIndex];
    }
  }, {
    key: 'lastLogTerm',
    get: function get() {
      return this._lastLogTerm;
    }
  }, {
    key: 'lastLogIndex',
    get: function get() {
      return this._lastLogIndex;
    }
  }]);

  return RequestVoteRequest;
}(RaftMessage);

var RequestVoteResponse = function (_RaftMessage4) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(RequestVoteResponse, _RaftMessage4);

  function RequestVoteResponse(term, granted) {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck___default()(this, RequestVoteResponse);

    var _this4 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (RequestVoteResponse.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(RequestVoteResponse)).call(this, term));

    _this4._granted = __WEBPACK_IMPORTED_MODULE_8_common_argCheck__["a" /* default */].boolean(_this4, 'granted', granted);
    return _this4;
  }

  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default()(RequestVoteResponse, [{
    key: 'toString',
    value: function toString() {
      return 'voteResponse{term=' + this.term + ',granted=' + this.granted + '}';
    }
  }, {
    key: 'params',
    get: function get() {
      return [this._term, this._granted];
    }
  }, {
    key: 'granted',
    get: function get() {
      return this._granted;
    }
  }]);

  return RequestVoteResponse;
}(RaftMessage);

// PreVote RPC is an extension for the Raft algorithm that lets low-population
// clusters find a leader faster, and prevents many cases of leader flip-flopping.
//
// The implementation is based on the suggested modifications in
// "Three modifications for the Raft consensus algorithm" by Henrik Ingo
// http://openlife.cc/system/files/3-modifications-for-Raft-consensus.pdf
var PreVoteRequest = function (_RequestVoteRequest) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(PreVoteRequest, _RequestVoteRequest);

  function PreVoteRequest() {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck___default()(this, PreVoteRequest);

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (PreVoteRequest.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(PreVoteRequest)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default()(PreVoteRequest, [{
    key: 'toString',
    value: function toString() {
      return 'preVoteRequest{term=' + this.term + '}';
    }
  }, {
    key: 'response',
    value: function response(_ref4) {
      var _ref4$granted = _ref4.granted,
          granted = _ref4$granted === undefined ? false : _ref4$granted;

      return new PreVoteResponse(this._term, granted);
    }
  }], [{
    key: 'create',
    value: function create(_ref5) {
      var term = _ref5.term,
          lastLogTerm = _ref5.lastLogTerm,
          lastLogIndex = _ref5.lastLogIndex;

      return new PreVoteRequest(term, lastLogTerm, lastLogIndex);
    }
  }]);

  return PreVoteRequest;
}(RequestVoteRequest);

var PreVoteResponse = function (_RequestVoteResponse) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(PreVoteResponse, _RequestVoteResponse);

  function PreVoteResponse() {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck___default()(this, PreVoteResponse);

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (PreVoteResponse.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(PreVoteResponse)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default()(PreVoteResponse, [{
    key: 'toString',
    value: function toString() {
      return 'preVoteResponse{term=' + this.term + ',granted=' + this.granted + '}';
    }
  }]);

  return PreVoteResponse;
}(RequestVoteResponse);

var SnapshotRequest = function (_RaftMessage5) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(SnapshotRequest, _RaftMessage5);

  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default()(SnapshotRequest, null, [{
    key: 'create',
    value: function create(_ref6) {
      var term = _ref6.term,
          lastTerm = _ref6.lastTerm,
          lastIndex = _ref6.lastIndex,
          configuration = _ref6.configuration,
          state = _ref6.state;

      return new SnapshotRequest(term, lastTerm, lastIndex, configuration, state);
    }
  }]);

  function SnapshotRequest(term, lastTerm, lastIndex, configuration, state) {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck___default()(this, SnapshotRequest);

    var _this7 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (SnapshotRequest.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(SnapshotRequest)).call(this, term));

    _this7._lastTerm = __WEBPACK_IMPORTED_MODULE_8_common_argCheck__["a" /* default */].number(_this7, 'lastTerm', lastTerm);
    _this7._lastIndex = __WEBPACK_IMPORTED_MODULE_8_common_argCheck__["a" /* default */].number(_this7, 'lastIndex', lastIndex);
    if (!(configuration instanceof __WEBPACK_IMPORTED_MODULE_9_conference_raftConfiguration__["b" /* ConfigurationData */])) {
      configuration = __WEBPACK_IMPORTED_MODULE_9_conference_raftConfiguration__["b" /* ConfigurationData */].parse(configuration);
    }
    _this7._configuration = configuration;
    _this7._state = state;
    return _this7;
  }

  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default()(SnapshotRequest, [{
    key: 'toString',
    value: function toString() {
      return 'snapshotRequest{term=' + this.term + ',li=' + this.lastIndex + ',lt=' + this.lastTerm + (',' + this.configuration + ',' + __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(this.state) + '}');
    }
  }, {
    key: 'response',
    value: function response() {
      return new SnapshotResponse(this._term, this._lastTerm, this._lastIndex);
    }
  }, {
    key: 'params',
    get: function get() {
      return [this._term, this._lastTerm, this._lastIndex, this._configuration, this._state];
    }
  }, {
    key: 'lastTerm',
    get: function get() {
      return this._lastTerm;
    }
  }, {
    key: 'lastIndex',
    get: function get() {
      return this._lastIndex;
    }
  }, {
    key: 'configuration',
    get: function get() {
      return this._configuration;
    }
  }, {
    key: 'state',
    get: function get() {
      return this._state;
    }
  }]);

  return SnapshotRequest;
}(RaftMessage);

var SnapshotResponse = function (_RaftMessage6) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(SnapshotResponse, _RaftMessage6);

  function SnapshotResponse(term, lastTerm, lastIndex) {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck___default()(this, SnapshotResponse);

    var _this8 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (SnapshotResponse.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(SnapshotResponse)).call(this, term));

    _this8._lastTerm = __WEBPACK_IMPORTED_MODULE_8_common_argCheck__["a" /* default */].number(_this8, 'lastTerm', lastTerm);
    _this8._lastIndex = __WEBPACK_IMPORTED_MODULE_8_common_argCheck__["a" /* default */].number(_this8, 'lastIndex', lastIndex);
    return _this8;
  }

  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default()(SnapshotResponse, [{
    key: 'toString',
    value: function toString() {
      return 'snapshotResponse{term=' + this.term + ',li=' + this.lastIndex + ',lt=' + this.lastTerm + '}';
    }
  }, {
    key: 'params',
    get: function get() {
      return [this._term, this._lastTerm, this._lastIndex];
    }
  }, {
    key: 'lastTerm',
    get: function get() {
      return this._lastTerm;
    }
  }, {
    key: 'lastIndex',
    get: function get() {
      return this._lastIndex;
    }
  }]);

  return SnapshotResponse;
}(RaftMessage);

var StateOpRequest = function (_RaftMessage7) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(StateOpRequest, _RaftMessage7);

  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default()(StateOpRequest, null, [{
    key: 'create',
    value: function create(_ref7) {
      var id = _ref7.id,
          op = _ref7.op,
          args = _ref7.args;

      return new StateOpRequest(id, op, args);
    }
  }]);

  function StateOpRequest(id, op, args) {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck___default()(this, StateOpRequest);

    var _this9 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (StateOpRequest.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(StateOpRequest)).call(this, 0));

    _this9._id = id;
    _this9._op = op;
    _this9._args = args;
    return _this9;
  }

  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default()(StateOpRequest, [{
    key: 'toString',
    value: function toString() {
      return 'stateOpRequest{id=' + this._id + ',op=' + this._op + ',args=' + this._args + '}';
    }
  }, {
    key: 'response',
    value: function response() {
      var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref8$errorCode = _ref8.errorCode,
          errorCode = _ref8$errorCode === undefined ? 0 : _ref8$errorCode;

      return new StateOpResponse(this._id, errorCode);
    }
  }, {
    key: 'id',
    get: function get() {
      return this._id;
    }
  }, {
    key: 'op',
    get: function get() {
      return this._op;
    }
  }, {
    key: 'args',
    get: function get() {
      return this._args;
    }
  }, {
    key: 'params',
    get: function get() {
      return [this._id, this._op, this._args];
    }
  }]);

  return StateOpRequest;
}(RaftMessage);

var StateOpResponse = function (_RaftMessage8) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(StateOpResponse, _RaftMessage8);

  function StateOpResponse(id, errorCode) {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck___default()(this, StateOpResponse);

    var _this10 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (StateOpResponse.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(StateOpResponse)).call(this, 0));

    _this10._id = id;
    _this10._errorCode = errorCode;
    return _this10;
  }

  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default()(StateOpResponse, [{
    key: 'toString',
    value: function toString() {
      return 'stateOpResponse{id=' + this._id + ',errorCode=' + this._errorCode + '}';
    }
  }, {
    key: 'id',
    get: function get() {
      return this._id;
    }
  }, {
    key: 'errorCode',
    get: function get() {
      return this._errorCode;
    }
  }, {
    key: 'params',
    get: function get() {
      return [this._id, this._errorCode];
    }
  }]);

  return StateOpResponse;
}(RaftMessage);
StateOpResponse.NOT_LEADER = 1;

AppendEntriesRequest.id = 2;
AppendEntriesResponse.id = 3;
RequestVoteRequest.id = 4;
RequestVoteResponse.id = 5;
PreVoteRequest.id = 6;
PreVoteResponse.id = 7;
SnapshotRequest.id = 8;
SnapshotResponse.id = 9;
StateOpRequest.id = 10;
StateOpResponse.id = 11;

var messageConstructors = {
  2: AppendEntriesRequest,
  3: AppendEntriesResponse,
  4: RequestVoteRequest,
  5: RequestVoteResponse,
  6: PreVoteRequest,
  7: PreVoteResponse,
  8: SnapshotRequest,
  9: SnapshotResponse,
  10: StateOpRequest,
  11: StateOpResponse
};

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(42);
__webpack_require__(22);
__webpack_require__(32);
__webpack_require__(147);
__webpack_require__(152);
__webpack_require__(151);
__webpack_require__(150);
module.exports = __webpack_require__(0).Map;


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(148);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(42);
__webpack_require__(22);
__webpack_require__(32);
__webpack_require__(149);
__webpack_require__(153);
__webpack_require__(154);
module.exports = __webpack_require__(0).Promise;


/***/ }),
/* 145 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var macrotask = __webpack_require__(96).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(31)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(82);
var validate = __webpack_require__(63);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(84)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(25);
var $keys = __webpack_require__(35);

__webpack_require__(47)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(41);
var global = __webpack_require__(6);
var ctx = __webpack_require__(16);
var classof = __webpack_require__(45);
var $export = __webpack_require__(3);
var isObject = __webpack_require__(14);
var aFunction = __webpack_require__(33);
var anInstance = __webpack_require__(60);
var forOf = __webpack_require__(27);
var speciesConstructor = __webpack_require__(95);
var task = __webpack_require__(96).set;
var microtask = __webpack_require__(146)();
var newPromiseCapabilityModule = __webpack_require__(69);
var perform = __webpack_require__(93);
var promiseResolve = __webpack_require__(94);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(62)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(28)($Promise, PROMISE);
__webpack_require__(89)(PROMISE);
Wrapper = __webpack_require__(0)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(86)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(87)('Map');


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(88)('Map');


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(3);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(83)('Map') });


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(3);
var core = __webpack_require__(0);
var global = __webpack_require__(6);
var speciesConstructor = __webpack_require__(95);
var promiseResolve = __webpack_require__(94);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(3);
var newPromiseCapability = __webpack_require__(69);
var perform = __webpack_require__(93);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkInfo; });
/* unused harmony export LinkInfos */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PeerTopologyInfo; });
/* unused harmony export LocalTopologyInfo */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_keys__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_slicedToArray__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_common_argCheck__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_common_log__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_common_utils__ = __webpack_require__(13);













var TAG = 'mesh-topology';

var LinkInfo = function () {
  function LinkInfo(_ref) {
    var _ref$rttMs = _ref.rttMs,
        rttMs = _ref$rttMs === undefined ? -1 : _ref$rttMs,
        _ref$bandwidth = _ref.bandwidth,
        bandwidth = _ref$bandwidth === undefined ? -1 : _ref$bandwidth,
        _ref$up = _ref.up,
        up = _ref$up === undefined ? false : _ref$up,
        onUpdate = _ref.onUpdate;

    __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck___default()(this, LinkInfo);

    this._rttMs = __WEBPACK_IMPORTED_MODULE_7_common_argCheck__["a" /* default */].number(this, 'rttMs', rttMs);
    this._bandwidth = __WEBPACK_IMPORTED_MODULE_7_common_argCheck__["a" /* default */].number(this, 'bandwidth', bandwidth);
    this._up = __WEBPACK_IMPORTED_MODULE_7_common_argCheck__["a" /* default */].boolean(this, 'up', up);
    this._onUpdate = onUpdate;
  }

  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass___default()(LinkInfo, [{
    key: 'update',
    value: function update(info) {
      var _info$rttMs = info.rttMs,
          rttMs = _info$rttMs === undefined ? null : _info$rttMs,
          _info$bandwidth = info.bandwidth,
          bandwidth = _info$bandwidth === undefined ? null : _info$bandwidth,
          _info$up = info.up,
          up = _info$up === undefined ? null : _info$up;

      if (rttMs !== null) {
        this._rttMs = __WEBPACK_IMPORTED_MODULE_7_common_argCheck__["a" /* default */].number('LinkInfo.update', 'rttMs', rttMs);
      }
      if (bandwidth !== null) {
        this._bandwidth = __WEBPACK_IMPORTED_MODULE_7_common_argCheck__["a" /* default */].number('LinkInfo.update', 'bandwidth', bandwidth);
      }
      var oldUp = this._up;
      if (up !== null) {
        this._up = __WEBPACK_IMPORTED_MODULE_7_common_argCheck__["a" /* default */].boolean('LinkInfo.update', 'up', up);
      }
      if (this._onUpdate) {
        var changedUpState = oldUp !== this._up;
        this._onUpdate(changedUpState);
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'link{' + (this._up ? 'up' : 'down') + ',rttMs=' + this._rttMs + ',bw=' + this._bandwidth + '}';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      if (this._up) {
        return [this._rttMs, this._bandwidth];
      } else {
        return [];
      }
    }
  }, {
    key: 'up',
    get: function get() {
      return this._up;
    }
  }, {
    key: 'rttMs',
    get: function get() {
      return this._rttMs;
    }
  }, {
    key: 'bandwidth',
    get: function get() {
      return this._bandwidth;
    }
  }], [{
    key: 'parse',
    value: function parse(data) {
      if (data.constructor === LinkInfo) {
        return data;
      } else if (Array.isArray(data)) {
        if (!data.length) {
          return new LinkInfo({ up: false });
        }

        var _data = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_slicedToArray___default()(data, 2),
            rttMs = _data[0],
            bandwidth = _data[1];

        return new LinkInfo({ rttMs: rttMs, bandwidth: bandwidth, up: true });
      } else {
        throw new TypeError('Could not parse link info data, ' + data);
      }
    }
  }]);

  return LinkInfo;
}();

var LinkInfos = function () {
  function LinkInfos() {
    __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck___default()(this, LinkInfos);
  }

  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass___default()(LinkInfos, [{
    key: 'toString',
    value: function toString() {
      var _this = this;

      return 'linkInfos{' + __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_keys___default()(this).map(function (peerId) {
        return peerId + ':' + _this[peerId];
      }).join(',') + '}';
    }
  }], [{
    key: 'parse',
    value: function parse(data) {
      var linkInfos = new LinkInfos();
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9_common_utils__["forEach"])(data, function (linkInfo, peerId) {
        linkInfos[peerId] = LinkInfo.parse(linkInfo);
      });
      return linkInfos;
    }
  }]);

  return LinkInfos;
}();

var INDEX_UP_STATE_CHANGE_SIZE = 10;

var PeerTopologyInfo = function () {
  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass___default()(PeerTopologyInfo, null, [{
    key: 'parseUpdate',
    value: function parseUpdate(data) {
      if (!Array.isArray(data)) {
        return data;
      }

      var _data2 = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_slicedToArray___default()(data, 2),
          power = _data2[0],
          links = _data2[1];

      return {
        power: power,
        links: LinkInfos.parse(links)
      };
    }
  }]);

  function PeerTopologyInfo(peerId, onChange) {
    __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck___default()(this, PeerTopologyInfo);

    this._peerId = peerId;
    this._onChange = onChange;
    this._topologyIndex = 1;

    this._links = new LinkInfos();
    this._power = 1;
  }

  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass___default()(PeerTopologyInfo, [{
    key: 'toString',
    value: function toString() {
      return 'peerTopologyInfo{peerId=' + this._peerId + ',power=' + this._power + ',' + this._links + '}';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return [this._power, this._links];
    }
  }, {
    key: '_update',
    value: function _update(_ref2) {
      var topologyInfo = _ref2.topologyInfo,
          topologyIndex = _ref2.topologyIndex,
          volume = _ref2.volume;

      this._volume = volume;
      if (!topologyInfo) {
        return;
      }
      __WEBPACK_IMPORTED_MODULE_7_common_argCheck__["a" /* default */].number('PeerTopologyInfo._update', 'topologyIndex', topologyIndex);
      if (topologyIndex < this._topologyIndex) {
        return;
      }
      __WEBPACK_IMPORTED_MODULE_7_common_argCheck__["a" /* default */].options('PeerTopologyInfo._update', 'topologyInfo', topologyInfo).number('power').instance('links', LinkInfos);
      this._links = topologyInfo.links;
      this._power = topologyInfo.power;
      var indexChange = topologyIndex - this._topologyIndex;
      this._topologyIndex = topologyIndex;
      __WEBPACK_IMPORTED_MODULE_8_common_log__["default"].verbose(TAG, this, 'updated peer topology info by ' + indexChange + ' indices');
      this._onChange(indexChange >= INDEX_UP_STATE_CHANGE_SIZE);
    }
  }, {
    key: '_invalidate',
    value: function _invalidate() {
      this._links = null;
      this._onChange = null;
    }
  }, {
    key: 'links',
    get: function get() {
      return this._links;
    }
  }, {
    key: 'power',
    get: function get() {
      return this._power;
    }
  }, {
    key: 'volume',
    get: function get() {
      return this._volume;
    }
  }, {
    key: 'topologyIndex',
    get: function get() {
      return this._topologyIndex;
    }
  }]);

  return PeerTopologyInfo;
}();

var LocalTopologyInfo = function () {
  function LocalTopologyInfo(_ref3) {
    var power = _ref3.power,
        voiceActivityDetector = _ref3.voiceActivityDetector,
        onUpdate = _ref3.onUpdate;

    __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck___default()(this, LocalTopologyInfo);

    this._handleUpdate = this._handleUpdate.bind(this);

    this._links = new LinkInfos();
    this._power = power;
    this._voiceActivityDetector = voiceActivityDetector;
    this._topologyIndex = 1;
    this._onUpdate = onUpdate;
  }

  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass___default()(LocalTopologyInfo, [{
    key: 'setVoiceActivityDetectorActive',
    value: function setVoiceActivityDetectorActive(active) {
      if (this._voiceActivityDetector) {
        this._voiceActivityDetector.setActive(active);
      }
    }
  }, {
    key: 'addPeer',
    value: function addPeer(peerId) {
      if (this._links.hasOwnProperty(peerId)) {
        throw new Error('LocalTopologyInfo already has a peer with id ' + peerId);
      }
      var linkInfo = new LinkInfo({ onUpdate: this._handleUpdate });
      this._links[peerId] = linkInfo;
      return linkInfo;
    }
  }, {
    key: 'removePeer',
    value: function removePeer(peerId) {
      var linkInfo = this._links[peerId];
      if (!linkInfo) {
        throw new Error('LocalTopologyInfo failed to delete nonexistent peer, ' + peerId);
      }
      delete this._links[peerId];
    }
  }, {
    key: 'toString',
    value: function toString() {
      var infoStrings = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9_common_utils__["map"])(this._links, function (linkInfo, peerId) {
        return peerId + ':' + linkInfo;
      });
      return 'localTopology{power=' + this._power + ',' + infoStrings.join(',') + '}';
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return [this._power, this._links];
    }
  }, {
    key: '_handleUpdate',
    value: function _handleUpdate(changedUpState) {
      this._topologyIndex += changedUpState ? INDEX_UP_STATE_CHANGE_SIZE : 1;
      this._onUpdate(changedUpState);
    }
  }, {
    key: '_invalidate',
    value: function _invalidate() {}
  }, {
    key: 'links',
    get: function get() {
      return this._links;
    }
  }, {
    key: 'power',
    get: function get() {
      return this._power;
    }
  }, {
    key: 'topologyIndex',
    get: function get() {
      return this._topologyIndex;
    }
  }, {
    key: 'volume',
    get: function get() {
      if (this._voiceActivityDetector) {
        return this._voiceActivityDetector.volume;
      } else {
        return 0;
      }
    }
  }]);

  return LocalTopologyInfo;
}();

var MeshTopology = function () {
  function MeshTopology(_ref4) {
    var ownId = _ref4.ownId,
        _ref4$power = _ref4.power,
        power = _ref4$power === undefined ? 1 : _ref4$power,
        _ref4$voiceActivityDe = _ref4.voiceActivityDetector,
        voiceActivityDetector = _ref4$voiceActivityDe === undefined ? null : _ref4$voiceActivityDe;

    __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck___default()(this, MeshTopology);

    this._onChange = this._onChange.bind(this);

    this._localTopologyInfo = new LocalTopologyInfo({
      power: power,
      voiceActivityDetector: voiceActivityDetector,
      onUpdate: this._onLocalTopologyUpdate.bind(this)
    });
    this._topologyInfos = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default.a();
    this._changeListeners = new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set___default.a();
    this._ownId = ownId;
    this._active = false;
  }

  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass___default()(MeshTopology, [{
    key: 'toString',
    value: function toString() {
      if (this._topologyInfos.size === 0) {
        return 'meshTopology{ownId=' + this._ownId + ',' + this._localTopologyInfo + '}';
      }
      return 'meshTopology{ownId=' + this._ownId + ',' + [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(this._topologyInfos.values())).join(',') + '}';
    }
  }, {
    key: 'activate',


    // The mesh topology instance is only active when in the leader state
    // Being active means that it is possible to add, remove, and update peer link info,
    // and that changes will be signaled through the change listener
    value: function activate() {
      __WEBPACK_IMPORTED_MODULE_8_common_log__["default"].debug(TAG, 'activating ' + this);
      this._active = true;
      this._topologyInfos.clear();
      this._topologyInfos.set(this._ownId, this._localTopologyInfo);
      this._onChange(true);
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      __WEBPACK_IMPORTED_MODULE_8_common_log__["default"].debug(TAG, 'deactivating ' + this);
      this._active = false;
      this._topologyInfos.forEach(function (peerTopologyInfo) {
        return peerTopologyInfo._invalidate();
      });
      this._topologyInfos.clear();
      this._onChange(true);
    }
  }, {
    key: 'invalidate',
    value: function invalidate() {
      this._changeListeners.clear();
      this.deactivate(); // change listeners will not be called, since we cleared them
      this._changeListeners = null;
      this._ownId = null;
      this._localTopologyInfo._invalidate();
      this._localTopologyInfo = null;
      this._topologyInfos = null;
    }
  }, {
    key: 'addClient',
    value: function addClient(peerId) {
      if (!this._active) {
        throw new Error('Tried to add client while MeshTopology was deactivated');
      }
      if (this._topologyInfos.has(peerId)) {
        throw new Error('Tried to add existing client to MeshTopology');
      }
      var peerTopologyInfo = new PeerTopologyInfo(peerId, this._onChange);
      this._topologyInfos.set(peerId, peerTopologyInfo);
      __WEBPACK_IMPORTED_MODULE_8_common_log__["default"].debug(TAG, this, 'adding client: ' + peerId + ',  ' + peerTopologyInfo);
      this._onChange(false); // links will be added later
      return peerTopologyInfo;
    }
  }, {
    key: 'removeClient',
    value: function removeClient(peerId) {
      if (!this._active) {
        throw new Error('Tried to remove client while MeshTopology was deactivated');
      }
      if (!this._topologyInfos.has(peerId)) {
        throw new Error('Tried to remove missing client from MeshTopology');
      }
      this._topologyInfos.delete(peerId);
      __WEBPACK_IMPORTED_MODULE_8_common_log__["default"].debug(TAG, this, 'removed client: ' + peerId);
      this._onChange(true);
    }
  }, {
    key: 'addChangeListener',
    value: function addChangeListener(listener) {
      this._changeListeners.add(listener);
    }
  }, {
    key: 'removeChangeListener',
    value: function removeChangeListener(listener) {
      this._changeListeners.delete(listener);
    }
  }, {
    key: '_onChange',
    value: function _onChange(changedUpState) {
      var _this2 = this;

      this._changeListeners.forEach(function (listener) {
        return listener(_this2, changedUpState);
      });
    }
  }, {
    key: '_onLocalTopologyUpdate',
    value: function _onLocalTopologyUpdate(changedUpState) {
      this._onChange(changedUpState);
    }
  }, {
    key: 'topologyInfos',
    get: function get() {
      return this._topologyInfos;
    }
  }, {
    key: 'localTopologyInfo',
    get: function get() {
      return this._localTopologyInfo;
    }
  }, {
    key: 'active',
    get: function get() {
      return this._active;
    }
  }]);

  return MeshTopology;
}();

/* harmony default export */ __webpack_exports__["c"] = (MeshTopology);

/***/ }),
/* 159 */,
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(173), __esModule: true };

/***/ }),
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return EXPECTED_RTT_MS; });
/* unused harmony export FollowerMapEntry */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaderState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FollowerState; });
/* unused harmony export CandidateState */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return JoinerState; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_map__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_get__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_inherits__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_common_argCheck__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_common_log__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_common_utils__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_conference_raftConfiguration__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_conference_raftLogEntry__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_conference_raftMessages__ = __webpack_require__(141);





















var TAG = 'raft';

var EXPECTED_RTT_MS = 200;

// This doesn't need to be particularly low, but it's good to get rid
// of old followers so that we don't leak into unused send buffers,
// It should however be high enough that the follower has a chance to
// reconnect, so we set it higher than datachannel and ICE timeouts.
var FOLLOWER_REMOVE_TIMEOUT_MS = 15000;

var RaftState = function () {
  function RaftState(log, send, term) {
    __WEBPACK_IMPORTED_MODULE_9_babel_runtime_helpers_classCallCheck___default()(this, RaftState);

    this._log = log;
    this._send = send;
    this._term = __WEBPACK_IMPORTED_MODULE_11_common_argCheck__["a" /* default */].number(this, 'term', term);
  }

  __WEBPACK_IMPORTED_MODULE_10_babel_runtime_helpers_createClass___default()(RaftState, [{
    key: 'toFollower',
    value: function toFollower(term, leader, votedFor) {
      if (this.stop) {
        this.stop();
      }
      return new FollowerState(this._log, this._send, term, leader, votedFor);
    }
  }, {
    key: 'toCandidate',
    value: function toCandidate(term, preVoteDone) {
      if (this.stop) {
        this.stop();
      }
      return new CandidateState(this._log, this._send, term, preVoteDone);
    }
  }, {
    key: 'toLeader',
    value: function toLeader(term, configuration) {
      if (this.stop) {
        this.stop();
      }
      return new LeaderState(this._log, this._send, term, configuration);
    }
  }, {
    key: 'handleAppendEntriesRequest',
    value: function handleAppendEntriesRequest(peerId, message) {
      var response = this._log.handleAppendEntriesRequest(message);
      if (response) {
        this._send(peerId, response);
        return this.toFollower(message.term, peerId);
      }
    }
  }, {
    key: 'handleAppendEntriesResponse',
    value: function handleAppendEntriesResponse(peerId, message) {}
  }, {
    key: 'handleRequestVoteRequest',
    value: function handleRequestVoteRequest(peerId, message) {
      var granted = message.compareLog(this._log) >= 0;
      if (message.term === this._term) {
        if (this._votedFor === peerId) {
          // If we already voted for the peer this term, meaning we are a follower, resend the vote
          __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].debug(TAG, this, 'resending granted vote to peer, \'' + peerId + '\'');
          this._send(peerId, message.response({ granted: true }));
        } else if (this._votedFor) {
          // Or if we already voted for someone else, reject the vote
          __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].debug(TAG, this, 'rejecting vote for \'' + peerId + '\', already voted for ' + this._votedFor);
          this._send(peerId, message.response({ granted: false }));
        } else if (this instanceof FollowerState) {
          // If we are follower at this point, it means we rejected a vote for this term,
          // but may still select someone else to vote for.
          __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].debug(TAG, this, (granted ? 'granting' : 'rejecting') + ' same-term vote request from \'' + peerId + '\'');
          this._send(peerId, message.response({ granted: granted }));
          if (granted) {
            this._votedFor = peerId;
            return this;
          }
        } else {
          // Otherwise we are either leader or candidate and should reject the vote
          __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].debug(TAG, this, 'ignoring vote request from \'' + peerId + '\', already leader');
          this._send(peerId, message.response({ granted: false }));
        }
      } else if (message.term <= this._term) {
        // If the vote is for an old term, reject it
        this._send(peerId, message.response({ granted: false }));
      } else {
        // We received a vote request for a new term, but need to figure out if logs are up to date
        // TODO: we may want to ignore votes when we're still hearing from the leader
        this._send(peerId, message.response({ granted: granted }));
        if (this instanceof FollowerState) {
          this._term = __WEBPACK_IMPORTED_MODULE_11_common_argCheck__["a" /* default */].number('RaftState.handleRequestVoteRequest', 'message.term', message.term);
          this._leader = null;
          if (granted) {
            this._votedFor = peerId;
            return this;
          }
        } else {
          return this.toFollower(message.term, null, granted ? peerId : null);
        }
      }
    }
  }, {
    key: 'handleRequestVoteResponse',
    value: function handleRequestVoteResponse(peerId, message) {}
  }, {
    key: 'handlePreVoteRequest',
    value: function handlePreVoteRequest(peerId, message) {
      var granted = false;
      var reason = 'none';

      if (message.term < this._term) {
        // If the vote is for an old term, reject it
        granted = false;
        reason = 'old or current term';
      } else {
        // We received a vote request for a new term, but need to figure out if logs are up to date
        granted = message.compareLog(this._log) >= 0;
        reason = 'newer term';
      }
      __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].debug(TAG, this, (granted ? 'granting' : 'rejecting') + ' pre-vote request from \'' + peerId + '\' when ' + reason);
      this._send(peerId, message.response({ granted: granted }));
    }
  }, {
    key: 'handlePreVoteResponse',
    value: function handlePreVoteResponse(peerId, message) {}
  }, {
    key: 'handleSnapshotRequest',
    value: function handleSnapshotRequest(peerId, message) {}
  }, {
    key: 'handleSnapshotResponse',
    value: function handleSnapshotResponse(peerId, message) {}
  }, {
    key: 'handleStateOpRequest',
    value: function handleStateOpRequest(peerId, message) {
      this._send(peerId, message.response({ errorCode: __WEBPACK_IMPORTED_MODULE_16_conference_raftMessages__["k" /* StateOpResponse */].NOT_LEADER }));
    }

    // StateOpResponse is handled by StateMachine

  }, {
    key: 'forwardStateOpRequest',
    value: function forwardStateOpRequest(request) {}
  }, {
    key: 'hasVote',
    value: function hasVote(peerId) {
      return false;
    }
  }]);

  return RaftState;
}();

/* unused harmony default export */ var _unused_webpack_default_export = (RaftState);


var FollowerMapEntry = function () {
  function FollowerMapEntry(_ref) {
    var term = _ref.term,
        nextIndex = _ref.nextIndex,
        topologyInfo = _ref.topologyInfo,
        log = _ref.log,
        send = _ref.send,
        remove = _ref.remove;

    __WEBPACK_IMPORTED_MODULE_9_babel_runtime_helpers_classCallCheck___default()(this, FollowerMapEntry);

    this._term = term;
    this._log = log;
    this._send = send;
    this._removeSelf = remove;
    this._nextIndex = __WEBPACK_IMPORTED_MODULE_11_common_argCheck__["a" /* default */].number(this, 'nextIndex', nextIndex);
    this._matchIndex = 0;
    this._topologyInfo = topologyInfo;
    this._timeoutId = null;
    this._removeTimeoutId = null;
    this._idle = true;
    this._removeIndex = Infinity;
  }

  __WEBPACK_IMPORTED_MODULE_10_babel_runtime_helpers_createClass___default()(FollowerMapEntry, [{
    key: 'toString',
    value: function toString() {
      return 'FollowerMapEntry{term=' + this._term + ',ni=' + this._nextIndex + ',mi=' + this._matchIndex + '}';
    }
  }, {
    key: 'start',
    value: function start() {
      this._startTimeout();
      this._sendAppendRequest(0);
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this._timeoutId) {
        clearTimeout(this._timeoutId);
        this._timeoutId = null;
      }
      if (this._removeTimeoutId) {
        clearTimeout(this._removeTimeoutId);
        this._removeTimeoutId = null;
      }
      this._topologyInfo._invalidate();
    }

    // Followers that are removed should receive the information that they
    // have been removed, so we keep sending messages until we have received
    // a matchIndex that confirms that they have been informed of their own
    // removal.
    // By always using the minimum index it's safe to call this multiple
    // times as as configurations change.

  }, {
    key: 'phaseOutUntilIndex',
    value: function phaseOutUntilIndex(index) {
      var _this = this;

      if (this._removeIndex !== Infinity) {
        this._removeIndex = Math.min(this._removeIndex, index);
        this._removeTimeoutId = setTimeout(function () {
          _this._removeTimeoutId = null;
          _this._removeSelf();
        }, FOLLOWER_REMOVE_TIMEOUT_MS);
      }
    }
  }, {
    key: 'handleAppendEntriesResponse',
    value: function handleAppendEntriesResponse(message) {
      this._topologyInfo._update(message);

      if (message.success) {
        this._matchIndex = message.matchIndex;
        this._nextIndex = message.matchIndex + 1;
        if (this._log.lastLogIndex > this._nextIndex) {
          this._sendAppendRequest(5);
        } else {
          this._idle = true;
        }
      } else {
        this._nextIndex = message.matchIndex;
        if (this._nextIndex < 1) {
          this._nextIndex = 1;
        }
        this._sendAppendRequest(0);
      }

      if (this._matchIndex >= this._removeIndex) {
        clearTimeout(this._removeTimeoutId);
        this._removeTimeoutId = null;
        this._removeSelf();
      }
    }
  }, {
    key: '_onAppend',
    value: function _onAppend(toIndex) {
      // Will only trigger a send if we have received acks for all messages
      if (this._nextIndex === toIndex) {
        if (this._idle) {
          __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].verbose(TAG, this, 'was idle when matching entries were added, sending');
          this._sendAppendRequest(5);
        } else {
          __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].verbose(TAG, this, 'was busy when matching entries were added');
        }
      }
    }
  }, {
    key: '_sendAppendRequest',
    value: function _sendAppendRequest() {
      var maxEntries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      var prevIndex = this._nextIndex - 1;
      var prevTerm = this._log.entryTermAtIndex(prevIndex);
      var entries = this._log.sliceEntries(this._nextIndex, this._nextIndex + maxEntries);

      var maxCommitIndex = this._log.commitIndex;
      var lastEntryIndex = prevIndex + entries.length;
      var commitIndex = Math.min(maxCommitIndex, lastEntryIndex);

      this._send(__WEBPACK_IMPORTED_MODULE_16_conference_raftMessages__["b" /* AppendEntriesRequest */].create({
        term: this._term,
        topologyIndex: this._topologyInfo.topologyIndex,
        prevIndex: prevIndex,
        prevTerm: prevTerm,
        commitIndex: commitIndex,
        entries: entries
      }));

      this._idle = false;
    }
  }, {
    key: '_startTimeout',
    value: function _startTimeout() {
      var _this2 = this;

      if (this._timeoutId) {
        clearTimeout(this._timeoutId);
      }
      this._timeoutId = setTimeout(function () {
        _this2._startTimeout();
        _this2._sendAppendRequest(1);
      }, EXPECTED_RTT_MS * 4);
    }
  }, {
    key: 'matchIndex',
    get: function get() {
      return this._matchIndex;
    }
  }]);

  return FollowerMapEntry;
}();

/*
  ##       ########    ###    ########  ######## ########
  ##       ##         ## ##   ##     ## ##       ##     ##
  ##       ##        ##   ##  ##     ## ##       ##     ##
  ##       ######   ##     ## ##     ## ######   ########
  ##       ##       ######### ##     ## ##       ##   ##
  ##       ##       ##     ## ##     ## ##       ##    ##
  ######## ######## ##     ## ########  ######## ##     ##
*/

var LeaderState = function (_RaftState) {
  __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_inherits___default()(LeaderState, _RaftState);

  function LeaderState(log, send) {
    var term = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    __WEBPACK_IMPORTED_MODULE_9_babel_runtime_helpers_classCallCheck___default()(this, LeaderState);

    var _this3 = __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_possibleConstructorReturn___default()(this, (LeaderState.__proto__ || __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of___default()(LeaderState)).call(this, log, send, term));

    _this3._onTopologyChange = _this3._onTopologyChange.bind(_this3);

    // TODO: Leader should also have an election timeout that is triggered if not
    // a majority of the followers respond.
    _this3._followerMap = new __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_map___default.a();
    _this3._joinerMap = new __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_map___default.a();
    _this3._pendingAdditions = new __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set___default.a();
    _this3._pendingRemovals = new __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set___default.a();

    _this3.start();
    return _this3;
  }

  __WEBPACK_IMPORTED_MODULE_10_babel_runtime_helpers_createClass___default()(LeaderState, [{
    key: 'toString',
    value: function toString() {
      return 'leader{term=' + this._term + '}';
    }
  }, {
    key: 'start',
    value: function start() {
      var _this4 = this;

      this._log.createOpEntry({ term: this._term, op: __WEBPACK_IMPORTED_MODULE_15_conference_raftLogEntry__["a" /* OP */].noop });
      this._afterAppend();
      var nextIndex = this._log.lastLogIndex + 1;
      this._log.meshTopology.activate();
      this._log.meshTopology.addChangeListener(this._onTopologyChange);
      this._log.configuration.forEachPeer(function (peerId) {
        return _this4._addFollower(peerId, nextIndex);
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      this._followerMap.forEach(function (follower) {
        return follower.stop();
      });
      this._followerMap.clear();
      this._joinerMap.forEach(function (intervalId) {
        return clearInterval(intervalId);
      });
      this._joinerMap.clear();
      this._log.meshTopology.removeChangeListener(this._onTopologyChange);
      this._log.meshTopology.deactivate();
    }
  }, {
    key: '_onTopologyChange',
    value: function _onTopologyChange(topology, changedUpState) {
      var _this5 = this;

      if (!changedUpState) {
        // Leader only cares about connections going up and down, rtt/bw is for relaying
        return;
      }

      __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].verbose(TAG, this, 'got significant topology change, checking if any members should be removed');

      // First we figure out what member connections we are missing between ourselves and each follower
      var missingConnections = new __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_set___default.a();
      var localLinks = topology.localTopologyInfo.links;
      // this._followerMap.forEach((follower, peerId) => {
      this._log.configuration.members.forEach(function (peerId) {
        if (peerId === _this5._log.configuration.ownId) {
          return;
        }
        var localLink = localLinks[peerId];
        if (localLink && localLink.up) {
          return;
        }
        if (_this5._pendingRemovals.has(peerId)) {
          return;
        }
        missingConnections.add(peerId);
      });

      if (missingConnections.size === 0) {
        return;
      }

      // Look at the link infos for the rest of the cluster and keep all connections
      // where some other conference member has a conneciton.
      topology.topologyInfos.forEach(function (_ref2, peerId) {
        var links = _ref2.links;

        // If our link to the peer is down we don't trust the current peer link info
        var localLink = localLinks[peerId];
        if (!localLink || !localLink.up) {
          return;
        }
        if (_this5._followerMap.has(peerId)) {
          missingConnections.forEach(function (missingPeerId) {
            if (missingPeerId === peerId) {
              return;
            }
            if (links[missingPeerId] && links[missingPeerId].up) {
              __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].debug(TAG, _this5, 'not removing connection to ' + missingPeerId + ' because ' + peerId + ' has a connection');
              missingConnections.delete(missingPeerId);
            }
          });
        }
      });

      __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].info(TAG, this, 'removing connections to [' + [].concat(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(missingConnections)).join(',') + '] with topology: ' + topology);
      // Now we're left with all peers that should be removed
      missingConnections.forEach(function (peerId) {
        _this5._pendingRemovals.add(peerId);
      });
      this._handlePendingMembershipUpdates();
    }

    // When adding a peer it will always be in the joiner state. This is because a joiner
    // does not transition to follower until a configuration with their id has been committed.
    // Meaning that if we manager to get elected as leader, we will either see the peer in the
    // configuration and ignore the add request, or we won't and the peer must still be in
    // the joiner state.

  }, {
    key: 'addPeer',
    value: function addPeer(_ref3) {
      var _this6 = this;

      var peerId = _ref3.peerId,
          _ref3$mustRejoin = _ref3.mustRejoin,
          mustRejoin = _ref3$mustRejoin === undefined ? true : _ref3$mustRejoin;

      if (this._followerMap.has(peerId)) {
        var isMember = this._log.configuration.members.has(peerId);
        var localLink = this._log.meshTopology.localTopologyInfo.links[peerId];
        if (isMember && localLink && localLink.up && !mustRejoin) {
          __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].debug(TAG, this, 'got add request for follower, but the link is up, ignoring');
          return;
        } else {
          __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].debug(TAG, this, 'got add request for follower, ' + peerId + ', resetting state');
          this._removeFollower(peerId);
        }
      }
      if (this._joinerMap.has(peerId)) {
        __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].debug(TAG, this, 'got a second request to add peer ' + peerId);
        return;
      }
      __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].debug(TAG, this, 'added peer to joiners: ' + peerId);

      var sendSnapshot = function sendSnapshot() {
        var snapshot = _this6._log.createSnapshot(_this6._term);
        _this6._send(peerId, snapshot);
      };
      var intervalId = setInterval(sendSnapshot, EXPECTED_RTT_MS * 4);
      this._joinerMap.set(peerId, intervalId);
      sendSnapshot();
    }
  }, {
    key: 'appendConfiguration',
    value: function appendConfiguration(data) {
      var _this7 = this;

      var oldMembers = this._log.configuration.members;
      var entry = this._log.createConfigurationEntry({ term: this._term, data: data });
      var newMembers = this._log.configuration.members;

      var _diff = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_13_common_utils__["diff"])(oldMembers, newMembers),
          _diff2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray___default()(_diff, 2),
          addedPeers = _diff2[0],
          removedPeers = _diff2[1];

      var nextIndex = this._log.lastLogIndex + 1;

      addedPeers.forEach(function (peerId) {
        return _this7._addFollower(peerId, nextIndex);
      });
      removedPeers.forEach(function (peerId) {
        var follower = _this7._followerMap.get(peerId);
        if (follower) {
          follower.phaseOutUntilIndex(nextIndex);
        }
      });
      this._afterAppend();
      return entry;
    }
  }, {
    key: '_afterAppend',
    value: function _afterAppend() {
      var index = this._log.lastLogIndex;
      this._followerMap.forEach(function (follower) {
        follower._onAppend(index);
      });
      this._tryCommit();
    }
  }, {
    key: 'handleAppendEntriesRequest',
    value: function handleAppendEntriesRequest(peerId, message) {
      if (message.term === this._term) {
        __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].debug(TAG, 'ERROR: ' + this + ' received append request for own term: ' + message);
      } else if (message.term > this._term) {
        // A new leader was elected, allow it to take over
        return __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_get___default()(LeaderState.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of___default()(LeaderState.prototype), 'handleAppendEntriesRequest', this).call(this, peerId, message);
      }
    }
  }, {
    key: 'handleAppendEntriesResponse',
    value: function handleAppendEntriesResponse(peerId, message) {
      if (message.term === this._term) {
        // TODO: Add tests for this
        if (message.needSnapshot) {
          __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].debug(TAG, this, 'received append entries response from ' + peerId + ' with needSnapshot flag');
          this.addPeer({ peerId: peerId, mustRejoin: true });
          return;
        }
        // Got a response to one of our append requests
        var follower = this._followerMap.get(peerId);
        if (follower) {
          follower.handleAppendEntriesResponse(message);
          if (message.success) {
            // We have appended new log entires, might be able to increment commit index
            this._tryCommit();
          }
        } else {
          __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].debug(TAG, 'ERROR: ' + this + ' got append entries response from unknown peer: ' + peerId);
        }
      } else if (message.term > this._term) {
        __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].debug(TAG, 'ERROR: ' + this + ' received append response for newer term: ' + message);
      }
    }
  }, {
    key: 'handleSnapshotResponse',
    value: function handleSnapshotResponse(peerId, message) {
      if (message.term !== this._term) {
        __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].warning(TAG, this, 'received snapshot response for future term: ' + message);
        return;
      }
      var intervalId = this._joinerMap.get(peerId);
      if (!intervalId) {
        __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].debug(TAG, this, 'received snapshot response for missing joiner: ' + message);
        return;
      }
      clearInterval(intervalId);
      this._joinerMap.delete(peerId);

      __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].debug(TAG, this, 'accepted snapshot response from ' + peerId + ': ' + message);
      var lastIndex = message.lastIndex;

      this._addFollower(peerId, lastIndex + 1);

      this._pendingAdditions.add(peerId);
      this._handlePendingMembershipUpdates();
    }
  }, {
    key: 'handleStateOpRequest',
    value: function handleStateOpRequest(peerId, message) {
      this.forwardStateOpRequest(message);
      this._send(peerId, message.response());
    }
  }, {
    key: 'forwardStateOpRequest',
    value: function forwardStateOpRequest(request) {
      var id = request.id,
          op = request.op,
          args = request.args;

      this._log.createOpEntry({ term: this._term, id: id, op: op, args: args });
      this._afterAppend();
    }
  }, {
    key: '_tryCommit',
    value: function _tryCommit() {
      var matchIndices = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, this._log.configuration.ownId, this._log.lastLogIndex);
      this._followerMap.forEach(function (follower, clientId) {
        matchIndices[clientId] = follower.matchIndex;
      });
      var majorityMatchIndex = this._log.configuration.getMajorityIndex(matchIndices);
      var committed = this._log.tryCommitIndexForTerm(majorityMatchIndex, this._term);

      if (committed && committed.length) {
        this._followerMap.forEach(function (follower) {
          return follower._sendAppendRequest(0);
        });
      }

      if (committed && committed.some(function (entry) {
        return entry instanceof __WEBPACK_IMPORTED_MODULE_15_conference_raftLogEntry__["b" /* ConfigurationEntry */];
      })) {
        // This assumes that there can only be a single un-committed configuration log entry
        // at any given time for any leader. Afaik that is true but needs some proof.
        this._handlePendingMembershipUpdates();
      }
    }
  }, {
    key: '_handlePendingMembershipUpdates',
    value: function _handlePendingMembershipUpdates() {
      if (this._pendingAdditions.size + this._pendingRemovals.size === 0) {
        return;
      }

      var members = this._log.configuration.members;

      // The configuration implementation in the first Raft paper is more
      // complex and less robus than the one in the thesis.
      // The basic concept of the one from the thesis is that as long as
      // we do few enough additions or removals each time, it is safe.
      //
      // TODO: It's possible to add or remove more than one members at
      // at time in large clusters, figure out limits.
      if (this._pendingRemovals.size) {
        var _ref4 = [].concat(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(this._pendingRemovals)),
            removed = _ref4[0];

        this._pendingRemovals.delete(removed);
        members.delete(removed);
      } else if (this._pendingAdditions.size) {
        var _ref5 = [].concat(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(this._pendingAdditions)),
            added = _ref5[0];

        this._pendingAdditions.delete(added);
        members.add(added);
      }

      var data = this._log.configuration.createMembersChange(members);
      this.appendConfiguration(data);
    }
  }, {
    key: '_addFollower',
    value: function _addFollower(peerId, nextIndex) {
      var _this8 = this;

      if (this._followerMap.has(peerId)) {
        __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].debug(TAG, this, 'not adding new follower, already exists since joining: ' + peerId);
        return;
      }
      __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].debug(TAG, this, 'added peer to followers: ' + peerId);
      var send = function send(message) {
        return _this8._send(peerId, message);
      };
      var topologyInfo = this._log.meshTopology.addClient(peerId);
      var follower = new FollowerMapEntry({
        term: this._term,
        nextIndex: nextIndex,
        topologyInfo: topologyInfo,
        log: this._log,
        send: send,
        remove: this._removeFollower.bind(this, peerId)
      });
      this._followerMap.set(peerId, follower);
      follower.start();
    }
  }, {
    key: '_removeFollower',
    value: function _removeFollower(peerId) {
      var follower = this._followerMap.get(peerId);
      if (follower) {
        follower.stop();
        this._followerMap.delete(peerId);
        this._log.meshTopology.removeClient(peerId);
      } else {
        __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].warning(TAG, this, 'failed to remove missing follower: ' + peerId);
      }
    }
  }]);

  return LeaderState;
}(RaftState);

/*
  ########  #######  ##       ##        #######  ##      ## ######## ########
  ##       ##     ## ##       ##       ##     ## ##  ##  ## ##       ##     ##
  ##       ##     ## ##       ##       ##     ## ##  ##  ## ##       ##     ##
  ######   ##     ## ##       ##       ##     ## ##  ##  ## ######   ########
  ##       ##     ## ##       ##       ##     ## ##  ##  ## ##       ##   ##
  ##       ##     ## ##       ##       ##     ## ##  ##  ## ##       ##    ##
  ##        #######  ######## ########  #######   ###  ###  ######## ##     ##
*/

var FollowerState = function (_RaftState2) {
  __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_inherits___default()(FollowerState, _RaftState2);

  function FollowerState(log, send) {
    var term = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var leader = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var votedFor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    __WEBPACK_IMPORTED_MODULE_9_babel_runtime_helpers_classCallCheck___default()(this, FollowerState);

    var _this9 = __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_possibleConstructorReturn___default()(this, (FollowerState.__proto__ || __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of___default()(FollowerState)).call(this, log, send, term));

    __WEBPACK_IMPORTED_MODULE_11_common_argCheck__["a" /* default */].optString(_this9, 'leader', leader);

    _this9._sendPreVoteRequests = _this9._sendPreVoteRequests.bind(_this9);

    _this9._leader = leader;
    _this9._votedFor = votedFor;

    // When doing a pre-vote, this is the term we would candidate for
    _this9._targetTerm = null;
    return _this9;
  }

  __WEBPACK_IMPORTED_MODULE_10_babel_runtime_helpers_createClass___default()(FollowerState, [{
    key: 'toString',
    value: function toString() {
      return 'follower{term=' + this._term + ',leader=' + this._leader + ',votedFor=' + this._votedFor + '}';
    }
  }, {
    key: 'hasVote',
    value: function hasVote(peerId) {
      return this._votedFor === peerId;
    }
  }, {
    key: 'toFollower',
    value: function toFollower(term, leader) {
      var votedFor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (term > this._term) {
        this._term = term;
        this._leader = leader;
        this._votedFor = votedFor;
      }
      if (term === this._term && !this._leader) {
        this._leader = leader;
      }
      this.stop();
      return this;
    }

    // The below code is a part of the pre-vote modification of Raft, see raftMessages.js

  }, {
    key: 'toCandidate',
    value: function toCandidate(term, preVoteDone) {
      if (preVoteDone) {
        return __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_get___default()(FollowerState.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of___default()(FollowerState.prototype), 'toCandidate', this).call(this, term, preVoteDone);
      }
      this.stop();
      this._targetTerm = term;
      this._preVotes = new __WEBPACK_IMPORTED_MODULE_14_conference_raftConfiguration__["d" /* Votes */](this._log.configuration.ownId);
      this.start();
      return this;
    }
  }, {
    key: 'start',
    value: function start() {
      this._sendPreVoteRequests();
      this._intervalId = setInterval(this._sendPreVoteRequests, EXPECTED_RTT_MS * 4);
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this._intervalId) {
        clearInterval(this._intervalId);
        this._intervalId = null;
      }
      if (this._targetTerm) {
        this._targetTerm = null;
        this._preVotes = null;
      }
    }
  }, {
    key: 'handleSnapshotRequest',
    value: function handleSnapshotRequest(peerId, message) {
      if (this._term > message.term || this._log.commitIndex > message.lastIndex) {
        __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].debug(TAG, this, 'received old snapshot from ' + peerId + ': ' + message);
        return; // ignore old snapshots
      }
      __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].info(TAG, this, 'received new snapshot from ' + peerId + ': ' + message);
      this._log.loadSnapshot(message);
      this._send(peerId, message.response());
      return this.toFollower(this._term, peerId);
    }
  }, {
    key: 'handlePreVoteResponse',
    value: function handlePreVoteResponse(peerId, message) {
      if (this._targetTerm && message.term === this._targetTerm) {
        // We got a vote for the current term, so we store the reply and check if we
        // have received enough votes to have a majority and become leader
        this._preVotes.set(peerId, message.granted);
        __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].debug(TAG, this, 'received pre-vote reply from ' + peerId + ': ' + (message.granted ? 'granted' : 'rejected'));
        if (this._log.configuration.hasMajority(this._preVotes.grantedVotes)) {
          return __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_get___default()(FollowerState.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of___default()(FollowerState.prototype), 'toCandidate', this).call(this, this._targetTerm, true);
        }
      }
    }
  }, {
    key: 'forwardStateOpRequest',
    value: function forwardStateOpRequest(request) {
      if (this._leader) {
        this._send(this._leader, request);
      } else {
        // We just let the client time out for now
        // TODO: Use an async queue to serialize messages and send feedback
      }
    }
  }, {
    key: '_sendPreVoteRequests',
    value: function _sendPreVoteRequests() {
      var _this10 = this;

      var request = __WEBPACK_IMPORTED_MODULE_16_conference_raftMessages__["f" /* PreVoteRequest */].create({
        term: this._targetTerm, // we're going to be voting in the next term
        lastLogTerm: this._log.lastLogTerm,
        lastLogIndex: this._log.lastLogIndex
      });

      this._log.configuration.forEachPeer(function (peerId) {
        if (!_this10._preVotes.has(peerId)) {
          _this10._send(peerId, request);
        }
      });
    }
  }]);

  return FollowerState;
}(RaftState);

/*
   ######     ###    ##    ## ########  #### ########     ###    ######## ########
  ##    ##   ## ##   ###   ## ##     ##  ##  ##     ##   ## ##      ##    ##
  ##        ##   ##  ####  ## ##     ##  ##  ##     ##  ##   ##     ##    ##
  ##       ##     ## ## ## ## ##     ##  ##  ##     ## ##     ##    ##    ######
  ##       ######### ##  #### ##     ##  ##  ##     ## #########    ##    ##
  ##    ## ##     ## ##   ### ##     ##  ##  ##     ## ##     ##    ##    ##
   ######  ##     ## ##    ## ########  #### ########  ##     ##    ##    ########
*/

var CandidateState = function (_RaftState3) {
  __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_inherits___default()(CandidateState, _RaftState3);

  function CandidateState(log, send, term, preVoteDone) {
    __WEBPACK_IMPORTED_MODULE_9_babel_runtime_helpers_classCallCheck___default()(this, CandidateState);

    var _this11 = __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_possibleConstructorReturn___default()(this, (CandidateState.__proto__ || __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of___default()(CandidateState)).call(this, log, send, term));

    _this11._tick = _this11._tick.bind(_this11);

    // Start by gathering a majority of pre-votes, otherwise we wait until next election.
    // Pre-votes are a modification to Raft, see raftMessages.js
    _this11._preVoteDone = preVoteDone;
    _this11._preVotes = preVoteDone ? null : new __WEBPACK_IMPORTED_MODULE_14_conference_raftConfiguration__["d" /* Votes */](log.configuration.ownId);
    _this11._votes = preVoteDone ? new __WEBPACK_IMPORTED_MODULE_14_conference_raftConfiguration__["d" /* Votes */](log.configuration.ownId) : null;
    _this11._intervalId = null;

    _this11.start();
    return _this11;
  }

  __WEBPACK_IMPORTED_MODULE_10_babel_runtime_helpers_createClass___default()(CandidateState, [{
    key: 'toString',
    value: function toString() {
      return 'candidate{term=' + this._term + ',votes=' + this._votes + '}';
    }
  }, {
    key: 'start',
    value: function start() {
      this._tick();
      this._intervalId = setInterval(this._tick, EXPECTED_RTT_MS * 4);
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this._intervalId) {
        clearInterval(this._intervalId);
        this._intervalId = null;
      }
    }
  }, {
    key: '_tick',
    value: function _tick() {
      var _this12 = this;

      var requestFactory = this._preVoteDone ? __WEBPACK_IMPORTED_MODULE_16_conference_raftMessages__["d" /* RequestVoteRequest */] : __WEBPACK_IMPORTED_MODULE_16_conference_raftMessages__["f" /* PreVoteRequest */];
      var voteCollection = this._preVoteDone ? this._votes : this._preVotes;

      var request = requestFactory.create({
        term: this._term,
        lastLogTerm: this._log.lastLogTerm,
        lastLogIndex: this._log.lastLogIndex
      });

      this._log.configuration.forEachPeer(function (peerId) {
        if (!voteCollection.has(peerId)) {
          _this12._send(peerId, request);
        }
      });
    }
  }, {
    key: 'handlePreVoteResponse',
    value: function handlePreVoteResponse(peerId, message) {
      if (!this._preVoteDone && message.term === this._term) {
        // We got a vote for the current term, so we store the reply and check if we
        // have received enough votes to have a majority and become leader
        this._preVotes.set(peerId, message.granted);
        __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].debug(TAG, this, 'received pre-vote reply from ' + peerId + ': ' + (message.granted ? 'granted' : 'rejected'));
        if (this._log.configuration.hasMajority(this._preVotes.grantedVotes)) {
          this._preVoteDone = true;
          this._votes = new __WEBPACK_IMPORTED_MODULE_14_conference_raftConfiguration__["d" /* Votes */](this._log.configuration.ownId);
          // trigger tick and reset timer
          this.stop();
          this.start();
        }
      }
    }
  }, {
    key: 'handleRequestVoteResponse',
    value: function handleRequestVoteResponse(peerId, message) {
      if (this._preVoteDone && message.term === this._term) {
        // We got a vote for the current term, so we store the reply and check if we
        // have received enough votes to have a majority and become leader
        this._votes.set(peerId, message.granted);
        __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].debug(TAG, this, 'received vote reply from ' + peerId + ': ' + (message.granted ? 'granted' : 'rejected'));
        if (this._log.configuration.hasMajority(this._votes.grantedVotes)) {
          return this.toLeader(this._term);
        }
      }
    }
  }]);

  return CandidateState;
}(RaftState);

/*
        ##  #######  #### ##    ## ######## ########
        ## ##     ##  ##  ###   ## ##       ##     ##
        ## ##     ##  ##  ####  ## ##       ##     ##
        ## ##     ##  ##  ## ## ## ######   ########
  ##    ## ##     ##  ##  ##  #### ##       ##   ##
  ##    ## ##     ##  ##  ##   ### ##       ##    ##
   ######   #######  #### ##    ## ######## ##     ##
*/

// The joiner state is a new state not documented in the main raft paper.
//
// In this state the client waits for a snapshot request to be able to join in, it
// then waits for a configuration to be committed where the client is a member of the cluster.
//
// When adding a peer, the leader will first send snaptshots until a snapshot response for
// the current term is received. It will then request a new configuration which includes the
// new client as soon as possible.
//
// Clients in the joiner state will not vote or be requested to vote, they will also not
// time out and start candidating.
var JoinerState = function (_RaftState4) {
  __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_inherits___default()(JoinerState, _RaftState4);

  function JoinerState(log, send) {
    __WEBPACK_IMPORTED_MODULE_9_babel_runtime_helpers_classCallCheck___default()(this, JoinerState);

    return __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_possibleConstructorReturn___default()(this, (JoinerState.__proto__ || __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of___default()(JoinerState)).call(this, log, send, 0));
  }

  __WEBPACK_IMPORTED_MODULE_10_babel_runtime_helpers_createClass___default()(JoinerState, [{
    key: 'toString',
    value: function toString() {
      return 'joiner{}';
    }
  }, {
    key: 'handleAppendEntriesRequest',
    value: function handleAppendEntriesRequest(peerId, message) {
      if (this._term === 0) {
        // We haven't received a snapshot yet. The old leader was probably replaced and the new one thinks
        // we're a regular cluster member.
        this._send(peerId, message.response({ needSnapshot: true }));
        return;
      }
      var response = this._log.handleAppendEntriesRequest(message);
      if (response) {
        this._send(peerId, response);
        this._term = message.term;
        return this._convertToFollowerIfMember(peerId);
      }
    }
  }, {
    key: 'handleAppendEntriesResponse',
    value: function handleAppendEntriesResponse(peerId, message) {}
  }, {
    key: 'handleRequestVoteRequest',
    value: function handleRequestVoteRequest(peerId, message) {
      // joiners do not participate in voting in any way
    }
  }, {
    key: 'handleRequestVoteResponse',
    value: function handleRequestVoteResponse(peerId, message) {}
  }, {
    key: 'handleSnapshotRequest',
    value: function handleSnapshotRequest(peerId, message) {
      if (this._term > message.term || this._log.commitIndex > message.lastIndex) {
        return; // ignore old snapshots
      }
      this._log.loadSnapshot(message);
      this._send(peerId, message.response());
      this._term = message.term;
      return this._convertToFollowerIfMember(peerId);
    }
  }, {
    key: 'handleSnapshotResponse',
    value: function handleSnapshotResponse(peerId, message) {}
  }, {
    key: '_convertToFollowerIfMember',
    value: function _convertToFollowerIfMember(peerId) {
      var configData = this._log.getCommittedConfigurationData();
      var ownId = this._log.configuration.ownId;
      if (configData.includes(ownId)) {
        __WEBPACK_IMPORTED_MODULE_12_common_log__["default"].info(TAG, this, 'found itself in committed configuration, converting to follower');
        return this.toFollower(this._term, peerId);
      }
    }
  }]);

  return JoinerState;
}(RaftState);

/***/ }),
/* 171 */,
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(174), __esModule: true };

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32);
__webpack_require__(22);
module.exports = __webpack_require__(175);


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32);
__webpack_require__(22);
module.exports = __webpack_require__(176);


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(15);
var get = __webpack_require__(66);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(45);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(24);
module.exports = __webpack_require__(0).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_common_argCheck__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_common_log__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_conference_raftLog__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_conference_raftLogEntry__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_conference_raftConfiguration__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_conference_meshTopology__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_conference_raftStateMachine__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_conference_raftState__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_conference_raftMessages__ = __webpack_require__(141);


















/*
  Conferencing consensus plan:

  Raft (https://raft.github.io/) provides a simple consensus algorithm which
  is quite easy to implement and prove to be correct. It does not provide
  Byzantine fault tolerance, i.e. it assumes that all clients behave correctly.

  Each conference client participates in the Raft consensus protocol, there are no
  client-only nodes, like e.g. in etcd.
  The primary purpose of the Raft implementation is to provide a unified view of who the
  members of the conference are. Although it might prove to be useful for other types of
  log replication at a later stage.

  Raft supports controlled reconfiguration of the cluster members, which means that clients
  can be added and removed as long as a majority of the current cluster can agree on the change.
  For conferences we will sometimes see big changes in the number of participants. Adding
  members is quite straight-forward to do with the baseline Raft implementation, even if
  the new members make up the majority in the new configuration. Removing members is also
  straight-forward as long as the removed clients stay connected until the new configuration
  is in place.
  The tricky bit is getting rid of disconnected clients. The cluster needs to be able to
  reach a consensus that a client has been disconnected and can be removed. This will be
  even more troublesome if a majority of the cluster disconnects, as it may cause the
  new configuration and the entire cluster to get stuck in a bad state. Some mechanism
  for handling netsplits by letting minorities break away from the cluster needs to be
  implemented, as well as a mechanism for those clients to potentially rejoin the cluster
  at a later point.

  Alternative approaches:

  The main alternative to using Raft that is being considered is that all peers would
  simply broadcast the peers that they are connected to to all their connected peers.
  This way every peer would be able to get a somewhat complete view of the members,
  although it would fail to report peers that are more than two hops away. Consider
  the below scenario where clients A, B, C and D only have 3 connections set up so far.

    A <-> B <-> C <-> D

  With the proposed solution, A would be unaware of D's existence, and vice versa.
  This could be worked around by sending more information between the peers, with the
  downside of added complexity and bandwidth usage.
  Btw, Raft does not behave perfectly in the above scenario either, as A and D would take
  turns in triggering new elections, but there will still be some log replication happening
  and new connections should be set up soon enough.

  Another issue is feedback for the clients, should A respond to requests from B? Raft solves
  this with heartbeats and election timeouts.

  In the end the main reason for choosing Raft is that it is an established algorithm that
  is simple and easy to proove to be correct. Since raft needs to be extended a bit in order
  to work for conferences, it is possible that this alternative is reveisited if the
  modifications end up being too complex.
  A downside of using Raft is that the log replication functionality is not used at the
  moment, and it arguably what adds the most complexity to the algorithm. However, it is
  quite likely that it will be used in the future for Smart Mesh or SFU.

  Conference setup flow:

  An important piece of functionality for the below flow is that it is possible to generate
  a single offer that is valid for multiple peer connections, as long as all peer connections
  are configured to use the same certificate. We will try to use this functionality initially
  but may have to fall back to a more tranditional singaling approach if we run into trouble
  with plugins and native mobile clients.

  When joining a conference, send a JOIN message with the Raft ID and an offer SDP.
  Now one of two things may happen, either there is already an existing conference and the
  client will be added, or no one replies, and we wait. We likely want to repeat the JOIN
  message every so often while waiting, in order to provide some fault tolerance.

  When an existing conference sees a JOIN message a number of different things may happen
  depending on the state of the conference. But this is the general algorithm:

  (1) Upon receiving a JOIN message, every client adds the peer to a list of joining peers.
  (2) Every client that is a leader (there may be multiple with different terms) will
      send an answer to the joining peer. The joiner will set up a connection for each answer.
  (3) Once connected the leader(s) will add the peer as a joining client, and will start
      off by sending a snapshot of the current state. Once a reply from the snapshot request
      has been received the leader will request a configuration change which includes the new
      client.
      The joining client will prioritize snapshots with the latest term, and ignored old ones.
      Once the client has received a configuration where they are present and the configuration
      has been committed, they will convert to a follower and be a full member of the cluster.
      During this time, the joining client will communicate via the current p2p connections
      to set up new connections towards the other members of the cluster.
  (4) If there is a leadership change during the above process, the new leader will start over
      at (2), that is if the client has not already joined the cluster. This is why every
      client must keep track of JOIN messages.

  Removing disconnected members:

  The current plan is that each client will include the clients that it is not connected
  to in the heartbeat responses. That will make it possible for the leader to detect when
  no client is able to reach another client, and may then initiate a reconfiguration.

  The trickier problem of handling netsplits where the conference is split into segments
  is not yet solved. The current idea is to modify the voting algorithm and have vote
  requests include connected peers. Hopefully it'll be possible to find a simple way to
  simultaneously do an instant reconfiguration and leader election. This is probably
  doable because the majority log consistency constraint can be ignored. When the segment
  that has been spliced out rejoins the conference, the logs don't have to be consistent,
  it'll be possible to just do a regular join via snapshots.

  Updates:

  25-03-2017, Client IDs:

  The current implementation uses separate IDs for users and raft client, i.e. there is a 1-N mapping
  of user to raft IDs. This is because if the raft client state is lost is it no longer safe to rejoin
  the cluster using the same ID. Entries are committed based on the knowledge that clients are up to date,
  and if a client loses it's state and then reconnects using the same ID, incorrect assumptions may be
  made about what entries are actually committed.

  A planned change will consolidate the IDs to only use user IDs for all clients. This makes the conference
  implementation a lot simpler and easier to reason about. The reason this change can be made is the
  introduction of the Joiner state and messages. Built into the raft algorithm is the guarantee that if
  there exists a commit index N within the cluster, only clients that have at least N matching entries
  can ever be elected leader. Since clients that are joining the cluster always do so through a leader,
  it means that if a client reconnects, it will always receive a snapshot that restores at least N entries.
  This means that any commit index determined by a leader will stay correct, even if a client loses it's
  state and reconnects.

  One caveat is that clients that lose their state MUST rejoin the cluster through the joiner mechanism.
  If they simply rejoin as members then the above assumption does not hold and the implementation is not safe.

  The crucial bit is that reconnecting members do not vote until they have received a snapshot. It is also
  important that all snapshots that are sent contain all of the current log entries of the leader, otherwise
  reconnecting members might receive a partial snapshot were they are member, and begin voting too early.

  It is also possible that the disconnected client will be removed from the cluster before it rejoins. In
  that case the original rule of the raft algorithm applies, since if it is possible to update the
  configuration without the participation of the disconnected client, then the entries prior to the
  reconfiguration can be considered committed, even without the disconnected client.

  If the reconfiguration can not be committed due to lack of majority, the state machine will lock up until
  either the member reconnects, or some other mechanism is used to recover. The change proposed above does
  not solve this issue, but it likely does not make it more difficult to solve either.
 */

var WaitList = function () {
  function WaitList() {
    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, WaitList);

    this._entries = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_map___default.a();
  }

  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(WaitList, [{
    key: 'add',
    value: function add(_ref) {
      var peerId = _ref.peerId,
          mustRejoin = _ref.mustRejoin,
          ttlMs = _ref.ttlMs;

      var endTime = Date.now() + ttlMs;

      if (this._entries.has(peerId)) {
        var entry = this._entries.get(peerId);
        endTime = Math.max(endTime, entry.endTime);
        mustRejoin = mustRejoin || entry.mustRejoin;
      }

      this._entries.set(peerId, { endTime: endTime, mustRejoin: mustRejoin });
    }
  }, {
    key: 'delete',
    value: function _delete(peerId) {
      this._entries.delete(peerId);
    }
  }, {
    key: 'deleteAll',
    value: function deleteAll(peerIds) {
      var _this = this;

      peerIds.forEach(function (peerId) {
        return _this.delete(peerId);
      });
    }
  }, {
    key: 'get',
    value: function get() {
      var _this2 = this;

      var waiting = new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set___default.a();
      var deleted = new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set___default.a();
      var now = Date.now();
      this._entries.forEach(function (_ref2, peerId) {
        var mustRejoin = _ref2.mustRejoin,
            endTime = _ref2.endTime;

        if (now < endTime) {
          waiting.add({ peerId: peerId, mustRejoin: mustRejoin });
        } else {
          deleted.add(peerId);
        }
      });
      deleted.forEach(function (peerId) {
        return _this2._entries.delete(peerId);
      });
      return waiting;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this._entries.clear();
    }
  }]);

  return WaitList;
}();

var TAG = 'raft';

var ELECTION_DEADLOCK_LIMIT = 3;

var Raft = function () {
  function Raft() {
    var _this3 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, Raft);

    var id = options.id,
        meshTopology = options.meshTopology,
        onMessage = options.onMessage,
        onStateChange = options.onStateChange,
        onMembersChange = options.onMembersChange,
        onLeadershipChange = options.onLeadershipChange,
        onReplicationDeadlock = options.onReplicationDeadlock;


    this._send = this._send.bind(this);
    this._onElectionTimeout = this._onElectionTimeout.bind(this);
    this._onConfigurationCommitted = this._onConfigurationCommitted.bind(this);

    this._id = __WEBPACK_IMPORTED_MODULE_5_common_argCheck__["a" /* default */].string(this, 'id', id);
    __WEBPACK_IMPORTED_MODULE_5_common_argCheck__["a" /* default */].instance(this, 'meshTopology', meshTopology, __WEBPACK_IMPORTED_MODULE_10_conference_meshTopology__["c" /* default */]);
    this._onMessage = __WEBPACK_IMPORTED_MODULE_5_common_argCheck__["a" /* default */].optFunc(this, 'onMessage', onMessage);
    __WEBPACK_IMPORTED_MODULE_5_common_argCheck__["a" /* default */].optFunc(this, 'onStateChange', onStateChange);
    this._onMembersChange = __WEBPACK_IMPORTED_MODULE_5_common_argCheck__["a" /* default */].optFunc(this, 'onMembersChange', onMembersChange);
    this._onLeadershipChange = __WEBPACK_IMPORTED_MODULE_5_common_argCheck__["a" /* default */].optFunc(this, 'onLeadershipChange', onLeadershipChange);
    this._onReplicationDeadlock = __WEBPACK_IMPORTED_MODULE_5_common_argCheck__["a" /* default */].optFunc(this, 'onReplicationDeadlock', onReplicationDeadlock);

    this._raftState = null;
    this._electionTimeoutId = null;
    this._electionTimeoutTriggerCount = 0;
    this._waitList = new WaitList();
    this._stateMachine = new __WEBPACK_IMPORTED_MODULE_11_conference_raftStateMachine__["a" /* default */]({
      onStateChange: onStateChange,
      onConfigurationCommitted: this._onConfigurationCommitted,
      onStateOpRequest: function onStateOpRequest(request) {
        return _this3._raftState && _this3._raftState.forwardStateOpRequest(request);
      }
    });
    this._log = new __WEBPACK_IMPORTED_MODULE_7_conference_raftLog__["a" /* default */]({
      meshTopology: meshTopology,
      configuration: new __WEBPACK_IMPORTED_MODULE_9_conference_raftConfiguration__["a" /* default */]({ ownId: id }),
      stateMachine: this._stateMachine
    });
  }

  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(Raft, [{
    key: 'toString',
    value: function toString() {
      return 'raft{id=' + this.id + ',' + this._raftState + ',' + this._log + ',' + this._stateMachine + '}';
    }
  }, {
    key: 'start',
    value: function start() {
      var initialMembers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [this.id];

      this.stop();
      this._stateMachine.start();

      var data = new __WEBPACK_IMPORTED_MODULE_9_conference_raftConfiguration__["b" /* ConfigurationData */](new __WEBPACK_IMPORTED_MODULE_9_conference_raftConfiguration__["c" /* Members */](initialMembers));
      this._log.configuration.set(data);

      if (this.log.configuration.hasMajority(new __WEBPACK_IMPORTED_MODULE_9_conference_raftConfiguration__["d" /* Votes */](this._id))) {
        this._setState(new __WEBPACK_IMPORTED_MODULE_12_conference_raftState__["a" /* LeaderState */](this._log, this._send, 1));
        __WEBPACK_IMPORTED_MODULE_6_common_log__["default"].debug(TAG, this, 'starting as leader, signaling configuration commit');
        this._onConfigurationCommitted();
      } else {
        this._setState(new __WEBPACK_IMPORTED_MODULE_12_conference_raftState__["b" /* FollowerState */](this._log, this._send));
      }
    }
  }, {
    key: 'startPassive',
    value: function startPassive() {
      this.stop();
      this._stateMachine.start();
      this._setState(new __WEBPACK_IMPORTED_MODULE_12_conference_raftState__["c" /* JoinerState */](this._log, this._send));
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this._raftState && this._raftState.stop) {
        this._raftState.stop();
      }
      this._stateMachine.stop();

      this._waitList.clear();

      this._log.clear();
      var data = new __WEBPACK_IMPORTED_MODULE_9_conference_raftConfiguration__["b" /* ConfigurationData */](new __WEBPACK_IMPORTED_MODULE_9_conference_raftConfiguration__["c" /* Members */]());
      this._log.configuration.set(data);

      this._setState(null); // Use _setState to properly trigger leadership change
      this._stopElectionTimeout();
    }
  }, {
    key: 'get',
    value: function get(key) {
      __WEBPACK_IMPORTED_MODULE_5_common_argCheck__["a" /* default */].string('Raft.get', 'key', key);
      return this._stateMachine.state[key];
    }
  }, {
    key: 'append',
    value: function append(key, value) {
      var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref3$retryTtlMs = _ref3.retryTtlMs,
          retryTtlMs = _ref3$retryTtlMs === undefined ? 3000 : _ref3$retryTtlMs;

      __WEBPACK_IMPORTED_MODULE_5_common_argCheck__["a" /* default */].string('Raft.append', 'key', key);
      if (!this._raftState) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(new Error('Raft is stopped'));
      }
      return this._stateMachine.requestStateOp({
        op: __WEBPACK_IMPORTED_MODULE_8_conference_raftLogEntry__["a" /* OP */].append,
        args: [key, value],
        retryTtlMs: retryTtlMs
      });
    }
  }, {
    key: 'set',
    value: function set(key, value) {
      var _ref4 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref4$retryTtlMs = _ref4.retryTtlMs,
          retryTtlMs = _ref4$retryTtlMs === undefined ? 3000 : _ref4$retryTtlMs;

      __WEBPACK_IMPORTED_MODULE_5_common_argCheck__["a" /* default */].string('Raft.set', 'key', key);
      if (!this._raftState) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(new Error('Raft is stopped'));
      }
      return this._stateMachine.requestStateOp({
        op: __WEBPACK_IMPORTED_MODULE_8_conference_raftLogEntry__["a" /* OP */].set,
        args: [key, value],
        retryTtlMs: retryTtlMs
      });
    }

    // mustRejoin should be true if the peer is currently in another cluster. Otherwise
    // we will end up with inconsistencies in the raft log.

  }, {
    key: 'addPeer',
    value: function addPeer(peerId) {
      var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref5$mustRejoin = _ref5.mustRejoin,
          mustRejoin = _ref5$mustRejoin === undefined ? true : _ref5$mustRejoin,
          _ref5$waitlistTtlMs = _ref5.waitlistTtlMs,
          waitlistTtlMs = _ref5$waitlistTtlMs === undefined ? 0 : _ref5$waitlistTtlMs;

      this._waitList.add({ peerId: peerId, mustRejoin: mustRejoin, ttlMs: waitlistTtlMs });
      if (this._raftState && this._raftState.addPeer) {
        this._raftState.addPeer({ peerId: peerId, mustRejoin: mustRejoin });
      }
    }
  }, {
    key: '_send',
    value: function _send(peerId, body) {
      __WEBPACK_IMPORTED_MODULE_6_common_log__["default"].verbose(TAG, this, 'send message to \'' + peerId + '\': ' + body);
      this._onMessage(peerId, body);
    }
  }, {
    key: '_setState',
    value: function _setState(newState) {
      var _this4 = this;

      var wasLeader = this._raftState instanceof __WEBPACK_IMPORTED_MODULE_12_conference_raftState__["a" /* LeaderState */];
      this._raftState = newState;
      if (this._raftState instanceof __WEBPACK_IMPORTED_MODULE_12_conference_raftState__["a" /* LeaderState */]) {
        this._stopElectionTimeout();
        this._waitList.get().forEach(function (_ref6) {
          var peerId = _ref6.peerId,
              mustRejoin = _ref6.mustRejoin;

          // Even after becoming leader we must add the peers from the waitlist, in case they never got
          // a snapshot from the previous leader.
          // This means that reconnecting clients will keep getting snapshots from new leaders until the add
          // ttl runs out, so it should not be too long.
          _this4._raftState.addPeer({ peerId: peerId, mustRejoin: mustRejoin });
        });
      } else if (this._raftState instanceof __WEBPACK_IMPORTED_MODULE_12_conference_raftState__["c" /* JoinerState */]) {
        this._stopElectionTimeout();
      } else {
        this._resetElectionTimeout();
      }
      if (this._onLeadershipChange) {
        var isLeader = this._raftState instanceof __WEBPACK_IMPORTED_MODULE_12_conference_raftState__["a" /* LeaderState */];
        if (wasLeader !== isLeader) {
          __WEBPACK_IMPORTED_MODULE_6_common_log__["default"].info(TAG, this, 'changed leadership status');
          this._onLeadershipChange(isLeader);
        }
      }
    }
  }, {
    key: 'handleMessage',
    value: function handleMessage(peerId, body) {
      if (!this._raftState) {
        return;
      }
      var message = __WEBPACK_IMPORTED_MODULE_13_conference_raftMessages__["a" /* default */].parse(body);
      __WEBPACK_IMPORTED_MODULE_6_common_log__["default"].verbose(TAG, this, 'receive message from \'' + peerId + '\': ' + message);
      if (message.term && message.term < this._raftState._term) {
        // Old responses are always silently ignored
        // Old requests are always rejected, but send reply so the peer can be updated
        if (message.isRequest) {
          this._send(peerId, message.response({ term: this._raftState._term }));
        }
      } else {
        var newState;
        switch (message.constructor) {
          case __WEBPACK_IMPORTED_MODULE_13_conference_raftMessages__["b" /* AppendEntriesRequest */]:
            newState = this._raftState.handleAppendEntriesRequest(peerId, message);
            break;
          case __WEBPACK_IMPORTED_MODULE_13_conference_raftMessages__["c" /* AppendEntriesResponse */]:
            newState = this._raftState.handleAppendEntriesResponse(peerId, message);
            break;
          case __WEBPACK_IMPORTED_MODULE_13_conference_raftMessages__["d" /* RequestVoteRequest */]:
            newState = this._raftState.handleRequestVoteRequest(peerId, message);
            break;
          case __WEBPACK_IMPORTED_MODULE_13_conference_raftMessages__["e" /* RequestVoteResponse */]:
            newState = this._raftState.handleRequestVoteResponse(peerId, message);
            break;
          case __WEBPACK_IMPORTED_MODULE_13_conference_raftMessages__["f" /* PreVoteRequest */]:
            newState = this._raftState.handlePreVoteRequest(peerId, message);
            break;
          case __WEBPACK_IMPORTED_MODULE_13_conference_raftMessages__["g" /* PreVoteResponse */]:
            newState = this._raftState.handlePreVoteResponse(peerId, message);
            break;
          case __WEBPACK_IMPORTED_MODULE_13_conference_raftMessages__["h" /* SnapshotRequest */]:
            newState = this._raftState.handleSnapshotRequest(peerId, message);
            break;
          case __WEBPACK_IMPORTED_MODULE_13_conference_raftMessages__["i" /* SnapshotResponse */]:
            newState = this._raftState.handleSnapshotResponse(peerId, message);
            break;
          case __WEBPACK_IMPORTED_MODULE_13_conference_raftMessages__["j" /* StateOpRequest */]:
            newState = this._raftState.handleStateOpRequest(peerId, message);
            break;
          case __WEBPACK_IMPORTED_MODULE_13_conference_raftMessages__["k" /* StateOpResponse */]:
            // StateOp responses are handled by the state machine, since the state
            // doesn't have any use for it anyway, and the state machine uses
            // it for quicker feedback.
            this._stateMachine.handleStateOpResponse(peerId, message);
            break;
        }
        // _raftState is not set we were stopped in the handler
        if (newState && this._raftState) {
          this._setState(newState);
        }
      }
    }
  }, {
    key: '_resetElectionTimeout',
    value: function _resetElectionTimeout() {
      __WEBPACK_IMPORTED_MODULE_6_common_log__["default"].verbose(TAG, this, 'election timer restarted');
      if (this._electionTimeoutId) {
        this._electionTimeoutTriggerCount = 0;
        clearTimeout(this._electionTimeoutId);
      }
      var timeoutMs = __WEBPACK_IMPORTED_MODULE_12_conference_raftState__["d" /* EXPECTED_RTT_MS */] * 8 + __WEBPACK_IMPORTED_MODULE_12_conference_raftState__["d" /* EXPECTED_RTT_MS */] * 12 * Math.random();
      this._electionTimeoutId = setTimeout(this._onElectionTimeout, timeoutMs);
    }
  }, {
    key: '_stopElectionTimeout',
    value: function _stopElectionTimeout() {
      if (this._electionTimeoutId) {
        __WEBPACK_IMPORTED_MODULE_6_common_log__["default"].verbose(TAG, this, 'election timer stopped');
        clearTimeout(this._electionTimeoutId);
        this._electionTimeoutId = null;
      }
    }
  }, {
    key: '_onElectionTimeout',
    value: function _onElectionTimeout() {
      this._electionTimeoutId = null;
      __WEBPACK_IMPORTED_MODULE_6_common_log__["default"].info(TAG, this, 'election timeout');
      // We timed out waiting for heartbeat, start campaigning for leadership of next term
      if (this.log.configuration.hasMajority(new __WEBPACK_IMPORTED_MODULE_9_conference_raftConfiguration__["d" /* Votes */](this._id))) {
        this._setState(this._raftState.toLeader(this._raftState._term + 1));
      } else {
        this._electionTimeoutTriggerCount += 1;
        if (this._electionTimeoutTriggerCount > ELECTION_DEADLOCK_LIMIT) {
          this._onReplicationDeadlock();
        } else {
          this._setState(this._raftState.toCandidate(this._raftState._term + 1, false));
        }
      }
    }
  }, {
    key: '_onConfigurationCommitted',
    value: function _onConfigurationCommitted() {
      var _this5 = this;

      __WEBPACK_IMPORTED_MODULE_6_common_log__["default"].debug(TAG, this, 'committed new configuration');

      this._waitList.deleteAll(this.log.configuration.members);
      if (this._onMembersChange) {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject().catch(function () {
          _this5._onMembersChange(_this5.log.configuration.members);
        });
      }
    }
  }, {
    key: 'id',
    get: function get() {
      return this._id;
    }
  }, {
    key: 'log',
    get: function get() {
      return this._log;
    }
  }, {
    key: 'isLeader',
    get: function get() {
      return this._raftState instanceof __WEBPACK_IMPORTED_MODULE_12_conference_raftState__["a" /* LeaderState */];
    }
  }, {
    key: 'members',
    get: function get() {
      return this._log.configuration.members;
    }
  }, {
    key: 'term',
    get: function get() {
      if (!this._raftState) {
        return 0;
      }
      return this._raftState._term;
    }
  }]);

  return Raft;
}();

/* harmony default export */ __webpack_exports__["a"] = (Raft);

/***/ }),
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_argCheck__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_log__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_conference_raftConfiguration__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_conference_raftMessages__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_conference_raftLogEntry__ = __webpack_require__(104);












var TAG = 'raft';

var RaftLog = function () {
  function RaftLog(_ref) {
    var stateMachine = _ref.stateMachine,
        meshTopology = _ref.meshTopology,
        configuration = _ref.configuration;

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, RaftLog);

    this._stateMachine = stateMachine;
    this._meshTopology = meshTopology;
    this._configuration = configuration;

    this._entries = [];
    this._offset = 0;
    this._commitIndex = 0;
    this._lastApplied = 0;
    this._snapshot = null;
    this._configurationIndex = 0;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(RaftLog, [{
    key: 'toString',
    value: function toString() {
      var entries = this._entries.slice(this._lastApplied - this._offset).join(',');
      return 'log{lli=' + this.lastLogIndex + ',llt=' + this.lastLogTerm + ',ci=' + this.commitIndex + (',la=' + this._lastApplied + ',' + this._configuration + ',es=[' + entries + ']}');
    }
  }, {
    key: 'entryAtIndex',
    value: function entryAtIndex(index) {
      if (index === 0) {
        return null;
      }
      return this._entries[index - 1 - this._offset] || null;
    }
  }, {
    key: 'entryTermAtIndex',
    value: function entryTermAtIndex(index) {
      if (this._snapshot) {
        if (index < this._snapshot.lastIndex) {
          throw new Error("can't get term for entry ahead of local snapshot");
        } else if (index === this._snapshot.lastIndex) {
          return this._snapshot.lastTerm;
        }
      }
      if (index > this._entries.length + this._offset || index < 1) {
        return 0;
      }
      return this.entryAtIndex(index).term;
    }

    // from fromIndex, to, but not including toIndex

  }, {
    key: 'sliceEntries',
    value: function sliceEntries(fromIndex, toIndex) {
      fromIndex = Math.max(fromIndex - 1 - this._offset, 0);
      toIndex = Math.max(toIndex - 1 - this._offset, 0);
      return this._entries.slice(fromIndex, toIndex);
    }
  }, {
    key: 'handleAppendEntriesRequest',
    value: function handleAppendEntriesRequest(message) {
      if (message.prevIndex > this.lastLogIndex) {
        // Appending these entries would leave a gap
        return message.response({ meshTopology: this._meshTopology });
      }

      // Check if we have a snapshot installed and and the request is older, in that
      // case we just ignore it since it must be a delayed/repeated message and the leader
      // should know to send a post-snapshot append
      if (this._snapshot && message.prevIndex < this._offset) {
        return;
      }

      var localPrevTerm = this.entryTermAtIndex(message.prevIndex);
      var remoteEntries = message.entries;
      if (localPrevTerm === message.prevTerm) {
        // Loop through remote entries until we don't have a local one or find a term mismatch
        for (var index = 0; index < remoteEntries.length; index += 1) {
          var remoteEntry = remoteEntries[index];
          // +1 since prevIndex is the entry before the one we want to match against
          var localIndex = message.prevIndex + index + 1;
          if (localIndex > this.lastLogIndex) {
            // We've run out of local entires to match against, append the rest
            this._pushEntries(remoteEntries.slice(index));
            break;
          }
          var localTerm = this.entryTermAtIndex(localIndex);
          if (localTerm !== remoteEntry.term) {
            // if an entry term doesn't match, delete the rest and append all
            this._revertEntries(localIndex);
            this._pushEntries(remoteEntries.slice(index));
            break;
          }
        }
        var matchIndex = message.prevIndex + remoteEntries.length;
        if (message.commitIndex > this._commitIndex) {
          // increase commit index to the remote one, but not higher than the last entry we received
          var newCommitIndex = Math.min(message.commitIndex, matchIndex);
          this._incrementCommitIndex(newCommitIndex);
        }
        return message.response({ success: true, matchIndex: matchIndex, meshTopology: this._meshTopology });
      } else {
        return message.response({ meshTopology: this._meshTopology });
      }
    }
  }, {
    key: 'getCommittedConfigurationData',
    value: function getCommittedConfigurationData() {
      var committedEntries = this.sliceEntries(0, this.commitIndex + 1);
      for (var index = committedEntries.length - 1; index >= 0; index -= 1) {
        var entry = committedEntries[index];
        if (entry instanceof __WEBPACK_IMPORTED_MODULE_7_conference_raftLogEntry__["b" /* ConfigurationEntry */]) {
          return entry.data;
        }
      }
      if (this._snapshot) {
        return this._snapshot.configuration;
      }
      return new __WEBPACK_IMPORTED_MODULE_5_conference_raftConfiguration__["b" /* ConfigurationData */](new __WEBPACK_IMPORTED_MODULE_5_conference_raftConfiguration__["c" /* Members */]());
    }
  }, {
    key: 'tryCommitIndexForTerm',
    value: function tryCommitIndexForTerm(newCommitIndex, expectedTerm) {
      if (newCommitIndex <= this._commitIndex) {
        return [];
      }
      var actualTerm = this.entryTermAtIndex(newCommitIndex);
      if (actualTerm !== expectedTerm) {
        __WEBPACK_IMPORTED_MODULE_4_common_log__["default"].debug(TAG, 'Commit index ' + newCommitIndex + ' rejected, expected term was ' + expectedTerm + ', got ' + actualTerm);
        return [];
      }
      return this._incrementCommitIndex(newCommitIndex);
    }
  }, {
    key: 'createConfigurationEntry',
    value: function createConfigurationEntry(_ref2) {
      var term = _ref2.term,
          data = _ref2.data;

      var index = this.lastLogIndex + 1;
      var entry = new __WEBPACK_IMPORTED_MODULE_7_conference_raftLogEntry__["b" /* ConfigurationEntry */]({ term: term, index: index, data: data });
      this._configuration.set(data);
      this._configurationIndex = index;
      this._entries.push(entry);
      return entry;
    }
  }, {
    key: 'createOpEntry',
    value: function createOpEntry(_ref3) {
      var term = _ref3.term,
          id = _ref3.id,
          op = _ref3.op,
          args = _ref3.args;

      var index = this.lastLogIndex + 1;
      var entry = new __WEBPACK_IMPORTED_MODULE_7_conference_raftLogEntry__["d" /* OpEntry */]({ term: term, index: index, id: id, op: op, args: args });
      this._entries.push(entry);
      return entry;
    }
  }, {
    key: '_incrementCommitIndex',
    value: function _incrementCommitIndex(newCommitIndex) {
      this._commitIndex = newCommitIndex;
      var fromApplied = this._lastApplied;
      if (this._lastApplied < newCommitIndex) {
        this._lastApplied = newCommitIndex;
      }
      var committed = this.sliceEntries(fromApplied + 1, newCommitIndex + 1);
      this._stateMachine.commitEntries(committed);
      return committed;
    }
  }, {
    key: '_revertEntries',
    value: function _revertEntries(fromIncludingIndex) {
      if (fromIncludingIndex <= this.commitIndex) {
        throw new Error('tried to revert committed entries, ci=' + this.commitIndex + ', revert=' + fromIncludingIndex);
      }
      if (fromIncludingIndex <= this._lastApplied) {
        throw new Error('tried to revert applied entries, la=' + this._lastApplied + ', revert=' + fromIncludingIndex);
      }
      var reverted = this._entries.splice(fromIncludingIndex - 1 - this._offset);
      reverted.reverse(); // newest first
      this._stateMachine.revertEntries(reverted);

      if (this._configurationIndex < fromIncludingIndex) {
        return; // no need to revert configuration
      }

      for (var index = fromIncludingIndex - 1; index > 0; index -= 1) {
        if (this._snapshot && this._snapshot.lastIndex === index) {
          this._configuration.set(this._snapshot.configuration);
          this._configurationIndex = index;
          return;
        }
        var entry = this.entryAtIndex(index);
        if (entry instanceof __WEBPACK_IMPORTED_MODULE_7_conference_raftLogEntry__["b" /* ConfigurationEntry */]) {
          this._configuration.set(entry.data);
          this._configurationIndex = index;
          return;
        }
      }

      // no configuration found
      this._configuration.set(new __WEBPACK_IMPORTED_MODULE_5_conference_raftConfiguration__["b" /* ConfigurationData */](new __WEBPACK_IMPORTED_MODULE_5_conference_raftConfiguration__["c" /* Members */]()));
      this._configurationIndex = 0;
    }
  }, {
    key: '_pushEntries',
    value: function _pushEntries(entries) {
      var _entries;

      (_entries = this._entries).push.apply(_entries, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(entries));

      for (var index = entries.length - 1; index >= 0; index -= 1) {
        var entry = entries[index];
        if (entry instanceof __WEBPACK_IMPORTED_MODULE_7_conference_raftLogEntry__["b" /* ConfigurationEntry */]) {
          this._configuration.set(entry.data);
          this._configurationIndex = index;
          break;
        }
      }
    }
  }, {
    key: 'createSnapshot',
    value: function createSnapshot(term) {
      return __WEBPACK_IMPORTED_MODULE_6_conference_raftMessages__["h" /* SnapshotRequest */].create({
        term: term,
        lastTerm: this.entryTermAtIndex(this._lastApplied),
        lastIndex: this._lastApplied,
        configuration: this._configuration.get(),
        state: this._stateMachine.state
      });
    }
  }, {
    key: 'loadSnapshot',
    value: function loadSnapshot(snapshot) {
      __WEBPACK_IMPORTED_MODULE_3_common_argCheck__["a" /* default */].instance('RaftLog.loadSnapshot', 'snapshot', snapshot, __WEBPACK_IMPORTED_MODULE_6_conference_raftMessages__["h" /* SnapshotRequest */]);
      var lastIndex = snapshot.lastIndex,
          configuration = snapshot.configuration;


      this._entries = [];
      this._offset = lastIndex;
      this._commitIndex = lastIndex;
      this._lastApplied = lastIndex;
      this._configurationIndex = lastIndex;
      this._configuration.set(configuration);
      this._snapshot = snapshot;

      this._stateMachine.loadSnapshot(snapshot);
    }
  }, {
    key: 'clear',
    value: function clear() {
      this._stateMachine.clear();
      this._entries = [];
      this._offset = 0;
      this._commitIndex = 0;
      this._lastApplied = 0;
      this._snapshot = null;
      this._configurationIndex = 0;
    }
  }, {
    key: 'meshTopology',
    get: function get() {
      return this._meshTopology;
    }
  }, {
    key: 'configuration',
    get: function get() {
      return this._configuration;
    }
  }, {
    key: 'lastEntry',
    get: function get() {
      return this.entryAtIndex(this.lastLogIndex);
    }
  }, {
    key: 'lastLogIndex',
    get: function get() {
      return this._offset + this._entries.length;
    }
  }, {
    key: 'lastLogTerm',
    get: function get() {
      return this.entryTermAtIndex(this.lastLogIndex);
    }
  }, {
    key: 'commitIndex',
    get: function get() {
      return this._commitIndex;
    }
  }]);

  return RaftLog;
}();

/* harmony default export */ __webpack_exports__["a"] = (RaftLog);

/***/ }),
/* 197 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_log__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_common_utils__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_conference_raftLogEntry__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_conference_raftMessages__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_conference_raftState__ = __webpack_require__(170);













var TAG = 'raft';

var TICK_INTERVAL = 100;
var TICK_APPLIED_FACTOR = 10;
var STATE_OP_APPLY_TTL_MS = 30 * 1000;
var RESEND_RTT_FACTOR = 6;

// The StateMachine keeps the local state of the Raft cluster, and applies
// committed entries to that state after deduplication. It is also responsible
// for keeping track of operations that have been requested by the local
// client, and to retry them if needed.
//
// This diagram describes the flow of a successful state operation where the
// local client is the leader.
//
//      Raft --3-> LeaderState --4b-> ...
//      |  ^            |
//      1  2            4a
//      v  |            v
// StateMachine <-5-- RaftLog
//
// 1. An operation is requested.
// 2. The state machine sends a request via the onStateOpRequest callback.
// 3. Raft forwards the request to the current state.
// 4a. Append the OpEntry to the log.
// 4b. Raft algorithm in action, which ends up committing the entry.
// 5. The log forwards committed entries to the state machine.
//
// And now a diagram for if we're a follower.
//
//      Raft --3-> FollowerState --4-> LeaderState --5a->
//      |  ^                                |
//      1  2                                5a
//      v  |                                v
// StateMachine <-7-- RaftLog <- - 6 - - RaftLog
//
// 1-3. Same as above.
// 4. Send StateOpRequest to the current leader.
// 5a 5b. Same as 4a 4b above.
// 6. Raft algorithm ends up committing the entry in the follower's log.
// 7. Same as 5 above.
//

var StateMachine = function () {
  function StateMachine(_ref) {
    var onStateChange = _ref.onStateChange,
        onStateOpRequest = _ref.onStateOpRequest,
        onConfigurationCommitted = _ref.onConfigurationCommitted;

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, StateMachine);

    this._tick = this._tick.bind(this);

    this._state = {};
    this._tickCounter = 0;

    // Client requests are tracked here, type is Map<opId, [expiryMs, deferred, StateOpRequest]>
    this._tuples = new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map___default.a();

    // All members keep track of all op entry IDs that have been applied.
    this._appliedIds = new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map___default.a();
    this._onStateChange = onStateChange;
    this._onStateOpRequest = onStateOpRequest;
    this._onConfigurationCommitted = onConfigurationCommitted;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(StateMachine, [{
    key: 'toString',
    value: function toString() {
      return 'stateMachine{' + __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(this.state) + '}';
    }
  }, {
    key: 'start',
    value: function start() {
      this.stop();
      this._tickCounter = 0;
      this._intervalId = setInterval(this._tick, TICK_INTERVAL);
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.clear();
      if (this._intervalId) {
        clearInterval(this._intervalId);
        this._intervalId = null;
      }
    }
  }, {
    key: 'clear',
    value: function clear() {
      this._state = {};
      this._tuples.clear();
      this._appliedIds.clear();
    }
  }, {
    key: 'requestStateOp',
    value: function requestStateOp(_ref2) {
      var op = _ref2.op,
          args = _ref2.args,
          retryTtlMs = _ref2.retryTtlMs;

      var id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_common_utils__["randomString"])(__WEBPACK_IMPORTED_MODULE_6_conference_raftLogEntry__["d" /* OpEntry */].idSize);
      var request = __WEBPACK_IMPORTED_MODULE_7_conference_raftMessages__["j" /* StateOpRequest */].create({ id: id, op: op, args: args });
      var now = Date.now();
      var expiry = now + retryTtlMs;
      var nextResend = now + __WEBPACK_IMPORTED_MODULE_8_conference_raftState__["d" /* EXPECTED_RTT_MS */] * RESEND_RTT_FACTOR;
      var deferred = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_common_utils__["defer"])();
      this._tuples.set(id, { expiry: expiry, nextResend: nextResend, deferred: deferred, request: request });
      this._onStateOpRequest(request);
      return deferred.promise;
    }
  }, {
    key: 'handleStateOpResponse',
    value: function handleStateOpResponse(peerId, message) {
      var id = message.id,
          errorCode = message.errorCode;

      var tuple = this._tuples.get();
      if (!tuple) {
        __WEBPACK_IMPORTED_MODULE_4_common_log__["default"].info(TAG, this, ' got StateOpResponse for unknown tuple, ' + id);
        return;
      }
      if (errorCode) {
        if (errorCode === __WEBPACK_IMPORTED_MODULE_7_conference_raftMessages__["k" /* StateOpResponse */].NOT_LEADER) {
          this._onStateOpRequest(tuple.request);
          tuple.nextResend = Date.now() + __WEBPACK_IMPORTED_MODULE_8_conference_raftState__["d" /* EXPECTED_RTT_MS */] * RESEND_RTT_FACTOR;
        } else {
          __WEBPACK_IMPORTED_MODULE_4_common_log__["default"].error(TAG, this, ' got unknown StateOpResponse errorCode for ' + id + ', ' + errorCode);
        }
      } else {
        // Success, reset resend timeout
        tuple.nextResend = Date.now() + __WEBPACK_IMPORTED_MODULE_8_conference_raftState__["d" /* EXPECTED_RTT_MS */] * RESEND_RTT_FACTOR;
      }
    }
  }, {
    key: '_tick',
    value: function _tick() {
      var _this = this;

      var now = Date.now();
      // Applied ids don't need to be checked nearly as often as tuple resends, so
      // only do it every nth tick.
      this._tickCounter = (this._tickCounter + 1) % TICK_APPLIED_FACTOR;
      if (this._tickCounter === 0) {
        this._appliedIds.forEach(function (expiry, entryId) {
          if (expiry < now) {
            _this._appliedIds.delete(entryId);
          }
        });
      }
      this._tuples.forEach(function (tuple, entryId) {
        if (tuple.expiry < now) {
          _this._tuples.delete(entryId);
          tuple.deferred.reject(new Error('Timed out'));
        } else if (tuple.nextResend < now) {
          _this._onStateOpRequest(tuple.request);
          tuple.nextResend = now + __WEBPACK_IMPORTED_MODULE_8_conference_raftState__["d" /* EXPECTED_RTT_MS */] * RESEND_RTT_FACTOR;
        }
      });
    }
  }, {
    key: 'commitEntries',
    value: function commitEntries(entries) {
      var _this2 = this;

      var updated = false;
      entries.forEach(function (entry) {
        if (entry instanceof __WEBPACK_IMPORTED_MODULE_6_conference_raftLogEntry__["d" /* OpEntry */]) {
          if (_this2._appliedIds.has(entry.id)) {
            __WEBPACK_IMPORTED_MODULE_4_common_log__["default"].debug(TAG, _this2, 'ignored duplicate entry, ' + entry);
          } else {
            var expiry = Date.now() + STATE_OP_APPLY_TTL_MS;
            if (entry.id) {
              _this2._appliedIds.set(entry.id, expiry);
            }
            var newState = entry.apply(_this2._state);
            if (newState) {
              updated = true;
              _this2._state = newState;
            }
          }
          var tuple = _this2._tuples.get(entry.id);
          if (tuple) {
            tuple.deferred.resolve();
            _this2._tuples.delete(entry.id);
          }
        } else if (entry instanceof __WEBPACK_IMPORTED_MODULE_6_conference_raftLogEntry__["b" /* ConfigurationEntry */]) {
          _this2._onConfigurationCommitted && _this2._onConfigurationCommitted(entry.data);
        }
      });
      if (updated) {
        this._onStateChange && this._onStateChange();
      }
    }
  }, {
    key: 'revertEntries',
    value: function revertEntries(entries) {
      var _this3 = this;

      entries.forEach(function (entry) {
        var tuple = _this3._tuples.get(entry.id);
        if (tuple) {
          _this3._onStateOpRequest(tuple.request);
          tuple.nextResend = Date.now() + __WEBPACK_IMPORTED_MODULE_8_conference_raftState__["d" /* EXPECTED_RTT_MS */] * RESEND_RTT_FACTOR;
        }
      });
    }
  }, {
    key: 'loadSnapshot',
    value: function loadSnapshot(snapshot) {
      this._state = snapshot.state;

      this._onStateChange && this._onStateChange();
      this._onConfigurationCommitted && this._onConfigurationCommitted(snapshot.configuration);
    }
  }, {
    key: 'state',
    get: function get() {
      return this._state;
    }
  }]);

  return StateMachine;
}();

/* harmony default export */ __webpack_exports__["a"] = (StateMachine);

/***/ }),
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_conference_meshTopology_js__ = __webpack_require__(158);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "LinkInfo", function() { return __WEBPACK_IMPORTED_MODULE_0_conference_meshTopology_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PeerTopologyInfo", function() { return __WEBPACK_IMPORTED_MODULE_0_conference_meshTopology_js__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "MeshTopology", function() { return __WEBPACK_IMPORTED_MODULE_0_conference_meshTopology_js__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_log__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return __WEBPACK_IMPORTED_MODULE_1_common_log__["default"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_conference_raft_js__ = __webpack_require__(186);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Raft", function() { return __WEBPACK_IMPORTED_MODULE_2_conference_raft_js__["a"]; });







/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhbmRhbG9uZS1yYWZ0LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbj81Y2E2Iiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhN2U4YjFlNzAzNWE4YjE0OGE4ZD9kNzAzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanM/MWI2MiIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcz8yMWFmIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzPzFkZmUiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzP2VjZTIiLCJ3ZWJwYWNrOi8vL2xpYi9jb21tb24vbG9nLmpzP2IxZGMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzPzMwMjciLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzPzc3YWEiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanM/YjI2NSIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcz8wNTc4Iiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanM/YWFkOSIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanM/NDExNiIsIndlYnBhY2s6Ly8vbGliL2NvbW1vbi9hcmdDaGVjay5qcz9iMzY5Iiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzPzcwNTEiLCJ3ZWJwYWNrOi8vL2xpYi9jb21tb24vdXRpbHMuanM/OTYzZCIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanM/MjRjOCIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanM/MGRhMyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanM/Y2UwMCIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzP2E2ZGEiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcz82OTQ2Iiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcz9kODUwIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzPzkzNWQiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzP2ZlMTgiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZS5qcz8xM2RjIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qcz9hZmY3Iiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcz9iNWMwIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanM/MWU4NiIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanM/NTI2YiIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcz9jOTQ1Iiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL21hcC5qcz9mNmVhIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzPzE4MjUiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzPzQ4ZWEiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzP2JmMGUiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcz9kNTNlIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzP2Y1YmMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzP2Y0YmQiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qcz8zOWM0Iiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanM/ZDhjZiIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanM/NjJhNyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanM/ZThjZCIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzPzJjODAiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcz9kMGQyIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL3NldC5qcz8wNzI0Iiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NsYXNzb2YuanM/YjRiMyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzPzVmNzAiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXNhcC5qcz9hMDNlIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5LmpzPzQ1NzQiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcz80NWQzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanM/NzU5OCIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qcz85YTk0Iiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21ldGEuanM/NTUzZCIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wZC5qcz9kN2Q4Iiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanM/MmE2YyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanM/N2I2YyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzP2Y2NWYiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzPzQ5YTQiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWRlZmluZS5qcz9iNmUwIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1leHQuanM/NmVlMiIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1pbnN0YW5jZS5qcz9lNGQ2Iiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanM/YWI0NCIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanM/YzcyOSIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL192YWxpZGF0ZS1jb2xsZWN0aW9uLmpzP2IyZmEiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZS5qcz9hYTRiIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzLmpzP2ZlMDYiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanM/OWM4OCIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9nZXQuanM/YTMyMCIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzPzVjZjkiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbmV3LXByb21pc2UtY2FwYWJpbGl0eS5qcz83NTc5Iiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzP2E1ZmIiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanM/YmQxZiIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzP2E0YjMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXkuanM/MTg0MyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanM/NTE4OSIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLXN0ZXAuanM/ZTIwOSIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi5qcz8xZTA3Iiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanM/ZDQ3ZCIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcz9mY2VhIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzPzE0NTUiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbS5qcz9lZmMyIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24tc3Ryb25nLmpzPzFhMzciLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29sbGVjdGlvbi10by1qc29uLmpzPzk0YTkiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29sbGVjdGlvbi5qcz81NWE1Iiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanM/ZTVhZiIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qcz8wYTkxIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1jb2xsZWN0aW9uLWZyb20uanM/N2YwYiIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtY29sbGVjdGlvbi1vZi5qcz9iMDhlIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzPzI3ZDYiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanM/MTcyZSIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy90b0FycmF5LmpzP2FhMmQiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcGVyZm9ybS5qcz9iYTVlIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb21pc2UtcmVzb2x2ZS5qcz8wMjk3Iiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanM/NzM3YSIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190YXNrLmpzPzEyM2YiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcz8zMjIzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC5qcz9hNzBkIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvci5qcz9kMTZiIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLWV4dC5qcz9kMjM4Iiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanM/NDdmZCIsIndlYnBhY2s6Ly8vbGliL2NvbmZlcmVuY2UvcmFmdENvbmZpZ3VyYXRpb24uanM/MjE0ZSIsIndlYnBhY2s6Ly8vbGliL2NvbmZlcmVuY2UvcmFmdExvZ0VudHJ5LmpzP2QxYTciLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanM/YmIwMCIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tLmpzPzY2OWQiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qcz83MzhjIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanM/YjdkOCIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzPzc1MDQiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanM/NTE5MyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcz9mOTA5Iiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L2ZuL3NldC5qcz8yYzZjIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pbmRleC5qcz9mMDdhIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvci5qcz8yMzhkIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcz9kNWU4Iiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWZyb20taXRlcmFibGUuanM/ZWMwZSIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcz82MTk5Iiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LW1ldGhvZHMuanM/ZGU3MSIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNvbnN0cnVjdG9yLmpzP2Q2YWEiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktc3BlY2llcy1jcmVhdGUuanM/NTExNiIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jcmVhdGUtcHJvcGVydHkuanM/MWFkMSIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWtleXMuanM/NzI3YSIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qcz8wMTI3Iiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1wcm90by5qcz85NjY1Iiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3N0cmluZy1hdC5qcz80MTNhIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzPzI5MDAiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qcz9jZTdkIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzPzFlMDkiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZS5qcz85MDM0Iiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanM/YzgyYyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzP2ZlMjEiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanM/ZWFhMyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qcz9iMTk1Iiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnNldC5qcz9kYmJhIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN5bWJvbC5qcz82NzBhIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnNldC5mcm9tLmpzP2FmY2QiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc2V0Lm9mLmpzP2ExNGMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc2V0LnRvLWpzb24uanM/ZTc1YiIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanM/YjhjNSIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZS5qcz9kYWE0Iiwid2VicGFjazovLy9saWIvY29uZmVyZW5jZS9yYWZ0TWVzc2FnZXMuanM/ZWZkZiIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9mbi9tYXAuanM/ZWRjMSIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5cy5qcz9jYzNmIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanM/ODRkMiIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pbnZva2UuanM/MDU2NyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19taWNyb3Rhc2suanM/NGNmNiIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5tYXAuanM/ODRiNiIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcz9jOThmIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnByb21pc2UuanM/OTAzYiIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5tYXAuZnJvbS5qcz83ZTI3Iiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3Lm1hcC5vZi5qcz9mYWVmIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3Lm1hcC50by1qc29uLmpzPzE4NGQiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5LmpzPzMwYmEiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS50cnkuanM/OTdlNyIsIndlYnBhY2s6Ly8vbGliL2NvbmZlcmVuY2UvbWVzaFRvcG9sb2d5LmpzPzYyMDAiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vanNvbi9zdHJpbmdpZnkuanM/NjcwOCIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3IuanM/MWIwOCIsIndlYnBhY2s6Ly8vbGliL2NvbmZlcmVuY2UvcmFmdFN0YXRlLmpzP2I4OTIiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanM/MzUwZSIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanM/MmNmNyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qcz8wYmQyIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanM/YWNhNyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanM/NzdjYyIsIndlYnBhY2s6Ly8vbGliL2NvbmZlcmVuY2UvcmFmdC5qcz85MGNjIiwid2VicGFjazovLy9saWIvY29uZmVyZW5jZS9yYWZ0TG9nLmpzPzYwODkiLCJ3ZWJwYWNrOi8vL2xpYi9jb25mZXJlbmNlL3JhZnRTdGF0ZU1hY2hpbmUuanM/OGI3OCIsIndlYnBhY2s6Ly8vbGliL3N0YW5kYWxvbmUtcmFmdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJjY3RcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiY2N0XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB0aGlzW1wid2VicGFja0hvdFVwZGF0ZWNjdFwiXTtcbiBcdHRoaXNbXCJ3ZWJwYWNrSG90VXBkYXRlY2N0XCJdID0gXHJcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xyXG4gXHRcdGlmKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XHJcbiBcdH0gO1xyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuIFx0XHRzY3JpcHQudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XHJcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XHJcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcclxuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiBcdFx0XHRpZih0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpXHJcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcclxuIFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xyXG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xyXG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSAxMDAwMDtcclxuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xyXG4gXHRcdFx0fSBjYXRjaChlcnIpIHtcclxuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuIFx0XHRcdFx0aWYocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XHJcbiBcdFx0XHRcdGlmKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XHJcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxyXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpKTtcclxuIFx0XHRcdFx0fSBlbHNlIGlmKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcclxuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXHJcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xyXG4gXHRcdFx0XHR9IGVsc2UgaWYocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XHJcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxyXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcclxuIFx0XHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXHJcbiBcdFx0XHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcclxuIFx0XHRcdFx0XHR9IGNhdGNoKGUpIHtcclxuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcclxuIFx0XHRcdFx0XHRcdHJldHVybjtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9O1xyXG4gXHRcdH0pO1xyXG4gXHR9XHJcblxuIFx0XHJcbiBcdFxyXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XHJcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiYTdlOGIxZTcwMzVhOGIxNDhhOGRcIjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcclxuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdGlmKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XHJcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xyXG4gXHRcdFx0aWYobWUuaG90LmFjdGl2ZSkge1xyXG4gXHRcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XHJcbiBcdFx0XHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpIDwgMClcclxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XHJcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRpZihtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpIDwgMClcclxuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xyXG4gXHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0Y29uc29sZS53YXJuKFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVxdWVzdCArIFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArIG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcclxuIFx0XHRcdH1cclxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xyXG4gXHRcdH07XHJcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcclxuIFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcclxuIFx0XHRcdFx0fSxcclxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fTtcclxuIFx0XHR9O1xyXG4gXHRcdGZvcih2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiYgbmFtZSAhPT0gXCJlXCIpIHtcclxuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcclxuIFx0XHRcdGlmKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKVxyXG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xyXG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xyXG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XHJcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xyXG4gXHRcdFx0XHR0aHJvdyBlcnI7XHJcbiBcdFx0XHR9KTtcclxuIFx0XHJcbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XHJcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcclxuIFx0XHRcdFx0aWYoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xyXG4gXHRcdFx0XHRcdGlmKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcclxuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRpZihob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xyXG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH07XHJcbiBcdFx0cmV0dXJuIGZuO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHZhciBob3QgPSB7XHJcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXHJcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxyXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcclxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxyXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXHJcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcclxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxyXG4gXHRcclxuIFx0XHRcdC8vIE1vZHVsZSBBUElcclxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcclxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xyXG4gXHRcdFx0XHRpZih0eXBlb2YgZGVwID09PSBcInVuZGVmaW5lZFwiKVxyXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcclxuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpXHJcbiBcdFx0XHRcdFx0aG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XHJcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcclxuIFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxyXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcclxuIFx0XHRcdFx0ZWxzZVxyXG4gXHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XHJcbiBcdFx0XHRcdGlmKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpXHJcbiBcdFx0XHRcdFx0aG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xyXG4gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXHJcbiBcdFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcclxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XHJcbiBcdFx0XHRcdGVsc2VcclxuIFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xyXG4gXHRcdFx0XHRpZihpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcclxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXHJcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXHJcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXHJcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcclxuIFx0XHRcdFx0aWYoIWwpIHJldHVybiBob3RTdGF0dXM7XHJcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xyXG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcclxuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XHJcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdH0sXHJcbiBcdFxyXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXHJcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cclxuIFx0XHR9O1xyXG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcclxuIFx0XHRyZXR1cm4gaG90O1xyXG4gXHR9XHJcbiBcdFxyXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcclxuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xyXG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcclxuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXHJcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXHJcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xyXG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XHJcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcclxuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XHJcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xyXG4gXHR2YXIgaG90RGVmZXJyZWQ7XHJcbiBcdFxyXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cclxuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcclxuIFx0XHJcbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcclxuIFx0XHR2YXIgaXNOdW1iZXIgPSAoK2lkKSArIFwiXCIgPT09IGlkO1xyXG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xyXG4gXHRcdGlmKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xyXG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcclxuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdCgpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XHJcbiBcdFx0XHRpZighdXBkYXRlKSB7XHJcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XHJcbiBcdFx0XHRcdHJldHVybiBudWxsO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcclxuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xyXG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcclxuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcclxuIFx0XHJcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xyXG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XHJcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcclxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxyXG4gXHRcdFx0XHR9O1xyXG4gXHRcdFx0fSk7XHJcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcclxuIFx0XHRcdHZhciBjaHVua0lkID0gMTtcclxuIFx0XHRcdHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1sb25lLWJsb2Nrc1xyXG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xyXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcclxuIFx0XHRcdH1cclxuIFx0XHRcdGlmKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcclxuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XHJcbiBcdFx0fSk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHRpZighaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxyXG4gXHRcdFx0cmV0dXJuO1xyXG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XHJcbiBcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFx0aWYoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xyXG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xyXG4gXHRcdH1cclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xyXG4gXHRcdGlmKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xyXG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcclxuIFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xyXG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XHJcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdH1cclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcclxuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcclxuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XHJcbiBcdFx0aWYoIWRlZmVycmVkKSByZXR1cm47XHJcbiBcdFx0aWYoaG90QXBwbHlPblVwZGF0ZSkge1xyXG4gXHRcdFx0aG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuIFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xyXG4gXHRcdFx0fSwgZnVuY3Rpb24oZXJyKSB7XHJcbiBcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xyXG4gXHRcdFx0fSk7XHJcbiBcdFx0fSBlbHNlIHtcclxuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcclxuIFx0XHRcdGZvcih2YXIgaWQgaW4gaG90VXBkYXRlKSB7XHJcbiBcdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xyXG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xyXG4gXHRcdH1cclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xyXG4gXHRcdGlmKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XHJcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiBcdFxyXG4gXHRcdHZhciBjYjtcclxuIFx0XHR2YXIgaTtcclxuIFx0XHR2YXIgajtcclxuIFx0XHR2YXIgbW9kdWxlO1xyXG4gXHRcdHZhciBtb2R1bGVJZDtcclxuIFx0XHJcbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xyXG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XHJcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcclxuIFx0XHJcbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcclxuIFx0XHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcclxuIFx0XHRcdFx0XHRpZDogaWRcclxuIFx0XHRcdFx0fTtcclxuIFx0XHRcdH0pO1xyXG4gXHRcdFx0d2hpbGUocXVldWUubGVuZ3RoID4gMCkge1xyXG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XHJcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcclxuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xyXG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0aWYoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0Y29udGludWU7XHJcbiBcdFx0XHRcdGlmKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xyXG4gXHRcdFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcclxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcclxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxyXG4gXHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYobW9kdWxlLmhvdC5fbWFpbikge1xyXG4gXHRcdFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcclxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcclxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxyXG4gXHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XHJcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xyXG4gXHRcdFx0XHRcdGlmKCFwYXJlbnQpIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdGlmKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xyXG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxyXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxyXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXHJcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxyXG4gXHRcdFx0XHRcdFx0fTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0aWYob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpID49IDApIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdGlmKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xyXG4gXHRcdFx0XHRcdFx0aWYoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcclxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XHJcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xyXG4gXHRcdFx0XHRcdFx0Y29udGludWU7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XHJcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xyXG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xyXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcclxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxyXG4gXHRcdFx0XHRcdH0pO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFxyXG4gXHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxyXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXHJcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxyXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcclxuIFx0XHRcdH07XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XHJcbiBcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XHJcbiBcdFx0XHRcdGlmKGEuaW5kZXhPZihpdGVtKSA8IDApXHJcbiBcdFx0XHRcdFx0YS5wdXNoKGl0ZW0pO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcclxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXHJcbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XHJcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xyXG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XHJcbiBcdFxyXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XHJcbiBcdFx0XHRjb25zb2xlLndhcm4oXCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCIpO1xyXG4gXHRcdH07XHJcbiBcdFxyXG4gXHRcdGZvcih2YXIgaWQgaW4gaG90VXBkYXRlKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcclxuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcclxuIFx0XHRcdFx0dmFyIHJlc3VsdDtcclxuIFx0XHRcdFx0aWYoaG90VXBkYXRlW2lkXSkge1xyXG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xyXG4gXHRcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcclxuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcclxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxyXG4gXHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcclxuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcclxuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xyXG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcclxuIFx0XHRcdFx0aWYocmVzdWx0LmNoYWluKSB7XHJcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdHN3aXRjaChyZXN1bHQudHlwZSkge1xyXG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRGVjbGluZWQpXHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xyXG4gXHRcdFx0XHRcdFx0aWYoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXHJcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArIHJlc3VsdC5tb2R1bGVJZCArIGNoYWluSW5mbyk7XHJcbiBcdFx0XHRcdFx0XHRicmVhaztcclxuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcclxuIFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMub25EZWNsaW5lZClcclxuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XHJcbiBcdFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcclxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiIGluIFwiICsgcmVzdWx0LnBhcmVudElkICsgY2hhaW5JbmZvKTtcclxuIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uVW5hY2NlcHRlZClcclxuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcclxuIFx0XHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvKTtcclxuIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkFjY2VwdGVkKVxyXG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcclxuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xyXG4gXHRcdFx0XHRcdFx0YnJlYWs7XHJcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRGlzcG9zZWQpXHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xyXG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcclxuIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0XHRcdGRlZmF1bHQ6XHJcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKGFib3J0RXJyb3IpIHtcclxuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcclxuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYoZG9BcHBseSkge1xyXG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xyXG4gXHRcdFx0XHRcdGZvcihtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcclxuIFx0XHRcdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRcdFx0XHRpZighb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxyXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xyXG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pO1xyXG4gXHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRpZihkb0Rpc3Bvc2UpIHtcclxuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcclxuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxyXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcclxuIFx0XHRmb3IoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xyXG4gXHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiYgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQpXHJcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcclxuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcclxuIFx0XHRcdFx0fSk7XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xyXG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcclxuIFx0XHRcdGlmKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xyXG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fSk7XHJcbiBcdFxyXG4gXHRcdHZhciBpZHg7XHJcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XHJcbiBcdFx0d2hpbGUocXVldWUubGVuZ3RoID4gMCkge1xyXG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcclxuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0aWYoIW1vZHVsZSkgY29udGludWU7XHJcbiBcdFxyXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcclxuIFx0XHJcbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcclxuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XHJcbiBcdFx0XHRmb3IoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcclxuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XHJcbiBcdFx0XHRcdGNiKGRhdGEpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcclxuIFx0XHJcbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxyXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcclxuIFx0XHJcbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcclxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHJcbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxyXG4gXHRcdFx0Zm9yKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XHJcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcclxuIFx0XHRcdFx0aWYoIWNoaWxkKSBjb250aW51ZTtcclxuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0aWYoaWR4ID49IDApIHtcclxuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxyXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xyXG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcclxuIFx0XHRmb3IobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRpZihtb2R1bGUpIHtcclxuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0XHRmb3IoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xyXG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xyXG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XHJcbiBcdFx0XHRcdFx0XHRpZihpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxyXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xyXG4gXHRcclxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XHJcbiBcdFxyXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxyXG4gXHRcdGZvcihtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xyXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XHJcbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcclxuIFx0XHRcdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XHJcbiBcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcclxuIFx0XHRcdFx0XHRpZihjYWxsYmFja3MuaW5kZXhPZihjYikgPj0gMCkgY29udGludWU7XHJcbiBcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGZvcihpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xyXG4gXHRcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XHJcbiBcdFx0XHRcdFx0fSBjYXRjaChlcnIpIHtcclxuIFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMub25FcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcclxuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXHJcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXHJcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxyXG4gXHRcdFx0XHRcdFx0XHR9KTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcclxuIFx0XHRcdFx0XHRcdFx0aWYoIWVycm9yKVxyXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcclxuIFx0XHRmb3IoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xyXG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcclxuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcclxuIFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xyXG4gXHRcdFx0fSBjYXRjaChlcnIpIHtcclxuIFx0XHRcdFx0aWYodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuIFx0XHRcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcclxuIFx0XHRcdFx0XHR9IGNhdGNoKGVycjIpIHtcclxuIFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMub25FcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcclxuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxyXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcclxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcclxuIFx0XHRcdFx0XHRcdFx0XHRvcmdpbmFsRXJyb3I6IGVyclxyXG4gXHRcdFx0XHRcdFx0XHR9KTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcclxuIFx0XHRcdFx0XHRcdFx0aWYoIWVycm9yKVxyXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyMjtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRcdGlmKG9wdGlvbnMub25FcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XHJcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxyXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXHJcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcclxuIFx0XHRcdFx0XHRcdH0pO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighZXJyb3IpXHJcbiBcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcclxuIFx0XHRpZihlcnJvcikge1xyXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcclxuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xyXG4gXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcclxuIFx0fVxyXG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKDI3NykoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjc3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhN2U4YjFlNzAzNWE4YjE0OGE4ZCIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjUuMScgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uICh0eXBlLCBuYW1lLCBzb3VyY2UpIHtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkY7XG4gIHZhciBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HO1xuICB2YXIgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuUztcbiAgdmFyIElTX1BST1RPID0gdHlwZSAmICRleHBvcnQuUDtcbiAgdmFyIElTX0JJTkQgPSB0eXBlICYgJGV4cG9ydC5CO1xuICB2YXIgSVNfV1JBUCA9IHR5cGUgJiAkZXhwb3J0Llc7XG4gIHZhciBleHBvcnRzID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSk7XG4gIHZhciBleHBQcm90byA9IGV4cG9ydHNbUFJPVE9UWVBFXTtcbiAgdmFyIHRhcmdldCA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV07XG4gIHZhciBrZXksIG93biwgb3V0O1xuICBpZiAoSVNfR0xPQkFMKSBzb3VyY2UgPSBuYW1lO1xuICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmIChvd24gJiYga2V5IGluIGV4cG9ydHMpIGNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24gKEMpIHtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBDKSB7XG4gICAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQygpO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZiAoSVNfUFJPVE8pIHtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZiAodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSkgaGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IGFyZ0NoZWNrIGZyb20gJ2NvbW1vbi9hcmdDaGVjaydcbmltcG9ydCB7aXNDaHJvbWUsIGlzRmlyZWZveH0gZnJvbSAnY29tbW9uL3V0aWxzJ1xuXG4vKipcbiAqIEEgbG9nIGludGVyZmFjZSB0aGF0IGlzIGV4cG9zZWQgdmlhIHRoZSBzaW5nbGV0b24gYGNjdC5sb2dgLlxuICpcbiAqIExvZyBtZXNzYWdlcyBhcmUgc2VudCB1c2luZyBvbmUgb2YgdGhlIGZpdmUgbG9nIGZ1bmN0aW9ucywgb25lIGZvciBlYWNoIGxvZyBsZXZlbDpcbiAqIHtAbGluayBMb2cjZXJyb3J9LCB7QGxpbmsgTG9nI3dhcm5pbmd9LCB7QGxpbmsgTG9nI2luZm99LCB7QGxpbmsgTG9nI2RlYnVnfSwge0BsaW5rIExvZyN2ZXJib3NlfS5cbiAqXG4gKiBFYWNoIG1lc3NhZ2UgaXMgc2VudCB0byBhIGxvZyBjYXRlZ29yeSwgd2hpY2ggaXMgaWRlbnRpZmllZCBieSBhIHN0cmluZy4gVGhlIGxvZyBsZXZlbFxuICogb2YgZWFjaCBjYXRlZ29yeSBjYW4gYmUgc2V0IHNlcGFyYXRlbHksIGFsbG93aW5nIGhlaWdoZXIgb3IgbG93ZXIgbG9nIGxldmVscyB0byBiZVxuICogc2V0IGZvciBzcGVjaWZpYyBjYXRlZ29yaWVzLlxuICpcbiAqIFRoZSBsb2cgbWVzc2FnZXMgdGhhdCBkb24ndCBnZXQgZmlsdGVyZWQgb3V0IGJlY2F1c2Ugb2YgdGhlaXIgbGV2ZWwgYXJlIGZvcndhcmRlZFxuICogdG8gdGhlIGxvZyBoYW5kbGVyIGZvciB0aGF0IGxvZyBsZXZlbC4gVGhlIGRlZmF1bHQgbG9nIGhhbmRsZXJzIHdpbGwgdXNlIHRoZSBidWlsdC1pblxuICogYGNvbnNvbGVgIGZ1bmN0aW9ucyB0byBwcmludCB0aGUgY2F0ZWdvcnkgaW4gc3F1YXJlIGJyYWNrZXRzIGZvbGxvd2VkIGJ5IHRoZSBtZXNzYWdlLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlNob3cgYWxsIG1lc3NhZ2VzIGFuZCBpbiBjb2xvciwgZXhjZXB0IGZvciBvd24gZXZlbnRzPC9jYXB0aW9uPlxuICogY2N0LmxvZy5zZXRMb2dMZXZlbCgnb3duLWV2ZW50cycsIGNjdC5sb2cuTk9ORSk7XG4gKiBjY3QubG9nLnNldExvZ0xldmVsKGNjdC5sb2cuVkVSQk9TRSk7XG4gKiBjY3QubG9nLmNvbG9yID0gdHJ1ZTtcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Mb2dnaW5nIGFuIGluZm8gbWVzc2FnZSBpbiB0aGUgZ2l6bW8gY2F0ZWdvcnk8L2NhcHRpb24+XG4gKiBjY3QubG9nLmluZm8oJ2dpem1vJywgJ3dpZGdldCBpbml0aWFsaXplZCcpO1xuICpcbiAqIEBhYnN0cmFjdFxuICogQGNsYXNzIExvZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gTG9nKCkge1xuICB0aGlzLl9kZWZhdWx0TG9nTGV2ZWwgPSB0aGlzLldBUk5JTkdcbiAgdGhpcy5fY2F0ZWdvcnlMZXZlbHMgPSB7fVxuICB0aGlzLl9sb2dIYW5kbGVycyA9IHt9XG59XG5cbi8qKlxuICogQGNhbGxiYWNrIExvZ0hhbmRsZXJGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBtYXNrIC0gVGhlIGxvZyBsZXZlbCBtYXNrIG9mIHRoZSBtZXNzYWdlLlxuICogQHBhcmFtIHtzdHJpbmd9IGNhdGVnb3J5IC0gVGhlIG1lc3NhZ2UgY2F0ZWdvcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIFRoZSBsb2cgbWVzc2FnZS5cbiAqL1xuXG4vKipcbiAqIFNldHMgdGhlIGxvZyBoYW5kbGVyIGZvciBvbmUgb3IgbW9yZSBsb2cgbGV2ZWxzLiBUaGUgaGFuZGxlciB3aWxsIGJlIGNhbGxlZCB3aGVuZXZlclxuICogYW55dGhpbmcgaXMgbG9nZ2VkIHRoYXQgZG9lc24ndCBnZXQgZmlsdGVyZWQgYmVjYXVzZSBvZiBpdCdzIGxvZyBsZXZlbC5cbiAqXG4gKiBTZXR0aW5nIGEgbG9nIGhhbmRsZXIgd2lsbCByZXBsYWNlIHRoZSBkZWZhdWx0IGxvZyBoYW5kbGVyIGZvciB0aGF0IGxvZyBsZXZlbC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5TZXR0aW5nIGxvZyBoYW5kbGVyIGZvciBtdWx0aXBsZSBsZXZlbHM8L2NhcHRpb24+XG4gKiBsb2cuc2V0TG9nSGFuZGxlcihsb2cuRVJST1J8bG9nLldBUk5JTkcsIGZ1bmN0aW9uIChtYXNrLCBjYXRlZ29yeSwgLi4uYXJncykge1xuICogICAgIC4uLlxuICogfSk7XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZXZlbHM9QUxMXSAtIEEgbWFzayB0aGF0IGRlc2NyaWJsZXMgd2hpY2ggbG9nIGxldmVscyB0aGUgaGFuZGxlclxuICogIHNob3VsZCBiZSBhcHBsaWVkIHRvLiBJZiBvbWl0dGVkIHRoZSBoYW5kbGVyIHdpbGwgYmUgdXNlZCBmb3IgYWxsIGxvZyBsZXZlbHMuXG4gKiBAcGFyYW0ge0xvZ0hhbmRsZXJGdW5jdGlvbn0gaGFuZGxlciAtIFRoZSBsb2cgaGFuZGxlciB0aGF0IHdpbGwgYmUgY2FsbGVkLlxuICovXG5Mb2cucHJvdG90eXBlLnNldExvZ0hhbmRsZXIgPSBmdW5jdGlvbiAobGV2ZWxzLCBoYW5kbGVyKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDw9IDEpIHtcbiAgICBoYW5kbGVyID0gbGV2ZWxzXG4gICAgbGV2ZWxzID0gdGhpcy5BTExcbiAgfVxuICBpZiAodHlwZW9mKGxldmVscykgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTG9nLnNldExvZ0hhbmRsZXI6IGxldmVscyBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfVxuICBpZiAodHlwZW9mKGhhbmRsZXIpICE9PSAnZnVuY3Rpb24nICYmIGhhbmRsZXIpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdMb2cuc2V0TG9nSGFuZGxlcjogaGFuZGxlciBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuICB9XG4gIHRoaXMubGV2ZWxzLmZvckVhY2goZnVuY3Rpb24gKGxldmVsLCBpbmRleCkge1xuICAgIGlmICgoMSA8PCBpbmRleCkgJiBsZXZlbHMpIHtcbiAgICAgIHRoaXMuX2xvZ0hhbmRsZXJzW2xldmVsXSA9IGhhbmRsZXJcbiAgICB9XG4gIH0uYmluZCh0aGlzKSlcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBsb2cgbGV2ZWwgZWl0aGVyIGdsb2JhbGx5LCBvciBmb3IgYSBzcGVjaWZpYyBjYXRlZ29yeS5cbiAqIFRoZSBsb2cgaGFuZGxlciB3aWxsIG9ubHkgYmUgY2FsbGVkIGZvciBtZXNzYWdlcyB3aG9zZSBsb2cgbGV2ZWwgaXNcbiAqIGVxdWFsIG9yIGxvd2VyIHRoYW4gdGhlIGxvZyBsZXZlbCBmb3IgdGhhdCBjYXRlZ29yeS5cbiAqXG4gKiBUaGUgbG9nIGxldmVsIG9mIGFueSBjYXRlZ29yeSBpcyBlcXVhbCB0byB0aGUgc3BlY2lmaWMgbG9nIGxldmVsIHRoYXQgaGFzXG4gKiBiZWVuIHNldCBmb3IgdGhhdCBjYXRlZ29yeSwgYW5kIGlmIG5vbmUgaGFzIGJlZW4gc2V0LCB0aGUgZ29iYWwgbG9nIGxldmVsLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBbY2F0ZWdvcnldIC0gT3B0aW9uYWwgbG9nIGNhdGVnb3J5IHRvIHNldCB0aGUgbGV2ZWwgb2YuXG4gKiAgSWYgdGhpcyBpcyBleGNsdWRlZCwgdGhlIGdsb2JhbCBsb2cgbGV2ZWwgd2lsbCBiZSBzZXQgaW5zdGVhZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBsZXZlbCAtIFRoZSBuZXcgbG9nIGxldmVsLlxuICovXG5Mb2cucHJvdG90eXBlLnNldExvZ0xldmVsID0gZnVuY3Rpb24gKGNhdGVnb3J5LCBsZXZlbCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8PSAxKSB7XG4gICAgbGV2ZWwgPSBjYXRlZ29yeVxuICAgIGlmICh0eXBlb2YobGV2ZWwpICE9PSAnbnVtYmVyJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTG9nLnNldExvZ0xldmVsOiBsZXZlbCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgICB9XG4gICAgdGhpcy5fZGVmYXVsdExvZ0xldmVsID0gbGV2ZWxcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mKGNhdGVnb3J5KSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0xvZy5zZXRMb2dMZXZlbDogY2F0ZWdvcnkgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgfVxuICAgIGlmICh0eXBlb2YobGV2ZWwpICE9PSAnbnVtYmVyJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTG9nLnNldExvZ0xldmVsOiBsZXZlbCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgICB9XG4gICAgdGhpcy5fY2F0ZWdvcnlMZXZlbHNbY2F0ZWdvcnldID0gbGV2ZWxcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVMb2dGdW5jdGlvbihsZXZlbCwgbWFzaykge1xuICByZXR1cm4gZnVuY3Rpb24gKGNhdGVnb3J5LCBtZXNzYWdlLCAuLi5hcmdzKSB7XG4gICAgYXJnQ2hlY2suc3RyaW5nKGBsb2cuJHtsZXZlbH1gLCAnY2F0ZWdvcnknLCBjYXRlZ29yeSlcbiAgICB2YXIgbG9nTGV2ZWwgPSAwXG4gICAgaWYgKHR5cGVvZihjYXRlZ29yeSkgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdMb2cuJyArIGxldmVsICsgJzogY2F0ZWdvcnkgaGFzIHRvIGJlIGEgc3RyaW5nJylcbiAgICB9XG4gICAgaWYgKGNhdGVnb3J5IGluIHRoaXMuX2NhdGVnb3J5TGV2ZWxzKSB7XG4gICAgICBsb2dMZXZlbCA9IHRoaXMuX2NhdGVnb3J5TGV2ZWxzW2NhdGVnb3J5XVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2dMZXZlbCA9IHRoaXMuX2RlZmF1bHRMb2dMZXZlbFxuICAgIH1cbiAgICBpZiAobG9nTGV2ZWwgPCBtYXNrKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKHR5cGVvZihtZXNzYWdlKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGFyZ0NoZWNrLnN0cmluZyhgbG9nLiR7bGV2ZWx9YCwgJ21lc3NhZ2UnLCBtZXNzYWdlKVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgb2JqZWN0ID0gbWVzc2FnZVxuICAgICAgYXJnQ2hlY2sub2JqZWN0KGBsb2cuJHtsZXZlbH1gLCAnb2JqZWN0Jywgb2JqZWN0KVxuICAgICAgbGV0IFtvYmplY3RNZXNzYWdlLCAuLi5vYmplY3RBcmdzXSA9IGFyZ3NcbiAgICAgIGFyZ0NoZWNrLnN0cmluZyhgbG9nLiR7bGV2ZWx9YCwgJ29iamVjdCBtZXNzYWdlJywgb2JqZWN0TWVzc2FnZSlcblxuICAgICAgbWVzc2FnZSA9IGAke29iamVjdH0gJHtvYmplY3RNZXNzYWdlfWBcbiAgICAgIGFyZ3MgPSBvYmplY3RBcmdzXG4gICAgfVxuICAgIHZhciBoYW5kbGVyID0gdGhpcy5fbG9nSGFuZGxlcnNbbGV2ZWxdXG4gICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBtYXNrLCBjYXRlZ29yeSwgbWVzc2FnZSwgLi4uYXJncylcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBbiBhcnJheSBvZiB0aGUgbmFtZXMgb2YgYWxsIGxvZyBsZXZlbHMsIGluIGxvd2VyY2FzZS5cbiAqIEB0eXBlIHtzdHJpbmdbXX1cbiAqL1xuTG9nLnByb3RvdHlwZS5sZXZlbHMgPSBbJ2Vycm9yJywgJ3dhcm5pbmcnLCAnaW5mbycsICdkZWJ1ZycsICd2ZXJib3NlJ11cblxuTG9nLnByb3RvdHlwZS5sZXZlbHMuZm9yRWFjaChmdW5jdGlvbiAobGV2ZWwsIGluZGV4KSB7XG4gIHZhciBtYXNrID0gMSA8PCBpbmRleFxuICBMb2cucHJvdG90eXBlW2xldmVsLnRvVXBwZXJDYXNlKCldID0gbWFza1xuICBMb2cucHJvdG90eXBlW2xldmVsXSA9IGNyZWF0ZUxvZ0Z1bmN0aW9uKGxldmVsLCBtYXNrKVxufSlcblxuLyoqXG4gKiBUaGUgZXJyb3IgbG9nIGZ1bmN0aW9uLiBXaWxsIGNhbGwgdGhlIGVycm9yIGxvZyBoYW5kbGVyIGlmIHRoZSBsb2dcbiAqIGxldmVsIG9mIHRoZSBnaXZlbiBjYXRlZ29yeSBpcyBzZXQgdG8gZXJyb3Igb3IgaGlnaGVyLlxuICogQGZ1bmN0aW9uIExvZyNlcnJvclxuICogQHBhcmFtIHtzdHJpbmd9IGNhdGVnb3J5IC0gVGhlIGNhdGVnb3J5IG9mIHRoaXMgbG9nIG1lc3NhZ2VcbiAqIEBwYXJhbSB7Li4uKn0gYXJncyAtIFRoZSByZXN0IG9mIHRoZSBhcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgbG9nIGhhbmRsZXJcbiAqL1xuLyoqXG4gKiBUaGUgd2FybmluZyBsb2cgZnVuY3Rpb24uIFdpbGwgY2FsbCB0aGUgd2FybmluZyBsb2cgaGFuZGxlciBpZiB0aGUgbG9nXG4gKiBsZXZlbCBvZiB0aGUgZ2l2ZW4gY2F0ZWdvcnkgaXMgc2V0IHRvIHdhcm5pbmcgb3IgaGlnaGVyLlxuICogQGZ1bmN0aW9uIExvZyN3YXJuaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gY2F0ZWdvcnkgLSBUaGUgY2F0ZWdvcnkgb2YgdGhpcyBsb2cgbWVzc2FnZVxuICogQHBhcmFtIHsuLi4qfSBhcmdzIC0gVGhlIHJlc3Qgb2YgdGhlIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBsb2cgaGFuZGxlclxuICovXG4vKipcbiAqIFRoZSBpbmZvIGxvZyBmdW5jdGlvbi4gV2lsbCBjYWxsIHRoZSBpbmZvIGxvZyBoYW5kbGVyIGlmIHRoZSBsb2dcbiAqIGxldmVsIG9mIHRoZSBnaXZlbiBjYXRlZ29yeSBpcyBzZXQgdG8gaW5mbyBvciBoaWdoZXIuXG4gKiBAZnVuY3Rpb24gTG9nI2luZm9cbiAqIEBwYXJhbSB7c3RyaW5nfSBjYXRlZ29yeSAtIFRoZSBjYXRlZ29yeSBvZiB0aGlzIGxvZyBtZXNzYWdlXG4gKiBAcGFyYW0gey4uLip9IGFyZ3MgLSBUaGUgcmVzdCBvZiB0aGUgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIGxvZyBoYW5kbGVyXG4gKi9cbi8qKlxuICogVGhlIGRlYnVnIGxvZyBmdW5jdGlvbi4gV2lsbCBjYWxsIHRoZSBkZWJ1ZyBsb2cgaGFuZGxlciBpZiB0aGUgbG9nXG4gKiBsZXZlbCBvZiB0aGUgZ2l2ZW4gY2F0ZWdvcnkgaXMgc2V0IHRvIGRlYnVnIG9yIGhpZ2hlci5cbiAqIEBmdW5jdGlvbiBMb2cjZGVidWdcbiAqIEBwYXJhbSB7c3RyaW5nfSBjYXRlZ29yeSAtIFRoZSBjYXRlZ29yeSBvZiB0aGlzIGxvZyBtZXNzYWdlXG4gKiBAcGFyYW0gey4uLip9IGFyZ3MgLSBUaGUgcmVzdCBvZiB0aGUgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIGxvZyBoYW5kbGVyXG4gKi9cbi8qKlxuICogVGhlIHZlcmJvc2UgbG9nIGZ1bmN0aW9uLiBXaWxsIGNhbGwgdGhlIHZlcmJvc2UgbG9nIGhhbmRsZXIgaWYgdGhlIGxvZ1xuICogbGV2ZWwgb2YgdGhlIGdpdmVuIGNhdGVnb3J5IGlzIHNldCB0byB2ZXJib3NlIG9yIGhpZ2hlci5cbiAqIEBmdW5jdGlvbiBMb2cjdmVyYm9zZVxuICogQHBhcmFtIHtzdHJpbmd9IGNhdGVnb3J5IC0gVGhlIGNhdGVnb3J5IG9mIHRoaXMgbG9nIG1lc3NhZ2VcbiAqIEBwYXJhbSB7Li4uKn0gYXJncyAtIFRoZSByZXN0IG9mIHRoZSBhcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgbG9nIGhhbmRsZXJcbiAqL1xuXG4vKipcbiAqIExvZyBsZXZlbCByZXByZXNlbnRpbmcgbm8gbG9nZ2luZyBhdCBhbGwuXG4gKiBAbWVtYmVyIHtudW1iZXJ9IExvZyNOT05FXG4gKiBAcmVhZG9ubHlcbiAqL1xuLyoqXG4gKiBFcnJvciBsZXZlbC5cbiAqIEBtZW1iZXIge251bWJlcn0gTG9nI0VSUk9SXG4gKiBAcmVhZG9ubHlcbiAqL1xuLyoqXG4gKiBXYXJuaW5nIGxldmVsLlxuICogQG1lbWJlciB7bnVtYmVyfSBMb2cjV0FSTklOR1xuICogQHJlYWRvbmx5XG4gKi9cbi8qKlxuICogSW5mbyBsZXZlbC5cbiAqIEBtZW1iZXIge251bWJlcn0gTG9nI0lORk9cbiAqIEByZWFkb25seVxuICovXG4vKipcbiAqIERlYnVnIGxldmVsLlxuICogQG1lbWJlciB7bnVtYmVyfSBMb2cjREVCVUdcbiAqIEByZWFkb25seVxuICovXG4vKipcbiAqIFZlcmJvc2UgbGV2ZWwuXG4gKiBAbWVtYmVyIHtudW1iZXJ9IExvZyNWRVJCT1NFXG4gKiBAcmVhZG9ubHlcbiAqL1xuLyoqXG4gKiBMb2cgbGV2ZWwgcmVwcmVzZW50aW5nIGEgbWFzayBvZiBhbGwgbG9nIGxldmVscy5cbiAqIEBtZW1iZXIge251bWJlcn0gTG9nI0FMTFxuICogQHJlYWRvbmx5XG4gKi9cblxuTG9nLnByb3RvdHlwZS5OT05FID0gMFxuTG9nLnByb3RvdHlwZS5BTEwgPSBMb2cucHJvdG90eXBlLmxldmVscy5yZWR1Y2UoZnVuY3Rpb24gKG1hc2ssIGlnbm9yZWQsIGluZGV4KSB7XG4gIHJldHVybiBtYXNrIHwgKDEgPDwgaW5kZXgpXG59LCAwKVxuXG52YXIgbG9nID0gbmV3IExvZygpXG5cbmV4cG9ydCBkZWZhdWx0IGxvZ1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0TG9nKF9sb2cpIHtcbiAgbG9nID0gX2xvZ1xufVxuXG4vKipcbiAqIFdoZXRoZXIgb3Igbm90IHRoZSBkZWZhdWx0IGxvZyBoYW5kbGVyIHNob3VsZCB1c2UgY29sb3IgdG8gcmVwcmVzZW50IGxvZyBsZXZlbHMuXG4gKiBAbWVtYmVyIHtib29sZWFufSBMb2cjY29sb3JcbiAqL1xuXG5jb25zdCBsb2dGdW5jdGlvbnMgPSB7XG4gIFtsb2cuRVJST1JdOiAoY29uc29sZS5lcnJvciB8fCBjb25zb2xlLmxvZykuYmluZChjb25zb2xlKSxcbiAgW2xvZy5XQVJOSU5HXTogKGNvbnNvbGUud2FybiB8fCBjb25zb2xlLmxvZykuYmluZChjb25zb2xlKSxcbiAgW2xvZy5JTkZPXTogKGNvbnNvbGUuaW5mbyB8fCBjb25zb2xlLmxvZykuYmluZChjb25zb2xlKSxcbiAgW2xvZy5ERUJVR106IChjb25zb2xlLmRlYnVnIHx8IGNvbnNvbGUubG9nKS5iaW5kKGNvbnNvbGUpLFxuICBbbG9nLlZFUkJPU0VdOiBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpLFxufVxuY29uc3QgbG9nQ29sb3JzID0ge1xuICBbbG9nLkVSUk9SXTogJyNGNzQzMzMnLFxuICBbbG9nLldBUk5JTkddOiAnI0Y3OTc0MycsXG4gIFtsb2cuSU5GT106ICcjMzM0M0Y3JyxcbiAgW2xvZy5ERUJVR106ICcjNDNDNzMzJyxcbiAgW2xvZy5WRVJCT1NFXTogJyNGNzQzRjcnLFxufVxuXG5mdW5jdGlvbiBkZWZhdWx0TG9nSGFuZGxlcihsZXZlbCwgY2F0ZWdvcnksIG1lc3NhZ2UsIC4uLmFyZ3MpIHtcbiAgbG9nRnVuY3Rpb25zW2xldmVsXS5jYWxsKGNvbnNvbGUsIGBbJHtjYXRlZ29yeX1dICR7bWVzc2FnZX1gLCAuLi5hcmdzKVxufVxuXG5mdW5jdGlvbiBjb2xvckxvZ0hhbmRsZXIobGV2ZWwsIGNhdGVnb3J5LCBtZXNzYWdlLCAuLi5hcmdzKSB7XG4gIGlmICh0aGlzLmNvbG9yKSB7XG4gICAgbG9nRnVuY3Rpb25zW2xldmVsXS5jYWxsKGNvbnNvbGUsIGAlY1ske2NhdGVnb3J5fV0lYyAke21lc3NhZ2V9YCwgLi4uW1xuICAgICAgJ2NvbG9yOiAnICsgbG9nQ29sb3JzW2xldmVsXSxcbiAgICAgICdjb2xvcjonLFxuICAgIF0sIC4uLmFyZ3MpXG4gIH0gZWxzZSB7XG4gICAgbG9nRnVuY3Rpb25zW2xldmVsXS5jYWxsKGNvbnNvbGUsIGBbJHtjYXRlZ29yeX1dICR7bWVzc2FnZX1gLCAuLi5hcmdzKVxuICB9XG59XG5cbmxvZy5jb2xvciA9IGZhbHNlXG5sb2cuY29sb3JzID0gbG9nQ29sb3JzXG5cbnZhciBkZWZhdWx0SGFuZGxlclxuXG5pZiAoaXNDaHJvbWUgfHwgaXNGaXJlZm94KSB7XG4gIGRlZmF1bHRIYW5kbGVyID0gY29sb3JMb2dIYW5kbGVyXG59IGVsc2Uge1xuICBkZWZhdWx0SGFuZGxlciA9IGRlZmF1bHRMb2dIYW5kbGVyXG59XG5cbmxvZy5zZXRMb2dIYW5kbGVyKGxvZy5BTEwsIGRlZmF1bHRIYW5kbGVyKVxubG9nLmRlZmF1bHRIYW5kbGVyID0gZGVmYXVsdEhhbmRsZXJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWIvY29tbW9uL2xvZy5qcyIsInZhciBzdG9yZSA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbnZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2w7XG52YXIgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZlwiKTtcblxudmFyIF9zZXRQcm90b3R5cGVPZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zZXRQcm90b3R5cGVPZik7XG5cbnZhciBfY3JlYXRlID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2NyZWF0ZVwiKTtcblxudmFyIF9jcmVhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlKTtcblxudmFyIF90eXBlb2YyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArICh0eXBlb2Ygc3VwZXJDbGFzcyA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoc3VwZXJDbGFzcykpKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9ICgwLCBfY3JlYXRlMi5kZWZhdWx0KShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mMi5kZWZhdWx0ID8gKDAsIF9zZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHlwZW9mMiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzZWxmLCBjYWxsKSB7XG4gIGlmICghc2VsZikge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBjYWxsICYmICgodHlwZW9mIGNhbGwgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKGNhbGwpKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIid1c2Ugc3RyaWN0J1xuXG5mdW5jdGlvbiBvcHRBcmdDaGVjayhwcm9wKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoY29udGV4dCwgbmFtZSwgdmFsdWUsIGV4dHJhKSB7XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXNbcHJvcF0oY29udGV4dCwgbmFtZSwgdmFsdWUsIGV4dHJhKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBlLm1lc3NhZ2UgKz0gJyBpZiBwcmVzZW50J1xuICAgICAgICB0aHJvdyBlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG59XG5cbnZhciBhcmdDaGVjayA9IHtcbiAgY291bnQ6IGZ1bmN0aW9uIChjb250ZXh0LCByZXF1aXJlZENvdW50LCBhY3R1YWxDb3VudCkge1xuICAgIGlmIChyZXF1aXJlZENvdW50ID4gYWN0dWFsQ291bnQpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoY29udGV4dCArICcgcmVxdWlyZXMgYXQgbGVhc3QnICsgcmVxdWlyZWRDb3VudCArICcgYXJndW1lbnRzJylcbiAgICB9XG4gIH0sXG4gIGVycm9yOiBmdW5jdGlvbiAoY29udGV4dCwgbmFtZSwgY3JpdGVyaWEpIHtcbiAgICBpZiAodHlwZW9mKGNvbnRleHQpID09PSAnb2JqZWN0Jykge1xuICAgICAgY29udGV4dCA9IGNvbnRleHQuY29uc3RydWN0b3IgJiYgY29udGV4dC5jb25zdHJ1Y3Rvci5uYW1lIHx8ICdVbmtub3duJ1xuICAgICAgY29udGV4dCArPSAnIGNvbnN0cnVjdG9yJ1xuICAgIH1cbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGNvbnRleHQgKyAnOiBhcmd1bWVudCBcXCcnICsgbmFtZSArICdcXCcgbXVzdCAnICsgY3JpdGVyaWEpXG4gIH0sXG4gIG9wdE9iamVjdDogb3B0QXJnQ2hlY2soJ29iamVjdCcpLFxuICBvYmplY3Q6IGZ1bmN0aW9uIChjb250ZXh0LCBuYW1lLCB2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YodmFsdWUpICE9PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5lcnJvcihjb250ZXh0LCBuYW1lLCAnYmUgYW4gb2JqZWN0JylcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICB0aGlzLmVycm9yKGNvbnRleHQsIG5hbWUsICdiZSBhbiBvYmplY3QsIG5vdCBudWxsJylcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICB0aGlzLmVycm9yKGNvbnRleHQsIG5hbWUsICdiZSBhbiBvYmplY3QsIG5vdCBhbiBhcnJheScpXG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgdGhpcy5lcnJvcihjb250ZXh0LCBuYW1lLCAnYmUgYW4gb2JqZWN0LCBub3QgYSBSZWdFeHAgaW5zdGFuY2UnKVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfSxcbiAgb3B0SW5zdGFuY2U6IG9wdEFyZ0NoZWNrKCdpbnN0YW5jZScpLFxuICBpbnN0YW5jZShjb250ZXh0LCBuYW1lLCB2YWx1ZSwgY29uc3RydWN0b3IpIHtcbiAgICBpZiAoIWNvbnN0cnVjdG9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCBpbnN0YW5jZSBhcmd1bWVudCBjaGVjayBmb3IgJHtuYW1lfSBpbiAke2NvbnRleHR9LCBjb25zdHJ1Y3RvciBpcyAke2NvbnN0cnVjdG9yfS5gKVxuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb25zdHJ1Y3RvcikpIHtcbiAgICAgIGxldCBhdExlYXN0T25lTWF0Y2ggPSBjb25zdHJ1Y3Rvci5zb21lKGNvbnN0cnVjdG9yID0+IHtcbiAgICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgY29uc3RydWN0b3JcbiAgICAgIH0pXG4gICAgICBpZiAoIWF0TGVhc3RPbmVNYXRjaCkge1xuICAgICAgICBsZXQgbmFtZXMgPSBjb25zdHJ1Y3Rvci5tYXAoY29uc3RydWN0b3IgPT4gY29uc3RydWN0b3IubmFtZSkuam9pbignLCAnKVxuICAgICAgICB0aGlzLmVycm9yKGNvbnRleHQsIG5hbWUsIGBiZSBhbiBpbnN0YW5jZSBvZiBhbnkgb2YgJHtuYW1lc31gKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIGNvbnN0cnVjdG9yKSkge1xuICAgICAgdGhpcy5lcnJvcihjb250ZXh0LCBuYW1lLCBgYmUgYW4gaW5zdGFuY2Ugb2YgJHtjb25zdHJ1Y3Rvci5uYW1lfWApXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9LFxuICBvcHRGdW5jOiBvcHRBcmdDaGVjaygnZnVuYycpLFxuICBmdW5jOiBmdW5jdGlvbiAoY29udGV4dCwgbmFtZSwgdmFsdWUpIHtcbiAgICBpZiAodHlwZW9mKHZhbHVlKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5lcnJvcihjb250ZXh0LCBuYW1lLCAnYmUgYSBmdW5jdGlvbicpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9LFxuICBvcHRBcnJheTogb3B0QXJnQ2hlY2soJ2FycmF5JyksXG4gIGFycmF5OiBmdW5jdGlvbiAoY29udGV4dCwgbmFtZSwgdmFsdWUpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICB0aGlzLmVycm9yKGNvbnRleHQsIG5hbWUsICdiZSBhbiBhcnJheScpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9LFxuICBvcHRTdHJpbmc6IG9wdEFyZ0NoZWNrKCdzdHJpbmcnKSxcbiAgc3RyaW5nOiBmdW5jdGlvbiAoY29udGV4dCwgbmFtZSwgdmFsdWUpIHtcbiAgICBpZiAodHlwZW9mKHZhbHVlKSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuZXJyb3IoY29udGV4dCwgbmFtZSwgJ2JlIGEgc3RyaW5nJylcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAnJykge1xuICAgICAgdGhpcy5lcnJvcihjb250ZXh0LCBuYW1lLCAnbm90IGJlIGFuIGVtcHR5IHN0cmluZycpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9LFxuICBvcHRTdHJpbmdPckVtcHR5OiBvcHRBcmdDaGVjaygnc3RyaW5nJyksXG4gIHN0cmluZ09yRW1wdHk6IGZ1bmN0aW9uIChjb250ZXh0LCBuYW1lLCB2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YodmFsdWUpICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5lcnJvcihjb250ZXh0LCBuYW1lLCAnYmUgYSBzdHJpbmcnKVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfSxcbiAgb3B0VmFsdWVzOiBvcHRBcmdDaGVjaygndmFsdWVzJyksXG4gIHZhbHVlczogZnVuY3Rpb24gKGNvbnRleHQsIG5hbWUsIHZhbHVlLCB2YWx1ZXMpIHtcbiAgICBpZiAodmFsdWVzLmluZGV4T2YodmFsdWUpID09PSAtMSkge1xuICAgICAgdGhpcy5lcnJvcihjb250ZXh0LCBuYW1lLCAnYmUgb25lIG9mICcgKyB2YWx1ZXMuam9pbignLCAnKSlcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlXG4gIH0sXG4gIG9wdE51bWJlcjogb3B0QXJnQ2hlY2soJ251bWJlcicpLFxuICBudW1iZXI6IGZ1bmN0aW9uIChjb250ZXh0LCBuYW1lLCB2YWx1ZSkge1xuICAgIGlmIChpc05hTih2YWx1ZSkpIHtcbiAgICAgIHRoaXMuZXJyb3IoY29udGV4dCwgbmFtZSwgJ25vdCBiZSBOYU4nKVxuICAgIH0gZWxzZSBpZiAoIWlzRmluaXRlKHZhbHVlKSkge1xuICAgICAgdGhpcy5lcnJvcihjb250ZXh0LCBuYW1lLCAnbm90IGJlIEluZmluaXRlJylcbiAgICB9IGVsc2UgaWYgKHR5cGVvZih2YWx1ZSkgIT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLmVycm9yKGNvbnRleHQsIG5hbWUsICdiZSBhIG51bWJlcicpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9LFxuICBvcHRCb29sZWFuOiBvcHRBcmdDaGVjaygnYm9vbGVhbicpLFxuICBib29sZWFuOiBmdW5jdGlvbiAoY29udGV4dCwgbmFtZSwgdmFsdWUpIHtcbiAgICBpZiAodHlwZW9mKHZhbHVlKSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aGlzLmVycm9yKGNvbnRleHQsIG5hbWUsICdiZSBhIGJvb2xlYW4nKVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfSxcbiAgb3B0aW9uczogZnVuY3Rpb24gKGNvbnRleHQsIG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5vYmplY3QoY29udGV4dCwgbmFtZSwgdmFsdWUpXG4gICAgcmV0dXJuIG5ldyBPcHRpb25zQXJnQ2hlY2tlcihjb250ZXh0LCBuYW1lLCB2YWx1ZSlcbiAgfSxcbiAgb3B0T3B0aW9uczogZnVuY3Rpb24gKGNvbnRleHQsIG5hbWUsIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMoY29udGV4dCwgbmFtZSwgdmFsdWUpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGUubWVzc2FnZSArPSAnIGlmIHByZXNlbnQnXG4gICAgICAgIHRocm93IGVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ldyBPcHRpb25zQXJnQ2hlY2tlcigwLCAwLCAwLCB0cnVlKVxuICB9LFxufVxuXG5leHBvcnQgZGVmYXVsdCBhcmdDaGVja1xuXG5mdW5jdGlvbiBPcHRpb25zQXJnQ2hlY2tlcihjb250ZXh0LCBuYW1lLCB2YWx1ZSwgZW1wdHkpIHtcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dFxuICB0aGlzLm5hbWUgPSBuYW1lXG4gIHRoaXMudmFsdWUgPSB2YWx1ZVxuICB0aGlzLmVtcHR5ID0gZW1wdHlcbn1cblxuZnVuY3Rpb24gb3B0T3B0aW9uc0FyZ0NoZWNrKHR5cGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChwcm9wLCBleHRyYSkge1xuICAgIGlmICghdGhpcy5lbXB0eSAmJiBwcm9wIGluIHRoaXMudmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlW3Byb3BdICE9PSB1bmRlZmluZWQgJiYgdGhpcy52YWx1ZVtwcm9wXSAhPT0gbnVsbCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXNbdHlwZV0ocHJvcCwgZXh0cmEpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBlLm1lc3NhZ2UgKz0gJyBpZiBwcmVzZW50J1xuICAgICAgICAgIHRocm93IGVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbk9wdGlvbnNBcmdDaGVja2VyLnByb3RvdHlwZSA9IHtcbiAgb3B0T2JqZWN0OiBvcHRPcHRpb25zQXJnQ2hlY2soJ29iamVjdCcpLFxuICBvYmplY3Q6IGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgaWYgKCF0aGlzLmVtcHR5KSB7XG4gICAgICBhcmdDaGVjay5vYmplY3QodGhpcy5jb250ZXh0LCB0aGlzLm5hbWUgKyAnLicgKyBwcm9wLCB0aGlzLnZhbHVlW3Byb3BdKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9LFxuICBvcHRJbnN0YW5jZTogb3B0T3B0aW9uc0FyZ0NoZWNrKCdpbnN0YW5jZScpLFxuICBpbnN0YW5jZTogZnVuY3Rpb24gKHByb3AsIGNvbnN0cnVjdG9yKSB7XG4gICAgaWYgKCF0aGlzLmVtcHR5KSB7XG4gICAgICBhcmdDaGVjay5pbnN0YW5jZSh0aGlzLmNvbnRleHQsIHRoaXMubmFtZSArICcuJyArIHByb3AsIHRoaXMudmFsdWVbcHJvcF0sIGNvbnN0cnVjdG9yKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9LFxuICBvcHRGdW5jOiBvcHRPcHRpb25zQXJnQ2hlY2soJ2Z1bmMnKSxcbiAgZnVuYzogZnVuY3Rpb24gKHByb3ApIHtcbiAgICBpZiAoIXRoaXMuZW1wdHkpIHtcbiAgICAgIGFyZ0NoZWNrLmZ1bmModGhpcy5jb250ZXh0LCB0aGlzLm5hbWUgKyAnLicgKyBwcm9wLCB0aGlzLnZhbHVlW3Byb3BdKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9LFxuICBvcHRBcnJheTogb3B0T3B0aW9uc0FyZ0NoZWNrKCdhcnJheScpLFxuICBhcnJheTogZnVuY3Rpb24gKHByb3ApIHtcbiAgICBpZiAoIXRoaXMuZW1wdHkpIHtcbiAgICAgIGFyZ0NoZWNrLmFycmF5KHRoaXMuY29udGV4dCwgdGhpcy5uYW1lICsgJy4nICsgcHJvcCwgdGhpcy52YWx1ZVtwcm9wXSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfSxcbiAgb3B0U3RyaW5nOiBvcHRPcHRpb25zQXJnQ2hlY2soJ3N0cmluZycpLFxuICBzdHJpbmc6IGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgaWYgKCF0aGlzLmVtcHR5KSB7XG4gICAgICBhcmdDaGVjay5zdHJpbmcodGhpcy5jb250ZXh0LCB0aGlzLm5hbWUgKyAnLicgKyBwcm9wLCB0aGlzLnZhbHVlW3Byb3BdKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9LFxuICBvcHRTdHJpbmdPckVtcHR5OiBvcHRPcHRpb25zQXJnQ2hlY2soJ3N0cmluZ09yRW1wdHknKSxcbiAgc3RyaW5nT3JFbXB0eTogZnVuY3Rpb24gKHByb3ApIHtcbiAgICBpZiAoIXRoaXMuZW1wdHkpIHtcbiAgICAgIGFyZ0NoZWNrLnN0cmluZ09yRW1wdHkodGhpcy5jb250ZXh0LCB0aGlzLm5hbWUgKyAnLicgKyBwcm9wLCB0aGlzLnZhbHVlW3Byb3BdKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9LFxuICBvcHRWYWx1ZXM6IG9wdE9wdGlvbnNBcmdDaGVjaygndmFsdWVzJyksXG4gIHZhbHVlczogZnVuY3Rpb24gKHByb3AsIHZhbHVlcykge1xuICAgIGlmICghdGhpcy5lbXB0eSkge1xuICAgICAgYXJnQ2hlY2sudmFsdWVzKHRoaXMuY29udGV4dCwgdGhpcy5uYW1lICsgJy4nICsgcHJvcCwgdGhpcy52YWx1ZVtwcm9wXSwgdmFsdWVzKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9LFxuICBvcHROdW1iZXI6IG9wdE9wdGlvbnNBcmdDaGVjaygnbnVtYmVyJyksXG4gIG51bWJlcjogZnVuY3Rpb24gKHByb3ApIHtcbiAgICBpZiAoIXRoaXMuZW1wdHkpIHtcbiAgICAgIGFyZ0NoZWNrLm51bWJlcih0aGlzLmNvbnRleHQsIHRoaXMubmFtZSArICcuJyArIHByb3AsIHRoaXMudmFsdWVbcHJvcF0pXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH0sXG4gIG9wdEJvb2xlYW46IG9wdE9wdGlvbnNBcmdDaGVjaygnYm9vbGVhbicpLFxuICBib29sZWFuOiBmdW5jdGlvbiAocHJvcCkge1xuICAgIGlmICghdGhpcy5lbXB0eSkge1xuICAgICAgYXJnQ2hlY2suYm9vbGVhbih0aGlzLmNvbnRleHQsIHRoaXMubmFtZSArICcuJyArIHByb3AsIHRoaXMudmFsdWVbcHJvcF0pXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH0sXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGliL2NvbW1vbi9hcmdDaGVjay5qcyIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgZnVuY3Rpb24gZmluZChjb2xsZWN0aW9uLCBmdW5jLCB0aGlzQXJnKSB7XG4gIGZvciAodmFyIGtleSBpbiBjb2xsZWN0aW9uKSB7XG4gICAgaWYgKGNvbGxlY3Rpb24uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgaWYgKGZ1bmMuY2FsbCh0aGlzQXJnLCBjb2xsZWN0aW9uW2tleV0sIGtleSwgY29sbGVjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb25ba2V5XVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsbChhcnJheSwgdmFsdWUgPSB1bmRlZmluZWQpIHtcbiAgbGV0IGxlbiA9IGFycmF5Lmxlbmd0aCB8IDBcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgYXJyYXlbaV0gPSB2YWx1ZVxuICB9XG5cbiAgcmV0dXJuIGFycmF5XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXIoY29sbGVjdGlvbiwgZnVuYywgdGhpc0FyZykge1xuICB2YXIgYXJyID0gW11cbiAgZm9yICh2YXIga2V5IGluIGNvbGxlY3Rpb24pIHtcbiAgICBpZiAoY29sbGVjdGlvbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBpZiAoZnVuYy5jYWxsKHRoaXNBcmcsIGNvbGxlY3Rpb25ba2V5XSwga2V5LCBjb2xsZWN0aW9uKSkge1xuICAgICAgICBhcnIucHVzaChjb2xsZWN0aW9uW2tleV0pXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvckVhY2goY29sbGVjdGlvbiwgZnVuYywgdGhpc0FyZykge1xuICBmb3IgKHZhciBrZXkgaW4gY29sbGVjdGlvbikge1xuICAgIGlmIChjb2xsZWN0aW9uLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGZ1bmMuY2FsbCh0aGlzQXJnLCBjb2xsZWN0aW9uW2tleV0sIGtleSwgY29sbGVjdGlvbilcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcChjb2xsZWN0aW9uLCBmdW5jLCB0aGlzQXJnKSB7XG4gIHZhciBhcnIgPSBbXVxuICBmb3IgKHZhciBrZXkgaW4gY29sbGVjdGlvbikge1xuICAgIGlmIChjb2xsZWN0aW9uLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGFyci5wdXNoKGZ1bmMuY2FsbCh0aGlzQXJnLCBjb2xsZWN0aW9uW2tleV0sIGtleSwgY29sbGVjdGlvbikpXG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcFZhbHVlcyhjb2xsZWN0aW9uLCBmdW5jLCB0aGlzQXJnKSB7XG4gIHZhciBvYmogPSB7fVxuICBmb3IgKHZhciBrZXkgaW4gY29sbGVjdGlvbikge1xuICAgIGlmIChjb2xsZWN0aW9uLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIG9ialtrZXldID0gZnVuYy5jYWxsKHRoaXNBcmcsIGNvbGxlY3Rpb25ba2V5XSwga2V5LCBjb2xsZWN0aW9uKVxuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWx1ZXMoY29sbGVjdGlvbikge1xuICBpZiAoIWNvbGxlY3Rpb24pIHtcbiAgICByZXR1cm4gW11cbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RyaWVkIHRvIGNhbGwgdXRpbHMudmFsdWVzKCkgb24gYXJyYXknKVxuICB9XG4gIHJldHVybiBPYmplY3Qua2V5cyhjb2xsZWN0aW9uKS5tYXAoa2V5ID0+IGNvbGxlY3Rpb25ba2V5XSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpZmYoY29sbGVjdGlvbjEsIGNvbGxlY3Rpb24yKSB7XG4gIGxldCBzZXQxID0gbmV3IFNldChjb2xsZWN0aW9uMSlcbiAgbGV0IHNldDIgPSBuZXcgU2V0KGNvbGxlY3Rpb24yKVxuICBsZXQgYWRkZWQgPSBbXVxuICBsZXQgcmVtb3ZlZCA9IFtdXG4gIHNldDEuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICBpZiAoIXNldDIuaGFzKGVsZW1lbnQpKSB7XG4gICAgICByZW1vdmVkLnB1c2goZWxlbWVudClcbiAgICB9XG4gIH0pXG4gIHNldDIuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICBpZiAoIXNldDEuaGFzKGVsZW1lbnQpKSB7XG4gICAgICBhZGRlZC5wdXNoKGVsZW1lbnQpXG4gICAgfVxuICB9KVxuICByZXR1cm4gW2FkZGVkLCByZW1vdmVkXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9BcnJheShhcnJheUxpa2UpIHtcbiAgdmFyIGFyciA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlMaWtlLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgYXJyW2ldID0gYXJyYXlMaWtlW2ldXG4gIH1cbiAgcmV0dXJuIGFyclxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGlkZGVuUHJvcChvYmosIG5hbWUsIHZhbHVlKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG5hbWUsIHtcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IGZhbHNlLFxuICAgIHZhbHVlOiB2YWx1ZSxcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3Aob2JqLCBuYW1lLCBmdW5jKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG5hbWUsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IGZhbHNlLFxuICAgIHZhbHVlOiBmdW5jLFxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0dGVyKG9iaiwgbmFtZSwgZnVuYykge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgIGdldDogZnVuYyxcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmdlKGZyb20sIHRvLCBzdGVwKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdG8gPSBmcm9tXG4gICAgZnJvbSA9IDBcbiAgICBzdGVwID0gMVxuICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICBzdGVwID0gMVxuICB9XG4gIHZhciBhcnIgPSBbXVxuICBmb3IgKHZhciBpID0gZnJvbTsgaSA8IHRvOyBpICs9IHN0ZXApIHtcbiAgICBhcnIucHVzaChpKVxuICB9XG4gIHJldHVybiBhcnJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmVyKCkge1xuICB2YXIgZGVmZXJyZWQgPSB7fVxuICBkZWZlcnJlZC5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGRlZmVycmVkLnJlc29sdmUgPSByZXNvbHZlXG4gICAgZGVmZXJyZWQucmVqZWN0ID0gcmVqZWN0XG4gIH0pXG4gIHJldHVybiBkZWZlcnJlZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hhbGxvd0NvcHkob2JqLCBrZXlzKSB7XG4gIGlmICghb2JqKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICB2YXIgcmVzdWx0ID0ge31cbiAgdmFyIGtleVxuICBpZiAoa2V5cykge1xuICAgIGZvciAodmFyIGluZGV4IGluIGtleXMpIHtcbiAgICAgIGtleSA9IGtleXNbaW5kZXhdXG4gICAgICByZXN1bHRba2V5XSA9IG9ialtrZXldXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gb2JqW2tleV1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzaWduKG9iaiwgb3RoZXIsIGtleXMpIHtcbiAgaWYgKCFvYmopIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIGlmICghb3RoZXIpIHtcbiAgICByZXR1cm4gb2JqXG4gIH1cbiAgdmFyIGtleVxuICBpZiAoa2V5cykge1xuICAgIGZvciAodmFyIGluZGV4IGluIGtleXMpIHtcbiAgICAgIGtleSA9IGtleXNbaW5kZXhdXG4gICAgICBvYmpba2V5XSA9IG90aGVyW2tleV1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yIChrZXkgaW4gb3RoZXIpIHtcbiAgICAgIGlmIChvdGhlci5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIG9ialtrZXldID0gb3RoZXJba2V5XVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3YWl0KHRpbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50c1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlc29sdmUuYXBwbHkobnVsbCwgYXJncylcbiAgICAgIH0sIHRpbWUpXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tU3RyaW5nKHNpemUpIHtcbiAgdmFyIGFycmF5ID0gbnVsbFxuICB2YXIgbm93XG4gIHZhciBpXG4gIHZhciBjcnlwdG8gPSBub1ZlbmRvcihnbG9iYWxPYmplY3QsICdjcnlwdG8nKVxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERUpTKSB7XG4gICAgYXJyYXkgPSByZXF1aXJlKCdjcnlwdG8nKS5yYW5kb21CeXRlcyhzaXplKVxuICB9IGVsc2UgaWYgKGNyeXB0byAmJiB3aW5kb3cuVWludDhBcnJheSkge1xuICAgIGFycmF5ID0gbmV3IHdpbmRvdy5VaW50OEFycmF5KHNpemUpXG4gICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhhcnJheSlcbiAgfSBlbHNlIHtcbiAgICBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgIGFycmF5ID0gW11cbiAgICBmb3IgKGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XG4gICAgICBhcnJheVtpXSA9IChNYXRoLnJhbmRvbSgpICogbm93KSAmIDI1NVxuICAgIH1cbiAgfVxuXG4gIHZhciByYXdTdHJpbmcgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGFycmF5KVxuICB2YXIgYmFzZTY0U3RyaW5nID0gdXRmOFRvQmFzZTY0KHJhd1N0cmluZylcbiAgcmV0dXJuIGJhc2U2NFN0cmluZy5yZXBsYWNlKC9cXC1fL2csICcnKS5zbGljZSgwLCBzaXplKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlCdWZmZXJTaGExSWZTdXBwb3J0ZWQoYXJyYXlCdWZmZXIpIHtcbiAgbGV0IHN1YnRsZUNyeXB0byA9IHdpbmRvdy5jcnlwdG8gJiYgd2luZG93LmNyeXB0by5zdWJ0bGVcbiAgaWYgKHN1YnRsZUNyeXB0byAmJiBzdWJ0bGVDcnlwdG8uZGlnZXN0KSB7XG4gICAgcmV0dXJuIHN1YnRsZUNyeXB0by5kaWdlc3QoJ1NIQS0xJywgYXJyYXlCdWZmZXIpXG4gIH1cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYmFzZTY0VG9VdGY4KGJhc2U2NCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERUpTKSB7XG4gICAgLyogZ2xvYmFsIGdsb2JhbCAqL1xuICAgIHJldHVybiBnbG9iYWwuQnVmZmVyLmZyb20oYmFzZTY0LCAnYmFzZTY0JykudG9TdHJpbmcoJ3V0ZjgnKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBhdG9iKGJhc2U2NClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXRmOFRvQmFzZTY0KHV0ZjgpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVKUykge1xuICAgIC8qIGdsb2JhbCBnbG9iYWwgKi9cbiAgICByZXR1cm4gZ2xvYmFsLkJ1ZmZlci5mcm9tKHV0ZjgsICd1dGY4JykudG9TdHJpbmcoJ2Jhc2U2NCcpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJ0b2EodXRmOClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXJsU2FmZUJhc2U2NFRvVXRmOCh1cmxTYWZlQmFzZTY0KSB7XG4gIHJldHVybiBiYXNlNjRUb1V0ZjgodXJsU2FmZUJhc2U2NC5yZXBsYWNlKC9bLV9dL2csIGNoYXJGcm9tVXJsU2FmZUJhc2U2NCkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1dGY4VG9VcmxTYWZlQmFzZTY0KHV0ZjgpIHtcbiAgcmV0dXJuIHV0ZjhUb0Jhc2U2NCh1dGY4KS5yZXBsYWNlKC9bKy89XS9nLCBjaGFyVG9VcmxTYWZlQmFzZTY0KVxufVxuXG5mdW5jdGlvbiBjaGFyVG9VcmxTYWZlQmFzZTY0KGNoYXIpIHtcbiAgc3dpdGNoIChjaGFyKSB7XG4gICAgY2FzZSAnKyc6IHJldHVybiAnLSdcbiAgICBjYXNlICcvJzogcmV0dXJuICdfJ1xuICB9XG4gIHJldHVybiAnJ1xufVxuXG5mdW5jdGlvbiBjaGFyRnJvbVVybFNhZmVCYXNlNjQoY2hhcikge1xuICBzd2l0Y2ggKGNoYXIpIHtcbiAgICBjYXNlICctJzogcmV0dXJuICcrJ1xuICAgIGNhc2UgJ18nOiByZXR1cm4gJy8nXG4gIH1cbiAgcmV0dXJuICcnXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5hcnlTdHJpbmdUb0FycmF5QnVmZmVyKGJpbmFyeVN0cmluZykge1xuICB2YXIgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGJpbmFyeVN0cmluZy5sZW5ndGgpXG4gIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyKVxuICB2YXIgbGVuZ3RoID0gYmluYXJ5U3RyaW5nLmxlbmd0aFxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgdmlld1tpXSA9IGJpbmFyeVN0cmluZy5jaGFyQ29kZUF0KGkpXG4gIH1cbiAgcmV0dXJuIGJ1ZmZlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5pY29kZVN0cmluZ1RvQXJyYXlCdWZmZXIodW5pY29kZVN0cmluZykge1xuICB2YXIgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKHVuaWNvZGVTdHJpbmcubGVuZ3RoICogMilcbiAgdmFyIHZpZXcgPSBuZXcgVWludDE2QXJyYXkoYnVmZmVyKVxuICB2YXIgbGVuZ3RoID0gdW5pY29kZVN0cmluZy5sZW5ndGhcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIHZpZXdbaV0gPSB1bmljb2RlU3RyaW5nLmNoYXJDb2RlQXQoaSlcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIGJ1ZmZlclZpZXdUb1N0cmluZyh2aWV3LCBjaHVua1NpemUgPSAweDEwMDApIHtcbiAgbGV0IGxlbmd0aCA9IHZpZXcubGVuZ3RoXG4gIGxldCByZXN1bHQgPSAnJ1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSBjaHVua1NpemUpIHtcbiAgICByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCB2aWV3LnN1YmFycmF5KGksIGkgKyBjaHVua1NpemUpKVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5QnVmZmVyVG9CaW5hcnlTdHJpbmcoYnVmZmVyKSB7XG4gIGxldCB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyLmJ1ZmZlciB8fCBidWZmZXIsIGJ1ZmZlci5ieXRlT2Zmc2V0LCBidWZmZXIuYnl0ZUxlbmd0aClcbiAgcmV0dXJuIGJ1ZmZlclZpZXdUb1N0cmluZyh2aWV3KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlCdWZmZXJUb1VuaWNvZGVTdHJpbmcoYnVmZmVyKSB7XG4gIGxldCB2aWV3ID0gbmV3IFVpbnQxNkFycmF5KGJ1ZmZlci5idWZmZXIgfHwgYnVmZmVyLCBidWZmZXIuYnl0ZU9mZnNldCwgYnVmZmVyLmJ5dGVMZW5ndGggPj4gMSlcbiAgcmV0dXJuIGJ1ZmZlclZpZXdUb1N0cmluZyh2aWV3KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VEYXRhVXJpKGRhdGFVcmkpIHtcbiAgdmFyIHNwbGl0ID0gZGF0YVVyaS5zcGxpdCgvOnw7fCwvZylcbiAgaWYgKHNwbGl0WzBdICE9PSAnZGF0YScpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZGF0YSB1cmk6ICcgKyBkYXRhVXJpLnNsaWNlKDAsIDEwMCkpXG4gIH1cbiAgaWYgKHNwbGl0WzJdICE9PSAnYmFzZTY0Jykge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBkYXRhIHVyaTogJyArIGRhdGFVcmkuc2xpY2UoMCwgMTAwKSlcbiAgfVxuICByZXR1cm4ge1xuICAgIG1pbWVUeXBlOiBzcGxpdFsxXSxcbiAgICBiaW5hcnlTdHJpbmc6IGJhc2U2NFRvVXRmOChzcGxpdFszXSksXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURhdGFVcmkoe21pbWVUeXBlLCBiaW5hcnlTdHJpbmd9KSB7XG4gIHJldHVybiBgZGF0YToke21pbWVUeXBlfTtiYXNlNjQsJHt1dGY4VG9CYXNlNjQoYmluYXJ5U3RyaW5nKX1gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBibG9iVG9BcnJheUJ1ZmZlcihibG9iKSB7XG4gIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJlc29sdmUocmVhZGVyLnJlc3VsdClcbiAgICB9XG4gICAgcmVhZGVyLm9uZXJyb3IgPSByZWplY3RcbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1ZmZlclRvRmlsZShidWZmZXIsIGZpbGVOYW1lLCBtaW1lVHlwZSkge1xuICB2YXIgZmlsZSA9IG5ldyBCbG9iKFtidWZmZXJdLCB7XG4gICAgdHlwZTogbWltZVR5cGUsXG4gIH0pXG4gIGZpbGUubmFtZSA9IGZpbGVOYW1lXG4gIGZpbGUubGFzdE1vZGlmaWVkRGF0ZSA9IG5ldyBEYXRlKClcbiAgcmV0dXJuIGZpbGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1ZmZlclRvSGV4KGJ1ZmZlcikge1xuICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlcilcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbCh2aWV3LCBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiAoJzAwJyArIHgudG9TdHJpbmcoMTYpKS5zbGljZSgtMilcbiAgfSkuam9pbignJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhleFRvQnVmZmVyKGhleCkge1xuICBpZiAoaGV4Lmxlbmd0aCAlIDIgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdoZXhUb0J1ZmZlcjogaGV4IGxlbmd0aCBtdXN0IGJlIGV2ZW4nKVxuICB9XG4gIHZhciBidWZmZXIgPSBuZXcgVWludDhBcnJheShoZXgubGVuZ3RoIC8gMilcbiAgZm9yICh2YXIgaSA9IDA7IGhleC5zdWJzdHIoaSwgMik7IGkgKz0gMikge1xuICAgIGJ1ZmZlcltpIC8gMl0gPSBwYXJzZUludChoZXguc3Vic3RyKGksIDIpLCAxNilcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25jYXRlbmF0ZUFycmF5QnVmZmVycyhidWZmZXJzKSB7XG4gIGxldCB0b3RhbExlbmd0aCA9IDBcbiAgZm9yIChsZXQgaW5kZXggaW4gYnVmZmVycykge1xuICAgIHRvdGFsTGVuZ3RoICs9IGJ1ZmZlcnNbaW5kZXhdLmJ5dGVMZW5ndGhcbiAgfVxuXG4gIGxldCByZXN1bHQgPSBuZXcgVWludDhBcnJheSh0b3RhbExlbmd0aClcbiAgbGV0IG9mZnNldCA9IDBcbiAgZm9yIChsZXQgaW5kZXggaW4gYnVmZmVycykge1xuICAgIGxldCB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyc1tpbmRleF0pXG4gICAgcmVzdWx0LnNldCh2aWV3LCBvZmZzZXQpXG4gICAgb2Zmc2V0ICs9IHZpZXcuYnl0ZUxlbmd0aFxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9WZW5kb3Iob2JqLCBuYW1lKSB7XG4gIHZhciB1cHBlciA9IG5hbWVbMF0udG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSlcbiAgdmFyIHVucHJlZml4ZWQgPSBvYmpbbmFtZV0gfHwgb2JqWydtb3onICsgdXBwZXJdIHx8IG9ialsnd2Via2l0JyArIHVwcGVyXSB8fCBvYmpbJ21zJyArIHVwcGVyXVxuICBpZiAoIXVucHJlZml4ZWQpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIGlmICh0eXBlb2YodW5wcmVmaXhlZCkgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdW5wcmVmaXhlZC5iaW5kKG9iailcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdW5wcmVmaXhlZFxuICB9XG59XG5cbnZhciBnbG9iYWxPYmplY3RcbmlmIChwcm9jZXNzLmVudi5OT0RFSlMpIHtcbiAgLyogZ2xvYmFsIGdsb2JhbCAqL1xuICBnbG9iYWxPYmplY3QgPSBnbG9iYWxcbn0gZWxzZSB7XG4gIGdsb2JhbE9iamVjdCA9IHdpbmRvd1xufVxuXG5pZiAoZ2xvYmFsT2JqZWN0KSB7XG4gIGdsb2JhbE9iamVjdC5fX0MzX1NES19JTlNUQU5DRVNfXyA9IHtcbiAgICBsaXN0ZW5lcnM6IG5ldyBTZXQoKSxcbiAgICBhZGRMaXN0ZW5lcihsaXN0ZW5lcikge1xuICAgICAgdGhpcy5saXN0ZW5lcnMuYWRkKGxpc3RlbmVyKVxuICAgIH0sXG4gICAgcmVtb3ZlTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgICAgIHRoaXMubGlzdGVuZXJzLmRlbGV0ZShsaXN0ZW5lcilcbiAgICB9LFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlckluc3RhbmNlKGNvbGxlY3Rpb25OYW1lLCBpbnN0YW5jZSkge1xuICBpZiAoZ2xvYmFsT2JqZWN0KSB7XG4gICAgbGV0IGNvbGxlY3Rpb24gPSBnbG9iYWxPYmplY3QuX19DM19TREtfSU5TVEFOQ0VTX19bY29sbGVjdGlvbk5hbWVdXG4gICAgaWYgKCFjb2xsZWN0aW9uKSB7XG4gICAgICBnbG9iYWxPYmplY3QuX19DM19TREtfSU5TVEFOQ0VTX19bY29sbGVjdGlvbk5hbWVdID0gW2luc3RhbmNlXVxuICAgIH0gZWxzZSBpZiAoY29sbGVjdGlvbi5pbmRleE9mKGluc3RhbmNlKSA9PT0gLTEpIHtcbiAgICAgIGNvbGxlY3Rpb24ucHVzaChpbnN0YW5jZSlcbiAgICB9XG4gICAgZ2xvYmFsT2JqZWN0Ll9fQzNfU0RLX0lOU1RBTkNFU19fLmxpc3RlbmVycy5mb3JFYWNoKGxpc3RlbmVyID0+IHtcbiAgICAgIGxpc3RlbmVyKCdhZGRlZCcsIGNvbGxlY3Rpb25OYW1lLCBpbnN0YW5jZSlcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnJlZ2lzdGVySW5zdGFuY2UoY29sbGVjdGlvbk5hbWUsIGluc3RhbmNlKSB7XG4gIGlmIChnbG9iYWxPYmplY3QpIHtcbiAgICBsZXQgY29sbGVjdGlvbiA9IGdsb2JhbE9iamVjdC5fX0MzX1NES19JTlNUQU5DRVNfX1tjb2xsZWN0aW9uTmFtZV1cbiAgICBsZXQgaW5kZXggPSBjb2xsZWN0aW9uLmluZGV4T2YoaW5zdGFuY2UpXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgY29sbGVjdGlvbi5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuICAgIGdsb2JhbE9iamVjdC5fX0MzX1NES19JTlNUQU5DRVNfXy5saXN0ZW5lcnMuZm9yRWFjaChsaXN0ZW5lciA9PiB7XG4gICAgICBsaXN0ZW5lcigncmVtb3ZlZCcsIGNvbGxlY3Rpb25OYW1lLCBpbnN0YW5jZSlcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcml2KGNvbnN0cnVjdG9yKSB7XG4gIHZhciBhcmdzID0gW3ByaXZdXG4gIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gIGZvciAodmFyIGkgPSAxOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldXG4gIH1cbiAgdmFyIGluc3RhbmNlID0gT2JqZWN0LmNyZWF0ZShjb25zdHJ1Y3Rvci5wcm90b3R5cGUpXG4gIGNvbnN0cnVjdG9yLmFwcGx5KGluc3RhbmNlLCBhcmdzKVxuICByZXR1cm4gaW5zdGFuY2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydFByaXYobmFtZSwgcHJvdmlkZWRQcml2KSB7XG4gIGlmIChwcml2ICE9PSBwcm92aWRlZFByaXYpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKG5hbWUgKyAnOiBjYW5ub3QgYmUgdXNlZCBhcyBhIGNvbnN0cnVjdG9yJylcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgaXNGaXJlZm94ID0gL2ZpcmVmb3gvaS50ZXN0KHR5cGVvZihuYXZpZ2F0b3IpICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50KVxuY29uc3QgaXNHb29nbGUgPSAvZ29vZ2xlIGluYy9pLnRlc3QodHlwZW9mKG5hdmlnYXRvcikgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci52ZW5kb3IpXG5leHBvcnQgY29uc3QgaXNDaHJvbWUgPSBpc0dvb2dsZSAmJiAvY2hyb21lL2kudGVzdCh0eXBlb2YobmF2aWdhdG9yKSAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudClcbmV4cG9ydCBjb25zdCBicm93c2VyID0gaXNDaHJvbWUgPyAnY2hyb21lJyA6IChpc0ZpcmVmb3ggPyAnZmlyZWZveCcgOiAnb3RoZXInKVxuLy8gSW50ZXJuZXQgRXhwbG9yZXIgNi0xMVxuZXhwb3J0IGNvbnN0IGlzSUUgPSAvKiBAY2Nfb24hQCovZmFsc2UgfHwgISFnbG9iYWxPYmplY3QuZG9jdW1lbnQgJiYgISFnbG9iYWxPYmplY3QuZG9jdW1lbnQuZG9jdW1lbnRNb2RlXG5cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZihvYmopID09PSAnb2JqZWN0JyAmJiBvYmogIT09IG51bGwgJiYgIUFycmF5LmlzQXJyYXkob2JqKSAmJiAhKG9iaiBpbnN0YW5jZW9mIFJlZ0V4cClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vdEluTm9kZSh0aGluZykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERUpTKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHt0aGluZ30gaXMgbm90IGF2YWlsYWJsZSBpbiBOb2RlSlNgKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXliZUNvbnZlcnRTdHJpbmdUb051bWJlcihzdHJpbmcpIHtcbiAgaWYgKCFpc05hTihzdHJpbmcpKSB7XG4gICAgaWYgKE51bWJlcihzdHJpbmcpICUgMSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KHN0cmluZylcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoc3RyaW5nKVxuICB9XG4gIHJldHVybiBzdHJpbmdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0cmluZ0J5dGVMZW5ndGgoc3RyaW5nKSB7XG4gIHZhciBieXRlcyA9IHN0cmluZy5sZW5ndGhcbiAgZm9yICh2YXIgaSA9IHN0cmluZy5sZW5ndGggLSAxOyBpID49IDA7IGkgLT0gMSkge1xuICAgIHZhciBjaGFyQ29kZSA9IHN0cmluZy5jaGFyQ29kZUF0KGkpXG4gICAgaWYgKGNoYXJDb2RlID4gMHg3ZiAmJiBjaGFyQ29kZSA8PSAweDdmZikge1xuICAgICAgYnl0ZXMgKz0gMVxuICAgIH0gZWxzZSBpZiAoY2hhckNvZGUgPiAweDdmZiAmJiBjaGFyQ29kZSA8PSAweGZmZmYpIHtcbiAgICAgIGJ5dGVzICs9IDJcbiAgICB9IGlmIChjaGFyQ29kZSA+PSAweERDMDAgJiYgY2hhckNvZGUgPD0gMHhERkZGKSB7XG4gICAgICAgICAgICAvLyB0cmFpbGluZyBzdXJyb2dhdGVcbiAgICAgIGkgLT0gMVxuICAgIH1cbiAgfVxuICByZXR1cm4gYnl0ZXNcbn1cblxuLyoqXG4gKiBBIHJlYWQtb25seSB2ZXJzaW9uIG9mIHRoZSBidWlsdC1pbiBNYXAgY2xhc3MuXG4gKlxuICogQGNsYXNzIFJlYWRPbmx5TWFwXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkT25seU1hcCBleHRlbmRzIE1hcCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKClcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVhZE9ubHlNYXAgZG9lcyBub3Qgc3VwcG9ydCBjb25zdHJ1Y3RvciBhcmd1bWVudHMnKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIGVudHJpZXMgaW4gdGhlIG1hcC5cbiAgICpcbiAgICogQG1lbWJlciB7bnVtYmVyfSBSZWFkT25seU1hcCNzaXplXG4gICAqL1xuXG4gIC8qKlxuICAgKiBQcm92aWRlcyBhIHdheSB0byBpdGVyYXRlIHRocm91Z2ggYWxsIHRoZSBlbnRyaWVzIGluIHRoaXMgbWFwLiBFYWNoIGVudHJ5IGlzIHJlcHJlc2VudGVkXG4gICAqIGJ5IGFuIGFycmF5IHdpdGggdHdvIGVsZW1lbnRzLCB3ZXJlIHRoZSBmaXJzdCBlbGVtZW50IGlzIHRoZSBrZXkgYW5kIHRoZSBzZWNvbmQgaXMgdGhlIHZhbHVlLlxuICAgKlxuICAgKiBAZnVuY3Rpb24gUmVhZE9ubHlNYXAjZW50cmllc1xuICAgKiBAcmV0dXJucyB7SXRlcmF0b3I8QXJyYXk8Kj4+fSAtIEFuIGl0ZXJhdG9yIG9mIGFsbCBlbnRyaWVzIGluIHRoaXMgbWFwLlxuICAgKi9cblxuICAvKipcbiAgICogUHJvdml0ZWQgYSB3YXkgdG8gaXRlcmF0ZSB0aG91Z2ggYWxsIHRoZSBrZXlzIGluIHRoaXMgbWFwLlxuICAgKlxuICAgKiBAZnVuY3Rpb24gUmVhZE9ubHlNYXAja2V5c1xuICAgKiBAcmV0dXJucyB7SXRlcmF0b3I8Kj59IC0gQW4gaXRlcmF0b3Igb2YgYWxsIGtleXMgaW4gdGhpcyBtYXAuXG4gICAqL1xuXG4gIC8qKlxuICAgKiBQcm92aXRlZCBhIHdheSB0byBpdGVyYXRlIHRob3VnaCBhbGwgdGhlIHZhbHVlcyBpbiB0aGlzIG1hcC5cbiAgICpcbiAgICogQGZ1bmN0aW9uIFJlYWRPbmx5TWFwI3ZhbHVlc1xuICAgKiBAcmV0dXJucyB7SXRlcmF0b3I8Kj59IC0gQW4gaXRlcmF0b3Igb2YgYWxsIHZhbHVlcyBpbiB0aGlzIG1hcC5cbiAgICovXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIGZvciB0aGUgZ2l2ZW4ga2V5LlxuICAgKlxuICAgKiBAZnVuY3Rpb24gUmVhZE9ubHlNYXAjZ2V0XG4gICAqIEBwYXJhbSB7Kn0ga2V5IC0gVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmV0cmVpdmUuXG4gICAqIEByZXR1cm5zIHsqfSBUaGUgdmFsdWUsIGlmIGl0IGV4aXN0cywgYHVuZGVmaW5lZGAgb3RoZXJ3aXNlXG4gICAqL1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIG1hcCBoYXMgYW4gZW50cnkgZm9yIHRoZSBnaXZlbiBrZXkuXG4gICAqXG4gICAqIEBmdW5jdGlvbiBSZWFkT25seU1hcCNoYXNcbiAgICogQHBhcmFtIHsqfSBrZXkgLSBUaGUga2V5IHRvIGxvb2sgZm9yLlxuICAgKi9cblxuICAvKipcbiAgICogU3luY2hyb25vdXNseSBjYWxscyBhbiBpbnRlcmF0b3IgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbnRyeSBpbiB0aGUgbWFwLlxuICAgKlxuICAgKiBFcnJvcnMgdGhyb3duIGluc2lkZSB0aGUgaXRlcmF0b3IgZnVuY3Rpb24gd2lsbCBjYW5jZWwgdGhlIGl0ZXJhdGlvblxuICAgKlxuICAgKiBAZnVuY3Rpb24gUmVhZE9ubHlNYXAjZm9yRWFjaFxuICAgKiBAcGFyYW0ge1JlYWRPbmx5TWFwRm9yRWFjaENhbGxiYWNrfSBmdW5jIC0gVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uLlxuICAgKiBAcGFyYW0geyp9IFt0aGlzQXJnXSAtIFRoZSB2YWx1ZSB0byB1c2UgYXMgYHRoaXNgIGluc2lkZSB0aGUgaXRlcmF0b3IgZnVuY3Rpb24uXG4gICAqL1xuXG4gIC8qKlxuICAgKiBUaGUgaXRlcmF0b3IgZnVuY3Rpb24gcGFzc2VkIHRvIHtAbGluayBSZWFkT25seU1hcCNmb3JFYWNofS5cbiAgICpcbiAgICogQGNhbGxiYWNrIFJlYWRPbmx5TWFwRm9yRWFjaENhbGxiYWNrXG4gICAqIEBwYXJhbSB7Kn0ga2V5IC0gVGhlIGtleSBvZiB0aGUgY3VycmVudCBlbnRyeS5cbiAgICogQHBhcmFtIHsqfSB2YWx1ZSAtIFRoZSB2YWx1ZSBvZiB0aGUgY3VycmVudCBlbnRyeS5cbiAgICogQHBhcmFtIHtSZWFkT25seU1hcH0gbWFwIC0gVGhlIG1hcCBpdHNlbGYuXG4gICAqL1xuXG4gIHNldCgpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdNYXAgaXMgcmVhZC1vbmx5JylcbiAgfVxuXG4gIGRlbGV0ZSgpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdNYXAgaXMgcmVhZC1vbmx5JylcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ01hcCBpcyByZWFkLW9ubHknKVxuICB9XG5cbiAgLyogcHJpdmF0ZSAqL1xuXG4gIF9zZXQoa2V5LCB2YWx1ZSkge1xuICAgIHJldHVybiBzdXBlci5zZXQoa2V5LCB2YWx1ZSlcbiAgfVxuXG4gIF9kZWxldGUoa2V5KSB7XG4gICAgcmV0dXJuIHN1cGVyLmRlbGV0ZShrZXkpXG4gIH1cblxuICBfY2xlYXIoKSB7XG4gICAgcmV0dXJuIHN1cGVyLmNsZWFyKClcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVhZE9ubHlTZXQgZXh0ZW5kcyBTZXQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1JlYWRPbmx5U2V0IGRvZXMgbm90IHN1cHBvcnQgY29uc3RydWN0b3IgYXJndW1lbnRzJylcbiAgICB9XG4gIH1cblxuICBhZGQoKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignU2V0IGlzIHJlYWQtb25seScpXG4gIH1cblxuICBkZWxldGUoKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignU2V0IGlzIHJlYWQtb25seScpXG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdTZXQgaXMgcmVhZC1vbmx5JylcbiAgfVxuXG4gIF9hZGQodmFsdWUpIHtcbiAgICByZXR1cm4gc3VwZXIuYWRkKHZhbHVlKVxuICB9XG5cbiAgX2RlbGV0ZSh2YWx1ZSkge1xuICAgIHJldHVybiBzdXBlci5kZWxldGUodmFsdWUpXG4gIH1cblxuICBfY2xlYXIoKSB7XG4gICAgcmV0dXJuIHN1cGVyLmNsZWFyKClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGltZWRCdWZmZXIodGltZSwgY2FsbGJhY2spIHtcbiAgbGV0IGFyZ3MgPSBbXVxuICBsZXQgdGltZW91dCA9IDBcbiAgcmV0dXJuIGZ1bmN0aW9uIChhcmcpIHtcbiAgICBhcmdzLnB1c2goYXJnKVxuICAgIGlmICghdGltZW91dCkge1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQob25UaW1lb3V0LCB0aW1lKVxuICAgIH1cbiAgICBmdW5jdGlvbiBvblRpbWVvdXQoKSB7XG4gICAgICB0aW1lb3V0ID0gMFxuICAgICAgdHJ5IHtcbiAgICAgICAgY2FsbGJhY2soYXJncylcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYGVycm9yIGluIHRpbWVkIGJ1ZmZlciBjYWxsYmFjazogJHtlcnJvcn1gKVxuICAgICAgfVxuICAgICAgYXJncyA9IFtdXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlcnJvckZvcndhcmRlcihoYW5kbGVyLCBsb2NhdGlvbikge1xuICByZXR1cm4gZXJyb3IgPT4ge1xuICAgIGlmICghbG9jYXRpb24pIHtcbiAgICAgIGhhbmRsZXIoZXJyb3IpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBuZXdFcnJvciA9IG5ldyBFcnJvcihgRXJyb3IgaW4gJHtsb2NhdGlvbn06ICR7ZXJyb3IubWVzc2FnZX1gKVxuICAgICAgbmV3RXJyb3IucmVhc29uID0gZXJyb3JcbiAgICAgIGhhbmRsZXIobmV3RXJyb3IpXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogVHlwZXMgdGhhdCBjYW4gYmUgc2VyaWFsaXplZCBhcyBKU09OLlxuICpcbiAqIFRoaXMgaXMgaWRlbnRpY2FsIHRvIHRoZSBwYXJhbWV0ZXJzIHRoYXQgY2FuIGJlIHBhc3NlZCB0byB0aGUgYnVpbHQtaW4gYEpTT04uc3RyaW5naWZ5YC5cbiAqIENpcmN1bGFyIHJlZmVyZW5jZXMgYXJlIG5vdCBhbGxvd2VkLCBhbmQgYHRvSlNPTmAgbWV0aG9kcyB3aWxsIGJlIHVzZWQuXG4gKlxuICogQHR5cGVkZWYgSnNvblR5cGVzIHtzdHJpbmd8bnVtYmVyfGJvb2xlYW58bnVsbHxBcnJheTxKc29uVHlwZXM+fE9iamVjdDxKc29uVHlwZXM+fVxuICovXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGliL2NvbW1vbi91dGlscy5qcyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIgaW5kZXggPSB0aGlzLl9pO1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBPLmxlbmd0aCkgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4geyB2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlIH07XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2VcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCJ2YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpO1xudmFyIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBnZXRJdGVyRm4gPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIEJSRUFLID0ge307XG52YXIgUkVUVVJOID0ge307XG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCwgSVRFUkFUT1IpIHtcbiAgdmFyIGl0ZXJGbiA9IElURVJBVE9SID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXRlcmFibGU7IH0gOiBnZXRJdGVyRm4oaXRlcmFibGUpO1xuICB2YXIgZiA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKTtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3IsIHJlc3VsdDtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZiAoaXNBcnJheUl0ZXIoaXRlckZuKSkgZm9yIChsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgIHJlc3VsdCA9IGVudHJpZXMgPyBmKGFuT2JqZWN0KHN0ZXAgPSBpdGVyYWJsZVtpbmRleF0pWzBdLCBzdGVwWzFdKSA6IGYoaXRlcmFibGVbaW5kZXhdKTtcbiAgICBpZiAocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTikgcmV0dXJuIHJlc3VsdDtcbiAgfSBlbHNlIGZvciAoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTspIHtcbiAgICByZXN1bHQgPSBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgICBpZiAocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTikgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcbmV4cG9ydHMuQlJFQUsgPSBCUkVBSztcbmV4cG9ydHMuUkVUVVJOID0gUkVUVVJOO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIHRhZywgc3RhdCkge1xuICBpZiAoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSkgZGVmKGl0LCBUQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vbWFwXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9tYXAuanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZnJvbSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2FycmF5L2Zyb21cIik7XG5cbnZhciBfZnJvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mcm9tKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKDAsIF9mcm9tMi5kZWZhdWx0KShhcnIpO1xuICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvdG9Db25zdW1hYmxlQXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBUT19TVFJJTkdfVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbnZhciBET01JdGVyYWJsZXMgPSAoJ0NTU1J1bGVMaXN0LENTU1N0eWxlRGVjbGFyYXRpb24sQ1NTVmFsdWVMaXN0LENsaWVudFJlY3RMaXN0LERPTVJlY3RMaXN0LERPTVN0cmluZ0xpc3QsJyArXG4gICdET01Ub2tlbkxpc3QsRGF0YVRyYW5zZmVySXRlbUxpc3QsRmlsZUxpc3QsSFRNTEFsbENvbGxlY3Rpb24sSFRNTENvbGxlY3Rpb24sSFRNTEZvcm1FbGVtZW50LEhUTUxTZWxlY3RFbGVtZW50LCcgK1xuICAnTWVkaWFMaXN0LE1pbWVUeXBlQXJyYXksTmFtZWROb2RlTWFwLE5vZGVMaXN0LFBhaW50UmVxdWVzdExpc3QsUGx1Z2luLFBsdWdpbkFycmF5LFNWR0xlbmd0aExpc3QsU1ZHTnVtYmVyTGlzdCwnICtcbiAgJ1NWR1BhdGhTZWdMaXN0LFNWR1BvaW50TGlzdCxTVkdTdHJpbmdMaXN0LFNWR1RyYW5zZm9ybUxpc3QsU291cmNlQnVmZmVyTGlzdCxTdHlsZVNoZWV0TGlzdCxUZXh0VHJhY2tDdWVMaXN0LCcgK1xuICAnVGV4dFRyYWNrTGlzdCxUb3VjaExpc3QnKS5zcGxpdCgnLCcpO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IERPTUl0ZXJhYmxlcy5sZW5ndGg7IGkrKykge1xuICB2YXIgTkFNRSA9IERPTUl0ZXJhYmxlc1tpXTtcbiAgdmFyIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV07XG4gIHZhciBwcm90byA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmIChwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10pIGhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICBJdGVyYXRvcnNbTkFNRV0gPSBJdGVyYXRvcnMuQXJyYXk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9zeW1ib2wvaXRlcmF0b3JcIik7XG5cbnZhciBfaXRlcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXRlcmF0b3IpO1xuXG52YXIgX3N5bWJvbCA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbFwiKTtcblxudmFyIF9zeW1ib2wyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3ltYm9sKTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBfaXRlcmF0b3IyLmRlZmF1bHQgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ICYmIG9iaiAhPT0gX3N5bWJvbDIuZGVmYXVsdC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mKF9pdGVyYXRvcjIuZGVmYXVsdCkgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy90eXBlb2YuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pc0l0ZXJhYmxlMiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2lzLWl0ZXJhYmxlXCIpO1xuXG52YXIgX2lzSXRlcmFibGUzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNJdGVyYWJsZTIpO1xuXG52YXIgX2dldEl0ZXJhdG9yMiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2dldC1pdGVyYXRvclwiKTtcblxudmFyIF9nZXRJdGVyYXRvcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRJdGVyYXRvcjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7XG4gICAgdmFyIF9hcnIgPSBbXTtcbiAgICB2YXIgX24gPSB0cnVlO1xuICAgIHZhciBfZCA9IGZhbHNlO1xuICAgIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaSA9ICgwLCBfZ2V0SXRlcmF0b3IzLmRlZmF1bHQpKGFyciksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2QgPSB0cnVlO1xuICAgICAgX2UgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBfYXJyO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0gZWxzZSBpZiAoKDAsIF9pc0l0ZXJhYmxlMy5kZWZhdWx0KShPYmplY3QoYXJyKSkpIHtcbiAgICAgIHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xuICAgIH1cbiAgfTtcbn0oKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDUiLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGRQcyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcbnZhciBFbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpO1xuICB2YXIgaSA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgdmFyIGx0ID0gJzwnO1xuICB2YXIgZ3QgPSAnPic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZSAoaS0tKSBkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHkoKTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwidmFyIGlkID0gMDtcbnZhciBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbGlicmFyeS5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3NldFwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvc2V0LmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwiLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcbi8vIEVTMyB3cm9uZyBoZXJlXG52YXIgQVJHID0gY29mKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVEFHKSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jbGFzc29mLmpzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCIvLyBtb3N0IE9iamVjdCBtZXRob2RzIGJ5IEVTNiBzaG91bGQgYWNjZXB0IHByaW1pdGl2ZXNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVksIGV4ZWMpIHtcbiAgdmFyIGZuID0gKGNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldO1xuICB2YXIgZXhwID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24gKCkgeyBmbigxKTsgfSksICdPYmplY3QnLCBleHApO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXNhcC5qc1xuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9qc29uL3N0cmluZ2lmeVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvanNvbi9zdHJpbmdpZnkuanNcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgNCIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanNcbi8vIG1vZHVsZSBpZCA9IDQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciAkaXRlckNyZWF0ZSA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgQlVHR1kgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSk7IC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbnZhciBGRl9JVEVSQVRPUiA9ICdAQGl0ZXJhdG9yJztcbnZhciBLRVlTID0gJ2tleXMnO1xudmFyIFZBTFVFUyA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCkge1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbiAoa2luZCkge1xuICAgIGlmICghQlVHR1kgJiYga2luZCBpbiBwcm90bykgcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIHZhciBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVM7XG4gIHZhciBWQUxVRVNfQlVHID0gZmFsc2U7XG4gIHZhciBwcm90byA9IEJhc2UucHJvdG90eXBlO1xuICB2YXIgJG5hdGl2ZSA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXTtcbiAgdmFyICRkZWZhdWx0ID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVCk7XG4gIHZhciAkZW50cmllcyA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWQ7XG4gIHZhciAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZTtcbiAgdmFyIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYgKCRhbnlOYXRpdmUpIHtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSgpKSk7XG4gICAgaWYgKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlICYmIEl0ZXJhdG9yUHJvdG90eXBlLm5leHQpIHtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZiAoIUxJQlJBUlkgJiYgIWhhcyhJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IpKSBoaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYgKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUykge1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZiAoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpIHtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddID0gcmV0dXJuVGhpcztcbiAgaWYgKERFRkFVTFQpIHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6IElTX1NFVCA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmIChGT1JDRUQpIGZvciAoa2V5IGluIG1ldGhvZHMpIHtcbiAgICAgIGlmICghKGtleSBpbiBwcm90bykpIHJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwidmFyIE1FVEEgPSByZXF1aXJlKCcuL191aWQnKSgnbWV0YScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgc2V0RGVzYyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaWQgPSAwO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uIChpdCkge1xuICBzZXREZXNjKGl0LCBNRVRBLCB7IHZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSB9KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmICghaGFzKGl0LCBNRVRBKSkge1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYgKCFpc0V4dGVuc2libGUoaXQpKSByZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIG9iamVjdCBJRFxuICB9IHJldHVybiBpdFtNRVRBXS5pO1xufTtcbnZhciBnZXRXZWFrID0gZnVuY3Rpb24gKGl0LCBjcmVhdGUpIHtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiB0cnVlO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiBmYWxzZTtcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IHJldHVybiBpdFtNRVRBXS53O1xufTtcbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChGUkVFWkUgJiYgbWV0YS5ORUVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQSkpIHNldE1ldGEoaXQpO1xuICByZXR1cm4gaXQ7XG59O1xudmFyIG1ldGEgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgS0VZOiBNRVRBLFxuICBORUVEOiBmYWxzZSxcbiAgZmFzdEtleTogZmFzdEtleSxcbiAgZ2V0V2VhazogZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwidmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciBnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGdPUEQgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZ09QRChPLCBQKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXMoTywgUCkpIHJldHVybiBjcmVhdGVEZXNjKCFwSUUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BkLmpzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanNcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qc1xuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBTKSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciB3a3NFeHQgPSByZXF1aXJlKCcuL193a3MtZXh0Jyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICB2YXIgJFN5bWJvbCA9IGNvcmUuU3ltYm9sIHx8IChjb3JlLlN5bWJvbCA9IExJQlJBUlkgPyB7fSA6IGdsb2JhbC5TeW1ib2wgfHwge30pO1xuICBpZiAobmFtZS5jaGFyQXQoMCkgIT0gJ18nICYmICEobmFtZSBpbiAkU3ltYm9sKSkgZGVmaW5lUHJvcGVydHkoJFN5bWJvbCwgbmFtZSwgeyB2YWx1ZTogd2tzRXh0LmYobmFtZSkgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwiZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fd2tzJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1leHQuanNcbi8vIG1vZHVsZSBpZCA9IDU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgQ29uc3RydWN0b3IsIG5hbWUsIGZvcmJpZGRlbkZpZWxkKSB7XG4gIGlmICghKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpIHx8IChmb3JiaWRkZW5GaWVsZCAhPT0gdW5kZWZpbmVkICYmIGZvcmJpZGRlbkZpZWxkIGluIGl0KSkge1xuICAgIHRocm93IFR5cGVFcnJvcihuYW1lICsgJzogaW5jb3JyZWN0IGludm9jYXRpb24hJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanNcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsInZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzcmMsIHNhZmUpIHtcbiAgZm9yICh2YXIga2V5IGluIHNyYykge1xuICAgIGlmIChzYWZlICYmIHRhcmdldFtrZXldKSB0YXJnZXRba2V5XSA9IHNyY1trZXldO1xuICAgIGVsc2UgaGlkZSh0YXJnZXQsIGtleSwgc3JjW2tleV0pO1xuICB9IHJldHVybiB0YXJnZXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanNcbi8vIG1vZHVsZSBpZCA9IDYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBUWVBFKSB7XG4gIGlmICghaXNPYmplY3QoaXQpIHx8IGl0Ll90ICE9PSBUWVBFKSB0aHJvdyBUeXBlRXJyb3IoJ0luY29tcGF0aWJsZSByZWNlaXZlciwgJyArIFRZUEUgKyAnIHJlcXVpcmVkIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL192YWxpZGF0ZS1jb2xsZWN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXNcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgIT0gdW5kZWZpbmVkKSByZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qc1xuLy8gbW9kdWxlIGlkID0gNjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2dldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2dldC1wcm90b3R5cGUtb2ZcIik7XG5cbnZhciBfZ2V0UHJvdG90eXBlT2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0UHJvdG90eXBlT2YpO1xuXG52YXIgX2dldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JcIik7XG5cbnZhciBfZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldE93blByb3BlcnR5RGVzY3JpcHRvcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIGdldChvYmplY3QsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG4gIHZhciBkZXNjID0gKDAsIF9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IyLmRlZmF1bHQpKG9iamVjdCwgcHJvcGVydHkpO1xuXG4gIGlmIChkZXNjID09PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgcGFyZW50ID0gKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkob2JqZWN0KTtcblxuICAgIGlmIChwYXJlbnQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBnZXQocGFyZW50LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChcInZhbHVlXCIgaW4gZGVzYykge1xuICAgIHJldHVybiBkZXNjLnZhbHVlO1xuICB9IGVsc2Uge1xuICAgIHZhciBnZXR0ZXIgPSBkZXNjLmdldDtcblxuICAgIGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpO1xuICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZ2V0LmpzXG4vLyBtb2R1bGUgaWQgPSA2N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gNjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIid1c2Ugc3RyaWN0Jztcbi8vIDI1LjQuMS41IE5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xuXG5mdW5jdGlvbiBQcm9taXNlQ2FwYWJpbGl0eShDKSB7XG4gIHZhciByZXNvbHZlLCByZWplY3Q7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBDKGZ1bmN0aW9uICgkJHJlc29sdmUsICQkcmVqZWN0KSB7XG4gICAgaWYgKHJlc29sdmUgIT09IHVuZGVmaW5lZCB8fCByZWplY3QgIT09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKCdCYWQgUHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xuICAgIHJlc29sdmUgPSAkJHJlc29sdmU7XG4gICAgcmVqZWN0ID0gJCRyZWplY3Q7XG4gIH0pO1xuICB0aGlzLnJlc29sdmUgPSBhRnVuY3Rpb24ocmVzb2x2ZSk7XG4gIHRoaXMucmVqZWN0ID0gYUZ1bmN0aW9uKHJlamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiAoQykge1xuICByZXR1cm4gbmV3IFByb21pc2VDYXBhYmlsaXR5KEMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbmV3LXByb21pc2UtY2FwYWJpbGl0eS5qc1xuLy8gbW9kdWxlIGlkID0gNjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQiLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qc1xuLy8gbW9kdWxlIGlkID0gNzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwiLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b1tJVEVSQVRPUl0gPT09IGl0KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDczXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCIvLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IDc0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoIChlKSB7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZiAocmV0ICE9PSB1bmRlZmluZWQpIGFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jYWxsLmpzXG4vLyBtb2R1bGUgaWQgPSA3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZG9uZSwgdmFsdWUpIHtcbiAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmUgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qc1xuLy8gbW9kdWxlIGlkID0gNzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIi8vIDE5LjEuMi43IC8gMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzXG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gKE8pIHtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZiAoaGFzKE8sIElFX1BST1RPKSkgcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZiAodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanNcbi8vIG1vZHVsZSBpZCA9IDc4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanNcbi8vIG1vZHVsZSBpZCA9IDc5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gODFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIid1c2Ugc3RyaWN0JztcbnZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpO1xudmFyIHJlZGVmaW5lQWxsID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgYW5JbnN0YW5jZSA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJyk7XG52YXIgZm9yT2YgPSByZXF1aXJlKCcuL19mb3Itb2YnKTtcbnZhciAkaXRlckRlZmluZSA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJyk7XG52YXIgc3RlcCA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpO1xudmFyIHNldFNwZWNpZXMgPSByZXF1aXJlKCcuL19zZXQtc3BlY2llcycpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcbnZhciBmYXN0S2V5ID0gcmVxdWlyZSgnLi9fbWV0YScpLmZhc3RLZXk7XG52YXIgdmFsaWRhdGUgPSByZXF1aXJlKCcuL192YWxpZGF0ZS1jb2xsZWN0aW9uJyk7XG52YXIgU0laRSA9IERFU0NSSVBUT1JTID8gJ19zJyA6ICdzaXplJztcblxudmFyIGdldEVudHJ5ID0gZnVuY3Rpb24gKHRoYXQsIGtleSkge1xuICAvLyBmYXN0IGNhc2VcbiAgdmFyIGluZGV4ID0gZmFzdEtleShrZXkpO1xuICB2YXIgZW50cnk7XG4gIGlmIChpbmRleCAhPT0gJ0YnKSByZXR1cm4gdGhhdC5faVtpbmRleF07XG4gIC8vIGZyb3plbiBvYmplY3QgY2FzZVxuICBmb3IgKGVudHJ5ID0gdGhhdC5fZjsgZW50cnk7IGVudHJ5ID0gZW50cnkubikge1xuICAgIGlmIChlbnRyeS5rID09IGtleSkgcmV0dXJuIGVudHJ5O1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q29uc3RydWN0b3I6IGZ1bmN0aW9uICh3cmFwcGVyLCBOQU1FLCBJU19NQVAsIEFEREVSKSB7XG4gICAgdmFyIEMgPSB3cmFwcGVyKGZ1bmN0aW9uICh0aGF0LCBpdGVyYWJsZSkge1xuICAgICAgYW5JbnN0YW5jZSh0aGF0LCBDLCBOQU1FLCAnX2knKTtcbiAgICAgIHRoYXQuX3QgPSBOQU1FOyAgICAgICAgIC8vIGNvbGxlY3Rpb24gdHlwZVxuICAgICAgdGhhdC5faSA9IGNyZWF0ZShudWxsKTsgLy8gaW5kZXhcbiAgICAgIHRoYXQuX2YgPSB1bmRlZmluZWQ7ICAgIC8vIGZpcnN0IGVudHJ5XG4gICAgICB0aGF0Ll9sID0gdW5kZWZpbmVkOyAgICAvLyBsYXN0IGVudHJ5XG4gICAgICB0aGF0W1NJWkVdID0gMDsgICAgICAgICAvLyBzaXplXG4gICAgICBpZiAoaXRlcmFibGUgIT0gdW5kZWZpbmVkKSBmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XG4gICAgfSk7XG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIHtcbiAgICAgIC8vIDIzLjEuMy4xIE1hcC5wcm90b3R5cGUuY2xlYXIoKVxuICAgICAgLy8gMjMuMi4zLjIgU2V0LnByb3RvdHlwZS5jbGVhcigpXG4gICAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICAgIGZvciAodmFyIHRoYXQgPSB2YWxpZGF0ZSh0aGlzLCBOQU1FKSwgZGF0YSA9IHRoYXQuX2ksIGVudHJ5ID0gdGhhdC5fZjsgZW50cnk7IGVudHJ5ID0gZW50cnkubikge1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmIChlbnRyeS5wKSBlbnRyeS5wID0gZW50cnkucC5uID0gdW5kZWZpbmVkO1xuICAgICAgICAgIGRlbGV0ZSBkYXRhW2VudHJ5LmldO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuX2YgPSB0aGF0Ll9sID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGF0W1NJWkVdID0gMDtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4xLjMuMyBNYXAucHJvdG90eXBlLmRlbGV0ZShrZXkpXG4gICAgICAvLyAyMy4yLjMuNCBTZXQucHJvdG90eXBlLmRlbGV0ZSh2YWx1ZSlcbiAgICAgICdkZWxldGUnOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciB0aGF0ID0gdmFsaWRhdGUodGhpcywgTkFNRSk7XG4gICAgICAgIHZhciBlbnRyeSA9IGdldEVudHJ5KHRoYXQsIGtleSk7XG4gICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgIHZhciBuZXh0ID0gZW50cnkubjtcbiAgICAgICAgICB2YXIgcHJldiA9IGVudHJ5LnA7XG4gICAgICAgICAgZGVsZXRlIHRoYXQuX2lbZW50cnkuaV07XG4gICAgICAgICAgZW50cnkuciA9IHRydWU7XG4gICAgICAgICAgaWYgKHByZXYpIHByZXYubiA9IG5leHQ7XG4gICAgICAgICAgaWYgKG5leHQpIG5leHQucCA9IHByZXY7XG4gICAgICAgICAgaWYgKHRoYXQuX2YgPT0gZW50cnkpIHRoYXQuX2YgPSBuZXh0O1xuICAgICAgICAgIGlmICh0aGF0Ll9sID09IGVudHJ5KSB0aGF0Ll9sID0gcHJldjtcbiAgICAgICAgICB0aGF0W1NJWkVdLS07XG4gICAgICAgIH0gcmV0dXJuICEhZW50cnk7XG4gICAgICB9LFxuICAgICAgLy8gMjMuMi4zLjYgU2V0LnByb3RvdHlwZS5mb3JFYWNoKGNhbGxiYWNrZm4sIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gICAgICAvLyAyMy4xLjMuNSBNYXAucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgICAgIGZvckVhY2g6IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2tmbiAvKiAsIHRoYXQgPSB1bmRlZmluZWQgKi8pIHtcbiAgICAgICAgdmFsaWRhdGUodGhpcywgTkFNRSk7XG4gICAgICAgIHZhciBmID0gY3R4KGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkLCAzKTtcbiAgICAgICAgdmFyIGVudHJ5O1xuICAgICAgICB3aGlsZSAoZW50cnkgPSBlbnRyeSA/IGVudHJ5Lm4gOiB0aGlzLl9mKSB7XG4gICAgICAgICAgZihlbnRyeS52LCBlbnRyeS5rLCB0aGlzKTtcbiAgICAgICAgICAvLyByZXZlcnQgdG8gdGhlIGxhc3QgZXhpc3RpbmcgZW50cnlcbiAgICAgICAgICB3aGlsZSAoZW50cnkgJiYgZW50cnkucikgZW50cnkgPSBlbnRyeS5wO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjcgTWFwLnByb3RvdHlwZS5oYXMoa2V5KVxuICAgICAgLy8gMjMuMi4zLjcgU2V0LnByb3RvdHlwZS5oYXModmFsdWUpXG4gICAgICBoYXM6IGZ1bmN0aW9uIGhhcyhrZXkpIHtcbiAgICAgICAgcmV0dXJuICEhZ2V0RW50cnkodmFsaWRhdGUodGhpcywgTkFNRSksIGtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKERFU0NSSVBUT1JTKSBkUChDLnByb3RvdHlwZSwgJ3NpemUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlKHRoaXMsIE5BTUUpW1NJWkVdO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBDO1xuICB9LFxuICBkZWY6IGZ1bmN0aW9uICh0aGF0LCBrZXksIHZhbHVlKSB7XG4gICAgdmFyIGVudHJ5ID0gZ2V0RW50cnkodGhhdCwga2V5KTtcbiAgICB2YXIgcHJldiwgaW5kZXg7XG4gICAgLy8gY2hhbmdlIGV4aXN0aW5nIGVudHJ5XG4gICAgaWYgKGVudHJ5KSB7XG4gICAgICBlbnRyeS52ID0gdmFsdWU7XG4gICAgLy8gY3JlYXRlIG5ldyBlbnRyeVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGF0Ll9sID0gZW50cnkgPSB7XG4gICAgICAgIGk6IGluZGV4ID0gZmFzdEtleShrZXksIHRydWUpLCAvLyA8LSBpbmRleFxuICAgICAgICBrOiBrZXksICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0ga2V5XG4gICAgICAgIHY6IHZhbHVlLCAgICAgICAgICAgICAgICAgICAgICAvLyA8LSB2YWx1ZVxuICAgICAgICBwOiBwcmV2ID0gdGhhdC5fbCwgICAgICAgICAgICAgLy8gPC0gcHJldmlvdXMgZW50cnlcbiAgICAgICAgbjogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgIC8vIDwtIG5leHQgZW50cnlcbiAgICAgICAgcjogZmFsc2UgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIHJlbW92ZWRcbiAgICAgIH07XG4gICAgICBpZiAoIXRoYXQuX2YpIHRoYXQuX2YgPSBlbnRyeTtcbiAgICAgIGlmIChwcmV2KSBwcmV2Lm4gPSBlbnRyeTtcbiAgICAgIHRoYXRbU0laRV0rKztcbiAgICAgIC8vIGFkZCB0byBpbmRleFxuICAgICAgaWYgKGluZGV4ICE9PSAnRicpIHRoYXQuX2lbaW5kZXhdID0gZW50cnk7XG4gICAgfSByZXR1cm4gdGhhdDtcbiAgfSxcbiAgZ2V0RW50cnk6IGdldEVudHJ5LFxuICBzZXRTdHJvbmc6IGZ1bmN0aW9uIChDLCBOQU1FLCBJU19NQVApIHtcbiAgICAvLyBhZGQgLmtleXMsIC52YWx1ZXMsIC5lbnRyaWVzLCBbQEBpdGVyYXRvcl1cbiAgICAvLyAyMy4xLjMuNCwgMjMuMS4zLjgsIDIzLjEuMy4xMSwgMjMuMS4zLjEyLCAyMy4yLjMuNSwgMjMuMi4zLjgsIDIzLjIuMy4xMCwgMjMuMi4zLjExXG4gICAgJGl0ZXJEZWZpbmUoQywgTkFNRSwgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gICAgICB0aGlzLl90ID0gdmFsaWRhdGUoaXRlcmF0ZWQsIE5BTUUpOyAvLyB0YXJnZXRcbiAgICAgIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAgICAgIC8vIGtpbmRcbiAgICAgIHRoaXMuX2wgPSB1bmRlZmluZWQ7ICAgICAgICAgICAgICAgIC8vIHByZXZpb3VzXG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIGtpbmQgPSB0aGF0Ll9rO1xuICAgICAgdmFyIGVudHJ5ID0gdGhhdC5fbDtcbiAgICAgIC8vIHJldmVydCB0byB0aGUgbGFzdCBleGlzdGluZyBlbnRyeVxuICAgICAgd2hpbGUgKGVudHJ5ICYmIGVudHJ5LnIpIGVudHJ5ID0gZW50cnkucDtcbiAgICAgIC8vIGdldCBuZXh0IGVudHJ5XG4gICAgICBpZiAoIXRoYXQuX3QgfHwgISh0aGF0Ll9sID0gZW50cnkgPSBlbnRyeSA/IGVudHJ5Lm4gOiB0aGF0Ll90Ll9mKSkge1xuICAgICAgICAvLyBvciBmaW5pc2ggdGhlIGl0ZXJhdGlvblxuICAgICAgICB0aGF0Ll90ID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gc3RlcCgxKTtcbiAgICAgIH1cbiAgICAgIC8vIHJldHVybiBzdGVwIGJ5IGtpbmRcbiAgICAgIGlmIChraW5kID09ICdrZXlzJykgcmV0dXJuIHN0ZXAoMCwgZW50cnkuayk7XG4gICAgICBpZiAoa2luZCA9PSAndmFsdWVzJykgcmV0dXJuIHN0ZXAoMCwgZW50cnkudik7XG4gICAgICByZXR1cm4gc3RlcCgwLCBbZW50cnkuaywgZW50cnkudl0pO1xuICAgIH0sIElTX01BUCA/ICdlbnRyaWVzJyA6ICd2YWx1ZXMnLCAhSVNfTUFQLCB0cnVlKTtcblxuICAgIC8vIGFkZCBbQEBzcGVjaWVzXSwgMjMuMS4yLjIsIDIzLjIuMi4yXG4gICAgc2V0U3BlY2llcyhOQU1FKTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29sbGVjdGlvbi1zdHJvbmcuanNcbi8vIG1vZHVsZSBpZCA9IDgyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vRGF2aWRCcnVhbnQvTWFwLVNldC5wcm90b3R5cGUudG9KU09OXG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciBmcm9tID0gcmVxdWlyZSgnLi9fYXJyYXktZnJvbS1pdGVyYWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTkFNRSkge1xuICByZXR1cm4gZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIGlmIChjbGFzc29mKHRoaXMpICE9IE5BTUUpIHRocm93IFR5cGVFcnJvcihOQU1FICsgXCIjdG9KU09OIGlzbid0IGdlbmVyaWNcIik7XG4gICAgcmV0dXJuIGZyb20odGhpcyk7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2xsZWN0aW9uLXRvLWpzb24uanNcbi8vIG1vZHVsZSBpZCA9IDgzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIG1ldGEgPSByZXF1aXJlKCcuL19tZXRhJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgcmVkZWZpbmVBbGwgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKTtcbnZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xudmFyIGFuSW5zdGFuY2UgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBlYWNoID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpKDApO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTkFNRSwgd3JhcHBlciwgbWV0aG9kcywgY29tbW9uLCBJU19NQVAsIElTX1dFQUspIHtcbiAgdmFyIEJhc2UgPSBnbG9iYWxbTkFNRV07XG4gIHZhciBDID0gQmFzZTtcbiAgdmFyIEFEREVSID0gSVNfTUFQID8gJ3NldCcgOiAnYWRkJztcbiAgdmFyIHByb3RvID0gQyAmJiBDLnByb3RvdHlwZTtcbiAgdmFyIE8gPSB7fTtcbiAgaWYgKCFERVNDUklQVE9SUyB8fCB0eXBlb2YgQyAhPSAnZnVuY3Rpb24nIHx8ICEoSVNfV0VBSyB8fCBwcm90by5mb3JFYWNoICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgbmV3IEMoKS5lbnRyaWVzKCkubmV4dCgpO1xuICB9KSkpIHtcbiAgICAvLyBjcmVhdGUgY29sbGVjdGlvbiBjb25zdHJ1Y3RvclxuICAgIEMgPSBjb21tb24uZ2V0Q29uc3RydWN0b3Iod3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUik7XG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIG1ldGhvZHMpO1xuICAgIG1ldGEuTkVFRCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgQyA9IHdyYXBwZXIoZnVuY3Rpb24gKHRhcmdldCwgaXRlcmFibGUpIHtcbiAgICAgIGFuSW5zdGFuY2UodGFyZ2V0LCBDLCBOQU1FLCAnX2MnKTtcbiAgICAgIHRhcmdldC5fYyA9IG5ldyBCYXNlKCk7XG4gICAgICBpZiAoaXRlcmFibGUgIT0gdW5kZWZpbmVkKSBmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0YXJnZXRbQURERVJdLCB0YXJnZXQpO1xuICAgIH0pO1xuICAgIGVhY2goJ2FkZCxjbGVhcixkZWxldGUsZm9yRWFjaCxnZXQsaGFzLHNldCxrZXlzLHZhbHVlcyxlbnRyaWVzLHRvSlNPTicuc3BsaXQoJywnKSwgZnVuY3Rpb24gKEtFWSkge1xuICAgICAgdmFyIElTX0FEREVSID0gS0VZID09ICdhZGQnIHx8IEtFWSA9PSAnc2V0JztcbiAgICAgIGlmIChLRVkgaW4gcHJvdG8gJiYgIShJU19XRUFLICYmIEtFWSA9PSAnY2xlYXInKSkgaGlkZShDLnByb3RvdHlwZSwgS0VZLCBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICBhbkluc3RhbmNlKHRoaXMsIEMsIEtFWSk7XG4gICAgICAgIGlmICghSVNfQURERVIgJiYgSVNfV0VBSyAmJiAhaXNPYmplY3QoYSkpIHJldHVybiBLRVkgPT0gJ2dldCcgPyB1bmRlZmluZWQgOiBmYWxzZTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX2NbS0VZXShhID09PSAwID8gMCA6IGEsIGIpO1xuICAgICAgICByZXR1cm4gSVNfQURERVIgPyB0aGlzIDogcmVzdWx0O1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgSVNfV0VBSyB8fCBkUChDLnByb3RvdHlwZSwgJ3NpemUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Muc2l6ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldFRvU3RyaW5nVGFnKEMsIE5BTUUpO1xuXG4gIE9bTkFNRV0gPSBDO1xuICAkZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiwgTyk7XG5cbiAgaWYgKCFJU19XRUFLKSBjb21tb24uc2V0U3Ryb25nKEMsIE5BTUUsIElTX01BUCk7XG5cbiAgcmV0dXJuIEM7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2xsZWN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwidmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG5tb2R1bGUuZXhwb3J0cyA9IGRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qc1xuLy8gbW9kdWxlIGlkID0gODVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsInZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uICgpIHsgU0FGRV9DTE9TSU5HID0gdHJ1ZTsgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXRocm93LWxpdGVyYWxcbiAgQXJyYXkuZnJvbShyaXRlciwgZnVuY3Rpb24gKCkgeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjLCBza2lwQ2xvc2luZykge1xuICBpZiAoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpIHJldHVybiBmYWxzZTtcbiAgdmFyIHNhZmUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyID0gWzddO1xuICAgIHZhciBpdGVyID0gYXJyW0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHsgZG9uZTogc2FmZSA9IHRydWUgfTsgfTtcbiAgICBhcnJbSVRFUkFUT1JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGV0ZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA4NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9wcm9wb3NhbC1zZXRtYXAtb2Zmcm9tL1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgZm9yT2YgPSByZXF1aXJlKCcuL19mb3Itb2YnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ09MTEVDVElPTikge1xuICAkZXhwb3J0KCRleHBvcnQuUywgQ09MTEVDVElPTiwgeyBmcm9tOiBmdW5jdGlvbiBmcm9tKHNvdXJjZSAvKiAsIG1hcEZuLCB0aGlzQXJnICovKSB7XG4gICAgdmFyIG1hcEZuID0gYXJndW1lbnRzWzFdO1xuICAgIHZhciBtYXBwaW5nLCBBLCBuLCBjYjtcbiAgICBhRnVuY3Rpb24odGhpcyk7XG4gICAgbWFwcGluZyA9IG1hcEZuICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKG1hcHBpbmcpIGFGdW5jdGlvbihtYXBGbik7XG4gICAgaWYgKHNvdXJjZSA9PSB1bmRlZmluZWQpIHJldHVybiBuZXcgdGhpcygpO1xuICAgIEEgPSBbXTtcbiAgICBpZiAobWFwcGluZykge1xuICAgICAgbiA9IDA7XG4gICAgICBjYiA9IGN0eChtYXBGbiwgYXJndW1lbnRzWzJdLCAyKTtcbiAgICAgIGZvck9mKHNvdXJjZSwgZmFsc2UsIGZ1bmN0aW9uIChuZXh0SXRlbSkge1xuICAgICAgICBBLnB1c2goY2IobmV4dEl0ZW0sIG4rKykpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvck9mKHNvdXJjZSwgZmFsc2UsIEEucHVzaCwgQSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgdGhpcyhBKTtcbiAgfSB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1jb2xsZWN0aW9uLWZyb20uanNcbi8vIG1vZHVsZSBpZCA9IDg3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL3Byb3Bvc2FsLXNldG1hcC1vZmZyb20vXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDT0xMRUNUSU9OKSB7XG4gICRleHBvcnQoJGV4cG9ydC5TLCBDT0xMRUNUSU9OLCB7IG9mOiBmdW5jdGlvbiBvZigpIHtcbiAgICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgQSA9IEFycmF5KGxlbmd0aCk7XG4gICAgd2hpbGUgKGxlbmd0aC0tKSBBW2xlbmd0aF0gPSBhcmd1bWVudHNbbGVuZ3RoXTtcbiAgICByZXR1cm4gbmV3IHRoaXMoQSk7XG4gIH0gfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtY29sbGVjdGlvbi1vZi5qc1xuLy8gbW9kdWxlIGlkID0gODhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVkpIHtcbiAgdmFyIEMgPSB0eXBlb2YgY29yZVtLRVldID09ICdmdW5jdGlvbicgPyBjb3JlW0tFWV0gOiBnbG9iYWxbS0VZXTtcbiAgaWYgKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pIGRQLmYoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtc3BlY2llcy5qc1xuLy8gbW9kdWxlIGlkID0gODlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDkwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZnJvbSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2FycmF5L2Zyb21cIik7XG5cbnZhciBfZnJvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mcm9tKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShhcnIpID8gYXJyIDogKDAsIF9mcm9tMi5kZWZhdWx0KShhcnIpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL3RvQXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IDkyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiB7IGU6IGZhbHNlLCB2OiBleGVjKCkgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7IGU6IHRydWUsIHY6IGUgfTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcGVyZm9ybS5qc1xuLy8gbW9kdWxlIGlkID0gOTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDLCB4KSB7XG4gIGFuT2JqZWN0KEMpO1xuICBpZiAoaXNPYmplY3QoeCkgJiYgeC5jb25zdHJ1Y3RvciA9PT0gQykgcmV0dXJuIHg7XG4gIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5LmYoQyk7XG4gIHZhciByZXNvbHZlID0gcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgcmVzb2x2ZSh4KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9taXNlLXJlc29sdmUuanNcbi8vIG1vZHVsZSBpZCA9IDk0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwiLy8gNy4zLjIwIFNwZWNpZXNDb25zdHJ1Y3RvcihPLCBkZWZhdWx0Q29uc3RydWN0b3IpXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBEKSB7XG4gIHZhciBDID0gYW5PYmplY3QoTykuY29uc3RydWN0b3I7XG4gIHZhciBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IEQgOiBhRnVuY3Rpb24oUyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA5NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCIsInZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBpbnZva2UgPSByZXF1aXJlKCcuL19pbnZva2UnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi9faHRtbCcpO1xudmFyIGNlbCA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgc2V0VGFzayA9IGdsb2JhbC5zZXRJbW1lZGlhdGU7XG52YXIgY2xlYXJUYXNrID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlO1xudmFyIE1lc3NhZ2VDaGFubmVsID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsO1xudmFyIERpc3BhdGNoID0gZ2xvYmFsLkRpc3BhdGNoO1xudmFyIGNvdW50ZXIgPSAwO1xudmFyIHF1ZXVlID0ge307XG52YXIgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG52YXIgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaWQgPSArdGhpcztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICBpZiAocXVldWUuaGFzT3duUHJvcGVydHkoaWQpKSB7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBydW4uY2FsbChldmVudC5kYXRhKTtcbn07XG4vLyBOb2RlLmpzIDAuOSsgJiBJRTEwKyBoYXMgc2V0SW1tZWRpYXRlLCBvdGhlcndpc2U6XG5pZiAoIXNldFRhc2sgfHwgIWNsZWFyVGFzaykge1xuICBzZXRUYXNrID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGZuKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICB2YXIgaSA9IDE7XG4gICAgd2hpbGUgKGFyZ3VtZW50cy5sZW5ndGggPiBpKSBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHF1ZXVlWysrY291bnRlcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgICAgIGludm9rZSh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCkge1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZiAocmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBTcGhlcmUgKEpTIGdhbWUgZW5naW5lKSBEaXNwYXRjaCBBUElcbiAgfSBlbHNlIGlmIChEaXNwYXRjaCAmJiBEaXNwYXRjaC5ub3cpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgRGlzcGF0Y2gubm93KGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICB9IGVsc2UgaWYgKE1lc3NhZ2VDaGFubmVsKSB7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIHBvcnQgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoaWQgKyAnJywgJyonKTtcbiAgICB9O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYgKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjZWwoJ3NjcmlwdCcpKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY2VsKCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuLmNhbGwoaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0VGFzayxcbiAgY2xlYXI6IGNsZWFyVGFza1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdGFzay5qc1xuLy8gbW9kdWxlIGlkID0gOTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qc1xuLy8gbW9kdWxlIGlkID0gOTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2xcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gOThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gOTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgZ09QTiA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZjtcbnZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG52YXIgd2luZG93TmFtZXMgPSB0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc1xuICA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdpbmRvdykgOiBbXTtcblxudmFyIGdldFdpbmRvd05hbWVzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdPUE4oaXQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHdpbmRvd05hbWVzLnNsaWNlKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KSB7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJyA/IGdldFdpbmRvd05hbWVzKGl0KSA6IGdPUE4odG9JT2JqZWN0KGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanNcbi8vIG1vZHVsZSBpZCA9IDEwMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKTtcbiAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICB2YXIgaSA9IDA7XG4gIHZhciBQO1xuICB3aGlsZSAobGVuZ3RoID4gaSkgZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgYXJnQ2hlY2sgZnJvbSAnY29tbW9uL2FyZ0NoZWNrJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25maWd1cmF0aW9uIHtcbiAgY29uc3RydWN0b3Ioe293bklkfSA9IHt9KSB7XG4gICAgdGhpcy5fb3duSWQgPSBhcmdDaGVjay5zdHJpbmcodGhpcywgJ293bklkJywgb3duSWQpXG4gICAgdGhpcy5fbWVtYmVycyA9IG5ldyBNZW1iZXJzKClcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBgY29uZmlne21lbWJlcnM9JHtbLi4udGhpcy5fbWVtYmVyc10uam9pbignLCcpfX1gXG4gIH1cblxuICBnZXQgb3duSWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX293bklkXG4gIH1cblxuICBnZXQgbWVtYmVycygpIHtcbiAgICByZXR1cm4gbmV3IE1lbWJlcnModGhpcy5fbWVtYmVycylcbiAgfVxuXG4gIGNyZWF0ZU1lbWJlcnNDaGFuZ2UobmV3TWVtYmVycykge1xuICAgIGFyZ0NoZWNrLmluc3RhbmNlKCdDb25maWd1cmF0aW9uLmNyZWF0ZU1lbWJlcnNDaGFuZ2UnLCAnbmV3TWVtYmVycycsIG5ld01lbWJlcnMsIE1lbWJlcnMpXG4gICAgcmV0dXJuIG5ldyBDb25maWd1cmF0aW9uRGF0YShuZXdNZW1iZXJzKVxuICB9XG5cbiAgZ2V0KCkge1xuICAgIHJldHVybiBuZXcgQ29uZmlndXJhdGlvbkRhdGEodGhpcy5fbWVtYmVycylcbiAgfVxuXG4gIHNldChkYXRhKSB7XG4gICAgYXJnQ2hlY2suaW5zdGFuY2UoJ0NvbmZpZ3VyYXRpb24uc2V0JywgJ2RhdGEnLCBkYXRhLCBDb25maWd1cmF0aW9uRGF0YSlcbiAgICB0aGlzLl9tZW1iZXJzID0gZGF0YS5tZW1iZXJzXG4gIH1cblxuICAvLyBmb3IgZWFjaCBzZXJ2ZXIsIGluY2x1ZGluZyBzZWxmXG4gIGZvckVhY2goZnVuYywgdGhpc0FyZykge1xuICAgIHRoaXMubWVtYmVycy5mb3JFYWNoKGZ1bmMsIHRoaXNBcmcpXG4gIH1cblxuICAvLyBmb3IgZWFjaCBwZWVyIGluIHRoZSBjbHVzdGVyXG4gIGZvckVhY2hQZWVyKGZ1bmMsIHRoaXNBcmcpIHtcbiAgICB0aGlzLm1lbWJlcnMuZm9yRWFjaChwZWVySWQgPT4ge1xuICAgICAgaWYgKHBlZXJJZCAhPT0gdGhpcy5fb3duSWQpIHtcbiAgICAgICAgZnVuYy5jYWxsKHRoaXMubWVtYmVycywgcGVlcklkKVxuICAgICAgfVxuICAgIH0sIHRoaXNBcmcpXG4gIH1cblxuICBoYXNNYWpvcml0eShncmFudGVkVm90ZXMpIHtcbiAgICByZXR1cm4gdGhpcy5fbWVtYmVycy5oYXNNYWpvcml0eShncmFudGVkVm90ZXMpXG4gIH1cblxuICBnZXRNYWpvcml0eUluZGV4KG1hdGNoSW5kaWNlcykge1xuICAgIHJldHVybiB0aGlzLl9tZW1iZXJzLmdldE1ham9yaXR5SW5kZXgobWF0Y2hJbmRpY2VzKVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uRGF0YSB7XG4gIHN0YXRpYyBwYXJzZShkYXRhKSB7XG4gICAgbGV0IHttZW1iZXJzfSA9IGFyZ0NoZWNrLm9iamVjdCh0aGlzLCAnZGF0YScsIGRhdGEpXG4gICAgcmV0dXJuIG5ldyBDb25maWd1cmF0aW9uRGF0YShuZXcgTWVtYmVycyhtZW1iZXJzKSlcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG1lbWJlcnMpIHtcbiAgICBhcmdDaGVjay5pbnN0YW5jZSh0aGlzLCAnbWVtYmVycycsIG1lbWJlcnMsIE1lbWJlcnMpXG4gICAgdGhpcy5fbWVtYmVycyA9IG1lbWJlcnNcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBgY29uZmlnRGF0YXttZW1iZXJzPSR7Wy4uLnRoaXMuX21lbWJlcnNdLmpvaW4oJywnKX19YFxuICB9XG5cbiAgdG9KU09OKCkge1xuICAgIC8vIE9ubHkgcG9seWZpbGxlZCBzZXRzIHNlcmlhbGl6ZSB0byBhcnJheXMsIHNvIGJlIGV4cGxpY2l0XG4gICAgcmV0dXJuIHttZW1iZXJzOiBbLi4udGhpcy5fbWVtYmVyc119XG4gIH1cblxuICBnZXQgbWVtYmVycygpIHtcbiAgICByZXR1cm4gdGhpcy5fbWVtYmVyc1xuICB9XG5cbiAgaW5jbHVkZXMoaWQpIHtcbiAgICBpZiAodGhpcy5fbWVtYmVycy5oYXMoaWQpKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTWVtYmVycyBleHRlbmRzIFNldCB7XG4gIGdldCBtYWpvcml0eUNvdW50KCkge1xuICAgIHJldHVybiAoKHRoaXMuc2l6ZSAvIDIpIHwgMCkgKyAxXG4gIH1cblxuICBnZXQgbWlub3JpdHlDb3VudCgpIHtcbiAgICByZXR1cm4gKCh0aGlzLnNpemUgLSAxKSAvIDIpIHwgMFxuICB9XG5cbiAgZ2V0IG1ham9yaXR5SW5kZXhQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gKCh0aGlzLnNpemUgKyAxKSAvIDIpIHwgMFxuICB9XG5cbiAgdm90ZUNvdW50KGdyYW50ZWRWb3RlcyAvKiBTZXQgKi8pIHtcbiAgICBsZXQgdm90ZUNvdW50ID0gMFxuICAgIHRoaXMuZm9yRWFjaChpZCA9PiB7XG4gICAgICBpZiAoZ3JhbnRlZFZvdGVzLmhhcyhpZCkpIHtcbiAgICAgICAgdm90ZUNvdW50ICs9IDFcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB2b3RlQ291bnRcbiAgfVxuXG4gIGhhc01ham9yaXR5KGdyYW50ZWRWb3RlcyAvKiBTZXQgKi8pIHtcbiAgICBsZXQgdm90ZUNvdW50ID0gdGhpcy52b3RlQ291bnQoZ3JhbnRlZFZvdGVzKVxuICAgIHJldHVybiB2b3RlQ291bnQgPj0gdGhpcy5tYWpvcml0eUNvdW50XG4gIH1cblxuICAvLyBGaW5kcyB0aGUgZ3JlYXRlc3QgbG9nIGluZGV4IHRoYXQgYSBtYWpvcml0eSBpcyBndWFyYW50ZWVkIHRvIGhhdmUgcmVjZWl2ZWRcbiAgZ2V0TWFqb3JpdHlJbmRleChtYXRjaEluZGljZXMgLyoge1tjbGllbnRJZF06IG1hdGNoSW5kZXh9ICovKSB7XG4gICAgbGV0IGluZGljZXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChpZCA9PiB7XG4gICAgICBpZiAobWF0Y2hJbmRpY2VzLmhhc093blByb3BlcnR5KGlkKSkge1xuICAgICAgICBpbmRpY2VzLnB1c2gobWF0Y2hJbmRpY2VzW2lkXSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGljZXMucHVzaCgwKVxuICAgICAgfVxuICAgIH0pXG4gICAgbGV0IG1ham9yaXR5UG9zaXRpb24gPSB0aGlzLm1ham9yaXR5SW5kZXhQb3NpdGlvblxuICAgIGlmIChpbmRpY2VzLmxlbmd0aCA9PT0gMCB8fCBpbmRpY2VzLmxlbmd0aCA8IG1ham9yaXR5UG9zaXRpb24pIHtcbiAgICAgIHJldHVybiAwXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpbmRpY2VzLnNvcnQoKVttYWpvcml0eVBvc2l0aW9uIC0gMV1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZvdGVzIHtcbiAgY29uc3RydWN0b3Iob3duSWQpIHtcbiAgICB0aGlzLl92b3RlcyA9IG5ldyBNYXAoKVxuICAgIGlmIChvd25JZCkge1xuICAgICAgdGhpcy5zZXQob3duSWQsIHRydWUpXG4gICAgfVxuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGB2b3Rlc3ske1suLi50aGlzLl92b3Rlc10ubWFwKChbcGVlcklkLCBncmFudGVkXSkgPT4gZ3JhbnRlZCA/IGA+JHtwZWVySWR9PGAgOiBwZWVySWQpfX1gXG4gIH1cblxuICBzZXQocGVlcklkLCBncmFudGVkKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZvdGVzLnNldChwZWVySWQsIGdyYW50ZWQpXG4gIH1cblxuICBoYXMocGVlcklkKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZvdGVzLmhhcyhwZWVySWQpXG4gIH1cblxuICBnZXQgZ3JhbnRlZFZvdGVzKCkge1xuICAgIGxldCB2b3RlcnMgPSBuZXcgU2V0KClcbiAgICB0aGlzLl92b3Rlcy5mb3JFYWNoKChncmFudGVkLCBwZWVySWQpID0+IHtcbiAgICAgIGlmIChncmFudGVkKSB7XG4gICAgICAgIHZvdGVycy5hZGQocGVlcklkKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHZvdGVyc1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGliL2NvbmZlcmVuY2UvcmFmdENvbmZpZ3VyYXRpb24uanMiLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IGFyZ0NoZWNrIGZyb20gJ2NvbW1vbi9hcmdDaGVjaydcbmltcG9ydCBsb2cgZnJvbSAnY29tbW9uL2xvZydcblxuaW1wb3J0IHtDb25maWd1cmF0aW9uRGF0YX0gZnJvbSAnY29uZmVyZW5jZS9yYWZ0Q29uZmlndXJhdGlvbidcblxuY29uc3QgVEFHID0gJ3JhZnQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhZnRMb2dFbnRyeSB7XG4gIHN0YXRpYyBwYXJzZShqc29uLCBpbmRleCkge1xuICAgIC8vIGNvbmZpZ3VyYXRpb24gZW50cmllcyBoYXZlIDIgZWxlbWVudHMsIG9wIGVudHJpZXMgaGF2ZSAzXG4gICAgaWYgKGpzb24ubGVuZ3RoID09PSAyKSB7XG4gICAgICBsZXQgW3Rlcm0sIGRhdGFdID0ganNvblxuICAgICAgcmV0dXJuIG5ldyBDb25maWd1cmF0aW9uRW50cnkoe3Rlcm0sIGluZGV4LCBkYXRhOiBDb25maWd1cmF0aW9uRGF0YS5wYXJzZShkYXRhKX0pXG4gICAgfSBlbHNlIGlmIChqc29uLmxlbmd0aCA9PT0gNCkge1xuICAgICAgbGV0IFt0ZXJtLCBpZCwgb3AsIGFyZ3NdID0ganNvblxuICAgICAgcmV0dXJuIG5ldyBPcEVudHJ5KHt0ZXJtLCBpbmRleCwgaWQsIG9wLCBhcmdzfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRmFpbGVkIHRvIHBhcnNlIGxvZyBlbnRyeSBkYXRhLCBpbnZhbGlkIGxlbmd0aDogJHtqc29uLmxlbmd0aH1gKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHt0ZXJtLCBpbmRleH0pIHtcbiAgICBpZiAodGhpcy5jb25zdHJ1Y3RvciA9PT0gUmFmdExvZ0VudHJ5KSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdSYWZ0TG9nRW50cnkgc2hvdWxkIG5vdCBieSBjb25zdHJ1Y3RlZCBkaXJlY3RseScpXG4gICAgfVxuICAgIHRoaXMuX3Rlcm0gPSB0ZXJtXG4gICAgdGhpcy5faW5kZXggPSBpbmRleFxuICB9XG5cbiAgZ2V0IHRlcm0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Rlcm1cbiAgfVxuXG4gIGdldCBpbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5faW5kZXhcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdGlvbkVudHJ5IGV4dGVuZHMgUmFmdExvZ0VudHJ5IHtcbiAgY29uc3RydWN0b3Ioe3Rlcm0sIGluZGV4LCBkYXRhfSkge1xuICAgIHN1cGVyKHt0ZXJtLCBpbmRleH0pXG4gICAgYXJnQ2hlY2suaW5zdGFuY2UodGhpcywgJ2RhdGEnLCBkYXRhLCBDb25maWd1cmF0aW9uRGF0YSlcbiAgICB0aGlzLl9kYXRhID0gZGF0YVxuICB9XG5cbiAgZ2V0IGRhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBgY29uZmlne3Q9JHt0aGlzLnRlcm19LGk9JHt0aGlzLmluZGV4fSwke3RoaXMuZGF0YX19YFxuICB9XG5cbiAgdG9KU09OKCkge1xuICAgIHJldHVybiBbdGhpcy50ZXJtLCB0aGlzLmRhdGFdXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IE9QID0ge1xuICBub29wOiAwLFxuICBzZXQ6IDEsXG4gIGFwcGVuZDogMixcbn1cblxuY29uc3Qgb3BOYW1lcyA9IHtcbiAgMDogJ25vb3AnLFxuICAxOiAnc2V0JyxcbiAgMjogJ2FwcGVuZCcsXG59XG5cbmV4cG9ydCBjbGFzcyBPcEVudHJ5IGV4dGVuZHMgUmFmdExvZ0VudHJ5IHtcbiAgc3RhdGljIGdldCBpZFNpemUoKSB7XG4gICAgcmV0dXJuIDhcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHt0ZXJtLCBpbmRleCwgaWQgPSAwLCBvcCwgYXJncyA9IFtdfSkge1xuICAgIHN1cGVyKHt0ZXJtLCBpbmRleH0pXG4gICAgdGhpcy5faWQgPSBpZFxuICAgIHRoaXMuX29wID0gb3BcbiAgICB0aGlzLl9hcmdzID0gYXJnc1xuICB9XG5cbiAgZ2V0IGlkKCkge1xuICAgIHJldHVybiB0aGlzLl9pZFxuICB9XG5cbiAgZ2V0IG9wKCkge1xuICAgIHJldHVybiB0aGlzLl9vcFxuICB9XG5cbiAgZ2V0IGFyZ3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FyZ3NcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIGxldCBuYW1lID0gb3BOYW1lc1t0aGlzLm9wXVxuICAgIGxldCBhcmdzID0gdGhpcy5hcmdzLmpvaW4oJywnKVxuICAgIGxldCBzaG9ydElkID0gdGhpcy5pZCA/IHRoaXMuaWQuc2xpY2UoMCwgNCkgOiAnPG5vPidcbiAgICByZXR1cm4gYG9we2lkPSR7c2hvcnRJZH0sdD0ke3RoaXMudGVybX0saT0ke3RoaXMuaW5kZXh9LCR7bmFtZX0sWyR7YXJnc31dfWBcbiAgfVxuXG4gIHRvSlNPTigpIHtcbiAgICByZXR1cm4gW3RoaXMudGVybSwgdGhpcy5pZCwgdGhpcy5vcCwgdGhpcy5hcmdzXVxuICB9XG5cbiAgYXBwbHkoc3RhdGUpIHtcbiAgICBpZiAodGhpc1t0aGlzLm9wXSkge1xuICAgICAgbG9nLmRlYnVnKFRBRywgYGFwcGx5aW5nICR7dGhpc31gKVxuICAgICAgcmV0dXJuIHRoaXNbdGhpcy5vcF0oc3RhdGUsIC4uLnRoaXMuYXJncylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRmFpbGVkIHRvIGFwcGx5IE9wRW50cnksIHVua25vd24gb3AgY29kZTogJyR7dGhpcy5vcH0nYClcbiAgICB9XG4gIH1cblxuICAvLyBtZXRob2RzIGZvciBlYWNoIG9wIHRvIG1vZGlmeSBzdGF0ZSwgYXJncyBhcmUgcGFzc2VkIGluIGFzIHBhcmFtZXRlcnMgMitcbiAgLy8gSWYgdGhlIHN0YXRlIGlzIG1vZGlmaWVkIGl0IHNob3VsZCBhbHdheXMgYmUgcmV0dXJuZWQsIGFuZCB0aGUgb3RoZXIgd2F5IGFyb3VuZC5cblxuICBbT1Aubm9vcF0oc3RhdGUpIHtcbiAgfVxuXG4gIFtPUC5zZXRdKHN0YXRlLCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZihrZXkpICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBPcEVudHJ5LCBzZXQga2V5IG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIH1cbiAgICBpZiAodHlwZW9mKHZhbHVlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGRlbGV0ZSBzdGF0ZVtrZXldXG4gICAgfVxuICAgIHN0YXRlW2tleV0gPSB2YWx1ZVxuICAgIHJldHVybiBzdGF0ZVxuICB9XG5cbiAgW09QLmFwcGVuZF0oc3RhdGUsIGtleSwgdmFsdWUpIHtcbiAgICBpZiAodHlwZW9mKGtleSkgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIE9wRW50cnksIGFwcGVuZCBrZXkgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgfVxuICAgIGlmICh0eXBlb2YodmFsdWUpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmIChzdGF0ZVtrZXldKSB7XG4gICAgICBzdGF0ZVtrZXldLnB1c2godmFsdWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlW2tleV0gPSBbdmFsdWVdXG4gICAgfVxuICAgIHJldHVybiBzdGF0ZVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGliL2NvbmZlcmVuY2UvcmFmdExvZ0VudHJ5LmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gMTA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LmFycmF5LmZyb20nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLkFycmF5LmZyb207XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb20uanNcbi8vIG1vZHVsZSBpZCA9IDEwNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGUoUCwgRCkge1xuICByZXR1cm4gJE9iamVjdC5jcmVhdGUoUCwgRCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYykge1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDEwOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSkge1xuICByZXR1cm4gJE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Quc2V0UHJvdG90eXBlT2Y7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsInJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zZXQnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3LnNldC50by1qc29uJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5zZXQub2YnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3LnNldC5mcm9tJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvX2NvcmUnKS5TZXQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L2ZuL3NldC5qc1xuLy8gbW9kdWxlIGlkID0gMTEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLlN5bWJvbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX3drcy1leHQnKS5mKCdpdGVyYXRvcicpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDExNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCJ2YXIgZm9yT2YgPSByZXF1aXJlKCcuL19mb3Itb2YnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlciwgSVRFUkFUT1IpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3JPZihpdGVyLCBmYWxzZSwgcmVzdWx0LnB1c2gsIHJlc3VsdCwgSVRFUkFUT1IpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktZnJvbS1pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanNcbi8vIG1vZHVsZSBpZCA9IDExN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwiLy8gMCAtPiBBcnJheSNmb3JFYWNoXG4vLyAxIC0+IEFycmF5I21hcFxuLy8gMiAtPiBBcnJheSNmaWx0ZXJcbi8vIDMgLT4gQXJyYXkjc29tZVxuLy8gNCAtPiBBcnJheSNldmVyeVxuLy8gNSAtPiBBcnJheSNmaW5kXG4vLyA2IC0+IEFycmF5I2ZpbmRJbmRleFxudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGFzYyA9IHJlcXVpcmUoJy4vX2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChUWVBFLCAkY3JlYXRlKSB7XG4gIHZhciBJU19NQVAgPSBUWVBFID09IDE7XG4gIHZhciBJU19GSUxURVIgPSBUWVBFID09IDI7XG4gIHZhciBJU19TT01FID0gVFlQRSA9PSAzO1xuICB2YXIgSVNfRVZFUlkgPSBUWVBFID09IDQ7XG4gIHZhciBJU19GSU5EX0lOREVYID0gVFlQRSA9PSA2O1xuICB2YXIgTk9fSE9MRVMgPSBUWVBFID09IDUgfHwgSVNfRklORF9JTkRFWDtcbiAgdmFyIGNyZWF0ZSA9ICRjcmVhdGUgfHwgYXNjO1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBjYWxsYmFja2ZuLCB0aGF0KSB7XG4gICAgdmFyIE8gPSB0b09iamVjdCgkdGhpcyk7XG4gICAgdmFyIHNlbGYgPSBJT2JqZWN0KE8pO1xuICAgIHZhciBmID0gY3R4KGNhbGxiYWNrZm4sIHRoYXQsIDMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChzZWxmLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgcmVzdWx0ID0gSVNfTUFQID8gY3JlYXRlKCR0aGlzLCBsZW5ndGgpIDogSVNfRklMVEVSID8gY3JlYXRlKCR0aGlzLCAwKSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgdmFsLCByZXM7XG4gICAgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChOT19IT0xFUyB8fCBpbmRleCBpbiBzZWxmKSB7XG4gICAgICB2YWwgPSBzZWxmW2luZGV4XTtcbiAgICAgIHJlcyA9IGYodmFsLCBpbmRleCwgTyk7XG4gICAgICBpZiAoVFlQRSkge1xuICAgICAgICBpZiAoSVNfTUFQKSByZXN1bHRbaW5kZXhdID0gcmVzOyAgIC8vIG1hcFxuICAgICAgICBlbHNlIGlmIChyZXMpIHN3aXRjaCAoVFlQRSkge1xuICAgICAgICAgIGNhc2UgMzogcmV0dXJuIHRydWU7ICAgICAgICAgICAgIC8vIHNvbWVcbiAgICAgICAgICBjYXNlIDU6IHJldHVybiB2YWw7ICAgICAgICAgICAgICAvLyBmaW5kXG4gICAgICAgICAgY2FzZSA2OiByZXR1cm4gaW5kZXg7ICAgICAgICAgICAgLy8gZmluZEluZGV4XG4gICAgICAgICAgY2FzZSAyOiByZXN1bHQucHVzaCh2YWwpOyAgICAgICAgLy8gZmlsdGVyXG4gICAgICAgIH0gZWxzZSBpZiAoSVNfRVZFUlkpIHJldHVybiBmYWxzZTsgLy8gZXZlcnlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIElTX0ZJTkRfSU5ERVggPyAtMSA6IElTX1NPTUUgfHwgSVNfRVZFUlkgPyBJU19FVkVSWSA6IHJlc3VsdDtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LW1ldGhvZHMuanNcbi8vIG1vZHVsZSBpZCA9IDExOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4vX2lzLWFycmF5Jyk7XG52YXIgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9yaWdpbmFsKSB7XG4gIHZhciBDO1xuICBpZiAoaXNBcnJheShvcmlnaW5hbCkpIHtcbiAgICBDID0gb3JpZ2luYWwuY29uc3RydWN0b3I7XG4gICAgLy8gY3Jvc3MtcmVhbG0gZmFsbGJhY2tcbiAgICBpZiAodHlwZW9mIEMgPT0gJ2Z1bmN0aW9uJyAmJiAoQyA9PT0gQXJyYXkgfHwgaXNBcnJheShDLnByb3RvdHlwZSkpKSBDID0gdW5kZWZpbmVkO1xuICAgIGlmIChpc09iamVjdChDKSkge1xuICAgICAgQyA9IENbU1BFQ0lFU107XG4gICAgICBpZiAoQyA9PT0gbnVsbCkgQyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gcmV0dXJuIEMgPT09IHVuZGVmaW5lZCA/IEFycmF5IDogQztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LXNwZWNpZXMtY29uc3RydWN0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDExOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwiLy8gOS40LjIuMyBBcnJheVNwZWNpZXNDcmVhdGUob3JpZ2luYWxBcnJheSwgbGVuZ3RoKVxudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX2FycmF5LXNwZWNpZXMtY29uc3RydWN0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3JpZ2luYWwsIGxlbmd0aCkge1xuICByZXR1cm4gbmV3IChzcGVjaWVzQ29uc3RydWN0b3Iob3JpZ2luYWwpKShsZW5ndGgpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktc3BlY2llcy1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDEyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgaW5kZXgsIHZhbHVlKSB7XG4gIGlmIChpbmRleCBpbiBvYmplY3QpICRkZWZpbmVQcm9wZXJ0eS5mKG9iamVjdCwgaW5kZXgsIGNyZWF0ZURlc2MoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbaW5kZXhdID0gdmFsdWU7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jcmVhdGUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDEyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwiLy8gYWxsIGVudW1lcmFibGUgb2JqZWN0IGtleXMsIGluY2x1ZGVzIHN5bWJvbHNcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgcmVzdWx0ID0gZ2V0S2V5cyhpdCk7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICBpZiAoZ2V0U3ltYm9scykge1xuICAgIHZhciBzeW1ib2xzID0gZ2V0U3ltYm9scyhpdCk7XG4gICAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChzeW1ib2xzLmxlbmd0aCA+IGkpIGlmIChpc0VudW0uY2FsbChpdCwga2V5ID0gc3ltYm9sc1tpKytdKSkgcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIid1c2Ugc3RyaWN0JztcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyk7XG52YXIgZGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2hpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCkge1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KSB9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCIvLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24gKE8sIHByb3RvKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBpZiAoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCkgdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24gKHRlc3QsIGJ1Z2d5LCBzZXQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IHJlcXVpcmUoJy4vX2N0eCcpKEZ1bmN0aW9uLmNhbGwsIHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgc2V0KHRlc3QsIFtdKTtcbiAgICAgICAgYnVnZ3kgPSAhKHRlc3QgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgICB9IGNhdGNoIChlKSB7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKSB7XG4gICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgaWYgKGJ1Z2d5KSBPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICBlbHNlIHNldChPLCBwcm90byk7XG4gICAgICAgIHJldHVybiBPO1xuICAgICAgfTtcbiAgICB9KHt9LCBmYWxzZSkgOiB1bmRlZmluZWQpLFxuICBjaGVjazogY2hlY2tcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1wcm90by5qc1xuLy8gbW9kdWxlIGlkID0gMTI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoVE9fU1RSSU5HKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGhhdCwgcG9zKSB7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSk7XG4gICAgdmFyIGkgPSB0b0ludGVnZXIocG9zKTtcbiAgICB2YXIgbCA9IHMubGVuZ3RoO1xuICAgIHZhciBhLCBiO1xuICAgIGlmIChpIDwgMCB8fCBpID49IGwpIHJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanNcbi8vIG1vZHVsZSBpZCA9IDEyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJyk7XG52YXIgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGdldEl0ZXJGbiA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24gKGl0ZXIpIHsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZSAvKiAsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkICovKSB7XG4gICAgdmFyIE8gPSB0b09iamVjdChhcnJheUxpa2UpO1xuICAgIHZhciBDID0gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheTtcbiAgICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIG1hcGZuID0gYUxlbiA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG4gICAgdmFyIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGl0ZXJGbiA9IGdldEl0ZXJGbihPKTtcbiAgICB2YXIgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmIChtYXBwaW5nKSBtYXBmbiA9IGN0eChtYXBmbiwgYUxlbiA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQsIDIpO1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCBpdGVyYWJsZSBvciBpdCdzIGFycmF5IHdpdGggZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBzaW1wbGUgY2FzZVxuICAgIGlmIChpdGVyRm4gIT0gdW5kZWZpbmVkICYmICEoQyA9PSBBcnJheSAmJiBpc0FycmF5SXRlcihpdGVyRm4pKSkge1xuICAgICAgZm9yIChpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCByZXN1bHQgPSBuZXcgQygpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGluZGV4KyspIHtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgICBmb3IgKHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBtYXBmbihPW2luZGV4XSwgaW5kZXgpIDogT1tpbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5LmZyb20uanNcbi8vIG1vZHVsZSBpZCA9IDEyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKTtcbnZhciBzdGVwID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uIChpdGVyYXRlZCwga2luZCkge1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIga2luZCA9IHRoaXMuX2s7XG4gIHZhciBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYgKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKSB7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZiAoa2luZCA9PSAna2V5cycpIHJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYgKGtpbmQgPT0gJ3ZhbHVlcycpIHJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDEyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7IGNyZWF0ZTogcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHsgZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmYgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDEzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwiLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2dldE93blByb3BlcnR5RGVzY3JpcHRvcicsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KSB7XG4gICAgcmV0dXJuICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodG9JT2JqZWN0KGl0KSwga2V5KTtcbiAgfTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIi8vIDE5LjEuMi45IE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgJGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2dldFByb3RvdHlwZU9mJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YoaXQpIHtcbiAgICByZXR1cm4gJGdldFByb3RvdHlwZU9mKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDEzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwiLy8gMTkuMS4zLjE5IE9iamVjdC5zZXRQcm90b3R5cGVPZihPLCBwcm90bylcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHsgc2V0UHJvdG90eXBlT2Y6IHJlcXVpcmUoJy4vX3NldC1wcm90bycpLnNldCB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDEzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHN0cm9uZyA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24tc3Ryb25nJyk7XG52YXIgdmFsaWRhdGUgPSByZXF1aXJlKCcuL192YWxpZGF0ZS1jb2xsZWN0aW9uJyk7XG52YXIgU0VUID0gJ1NldCc7XG5cbi8vIDIzLjIgU2V0IE9iamVjdHNcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbicpKFNFVCwgZnVuY3Rpb24gKGdldCkge1xuICByZXR1cm4gZnVuY3Rpb24gU2V0KCkgeyByZXR1cm4gZ2V0KHRoaXMsIGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTsgfTtcbn0sIHtcbiAgLy8gMjMuMi4zLjEgU2V0LnByb3RvdHlwZS5hZGQodmFsdWUpXG4gIGFkZDogZnVuY3Rpb24gYWRkKHZhbHVlKSB7XG4gICAgcmV0dXJuIHN0cm9uZy5kZWYodmFsaWRhdGUodGhpcywgU0VUKSwgdmFsdWUgPSB2YWx1ZSA9PT0gMCA/IDAgOiB2YWx1ZSwgdmFsdWUpO1xuICB9XG59LCBzdHJvbmcpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zZXQuanNcbi8vIG1vZHVsZSBpZCA9IDEzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwiJ3VzZSBzdHJpY3QnO1xuLy8gRUNNQVNjcmlwdCA2IHN5bWJvbHMgc2hpbVxudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIE1FVEEgPSByZXF1aXJlKCcuL19tZXRhJykuS0VZO1xudmFyICRmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xudmFyIHdrcyA9IHJlcXVpcmUoJy4vX3drcycpO1xudmFyIHdrc0V4dCA9IHJlcXVpcmUoJy4vX3drcy1leHQnKTtcbnZhciB3a3NEZWZpbmUgPSByZXF1aXJlKCcuL193a3MtZGVmaW5lJyk7XG52YXIgZW51bUtleXMgPSByZXF1aXJlKCcuL19lbnVtLWtleXMnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi9faXMtYXJyYXknKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG52YXIgX2NyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciBnT1BORXh0ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4tZXh0Jyk7XG52YXIgJEdPUEQgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpO1xudmFyICREUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BEID0gJEdPUEQuZjtcbnZhciBkUCA9ICREUC5mO1xudmFyIGdPUE4gPSBnT1BORXh0LmY7XG52YXIgJFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgJEpTT04gPSBnbG9iYWwuSlNPTjtcbnZhciBfc3RyaW5naWZ5ID0gJEpTT04gJiYgJEpTT04uc3RyaW5naWZ5O1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xudmFyIEhJRERFTiA9IHdrcygnX2hpZGRlbicpO1xudmFyIFRPX1BSSU1JVElWRSA9IHdrcygndG9QcmltaXRpdmUnKTtcbnZhciBpc0VudW0gPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbnZhciBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5Jyk7XG52YXIgQWxsU3ltYm9scyA9IHNoYXJlZCgnc3ltYm9scycpO1xudmFyIE9QU3ltYm9scyA9IHNoYXJlZCgnb3Atc3ltYm9scycpO1xudmFyIE9iamVjdFByb3RvID0gT2JqZWN0W1BST1RPVFlQRV07XG52YXIgVVNFX05BVElWRSA9IHR5cGVvZiAkU3ltYm9sID09ICdmdW5jdGlvbic7XG52YXIgUU9iamVjdCA9IGdsb2JhbC5RT2JqZWN0O1xuLy8gRG9uJ3QgdXNlIHNldHRlcnMgaW4gUXQgU2NyaXB0LCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTczXG52YXIgc2V0dGVyID0gIVFPYmplY3QgfHwgIVFPYmplY3RbUFJPVE9UWVBFXSB8fCAhUU9iamVjdFtQUk9UT1RZUEVdLmZpbmRDaGlsZDtcblxuLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Njg3XG52YXIgc2V0U3ltYm9sRGVzYyA9IERFU0NSSVBUT1JTICYmICRmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBfY3JlYXRlKGRQKHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRQKHRoaXMsICdhJywgeyB2YWx1ZTogNyB9KS5hOyB9XG4gIH0pKS5hICE9IDc7XG59KSA/IGZ1bmN0aW9uIChpdCwga2V5LCBEKSB7XG4gIHZhciBwcm90b0Rlc2MgPSBnT1BEKE9iamVjdFByb3RvLCBrZXkpO1xuICBpZiAocHJvdG9EZXNjKSBkZWxldGUgT2JqZWN0UHJvdG9ba2V5XTtcbiAgZFAoaXQsIGtleSwgRCk7XG4gIGlmIChwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKSBkUChPYmplY3RQcm90bywga2V5LCBwcm90b0Rlc2MpO1xufSA6IGRQO1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgdmFyIHN5bSA9IEFsbFN5bWJvbHNbdGFnXSA9IF9jcmVhdGUoJFN5bWJvbFtQUk9UT1RZUEVdKTtcbiAgc3ltLl9rID0gdGFnO1xuICByZXR1cm4gc3ltO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX05BVElWRSAmJiB0eXBlb2YgJFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJyA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgaW5zdGFuY2VvZiAkU3ltYm9sO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIEQpIHtcbiAgaWYgKGl0ID09PSBPYmplY3RQcm90bykgJGRlZmluZVByb3BlcnR5KE9QU3ltYm9scywga2V5LCBEKTtcbiAgYW5PYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBhbk9iamVjdChEKTtcbiAgaWYgKGhhcyhBbGxTeW1ib2xzLCBrZXkpKSB7XG4gICAgaWYgKCFELmVudW1lcmFibGUpIHtcbiAgICAgIGlmICghaGFzKGl0LCBISURERU4pKSBkUChpdCwgSElEREVOLCBjcmVhdGVEZXNjKDEsIHt9KSk7XG4gICAgICBpdFtISURERU5dW2tleV0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkgaXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gX2NyZWF0ZShELCB7IGVudW1lcmFibGU6IGNyZWF0ZURlc2MoMCwgZmFsc2UpIH0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2MoaXQsIGtleSwgRCk7XG4gIH0gcmV0dXJuIGRQKGl0LCBrZXksIEQpO1xufTtcbnZhciAkZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoaXQsIFApIHtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpO1xuICB2YXIgaSA9IDA7XG4gIHZhciBsID0ga2V5cy5sZW5ndGg7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChsID4gaSkgJGRlZmluZVByb3BlcnR5KGl0LCBrZXkgPSBrZXlzW2krK10sIFBba2V5XSk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgJGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpdCwgUCkge1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSkge1xuICB2YXIgRSA9IGlzRW51bS5jYWxsKHRoaXMsIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSkpO1xuICBpZiAodGhpcyA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XSA/IEUgOiB0cnVlO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpIHtcbiAgaXQgPSB0b0lPYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBpZiAoaXQgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKSByZXR1cm47XG4gIHZhciBEID0gZ09QRChpdCwga2V5KTtcbiAgaWYgKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSkgRC5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgcmV0dXJuIEQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCkge1xuICB2YXIgbmFtZXMgPSBnT1BOKHRvSU9iamVjdChpdCkpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBpID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIHtcbiAgICBpZiAoIWhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiBrZXkgIT0gSElEREVOICYmIGtleSAhPSBNRVRBKSByZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpIHtcbiAgdmFyIElTX09QID0gaXQgPT09IE9iamVjdFByb3RvO1xuICB2YXIgbmFtZXMgPSBnT1BOKElTX09QID8gT1BTeW1ib2xzIDogdG9JT2JqZWN0KGl0KSk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGkgPSAwO1xuICB2YXIga2V5O1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkge1xuICAgIGlmIChoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYgKElTX09QID8gaGFzKE9iamVjdFByb3RvLCBrZXkpIDogdHJ1ZSkpIHJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vIDE5LjQuMS4xIFN5bWJvbChbZGVzY3JpcHRpb25dKVxuaWYgKCFVU0VfTkFUSVZFKSB7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKSB0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvciEnKTtcbiAgICB2YXIgdGFnID0gdWlkKGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTtcbiAgICB2YXIgJHNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHRoaXMgPT09IE9iamVjdFByb3RvKSAkc2V0LmNhbGwoT1BTeW1ib2xzLCB2YWx1ZSk7XG4gICAgICBpZiAoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSkgdGhpc1tISURERU5dW3RhZ10gPSBmYWxzZTtcbiAgICAgIHNldFN5bWJvbERlc2ModGhpcywgdGFnLCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG4gICAgfTtcbiAgICBpZiAoREVTQ1JJUFRPUlMgJiYgc2V0dGVyKSBzZXRTeW1ib2xEZXNjKE9iamVjdFByb3RvLCB0YWcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCBzZXQ6ICRzZXQgfSk7XG4gICAgcmV0dXJuIHdyYXAodGFnKTtcbiAgfTtcbiAgcmVkZWZpbmUoJFN5bWJvbFtQUk9UT1RZUEVdLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgJEdPUEQuZiA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICREUC5mID0gJGRlZmluZVByb3BlcnR5O1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmYgPSBnT1BORXh0LmYgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpLmYgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJykuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYgKERFU0NSSVBUT1JTICYmICFyZXF1aXJlKCcuL19saWJyYXJ5JykpIHtcbiAgICByZWRlZmluZShPYmplY3RQcm90bywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJHByb3BlcnR5SXNFbnVtZXJhYmxlLCB0cnVlKTtcbiAgfVxuXG4gIHdrc0V4dC5mID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gd3JhcCh3a3MobmFtZSkpO1xuICB9O1xufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7IFN5bWJvbDogJFN5bWJvbCB9KTtcblxuZm9yICh2YXIgZXM2U3ltYm9scyA9IChcbiAgLy8gMTkuNC4yLjIsIDE5LjQuMi4zLCAxOS40LjIuNCwgMTkuNC4yLjYsIDE5LjQuMi44LCAxOS40LjIuOSwgMTkuNC4yLjEwLCAxOS40LjIuMTEsIDE5LjQuMi4xMiwgMTkuNC4yLjEzLCAxOS40LjIuMTRcbiAgJ2hhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCxzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xuKS5zcGxpdCgnLCcpLCBqID0gMDsgZXM2U3ltYm9scy5sZW5ndGggPiBqOyl3a3MoZXM2U3ltYm9sc1tqKytdKTtcblxuZm9yICh2YXIgd2VsbEtub3duU3ltYm9scyA9ICRrZXlzKHdrcy5zdG9yZSksIGsgPSAwOyB3ZWxsS25vd25TeW1ib2xzLmxlbmd0aCA+IGs7KSB3a3NEZWZpbmUod2VsbEtub3duU3ltYm9sc1trKytdKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ1N5bWJvbCcsIHtcbiAgLy8gMTkuNC4yLjEgU3ltYm9sLmZvcihrZXkpXG4gICdmb3InOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIGhhcyhTeW1ib2xSZWdpc3RyeSwga2V5ICs9ICcnKVxuICAgICAgPyBTeW1ib2xSZWdpc3RyeVtrZXldXG4gICAgICA6IFN5bWJvbFJlZ2lzdHJ5W2tleV0gPSAkU3ltYm9sKGtleSk7XG4gIH0sXG4gIC8vIDE5LjQuMi41IFN5bWJvbC5rZXlGb3Ioc3ltKVxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihzeW0pIHtcbiAgICBpZiAoIWlzU3ltYm9sKHN5bSkpIHRocm93IFR5cGVFcnJvcihzeW0gKyAnIGlzIG5vdCBhIHN5bWJvbCEnKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gU3ltYm9sUmVnaXN0cnkpIGlmIChTeW1ib2xSZWdpc3RyeVtrZXldID09PSBzeW0pIHJldHVybiBrZXk7XG4gIH0sXG4gIHVzZVNldHRlcjogZnVuY3Rpb24gKCkgeyBzZXR0ZXIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uICgpIHsgc2V0dGVyID0gZmFsc2U7IH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghVVNFX05BVElWRSB8fCAkZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgUyA9ICRTeW1ib2woKTtcbiAgLy8gTVMgRWRnZSBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMge31cbiAgLy8gV2ViS2l0IGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyBudWxsXG4gIC8vIFY4IHRocm93cyBvbiBib3hlZCBzeW1ib2xzXG4gIHJldHVybiBfc3RyaW5naWZ5KFtTXSkgIT0gJ1tudWxsXScgfHwgX3N0cmluZ2lmeSh7IGE6IFMgfSkgIT0gJ3t9JyB8fCBfc3RyaW5naWZ5KE9iamVjdChTKSkgIT0gJ3t9Jztcbn0pKSwgJ0pTT04nLCB7XG4gIHN0cmluZ2lmeTogZnVuY3Rpb24gc3RyaW5naWZ5KGl0KSB7XG4gICAgaWYgKGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKSByZXR1cm47IC8vIElFOCByZXR1cm5zIHN0cmluZyBvbiB1bmRlZmluZWRcbiAgICB2YXIgYXJncyA9IFtpdF07XG4gICAgdmFyIGkgPSAxO1xuICAgIHZhciByZXBsYWNlciwgJHJlcGxhY2VyO1xuICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaSkgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICByZXBsYWNlciA9IGFyZ3NbMV07XG4gICAgaWYgKHR5cGVvZiByZXBsYWNlciA9PSAnZnVuY3Rpb24nKSAkcmVwbGFjZXIgPSByZXBsYWNlcjtcbiAgICBpZiAoJHJlcGxhY2VyIHx8ICFpc0FycmF5KHJlcGxhY2VyKSkgcmVwbGFjZXIgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKCRyZXBsYWNlcikgdmFsdWUgPSAkcmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgIGlmICghaXNTeW1ib2wodmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gICAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xuICB9XG59KTtcblxuLy8gMTkuNC4zLjQgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXShoaW50KVxuJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0gfHwgcmVxdWlyZSgnLi9faGlkZScpKCRTeW1ib2xbUFJPVE9UWVBFXSwgVE9fUFJJTUlUSVZFLCAkU3ltYm9sW1BST1RPVFlQRV0udmFsdWVPZik7XG4vLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCAnU3ltYm9sJyk7XG4vLyAyMC4yLjEuOSBNYXRoW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhNYXRoLCAnTWF0aCcsIHRydWUpO1xuLy8gMjQuMy4zIEpTT05bQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLCAnSlNPTicsIHRydWUpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zeW1ib2wuanNcbi8vIG1vZHVsZSBpZCA9IDEzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwiLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9wcm9wb3NhbC1zZXRtYXAtb2Zmcm9tLyNzZWMtc2V0LmZyb21cbnJlcXVpcmUoJy4vX3NldC1jb2xsZWN0aW9uLWZyb20nKSgnU2V0Jyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnNldC5mcm9tLmpzXG4vLyBtb2R1bGUgaWQgPSAxMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vcHJvcG9zYWwtc2V0bWFwLW9mZnJvbS8jc2VjLXNldC5vZlxucmVxdWlyZSgnLi9fc2V0LWNvbGxlY3Rpb24tb2YnKSgnU2V0Jyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnNldC5vZi5qc1xuLy8gbW9kdWxlIGlkID0gMTM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vRGF2aWRCcnVhbnQvTWFwLVNldC5wcm90b3R5cGUudG9KU09OXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuUiwgJ1NldCcsIHsgdG9KU09OOiByZXF1aXJlKCcuL19jb2xsZWN0aW9uLXRvLWpzb24nKSgnU2V0JykgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnNldC50by1qc29uLmpzXG4vLyBtb2R1bGUgaWQgPSAxMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnYXN5bmNJdGVyYXRvcicpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDEzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IiwicmVxdWlyZSgnLi9fd2tzLWRlZmluZScpKCdvYnNlcnZhYmxlJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgYXJnQ2hlY2sgZnJvbSAnY29tbW9uL2FyZ0NoZWNrJ1xuXG5pbXBvcnQge0NvbmZpZ3VyYXRpb25EYXRhfSBmcm9tICdjb25mZXJlbmNlL3JhZnRDb25maWd1cmF0aW9uJ1xuaW1wb3J0IExvZ0VudHJ5IGZyb20gJ2NvbmZlcmVuY2UvcmFmdExvZ0VudHJ5J1xuaW1wb3J0IHtQZWVyVG9wb2xvZ3lJbmZvfSBmcm9tICdjb25mZXJlbmNlL21lc2hUb3BvbG9neSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFmdE1lc3NhZ2Uge1xuICBzdGF0aWMgcGFyc2UoYm9keSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShib2R5KSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmFmdE1lc3NhZ2UgYm9keSBtdXN0IGJlIGFuIGFycmF5JylcbiAgICB9XG4gICAgbGV0IFtpZCwgLi4ucGFyYW1zXSA9IGJvZHlcbiAgICBsZXQgTWVzc2FnZUNvbnN0cnVjdG9yID0gbWVzc2FnZUNvbnN0cnVjdG9yc1tpZF1cbiAgICBpZiAoIU1lc3NhZ2VDb25zdHJ1Y3Rvcikge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRmFpbGVkIHRvIHBhcnNlIGludmFsaWQgcmFmdCBtZXNzYWdlLCB1bmtub3duIGlkOiAke2lkfWApXG4gICAgfVxuICAgIHJldHVybiBuZXcgTWVzc2FnZUNvbnN0cnVjdG9yKC4uLnBhcmFtcylcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHRlcm0pIHtcbiAgICB0aGlzLl90ZXJtID0gYXJnQ2hlY2subnVtYmVyKHRoaXMsICd0ZXJtJywgdGVybSlcbiAgfVxuXG4gIGdldCB0ZXJtKCkge1xuICAgIHJldHVybiB0aGlzLl90ZXJtXG4gIH1cblxuICBnZXQgaXNSZXF1ZXN0KCkge1xuICAgIHJldHVybiAhKHRoaXMuY29uc3RydWN0b3IuaWQgJiAxKVxuICB9XG5cbiAgdG9KU09OKCkge1xuICAgIHJldHVybiBbdGhpcy5jb25zdHJ1Y3Rvci5pZCwgLi4udGhpcy5wYXJhbXNdXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFwcGVuZEVudHJpZXNSZXF1ZXN0IGV4dGVuZHMgUmFmdE1lc3NhZ2Uge1xuICBzdGF0aWMgY3JlYXRlKHt0ZXJtLCB0b3BvbG9neUluZGV4LCBwcmV2SW5kZXgsIHByZXZUZXJtLCBjb21taXRJbmRleCwgZW50cmllc30pIHtcbiAgICByZXR1cm4gbmV3IEFwcGVuZEVudHJpZXNSZXF1ZXN0KHRlcm0sIHRvcG9sb2d5SW5kZXgsIHByZXZJbmRleCwgcHJldlRlcm0sIGNvbW1pdEluZGV4LCBlbnRyaWVzKVxuICB9XG5cbiAgY29uc3RydWN0b3IodGVybSwgdG9wb2xvZ3lJbmRleCwgcHJldkluZGV4LCBwcmV2VGVybSwgY29tbWl0SW5kZXgsIGVudHJpZXMpIHtcbiAgICBzdXBlcih0ZXJtKVxuICAgIHRoaXMuX3RvcG9sb2d5SW5kZXggPSBhcmdDaGVjay5udW1iZXIodGhpcywgJ3RvcG9sb2d5SW5kZXgnLCB0b3BvbG9neUluZGV4KVxuICAgIHRoaXMuX3ByZXZJbmRleCA9IGFyZ0NoZWNrLm51bWJlcih0aGlzLCAncHJldkluZGV4JywgcHJldkluZGV4KVxuICAgIHRoaXMuX3ByZXZUZXJtID0gYXJnQ2hlY2subnVtYmVyKHRoaXMsICdwcmV2VGVybScsIHByZXZUZXJtKVxuICAgIHRoaXMuX2NvbW1pdEluZGV4ID0gYXJnQ2hlY2subnVtYmVyKHRoaXMsICdjb21taXRJbmRleCcsIGNvbW1pdEluZGV4KVxuICAgIHRoaXMuX2VudHJpZXMgPSBlbnRyaWVzLm1hcCgoZW50cnksIGluZGV4KSA9PiB7XG4gICAgICBsZXQgZW50cnlJbmRleCA9IHRoaXMuX3ByZXZJbmRleCArIGluZGV4ICsgMVxuICAgICAgZW50cnkgPSAoZW50cnkgaW5zdGFuY2VvZiBMb2dFbnRyeSkgPyBlbnRyeSA6IExvZ0VudHJ5LnBhcnNlKGVudHJ5LCBlbnRyeUluZGV4KVxuICAgICAgYXJnQ2hlY2subnVtYmVyKHRoaXMsICdlbnRyeS50ZXJtJywgZW50cnkudGVybSlcbiAgICAgIHJldHVybiBlbnRyeVxuICAgIH0pXG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gJ2FwcGVuZFJlcXVlc3R7JyArXG4gICAgICBgdGVybT0ke3RoaXMudGVybX0sdGk9JHt0aGlzLl90b3BvbG9neUluZGV4fSxgICtcbiAgICAgIGBwaT0ke3RoaXMuX3ByZXZJbmRleH0scHQ9JHt0aGlzLl9wcmV2VGVybX0sYCArXG4gICAgICBgY2k9JHt0aGlzLl9jb21taXRJbmRleH0sZXM9WyR7dGhpcy5fZW50cmllc31dfWBcbiAgfVxuXG4gIGdldCBwYXJhbXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHRoaXMuX3Rlcm0sXG4gICAgICB0aGlzLl90b3BvbG9neUluZGV4LFxuICAgICAgdGhpcy5fcHJldkluZGV4LFxuICAgICAgdGhpcy5fcHJldlRlcm0sXG4gICAgICB0aGlzLl9jb21taXRJbmRleCxcbiAgICAgIHRoaXMuX2VudHJpZXMsXG4gICAgXVxuICB9XG5cbiAgLy8gdG9wb2xvZ3lJbmRleCBpcyBhbiBhZGRpdGlvbiB0byB0aGUgUmFmdCBhbGdvcml0aG0uIFRoZSBwdXJwb3NlIGlzIGZvciB0aGUgbGVhZGVyXG4gIC8vIHRvIGdldCBhIGNvbXBsZXRlIHZpZXcgb2YgdGhlIHRvcG9sb2d5IG9mIHRoZSBjbHVzdGVyLCB3aGlsZSBrZWVwaW5nIG5ldHdvcmsgdXNlIGxvdy5cbiAgLy8gRWFjaCBtZW1iZXIgd2lsbCBzZW5kIGluZm9ybWF0aW9uIGFib3V0IHRoZWlyIGFjdGl2ZSBjb25uZWN0aW9ucyBpbiB0aGUgQXBwZW5kRW50cmllc1xuICAvLyByZXNwb25zZSwgYnV0IG9ubHkgaWYgdGhlIHJlY2VpdmVkIHRvcG9sb2d5IGluZGV4IGlzIGxvd2VyIHRoYW4gdGhlaXIgb3duIG9uZS5cbiAgLy9cbiAgLy8gRm9sbG93ZXJzIHdpbGwgaW5jcmVtZW50IHRoZWlyIHRvcG9sb2d5SW5kZXggd2hlbmV2ZXIgYSBzaWduaWZpY2FudCBjaGFuZ2UgaXMgbWFkZSB0b1xuICAvLyB0aGVpciBhY3RpdmUgY29ubmVjdGlvbnMsIGUuZy4gYWRkZWQgYW5kIHJlbW92ZWQgY29ubmVjdGlvbnMsIGFzIHdlbGwgYXMgY2hhbmdlcyBpblxuICAvLyBsYXRlbmN5IG9yIGJhbmR3aWR0aC4gVGhlIGluaXRpYWwgaW1wbGVtZW50YXRpb24gd2lsbCBvbmx5IHRha2UgYWRkZWQgYW5kIHJlbW92ZWRcbiAgLy8gY29ubmVjdGlvbnMgaW50byBhY2NvdW50LCBhbmQgdXNlIGEgdGltZW91dCB0byBtYWtlIHN1cmUgcmVsYXRpdmVseSB1cC10by1kYXRlIG5ldHdvcmtcbiAgLy8gaW5mb3JtYXRpb24gaXMgdHJhbnNtaXR0ZWQuIFRoZSBkb3duc2lkZSBpcyB0aGF0IGl0IHdpbGwgcmVxdWlyZSBzbGlnaHRseSBtb3JlIGJhbmR3aWR0aCxcbiAgLy8gYW5kIHRoYXQgYml0IGNoYW5nZXMgaW4gbmV0d29yayBjaGFyYWN0ZXJpc3RpY3Mgd29uJ3QgYmUgZGV0ZWN0ZWQgYXMgcXVpY2tseSBieSB0aGUgbGVhZGVyLlxuICAvL1xuICAvLyBKdXN0IGxpa2UgdGVybXMgYW5kIGxvZyBpbmRpY2VzLCB0aGUgdG9wb2xvZ3kgaW5kZXggaXMgYW4gaW50ZWdlciB0aGF0IGlzIGFsd2F5c1xuICAvLyBpbmNyZW1lbnRlZCBkdXJpbmcgbm9ybWFsIG9wZXJhdGlvbi4gVGhlIGZvbGxvd2VyIGluY3JlbWVudHMgaXQgYXMgZGlzY3Vzc2VkIGFib3ZlXG4gIC8vIGFuZCB0aGUgbGVhZGVyIGluY3JlbWVudHMgdGhlaXIgdG9wb2xvZ3lJbmRleCBhcyB1cGRhdGVzIGFyZSByZWNlaXZlZCBmcm9tIHRoZSBmb2xsb3dlci5cbiAgLy8gSnVzdCBsaWtlIHRoZSBtYXRjaEluZGV4IHRoZSBsZWFkZXIga2VlcHMgdHJhY2sgb2YgdGhlIHJlbW90ZSB0b3BvbG9neUluZGV4IHNlcGFyYXRlbHlcbiAgLy8gZm9yIGVhY2ggY2x1c3RlciBtZW1iZXIuXG4gIC8vXG4gIC8vIE5ldyBsZWFkZXJzIHdpbGwgdXNlIGEgdG9wb2xvZ3lJbmRleCBvZiAwIGluIHRoZSBmaXJzdCBhcHBlbmRFbnRyaWVzIHJlcXVlc3Qgc2VudCB0b1xuICAvLyBhbGwgbWVtYmVycyB3aGVuIHRoZXkgZ2V0IGVsZWN0ZWQsIGFuZCB0aGUgZm9sbG93ZXJzIHdpbGwgdGhlbiBhbHdheXMgcmVzcG9uZCB3aXRoIHRoZWlyXG4gIC8vIGN1cnJlbnQgY29ubmVjdGlvbiBzdGF0ZSBhbmQgdG9wb2xvZ3lJbmRleC5cbiAgZ2V0IHRvcG9sb2d5SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RvcG9sb2d5SW5kZXhcbiAgfVxuXG4gIGdldCBwcmV2SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ByZXZJbmRleFxuICB9XG5cbiAgZ2V0IHByZXZUZXJtKCkge1xuICAgIHJldHVybiB0aGlzLl9wcmV2VGVybVxuICB9XG5cbiAgZ2V0IGNvbW1pdEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLl9jb21taXRJbmRleFxuICB9XG5cbiAgZ2V0IGVudHJpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VudHJpZXNcbiAgfVxuXG4gIHJlc3BvbnNlKG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCB7XG4gICAgICB0ZXJtID0gdGhpcy5fdGVybSxcbiAgICAgIHN1Y2Nlc3MgPSBmYWxzZSxcbiAgICAgIG5lZWRTbmFwc2hvdCA9IGZhbHNlLFxuICAgICAgbWVzaFRvcG9sb2d5LFxuICAgICAgbWF0Y2hJbmRleCA9IHRoaXMuX3ByZXZJbmRleCAtIDEsXG4gICAgfSA9IG9wdGlvbnNcblxuICAgIGxldCBsb2NhbFRvcG9sb2d5SW5mbyA9IG1lc2hUb3BvbG9neSAmJiBtZXNoVG9wb2xvZ3kubG9jYWxUb3BvbG9neUluZm9cbiAgICB2YXIgdG9wb2xvZ3lJbmZvID0gbnVsbFxuICAgIGxldCB0b3BvbG9neUluZGV4ID0gbG9jYWxUb3BvbG9neUluZm8gJiYgbG9jYWxUb3BvbG9neUluZm8udG9wb2xvZ3lJbmRleFxuICAgIGlmICh0b3BvbG9neUluZGV4ID4gdGhpcy50b3BvbG9neUluZGV4KSB7XG4gICAgICB0b3BvbG9neUluZm8gPSBsb2NhbFRvcG9sb2d5SW5mb1xuICAgIH1cbiAgICBsZXQgdm9sdW1lID0gbG9jYWxUb3BvbG9neUluZm8gPyBsb2NhbFRvcG9sb2d5SW5mby52b2x1bWUgOiAwXG5cbiAgICB2YXIgZmxhZyA9IEFQUEVORF9FTlRSSUVTX1JFU1BPTlNFX0ZMQUdfU1VDQ0VTU1xuICAgIGlmICghc3VjY2Vzcykge1xuICAgICAgZmxhZyA9IEFQUEVORF9FTlRSSUVTX1JFU1BPTlNFX0ZMQUdfRkFJTFVSRVxuICAgIH1cbiAgICBpZiAobmVlZFNuYXBzaG90KSB7XG4gICAgICBmbGFnID0gQVBQRU5EX0VOVFJJRVNfUkVTUE9OU0VfRkxBR19ORUVEX1NOQVBTSE9UXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBcHBlbmRFbnRyaWVzUmVzcG9uc2UodGVybSwgZmxhZywgdG9wb2xvZ3lJbmRleCwgdG9wb2xvZ3lJbmZvLCB2b2x1bWUsIG1hdGNoSW5kZXgpXG4gIH1cbn1cblxuY29uc3QgQVBQRU5EX0VOVFJJRVNfUkVTUE9OU0VfRkxBR19TVUNDRVNTID0gMFxuY29uc3QgQVBQRU5EX0VOVFJJRVNfUkVTUE9OU0VfRkxBR19GQUlMVVJFID0gMVxuY29uc3QgQVBQRU5EX0VOVFJJRVNfUkVTUE9OU0VfRkxBR19ORUVEX1NOQVBTSE9UID0gMlxuXG5leHBvcnQgY2xhc3MgQXBwZW5kRW50cmllc1Jlc3BvbnNlIGV4dGVuZHMgUmFmdE1lc3NhZ2Uge1xuICBjb25zdHJ1Y3Rvcih0ZXJtLCBmbGFnLCB0b3BvbG9neUluZGV4ID0gLTEsIHRvcG9sb2d5SW5mbyA9IG51bGwsIHZvbHVtZSA9IDAsIG1hdGNoSW5kZXggPSAtMSkge1xuICAgIHN1cGVyKHRlcm0pXG4gICAgdGhpcy5fZmxhZyA9IGFyZ0NoZWNrLm51bWJlcih0aGlzLCAnZmxhZycsIGZsYWcpXG4gICAgdGhpcy5fdG9wb2xvZ3lJbmRleCA9IGFyZ0NoZWNrLm51bWJlcih0aGlzLCAndG9wb2xvZ3lJbmRleCcsIHRvcG9sb2d5SW5kZXgpXG4gICAgdGhpcy5fbWF0Y2hJbmRleCA9IGFyZ0NoZWNrLm51bWJlcih0aGlzLCAnbWF0Y2hJbmRleCcsIG1hdGNoSW5kZXgpXG4gICAgaWYgKHRvcG9sb2d5SW5mbykge1xuICAgICAgdGhpcy5fdG9wb2xvZ3lJbmZvID0gUGVlclRvcG9sb2d5SW5mby5wYXJzZVVwZGF0ZSh0b3BvbG9neUluZm8pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3RvcG9sb2d5SW5mbyA9IG51bGxcbiAgICB9XG4gICAgdGhpcy5fdm9sdW1lID0gdm9sdW1lXG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICB2YXIgdG9wb2xvZ3lJbmZvID0gbnVsbFxuICAgIGlmICh0aGlzLl90b3BvbG9neUluZm8pIHtcbiAgICAgIHRvcG9sb2d5SW5mbyA9IGB0b3BvbG9neUluZm97cG93ZXI9JHt0aGlzLl90b3BvbG9neUluZm8ucG93ZXJ9LCR7dGhpcy5fdG9wb2xvZ3lJbmZvLmxpbmtzfX1gXG4gICAgfVxuICAgIHJldHVybiAnYXBwZW5kUmVzcG9uc2V7JyArXG4gICAgICBgdGVybT0ke3RoaXMudGVybX0sZmxhZz0ke3RoaXMuX2ZsYWd9LG1pPSR7dGhpcy5fbWF0Y2hJbmRleH0sdj0ke3RoaXMuX3ZvbHVtZX0sYCArXG4gICAgICBgdGk9JHt0aGlzLl90b3BvbG9neUluZGV4fSwke3RvcG9sb2d5SW5mb319YFxuICB9XG5cbiAgZ2V0IHBhcmFtcygpIHtcbiAgICByZXR1cm4gW3RoaXMuX3Rlcm0sIHRoaXMuX2ZsYWcsIHRoaXMuX3RvcG9sb2d5SW5kZXgsIHRoaXMuX3RvcG9sb2d5SW5mbyB8fCAwLCB0aGlzLl92b2x1bWUgfHwgMCwgdGhpcy5fbWF0Y2hJbmRleF1cbiAgfVxuXG4gIGdldCBzdWNjZXNzKCkge1xuICAgIHJldHVybiB0aGlzLl9mbGFnID09PSBBUFBFTkRfRU5UUklFU19SRVNQT05TRV9GTEFHX1NVQ0NFU1NcbiAgfVxuXG4gIGdldCBuZWVkU25hcHNob3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZsYWcgPT09IEFQUEVORF9FTlRSSUVTX1JFU1BPTlNFX0ZMQUdfTkVFRF9TTkFQU0hPVFxuICB9XG5cbiAgZ2V0IHRvcG9sb2d5SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RvcG9sb2d5SW5kZXhcbiAgfVxuXG4gIGdldCB0b3BvbG9neUluZm8oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RvcG9sb2d5SW5mb1xuICB9XG5cbiAgZ2V0IG1hdGNoSW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21hdGNoSW5kZXhcbiAgfVxuXG4gIGdldCB2b2x1bWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZvbHVtZVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZXF1ZXN0Vm90ZVJlcXVlc3QgZXh0ZW5kcyBSYWZ0TWVzc2FnZSB7XG4gIHN0YXRpYyBjcmVhdGUoe3Rlcm0sIGxhc3RMb2dUZXJtLCBsYXN0TG9nSW5kZXh9KSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0Vm90ZVJlcXVlc3QodGVybSwgbGFzdExvZ1Rlcm0sIGxhc3RMb2dJbmRleClcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHRlcm0sIGxhc3RMb2dUZXJtLCBsYXN0TG9nSW5kZXgpIHtcbiAgICBzdXBlcih0ZXJtKVxuICAgIHRoaXMuX2xhc3RMb2dUZXJtID0gYXJnQ2hlY2subnVtYmVyKHRoaXMsICdsYXN0TG9nVGVybScsIGxhc3RMb2dUZXJtKVxuICAgIHRoaXMuX2xhc3RMb2dJbmRleCA9IGFyZ0NoZWNrLm51bWJlcih0aGlzLCAnbGFzdExvZ0luZGV4JywgbGFzdExvZ0luZGV4KVxuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGB2b3RlUmVxdWVzdHt0ZXJtPSR7dGhpcy50ZXJtfX1gXG4gIH1cblxuICBnZXQgcGFyYW1zKCkge1xuICAgIHJldHVybiBbdGhpcy5fdGVybSwgdGhpcy5fbGFzdExvZ1Rlcm0sIHRoaXMuX2xhc3RMb2dJbmRleF1cbiAgfVxuXG4gIGdldCBsYXN0TG9nVGVybSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGFzdExvZ1Rlcm1cbiAgfVxuXG4gIGdldCBsYXN0TG9nSW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xhc3RMb2dJbmRleFxuICB9XG5cbiAgY29tcGFyZUxvZyhvdGhlcikge1xuICAgIGxldCB7bGFzdExvZ1Rlcm19ID0gb3RoZXJcbiAgICBpZiAodGhpcy5sYXN0TG9nVGVybSAhPT0gbGFzdExvZ1Rlcm0pIHtcbiAgICAgIHJldHVybiB0aGlzLmxhc3RMb2dUZXJtIC0gbGFzdExvZ1Rlcm1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMubGFzdExvZ0luZGV4IC0gb3RoZXIubGFzdExvZ0luZGV4XG4gICAgfVxuICB9XG5cbiAgcmVzcG9uc2Uoe2dyYW50ZWQgPSBmYWxzZX0pIHtcbiAgICByZXR1cm4gbmV3IFJlcXVlc3RWb3RlUmVzcG9uc2UodGhpcy5fdGVybSwgZ3JhbnRlZClcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVxdWVzdFZvdGVSZXNwb25zZSBleHRlbmRzIFJhZnRNZXNzYWdlIHtcbiAgY29uc3RydWN0b3IodGVybSwgZ3JhbnRlZCkge1xuICAgIHN1cGVyKHRlcm0pXG4gICAgdGhpcy5fZ3JhbnRlZCA9IGFyZ0NoZWNrLmJvb2xlYW4odGhpcywgJ2dyYW50ZWQnLCBncmFudGVkKVxuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGB2b3RlUmVzcG9uc2V7dGVybT0ke3RoaXMudGVybX0sZ3JhbnRlZD0ke3RoaXMuZ3JhbnRlZH19YFxuICB9XG5cbiAgZ2V0IHBhcmFtcygpIHtcbiAgICByZXR1cm4gW3RoaXMuX3Rlcm0sIHRoaXMuX2dyYW50ZWRdXG4gIH1cblxuICBnZXQgZ3JhbnRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZ3JhbnRlZFxuICB9XG59XG5cbi8vIFByZVZvdGUgUlBDIGlzIGFuIGV4dGVuc2lvbiBmb3IgdGhlIFJhZnQgYWxnb3JpdGhtIHRoYXQgbGV0cyBsb3ctcG9wdWxhdGlvblxuLy8gY2x1c3RlcnMgZmluZCBhIGxlYWRlciBmYXN0ZXIsIGFuZCBwcmV2ZW50cyBtYW55IGNhc2VzIG9mIGxlYWRlciBmbGlwLWZsb3BwaW5nLlxuLy9cbi8vIFRoZSBpbXBsZW1lbnRhdGlvbiBpcyBiYXNlZCBvbiB0aGUgc3VnZ2VzdGVkIG1vZGlmaWNhdGlvbnMgaW5cbi8vIFwiVGhyZWUgbW9kaWZpY2F0aW9ucyBmb3IgdGhlIFJhZnQgY29uc2Vuc3VzIGFsZ29yaXRobVwiIGJ5IEhlbnJpayBJbmdvXG4vLyBodHRwOi8vb3BlbmxpZmUuY2Mvc3lzdGVtL2ZpbGVzLzMtbW9kaWZpY2F0aW9ucy1mb3ItUmFmdC1jb25zZW5zdXMucGRmXG5leHBvcnQgY2xhc3MgUHJlVm90ZVJlcXVlc3QgZXh0ZW5kcyBSZXF1ZXN0Vm90ZVJlcXVlc3Qge1xuICBzdGF0aWMgY3JlYXRlKHt0ZXJtLCBsYXN0TG9nVGVybSwgbGFzdExvZ0luZGV4fSkge1xuICAgIHJldHVybiBuZXcgUHJlVm90ZVJlcXVlc3QodGVybSwgbGFzdExvZ1Rlcm0sIGxhc3RMb2dJbmRleClcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBgcHJlVm90ZVJlcXVlc3R7dGVybT0ke3RoaXMudGVybX19YFxuICB9XG5cbiAgcmVzcG9uc2Uoe2dyYW50ZWQgPSBmYWxzZX0pIHtcbiAgICByZXR1cm4gbmV3IFByZVZvdGVSZXNwb25zZSh0aGlzLl90ZXJtLCBncmFudGVkKVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcmVWb3RlUmVzcG9uc2UgZXh0ZW5kcyBSZXF1ZXN0Vm90ZVJlc3BvbnNlIHtcbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGBwcmVWb3RlUmVzcG9uc2V7dGVybT0ke3RoaXMudGVybX0sZ3JhbnRlZD0ke3RoaXMuZ3JhbnRlZH19YFxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTbmFwc2hvdFJlcXVlc3QgZXh0ZW5kcyBSYWZ0TWVzc2FnZSB7XG4gIHN0YXRpYyBjcmVhdGUoe3Rlcm0sIGxhc3RUZXJtLCBsYXN0SW5kZXgsIGNvbmZpZ3VyYXRpb24sIHN0YXRlfSkge1xuICAgIHJldHVybiBuZXcgU25hcHNob3RSZXF1ZXN0KHRlcm0sIGxhc3RUZXJtLCBsYXN0SW5kZXgsIGNvbmZpZ3VyYXRpb24sIHN0YXRlKVxuICB9XG5cbiAgY29uc3RydWN0b3IodGVybSwgbGFzdFRlcm0sIGxhc3RJbmRleCwgY29uZmlndXJhdGlvbiwgc3RhdGUpIHtcbiAgICBzdXBlcih0ZXJtKVxuICAgIHRoaXMuX2xhc3RUZXJtID0gYXJnQ2hlY2subnVtYmVyKHRoaXMsICdsYXN0VGVybScsIGxhc3RUZXJtKVxuICAgIHRoaXMuX2xhc3RJbmRleCA9IGFyZ0NoZWNrLm51bWJlcih0aGlzLCAnbGFzdEluZGV4JywgbGFzdEluZGV4KVxuICAgIGlmICghKGNvbmZpZ3VyYXRpb24gaW5zdGFuY2VvZiBDb25maWd1cmF0aW9uRGF0YSkpIHtcbiAgICAgIGNvbmZpZ3VyYXRpb24gPSBDb25maWd1cmF0aW9uRGF0YS5wYXJzZShjb25maWd1cmF0aW9uKVxuICAgIH1cbiAgICB0aGlzLl9jb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvblxuICAgIHRoaXMuX3N0YXRlID0gc3RhdGVcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBgc25hcHNob3RSZXF1ZXN0e3Rlcm09JHt0aGlzLnRlcm19LGxpPSR7dGhpcy5sYXN0SW5kZXh9LGx0PSR7dGhpcy5sYXN0VGVybX1gICtcbiAgICAgIGAsJHt0aGlzLmNvbmZpZ3VyYXRpb259LCR7SlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZSl9fWBcbiAgfVxuXG4gIGdldCBwYXJhbXMoKSB7XG4gICAgcmV0dXJuIFt0aGlzLl90ZXJtLCB0aGlzLl9sYXN0VGVybSwgdGhpcy5fbGFzdEluZGV4LCB0aGlzLl9jb25maWd1cmF0aW9uLCB0aGlzLl9zdGF0ZV1cbiAgfVxuXG4gIGdldCBsYXN0VGVybSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGFzdFRlcm1cbiAgfVxuXG4gIGdldCBsYXN0SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xhc3RJbmRleFxuICB9XG5cbiAgZ2V0IGNvbmZpZ3VyYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZ3VyYXRpb25cbiAgfVxuXG4gIGdldCBzdGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGVcbiAgfVxuXG4gIHJlc3BvbnNlKCkge1xuICAgIHJldHVybiBuZXcgU25hcHNob3RSZXNwb25zZSh0aGlzLl90ZXJtLCB0aGlzLl9sYXN0VGVybSwgdGhpcy5fbGFzdEluZGV4KVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTbmFwc2hvdFJlc3BvbnNlIGV4dGVuZHMgUmFmdE1lc3NhZ2Uge1xuICBjb25zdHJ1Y3Rvcih0ZXJtLCBsYXN0VGVybSwgbGFzdEluZGV4KSB7XG4gICAgc3VwZXIodGVybSlcbiAgICB0aGlzLl9sYXN0VGVybSA9IGFyZ0NoZWNrLm51bWJlcih0aGlzLCAnbGFzdFRlcm0nLCBsYXN0VGVybSlcbiAgICB0aGlzLl9sYXN0SW5kZXggPSBhcmdDaGVjay5udW1iZXIodGhpcywgJ2xhc3RJbmRleCcsIGxhc3RJbmRleClcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBgc25hcHNob3RSZXNwb25zZXt0ZXJtPSR7dGhpcy50ZXJtfSxsaT0ke3RoaXMubGFzdEluZGV4fSxsdD0ke3RoaXMubGFzdFRlcm19fWBcbiAgfVxuXG4gIGdldCBwYXJhbXMoKSB7XG4gICAgcmV0dXJuIFt0aGlzLl90ZXJtLCB0aGlzLl9sYXN0VGVybSwgdGhpcy5fbGFzdEluZGV4XVxuICB9XG5cbiAgZ2V0IGxhc3RUZXJtKCkge1xuICAgIHJldHVybiB0aGlzLl9sYXN0VGVybVxuICB9XG5cbiAgZ2V0IGxhc3RJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGFzdEluZGV4XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFN0YXRlT3BSZXF1ZXN0IGV4dGVuZHMgUmFmdE1lc3NhZ2Uge1xuICBzdGF0aWMgY3JlYXRlKHtpZCwgb3AsIGFyZ3N9KSB7XG4gICAgcmV0dXJuIG5ldyBTdGF0ZU9wUmVxdWVzdChpZCwgb3AsIGFyZ3MpXG4gIH1cblxuICBjb25zdHJ1Y3RvcihpZCwgb3AsIGFyZ3MpIHtcbiAgICBzdXBlcigwKVxuICAgIHRoaXMuX2lkID0gaWRcbiAgICB0aGlzLl9vcCA9IG9wXG4gICAgdGhpcy5fYXJncyA9IGFyZ3NcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBgc3RhdGVPcFJlcXVlc3R7aWQ9JHt0aGlzLl9pZH0sb3A9JHt0aGlzLl9vcH0sYXJncz0ke3RoaXMuX2FyZ3N9fWBcbiAgfVxuXG4gIGdldCBpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faWRcbiAgfVxuXG4gIGdldCBvcCgpIHtcbiAgICByZXR1cm4gdGhpcy5fb3BcbiAgfVxuXG4gIGdldCBhcmdzKCkge1xuICAgIHJldHVybiB0aGlzLl9hcmdzXG4gIH1cblxuICBnZXQgcGFyYW1zKCkge1xuICAgIHJldHVybiBbdGhpcy5faWQsIHRoaXMuX29wLCB0aGlzLl9hcmdzXVxuICB9XG5cbiAgcmVzcG9uc2Uoe2Vycm9yQ29kZSA9IDB9ID0ge30pIHtcbiAgICByZXR1cm4gbmV3IFN0YXRlT3BSZXNwb25zZSh0aGlzLl9pZCwgZXJyb3JDb2RlKVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTdGF0ZU9wUmVzcG9uc2UgZXh0ZW5kcyBSYWZ0TWVzc2FnZSB7XG4gIGNvbnN0cnVjdG9yKGlkLCBlcnJvckNvZGUpIHtcbiAgICBzdXBlcigwKVxuICAgIHRoaXMuX2lkID0gaWRcbiAgICB0aGlzLl9lcnJvckNvZGUgPSBlcnJvckNvZGVcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBgc3RhdGVPcFJlc3BvbnNle2lkPSR7dGhpcy5faWR9LGVycm9yQ29kZT0ke3RoaXMuX2Vycm9yQ29kZX19YFxuICB9XG5cbiAgZ2V0IGlkKCkge1xuICAgIHJldHVybiB0aGlzLl9pZFxuICB9XG5cbiAgZ2V0IGVycm9yQ29kZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZXJyb3JDb2RlXG4gIH1cblxuICBnZXQgcGFyYW1zKCkge1xuICAgIHJldHVybiBbdGhpcy5faWQsIHRoaXMuX2Vycm9yQ29kZV1cbiAgfVxufVxuU3RhdGVPcFJlc3BvbnNlLk5PVF9MRUFERVIgPSAxXG5cbkFwcGVuZEVudHJpZXNSZXF1ZXN0LmlkID0gMlxuQXBwZW5kRW50cmllc1Jlc3BvbnNlLmlkID0gM1xuUmVxdWVzdFZvdGVSZXF1ZXN0LmlkID0gNFxuUmVxdWVzdFZvdGVSZXNwb25zZS5pZCA9IDVcblByZVZvdGVSZXF1ZXN0LmlkID0gNlxuUHJlVm90ZVJlc3BvbnNlLmlkID0gN1xuU25hcHNob3RSZXF1ZXN0LmlkID0gOFxuU25hcHNob3RSZXNwb25zZS5pZCA9IDlcblN0YXRlT3BSZXF1ZXN0LmlkID0gMTBcblN0YXRlT3BSZXNwb25zZS5pZCA9IDExXG5cbmNvbnN0IG1lc3NhZ2VDb25zdHJ1Y3RvcnMgPSB7XG4gIDI6IEFwcGVuZEVudHJpZXNSZXF1ZXN0LFxuICAzOiBBcHBlbmRFbnRyaWVzUmVzcG9uc2UsXG4gIDQ6IFJlcXVlc3RWb3RlUmVxdWVzdCxcbiAgNTogUmVxdWVzdFZvdGVSZXNwb25zZSxcbiAgNjogUHJlVm90ZVJlcXVlc3QsXG4gIDc6IFByZVZvdGVSZXNwb25zZSxcbiAgODogU25hcHNob3RSZXF1ZXN0LFxuICA5OiBTbmFwc2hvdFJlc3BvbnNlLFxuICAxMDogU3RhdGVPcFJlcXVlc3QsXG4gIDExOiBTdGF0ZU9wUmVzcG9uc2UsXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGliL2NvbmZlcmVuY2UvcmFmdE1lc3NhZ2VzLmpzIiwicmVxdWlyZSgnLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm1hcCcpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcubWFwLnRvLWpzb24nKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3Lm1hcC5vZicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcubWFwLmZyb20nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9fY29yZScpLk1hcDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vbWFwLmpzXG4vLyBtb2R1bGUgaWQgPSAxNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmtleXM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYucHJvbWlzZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5Jyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5wcm9taXNlLnRyeScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL19jb3JlJykuUHJvbWlzZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZS5qc1xuLy8gbW9kdWxlIGlkID0gMTQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwiLy8gZmFzdCBhcHBseSwgaHR0cDovL2pzcGVyZi5sbmtpdC5jb20vZmFzdC1hcHBseS81XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgYXJncywgdGhhdCkge1xuICB2YXIgdW4gPSB0aGF0ID09PSB1bmRlZmluZWQ7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiB1biA/IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCk7XG4gICAgY2FzZSAxOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgY2FzZSA0OiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgfSByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJncyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pbnZva2UuanNcbi8vIG1vZHVsZSBpZCA9IDE0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBtYWNyb3Rhc2sgPSByZXF1aXJlKCcuL190YXNrJykuc2V0O1xudmFyIE9ic2VydmVyID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIFByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcbnZhciBpc05vZGUgPSByZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaGVhZCwgbGFzdCwgbm90aWZ5O1xuXG4gIHZhciBmbHVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcGFyZW50LCBmbjtcbiAgICBpZiAoaXNOb2RlICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpIHBhcmVudC5leGl0KCk7XG4gICAgd2hpbGUgKGhlYWQpIHtcbiAgICAgIGZuID0gaGVhZC5mbjtcbiAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgICB0cnkge1xuICAgICAgICBmbigpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoaGVhZCkgbm90aWZ5KCk7XG4gICAgICAgIGVsc2UgbGFzdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9IGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHBhcmVudCkgcGFyZW50LmVudGVyKCk7XG4gIH07XG5cbiAgLy8gTm9kZS5qc1xuICBpZiAoaXNOb2RlKSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gICAgfTtcbiAgLy8gYnJvd3NlcnMgd2l0aCBNdXRhdGlvbk9ic2VydmVyXG4gIH0gZWxzZSBpZiAoT2JzZXJ2ZXIpIHtcbiAgICB2YXIgdG9nZ2xlID0gdHJ1ZTtcbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICBuZXcgT2JzZXJ2ZXIoZmx1c2gpLm9ic2VydmUobm9kZSwgeyBjaGFyYWN0ZXJEYXRhOiB0cnVlIH0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIG5vZGUuZGF0YSA9IHRvZ2dsZSA9ICF0b2dnbGU7XG4gICAgfTtcbiAgLy8gZW52aXJvbm1lbnRzIHdpdGggbWF5YmUgbm9uLWNvbXBsZXRlbHkgY29ycmVjdCwgYnV0IGV4aXN0ZW50IFByb21pc2VcbiAgfSBlbHNlIGlmIChQcm9taXNlICYmIFByb21pc2UucmVzb2x2ZSkge1xuICAgIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvbWlzZS50aGVuKGZsdXNoKTtcbiAgICB9O1xuICAvLyBmb3Igb3RoZXIgZW52aXJvbm1lbnRzIC0gbWFjcm90YXNrIGJhc2VkIG9uOlxuICAvLyAtIHNldEltbWVkaWF0ZVxuICAvLyAtIE1lc3NhZ2VDaGFubmVsXG4gIC8vIC0gd2luZG93LnBvc3RNZXNzYWdcbiAgLy8gLSBvbnJlYWR5c3RhdGVjaGFuZ2VcbiAgLy8gLSBzZXRUaW1lb3V0XG4gIH0gZWxzZSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gc3RyYW5nZSBJRSArIHdlYnBhY2sgZGV2IHNlcnZlciBidWcgLSB1c2UgLmNhbGwoZ2xvYmFsKVxuICAgICAgbWFjcm90YXNrLmNhbGwoZ2xvYmFsLCBmbHVzaCk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoZm4pIHtcbiAgICB2YXIgdGFzayA9IHsgZm46IGZuLCBuZXh0OiB1bmRlZmluZWQgfTtcbiAgICBpZiAobGFzdCkgbGFzdC5uZXh0ID0gdGFzaztcbiAgICBpZiAoIWhlYWQpIHtcbiAgICAgIGhlYWQgPSB0YXNrO1xuICAgICAgbm90aWZ5KCk7XG4gICAgfSBsYXN0ID0gdGFzaztcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21pY3JvdGFzay5qc1xuLy8gbW9kdWxlIGlkID0gMTQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwiJ3VzZSBzdHJpY3QnO1xudmFyIHN0cm9uZyA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24tc3Ryb25nJyk7XG52YXIgdmFsaWRhdGUgPSByZXF1aXJlKCcuL192YWxpZGF0ZS1jb2xsZWN0aW9uJyk7XG52YXIgTUFQID0gJ01hcCc7XG5cbi8vIDIzLjEgTWFwIE9iamVjdHNcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbicpKE1BUCwgZnVuY3Rpb24gKGdldCkge1xuICByZXR1cm4gZnVuY3Rpb24gTWFwKCkgeyByZXR1cm4gZ2V0KHRoaXMsIGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTsgfTtcbn0sIHtcbiAgLy8gMjMuMS4zLjYgTWFwLnByb3RvdHlwZS5nZXQoa2V5KVxuICBnZXQ6IGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICB2YXIgZW50cnkgPSBzdHJvbmcuZ2V0RW50cnkodmFsaWRhdGUodGhpcywgTUFQKSwga2V5KTtcbiAgICByZXR1cm4gZW50cnkgJiYgZW50cnkudjtcbiAgfSxcbiAgLy8gMjMuMS4zLjkgTWFwLnByb3RvdHlwZS5zZXQoa2V5LCB2YWx1ZSlcbiAgc2V0OiBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSkge1xuICAgIHJldHVybiBzdHJvbmcuZGVmKHZhbGlkYXRlKHRoaXMsIE1BUCksIGtleSA9PT0gMCA/IDAgOiBrZXksIHZhbHVlKTtcbiAgfVxufSwgc3Ryb25nLCB0cnVlKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYubWFwLmpzXG4vLyBtb2R1bGUgaWQgPSAxNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQiLCIvLyAxOS4xLjIuMTQgT2JqZWN0LmtleXMoTylcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdrZXlzJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24ga2V5cyhpdCkge1xuICAgIHJldHVybiAka2V5cyh0b09iamVjdChpdCkpO1xuICB9O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKTtcbnZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciB0YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldDtcbnZhciBtaWNyb3Rhc2sgPSByZXF1aXJlKCcuL19taWNyb3Rhc2snKSgpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuL19wZXJmb3JtJyk7XG52YXIgcHJvbWlzZVJlc29sdmUgPSByZXF1aXJlKCcuL19wcm9taXNlLXJlc29sdmUnKTtcbnZhciBQUk9NSVNFID0gJ1Byb21pc2UnO1xudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyICRQcm9taXNlID0gZ2xvYmFsW1BST01JU0VdO1xudmFyIGlzTm9kZSA9IGNsYXNzb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xudmFyIGVtcHR5ID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIEludGVybmFsLCBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHksIE93blByb21pc2VDYXBhYmlsaXR5LCBXcmFwcGVyO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZjtcblxudmFyIFVTRV9OQVRJVkUgPSAhIWZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICAvLyBjb3JyZWN0IHN1YmNsYXNzaW5nIHdpdGggQEBzcGVjaWVzIHN1cHBvcnRcbiAgICB2YXIgcHJvbWlzZSA9ICRQcm9taXNlLnJlc29sdmUoMSk7XG4gICAgdmFyIEZha2VQcm9taXNlID0gKHByb21pc2UuY29uc3RydWN0b3IgPSB7fSlbcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKV0gPSBmdW5jdGlvbiAoZXhlYykge1xuICAgICAgZXhlYyhlbXB0eSwgZW1wdHkpO1xuICAgIH07XG4gICAgLy8gdW5oYW5kbGVkIHJlamVjdGlvbnMgdHJhY2tpbmcgc3VwcG9ydCwgTm9kZUpTIFByb21pc2Ugd2l0aG91dCBpdCBmYWlscyBAQHNwZWNpZXMgdGVzdFxuICAgIHJldHVybiAoaXNOb2RlIHx8IHR5cGVvZiBQcm9taXNlUmVqZWN0aW9uRXZlbnQgPT0gJ2Z1bmN0aW9uJykgJiYgcHJvbWlzZS50aGVuKGVtcHR5KSBpbnN0YW5jZW9mIEZha2VQcm9taXNlO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbn0oKTtcblxuLy8gaGVscGVyc1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHRoZW47XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgdHlwZW9mICh0aGVuID0gaXQudGhlbikgPT0gJ2Z1bmN0aW9uJyA/IHRoZW4gOiBmYWxzZTtcbn07XG52YXIgbm90aWZ5ID0gZnVuY3Rpb24gKHByb21pc2UsIGlzUmVqZWN0KSB7XG4gIGlmIChwcm9taXNlLl9uKSByZXR1cm47XG4gIHByb21pc2UuX24gPSB0cnVlO1xuICB2YXIgY2hhaW4gPSBwcm9taXNlLl9jO1xuICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3Y7XG4gICAgdmFyIG9rID0gcHJvbWlzZS5fcyA9PSAxO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcnVuID0gZnVuY3Rpb24gKHJlYWN0aW9uKSB7XG4gICAgICB2YXIgaGFuZGxlciA9IG9rID8gcmVhY3Rpb24ub2sgOiByZWFjdGlvbi5mYWlsO1xuICAgICAgdmFyIHJlc29sdmUgPSByZWFjdGlvbi5yZXNvbHZlO1xuICAgICAgdmFyIHJlamVjdCA9IHJlYWN0aW9uLnJlamVjdDtcbiAgICAgIHZhciBkb21haW4gPSByZWFjdGlvbi5kb21haW47XG4gICAgICB2YXIgcmVzdWx0LCB0aGVuO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgICAgICBpZiAoIW9rKSB7XG4gICAgICAgICAgICBpZiAocHJvbWlzZS5faCA9PSAyKSBvbkhhbmRsZVVuaGFuZGxlZChwcm9taXNlKTtcbiAgICAgICAgICAgIHByb21pc2UuX2ggPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaGFuZGxlciA9PT0gdHJ1ZSkgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZG9tYWluKSBkb21haW4uZW50ZXIoKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGhhbmRsZXIodmFsdWUpO1xuICAgICAgICAgICAgaWYgKGRvbWFpbikgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gcmVhY3Rpb24ucHJvbWlzZSkge1xuICAgICAgICAgICAgcmVqZWN0KFR5cGVFcnJvcignUHJvbWlzZS1jaGFpbiBjeWNsZScpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoZW4gPSBpc1RoZW5hYmxlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXN1bHQsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHJlamVjdCh2YWx1ZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJlamVjdChlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdoaWxlIChjaGFpbi5sZW5ndGggPiBpKSBydW4oY2hhaW5baSsrXSk7IC8vIHZhcmlhYmxlIGxlbmd0aCAtIGNhbid0IHVzZSBmb3JFYWNoXG4gICAgcHJvbWlzZS5fYyA9IFtdO1xuICAgIHByb21pc2UuX24gPSBmYWxzZTtcbiAgICBpZiAoaXNSZWplY3QgJiYgIXByb21pc2UuX2gpIG9uVW5oYW5kbGVkKHByb21pc2UpO1xuICB9KTtcbn07XG52YXIgb25VbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdjtcbiAgICB2YXIgdW5oYW5kbGVkID0gaXNVbmhhbmRsZWQocHJvbWlzZSk7XG4gICAgdmFyIHJlc3VsdCwgaGFuZGxlciwgY29uc29sZTtcbiAgICBpZiAodW5oYW5kbGVkKSB7XG4gICAgICByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGlzTm9kZSkge1xuICAgICAgICAgIHByb2Nlc3MuZW1pdCgndW5oYW5kbGVkUmVqZWN0aW9uJywgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPSBnbG9iYWwub251bmhhbmRsZWRyZWplY3Rpb24pIHtcbiAgICAgICAgICBoYW5kbGVyKHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiB2YWx1ZSB9KTtcbiAgICAgICAgfSBlbHNlIGlmICgoY29uc29sZSA9IGdsb2JhbC5jb25zb2xlKSAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIEJyb3dzZXJzIHNob3VsZCBub3QgdHJpZ2dlciBgcmVqZWN0aW9uSGFuZGxlZGAgZXZlbnQgaWYgaXQgd2FzIGhhbmRsZWQgaGVyZSwgTm9kZUpTIC0gc2hvdWxkXG4gICAgICBwcm9taXNlLl9oID0gaXNOb2RlIHx8IGlzVW5oYW5kbGVkKHByb21pc2UpID8gMiA6IDE7XG4gICAgfSBwcm9taXNlLl9hID0gdW5kZWZpbmVkO1xuICAgIGlmICh1bmhhbmRsZWQgJiYgcmVzdWx0LmUpIHRocm93IHJlc3VsdC52O1xuICB9KTtcbn07XG52YXIgaXNVbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICBpZiAocHJvbWlzZS5faCA9PSAxKSByZXR1cm4gZmFsc2U7XG4gIHZhciBjaGFpbiA9IHByb21pc2UuX2EgfHwgcHJvbWlzZS5fYztcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVhY3Rpb247XG4gIHdoaWxlIChjaGFpbi5sZW5ndGggPiBpKSB7XG4gICAgcmVhY3Rpb24gPSBjaGFpbltpKytdO1xuICAgIGlmIChyZWFjdGlvbi5mYWlsIHx8ICFpc1VuaGFuZGxlZChyZWFjdGlvbi5wcm9taXNlKSkgcmV0dXJuIGZhbHNlO1xuICB9IHJldHVybiB0cnVlO1xufTtcbnZhciBvbkhhbmRsZVVuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaGFuZGxlcjtcbiAgICBpZiAoaXNOb2RlKSB7XG4gICAgICBwcm9jZXNzLmVtaXQoJ3JlamVjdGlvbkhhbmRsZWQnLCBwcm9taXNlKTtcbiAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPSBnbG9iYWwub25yZWplY3Rpb25oYW5kbGVkKSB7XG4gICAgICBoYW5kbGVyKHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiBwcm9taXNlLl92IH0pO1xuICAgIH1cbiAgfSk7XG59O1xudmFyICRyZWplY3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICBpZiAocHJvbWlzZS5fZCkgcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgcHJvbWlzZS5fcyA9IDI7XG4gIGlmICghcHJvbWlzZS5fYSkgcHJvbWlzZS5fYSA9IHByb21pc2UuX2Muc2xpY2UoKTtcbiAgbm90aWZ5KHByb21pc2UsIHRydWUpO1xufTtcbnZhciAkcmVzb2x2ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIHZhciB0aGVuO1xuICBpZiAocHJvbWlzZS5fZCkgcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHRyeSB7XG4gICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICBpZiAodGhlbiA9IGlzVGhlbmFibGUodmFsdWUpKSB7XG4gICAgICBtaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd3JhcHBlciA9IHsgX3c6IHByb21pc2UsIF9kOiBmYWxzZSB9OyAvLyB3cmFwXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBjdHgoJHJlc29sdmUsIHdyYXBwZXIsIDEpLCBjdHgoJHJlamVjdCwgd3JhcHBlciwgMSkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgJHJlamVjdC5jYWxsKHdyYXBwZXIsIGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICAgICAgcHJvbWlzZS5fcyA9IDE7XG4gICAgICBub3RpZnkocHJvbWlzZSwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgICRyZWplY3QuY2FsbCh7IF93OiBwcm9taXNlLCBfZDogZmFsc2UgfSwgZSk7IC8vIHdyYXBcbiAgfVxufTtcblxuLy8gY29uc3RydWN0b3IgcG9seWZpbGxcbmlmICghVVNFX05BVElWRSkge1xuICAvLyAyNS40LjMuMSBQcm9taXNlKGV4ZWN1dG9yKVxuICAkUHJvbWlzZSA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICBhbkluc3RhbmNlKHRoaXMsICRQcm9taXNlLCBQUk9NSVNFLCAnX2gnKTtcbiAgICBhRnVuY3Rpb24oZXhlY3V0b3IpO1xuICAgIEludGVybmFsLmNhbGwodGhpcyk7XG4gICAgdHJ5IHtcbiAgICAgIGV4ZWN1dG9yKGN0eCgkcmVzb2x2ZSwgdGhpcywgMSksIGN0eCgkcmVqZWN0LCB0aGlzLCAxKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAkcmVqZWN0LmNhbGwodGhpcywgZXJyKTtcbiAgICB9XG4gIH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBJbnRlcm5hbCA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICB0aGlzLl9jID0gW107ICAgICAgICAgICAgIC8vIDwtIGF3YWl0aW5nIHJlYWN0aW9uc1xuICAgIHRoaXMuX2EgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gY2hlY2tlZCBpbiBpc1VuaGFuZGxlZCByZWFjdGlvbnNcbiAgICB0aGlzLl9zID0gMDsgICAgICAgICAgICAgIC8vIDwtIHN0YXRlXG4gICAgdGhpcy5fZCA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBkb25lXG4gICAgdGhpcy5fdiA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSB2YWx1ZVxuICAgIHRoaXMuX2ggPSAwOyAgICAgICAgICAgICAgLy8gPC0gcmVqZWN0aW9uIHN0YXRlLCAwIC0gZGVmYXVsdCwgMSAtIGhhbmRsZWQsIDIgLSB1bmhhbmRsZWRcbiAgICB0aGlzLl9uID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIG5vdGlmeVxuICB9O1xuICBJbnRlcm5hbC5wcm90b3R5cGUgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKSgkUHJvbWlzZS5wcm90b3R5cGUsIHtcbiAgICAvLyAyNS40LjUuMyBQcm9taXNlLnByb3RvdHlwZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuICAgIHRoZW46IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICAgIHZhciByZWFjdGlvbiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCAkUHJvbWlzZSkpO1xuICAgICAgcmVhY3Rpb24ub2sgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogdHJ1ZTtcbiAgICAgIHJlYWN0aW9uLmZhaWwgPSB0eXBlb2Ygb25SZWplY3RlZCA9PSAnZnVuY3Rpb24nICYmIG9uUmVqZWN0ZWQ7XG4gICAgICByZWFjdGlvbi5kb21haW4gPSBpc05vZGUgPyBwcm9jZXNzLmRvbWFpbiA6IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2MucHVzaChyZWFjdGlvbik7XG4gICAgICBpZiAodGhpcy5fYSkgdGhpcy5fYS5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmICh0aGlzLl9zKSBub3RpZnkodGhpcywgZmFsc2UpO1xuICAgICAgcmV0dXJuIHJlYWN0aW9uLnByb21pc2U7XG4gICAgfSxcbiAgICAvLyAyNS40LjUuMSBQcm9taXNlLnByb3RvdHlwZS5jYXRjaChvblJlamVjdGVkKVxuICAgICdjYXRjaCc6IGZ1bmN0aW9uIChvblJlamVjdGVkKSB7XG4gICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG4gICAgfVxuICB9KTtcbiAgT3duUHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByb21pc2UgPSBuZXcgSW50ZXJuYWwoKTtcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xuICAgIHRoaXMucmVzb2x2ZSA9IGN0eCgkcmVzb2x2ZSwgcHJvbWlzZSwgMSk7XG4gICAgdGhpcy5yZWplY3QgPSBjdHgoJHJlamVjdCwgcHJvbWlzZSwgMSk7XG4gIH07XG4gIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmYgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uIChDKSB7XG4gICAgcmV0dXJuIEMgPT09ICRQcm9taXNlIHx8IEMgPT09IFdyYXBwZXJcbiAgICAgID8gbmV3IE93blByb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICA6IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgfTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgeyBQcm9taXNlOiAkUHJvbWlzZSB9KTtcbnJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJykoJFByb21pc2UsIFBST01JU0UpO1xucmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKShQUk9NSVNFKTtcbldyYXBwZXIgPSByZXF1aXJlKCcuL19jb3JlJylbUFJPTUlTRV07XG5cbi8vIHN0YXRpY3NcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjUgUHJvbWlzZS5yZWplY3QocilcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocikge1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcyk7XG4gICAgdmFyICQkcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgJCRyZWplY3Qocik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIChMSUJSQVJZIHx8ICFVU0VfTkFUSVZFKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNiBQcm9taXNlLnJlc29sdmUoeClcbiAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSh4KSB7XG4gICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKExJQlJBUlkgJiYgdGhpcyA9PT0gV3JhcHBlciA/ICRQcm9taXNlIDogdGhpcywgeCk7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhKFVTRV9OQVRJVkUgJiYgcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbiAoaXRlcikge1xuICAkUHJvbWlzZS5hbGwoaXRlcilbJ2NhdGNoJ10oZW1wdHkpO1xufSkpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC4xIFByb21pc2UuYWxsKGl0ZXJhYmxlKVxuICBhbGw6IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZXNvbHZlID0gY2FwYWJpbGl0eS5yZXNvbHZlO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdmFsdWVzID0gW107XG4gICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgdmFyIHJlbWFpbmluZyA9IDE7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIHZhciAkaW5kZXggPSBpbmRleCsrO1xuICAgICAgICB2YXIgYWxyZWFkeUNhbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZW1haW5pbmcrKztcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKGFscmVhZHlDYWxsZWQpIHJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB2YWx1ZXNbJGluZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZSkgcmVqZWN0KHJlc3VsdC52KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9LFxuICAvLyAyNS40LjQuNCBQcm9taXNlLnJhY2UoaXRlcmFibGUpXG4gIHJhY2U6IGZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihjYXBhYmlsaXR5LnJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0LmUpIHJlamVjdChyZXN1bHQudik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnByb21pc2UuanNcbi8vIG1vZHVsZSBpZCA9IDE0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCIsIi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vcHJvcG9zYWwtc2V0bWFwLW9mZnJvbS8jc2VjLW1hcC5mcm9tXG5yZXF1aXJlKCcuL19zZXQtY29sbGVjdGlvbi1mcm9tJykoJ01hcCcpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5tYXAuZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gMTUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwiLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9wcm9wb3NhbC1zZXRtYXAtb2Zmcm9tLyNzZWMtbWFwLm9mXG5yZXF1aXJlKCcuL19zZXQtY29sbGVjdGlvbi1vZicpKCdNYXAnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcubWFwLm9mLmpzXG4vLyBtb2R1bGUgaWQgPSAxNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vRGF2aWRCcnVhbnQvTWFwLVNldC5wcm90b3R5cGUudG9KU09OXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuUiwgJ01hcCcsIHsgdG9KU09OOiByZXF1aXJlKCcuL19jb2xsZWN0aW9uLXRvLWpzb24nKSgnTWFwJykgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3Lm1hcC50by1qc29uLmpzXG4vLyBtb2R1bGUgaWQgPSAxNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcm9taXNlLWZpbmFsbHlcbid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgcHJvbWlzZVJlc29sdmUgPSByZXF1aXJlKCcuL19wcm9taXNlLXJlc29sdmUnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LlIsICdQcm9taXNlJywgeyAnZmluYWxseSc6IGZ1bmN0aW9uIChvbkZpbmFsbHkpIHtcbiAgdmFyIEMgPSBzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgY29yZS5Qcm9taXNlIHx8IGdsb2JhbC5Qcm9taXNlKTtcbiAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2Ygb25GaW5hbGx5ID09ICdmdW5jdGlvbic7XG4gIHJldHVybiB0aGlzLnRoZW4oXG4gICAgaXNGdW5jdGlvbiA/IGZ1bmN0aW9uICh4KSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoQywgb25GaW5hbGx5KCkpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4geDsgfSk7XG4gICAgfSA6IG9uRmluYWxseSxcbiAgICBpc0Z1bmN0aW9uID8gZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShDLCBvbkZpbmFsbHkoKSkudGhlbihmdW5jdGlvbiAoKSB7IHRocm93IGU7IH0pO1xuICAgIH0gOiBvbkZpbmFsbHlcbiAgKTtcbn0gfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UuZmluYWxseS5qc1xuLy8gbW9kdWxlIGlkID0gMTUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtcHJvbWlzZS10cnlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG52YXIgcGVyZm9ybSA9IHJlcXVpcmUoJy4vX3BlcmZvcm0nKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdQcm9taXNlJywgeyAndHJ5JzogZnVuY3Rpb24gKGNhbGxiYWNrZm4pIHtcbiAgdmFyIHByb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkuZih0aGlzKTtcbiAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oY2FsbGJhY2tmbik7XG4gIChyZXN1bHQuZSA/IHByb21pc2VDYXBhYmlsaXR5LnJlamVjdCA6IHByb21pc2VDYXBhYmlsaXR5LnJlc29sdmUpKHJlc3VsdC52KTtcbiAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG59IH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLnRyeS5qc1xuLy8gbW9kdWxlIGlkID0gMTU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBhcmdDaGVjayBmcm9tICdjb21tb24vYXJnQ2hlY2snXG5pbXBvcnQgbG9nIGZyb20gJ2NvbW1vbi9sb2cnXG5pbXBvcnQge2ZvckVhY2gsIG1hcH0gZnJvbSAnY29tbW9uL3V0aWxzJ1xuXG5jb25zdCBUQUcgPSAnbWVzaC10b3BvbG9neSdcblxuZXhwb3J0IGNsYXNzIExpbmtJbmZvIHtcbiAgY29uc3RydWN0b3Ioe3J0dE1zID0gLTEsIGJhbmR3aWR0aCA9IC0xLCB1cCA9IGZhbHNlLCBvblVwZGF0ZX0pIHtcbiAgICB0aGlzLl9ydHRNcyA9IGFyZ0NoZWNrLm51bWJlcih0aGlzLCAncnR0TXMnLCBydHRNcylcbiAgICB0aGlzLl9iYW5kd2lkdGggPSBhcmdDaGVjay5udW1iZXIodGhpcywgJ2JhbmR3aWR0aCcsIGJhbmR3aWR0aClcbiAgICB0aGlzLl91cCA9IGFyZ0NoZWNrLmJvb2xlYW4odGhpcywgJ3VwJywgdXApXG4gICAgdGhpcy5fb25VcGRhdGUgPSBvblVwZGF0ZVxuICB9XG5cbiAgZ2V0IHVwKCkge1xuICAgIHJldHVybiB0aGlzLl91cFxuICB9XG5cbiAgZ2V0IHJ0dE1zKCkge1xuICAgIHJldHVybiB0aGlzLl9ydHRNc1xuICB9XG5cbiAgZ2V0IGJhbmR3aWR0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmFuZHdpZHRoXG4gIH1cblxuICB1cGRhdGUoaW5mbykge1xuICAgIGxldCB7cnR0TXMgPSBudWxsLCBiYW5kd2lkdGggPSBudWxsLCB1cCA9IG51bGx9ID0gaW5mb1xuICAgIGlmIChydHRNcyAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fcnR0TXMgPSBhcmdDaGVjay5udW1iZXIoJ0xpbmtJbmZvLnVwZGF0ZScsICdydHRNcycsIHJ0dE1zKVxuICAgIH1cbiAgICBpZiAoYmFuZHdpZHRoICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9iYW5kd2lkdGggPSBhcmdDaGVjay5udW1iZXIoJ0xpbmtJbmZvLnVwZGF0ZScsICdiYW5kd2lkdGgnLCBiYW5kd2lkdGgpXG4gICAgfVxuICAgIGxldCBvbGRVcCA9IHRoaXMuX3VwXG4gICAgaWYgKHVwICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl91cCA9IGFyZ0NoZWNrLmJvb2xlYW4oJ0xpbmtJbmZvLnVwZGF0ZScsICd1cCcsIHVwKVxuICAgIH1cbiAgICBpZiAodGhpcy5fb25VcGRhdGUpIHtcbiAgICAgIGxldCBjaGFuZ2VkVXBTdGF0ZSA9IG9sZFVwICE9PSB0aGlzLl91cFxuICAgICAgdGhpcy5fb25VcGRhdGUoY2hhbmdlZFVwU3RhdGUpXG4gICAgfVxuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGBsaW5reyR7dGhpcy5fdXAgPyAndXAnIDogJ2Rvd24nfSxydHRNcz0ke3RoaXMuX3J0dE1zfSxidz0ke3RoaXMuX2JhbmR3aWR0aH19YFxuICB9XG5cbiAgdG9KU09OKCkge1xuICAgIGlmICh0aGlzLl91cCkge1xuICAgICAgcmV0dXJuIFt0aGlzLl9ydHRNcywgdGhpcy5fYmFuZHdpZHRoXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW11cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcGFyc2UoZGF0YSkge1xuICAgIGlmIChkYXRhLmNvbnN0cnVjdG9yID09PSBMaW5rSW5mbykge1xuICAgICAgcmV0dXJuIGRhdGFcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIGlmICghZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5rSW5mbyh7dXA6IGZhbHNlfSlcbiAgICAgIH1cbiAgICAgIGxldCBbcnR0TXMsIGJhbmR3aWR0aF0gPSBkYXRhXG4gICAgICByZXR1cm4gbmV3IExpbmtJbmZvKHtydHRNcywgYmFuZHdpZHRoLCB1cDogdHJ1ZX0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYENvdWxkIG5vdCBwYXJzZSBsaW5rIGluZm8gZGF0YSwgJHtkYXRhfWApXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMaW5rSW5mb3Mge1xuICBzdGF0aWMgcGFyc2UoZGF0YSkge1xuICAgIGxldCBsaW5rSW5mb3MgPSBuZXcgTGlua0luZm9zKClcbiAgICBmb3JFYWNoKGRhdGEsIChsaW5rSW5mbywgcGVlcklkKSA9PiB7XG4gICAgICBsaW5rSW5mb3NbcGVlcklkXSA9IExpbmtJbmZvLnBhcnNlKGxpbmtJbmZvKVxuICAgIH0pXG4gICAgcmV0dXJuIGxpbmtJbmZvc1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGBsaW5rSW5mb3N7JHtPYmplY3Qua2V5cyh0aGlzKS5tYXAocGVlcklkID0+IGAke3BlZXJJZH06JHt0aGlzW3BlZXJJZF19YCkuam9pbignLCcpfX1gXG4gIH1cbn1cblxuY29uc3QgSU5ERVhfVVBfU1RBVEVfQ0hBTkdFX1NJWkUgPSAxMFxuXG5leHBvcnQgY2xhc3MgUGVlclRvcG9sb2d5SW5mbyB7XG4gIHN0YXRpYyBwYXJzZVVwZGF0ZShkYXRhKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YVxuICAgIH1cbiAgICBsZXQgW3Bvd2VyLCBsaW5rc10gPSBkYXRhXG4gICAgcmV0dXJuIHtcbiAgICAgIHBvd2VyLFxuICAgICAgbGlua3M6IExpbmtJbmZvcy5wYXJzZShsaW5rcyksXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocGVlcklkLCBvbkNoYW5nZSkge1xuICAgIHRoaXMuX3BlZXJJZCA9IHBlZXJJZFxuICAgIHRoaXMuX29uQ2hhbmdlID0gb25DaGFuZ2VcbiAgICB0aGlzLl90b3BvbG9neUluZGV4ID0gMVxuXG4gICAgdGhpcy5fbGlua3MgPSBuZXcgTGlua0luZm9zKClcbiAgICB0aGlzLl9wb3dlciA9IDFcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBgcGVlclRvcG9sb2d5SW5mb3twZWVySWQ9JHt0aGlzLl9wZWVySWR9LHBvd2VyPSR7dGhpcy5fcG93ZXJ9LCR7dGhpcy5fbGlua3N9fWBcbiAgfVxuXG4gIHRvSlNPTigpIHtcbiAgICByZXR1cm4gW3RoaXMuX3Bvd2VyLCB0aGlzLl9saW5rc11cbiAgfVxuXG4gIGdldCBsaW5rcygpIHtcbiAgICByZXR1cm4gdGhpcy5fbGlua3NcbiAgfVxuXG4gIGdldCBwb3dlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fcG93ZXJcbiAgfVxuXG4gIGdldCB2b2x1bWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZvbHVtZVxuICB9XG5cbiAgZ2V0IHRvcG9sb2d5SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RvcG9sb2d5SW5kZXhcbiAgfVxuXG4gIF91cGRhdGUoe3RvcG9sb2d5SW5mbywgdG9wb2xvZ3lJbmRleCwgdm9sdW1lfSkge1xuICAgIHRoaXMuX3ZvbHVtZSA9IHZvbHVtZVxuICAgIGlmICghdG9wb2xvZ3lJbmZvKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgYXJnQ2hlY2subnVtYmVyKCdQZWVyVG9wb2xvZ3lJbmZvLl91cGRhdGUnLCAndG9wb2xvZ3lJbmRleCcsIHRvcG9sb2d5SW5kZXgpXG4gICAgaWYgKHRvcG9sb2d5SW5kZXggPCB0aGlzLl90b3BvbG9neUluZGV4KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgYXJnQ2hlY2sub3B0aW9ucygnUGVlclRvcG9sb2d5SW5mby5fdXBkYXRlJywgJ3RvcG9sb2d5SW5mbycsIHRvcG9sb2d5SW5mbylcbiAgICAgIC5udW1iZXIoJ3Bvd2VyJylcbiAgICAgIC5pbnN0YW5jZSgnbGlua3MnLCBMaW5rSW5mb3MpXG4gICAgdGhpcy5fbGlua3MgPSB0b3BvbG9neUluZm8ubGlua3NcbiAgICB0aGlzLl9wb3dlciA9IHRvcG9sb2d5SW5mby5wb3dlclxuICAgIGxldCBpbmRleENoYW5nZSA9IHRvcG9sb2d5SW5kZXggLSB0aGlzLl90b3BvbG9neUluZGV4XG4gICAgdGhpcy5fdG9wb2xvZ3lJbmRleCA9IHRvcG9sb2d5SW5kZXhcbiAgICBsb2cudmVyYm9zZShUQUcsIHRoaXMsIGB1cGRhdGVkIHBlZXIgdG9wb2xvZ3kgaW5mbyBieSAke2luZGV4Q2hhbmdlfSBpbmRpY2VzYClcbiAgICB0aGlzLl9vbkNoYW5nZShpbmRleENoYW5nZSA+PSBJTkRFWF9VUF9TVEFURV9DSEFOR0VfU0laRSlcbiAgfVxuXG4gIF9pbnZhbGlkYXRlKCkge1xuICAgIHRoaXMuX2xpbmtzID0gbnVsbFxuICAgIHRoaXMuX29uQ2hhbmdlID0gbnVsbFxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2NhbFRvcG9sb2d5SW5mbyB7XG4gIGNvbnN0cnVjdG9yKHtwb3dlciwgdm9pY2VBY3Rpdml0eURldGVjdG9yLCBvblVwZGF0ZX0pIHtcbiAgICB0aGlzLl9oYW5kbGVVcGRhdGUgPSB0aGlzLl9oYW5kbGVVcGRhdGUuYmluZCh0aGlzKVxuXG4gICAgdGhpcy5fbGlua3MgPSBuZXcgTGlua0luZm9zKClcbiAgICB0aGlzLl9wb3dlciA9IHBvd2VyXG4gICAgdGhpcy5fdm9pY2VBY3Rpdml0eURldGVjdG9yID0gdm9pY2VBY3Rpdml0eURldGVjdG9yXG4gICAgdGhpcy5fdG9wb2xvZ3lJbmRleCA9IDFcbiAgICB0aGlzLl9vblVwZGF0ZSA9IG9uVXBkYXRlXG4gIH1cblxuICBnZXQgbGlua3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpbmtzXG4gIH1cblxuICBnZXQgcG93ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvd2VyXG4gIH1cblxuICBnZXQgdG9wb2xvZ3lJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdG9wb2xvZ3lJbmRleFxuICB9XG5cbiAgZ2V0IHZvbHVtZSgpIHtcbiAgICBpZiAodGhpcy5fdm9pY2VBY3Rpdml0eURldGVjdG9yKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdm9pY2VBY3Rpdml0eURldGVjdG9yLnZvbHVtZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMFxuICAgIH1cbiAgfVxuXG4gIHNldFZvaWNlQWN0aXZpdHlEZXRlY3RvckFjdGl2ZShhY3RpdmUpIHtcbiAgICBpZiAodGhpcy5fdm9pY2VBY3Rpdml0eURldGVjdG9yKSB7XG4gICAgICB0aGlzLl92b2ljZUFjdGl2aXR5RGV0ZWN0b3Iuc2V0QWN0aXZlKGFjdGl2ZSlcbiAgICB9XG4gIH1cblxuICBhZGRQZWVyKHBlZXJJZCkge1xuICAgIGlmICh0aGlzLl9saW5rcy5oYXNPd25Qcm9wZXJ0eShwZWVySWQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYExvY2FsVG9wb2xvZ3lJbmZvIGFscmVhZHkgaGFzIGEgcGVlciB3aXRoIGlkICR7cGVlcklkfWApXG4gICAgfVxuICAgIGxldCBsaW5rSW5mbyA9IG5ldyBMaW5rSW5mbyh7b25VcGRhdGU6IHRoaXMuX2hhbmRsZVVwZGF0ZX0pXG4gICAgdGhpcy5fbGlua3NbcGVlcklkXSA9IGxpbmtJbmZvXG4gICAgcmV0dXJuIGxpbmtJbmZvXG4gIH1cblxuICByZW1vdmVQZWVyKHBlZXJJZCkge1xuICAgIGxldCBsaW5rSW5mbyA9IHRoaXMuX2xpbmtzW3BlZXJJZF1cbiAgICBpZiAoIWxpbmtJbmZvKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYExvY2FsVG9wb2xvZ3lJbmZvIGZhaWxlZCB0byBkZWxldGUgbm9uZXhpc3RlbnQgcGVlciwgJHtwZWVySWR9YClcbiAgICB9XG4gICAgZGVsZXRlIHRoaXMuX2xpbmtzW3BlZXJJZF1cbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIGxldCBpbmZvU3RyaW5ncyA9IG1hcCh0aGlzLl9saW5rcywgKGxpbmtJbmZvLCBwZWVySWQpID0+IHtcbiAgICAgIHJldHVybiBgJHtwZWVySWR9OiR7bGlua0luZm99YFxuICAgIH0pXG4gICAgcmV0dXJuIGBsb2NhbFRvcG9sb2d5e3Bvd2VyPSR7dGhpcy5fcG93ZXJ9LCR7aW5mb1N0cmluZ3Muam9pbignLCcpfX1gXG4gIH1cblxuICB0b0pTT04oKSB7XG4gICAgcmV0dXJuIFt0aGlzLl9wb3dlciwgdGhpcy5fbGlua3NdXG4gIH1cblxuICBfaGFuZGxlVXBkYXRlKGNoYW5nZWRVcFN0YXRlKSB7XG4gICAgdGhpcy5fdG9wb2xvZ3lJbmRleCArPSBjaGFuZ2VkVXBTdGF0ZSA/IElOREVYX1VQX1NUQVRFX0NIQU5HRV9TSVpFIDogMVxuICAgIHRoaXMuX29uVXBkYXRlKGNoYW5nZWRVcFN0YXRlKVxuICB9XG5cbiAgX2ludmFsaWRhdGUoKSB7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVzaFRvcG9sb2d5IHtcbiAgY29uc3RydWN0b3Ioe293bklkLCBwb3dlciA9IDEsIHZvaWNlQWN0aXZpdHlEZXRlY3RvciA9IG51bGx9KSB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSB0aGlzLl9vbkNoYW5nZS5iaW5kKHRoaXMpXG5cbiAgICB0aGlzLl9sb2NhbFRvcG9sb2d5SW5mbyA9IG5ldyBMb2NhbFRvcG9sb2d5SW5mbyh7XG4gICAgICBwb3dlcixcbiAgICAgIHZvaWNlQWN0aXZpdHlEZXRlY3RvcixcbiAgICAgIG9uVXBkYXRlOiB0aGlzLl9vbkxvY2FsVG9wb2xvZ3lVcGRhdGUuYmluZCh0aGlzKSxcbiAgICB9KVxuICAgIHRoaXMuX3RvcG9sb2d5SW5mb3MgPSBuZXcgTWFwKClcbiAgICB0aGlzLl9jaGFuZ2VMaXN0ZW5lcnMgPSBuZXcgU2V0KClcbiAgICB0aGlzLl9vd25JZCA9IG93bklkXG4gICAgdGhpcy5fYWN0aXZlID0gZmFsc2VcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIGlmICh0aGlzLl90b3BvbG9neUluZm9zLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiBgbWVzaFRvcG9sb2d5e293bklkPSR7dGhpcy5fb3duSWR9LCR7dGhpcy5fbG9jYWxUb3BvbG9neUluZm99fWBcbiAgICB9XG4gICAgcmV0dXJuIGBtZXNoVG9wb2xvZ3l7b3duSWQ9JHt0aGlzLl9vd25JZH0sJHtbLi4udGhpcy5fdG9wb2xvZ3lJbmZvcy52YWx1ZXMoKV0uam9pbignLCcpfX1gXG4gIH1cblxuICBnZXQgdG9wb2xvZ3lJbmZvcygpIHtcbiAgICByZXR1cm4gdGhpcy5fdG9wb2xvZ3lJbmZvc1xuICB9XG5cbiAgZ2V0IGxvY2FsVG9wb2xvZ3lJbmZvKCkge1xuICAgIHJldHVybiB0aGlzLl9sb2NhbFRvcG9sb2d5SW5mb1xuICB9XG5cbiAgZ2V0IGFjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlXG4gIH1cblxuICAvLyBUaGUgbWVzaCB0b3BvbG9neSBpbnN0YW5jZSBpcyBvbmx5IGFjdGl2ZSB3aGVuIGluIHRoZSBsZWFkZXIgc3RhdGVcbiAgLy8gQmVpbmcgYWN0aXZlIG1lYW5zIHRoYXQgaXQgaXMgcG9zc2libGUgdG8gYWRkLCByZW1vdmUsIGFuZCB1cGRhdGUgcGVlciBsaW5rIGluZm8sXG4gIC8vIGFuZCB0aGF0IGNoYW5nZXMgd2lsbCBiZSBzaWduYWxlZCB0aHJvdWdoIHRoZSBjaGFuZ2UgbGlzdGVuZXJcbiAgYWN0aXZhdGUoKSB7XG4gICAgbG9nLmRlYnVnKFRBRywgYGFjdGl2YXRpbmcgJHt0aGlzfWApXG4gICAgdGhpcy5fYWN0aXZlID0gdHJ1ZVxuICAgIHRoaXMuX3RvcG9sb2d5SW5mb3MuY2xlYXIoKVxuICAgIHRoaXMuX3RvcG9sb2d5SW5mb3Muc2V0KHRoaXMuX293bklkLCB0aGlzLl9sb2NhbFRvcG9sb2d5SW5mbylcbiAgICB0aGlzLl9vbkNoYW5nZSh0cnVlKVxuICB9XG5cbiAgZGVhY3RpdmF0ZSgpIHtcbiAgICBsb2cuZGVidWcoVEFHLCBgZGVhY3RpdmF0aW5nICR7dGhpc31gKVxuICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlXG4gICAgdGhpcy5fdG9wb2xvZ3lJbmZvcy5mb3JFYWNoKHBlZXJUb3BvbG9neUluZm8gPT4gcGVlclRvcG9sb2d5SW5mby5faW52YWxpZGF0ZSgpKVxuICAgIHRoaXMuX3RvcG9sb2d5SW5mb3MuY2xlYXIoKVxuICAgIHRoaXMuX29uQ2hhbmdlKHRydWUpXG4gIH1cblxuICBpbnZhbGlkYXRlKCkge1xuICAgIHRoaXMuX2NoYW5nZUxpc3RlbmVycy5jbGVhcigpXG4gICAgdGhpcy5kZWFjdGl2YXRlKCkgLy8gY2hhbmdlIGxpc3RlbmVycyB3aWxsIG5vdCBiZSBjYWxsZWQsIHNpbmNlIHdlIGNsZWFyZWQgdGhlbVxuICAgIHRoaXMuX2NoYW5nZUxpc3RlbmVycyA9IG51bGxcbiAgICB0aGlzLl9vd25JZCA9IG51bGxcbiAgICB0aGlzLl9sb2NhbFRvcG9sb2d5SW5mby5faW52YWxpZGF0ZSgpXG4gICAgdGhpcy5fbG9jYWxUb3BvbG9neUluZm8gPSBudWxsXG4gICAgdGhpcy5fdG9wb2xvZ3lJbmZvcyA9IG51bGxcbiAgfVxuXG4gIGFkZENsaWVudChwZWVySWQpIHtcbiAgICBpZiAoIXRoaXMuX2FjdGl2ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmllZCB0byBhZGQgY2xpZW50IHdoaWxlIE1lc2hUb3BvbG9neSB3YXMgZGVhY3RpdmF0ZWQnKVxuICAgIH1cbiAgICBpZiAodGhpcy5fdG9wb2xvZ3lJbmZvcy5oYXMocGVlcklkKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmllZCB0byBhZGQgZXhpc3RpbmcgY2xpZW50IHRvIE1lc2hUb3BvbG9neScpXG4gICAgfVxuICAgIGxldCBwZWVyVG9wb2xvZ3lJbmZvID0gbmV3IFBlZXJUb3BvbG9neUluZm8ocGVlcklkLCB0aGlzLl9vbkNoYW5nZSlcbiAgICB0aGlzLl90b3BvbG9neUluZm9zLnNldChwZWVySWQsIHBlZXJUb3BvbG9neUluZm8pXG4gICAgbG9nLmRlYnVnKFRBRywgdGhpcywgYGFkZGluZyBjbGllbnQ6ICR7cGVlcklkfSwgICR7cGVlclRvcG9sb2d5SW5mb31gKVxuICAgIHRoaXMuX29uQ2hhbmdlKGZhbHNlKSAvLyBsaW5rcyB3aWxsIGJlIGFkZGVkIGxhdGVyXG4gICAgcmV0dXJuIHBlZXJUb3BvbG9neUluZm9cbiAgfVxuXG4gIHJlbW92ZUNsaWVudChwZWVySWQpIHtcbiAgICBpZiAoIXRoaXMuX2FjdGl2ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmllZCB0byByZW1vdmUgY2xpZW50IHdoaWxlIE1lc2hUb3BvbG9neSB3YXMgZGVhY3RpdmF0ZWQnKVxuICAgIH1cbiAgICBpZiAoIXRoaXMuX3RvcG9sb2d5SW5mb3MuaGFzKHBlZXJJZCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVHJpZWQgdG8gcmVtb3ZlIG1pc3NpbmcgY2xpZW50IGZyb20gTWVzaFRvcG9sb2d5JylcbiAgICB9XG4gICAgdGhpcy5fdG9wb2xvZ3lJbmZvcy5kZWxldGUocGVlcklkKVxuICAgIGxvZy5kZWJ1ZyhUQUcsIHRoaXMsIGByZW1vdmVkIGNsaWVudDogJHtwZWVySWR9YClcbiAgICB0aGlzLl9vbkNoYW5nZSh0cnVlKVxuICB9XG5cbiAgYWRkQ2hhbmdlTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgICB0aGlzLl9jaGFuZ2VMaXN0ZW5lcnMuYWRkKGxpc3RlbmVyKVxuICB9XG5cbiAgcmVtb3ZlQ2hhbmdlTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgICB0aGlzLl9jaGFuZ2VMaXN0ZW5lcnMuZGVsZXRlKGxpc3RlbmVyKVxuICB9XG5cbiAgX29uQ2hhbmdlKGNoYW5nZWRVcFN0YXRlKSB7XG4gICAgdGhpcy5fY2hhbmdlTGlzdGVuZXJzLmZvckVhY2gobGlzdGVuZXIgPT4gbGlzdGVuZXIodGhpcywgY2hhbmdlZFVwU3RhdGUpKVxuICB9XG5cbiAgX29uTG9jYWxUb3BvbG9neVVwZGF0ZShjaGFuZ2VkVXBTdGF0ZSkge1xuICAgIHRoaXMuX29uQ2hhbmdlKGNoYW5nZWRVcFN0YXRlKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGliL2NvbmZlcmVuY2UvbWVzaFRvcG9sb2d5LmpzIiwidmFyIGNvcmUgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJyk7XG52YXIgJEpTT04gPSBjb3JlLkpTT04gfHwgKGNvcmUuSlNPTiA9IHsgc3RyaW5naWZ5OiBKU09OLnN0cmluZ2lmeSB9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3RyaW5naWZ5KGl0KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgcmV0dXJuICRKU09OLnN0cmluZ2lmeS5hcHBseSgkSlNPTiwgYXJndW1lbnRzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L2ZuL2pzb24vc3RyaW5naWZ5LmpzXG4vLyBtb2R1bGUgaWQgPSAxNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiA0IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgNSIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgYXJnQ2hlY2sgZnJvbSAnY29tbW9uL2FyZ0NoZWNrJ1xuaW1wb3J0IGxvZyBmcm9tICdjb21tb24vbG9nJ1xuaW1wb3J0IHtkaWZmfSBmcm9tICdjb21tb24vdXRpbHMnXG5cbmltcG9ydCB7Vm90ZXN9IGZyb20gJ2NvbmZlcmVuY2UvcmFmdENvbmZpZ3VyYXRpb24nXG5pbXBvcnQge0NvbmZpZ3VyYXRpb25FbnRyeSwgT1B9IGZyb20gJ2NvbmZlcmVuY2UvcmFmdExvZ0VudHJ5J1xuaW1wb3J0IHtcbiAgQXBwZW5kRW50cmllc1JlcXVlc3QsXG4gIFByZVZvdGVSZXF1ZXN0LFxuICBSZXF1ZXN0Vm90ZVJlcXVlc3QsXG4gIFN0YXRlT3BSZXNwb25zZSxcbn0gZnJvbSAnY29uZmVyZW5jZS9yYWZ0TWVzc2FnZXMnXG5cbmNvbnN0IFRBRyA9ICdyYWZ0J1xuXG5leHBvcnQgY29uc3QgRVhQRUNURURfUlRUX01TID0gMjAwXG5cbi8vIFRoaXMgZG9lc24ndCBuZWVkIHRvIGJlIHBhcnRpY3VsYXJseSBsb3csIGJ1dCBpdCdzIGdvb2QgdG8gZ2V0IHJpZFxuLy8gb2Ygb2xkIGZvbGxvd2VycyBzbyB0aGF0IHdlIGRvbid0IGxlYWsgaW50byB1bnVzZWQgc2VuZCBidWZmZXJzLFxuLy8gSXQgc2hvdWxkIGhvd2V2ZXIgYmUgaGlnaCBlbm91Z2ggdGhhdCB0aGUgZm9sbG93ZXIgaGFzIGEgY2hhbmNlIHRvXG4vLyByZWNvbm5lY3QsIHNvIHdlIHNldCBpdCBoaWdoZXIgdGhhbiBkYXRhY2hhbm5lbCBhbmQgSUNFIHRpbWVvdXRzLlxuY29uc3QgRk9MTE9XRVJfUkVNT1ZFX1RJTUVPVVRfTVMgPSAxNTAwMFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYWZ0U3RhdGUge1xuICBjb25zdHJ1Y3Rvcihsb2csIHNlbmQsIHRlcm0pIHtcbiAgICB0aGlzLl9sb2cgPSBsb2dcbiAgICB0aGlzLl9zZW5kID0gc2VuZFxuICAgIHRoaXMuX3Rlcm0gPSBhcmdDaGVjay5udW1iZXIodGhpcywgJ3Rlcm0nLCB0ZXJtKVxuICB9XG5cbiAgdG9Gb2xsb3dlcih0ZXJtLCBsZWFkZXIsIHZvdGVkRm9yKSB7XG4gICAgaWYgKHRoaXMuc3RvcCkge1xuICAgICAgdGhpcy5zdG9wKClcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBGb2xsb3dlclN0YXRlKHRoaXMuX2xvZywgdGhpcy5fc2VuZCwgdGVybSwgbGVhZGVyLCB2b3RlZEZvcilcbiAgfVxuXG4gIHRvQ2FuZGlkYXRlKHRlcm0sIHByZVZvdGVEb25lKSB7XG4gICAgaWYgKHRoaXMuc3RvcCkge1xuICAgICAgdGhpcy5zdG9wKClcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBDYW5kaWRhdGVTdGF0ZSh0aGlzLl9sb2csIHRoaXMuX3NlbmQsIHRlcm0sIHByZVZvdGVEb25lKVxuICB9XG5cbiAgdG9MZWFkZXIodGVybSwgY29uZmlndXJhdGlvbikge1xuICAgIGlmICh0aGlzLnN0b3ApIHtcbiAgICAgIHRoaXMuc3RvcCgpXG4gICAgfVxuICAgIHJldHVybiBuZXcgTGVhZGVyU3RhdGUodGhpcy5fbG9nLCB0aGlzLl9zZW5kLCB0ZXJtLCBjb25maWd1cmF0aW9uKVxuICB9XG5cbiAgaGFuZGxlQXBwZW5kRW50cmllc1JlcXVlc3QocGVlcklkLCBtZXNzYWdlKSB7XG4gICAgbGV0IHJlc3BvbnNlID0gdGhpcy5fbG9nLmhhbmRsZUFwcGVuZEVudHJpZXNSZXF1ZXN0KG1lc3NhZ2UpXG4gICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICB0aGlzLl9zZW5kKHBlZXJJZCwgcmVzcG9uc2UpXG4gICAgICByZXR1cm4gdGhpcy50b0ZvbGxvd2VyKG1lc3NhZ2UudGVybSwgcGVlcklkKVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUFwcGVuZEVudHJpZXNSZXNwb25zZShwZWVySWQsIG1lc3NhZ2UpIHtcbiAgfVxuXG4gIGhhbmRsZVJlcXVlc3RWb3RlUmVxdWVzdChwZWVySWQsIG1lc3NhZ2UpIHtcbiAgICBsZXQgZ3JhbnRlZCA9IG1lc3NhZ2UuY29tcGFyZUxvZyh0aGlzLl9sb2cpID49IDBcbiAgICBpZiAobWVzc2FnZS50ZXJtID09PSB0aGlzLl90ZXJtKSB7XG4gICAgICBpZiAodGhpcy5fdm90ZWRGb3IgPT09IHBlZXJJZCkge1xuICAgICAgICAvLyBJZiB3ZSBhbHJlYWR5IHZvdGVkIGZvciB0aGUgcGVlciB0aGlzIHRlcm0sIG1lYW5pbmcgd2UgYXJlIGEgZm9sbG93ZXIsIHJlc2VuZCB0aGUgdm90ZVxuICAgICAgICBsb2cuZGVidWcoVEFHLCB0aGlzLCBgcmVzZW5kaW5nIGdyYW50ZWQgdm90ZSB0byBwZWVyLCAnJHtwZWVySWR9J2ApXG4gICAgICAgIHRoaXMuX3NlbmQocGVlcklkLCBtZXNzYWdlLnJlc3BvbnNlKHtncmFudGVkOiB0cnVlfSkpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX3ZvdGVkRm9yKSB7XG4gICAgICAgIC8vIE9yIGlmIHdlIGFscmVhZHkgdm90ZWQgZm9yIHNvbWVvbmUgZWxzZSwgcmVqZWN0IHRoZSB2b3RlXG4gICAgICAgIGxvZy5kZWJ1ZyhUQUcsIHRoaXMsIGByZWplY3Rpbmcgdm90ZSBmb3IgJyR7cGVlcklkfScsIGFscmVhZHkgdm90ZWQgZm9yICR7dGhpcy5fdm90ZWRGb3J9YClcbiAgICAgICAgdGhpcy5fc2VuZChwZWVySWQsIG1lc3NhZ2UucmVzcG9uc2Uoe2dyYW50ZWQ6IGZhbHNlfSkpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMgaW5zdGFuY2VvZiBGb2xsb3dlclN0YXRlKSB7XG4gICAgICAgIC8vIElmIHdlIGFyZSBmb2xsb3dlciBhdCB0aGlzIHBvaW50LCBpdCBtZWFucyB3ZSByZWplY3RlZCBhIHZvdGUgZm9yIHRoaXMgdGVybSxcbiAgICAgICAgLy8gYnV0IG1heSBzdGlsbCBzZWxlY3Qgc29tZW9uZSBlbHNlIHRvIHZvdGUgZm9yLlxuICAgICAgICBsb2cuZGVidWcoVEFHLCB0aGlzLCBgJHtncmFudGVkID8gJ2dyYW50aW5nJyA6ICdyZWplY3RpbmcnfSBzYW1lLXRlcm0gdm90ZSByZXF1ZXN0IGZyb20gJyR7cGVlcklkfSdgKVxuICAgICAgICB0aGlzLl9zZW5kKHBlZXJJZCwgbWVzc2FnZS5yZXNwb25zZSh7Z3JhbnRlZH0pKVxuICAgICAgICBpZiAoZ3JhbnRlZCkge1xuICAgICAgICAgIHRoaXMuX3ZvdGVkRm9yID0gcGVlcklkXG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gT3RoZXJ3aXNlIHdlIGFyZSBlaXRoZXIgbGVhZGVyIG9yIGNhbmRpZGF0ZSBhbmQgc2hvdWxkIHJlamVjdCB0aGUgdm90ZVxuICAgICAgICBsb2cuZGVidWcoVEFHLCB0aGlzLCBgaWdub3Jpbmcgdm90ZSByZXF1ZXN0IGZyb20gJyR7cGVlcklkfScsIGFscmVhZHkgbGVhZGVyYClcbiAgICAgICAgdGhpcy5fc2VuZChwZWVySWQsIG1lc3NhZ2UucmVzcG9uc2Uoe2dyYW50ZWQ6IGZhbHNlfSkpXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlLnRlcm0gPD0gdGhpcy5fdGVybSkge1xuICAgICAgLy8gSWYgdGhlIHZvdGUgaXMgZm9yIGFuIG9sZCB0ZXJtLCByZWplY3QgaXRcbiAgICAgIHRoaXMuX3NlbmQocGVlcklkLCBtZXNzYWdlLnJlc3BvbnNlKHtncmFudGVkOiBmYWxzZX0pKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBXZSByZWNlaXZlZCBhIHZvdGUgcmVxdWVzdCBmb3IgYSBuZXcgdGVybSwgYnV0IG5lZWQgdG8gZmlndXJlIG91dCBpZiBsb2dzIGFyZSB1cCB0byBkYXRlXG4gICAgICAvLyBUT0RPOiB3ZSBtYXkgd2FudCB0byBpZ25vcmUgdm90ZXMgd2hlbiB3ZSdyZSBzdGlsbCBoZWFyaW5nIGZyb20gdGhlIGxlYWRlclxuICAgICAgdGhpcy5fc2VuZChwZWVySWQsIG1lc3NhZ2UucmVzcG9uc2Uoe2dyYW50ZWR9KSlcbiAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgRm9sbG93ZXJTdGF0ZSkge1xuICAgICAgICB0aGlzLl90ZXJtID0gYXJnQ2hlY2subnVtYmVyKCdSYWZ0U3RhdGUuaGFuZGxlUmVxdWVzdFZvdGVSZXF1ZXN0JywgJ21lc3NhZ2UudGVybScsIG1lc3NhZ2UudGVybSlcbiAgICAgICAgdGhpcy5fbGVhZGVyID0gbnVsbFxuICAgICAgICBpZiAoZ3JhbnRlZCkge1xuICAgICAgICAgIHRoaXMuX3ZvdGVkRm9yID0gcGVlcklkXG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9Gb2xsb3dlcihtZXNzYWdlLnRlcm0sIG51bGwsIGdyYW50ZWQgPyBwZWVySWQgOiBudWxsKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVJlcXVlc3RWb3RlUmVzcG9uc2UocGVlcklkLCBtZXNzYWdlKSB7XG4gIH1cblxuICBoYW5kbGVQcmVWb3RlUmVxdWVzdChwZWVySWQsIG1lc3NhZ2UpIHtcbiAgICBsZXQgZ3JhbnRlZCA9IGZhbHNlXG4gICAgbGV0IHJlYXNvbiA9ICdub25lJ1xuXG4gICAgaWYgKG1lc3NhZ2UudGVybSA8IHRoaXMuX3Rlcm0pIHtcbiAgICAgIC8vIElmIHRoZSB2b3RlIGlzIGZvciBhbiBvbGQgdGVybSwgcmVqZWN0IGl0XG4gICAgICBncmFudGVkID0gZmFsc2VcbiAgICAgIHJlYXNvbiA9ICdvbGQgb3IgY3VycmVudCB0ZXJtJ1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBXZSByZWNlaXZlZCBhIHZvdGUgcmVxdWVzdCBmb3IgYSBuZXcgdGVybSwgYnV0IG5lZWQgdG8gZmlndXJlIG91dCBpZiBsb2dzIGFyZSB1cCB0byBkYXRlXG4gICAgICBncmFudGVkID0gbWVzc2FnZS5jb21wYXJlTG9nKHRoaXMuX2xvZykgPj0gMFxuICAgICAgcmVhc29uID0gJ25ld2VyIHRlcm0nXG4gICAgfVxuICAgIGxvZy5kZWJ1ZyhUQUcsIHRoaXMsIGAke2dyYW50ZWQgPyAnZ3JhbnRpbmcnIDogJ3JlamVjdGluZyd9IHByZS12b3RlIHJlcXVlc3QgZnJvbSAnJHtwZWVySWR9JyB3aGVuICR7cmVhc29ufWApXG4gICAgdGhpcy5fc2VuZChwZWVySWQsIG1lc3NhZ2UucmVzcG9uc2Uoe2dyYW50ZWR9KSlcbiAgfVxuXG4gIGhhbmRsZVByZVZvdGVSZXNwb25zZShwZWVySWQsIG1lc3NhZ2UpIHtcbiAgfVxuXG4gIGhhbmRsZVNuYXBzaG90UmVxdWVzdChwZWVySWQsIG1lc3NhZ2UpIHtcbiAgfVxuXG4gIGhhbmRsZVNuYXBzaG90UmVzcG9uc2UocGVlcklkLCBtZXNzYWdlKSB7XG4gIH1cblxuICBoYW5kbGVTdGF0ZU9wUmVxdWVzdChwZWVySWQsIG1lc3NhZ2UpIHtcbiAgICB0aGlzLl9zZW5kKHBlZXJJZCwgbWVzc2FnZS5yZXNwb25zZSh7ZXJyb3JDb2RlOiBTdGF0ZU9wUmVzcG9uc2UuTk9UX0xFQURFUn0pKVxuICB9XG5cbiAgLy8gU3RhdGVPcFJlc3BvbnNlIGlzIGhhbmRsZWQgYnkgU3RhdGVNYWNoaW5lXG5cbiAgZm9yd2FyZFN0YXRlT3BSZXF1ZXN0KHJlcXVlc3QpIHtcbiAgfVxuXG4gIGhhc1ZvdGUocGVlcklkKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZvbGxvd2VyTWFwRW50cnkge1xuICBjb25zdHJ1Y3Rvcih7dGVybSwgbmV4dEluZGV4LCB0b3BvbG9neUluZm8sIGxvZywgc2VuZCwgcmVtb3ZlfSkge1xuICAgIHRoaXMuX3Rlcm0gPSB0ZXJtXG4gICAgdGhpcy5fbG9nID0gbG9nXG4gICAgdGhpcy5fc2VuZCA9IHNlbmRcbiAgICB0aGlzLl9yZW1vdmVTZWxmID0gcmVtb3ZlXG4gICAgdGhpcy5fbmV4dEluZGV4ID0gYXJnQ2hlY2subnVtYmVyKHRoaXMsICduZXh0SW5kZXgnLCBuZXh0SW5kZXgpXG4gICAgdGhpcy5fbWF0Y2hJbmRleCA9IDBcbiAgICB0aGlzLl90b3BvbG9neUluZm8gPSB0b3BvbG9neUluZm9cbiAgICB0aGlzLl90aW1lb3V0SWQgPSBudWxsXG4gICAgdGhpcy5fcmVtb3ZlVGltZW91dElkID0gbnVsbFxuICAgIHRoaXMuX2lkbGUgPSB0cnVlXG4gICAgdGhpcy5fcmVtb3ZlSW5kZXggPSBJbmZpbml0eVxuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGBGb2xsb3dlck1hcEVudHJ5e3Rlcm09JHt0aGlzLl90ZXJtfSxuaT0ke3RoaXMuX25leHRJbmRleH0sbWk9JHt0aGlzLl9tYXRjaEluZGV4fX1gXG4gIH1cblxuICBnZXQgbWF0Y2hJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5fbWF0Y2hJbmRleFxuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgdGhpcy5fc3RhcnRUaW1lb3V0KClcbiAgICB0aGlzLl9zZW5kQXBwZW5kUmVxdWVzdCgwKVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICBpZiAodGhpcy5fdGltZW91dElkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dElkKVxuICAgICAgdGhpcy5fdGltZW91dElkID0gbnVsbFxuICAgIH1cbiAgICBpZiAodGhpcy5fcmVtb3ZlVGltZW91dElkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fcmVtb3ZlVGltZW91dElkKVxuICAgICAgdGhpcy5fcmVtb3ZlVGltZW91dElkID0gbnVsbFxuICAgIH1cbiAgICB0aGlzLl90b3BvbG9neUluZm8uX2ludmFsaWRhdGUoKVxuICB9XG5cbiAgLy8gRm9sbG93ZXJzIHRoYXQgYXJlIHJlbW92ZWQgc2hvdWxkIHJlY2VpdmUgdGhlIGluZm9ybWF0aW9uIHRoYXQgdGhleVxuICAvLyBoYXZlIGJlZW4gcmVtb3ZlZCwgc28gd2Uga2VlcCBzZW5kaW5nIG1lc3NhZ2VzIHVudGlsIHdlIGhhdmUgcmVjZWl2ZWRcbiAgLy8gYSBtYXRjaEluZGV4IHRoYXQgY29uZmlybXMgdGhhdCB0aGV5IGhhdmUgYmVlbiBpbmZvcm1lZCBvZiB0aGVpciBvd25cbiAgLy8gcmVtb3ZhbC5cbiAgLy8gQnkgYWx3YXlzIHVzaW5nIHRoZSBtaW5pbXVtIGluZGV4IGl0J3Mgc2FmZSB0byBjYWxsIHRoaXMgbXVsdGlwbGVcbiAgLy8gdGltZXMgYXMgYXMgY29uZmlndXJhdGlvbnMgY2hhbmdlLlxuICBwaGFzZU91dFVudGlsSW5kZXgoaW5kZXgpIHtcbiAgICBpZiAodGhpcy5fcmVtb3ZlSW5kZXggIT09IEluZmluaXR5KSB7XG4gICAgICB0aGlzLl9yZW1vdmVJbmRleCA9IE1hdGgubWluKHRoaXMuX3JlbW92ZUluZGV4LCBpbmRleClcbiAgICAgIHRoaXMuX3JlbW92ZVRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLl9yZW1vdmVUaW1lb3V0SWQgPSBudWxsXG4gICAgICAgIHRoaXMuX3JlbW92ZVNlbGYoKVxuICAgICAgfSwgRk9MTE9XRVJfUkVNT1ZFX1RJTUVPVVRfTVMpXG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQXBwZW5kRW50cmllc1Jlc3BvbnNlKG1lc3NhZ2UpIHtcbiAgICB0aGlzLl90b3BvbG9neUluZm8uX3VwZGF0ZShtZXNzYWdlKVxuXG4gICAgaWYgKG1lc3NhZ2Uuc3VjY2Vzcykge1xuICAgICAgdGhpcy5fbWF0Y2hJbmRleCA9IG1lc3NhZ2UubWF0Y2hJbmRleFxuICAgICAgdGhpcy5fbmV4dEluZGV4ID0gbWVzc2FnZS5tYXRjaEluZGV4ICsgMVxuICAgICAgaWYgKHRoaXMuX2xvZy5sYXN0TG9nSW5kZXggPiB0aGlzLl9uZXh0SW5kZXgpIHtcbiAgICAgICAgdGhpcy5fc2VuZEFwcGVuZFJlcXVlc3QoNSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2lkbGUgPSB0cnVlXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX25leHRJbmRleCA9IG1lc3NhZ2UubWF0Y2hJbmRleFxuICAgICAgaWYgKHRoaXMuX25leHRJbmRleCA8IDEpIHtcbiAgICAgICAgdGhpcy5fbmV4dEluZGV4ID0gMVxuICAgICAgfVxuICAgICAgdGhpcy5fc2VuZEFwcGVuZFJlcXVlc3QoMClcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbWF0Y2hJbmRleCA+PSB0aGlzLl9yZW1vdmVJbmRleCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3JlbW92ZVRpbWVvdXRJZClcbiAgICAgIHRoaXMuX3JlbW92ZVRpbWVvdXRJZCA9IG51bGxcbiAgICAgIHRoaXMuX3JlbW92ZVNlbGYoKVxuICAgIH1cbiAgfVxuXG4gIF9vbkFwcGVuZCh0b0luZGV4KSB7XG4gICAgLy8gV2lsbCBvbmx5IHRyaWdnZXIgYSBzZW5kIGlmIHdlIGhhdmUgcmVjZWl2ZWQgYWNrcyBmb3IgYWxsIG1lc3NhZ2VzXG4gICAgaWYgKHRoaXMuX25leHRJbmRleCA9PT0gdG9JbmRleCkge1xuICAgICAgaWYgKHRoaXMuX2lkbGUpIHtcbiAgICAgICAgbG9nLnZlcmJvc2UoVEFHLCB0aGlzLCAnd2FzIGlkbGUgd2hlbiBtYXRjaGluZyBlbnRyaWVzIHdlcmUgYWRkZWQsIHNlbmRpbmcnKVxuICAgICAgICB0aGlzLl9zZW5kQXBwZW5kUmVxdWVzdCg1KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9nLnZlcmJvc2UoVEFHLCB0aGlzLCAnd2FzIGJ1c3kgd2hlbiBtYXRjaGluZyBlbnRyaWVzIHdlcmUgYWRkZWQnKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9zZW5kQXBwZW5kUmVxdWVzdChtYXhFbnRyaWVzID0gMCkge1xuICAgIGxldCBwcmV2SW5kZXggPSB0aGlzLl9uZXh0SW5kZXggLSAxXG4gICAgbGV0IHByZXZUZXJtID0gdGhpcy5fbG9nLmVudHJ5VGVybUF0SW5kZXgocHJldkluZGV4KVxuICAgIGxldCBlbnRyaWVzID0gdGhpcy5fbG9nLnNsaWNlRW50cmllcyh0aGlzLl9uZXh0SW5kZXgsIHRoaXMuX25leHRJbmRleCArIG1heEVudHJpZXMpXG5cbiAgICBsZXQgbWF4Q29tbWl0SW5kZXggPSB0aGlzLl9sb2cuY29tbWl0SW5kZXhcbiAgICBsZXQgbGFzdEVudHJ5SW5kZXggPSBwcmV2SW5kZXggKyBlbnRyaWVzLmxlbmd0aFxuICAgIGxldCBjb21taXRJbmRleCA9IE1hdGgubWluKG1heENvbW1pdEluZGV4LCBsYXN0RW50cnlJbmRleClcblxuICAgIHRoaXMuX3NlbmQoQXBwZW5kRW50cmllc1JlcXVlc3QuY3JlYXRlKHtcbiAgICAgIHRlcm06IHRoaXMuX3Rlcm0sXG4gICAgICB0b3BvbG9neUluZGV4OiB0aGlzLl90b3BvbG9neUluZm8udG9wb2xvZ3lJbmRleCxcbiAgICAgIHByZXZJbmRleCxcbiAgICAgIHByZXZUZXJtLFxuICAgICAgY29tbWl0SW5kZXgsXG4gICAgICBlbnRyaWVzLFxuICAgIH0pKVxuXG4gICAgdGhpcy5faWRsZSA9IGZhbHNlXG4gIH1cblxuICBfc3RhcnRUaW1lb3V0KCkge1xuICAgIGlmICh0aGlzLl90aW1lb3V0SWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0SWQpXG4gICAgfVxuICAgIHRoaXMuX3RpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fc3RhcnRUaW1lb3V0KClcbiAgICAgIHRoaXMuX3NlbmRBcHBlbmRSZXF1ZXN0KDEpXG4gICAgfSwgRVhQRUNURURfUlRUX01TICogNClcbiAgfVxufVxuXG4vKlxuICAjIyAgICAgICAjIyMjIyMjIyAgICAjIyMgICAgIyMjIyMjIyMgICMjIyMjIyMjICMjIyMjIyMjXG4gICMjICAgICAgICMjICAgICAgICAgIyMgIyMgICAjIyAgICAgIyMgIyMgICAgICAgIyMgICAgICMjXG4gICMjICAgICAgICMjICAgICAgICAjIyAgICMjICAjIyAgICAgIyMgIyMgICAgICAgIyMgICAgICMjXG4gICMjICAgICAgICMjIyMjIyAgICMjICAgICAjIyAjIyAgICAgIyMgIyMjIyMjICAgIyMjIyMjIyNcbiAgIyMgICAgICAgIyMgICAgICAgIyMjIyMjIyMjICMjICAgICAjIyAjIyAgICAgICAjIyAgICMjXG4gICMjICAgICAgICMjICAgICAgICMjICAgICAjIyAjIyAgICAgIyMgIyMgICAgICAgIyMgICAgIyNcbiAgIyMjIyMjIyMgIyMjIyMjIyMgIyMgICAgICMjICMjIyMjIyMjICAjIyMjIyMjIyAjIyAgICAgIyNcbiovXG5cbmV4cG9ydCBjbGFzcyBMZWFkZXJTdGF0ZSBleHRlbmRzIFJhZnRTdGF0ZSB7XG4gIGNvbnN0cnVjdG9yKGxvZywgc2VuZCwgdGVybSA9IDApIHtcbiAgICBzdXBlcihsb2csIHNlbmQsIHRlcm0pXG4gICAgdGhpcy5fb25Ub3BvbG9neUNoYW5nZSA9IHRoaXMuX29uVG9wb2xvZ3lDaGFuZ2UuYmluZCh0aGlzKVxuXG4gICAgLy8gVE9ETzogTGVhZGVyIHNob3VsZCBhbHNvIGhhdmUgYW4gZWxlY3Rpb24gdGltZW91dCB0aGF0IGlzIHRyaWdnZXJlZCBpZiBub3RcbiAgICAvLyBhIG1ham9yaXR5IG9mIHRoZSBmb2xsb3dlcnMgcmVzcG9uZC5cbiAgICB0aGlzLl9mb2xsb3dlck1hcCA9IG5ldyBNYXAoKVxuICAgIHRoaXMuX2pvaW5lck1hcCA9IG5ldyBNYXAoKVxuICAgIHRoaXMuX3BlbmRpbmdBZGRpdGlvbnMgPSBuZXcgU2V0KClcbiAgICB0aGlzLl9wZW5kaW5nUmVtb3ZhbHMgPSBuZXcgU2V0KClcblxuICAgIHRoaXMuc3RhcnQoKVxuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGBsZWFkZXJ7dGVybT0ke3RoaXMuX3Rlcm19fWBcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMuX2xvZy5jcmVhdGVPcEVudHJ5KHt0ZXJtOiB0aGlzLl90ZXJtLCBvcDogT1Aubm9vcH0pXG4gICAgdGhpcy5fYWZ0ZXJBcHBlbmQoKVxuICAgIGxldCBuZXh0SW5kZXggPSB0aGlzLl9sb2cubGFzdExvZ0luZGV4ICsgMVxuICAgIHRoaXMuX2xvZy5tZXNoVG9wb2xvZ3kuYWN0aXZhdGUoKVxuICAgIHRoaXMuX2xvZy5tZXNoVG9wb2xvZ3kuYWRkQ2hhbmdlTGlzdGVuZXIodGhpcy5fb25Ub3BvbG9neUNoYW5nZSlcbiAgICB0aGlzLl9sb2cuY29uZmlndXJhdGlvbi5mb3JFYWNoUGVlcihwZWVySWQgPT4gdGhpcy5fYWRkRm9sbG93ZXIocGVlcklkLCBuZXh0SW5kZXgpKVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLl9mb2xsb3dlck1hcC5mb3JFYWNoKGZvbGxvd2VyID0+IGZvbGxvd2VyLnN0b3AoKSlcbiAgICB0aGlzLl9mb2xsb3dlck1hcC5jbGVhcigpXG4gICAgdGhpcy5fam9pbmVyTWFwLmZvckVhY2goaW50ZXJ2YWxJZCA9PiBjbGVhckludGVydmFsKGludGVydmFsSWQpKVxuICAgIHRoaXMuX2pvaW5lck1hcC5jbGVhcigpXG4gICAgdGhpcy5fbG9nLm1lc2hUb3BvbG9neS5yZW1vdmVDaGFuZ2VMaXN0ZW5lcih0aGlzLl9vblRvcG9sb2d5Q2hhbmdlKVxuICAgIHRoaXMuX2xvZy5tZXNoVG9wb2xvZ3kuZGVhY3RpdmF0ZSgpXG4gIH1cblxuICBfb25Ub3BvbG9neUNoYW5nZSh0b3BvbG9neSwgY2hhbmdlZFVwU3RhdGUpIHtcbiAgICBpZiAoIWNoYW5nZWRVcFN0YXRlKSB7XG4gICAgICAvLyBMZWFkZXIgb25seSBjYXJlcyBhYm91dCBjb25uZWN0aW9ucyBnb2luZyB1cCBhbmQgZG93biwgcnR0L2J3IGlzIGZvciByZWxheWluZ1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbG9nLnZlcmJvc2UoVEFHLCB0aGlzLCAnZ290IHNpZ25pZmljYW50IHRvcG9sb2d5IGNoYW5nZSwgY2hlY2tpbmcgaWYgYW55IG1lbWJlcnMgc2hvdWxkIGJlIHJlbW92ZWQnKVxuXG4gICAgLy8gRmlyc3Qgd2UgZmlndXJlIG91dCB3aGF0IG1lbWJlciBjb25uZWN0aW9ucyB3ZSBhcmUgbWlzc2luZyBiZXR3ZWVuIG91cnNlbHZlcyBhbmQgZWFjaCBmb2xsb3dlclxuICAgIGxldCBtaXNzaW5nQ29ubmVjdGlvbnMgPSBuZXcgU2V0KClcbiAgICBsZXQgbG9jYWxMaW5rcyA9IHRvcG9sb2d5LmxvY2FsVG9wb2xvZ3lJbmZvLmxpbmtzXG4gICAgLy8gdGhpcy5fZm9sbG93ZXJNYXAuZm9yRWFjaCgoZm9sbG93ZXIsIHBlZXJJZCkgPT4ge1xuICAgIHRoaXMuX2xvZy5jb25maWd1cmF0aW9uLm1lbWJlcnMuZm9yRWFjaChwZWVySWQgPT4ge1xuICAgICAgaWYgKHBlZXJJZCA9PT0gdGhpcy5fbG9nLmNvbmZpZ3VyYXRpb24ub3duSWQpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBsZXQgbG9jYWxMaW5rID0gbG9jYWxMaW5rc1twZWVySWRdXG4gICAgICBpZiAobG9jYWxMaW5rICYmIGxvY2FsTGluay51cCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9wZW5kaW5nUmVtb3ZhbHMuaGFzKHBlZXJJZCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBtaXNzaW5nQ29ubmVjdGlvbnMuYWRkKHBlZXJJZClcbiAgICB9KVxuXG4gICAgaWYgKG1pc3NpbmdDb25uZWN0aW9ucy5zaXplID09PSAwKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBMb29rIGF0IHRoZSBsaW5rIGluZm9zIGZvciB0aGUgcmVzdCBvZiB0aGUgY2x1c3RlciBhbmQga2VlcCBhbGwgY29ubmVjdGlvbnNcbiAgICAvLyB3aGVyZSBzb21lIG90aGVyIGNvbmZlcmVuY2UgbWVtYmVyIGhhcyBhIGNvbm5lY2l0b24uXG4gICAgdG9wb2xvZ3kudG9wb2xvZ3lJbmZvcy5mb3JFYWNoKCh7bGlua3N9LCBwZWVySWQpID0+IHtcbiAgICAgIC8vIElmIG91ciBsaW5rIHRvIHRoZSBwZWVyIGlzIGRvd24gd2UgZG9uJ3QgdHJ1c3QgdGhlIGN1cnJlbnQgcGVlciBsaW5rIGluZm9cbiAgICAgIGxldCBsb2NhbExpbmsgPSBsb2NhbExpbmtzW3BlZXJJZF1cbiAgICAgIGlmICghbG9jYWxMaW5rIHx8ICFsb2NhbExpbmsudXApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fZm9sbG93ZXJNYXAuaGFzKHBlZXJJZCkpIHtcbiAgICAgICAgbWlzc2luZ0Nvbm5lY3Rpb25zLmZvckVhY2gobWlzc2luZ1BlZXJJZCA9PiB7XG4gICAgICAgICAgaWYgKG1pc3NpbmdQZWVySWQgPT09IHBlZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChsaW5rc1ttaXNzaW5nUGVlcklkXSAmJiBsaW5rc1ttaXNzaW5nUGVlcklkXS51cCkge1xuICAgICAgICAgICAgbG9nLmRlYnVnKFRBRywgdGhpcywgYG5vdCByZW1vdmluZyBjb25uZWN0aW9uIHRvICR7bWlzc2luZ1BlZXJJZH0gYmVjYXVzZSAke3BlZXJJZH0gaGFzIGEgY29ubmVjdGlvbmApXG4gICAgICAgICAgICBtaXNzaW5nQ29ubmVjdGlvbnMuZGVsZXRlKG1pc3NpbmdQZWVySWQpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBsb2cuaW5mbyhUQUcsIHRoaXMsIGByZW1vdmluZyBjb25uZWN0aW9ucyB0byBbJHtbLi4ubWlzc2luZ0Nvbm5lY3Rpb25zXS5qb2luKCcsJyl9XSB3aXRoIHRvcG9sb2d5OiAke3RvcG9sb2d5fWApXG4gICAgLy8gTm93IHdlJ3JlIGxlZnQgd2l0aCBhbGwgcGVlcnMgdGhhdCBzaG91bGQgYmUgcmVtb3ZlZFxuICAgIG1pc3NpbmdDb25uZWN0aW9ucy5mb3JFYWNoKHBlZXJJZCA9PiB7XG4gICAgICB0aGlzLl9wZW5kaW5nUmVtb3ZhbHMuYWRkKHBlZXJJZClcbiAgICB9KVxuICAgIHRoaXMuX2hhbmRsZVBlbmRpbmdNZW1iZXJzaGlwVXBkYXRlcygpXG4gIH1cblxuICAvLyBXaGVuIGFkZGluZyBhIHBlZXIgaXQgd2lsbCBhbHdheXMgYmUgaW4gdGhlIGpvaW5lciBzdGF0ZS4gVGhpcyBpcyBiZWNhdXNlIGEgam9pbmVyXG4gIC8vIGRvZXMgbm90IHRyYW5zaXRpb24gdG8gZm9sbG93ZXIgdW50aWwgYSBjb25maWd1cmF0aW9uIHdpdGggdGhlaXIgaWQgaGFzIGJlZW4gY29tbWl0dGVkLlxuICAvLyBNZWFuaW5nIHRoYXQgaWYgd2UgbWFuYWdlciB0byBnZXQgZWxlY3RlZCBhcyBsZWFkZXIsIHdlIHdpbGwgZWl0aGVyIHNlZSB0aGUgcGVlciBpbiB0aGVcbiAgLy8gY29uZmlndXJhdGlvbiBhbmQgaWdub3JlIHRoZSBhZGQgcmVxdWVzdCwgb3Igd2Ugd29uJ3QgYW5kIHRoZSBwZWVyIG11c3Qgc3RpbGwgYmUgaW5cbiAgLy8gdGhlIGpvaW5lciBzdGF0ZS5cbiAgYWRkUGVlcih7cGVlcklkLCBtdXN0UmVqb2luID0gdHJ1ZX0pIHtcbiAgICBpZiAodGhpcy5fZm9sbG93ZXJNYXAuaGFzKHBlZXJJZCkpIHtcbiAgICAgIGxldCBpc01lbWJlciA9IHRoaXMuX2xvZy5jb25maWd1cmF0aW9uLm1lbWJlcnMuaGFzKHBlZXJJZClcbiAgICAgIGxldCBsb2NhbExpbmsgPSB0aGlzLl9sb2cubWVzaFRvcG9sb2d5LmxvY2FsVG9wb2xvZ3lJbmZvLmxpbmtzW3BlZXJJZF1cbiAgICAgIGlmIChpc01lbWJlciAmJiBsb2NhbExpbmsgJiYgbG9jYWxMaW5rLnVwICYmICFtdXN0UmVqb2luKSB7XG4gICAgICAgIGxvZy5kZWJ1ZyhUQUcsIHRoaXMsICdnb3QgYWRkIHJlcXVlc3QgZm9yIGZvbGxvd2VyLCBidXQgdGhlIGxpbmsgaXMgdXAsIGlnbm9yaW5nJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2cuZGVidWcoVEFHLCB0aGlzLCBgZ290IGFkZCByZXF1ZXN0IGZvciBmb2xsb3dlciwgJHtwZWVySWR9LCByZXNldHRpbmcgc3RhdGVgKVxuICAgICAgICB0aGlzLl9yZW1vdmVGb2xsb3dlcihwZWVySWQpXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLl9qb2luZXJNYXAuaGFzKHBlZXJJZCkpIHtcbiAgICAgIGxvZy5kZWJ1ZyhUQUcsIHRoaXMsIGBnb3QgYSBzZWNvbmQgcmVxdWVzdCB0byBhZGQgcGVlciAke3BlZXJJZH1gKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGxvZy5kZWJ1ZyhUQUcsIHRoaXMsIGBhZGRlZCBwZWVyIHRvIGpvaW5lcnM6ICR7cGVlcklkfWApXG5cbiAgICBsZXQgc2VuZFNuYXBzaG90ID0gKCkgPT4ge1xuICAgICAgbGV0IHNuYXBzaG90ID0gdGhpcy5fbG9nLmNyZWF0ZVNuYXBzaG90KHRoaXMuX3Rlcm0pXG4gICAgICB0aGlzLl9zZW5kKHBlZXJJZCwgc25hcHNob3QpXG4gICAgfVxuICAgIGxldCBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoc2VuZFNuYXBzaG90LCBFWFBFQ1RFRF9SVFRfTVMgKiA0KVxuICAgIHRoaXMuX2pvaW5lck1hcC5zZXQocGVlcklkLCBpbnRlcnZhbElkKVxuICAgIHNlbmRTbmFwc2hvdCgpXG4gIH1cblxuICBhcHBlbmRDb25maWd1cmF0aW9uKGRhdGEpIHtcbiAgICBsZXQgb2xkTWVtYmVycyA9IHRoaXMuX2xvZy5jb25maWd1cmF0aW9uLm1lbWJlcnNcbiAgICBsZXQgZW50cnkgPSB0aGlzLl9sb2cuY3JlYXRlQ29uZmlndXJhdGlvbkVudHJ5KHt0ZXJtOiB0aGlzLl90ZXJtLCBkYXRhfSlcbiAgICBsZXQgbmV3TWVtYmVycyA9IHRoaXMuX2xvZy5jb25maWd1cmF0aW9uLm1lbWJlcnNcblxuICAgIGxldCBbYWRkZWRQZWVycywgcmVtb3ZlZFBlZXJzXSA9IGRpZmYob2xkTWVtYmVycywgbmV3TWVtYmVycylcbiAgICBsZXQgbmV4dEluZGV4ID0gdGhpcy5fbG9nLmxhc3RMb2dJbmRleCArIDFcblxuICAgIGFkZGVkUGVlcnMuZm9yRWFjaChwZWVySWQgPT4gdGhpcy5fYWRkRm9sbG93ZXIocGVlcklkLCBuZXh0SW5kZXgpKVxuICAgIHJlbW92ZWRQZWVycy5mb3JFYWNoKHBlZXJJZCA9PiB7XG4gICAgICBsZXQgZm9sbG93ZXIgPSB0aGlzLl9mb2xsb3dlck1hcC5nZXQocGVlcklkKVxuICAgICAgaWYgKGZvbGxvd2VyKSB7XG4gICAgICAgIGZvbGxvd2VyLnBoYXNlT3V0VW50aWxJbmRleChuZXh0SW5kZXgpXG4gICAgICB9XG4gICAgfSlcbiAgICB0aGlzLl9hZnRlckFwcGVuZCgpXG4gICAgcmV0dXJuIGVudHJ5XG4gIH1cblxuICBfYWZ0ZXJBcHBlbmQoKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5fbG9nLmxhc3RMb2dJbmRleFxuICAgIHRoaXMuX2ZvbGxvd2VyTWFwLmZvckVhY2goZm9sbG93ZXIgPT4ge1xuICAgICAgZm9sbG93ZXIuX29uQXBwZW5kKGluZGV4KVxuICAgIH0pXG4gICAgdGhpcy5fdHJ5Q29tbWl0KClcbiAgfVxuXG4gIGhhbmRsZUFwcGVuZEVudHJpZXNSZXF1ZXN0KHBlZXJJZCwgbWVzc2FnZSkge1xuICAgIGlmIChtZXNzYWdlLnRlcm0gPT09IHRoaXMuX3Rlcm0pIHtcbiAgICAgIGxvZy5kZWJ1ZyhUQUcsIGBFUlJPUjogJHt0aGlzfSByZWNlaXZlZCBhcHBlbmQgcmVxdWVzdCBmb3Igb3duIHRlcm06ICR7bWVzc2FnZX1gKVxuICAgIH0gZWxzZSBpZiAobWVzc2FnZS50ZXJtID4gdGhpcy5fdGVybSkge1xuICAgICAgLy8gQSBuZXcgbGVhZGVyIHdhcyBlbGVjdGVkLCBhbGxvdyBpdCB0byB0YWtlIG92ZXJcbiAgICAgIHJldHVybiBzdXBlci5oYW5kbGVBcHBlbmRFbnRyaWVzUmVxdWVzdChwZWVySWQsIG1lc3NhZ2UpXG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQXBwZW5kRW50cmllc1Jlc3BvbnNlKHBlZXJJZCwgbWVzc2FnZSkge1xuICAgIGlmIChtZXNzYWdlLnRlcm0gPT09IHRoaXMuX3Rlcm0pIHtcbiAgICAgIC8vIFRPRE86IEFkZCB0ZXN0cyBmb3IgdGhpc1xuICAgICAgaWYgKG1lc3NhZ2UubmVlZFNuYXBzaG90KSB7XG4gICAgICAgIGxvZy5kZWJ1ZyhUQUcsIHRoaXMsIGByZWNlaXZlZCBhcHBlbmQgZW50cmllcyByZXNwb25zZSBmcm9tICR7cGVlcklkfSB3aXRoIG5lZWRTbmFwc2hvdCBmbGFnYClcbiAgICAgICAgdGhpcy5hZGRQZWVyKHtwZWVySWQsIG11c3RSZWpvaW46IHRydWV9KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIC8vIEdvdCBhIHJlc3BvbnNlIHRvIG9uZSBvZiBvdXIgYXBwZW5kIHJlcXVlc3RzXG4gICAgICBsZXQgZm9sbG93ZXIgPSB0aGlzLl9mb2xsb3dlck1hcC5nZXQocGVlcklkKVxuICAgICAgaWYgKGZvbGxvd2VyKSB7XG4gICAgICAgIGZvbGxvd2VyLmhhbmRsZUFwcGVuZEVudHJpZXNSZXNwb25zZShtZXNzYWdlKVxuICAgICAgICBpZiAobWVzc2FnZS5zdWNjZXNzKSB7XG4gICAgICAgICAgLy8gV2UgaGF2ZSBhcHBlbmRlZCBuZXcgbG9nIGVudGlyZXMsIG1pZ2h0IGJlIGFibGUgdG8gaW5jcmVtZW50IGNvbW1pdCBpbmRleFxuICAgICAgICAgIHRoaXMuX3RyeUNvbW1pdCgpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZy5kZWJ1ZyhUQUcsIGBFUlJPUjogJHt0aGlzfSBnb3QgYXBwZW5kIGVudHJpZXMgcmVzcG9uc2UgZnJvbSB1bmtub3duIHBlZXI6ICR7cGVlcklkfWApXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlLnRlcm0gPiB0aGlzLl90ZXJtKSB7XG4gICAgICBsb2cuZGVidWcoVEFHLCBgRVJST1I6ICR7dGhpc30gcmVjZWl2ZWQgYXBwZW5kIHJlc3BvbnNlIGZvciBuZXdlciB0ZXJtOiAke21lc3NhZ2V9YClcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTbmFwc2hvdFJlc3BvbnNlKHBlZXJJZCwgbWVzc2FnZSkge1xuICAgIGlmIChtZXNzYWdlLnRlcm0gIT09IHRoaXMuX3Rlcm0pIHtcbiAgICAgIGxvZy53YXJuaW5nKFRBRywgdGhpcywgYHJlY2VpdmVkIHNuYXBzaG90IHJlc3BvbnNlIGZvciBmdXR1cmUgdGVybTogJHttZXNzYWdlfWApXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgbGV0IGludGVydmFsSWQgPSB0aGlzLl9qb2luZXJNYXAuZ2V0KHBlZXJJZClcbiAgICBpZiAoIWludGVydmFsSWQpIHtcbiAgICAgIGxvZy5kZWJ1ZyhUQUcsIHRoaXMsIGByZWNlaXZlZCBzbmFwc2hvdCByZXNwb25zZSBmb3IgbWlzc2luZyBqb2luZXI6ICR7bWVzc2FnZX1gKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZClcbiAgICB0aGlzLl9qb2luZXJNYXAuZGVsZXRlKHBlZXJJZClcblxuICAgIGxvZy5kZWJ1ZyhUQUcsIHRoaXMsIGBhY2NlcHRlZCBzbmFwc2hvdCByZXNwb25zZSBmcm9tICR7cGVlcklkfTogJHttZXNzYWdlfWApXG4gICAgbGV0IHtsYXN0SW5kZXh9ID0gbWVzc2FnZVxuICAgIHRoaXMuX2FkZEZvbGxvd2VyKHBlZXJJZCwgbGFzdEluZGV4ICsgMSlcblxuICAgIHRoaXMuX3BlbmRpbmdBZGRpdGlvbnMuYWRkKHBlZXJJZClcbiAgICB0aGlzLl9oYW5kbGVQZW5kaW5nTWVtYmVyc2hpcFVwZGF0ZXMoKVxuICB9XG5cbiAgaGFuZGxlU3RhdGVPcFJlcXVlc3QocGVlcklkLCBtZXNzYWdlKSB7XG4gICAgdGhpcy5mb3J3YXJkU3RhdGVPcFJlcXVlc3QobWVzc2FnZSlcbiAgICB0aGlzLl9zZW5kKHBlZXJJZCwgbWVzc2FnZS5yZXNwb25zZSgpKVxuICB9XG5cbiAgZm9yd2FyZFN0YXRlT3BSZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICBsZXQge2lkLCBvcCwgYXJnc30gPSByZXF1ZXN0XG4gICAgdGhpcy5fbG9nLmNyZWF0ZU9wRW50cnkoe3Rlcm06IHRoaXMuX3Rlcm0sIGlkLCBvcCwgYXJnc30pXG4gICAgdGhpcy5fYWZ0ZXJBcHBlbmQoKVxuICB9XG5cbiAgX3RyeUNvbW1pdCgpIHtcbiAgICBsZXQgbWF0Y2hJbmRpY2VzID0ge1xuICAgICAgW3RoaXMuX2xvZy5jb25maWd1cmF0aW9uLm93bklkXTogdGhpcy5fbG9nLmxhc3RMb2dJbmRleCxcbiAgICB9XG4gICAgdGhpcy5fZm9sbG93ZXJNYXAuZm9yRWFjaCgoZm9sbG93ZXIsIGNsaWVudElkKSA9PiB7XG4gICAgICBtYXRjaEluZGljZXNbY2xpZW50SWRdID0gZm9sbG93ZXIubWF0Y2hJbmRleFxuICAgIH0pXG4gICAgbGV0IG1ham9yaXR5TWF0Y2hJbmRleCA9IHRoaXMuX2xvZy5jb25maWd1cmF0aW9uLmdldE1ham9yaXR5SW5kZXgobWF0Y2hJbmRpY2VzKVxuICAgIGxldCBjb21taXR0ZWQgPSB0aGlzLl9sb2cudHJ5Q29tbWl0SW5kZXhGb3JUZXJtKG1ham9yaXR5TWF0Y2hJbmRleCwgdGhpcy5fdGVybSlcblxuICAgIGlmIChjb21taXR0ZWQgJiYgY29tbWl0dGVkLmxlbmd0aCkge1xuICAgICAgdGhpcy5fZm9sbG93ZXJNYXAuZm9yRWFjaChmb2xsb3dlciA9PiBmb2xsb3dlci5fc2VuZEFwcGVuZFJlcXVlc3QoMCkpXG4gICAgfVxuXG4gICAgaWYgKGNvbW1pdHRlZCAmJiBjb21taXR0ZWQuc29tZShlbnRyeSA9PiBlbnRyeSBpbnN0YW5jZW9mIENvbmZpZ3VyYXRpb25FbnRyeSkpIHtcbiAgICAgIC8vIFRoaXMgYXNzdW1lcyB0aGF0IHRoZXJlIGNhbiBvbmx5IGJlIGEgc2luZ2xlIHVuLWNvbW1pdHRlZCBjb25maWd1cmF0aW9uIGxvZyBlbnRyeVxuICAgICAgLy8gYXQgYW55IGdpdmVuIHRpbWUgZm9yIGFueSBsZWFkZXIuIEFmYWlrIHRoYXQgaXMgdHJ1ZSBidXQgbmVlZHMgc29tZSBwcm9vZi5cbiAgICAgIHRoaXMuX2hhbmRsZVBlbmRpbmdNZW1iZXJzaGlwVXBkYXRlcygpXG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZVBlbmRpbmdNZW1iZXJzaGlwVXBkYXRlcygpIHtcbiAgICBpZiAodGhpcy5fcGVuZGluZ0FkZGl0aW9ucy5zaXplICsgdGhpcy5fcGVuZGluZ1JlbW92YWxzLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBtZW1iZXJzID0gdGhpcy5fbG9nLmNvbmZpZ3VyYXRpb24ubWVtYmVyc1xuXG4gICAgLy8gVGhlIGNvbmZpZ3VyYXRpb24gaW1wbGVtZW50YXRpb24gaW4gdGhlIGZpcnN0IFJhZnQgcGFwZXIgaXMgbW9yZVxuICAgIC8vIGNvbXBsZXggYW5kIGxlc3Mgcm9idXMgdGhhbiB0aGUgb25lIGluIHRoZSB0aGVzaXMuXG4gICAgLy8gVGhlIGJhc2ljIGNvbmNlcHQgb2YgdGhlIG9uZSBmcm9tIHRoZSB0aGVzaXMgaXMgdGhhdCBhcyBsb25nIGFzXG4gICAgLy8gd2UgZG8gZmV3IGVub3VnaCBhZGRpdGlvbnMgb3IgcmVtb3ZhbHMgZWFjaCB0aW1lLCBpdCBpcyBzYWZlLlxuICAgIC8vXG4gICAgLy8gVE9ETzogSXQncyBwb3NzaWJsZSB0byBhZGQgb3IgcmVtb3ZlIG1vcmUgdGhhbiBvbmUgbWVtYmVycyBhdFxuICAgIC8vIGF0IHRpbWUgaW4gbGFyZ2UgY2x1c3RlcnMsIGZpZ3VyZSBvdXQgbGltaXRzLlxuICAgIGlmICh0aGlzLl9wZW5kaW5nUmVtb3ZhbHMuc2l6ZSkge1xuICAgICAgbGV0IFtyZW1vdmVkXSA9IFsuLi50aGlzLl9wZW5kaW5nUmVtb3ZhbHNdXG4gICAgICB0aGlzLl9wZW5kaW5nUmVtb3ZhbHMuZGVsZXRlKHJlbW92ZWQpXG4gICAgICBtZW1iZXJzLmRlbGV0ZShyZW1vdmVkKVxuICAgIH0gZWxzZSBpZiAodGhpcy5fcGVuZGluZ0FkZGl0aW9ucy5zaXplKSB7XG4gICAgICBsZXQgW2FkZGVkXSA9IFsuLi50aGlzLl9wZW5kaW5nQWRkaXRpb25zXVxuICAgICAgdGhpcy5fcGVuZGluZ0FkZGl0aW9ucy5kZWxldGUoYWRkZWQpXG4gICAgICBtZW1iZXJzLmFkZChhZGRlZClcbiAgICB9XG5cbiAgICBsZXQgZGF0YSA9IHRoaXMuX2xvZy5jb25maWd1cmF0aW9uLmNyZWF0ZU1lbWJlcnNDaGFuZ2UobWVtYmVycylcbiAgICB0aGlzLmFwcGVuZENvbmZpZ3VyYXRpb24oZGF0YSlcbiAgfVxuXG4gIF9hZGRGb2xsb3dlcihwZWVySWQsIG5leHRJbmRleCkge1xuICAgIGlmICh0aGlzLl9mb2xsb3dlck1hcC5oYXMocGVlcklkKSkge1xuICAgICAgbG9nLmRlYnVnKFRBRywgdGhpcywgYG5vdCBhZGRpbmcgbmV3IGZvbGxvd2VyLCBhbHJlYWR5IGV4aXN0cyBzaW5jZSBqb2luaW5nOiAke3BlZXJJZH1gKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGxvZy5kZWJ1ZyhUQUcsIHRoaXMsIGBhZGRlZCBwZWVyIHRvIGZvbGxvd2VyczogJHtwZWVySWR9YClcbiAgICBjb25zdCBzZW5kID0gbWVzc2FnZSA9PiB0aGlzLl9zZW5kKHBlZXJJZCwgbWVzc2FnZSlcbiAgICBsZXQgdG9wb2xvZ3lJbmZvID0gdGhpcy5fbG9nLm1lc2hUb3BvbG9neS5hZGRDbGllbnQocGVlcklkKVxuICAgIGxldCBmb2xsb3dlciA9IG5ldyBGb2xsb3dlck1hcEVudHJ5KHtcbiAgICAgIHRlcm06IHRoaXMuX3Rlcm0sXG4gICAgICBuZXh0SW5kZXgsXG4gICAgICB0b3BvbG9neUluZm8sXG4gICAgICBsb2c6IHRoaXMuX2xvZyxcbiAgICAgIHNlbmQsXG4gICAgICByZW1vdmU6IHRoaXMuX3JlbW92ZUZvbGxvd2VyLmJpbmQodGhpcywgcGVlcklkKSxcbiAgICB9KVxuICAgIHRoaXMuX2ZvbGxvd2VyTWFwLnNldChwZWVySWQsIGZvbGxvd2VyKVxuICAgIGZvbGxvd2VyLnN0YXJ0KClcbiAgfVxuXG4gIF9yZW1vdmVGb2xsb3dlcihwZWVySWQpIHtcbiAgICBsZXQgZm9sbG93ZXIgPSB0aGlzLl9mb2xsb3dlck1hcC5nZXQocGVlcklkKVxuICAgIGlmIChmb2xsb3dlcikge1xuICAgICAgZm9sbG93ZXIuc3RvcCgpXG4gICAgICB0aGlzLl9mb2xsb3dlck1hcC5kZWxldGUocGVlcklkKVxuICAgICAgdGhpcy5fbG9nLm1lc2hUb3BvbG9neS5yZW1vdmVDbGllbnQocGVlcklkKVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2cud2FybmluZyhUQUcsIHRoaXMsIGBmYWlsZWQgdG8gcmVtb3ZlIG1pc3NpbmcgZm9sbG93ZXI6ICR7cGVlcklkfWApXG4gICAgfVxuICB9XG59XG5cbi8qXG4gICMjIyMjIyMjICAjIyMjIyMjICAjIyAgICAgICAjIyAgICAgICAgIyMjIyMjIyAgIyMgICAgICAjIyAjIyMjIyMjIyAjIyMjIyMjI1xuICAjIyAgICAgICAjIyAgICAgIyMgIyMgICAgICAgIyMgICAgICAgIyMgICAgICMjICMjICAjIyAgIyMgIyMgICAgICAgIyMgICAgICMjXG4gICMjICAgICAgICMjICAgICAjIyAjIyAgICAgICAjIyAgICAgICAjIyAgICAgIyMgIyMgICMjICAjIyAjIyAgICAgICAjIyAgICAgIyNcbiAgIyMjIyMjICAgIyMgICAgICMjICMjICAgICAgICMjICAgICAgICMjICAgICAjIyAjIyAgIyMgICMjICMjIyMjIyAgICMjIyMjIyMjXG4gICMjICAgICAgICMjICAgICAjIyAjIyAgICAgICAjIyAgICAgICAjIyAgICAgIyMgIyMgICMjICAjIyAjIyAgICAgICAjIyAgICMjXG4gICMjICAgICAgICMjICAgICAjIyAjIyAgICAgICAjIyAgICAgICAjIyAgICAgIyMgIyMgICMjICAjIyAjIyAgICAgICAjIyAgICAjI1xuICAjIyAgICAgICAgIyMjIyMjIyAgIyMjIyMjIyMgIyMjIyMjIyMgICMjIyMjIyMgICAjIyMgICMjIyAgIyMjIyMjIyMgIyMgICAgICMjXG4qL1xuXG5leHBvcnQgY2xhc3MgRm9sbG93ZXJTdGF0ZSBleHRlbmRzIFJhZnRTdGF0ZSB7XG4gIGNvbnN0cnVjdG9yKGxvZywgc2VuZCwgdGVybSA9IDAsIGxlYWRlciA9IG51bGwsIHZvdGVkRm9yID0gbnVsbCkge1xuICAgIHN1cGVyKGxvZywgc2VuZCwgdGVybSlcbiAgICBhcmdDaGVjay5vcHRTdHJpbmcodGhpcywgJ2xlYWRlcicsIGxlYWRlcilcblxuICAgIHRoaXMuX3NlbmRQcmVWb3RlUmVxdWVzdHMgPSB0aGlzLl9zZW5kUHJlVm90ZVJlcXVlc3RzLmJpbmQodGhpcylcblxuICAgIHRoaXMuX2xlYWRlciA9IGxlYWRlclxuICAgIHRoaXMuX3ZvdGVkRm9yID0gdm90ZWRGb3JcblxuICAgIC8vIFdoZW4gZG9pbmcgYSBwcmUtdm90ZSwgdGhpcyBpcyB0aGUgdGVybSB3ZSB3b3VsZCBjYW5kaWRhdGUgZm9yXG4gICAgdGhpcy5fdGFyZ2V0VGVybSA9IG51bGxcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBgZm9sbG93ZXJ7dGVybT0ke3RoaXMuX3Rlcm19LGxlYWRlcj0ke3RoaXMuX2xlYWRlcn0sdm90ZWRGb3I9JHt0aGlzLl92b3RlZEZvcn19YFxuICB9XG5cbiAgaGFzVm90ZShwZWVySWQpIHtcbiAgICByZXR1cm4gdGhpcy5fdm90ZWRGb3IgPT09IHBlZXJJZFxuICB9XG5cbiAgdG9Gb2xsb3dlcih0ZXJtLCBsZWFkZXIsIHZvdGVkRm9yID0gbnVsbCkge1xuICAgIGlmICh0ZXJtID4gdGhpcy5fdGVybSkge1xuICAgICAgdGhpcy5fdGVybSA9IHRlcm1cbiAgICAgIHRoaXMuX2xlYWRlciA9IGxlYWRlclxuICAgICAgdGhpcy5fdm90ZWRGb3IgPSB2b3RlZEZvclxuICAgIH1cbiAgICBpZiAodGVybSA9PT0gdGhpcy5fdGVybSAmJiAhdGhpcy5fbGVhZGVyKSB7XG4gICAgICB0aGlzLl9sZWFkZXIgPSBsZWFkZXJcbiAgICB9XG4gICAgdGhpcy5zdG9wKClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gVGhlIGJlbG93IGNvZGUgaXMgYSBwYXJ0IG9mIHRoZSBwcmUtdm90ZSBtb2RpZmljYXRpb24gb2YgUmFmdCwgc2VlIHJhZnRNZXNzYWdlcy5qc1xuICB0b0NhbmRpZGF0ZSh0ZXJtLCBwcmVWb3RlRG9uZSkge1xuICAgIGlmIChwcmVWb3RlRG9uZSkge1xuICAgICAgcmV0dXJuIHN1cGVyLnRvQ2FuZGlkYXRlKHRlcm0sIHByZVZvdGVEb25lKVxuICAgIH1cbiAgICB0aGlzLnN0b3AoKVxuICAgIHRoaXMuX3RhcmdldFRlcm0gPSB0ZXJtXG4gICAgdGhpcy5fcHJlVm90ZXMgPSBuZXcgVm90ZXModGhpcy5fbG9nLmNvbmZpZ3VyYXRpb24ub3duSWQpXG4gICAgdGhpcy5zdGFydCgpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMuX3NlbmRQcmVWb3RlUmVxdWVzdHMoKVxuICAgIHRoaXMuX2ludGVydmFsSWQgPSBzZXRJbnRlcnZhbCh0aGlzLl9zZW5kUHJlVm90ZVJlcXVlc3RzLCBFWFBFQ1RFRF9SVFRfTVMgKiA0KVxuICB9XG5cbiAgc3RvcCgpIHtcbiAgICBpZiAodGhpcy5faW50ZXJ2YWxJZCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbElkKVxuICAgICAgdGhpcy5faW50ZXJ2YWxJZCA9IG51bGxcbiAgICB9XG4gICAgaWYgKHRoaXMuX3RhcmdldFRlcm0pIHtcbiAgICAgIHRoaXMuX3RhcmdldFRlcm0gPSBudWxsXG4gICAgICB0aGlzLl9wcmVWb3RlcyA9IG51bGxcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTbmFwc2hvdFJlcXVlc3QocGVlcklkLCBtZXNzYWdlKSB7XG4gICAgaWYgKHRoaXMuX3Rlcm0gPiBtZXNzYWdlLnRlcm0gfHwgdGhpcy5fbG9nLmNvbW1pdEluZGV4ID4gbWVzc2FnZS5sYXN0SW5kZXgpIHtcbiAgICAgIGxvZy5kZWJ1ZyhUQUcsIHRoaXMsIGByZWNlaXZlZCBvbGQgc25hcHNob3QgZnJvbSAke3BlZXJJZH06ICR7bWVzc2FnZX1gKVxuICAgICAgcmV0dXJuIC8vIGlnbm9yZSBvbGQgc25hcHNob3RzXG4gICAgfVxuICAgIGxvZy5pbmZvKFRBRywgdGhpcywgYHJlY2VpdmVkIG5ldyBzbmFwc2hvdCBmcm9tICR7cGVlcklkfTogJHttZXNzYWdlfWApXG4gICAgdGhpcy5fbG9nLmxvYWRTbmFwc2hvdChtZXNzYWdlKVxuICAgIHRoaXMuX3NlbmQocGVlcklkLCBtZXNzYWdlLnJlc3BvbnNlKCkpXG4gICAgcmV0dXJuIHRoaXMudG9Gb2xsb3dlcih0aGlzLl90ZXJtLCBwZWVySWQpXG4gIH1cblxuICBoYW5kbGVQcmVWb3RlUmVzcG9uc2UocGVlcklkLCBtZXNzYWdlKSB7XG4gICAgaWYgKHRoaXMuX3RhcmdldFRlcm0gJiYgbWVzc2FnZS50ZXJtID09PSB0aGlzLl90YXJnZXRUZXJtKSB7XG4gICAgICAvLyBXZSBnb3QgYSB2b3RlIGZvciB0aGUgY3VycmVudCB0ZXJtLCBzbyB3ZSBzdG9yZSB0aGUgcmVwbHkgYW5kIGNoZWNrIGlmIHdlXG4gICAgICAvLyBoYXZlIHJlY2VpdmVkIGVub3VnaCB2b3RlcyB0byBoYXZlIGEgbWFqb3JpdHkgYW5kIGJlY29tZSBsZWFkZXJcbiAgICAgIHRoaXMuX3ByZVZvdGVzLnNldChwZWVySWQsIG1lc3NhZ2UuZ3JhbnRlZClcbiAgICAgIGxvZy5kZWJ1ZyhUQUcsIHRoaXMsIGByZWNlaXZlZCBwcmUtdm90ZSByZXBseSBmcm9tICR7cGVlcklkfTogJHttZXNzYWdlLmdyYW50ZWQgPyAnZ3JhbnRlZCcgOiAncmVqZWN0ZWQnfWApXG4gICAgICBpZiAodGhpcy5fbG9nLmNvbmZpZ3VyYXRpb24uaGFzTWFqb3JpdHkodGhpcy5fcHJlVm90ZXMuZ3JhbnRlZFZvdGVzKSkge1xuICAgICAgICByZXR1cm4gc3VwZXIudG9DYW5kaWRhdGUodGhpcy5fdGFyZ2V0VGVybSwgdHJ1ZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3J3YXJkU3RhdGVPcFJlcXVlc3QocmVxdWVzdCkge1xuICAgIGlmICh0aGlzLl9sZWFkZXIpIHtcbiAgICAgIHRoaXMuX3NlbmQodGhpcy5fbGVhZGVyLCByZXF1ZXN0KVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBXZSBqdXN0IGxldCB0aGUgY2xpZW50IHRpbWUgb3V0IGZvciBub3dcbiAgICAgIC8vIFRPRE86IFVzZSBhbiBhc3luYyBxdWV1ZSB0byBzZXJpYWxpemUgbWVzc2FnZXMgYW5kIHNlbmQgZmVlZGJhY2tcbiAgICB9XG4gIH1cblxuICBfc2VuZFByZVZvdGVSZXF1ZXN0cygpIHtcbiAgICBsZXQgcmVxdWVzdCA9IFByZVZvdGVSZXF1ZXN0LmNyZWF0ZSh7XG4gICAgICB0ZXJtOiB0aGlzLl90YXJnZXRUZXJtLCAvLyB3ZSdyZSBnb2luZyB0byBiZSB2b3RpbmcgaW4gdGhlIG5leHQgdGVybVxuICAgICAgbGFzdExvZ1Rlcm06IHRoaXMuX2xvZy5sYXN0TG9nVGVybSxcbiAgICAgIGxhc3RMb2dJbmRleDogdGhpcy5fbG9nLmxhc3RMb2dJbmRleCxcbiAgICB9KVxuXG4gICAgdGhpcy5fbG9nLmNvbmZpZ3VyYXRpb24uZm9yRWFjaFBlZXIocGVlcklkID0+IHtcbiAgICAgIGlmICghdGhpcy5fcHJlVm90ZXMuaGFzKHBlZXJJZCkpIHtcbiAgICAgICAgdGhpcy5fc2VuZChwZWVySWQsIHJlcXVlc3QpXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG4vKlxuICAgIyMjIyMjICAgICAjIyMgICAgIyMgICAgIyMgIyMjIyMjIyMgICMjIyMgIyMjIyMjIyMgICAgICMjIyAgICAjIyMjIyMjIyAjIyMjIyMjI1xuICAjIyAgICAjIyAgICMjICMjICAgIyMjICAgIyMgIyMgICAgICMjICAjIyAgIyMgICAgICMjICAgIyMgIyMgICAgICAjIyAgICAjI1xuICAjIyAgICAgICAgIyMgICAjIyAgIyMjIyAgIyMgIyMgICAgICMjICAjIyAgIyMgICAgICMjICAjIyAgICMjICAgICAjIyAgICAjI1xuICAjIyAgICAgICAjIyAgICAgIyMgIyMgIyMgIyMgIyMgICAgICMjICAjIyAgIyMgICAgICMjICMjICAgICAjIyAgICAjIyAgICAjIyMjIyNcbiAgIyMgICAgICAgIyMjIyMjIyMjICMjICAjIyMjICMjICAgICAjIyAgIyMgICMjICAgICAjIyAjIyMjIyMjIyMgICAgIyMgICAgIyNcbiAgIyMgICAgIyMgIyMgICAgICMjICMjICAgIyMjICMjICAgICAjIyAgIyMgICMjICAgICAjIyAjIyAgICAgIyMgICAgIyMgICAgIyNcbiAgICMjIyMjIyAgIyMgICAgICMjICMjICAgICMjICMjIyMjIyMjICAjIyMjICMjIyMjIyMjICAjIyAgICAgIyMgICAgIyMgICAgIyMjIyMjIyNcbiovXG5cbmV4cG9ydCBjbGFzcyBDYW5kaWRhdGVTdGF0ZSBleHRlbmRzIFJhZnRTdGF0ZSB7XG4gIGNvbnN0cnVjdG9yKGxvZywgc2VuZCwgdGVybSwgcHJlVm90ZURvbmUpIHtcbiAgICBzdXBlcihsb2csIHNlbmQsIHRlcm0pXG5cbiAgICB0aGlzLl90aWNrID0gdGhpcy5fdGljay5iaW5kKHRoaXMpXG5cbiAgICAvLyBTdGFydCBieSBnYXRoZXJpbmcgYSBtYWpvcml0eSBvZiBwcmUtdm90ZXMsIG90aGVyd2lzZSB3ZSB3YWl0IHVudGlsIG5leHQgZWxlY3Rpb24uXG4gICAgLy8gUHJlLXZvdGVzIGFyZSBhIG1vZGlmaWNhdGlvbiB0byBSYWZ0LCBzZWUgcmFmdE1lc3NhZ2VzLmpzXG4gICAgdGhpcy5fcHJlVm90ZURvbmUgPSBwcmVWb3RlRG9uZVxuICAgIHRoaXMuX3ByZVZvdGVzID0gcHJlVm90ZURvbmUgPyBudWxsIDogbmV3IFZvdGVzKGxvZy5jb25maWd1cmF0aW9uLm93bklkKVxuICAgIHRoaXMuX3ZvdGVzID0gcHJlVm90ZURvbmUgPyBuZXcgVm90ZXMobG9nLmNvbmZpZ3VyYXRpb24ub3duSWQpIDogbnVsbFxuICAgIHRoaXMuX2ludGVydmFsSWQgPSBudWxsXG5cbiAgICB0aGlzLnN0YXJ0KClcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBgY2FuZGlkYXRle3Rlcm09JHt0aGlzLl90ZXJtfSx2b3Rlcz0ke3RoaXMuX3ZvdGVzfX1gXG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB0aGlzLl90aWNrKClcbiAgICB0aGlzLl9pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwodGhpcy5fdGljaywgRVhQRUNURURfUlRUX01TICogNClcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgaWYgKHRoaXMuX2ludGVydmFsSWQpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWxJZClcbiAgICAgIHRoaXMuX2ludGVydmFsSWQgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgX3RpY2soKSB7XG4gICAgbGV0IHJlcXVlc3RGYWN0b3J5ID0gdGhpcy5fcHJlVm90ZURvbmUgPyBSZXF1ZXN0Vm90ZVJlcXVlc3QgOiBQcmVWb3RlUmVxdWVzdFxuICAgIGxldCB2b3RlQ29sbGVjdGlvbiA9IHRoaXMuX3ByZVZvdGVEb25lID8gdGhpcy5fdm90ZXMgOiB0aGlzLl9wcmVWb3Rlc1xuXG4gICAgbGV0IHJlcXVlc3QgPSByZXF1ZXN0RmFjdG9yeS5jcmVhdGUoe1xuICAgICAgdGVybTogdGhpcy5fdGVybSxcbiAgICAgIGxhc3RMb2dUZXJtOiB0aGlzLl9sb2cubGFzdExvZ1Rlcm0sXG4gICAgICBsYXN0TG9nSW5kZXg6IHRoaXMuX2xvZy5sYXN0TG9nSW5kZXgsXG4gICAgfSlcblxuICAgIHRoaXMuX2xvZy5jb25maWd1cmF0aW9uLmZvckVhY2hQZWVyKHBlZXJJZCA9PiB7XG4gICAgICBpZiAoIXZvdGVDb2xsZWN0aW9uLmhhcyhwZWVySWQpKSB7XG4gICAgICAgIHRoaXMuX3NlbmQocGVlcklkLCByZXF1ZXN0KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBoYW5kbGVQcmVWb3RlUmVzcG9uc2UocGVlcklkLCBtZXNzYWdlKSB7XG4gICAgaWYgKCF0aGlzLl9wcmVWb3RlRG9uZSAmJiBtZXNzYWdlLnRlcm0gPT09IHRoaXMuX3Rlcm0pIHtcbiAgICAgIC8vIFdlIGdvdCBhIHZvdGUgZm9yIHRoZSBjdXJyZW50IHRlcm0sIHNvIHdlIHN0b3JlIHRoZSByZXBseSBhbmQgY2hlY2sgaWYgd2VcbiAgICAgIC8vIGhhdmUgcmVjZWl2ZWQgZW5vdWdoIHZvdGVzIHRvIGhhdmUgYSBtYWpvcml0eSBhbmQgYmVjb21lIGxlYWRlclxuICAgICAgdGhpcy5fcHJlVm90ZXMuc2V0KHBlZXJJZCwgbWVzc2FnZS5ncmFudGVkKVxuICAgICAgbG9nLmRlYnVnKFRBRywgdGhpcywgYHJlY2VpdmVkIHByZS12b3RlIHJlcGx5IGZyb20gJHtwZWVySWR9OiAke21lc3NhZ2UuZ3JhbnRlZCA/ICdncmFudGVkJyA6ICdyZWplY3RlZCd9YClcbiAgICAgIGlmICh0aGlzLl9sb2cuY29uZmlndXJhdGlvbi5oYXNNYWpvcml0eSh0aGlzLl9wcmVWb3Rlcy5ncmFudGVkVm90ZXMpKSB7XG4gICAgICAgIHRoaXMuX3ByZVZvdGVEb25lID0gdHJ1ZVxuICAgICAgICB0aGlzLl92b3RlcyA9IG5ldyBWb3Rlcyh0aGlzLl9sb2cuY29uZmlndXJhdGlvbi5vd25JZClcbiAgICAgICAgLy8gdHJpZ2dlciB0aWNrIGFuZCByZXNldCB0aW1lclxuICAgICAgICB0aGlzLnN0b3AoKVxuICAgICAgICB0aGlzLnN0YXJ0KClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVSZXF1ZXN0Vm90ZVJlc3BvbnNlKHBlZXJJZCwgbWVzc2FnZSkge1xuICAgIGlmICh0aGlzLl9wcmVWb3RlRG9uZSAmJiBtZXNzYWdlLnRlcm0gPT09IHRoaXMuX3Rlcm0pIHtcbiAgICAgIC8vIFdlIGdvdCBhIHZvdGUgZm9yIHRoZSBjdXJyZW50IHRlcm0sIHNvIHdlIHN0b3JlIHRoZSByZXBseSBhbmQgY2hlY2sgaWYgd2VcbiAgICAgIC8vIGhhdmUgcmVjZWl2ZWQgZW5vdWdoIHZvdGVzIHRvIGhhdmUgYSBtYWpvcml0eSBhbmQgYmVjb21lIGxlYWRlclxuICAgICAgdGhpcy5fdm90ZXMuc2V0KHBlZXJJZCwgbWVzc2FnZS5ncmFudGVkKVxuICAgICAgbG9nLmRlYnVnKFRBRywgdGhpcywgYHJlY2VpdmVkIHZvdGUgcmVwbHkgZnJvbSAke3BlZXJJZH06ICR7bWVzc2FnZS5ncmFudGVkID8gJ2dyYW50ZWQnIDogJ3JlamVjdGVkJ31gKVxuICAgICAgaWYgKHRoaXMuX2xvZy5jb25maWd1cmF0aW9uLmhhc01ham9yaXR5KHRoaXMuX3ZvdGVzLmdyYW50ZWRWb3RlcykpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9MZWFkZXIodGhpcy5fdGVybSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLypcbiAgICAgICAgIyMgICMjIyMjIyMgICMjIyMgIyMgICAgIyMgIyMjIyMjIyMgIyMjIyMjIyNcbiAgICAgICAgIyMgIyMgICAgICMjICAjIyAgIyMjICAgIyMgIyMgICAgICAgIyMgICAgICMjXG4gICAgICAgICMjICMjICAgICAjIyAgIyMgICMjIyMgICMjICMjICAgICAgICMjICAgICAjI1xuICAgICAgICAjIyAjIyAgICAgIyMgICMjICAjIyAjIyAjIyAjIyMjIyMgICAjIyMjIyMjI1xuICAjIyAgICAjIyAjIyAgICAgIyMgICMjICAjIyAgIyMjIyAjIyAgICAgICAjIyAgICMjXG4gICMjICAgICMjICMjICAgICAjIyAgIyMgICMjICAgIyMjICMjICAgICAgICMjICAgICMjXG4gICAjIyMjIyMgICAjIyMjIyMjICAjIyMjICMjICAgICMjICMjIyMjIyMjICMjICAgICAjI1xuKi9cblxuLy8gVGhlIGpvaW5lciBzdGF0ZSBpcyBhIG5ldyBzdGF0ZSBub3QgZG9jdW1lbnRlZCBpbiB0aGUgbWFpbiByYWZ0IHBhcGVyLlxuLy9cbi8vIEluIHRoaXMgc3RhdGUgdGhlIGNsaWVudCB3YWl0cyBmb3IgYSBzbmFwc2hvdCByZXF1ZXN0IHRvIGJlIGFibGUgdG8gam9pbiBpbiwgaXRcbi8vIHRoZW4gd2FpdHMgZm9yIGEgY29uZmlndXJhdGlvbiB0byBiZSBjb21taXR0ZWQgd2hlcmUgdGhlIGNsaWVudCBpcyBhIG1lbWJlciBvZiB0aGUgY2x1c3Rlci5cbi8vXG4vLyBXaGVuIGFkZGluZyBhIHBlZXIsIHRoZSBsZWFkZXIgd2lsbCBmaXJzdCBzZW5kIHNuYXB0c2hvdHMgdW50aWwgYSBzbmFwc2hvdCByZXNwb25zZSBmb3Jcbi8vIHRoZSBjdXJyZW50IHRlcm0gaXMgcmVjZWl2ZWQuIEl0IHdpbGwgdGhlbiByZXF1ZXN0IGEgbmV3IGNvbmZpZ3VyYXRpb24gd2hpY2ggaW5jbHVkZXMgdGhlXG4vLyBuZXcgY2xpZW50IGFzIHNvb24gYXMgcG9zc2libGUuXG4vL1xuLy8gQ2xpZW50cyBpbiB0aGUgam9pbmVyIHN0YXRlIHdpbGwgbm90IHZvdGUgb3IgYmUgcmVxdWVzdGVkIHRvIHZvdGUsIHRoZXkgd2lsbCBhbHNvIG5vdFxuLy8gdGltZSBvdXQgYW5kIHN0YXJ0IGNhbmRpZGF0aW5nLlxuZXhwb3J0IGNsYXNzIEpvaW5lclN0YXRlIGV4dGVuZHMgUmFmdFN0YXRlIHtcbiAgY29uc3RydWN0b3IobG9nLCBzZW5kKSB7XG4gICAgc3VwZXIobG9nLCBzZW5kLCAwKVxuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuICdqb2luZXJ7fSdcbiAgfVxuXG4gIGhhbmRsZUFwcGVuZEVudHJpZXNSZXF1ZXN0KHBlZXJJZCwgbWVzc2FnZSkge1xuICAgIGlmICh0aGlzLl90ZXJtID09PSAwKSB7XG4gICAgICAvLyBXZSBoYXZlbid0IHJlY2VpdmVkIGEgc25hcHNob3QgeWV0LiBUaGUgb2xkIGxlYWRlciB3YXMgcHJvYmFibHkgcmVwbGFjZWQgYW5kIHRoZSBuZXcgb25lIHRoaW5rc1xuICAgICAgLy8gd2UncmUgYSByZWd1bGFyIGNsdXN0ZXIgbWVtYmVyLlxuICAgICAgdGhpcy5fc2VuZChwZWVySWQsIG1lc3NhZ2UucmVzcG9uc2Uoe25lZWRTbmFwc2hvdDogdHJ1ZX0pKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGxldCByZXNwb25zZSA9IHRoaXMuX2xvZy5oYW5kbGVBcHBlbmRFbnRyaWVzUmVxdWVzdChtZXNzYWdlKVxuICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgdGhpcy5fc2VuZChwZWVySWQsIHJlc3BvbnNlKVxuICAgICAgdGhpcy5fdGVybSA9IG1lc3NhZ2UudGVybVxuICAgICAgcmV0dXJuIHRoaXMuX2NvbnZlcnRUb0ZvbGxvd2VySWZNZW1iZXIocGVlcklkKVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUFwcGVuZEVudHJpZXNSZXNwb25zZShwZWVySWQsIG1lc3NhZ2UpIHtcbiAgfVxuXG4gIGhhbmRsZVJlcXVlc3RWb3RlUmVxdWVzdChwZWVySWQsIG1lc3NhZ2UpIHtcbiAgICAvLyBqb2luZXJzIGRvIG5vdCBwYXJ0aWNpcGF0ZSBpbiB2b3RpbmcgaW4gYW55IHdheVxuICB9XG5cbiAgaGFuZGxlUmVxdWVzdFZvdGVSZXNwb25zZShwZWVySWQsIG1lc3NhZ2UpIHtcbiAgfVxuXG4gIGhhbmRsZVNuYXBzaG90UmVxdWVzdChwZWVySWQsIG1lc3NhZ2UpIHtcbiAgICBpZiAodGhpcy5fdGVybSA+IG1lc3NhZ2UudGVybSB8fCB0aGlzLl9sb2cuY29tbWl0SW5kZXggPiBtZXNzYWdlLmxhc3RJbmRleCkge1xuICAgICAgcmV0dXJuIC8vIGlnbm9yZSBvbGQgc25hcHNob3RzXG4gICAgfVxuICAgIHRoaXMuX2xvZy5sb2FkU25hcHNob3QobWVzc2FnZSlcbiAgICB0aGlzLl9zZW5kKHBlZXJJZCwgbWVzc2FnZS5yZXNwb25zZSgpKVxuICAgIHRoaXMuX3Rlcm0gPSBtZXNzYWdlLnRlcm1cbiAgICByZXR1cm4gdGhpcy5fY29udmVydFRvRm9sbG93ZXJJZk1lbWJlcihwZWVySWQpXG4gIH1cblxuICBoYW5kbGVTbmFwc2hvdFJlc3BvbnNlKHBlZXJJZCwgbWVzc2FnZSkge1xuICB9XG5cbiAgX2NvbnZlcnRUb0ZvbGxvd2VySWZNZW1iZXIocGVlcklkKSB7XG4gICAgbGV0IGNvbmZpZ0RhdGEgPSB0aGlzLl9sb2cuZ2V0Q29tbWl0dGVkQ29uZmlndXJhdGlvbkRhdGEoKVxuICAgIGxldCBvd25JZCA9IHRoaXMuX2xvZy5jb25maWd1cmF0aW9uLm93bklkXG4gICAgaWYgKGNvbmZpZ0RhdGEuaW5jbHVkZXMob3duSWQpKSB7XG4gICAgICBsb2cuaW5mbyhUQUcsIHRoaXMsICdmb3VuZCBpdHNlbGYgaW4gY29tbWl0dGVkIGNvbmZpZ3VyYXRpb24sIGNvbnZlcnRpbmcgdG8gZm9sbG93ZXInKVxuICAgICAgcmV0dXJuIHRoaXMudG9Gb2xsb3dlcih0aGlzLl90ZXJtLCBwZWVySWQpXG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGliL2NvbmZlcmVuY2UvcmFmdFN0YXRlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTcyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDUiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTczXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDUiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDE3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSA1IiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZ2V0ID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBpdGVyRm4gPSBnZXQoaXQpO1xuICBpZiAodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgcmV0dXJuIGFuT2JqZWN0KGl0ZXJGbi5jYWxsKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxNzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgNSIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5pc0l0ZXJhYmxlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPID0gT2JqZWN0KGl0KTtcbiAgcmV0dXJuIE9bSVRFUkFUT1JdICE9PSB1bmRlZmluZWRcbiAgICB8fCAnQEBpdGVyYXRvcicgaW4gT1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICB8fCBJdGVyYXRvcnMuaGFzT3duUHJvcGVydHkoY2xhc3NvZihPKSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDE3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSA1IiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBhcmdDaGVjayBmcm9tICdjb21tb24vYXJnQ2hlY2snXG5pbXBvcnQgbG9nIGZyb20gJ2NvbW1vbi9sb2cnXG5cbmltcG9ydCBMb2cgZnJvbSAnY29uZmVyZW5jZS9yYWZ0TG9nJ1xuaW1wb3J0IHtPUH0gZnJvbSAnY29uZmVyZW5jZS9yYWZ0TG9nRW50cnknXG5pbXBvcnQgQ29uZmlndXJhdGlvbiwge1xuICBDb25maWd1cmF0aW9uRGF0YSxcbiAgTWVtYmVycyxcbiAgVm90ZXMsXG59IGZyb20gJ2NvbmZlcmVuY2UvcmFmdENvbmZpZ3VyYXRpb24nXG5pbXBvcnQgTWVzaFRvcG9sb2d5IGZyb20gJ2NvbmZlcmVuY2UvbWVzaFRvcG9sb2d5J1xuaW1wb3J0IFN0YXRlTWFjaGluZSBmcm9tICdjb25mZXJlbmNlL3JhZnRTdGF0ZU1hY2hpbmUnXG5pbXBvcnQge1xuICBMZWFkZXJTdGF0ZSxcbiAgRm9sbG93ZXJTdGF0ZSxcbiAgSm9pbmVyU3RhdGUsXG4gIEVYUEVDVEVEX1JUVF9NUyxcbn0gZnJvbSAnY29uZmVyZW5jZS9yYWZ0U3RhdGUnXG5pbXBvcnQgUmFmdE1lc3NhZ2UsIHtcbiAgQXBwZW5kRW50cmllc1JlcXVlc3QsXG4gIEFwcGVuZEVudHJpZXNSZXNwb25zZSxcbiAgUmVxdWVzdFZvdGVSZXF1ZXN0LFxuICBSZXF1ZXN0Vm90ZVJlc3BvbnNlLFxuICBQcmVWb3RlUmVxdWVzdCxcbiAgUHJlVm90ZVJlc3BvbnNlLFxuICBTbmFwc2hvdFJlcXVlc3QsXG4gIFNuYXBzaG90UmVzcG9uc2UsXG4gIFN0YXRlT3BSZXF1ZXN0LFxuICBTdGF0ZU9wUmVzcG9uc2UsXG59IGZyb20gJ2NvbmZlcmVuY2UvcmFmdE1lc3NhZ2VzJ1xuXG4vKlxuICBDb25mZXJlbmNpbmcgY29uc2Vuc3VzIHBsYW46XG5cbiAgUmFmdCAoaHR0cHM6Ly9yYWZ0LmdpdGh1Yi5pby8pIHByb3ZpZGVzIGEgc2ltcGxlIGNvbnNlbnN1cyBhbGdvcml0aG0gd2hpY2hcbiAgaXMgcXVpdGUgZWFzeSB0byBpbXBsZW1lbnQgYW5kIHByb3ZlIHRvIGJlIGNvcnJlY3QuIEl0IGRvZXMgbm90IHByb3ZpZGVcbiAgQnl6YW50aW5lIGZhdWx0IHRvbGVyYW5jZSwgaS5lLiBpdCBhc3N1bWVzIHRoYXQgYWxsIGNsaWVudHMgYmVoYXZlIGNvcnJlY3RseS5cblxuICBFYWNoIGNvbmZlcmVuY2UgY2xpZW50IHBhcnRpY2lwYXRlcyBpbiB0aGUgUmFmdCBjb25zZW5zdXMgcHJvdG9jb2wsIHRoZXJlIGFyZSBub1xuICBjbGllbnQtb25seSBub2RlcywgbGlrZSBlLmcuIGluIGV0Y2QuXG4gIFRoZSBwcmltYXJ5IHB1cnBvc2Ugb2YgdGhlIFJhZnQgaW1wbGVtZW50YXRpb24gaXMgdG8gcHJvdmlkZSBhIHVuaWZpZWQgdmlldyBvZiB3aG8gdGhlXG4gIG1lbWJlcnMgb2YgdGhlIGNvbmZlcmVuY2UgYXJlLiBBbHRob3VnaCBpdCBtaWdodCBwcm92ZSB0byBiZSB1c2VmdWwgZm9yIG90aGVyIHR5cGVzIG9mXG4gIGxvZyByZXBsaWNhdGlvbiBhdCBhIGxhdGVyIHN0YWdlLlxuXG4gIFJhZnQgc3VwcG9ydHMgY29udHJvbGxlZCByZWNvbmZpZ3VyYXRpb24gb2YgdGhlIGNsdXN0ZXIgbWVtYmVycywgd2hpY2ggbWVhbnMgdGhhdCBjbGllbnRzXG4gIGNhbiBiZSBhZGRlZCBhbmQgcmVtb3ZlZCBhcyBsb25nIGFzIGEgbWFqb3JpdHkgb2YgdGhlIGN1cnJlbnQgY2x1c3RlciBjYW4gYWdyZWUgb24gdGhlIGNoYW5nZS5cbiAgRm9yIGNvbmZlcmVuY2VzIHdlIHdpbGwgc29tZXRpbWVzIHNlZSBiaWcgY2hhbmdlcyBpbiB0aGUgbnVtYmVyIG9mIHBhcnRpY2lwYW50cy4gQWRkaW5nXG4gIG1lbWJlcnMgaXMgcXVpdGUgc3RyYWlnaHQtZm9yd2FyZCB0byBkbyB3aXRoIHRoZSBiYXNlbGluZSBSYWZ0IGltcGxlbWVudGF0aW9uLCBldmVuIGlmXG4gIHRoZSBuZXcgbWVtYmVycyBtYWtlIHVwIHRoZSBtYWpvcml0eSBpbiB0aGUgbmV3IGNvbmZpZ3VyYXRpb24uIFJlbW92aW5nIG1lbWJlcnMgaXMgYWxzb1xuICBzdHJhaWdodC1mb3J3YXJkIGFzIGxvbmcgYXMgdGhlIHJlbW92ZWQgY2xpZW50cyBzdGF5IGNvbm5lY3RlZCB1bnRpbCB0aGUgbmV3IGNvbmZpZ3VyYXRpb25cbiAgaXMgaW4gcGxhY2UuXG4gIFRoZSB0cmlja3kgYml0IGlzIGdldHRpbmcgcmlkIG9mIGRpc2Nvbm5lY3RlZCBjbGllbnRzLiBUaGUgY2x1c3RlciBuZWVkcyB0byBiZSBhYmxlIHRvXG4gIHJlYWNoIGEgY29uc2Vuc3VzIHRoYXQgYSBjbGllbnQgaGFzIGJlZW4gZGlzY29ubmVjdGVkIGFuZCBjYW4gYmUgcmVtb3ZlZC4gVGhpcyB3aWxsIGJlXG4gIGV2ZW4gbW9yZSB0cm91Ymxlc29tZSBpZiBhIG1ham9yaXR5IG9mIHRoZSBjbHVzdGVyIGRpc2Nvbm5lY3RzLCBhcyBpdCBtYXkgY2F1c2UgdGhlXG4gIG5ldyBjb25maWd1cmF0aW9uIGFuZCB0aGUgZW50aXJlIGNsdXN0ZXIgdG8gZ2V0IHN0dWNrIGluIGEgYmFkIHN0YXRlLiBTb21lIG1lY2hhbmlzbVxuICBmb3IgaGFuZGxpbmcgbmV0c3BsaXRzIGJ5IGxldHRpbmcgbWlub3JpdGllcyBicmVhayBhd2F5IGZyb20gdGhlIGNsdXN0ZXIgbmVlZHMgdG8gYmVcbiAgaW1wbGVtZW50ZWQsIGFzIHdlbGwgYXMgYSBtZWNoYW5pc20gZm9yIHRob3NlIGNsaWVudHMgdG8gcG90ZW50aWFsbHkgcmVqb2luIHRoZSBjbHVzdGVyXG4gIGF0IGEgbGF0ZXIgcG9pbnQuXG5cbiAgQWx0ZXJuYXRpdmUgYXBwcm9hY2hlczpcblxuICBUaGUgbWFpbiBhbHRlcm5hdGl2ZSB0byB1c2luZyBSYWZ0IHRoYXQgaXMgYmVpbmcgY29uc2lkZXJlZCBpcyB0aGF0IGFsbCBwZWVycyB3b3VsZFxuICBzaW1wbHkgYnJvYWRjYXN0IHRoZSBwZWVycyB0aGF0IHRoZXkgYXJlIGNvbm5lY3RlZCB0byB0byBhbGwgdGhlaXIgY29ubmVjdGVkIHBlZXJzLlxuICBUaGlzIHdheSBldmVyeSBwZWVyIHdvdWxkIGJlIGFibGUgdG8gZ2V0IGEgc29tZXdoYXQgY29tcGxldGUgdmlldyBvZiB0aGUgbWVtYmVycyxcbiAgYWx0aG91Z2ggaXQgd291bGQgZmFpbCB0byByZXBvcnQgcGVlcnMgdGhhdCBhcmUgbW9yZSB0aGFuIHR3byBob3BzIGF3YXkuIENvbnNpZGVyXG4gIHRoZSBiZWxvdyBzY2VuYXJpbyB3aGVyZSBjbGllbnRzIEEsIEIsIEMgYW5kIEQgb25seSBoYXZlIDMgY29ubmVjdGlvbnMgc2V0IHVwIHNvIGZhci5cblxuICAgIEEgPC0+IEIgPC0+IEMgPC0+IERcblxuICBXaXRoIHRoZSBwcm9wb3NlZCBzb2x1dGlvbiwgQSB3b3VsZCBiZSB1bmF3YXJlIG9mIEQncyBleGlzdGVuY2UsIGFuZCB2aWNlIHZlcnNhLlxuICBUaGlzIGNvdWxkIGJlIHdvcmtlZCBhcm91bmQgYnkgc2VuZGluZyBtb3JlIGluZm9ybWF0aW9uIGJldHdlZW4gdGhlIHBlZXJzLCB3aXRoIHRoZVxuICBkb3duc2lkZSBvZiBhZGRlZCBjb21wbGV4aXR5IGFuZCBiYW5kd2lkdGggdXNhZ2UuXG4gIEJ0dywgUmFmdCBkb2VzIG5vdCBiZWhhdmUgcGVyZmVjdGx5IGluIHRoZSBhYm92ZSBzY2VuYXJpbyBlaXRoZXIsIGFzIEEgYW5kIEQgd291bGQgdGFrZVxuICB0dXJucyBpbiB0cmlnZ2VyaW5nIG5ldyBlbGVjdGlvbnMsIGJ1dCB0aGVyZSB3aWxsIHN0aWxsIGJlIHNvbWUgbG9nIHJlcGxpY2F0aW9uIGhhcHBlbmluZ1xuICBhbmQgbmV3IGNvbm5lY3Rpb25zIHNob3VsZCBiZSBzZXQgdXAgc29vbiBlbm91Z2guXG5cbiAgQW5vdGhlciBpc3N1ZSBpcyBmZWVkYmFjayBmb3IgdGhlIGNsaWVudHMsIHNob3VsZCBBIHJlc3BvbmQgdG8gcmVxdWVzdHMgZnJvbSBCPyBSYWZ0IHNvbHZlc1xuICB0aGlzIHdpdGggaGVhcnRiZWF0cyBhbmQgZWxlY3Rpb24gdGltZW91dHMuXG5cbiAgSW4gdGhlIGVuZCB0aGUgbWFpbiByZWFzb24gZm9yIGNob29zaW5nIFJhZnQgaXMgdGhhdCBpdCBpcyBhbiBlc3RhYmxpc2hlZCBhbGdvcml0aG0gdGhhdFxuICBpcyBzaW1wbGUgYW5kIGVhc3kgdG8gcHJvb3ZlIHRvIGJlIGNvcnJlY3QuIFNpbmNlIHJhZnQgbmVlZHMgdG8gYmUgZXh0ZW5kZWQgYSBiaXQgaW4gb3JkZXJcbiAgdG8gd29yayBmb3IgY29uZmVyZW5jZXMsIGl0IGlzIHBvc3NpYmxlIHRoYXQgdGhpcyBhbHRlcm5hdGl2ZSBpcyByZXZlaXNpdGVkIGlmIHRoZVxuICBtb2RpZmljYXRpb25zIGVuZCB1cCBiZWluZyB0b28gY29tcGxleC5cbiAgQSBkb3duc2lkZSBvZiB1c2luZyBSYWZ0IGlzIHRoYXQgdGhlIGxvZyByZXBsaWNhdGlvbiBmdW5jdGlvbmFsaXR5IGlzIG5vdCB1c2VkIGF0IHRoZVxuICBtb21lbnQsIGFuZCBpdCBhcmd1YWJseSB3aGF0IGFkZHMgdGhlIG1vc3QgY29tcGxleGl0eSB0byB0aGUgYWxnb3JpdGhtLiBIb3dldmVyLCBpdCBpc1xuICBxdWl0ZSBsaWtlbHkgdGhhdCBpdCB3aWxsIGJlIHVzZWQgaW4gdGhlIGZ1dHVyZSBmb3IgU21hcnQgTWVzaCBvciBTRlUuXG5cbiAgQ29uZmVyZW5jZSBzZXR1cCBmbG93OlxuXG4gIEFuIGltcG9ydGFudCBwaWVjZSBvZiBmdW5jdGlvbmFsaXR5IGZvciB0aGUgYmVsb3cgZmxvdyBpcyB0aGF0IGl0IGlzIHBvc3NpYmxlIHRvIGdlbmVyYXRlXG4gIGEgc2luZ2xlIG9mZmVyIHRoYXQgaXMgdmFsaWQgZm9yIG11bHRpcGxlIHBlZXIgY29ubmVjdGlvbnMsIGFzIGxvbmcgYXMgYWxsIHBlZXIgY29ubmVjdGlvbnNcbiAgYXJlIGNvbmZpZ3VyZWQgdG8gdXNlIHRoZSBzYW1lIGNlcnRpZmljYXRlLiBXZSB3aWxsIHRyeSB0byB1c2UgdGhpcyBmdW5jdGlvbmFsaXR5IGluaXRpYWxseVxuICBidXQgbWF5IGhhdmUgdG8gZmFsbCBiYWNrIHRvIGEgbW9yZSB0cmFuZGl0aW9uYWwgc2luZ2FsaW5nIGFwcHJvYWNoIGlmIHdlIHJ1biBpbnRvIHRyb3VibGVcbiAgd2l0aCBwbHVnaW5zIGFuZCBuYXRpdmUgbW9iaWxlIGNsaWVudHMuXG5cbiAgV2hlbiBqb2luaW5nIGEgY29uZmVyZW5jZSwgc2VuZCBhIEpPSU4gbWVzc2FnZSB3aXRoIHRoZSBSYWZ0IElEIGFuZCBhbiBvZmZlciBTRFAuXG4gIE5vdyBvbmUgb2YgdHdvIHRoaW5ncyBtYXkgaGFwcGVuLCBlaXRoZXIgdGhlcmUgaXMgYWxyZWFkeSBhbiBleGlzdGluZyBjb25mZXJlbmNlIGFuZCB0aGVcbiAgY2xpZW50IHdpbGwgYmUgYWRkZWQsIG9yIG5vIG9uZSByZXBsaWVzLCBhbmQgd2Ugd2FpdC4gV2UgbGlrZWx5IHdhbnQgdG8gcmVwZWF0IHRoZSBKT0lOXG4gIG1lc3NhZ2UgZXZlcnkgc28gb2Z0ZW4gd2hpbGUgd2FpdGluZywgaW4gb3JkZXIgdG8gcHJvdmlkZSBzb21lIGZhdWx0IHRvbGVyYW5jZS5cblxuICBXaGVuIGFuIGV4aXN0aW5nIGNvbmZlcmVuY2Ugc2VlcyBhIEpPSU4gbWVzc2FnZSBhIG51bWJlciBvZiBkaWZmZXJlbnQgdGhpbmdzIG1heSBoYXBwZW5cbiAgZGVwZW5kaW5nIG9uIHRoZSBzdGF0ZSBvZiB0aGUgY29uZmVyZW5jZS4gQnV0IHRoaXMgaXMgdGhlIGdlbmVyYWwgYWxnb3JpdGhtOlxuXG4gICgxKSBVcG9uIHJlY2VpdmluZyBhIEpPSU4gbWVzc2FnZSwgZXZlcnkgY2xpZW50IGFkZHMgdGhlIHBlZXIgdG8gYSBsaXN0IG9mIGpvaW5pbmcgcGVlcnMuXG4gICgyKSBFdmVyeSBjbGllbnQgdGhhdCBpcyBhIGxlYWRlciAodGhlcmUgbWF5IGJlIG11bHRpcGxlIHdpdGggZGlmZmVyZW50IHRlcm1zKSB3aWxsXG4gICAgICBzZW5kIGFuIGFuc3dlciB0byB0aGUgam9pbmluZyBwZWVyLiBUaGUgam9pbmVyIHdpbGwgc2V0IHVwIGEgY29ubmVjdGlvbiBmb3IgZWFjaCBhbnN3ZXIuXG4gICgzKSBPbmNlIGNvbm5lY3RlZCB0aGUgbGVhZGVyKHMpIHdpbGwgYWRkIHRoZSBwZWVyIGFzIGEgam9pbmluZyBjbGllbnQsIGFuZCB3aWxsIHN0YXJ0XG4gICAgICBvZmYgYnkgc2VuZGluZyBhIHNuYXBzaG90IG9mIHRoZSBjdXJyZW50IHN0YXRlLiBPbmNlIGEgcmVwbHkgZnJvbSB0aGUgc25hcHNob3QgcmVxdWVzdFxuICAgICAgaGFzIGJlZW4gcmVjZWl2ZWQgdGhlIGxlYWRlciB3aWxsIHJlcXVlc3QgYSBjb25maWd1cmF0aW9uIGNoYW5nZSB3aGljaCBpbmNsdWRlcyB0aGUgbmV3XG4gICAgICBjbGllbnQuXG4gICAgICBUaGUgam9pbmluZyBjbGllbnQgd2lsbCBwcmlvcml0aXplIHNuYXBzaG90cyB3aXRoIHRoZSBsYXRlc3QgdGVybSwgYW5kIGlnbm9yZWQgb2xkIG9uZXMuXG4gICAgICBPbmNlIHRoZSBjbGllbnQgaGFzIHJlY2VpdmVkIGEgY29uZmlndXJhdGlvbiB3aGVyZSB0aGV5IGFyZSBwcmVzZW50IGFuZCB0aGUgY29uZmlndXJhdGlvblxuICAgICAgaGFzIGJlZW4gY29tbWl0dGVkLCB0aGV5IHdpbGwgY29udmVydCB0byBhIGZvbGxvd2VyIGFuZCBiZSBhIGZ1bGwgbWVtYmVyIG9mIHRoZSBjbHVzdGVyLlxuICAgICAgRHVyaW5nIHRoaXMgdGltZSwgdGhlIGpvaW5pbmcgY2xpZW50IHdpbGwgY29tbXVuaWNhdGUgdmlhIHRoZSBjdXJyZW50IHAycCBjb25uZWN0aW9uc1xuICAgICAgdG8gc2V0IHVwIG5ldyBjb25uZWN0aW9ucyB0b3dhcmRzIHRoZSBvdGhlciBtZW1iZXJzIG9mIHRoZSBjbHVzdGVyLlxuICAoNCkgSWYgdGhlcmUgaXMgYSBsZWFkZXJzaGlwIGNoYW5nZSBkdXJpbmcgdGhlIGFib3ZlIHByb2Nlc3MsIHRoZSBuZXcgbGVhZGVyIHdpbGwgc3RhcnQgb3ZlclxuICAgICAgYXQgKDIpLCB0aGF0IGlzIGlmIHRoZSBjbGllbnQgaGFzIG5vdCBhbHJlYWR5IGpvaW5lZCB0aGUgY2x1c3Rlci4gVGhpcyBpcyB3aHkgZXZlcnlcbiAgICAgIGNsaWVudCBtdXN0IGtlZXAgdHJhY2sgb2YgSk9JTiBtZXNzYWdlcy5cblxuICBSZW1vdmluZyBkaXNjb25uZWN0ZWQgbWVtYmVyczpcblxuICBUaGUgY3VycmVudCBwbGFuIGlzIHRoYXQgZWFjaCBjbGllbnQgd2lsbCBpbmNsdWRlIHRoZSBjbGllbnRzIHRoYXQgaXQgaXMgbm90IGNvbm5lY3RlZFxuICB0byBpbiB0aGUgaGVhcnRiZWF0IHJlc3BvbnNlcy4gVGhhdCB3aWxsIG1ha2UgaXQgcG9zc2libGUgZm9yIHRoZSBsZWFkZXIgdG8gZGV0ZWN0IHdoZW5cbiAgbm8gY2xpZW50IGlzIGFibGUgdG8gcmVhY2ggYW5vdGhlciBjbGllbnQsIGFuZCBtYXkgdGhlbiBpbml0aWF0ZSBhIHJlY29uZmlndXJhdGlvbi5cblxuICBUaGUgdHJpY2tpZXIgcHJvYmxlbSBvZiBoYW5kbGluZyBuZXRzcGxpdHMgd2hlcmUgdGhlIGNvbmZlcmVuY2UgaXMgc3BsaXQgaW50byBzZWdtZW50c1xuICBpcyBub3QgeWV0IHNvbHZlZC4gVGhlIGN1cnJlbnQgaWRlYSBpcyB0byBtb2RpZnkgdGhlIHZvdGluZyBhbGdvcml0aG0gYW5kIGhhdmUgdm90ZVxuICByZXF1ZXN0cyBpbmNsdWRlIGNvbm5lY3RlZCBwZWVycy4gSG9wZWZ1bGx5IGl0J2xsIGJlIHBvc3NpYmxlIHRvIGZpbmQgYSBzaW1wbGUgd2F5IHRvXG4gIHNpbXVsdGFuZW91c2x5IGRvIGFuIGluc3RhbnQgcmVjb25maWd1cmF0aW9uIGFuZCBsZWFkZXIgZWxlY3Rpb24uIFRoaXMgaXMgcHJvYmFibHlcbiAgZG9hYmxlIGJlY2F1c2UgdGhlIG1ham9yaXR5IGxvZyBjb25zaXN0ZW5jeSBjb25zdHJhaW50IGNhbiBiZSBpZ25vcmVkLiBXaGVuIHRoZSBzZWdtZW50XG4gIHRoYXQgaGFzIGJlZW4gc3BsaWNlZCBvdXQgcmVqb2lucyB0aGUgY29uZmVyZW5jZSwgdGhlIGxvZ3MgZG9uJ3QgaGF2ZSB0byBiZSBjb25zaXN0ZW50LFxuICBpdCdsbCBiZSBwb3NzaWJsZSB0byBqdXN0IGRvIGEgcmVndWxhciBqb2luIHZpYSBzbmFwc2hvdHMuXG5cbiAgVXBkYXRlczpcblxuICAyNS0wMy0yMDE3LCBDbGllbnQgSURzOlxuXG4gIFRoZSBjdXJyZW50IGltcGxlbWVudGF0aW9uIHVzZXMgc2VwYXJhdGUgSURzIGZvciB1c2VycyBhbmQgcmFmdCBjbGllbnQsIGkuZS4gdGhlcmUgaXMgYSAxLU4gbWFwcGluZ1xuICBvZiB1c2VyIHRvIHJhZnQgSURzLiBUaGlzIGlzIGJlY2F1c2UgaWYgdGhlIHJhZnQgY2xpZW50IHN0YXRlIGlzIGxvc3QgaXMgaXQgbm8gbG9uZ2VyIHNhZmUgdG8gcmVqb2luXG4gIHRoZSBjbHVzdGVyIHVzaW5nIHRoZSBzYW1lIElELiBFbnRyaWVzIGFyZSBjb21taXR0ZWQgYmFzZWQgb24gdGhlIGtub3dsZWRnZSB0aGF0IGNsaWVudHMgYXJlIHVwIHRvIGRhdGUsXG4gIGFuZCBpZiBhIGNsaWVudCBsb3NlcyBpdCdzIHN0YXRlIGFuZCB0aGVuIHJlY29ubmVjdHMgdXNpbmcgdGhlIHNhbWUgSUQsIGluY29ycmVjdCBhc3N1bXB0aW9ucyBtYXkgYmVcbiAgbWFkZSBhYm91dCB3aGF0IGVudHJpZXMgYXJlIGFjdHVhbGx5IGNvbW1pdHRlZC5cblxuICBBIHBsYW5uZWQgY2hhbmdlIHdpbGwgY29uc29saWRhdGUgdGhlIElEcyB0byBvbmx5IHVzZSB1c2VyIElEcyBmb3IgYWxsIGNsaWVudHMuIFRoaXMgbWFrZXMgdGhlIGNvbmZlcmVuY2VcbiAgaW1wbGVtZW50YXRpb24gYSBsb3Qgc2ltcGxlciBhbmQgZWFzaWVyIHRvIHJlYXNvbiBhYm91dC4gVGhlIHJlYXNvbiB0aGlzIGNoYW5nZSBjYW4gYmUgbWFkZSBpcyB0aGVcbiAgaW50cm9kdWN0aW9uIG9mIHRoZSBKb2luZXIgc3RhdGUgYW5kIG1lc3NhZ2VzLiBCdWlsdCBpbnRvIHRoZSByYWZ0IGFsZ29yaXRobSBpcyB0aGUgZ3VhcmFudGVlIHRoYXQgaWZcbiAgdGhlcmUgZXhpc3RzIGEgY29tbWl0IGluZGV4IE4gd2l0aGluIHRoZSBjbHVzdGVyLCBvbmx5IGNsaWVudHMgdGhhdCBoYXZlIGF0IGxlYXN0IE4gbWF0Y2hpbmcgZW50cmllc1xuICBjYW4gZXZlciBiZSBlbGVjdGVkIGxlYWRlci4gU2luY2UgY2xpZW50cyB0aGF0IGFyZSBqb2luaW5nIHRoZSBjbHVzdGVyIGFsd2F5cyBkbyBzbyB0aHJvdWdoIGEgbGVhZGVyLFxuICBpdCBtZWFucyB0aGF0IGlmIGEgY2xpZW50IHJlY29ubmVjdHMsIGl0IHdpbGwgYWx3YXlzIHJlY2VpdmUgYSBzbmFwc2hvdCB0aGF0IHJlc3RvcmVzIGF0IGxlYXN0IE4gZW50cmllcy5cbiAgVGhpcyBtZWFucyB0aGF0IGFueSBjb21taXQgaW5kZXggZGV0ZXJtaW5lZCBieSBhIGxlYWRlciB3aWxsIHN0YXkgY29ycmVjdCwgZXZlbiBpZiBhIGNsaWVudCBsb3NlcyBpdCdzXG4gIHN0YXRlIGFuZCByZWNvbm5lY3RzLlxuXG4gIE9uZSBjYXZlYXQgaXMgdGhhdCBjbGllbnRzIHRoYXQgbG9zZSB0aGVpciBzdGF0ZSBNVVNUIHJlam9pbiB0aGUgY2x1c3RlciB0aHJvdWdoIHRoZSBqb2luZXIgbWVjaGFuaXNtLlxuICBJZiB0aGV5IHNpbXBseSByZWpvaW4gYXMgbWVtYmVycyB0aGVuIHRoZSBhYm92ZSBhc3N1bXB0aW9uIGRvZXMgbm90IGhvbGQgYW5kIHRoZSBpbXBsZW1lbnRhdGlvbiBpcyBub3Qgc2FmZS5cblxuICBUaGUgY3J1Y2lhbCBiaXQgaXMgdGhhdCByZWNvbm5lY3RpbmcgbWVtYmVycyBkbyBub3Qgdm90ZSB1bnRpbCB0aGV5IGhhdmUgcmVjZWl2ZWQgYSBzbmFwc2hvdC4gSXQgaXMgYWxzb1xuICBpbXBvcnRhbnQgdGhhdCBhbGwgc25hcHNob3RzIHRoYXQgYXJlIHNlbnQgY29udGFpbiBhbGwgb2YgdGhlIGN1cnJlbnQgbG9nIGVudHJpZXMgb2YgdGhlIGxlYWRlciwgb3RoZXJ3aXNlXG4gIHJlY29ubmVjdGluZyBtZW1iZXJzIG1pZ2h0IHJlY2VpdmUgYSBwYXJ0aWFsIHNuYXBzaG90IHdlcmUgdGhleSBhcmUgbWVtYmVyLCBhbmQgYmVnaW4gdm90aW5nIHRvbyBlYXJseS5cblxuICBJdCBpcyBhbHNvIHBvc3NpYmxlIHRoYXQgdGhlIGRpc2Nvbm5lY3RlZCBjbGllbnQgd2lsbCBiZSByZW1vdmVkIGZyb20gdGhlIGNsdXN0ZXIgYmVmb3JlIGl0IHJlam9pbnMuIEluXG4gIHRoYXQgY2FzZSB0aGUgb3JpZ2luYWwgcnVsZSBvZiB0aGUgcmFmdCBhbGdvcml0aG0gYXBwbGllcywgc2luY2UgaWYgaXQgaXMgcG9zc2libGUgdG8gdXBkYXRlIHRoZVxuICBjb25maWd1cmF0aW9uIHdpdGhvdXQgdGhlIHBhcnRpY2lwYXRpb24gb2YgdGhlIGRpc2Nvbm5lY3RlZCBjbGllbnQsIHRoZW4gdGhlIGVudHJpZXMgcHJpb3IgdG8gdGhlXG4gIHJlY29uZmlndXJhdGlvbiBjYW4gYmUgY29uc2lkZXJlZCBjb21taXR0ZWQsIGV2ZW4gd2l0aG91dCB0aGUgZGlzY29ubmVjdGVkIGNsaWVudC5cblxuICBJZiB0aGUgcmVjb25maWd1cmF0aW9uIGNhbiBub3QgYmUgY29tbWl0dGVkIGR1ZSB0byBsYWNrIG9mIG1ham9yaXR5LCB0aGUgc3RhdGUgbWFjaGluZSB3aWxsIGxvY2sgdXAgdW50aWxcbiAgZWl0aGVyIHRoZSBtZW1iZXIgcmVjb25uZWN0cywgb3Igc29tZSBvdGhlciBtZWNoYW5pc20gaXMgdXNlZCB0byByZWNvdmVyLiBUaGUgY2hhbmdlIHByb3Bvc2VkIGFib3ZlIGRvZXNcbiAgbm90IHNvbHZlIHRoaXMgaXNzdWUsIGJ1dCBpdCBsaWtlbHkgZG9lcyBub3QgbWFrZSBpdCBtb3JlIGRpZmZpY3VsdCB0byBzb2x2ZSBlaXRoZXIuXG4gKi9cblxuY2xhc3MgV2FpdExpc3Qge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9lbnRyaWVzID0gbmV3IE1hcCgpXG4gIH1cblxuICBhZGQoe3BlZXJJZCwgbXVzdFJlam9pbiwgdHRsTXN9KSB7XG4gICAgbGV0IGVuZFRpbWUgPSBEYXRlLm5vdygpICsgdHRsTXNcblxuICAgIGlmICh0aGlzLl9lbnRyaWVzLmhhcyhwZWVySWQpKSB7XG4gICAgICBsZXQgZW50cnkgPSB0aGlzLl9lbnRyaWVzLmdldChwZWVySWQpXG4gICAgICBlbmRUaW1lID0gTWF0aC5tYXgoZW5kVGltZSwgZW50cnkuZW5kVGltZSlcbiAgICAgIG11c3RSZWpvaW4gPSBtdXN0UmVqb2luIHx8IGVudHJ5Lm11c3RSZWpvaW5cbiAgICB9XG5cbiAgICB0aGlzLl9lbnRyaWVzLnNldChwZWVySWQsIHtlbmRUaW1lLCBtdXN0UmVqb2lufSlcbiAgfVxuXG4gIGRlbGV0ZShwZWVySWQpIHtcbiAgICB0aGlzLl9lbnRyaWVzLmRlbGV0ZShwZWVySWQpXG4gIH1cblxuICBkZWxldGVBbGwocGVlcklkcykge1xuICAgIHBlZXJJZHMuZm9yRWFjaChwZWVySWQgPT4gdGhpcy5kZWxldGUocGVlcklkKSlcbiAgfVxuXG4gIGdldCgpIHtcbiAgICBsZXQgd2FpdGluZyA9IG5ldyBTZXQoKVxuICAgIGxldCBkZWxldGVkID0gbmV3IFNldCgpXG4gICAgbGV0IG5vdyA9IERhdGUubm93KClcbiAgICB0aGlzLl9lbnRyaWVzLmZvckVhY2goKHttdXN0UmVqb2luLCBlbmRUaW1lfSwgcGVlcklkKSA9PiB7XG4gICAgICBpZiAobm93IDwgZW5kVGltZSkge1xuICAgICAgICB3YWl0aW5nLmFkZCh7cGVlcklkLCBtdXN0UmVqb2lufSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0ZWQuYWRkKHBlZXJJZClcbiAgICAgIH1cbiAgICB9KVxuICAgIGRlbGV0ZWQuZm9yRWFjaChwZWVySWQgPT4gdGhpcy5fZW50cmllcy5kZWxldGUocGVlcklkKSlcbiAgICByZXR1cm4gd2FpdGluZ1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5fZW50cmllcy5jbGVhcigpXG4gIH1cbn1cblxuY29uc3QgVEFHID0gJ3JhZnQnXG5cbmNvbnN0IEVMRUNUSU9OX0RFQURMT0NLX0xJTUlUID0gM1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYWZ0IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IHtcbiAgICAgIGlkLFxuICAgICAgbWVzaFRvcG9sb2d5LFxuICAgICAgb25NZXNzYWdlLFxuICAgICAgb25TdGF0ZUNoYW5nZSxcbiAgICAgIG9uTWVtYmVyc0NoYW5nZSxcbiAgICAgIG9uTGVhZGVyc2hpcENoYW5nZSxcbiAgICAgIG9uUmVwbGljYXRpb25EZWFkbG9jayxcbiAgICB9ID0gb3B0aW9uc1xuXG4gICAgdGhpcy5fc2VuZCA9IHRoaXMuX3NlbmQuYmluZCh0aGlzKVxuICAgIHRoaXMuX29uRWxlY3Rpb25UaW1lb3V0ID0gdGhpcy5fb25FbGVjdGlvblRpbWVvdXQuYmluZCh0aGlzKVxuICAgIHRoaXMuX29uQ29uZmlndXJhdGlvbkNvbW1pdHRlZCA9IHRoaXMuX29uQ29uZmlndXJhdGlvbkNvbW1pdHRlZC5iaW5kKHRoaXMpXG5cbiAgICB0aGlzLl9pZCA9IGFyZ0NoZWNrLnN0cmluZyh0aGlzLCAnaWQnLCBpZClcbiAgICBhcmdDaGVjay5pbnN0YW5jZSh0aGlzLCAnbWVzaFRvcG9sb2d5JywgbWVzaFRvcG9sb2d5LCBNZXNoVG9wb2xvZ3kpXG4gICAgdGhpcy5fb25NZXNzYWdlID0gYXJnQ2hlY2sub3B0RnVuYyh0aGlzLCAnb25NZXNzYWdlJywgb25NZXNzYWdlKVxuICAgIGFyZ0NoZWNrLm9wdEZ1bmModGhpcywgJ29uU3RhdGVDaGFuZ2UnLCBvblN0YXRlQ2hhbmdlKVxuICAgIHRoaXMuX29uTWVtYmVyc0NoYW5nZSA9IGFyZ0NoZWNrLm9wdEZ1bmModGhpcywgJ29uTWVtYmVyc0NoYW5nZScsIG9uTWVtYmVyc0NoYW5nZSlcbiAgICB0aGlzLl9vbkxlYWRlcnNoaXBDaGFuZ2UgPSBhcmdDaGVjay5vcHRGdW5jKHRoaXMsICdvbkxlYWRlcnNoaXBDaGFuZ2UnLCBvbkxlYWRlcnNoaXBDaGFuZ2UpXG4gICAgdGhpcy5fb25SZXBsaWNhdGlvbkRlYWRsb2NrID0gYXJnQ2hlY2sub3B0RnVuYyh0aGlzLCAnb25SZXBsaWNhdGlvbkRlYWRsb2NrJywgb25SZXBsaWNhdGlvbkRlYWRsb2NrKVxuXG4gICAgdGhpcy5fcmFmdFN0YXRlID0gbnVsbFxuICAgIHRoaXMuX2VsZWN0aW9uVGltZW91dElkID0gbnVsbFxuICAgIHRoaXMuX2VsZWN0aW9uVGltZW91dFRyaWdnZXJDb3VudCA9IDBcbiAgICB0aGlzLl93YWl0TGlzdCA9IG5ldyBXYWl0TGlzdCgpXG4gICAgdGhpcy5fc3RhdGVNYWNoaW5lID0gbmV3IFN0YXRlTWFjaGluZSh7XG4gICAgICBvblN0YXRlQ2hhbmdlLFxuICAgICAgb25Db25maWd1cmF0aW9uQ29tbWl0dGVkOiB0aGlzLl9vbkNvbmZpZ3VyYXRpb25Db21taXR0ZWQsXG4gICAgICBvblN0YXRlT3BSZXF1ZXN0OiByZXF1ZXN0ID0+IHRoaXMuX3JhZnRTdGF0ZSAmJiB0aGlzLl9yYWZ0U3RhdGUuZm9yd2FyZFN0YXRlT3BSZXF1ZXN0KHJlcXVlc3QpLFxuICAgIH0pXG4gICAgdGhpcy5fbG9nID0gbmV3IExvZyh7XG4gICAgICBtZXNoVG9wb2xvZ3ksXG4gICAgICBjb25maWd1cmF0aW9uOiBuZXcgQ29uZmlndXJhdGlvbih7b3duSWQ6IGlkfSksXG4gICAgICBzdGF0ZU1hY2hpbmU6IHRoaXMuX3N0YXRlTWFjaGluZSxcbiAgICB9KVxuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGByYWZ0e2lkPSR7dGhpcy5pZH0sJHt0aGlzLl9yYWZ0U3RhdGV9LCR7dGhpcy5fbG9nfSwke3RoaXMuX3N0YXRlTWFjaGluZX19YFxuICB9XG5cbiAgZ2V0IGlkKCkge1xuICAgIHJldHVybiB0aGlzLl9pZFxuICB9XG5cbiAgZ2V0IGxvZygpIHtcbiAgICByZXR1cm4gdGhpcy5fbG9nXG4gIH1cblxuICBnZXQgaXNMZWFkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JhZnRTdGF0ZSBpbnN0YW5jZW9mIExlYWRlclN0YXRlXG4gIH1cblxuICBnZXQgbWVtYmVycygpIHtcbiAgICByZXR1cm4gdGhpcy5fbG9nLmNvbmZpZ3VyYXRpb24ubWVtYmVyc1xuICB9XG5cbiAgZ2V0IHRlcm0oKSB7XG4gICAgaWYgKCF0aGlzLl9yYWZ0U3RhdGUpIHtcbiAgICAgIHJldHVybiAwXG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9yYWZ0U3RhdGUuX3Rlcm1cbiAgfVxuXG4gIHN0YXJ0KGluaXRpYWxNZW1iZXJzID0gW3RoaXMuaWRdKSB7XG4gICAgdGhpcy5zdG9wKClcbiAgICB0aGlzLl9zdGF0ZU1hY2hpbmUuc3RhcnQoKVxuXG4gICAgbGV0IGRhdGEgPSBuZXcgQ29uZmlndXJhdGlvbkRhdGEobmV3IE1lbWJlcnMoaW5pdGlhbE1lbWJlcnMpKVxuICAgIHRoaXMuX2xvZy5jb25maWd1cmF0aW9uLnNldChkYXRhKVxuXG4gICAgaWYgKHRoaXMubG9nLmNvbmZpZ3VyYXRpb24uaGFzTWFqb3JpdHkobmV3IFZvdGVzKHRoaXMuX2lkKSkpIHtcbiAgICAgIHRoaXMuX3NldFN0YXRlKG5ldyBMZWFkZXJTdGF0ZSh0aGlzLl9sb2csIHRoaXMuX3NlbmQsIDEpKVxuICAgICAgbG9nLmRlYnVnKFRBRywgdGhpcywgJ3N0YXJ0aW5nIGFzIGxlYWRlciwgc2lnbmFsaW5nIGNvbmZpZ3VyYXRpb24gY29tbWl0JylcbiAgICAgIHRoaXMuX29uQ29uZmlndXJhdGlvbkNvbW1pdHRlZCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NldFN0YXRlKG5ldyBGb2xsb3dlclN0YXRlKHRoaXMuX2xvZywgdGhpcy5fc2VuZCkpXG4gICAgfVxuICB9XG5cbiAgc3RhcnRQYXNzaXZlKCkge1xuICAgIHRoaXMuc3RvcCgpXG4gICAgdGhpcy5fc3RhdGVNYWNoaW5lLnN0YXJ0KClcbiAgICB0aGlzLl9zZXRTdGF0ZShuZXcgSm9pbmVyU3RhdGUodGhpcy5fbG9nLCB0aGlzLl9zZW5kKSlcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgaWYgKHRoaXMuX3JhZnRTdGF0ZSAmJiB0aGlzLl9yYWZ0U3RhdGUuc3RvcCkge1xuICAgICAgdGhpcy5fcmFmdFN0YXRlLnN0b3AoKVxuICAgIH1cbiAgICB0aGlzLl9zdGF0ZU1hY2hpbmUuc3RvcCgpXG5cbiAgICB0aGlzLl93YWl0TGlzdC5jbGVhcigpXG5cbiAgICB0aGlzLl9sb2cuY2xlYXIoKVxuICAgIGxldCBkYXRhID0gbmV3IENvbmZpZ3VyYXRpb25EYXRhKG5ldyBNZW1iZXJzKCkpXG4gICAgdGhpcy5fbG9nLmNvbmZpZ3VyYXRpb24uc2V0KGRhdGEpXG5cbiAgICB0aGlzLl9zZXRTdGF0ZShudWxsKSAvLyBVc2UgX3NldFN0YXRlIHRvIHByb3Blcmx5IHRyaWdnZXIgbGVhZGVyc2hpcCBjaGFuZ2VcbiAgICB0aGlzLl9zdG9wRWxlY3Rpb25UaW1lb3V0KClcbiAgfVxuXG4gIGdldChrZXkpIHtcbiAgICBhcmdDaGVjay5zdHJpbmcoJ1JhZnQuZ2V0JywgJ2tleScsIGtleSlcbiAgICByZXR1cm4gdGhpcy5fc3RhdGVNYWNoaW5lLnN0YXRlW2tleV1cbiAgfVxuXG4gIGFwcGVuZChrZXksIHZhbHVlLCB7cmV0cnlUdGxNcyA9IDMwMDB9ID0ge30pIHtcbiAgICBhcmdDaGVjay5zdHJpbmcoJ1JhZnQuYXBwZW5kJywgJ2tleScsIGtleSlcbiAgICBpZiAoIXRoaXMuX3JhZnRTdGF0ZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignUmFmdCBpcyBzdG9wcGVkJykpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9zdGF0ZU1hY2hpbmUucmVxdWVzdFN0YXRlT3Aoe1xuICAgICAgb3A6IE9QLmFwcGVuZCxcbiAgICAgIGFyZ3M6IFtrZXksIHZhbHVlXSxcbiAgICAgIHJldHJ5VHRsTXMsXG4gICAgfSlcbiAgfVxuXG4gIHNldChrZXksIHZhbHVlLCB7cmV0cnlUdGxNcyA9IDMwMDB9ID0ge30pIHtcbiAgICBhcmdDaGVjay5zdHJpbmcoJ1JhZnQuc2V0JywgJ2tleScsIGtleSlcbiAgICBpZiAoIXRoaXMuX3JhZnRTdGF0ZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignUmFmdCBpcyBzdG9wcGVkJykpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9zdGF0ZU1hY2hpbmUucmVxdWVzdFN0YXRlT3Aoe1xuICAgICAgb3A6IE9QLnNldCxcbiAgICAgIGFyZ3M6IFtrZXksIHZhbHVlXSxcbiAgICAgIHJldHJ5VHRsTXMsXG4gICAgfSlcbiAgfVxuXG4gIC8vIG11c3RSZWpvaW4gc2hvdWxkIGJlIHRydWUgaWYgdGhlIHBlZXIgaXMgY3VycmVudGx5IGluIGFub3RoZXIgY2x1c3Rlci4gT3RoZXJ3aXNlXG4gIC8vIHdlIHdpbGwgZW5kIHVwIHdpdGggaW5jb25zaXN0ZW5jaWVzIGluIHRoZSByYWZ0IGxvZy5cbiAgYWRkUGVlcihwZWVySWQsIHttdXN0UmVqb2luID0gdHJ1ZSwgd2FpdGxpc3RUdGxNcyA9IDB9ID0ge30pIHtcbiAgICB0aGlzLl93YWl0TGlzdC5hZGQoe3BlZXJJZCwgbXVzdFJlam9pbiwgdHRsTXM6IHdhaXRsaXN0VHRsTXN9KVxuICAgIGlmICh0aGlzLl9yYWZ0U3RhdGUgJiYgdGhpcy5fcmFmdFN0YXRlLmFkZFBlZXIpIHtcbiAgICAgIHRoaXMuX3JhZnRTdGF0ZS5hZGRQZWVyKHtwZWVySWQsIG11c3RSZWpvaW59KVxuICAgIH1cbiAgfVxuXG4gIF9zZW5kKHBlZXJJZCwgYm9keSkge1xuICAgIGxvZy52ZXJib3NlKFRBRywgdGhpcywgYHNlbmQgbWVzc2FnZSB0byAnJHtwZWVySWR9JzogJHtib2R5fWApXG4gICAgdGhpcy5fb25NZXNzYWdlKHBlZXJJZCwgYm9keSlcbiAgfVxuXG4gIF9zZXRTdGF0ZShuZXdTdGF0ZSkge1xuICAgIGxldCB3YXNMZWFkZXIgPSB0aGlzLl9yYWZ0U3RhdGUgaW5zdGFuY2VvZiBMZWFkZXJTdGF0ZVxuICAgIHRoaXMuX3JhZnRTdGF0ZSA9IG5ld1N0YXRlXG4gICAgaWYgKHRoaXMuX3JhZnRTdGF0ZSBpbnN0YW5jZW9mIExlYWRlclN0YXRlKSB7XG4gICAgICB0aGlzLl9zdG9wRWxlY3Rpb25UaW1lb3V0KClcbiAgICAgIHRoaXMuX3dhaXRMaXN0LmdldCgpLmZvckVhY2goKHtwZWVySWQsIG11c3RSZWpvaW59KSA9PiB7XG4gICAgICAgIC8vIEV2ZW4gYWZ0ZXIgYmVjb21pbmcgbGVhZGVyIHdlIG11c3QgYWRkIHRoZSBwZWVycyBmcm9tIHRoZSB3YWl0bGlzdCwgaW4gY2FzZSB0aGV5IG5ldmVyIGdvdFxuICAgICAgICAvLyBhIHNuYXBzaG90IGZyb20gdGhlIHByZXZpb3VzIGxlYWRlci5cbiAgICAgICAgLy8gVGhpcyBtZWFucyB0aGF0IHJlY29ubmVjdGluZyBjbGllbnRzIHdpbGwga2VlcCBnZXR0aW5nIHNuYXBzaG90cyBmcm9tIG5ldyBsZWFkZXJzIHVudGlsIHRoZSBhZGRcbiAgICAgICAgLy8gdHRsIHJ1bnMgb3V0LCBzbyBpdCBzaG91bGQgbm90IGJlIHRvbyBsb25nLlxuICAgICAgICB0aGlzLl9yYWZ0U3RhdGUuYWRkUGVlcih7cGVlcklkLCBtdXN0UmVqb2lufSlcbiAgICAgIH0pXG4gICAgfSBlbHNlIGlmICh0aGlzLl9yYWZ0U3RhdGUgaW5zdGFuY2VvZiBKb2luZXJTdGF0ZSkge1xuICAgICAgdGhpcy5fc3RvcEVsZWN0aW9uVGltZW91dCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Jlc2V0RWxlY3Rpb25UaW1lb3V0KClcbiAgICB9XG4gICAgaWYgKHRoaXMuX29uTGVhZGVyc2hpcENoYW5nZSkge1xuICAgICAgbGV0IGlzTGVhZGVyID0gdGhpcy5fcmFmdFN0YXRlIGluc3RhbmNlb2YgTGVhZGVyU3RhdGVcbiAgICAgIGlmICh3YXNMZWFkZXIgIT09IGlzTGVhZGVyKSB7XG4gICAgICAgIGxvZy5pbmZvKFRBRywgdGhpcywgJ2NoYW5nZWQgbGVhZGVyc2hpcCBzdGF0dXMnKVxuICAgICAgICB0aGlzLl9vbkxlYWRlcnNoaXBDaGFuZ2UoaXNMZWFkZXIpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlTWVzc2FnZShwZWVySWQsIGJvZHkpIHtcbiAgICBpZiAoIXRoaXMuX3JhZnRTdGF0ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGxldCBtZXNzYWdlID0gUmFmdE1lc3NhZ2UucGFyc2UoYm9keSlcbiAgICBsb2cudmVyYm9zZShUQUcsIHRoaXMsIGByZWNlaXZlIG1lc3NhZ2UgZnJvbSAnJHtwZWVySWR9JzogJHttZXNzYWdlfWApXG4gICAgaWYgKG1lc3NhZ2UudGVybSAmJiBtZXNzYWdlLnRlcm0gPCB0aGlzLl9yYWZ0U3RhdGUuX3Rlcm0pIHtcbiAgICAgIC8vIE9sZCByZXNwb25zZXMgYXJlIGFsd2F5cyBzaWxlbnRseSBpZ25vcmVkXG4gICAgICAvLyBPbGQgcmVxdWVzdHMgYXJlIGFsd2F5cyByZWplY3RlZCwgYnV0IHNlbmQgcmVwbHkgc28gdGhlIHBlZXIgY2FuIGJlIHVwZGF0ZWRcbiAgICAgIGlmIChtZXNzYWdlLmlzUmVxdWVzdCkge1xuICAgICAgICB0aGlzLl9zZW5kKHBlZXJJZCwgbWVzc2FnZS5yZXNwb25zZSh7dGVybTogdGhpcy5fcmFmdFN0YXRlLl90ZXJtfSkpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBuZXdTdGF0ZVxuICAgICAgc3dpdGNoIChtZXNzYWdlLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgIGNhc2UgQXBwZW5kRW50cmllc1JlcXVlc3Q6XG4gICAgICAgICAgbmV3U3RhdGUgPSB0aGlzLl9yYWZ0U3RhdGUuaGFuZGxlQXBwZW5kRW50cmllc1JlcXVlc3QocGVlcklkLCBtZXNzYWdlKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgQXBwZW5kRW50cmllc1Jlc3BvbnNlOlxuICAgICAgICAgIG5ld1N0YXRlID0gdGhpcy5fcmFmdFN0YXRlLmhhbmRsZUFwcGVuZEVudHJpZXNSZXNwb25zZShwZWVySWQsIG1lc3NhZ2UpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBSZXF1ZXN0Vm90ZVJlcXVlc3Q6XG4gICAgICAgICAgbmV3U3RhdGUgPSB0aGlzLl9yYWZ0U3RhdGUuaGFuZGxlUmVxdWVzdFZvdGVSZXF1ZXN0KHBlZXJJZCwgbWVzc2FnZSlcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFJlcXVlc3RWb3RlUmVzcG9uc2U6XG4gICAgICAgICAgbmV3U3RhdGUgPSB0aGlzLl9yYWZ0U3RhdGUuaGFuZGxlUmVxdWVzdFZvdGVSZXNwb25zZShwZWVySWQsIG1lc3NhZ2UpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBQcmVWb3RlUmVxdWVzdDpcbiAgICAgICAgICBuZXdTdGF0ZSA9IHRoaXMuX3JhZnRTdGF0ZS5oYW5kbGVQcmVWb3RlUmVxdWVzdChwZWVySWQsIG1lc3NhZ2UpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBQcmVWb3RlUmVzcG9uc2U6XG4gICAgICAgICAgbmV3U3RhdGUgPSB0aGlzLl9yYWZ0U3RhdGUuaGFuZGxlUHJlVm90ZVJlc3BvbnNlKHBlZXJJZCwgbWVzc2FnZSlcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFNuYXBzaG90UmVxdWVzdDpcbiAgICAgICAgICBuZXdTdGF0ZSA9IHRoaXMuX3JhZnRTdGF0ZS5oYW5kbGVTbmFwc2hvdFJlcXVlc3QocGVlcklkLCBtZXNzYWdlKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgU25hcHNob3RSZXNwb25zZTpcbiAgICAgICAgICBuZXdTdGF0ZSA9IHRoaXMuX3JhZnRTdGF0ZS5oYW5kbGVTbmFwc2hvdFJlc3BvbnNlKHBlZXJJZCwgbWVzc2FnZSlcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFN0YXRlT3BSZXF1ZXN0OlxuICAgICAgICAgIG5ld1N0YXRlID0gdGhpcy5fcmFmdFN0YXRlLmhhbmRsZVN0YXRlT3BSZXF1ZXN0KHBlZXJJZCwgbWVzc2FnZSlcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFN0YXRlT3BSZXNwb25zZTpcbiAgICAgICAgICAvLyBTdGF0ZU9wIHJlc3BvbnNlcyBhcmUgaGFuZGxlZCBieSB0aGUgc3RhdGUgbWFjaGluZSwgc2luY2UgdGhlIHN0YXRlXG4gICAgICAgICAgLy8gZG9lc24ndCBoYXZlIGFueSB1c2UgZm9yIGl0IGFueXdheSwgYW5kIHRoZSBzdGF0ZSBtYWNoaW5lIHVzZXNcbiAgICAgICAgICAvLyBpdCBmb3IgcXVpY2tlciBmZWVkYmFjay5cbiAgICAgICAgICB0aGlzLl9zdGF0ZU1hY2hpbmUuaGFuZGxlU3RhdGVPcFJlc3BvbnNlKHBlZXJJZCwgbWVzc2FnZSlcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgLy8gX3JhZnRTdGF0ZSBpcyBub3Qgc2V0IHdlIHdlcmUgc3RvcHBlZCBpbiB0aGUgaGFuZGxlclxuICAgICAgaWYgKG5ld1N0YXRlICYmIHRoaXMuX3JhZnRTdGF0ZSkge1xuICAgICAgICB0aGlzLl9zZXRTdGF0ZShuZXdTdGF0ZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfcmVzZXRFbGVjdGlvblRpbWVvdXQoKSB7XG4gICAgbG9nLnZlcmJvc2UoVEFHLCB0aGlzLCAnZWxlY3Rpb24gdGltZXIgcmVzdGFydGVkJylcbiAgICBpZiAodGhpcy5fZWxlY3Rpb25UaW1lb3V0SWQpIHtcbiAgICAgIHRoaXMuX2VsZWN0aW9uVGltZW91dFRyaWdnZXJDb3VudCA9IDBcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9lbGVjdGlvblRpbWVvdXRJZClcbiAgICB9XG4gICAgbGV0IHRpbWVvdXRNcyA9IEVYUEVDVEVEX1JUVF9NUyAqIDggKyBFWFBFQ1RFRF9SVFRfTVMgKiAxMiAqIE1hdGgucmFuZG9tKClcbiAgICB0aGlzLl9lbGVjdGlvblRpbWVvdXRJZCA9IHNldFRpbWVvdXQodGhpcy5fb25FbGVjdGlvblRpbWVvdXQsIHRpbWVvdXRNcylcbiAgfVxuXG4gIF9zdG9wRWxlY3Rpb25UaW1lb3V0KCkge1xuICAgIGlmICh0aGlzLl9lbGVjdGlvblRpbWVvdXRJZCkge1xuICAgICAgbG9nLnZlcmJvc2UoVEFHLCB0aGlzLCAnZWxlY3Rpb24gdGltZXIgc3RvcHBlZCcpXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fZWxlY3Rpb25UaW1lb3V0SWQpXG4gICAgICB0aGlzLl9lbGVjdGlvblRpbWVvdXRJZCA9IG51bGxcbiAgICB9XG4gIH1cblxuICBfb25FbGVjdGlvblRpbWVvdXQoKSB7XG4gICAgdGhpcy5fZWxlY3Rpb25UaW1lb3V0SWQgPSBudWxsXG4gICAgbG9nLmluZm8oVEFHLCB0aGlzLCAnZWxlY3Rpb24gdGltZW91dCcpXG4gICAgLy8gV2UgdGltZWQgb3V0IHdhaXRpbmcgZm9yIGhlYXJ0YmVhdCwgc3RhcnQgY2FtcGFpZ25pbmcgZm9yIGxlYWRlcnNoaXAgb2YgbmV4dCB0ZXJtXG4gICAgaWYgKHRoaXMubG9nLmNvbmZpZ3VyYXRpb24uaGFzTWFqb3JpdHkobmV3IFZvdGVzKHRoaXMuX2lkKSkpIHtcbiAgICAgIHRoaXMuX3NldFN0YXRlKHRoaXMuX3JhZnRTdGF0ZS50b0xlYWRlcih0aGlzLl9yYWZ0U3RhdGUuX3Rlcm0gKyAxKSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZWxlY3Rpb25UaW1lb3V0VHJpZ2dlckNvdW50ICs9IDFcbiAgICAgIGlmICh0aGlzLl9lbGVjdGlvblRpbWVvdXRUcmlnZ2VyQ291bnQgPiBFTEVDVElPTl9ERUFETE9DS19MSU1JVCkge1xuICAgICAgICB0aGlzLl9vblJlcGxpY2F0aW9uRGVhZGxvY2soKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc2V0U3RhdGUodGhpcy5fcmFmdFN0YXRlLnRvQ2FuZGlkYXRlKHRoaXMuX3JhZnRTdGF0ZS5fdGVybSArIDEsIGZhbHNlKSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfb25Db25maWd1cmF0aW9uQ29tbWl0dGVkKCkge1xuICAgIGxvZy5kZWJ1ZyhUQUcsIHRoaXMsICdjb21taXR0ZWQgbmV3IGNvbmZpZ3VyYXRpb24nKVxuXG4gICAgdGhpcy5fd2FpdExpc3QuZGVsZXRlQWxsKHRoaXMubG9nLmNvbmZpZ3VyYXRpb24ubWVtYmVycylcbiAgICBpZiAodGhpcy5fb25NZW1iZXJzQ2hhbmdlKSB7XG4gICAgICBQcm9taXNlLnJlamVjdCgpLmNhdGNoKCgpID0+IHtcbiAgICAgICAgdGhpcy5fb25NZW1iZXJzQ2hhbmdlKHRoaXMubG9nLmNvbmZpZ3VyYXRpb24ubWVtYmVycylcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGliL2NvbmZlcmVuY2UvcmFmdC5qcyIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgYXJnQ2hlY2sgZnJvbSAnY29tbW9uL2FyZ0NoZWNrJ1xuaW1wb3J0IGxvZyBmcm9tICdjb21tb24vbG9nJ1xuXG5pbXBvcnQge0NvbmZpZ3VyYXRpb25EYXRhLCBNZW1iZXJzfSBmcm9tICdjb25mZXJlbmNlL3JhZnRDb25maWd1cmF0aW9uJ1xuaW1wb3J0IHtTbmFwc2hvdFJlcXVlc3R9IGZyb20gJ2NvbmZlcmVuY2UvcmFmdE1lc3NhZ2VzJ1xuaW1wb3J0IHtPcEVudHJ5LCBDb25maWd1cmF0aW9uRW50cnl9IGZyb20gJ2NvbmZlcmVuY2UvcmFmdExvZ0VudHJ5J1xuXG5jb25zdCBUQUcgPSAncmFmdCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFmdExvZyB7XG4gIGNvbnN0cnVjdG9yKHtzdGF0ZU1hY2hpbmUsIG1lc2hUb3BvbG9neSwgY29uZmlndXJhdGlvbn0pIHtcbiAgICB0aGlzLl9zdGF0ZU1hY2hpbmUgPSBzdGF0ZU1hY2hpbmVcbiAgICB0aGlzLl9tZXNoVG9wb2xvZ3kgPSBtZXNoVG9wb2xvZ3lcbiAgICB0aGlzLl9jb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvblxuXG4gICAgdGhpcy5fZW50cmllcyA9IFtdXG4gICAgdGhpcy5fb2Zmc2V0ID0gMFxuICAgIHRoaXMuX2NvbW1pdEluZGV4ID0gMFxuICAgIHRoaXMuX2xhc3RBcHBsaWVkID0gMFxuICAgIHRoaXMuX3NuYXBzaG90ID0gbnVsbFxuICAgIHRoaXMuX2NvbmZpZ3VyYXRpb25JbmRleCA9IDBcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIGxldCBlbnRyaWVzID0gdGhpcy5fZW50cmllcy5zbGljZSh0aGlzLl9sYXN0QXBwbGllZCAtIHRoaXMuX29mZnNldCkuam9pbignLCcpXG4gICAgcmV0dXJuIGBsb2d7bGxpPSR7dGhpcy5sYXN0TG9nSW5kZXh9LGxsdD0ke3RoaXMubGFzdExvZ1Rlcm19LGNpPSR7dGhpcy5jb21taXRJbmRleH1gICtcbiAgICBgLGxhPSR7dGhpcy5fbGFzdEFwcGxpZWR9LCR7dGhpcy5fY29uZmlndXJhdGlvbn0sZXM9WyR7ZW50cmllc31dfWBcbiAgfVxuXG4gIGdldCBtZXNoVG9wb2xvZ3koKSB7XG4gICAgcmV0dXJuIHRoaXMuX21lc2hUb3BvbG9neVxuICB9XG5cbiAgZ2V0IGNvbmZpZ3VyYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZ3VyYXRpb25cbiAgfVxuXG4gIGdldCBsYXN0RW50cnkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW50cnlBdEluZGV4KHRoaXMubGFzdExvZ0luZGV4KVxuICB9XG5cbiAgZ2V0IGxhc3RMb2dJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5fb2Zmc2V0ICsgdGhpcy5fZW50cmllcy5sZW5ndGhcbiAgfVxuXG4gIGdldCBsYXN0TG9nVGVybSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbnRyeVRlcm1BdEluZGV4KHRoaXMubGFzdExvZ0luZGV4KVxuICB9XG5cbiAgZ2V0IGNvbW1pdEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLl9jb21taXRJbmRleFxuICB9XG5cbiAgZW50cnlBdEluZGV4KGluZGV4KSB7XG4gICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZW50cmllc1tpbmRleCAtIDEgLSB0aGlzLl9vZmZzZXRdIHx8IG51bGxcbiAgfVxuXG4gIGVudHJ5VGVybUF0SW5kZXgoaW5kZXgpIHtcbiAgICBpZiAodGhpcy5fc25hcHNob3QpIHtcbiAgICAgIGlmIChpbmRleCA8IHRoaXMuX3NuYXBzaG90Lmxhc3RJbmRleCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYW4ndCBnZXQgdGVybSBmb3IgZW50cnkgYWhlYWQgb2YgbG9jYWwgc25hcHNob3RcIilcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IHRoaXMuX3NuYXBzaG90Lmxhc3RJbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc25hcHNob3QubGFzdFRlcm1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGluZGV4ID4gdGhpcy5fZW50cmllcy5sZW5ndGggKyB0aGlzLl9vZmZzZXQgfHwgaW5kZXggPCAxKSB7XG4gICAgICByZXR1cm4gMFxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lbnRyeUF0SW5kZXgoaW5kZXgpLnRlcm1cbiAgfVxuXG4gIC8vIGZyb20gZnJvbUluZGV4LCB0bywgYnV0IG5vdCBpbmNsdWRpbmcgdG9JbmRleFxuICBzbGljZUVudHJpZXMoZnJvbUluZGV4LCB0b0luZGV4KSB7XG4gICAgZnJvbUluZGV4ID0gTWF0aC5tYXgoZnJvbUluZGV4IC0gMSAtIHRoaXMuX29mZnNldCwgMClcbiAgICB0b0luZGV4ID0gTWF0aC5tYXgodG9JbmRleCAtIDEgLSB0aGlzLl9vZmZzZXQsIDApXG4gICAgcmV0dXJuIHRoaXMuX2VudHJpZXMuc2xpY2UoZnJvbUluZGV4LCB0b0luZGV4KVxuICB9XG5cbiAgaGFuZGxlQXBwZW5kRW50cmllc1JlcXVlc3QobWVzc2FnZSkge1xuICAgIGlmIChtZXNzYWdlLnByZXZJbmRleCA+IHRoaXMubGFzdExvZ0luZGV4KSB7XG4gICAgICAvLyBBcHBlbmRpbmcgdGhlc2UgZW50cmllcyB3b3VsZCBsZWF2ZSBhIGdhcFxuICAgICAgcmV0dXJuIG1lc3NhZ2UucmVzcG9uc2Uoe21lc2hUb3BvbG9neTogdGhpcy5fbWVzaFRvcG9sb2d5fSlcbiAgICB9XG5cbiAgICAvLyBDaGVjayBpZiB3ZSBoYXZlIGEgc25hcHNob3QgaW5zdGFsbGVkIGFuZCBhbmQgdGhlIHJlcXVlc3QgaXMgb2xkZXIsIGluIHRoYXRcbiAgICAvLyBjYXNlIHdlIGp1c3QgaWdub3JlIGl0IHNpbmNlIGl0IG11c3QgYmUgYSBkZWxheWVkL3JlcGVhdGVkIG1lc3NhZ2UgYW5kIHRoZSBsZWFkZXJcbiAgICAvLyBzaG91bGQga25vdyB0byBzZW5kIGEgcG9zdC1zbmFwc2hvdCBhcHBlbmRcbiAgICBpZiAodGhpcy5fc25hcHNob3QgJiYgbWVzc2FnZS5wcmV2SW5kZXggPCB0aGlzLl9vZmZzZXQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBsb2NhbFByZXZUZXJtID0gdGhpcy5lbnRyeVRlcm1BdEluZGV4KG1lc3NhZ2UucHJldkluZGV4KVxuICAgIGxldCByZW1vdGVFbnRyaWVzID0gbWVzc2FnZS5lbnRyaWVzXG4gICAgaWYgKGxvY2FsUHJldlRlcm0gPT09IG1lc3NhZ2UucHJldlRlcm0pIHtcbiAgICAgIC8vIExvb3AgdGhyb3VnaCByZW1vdGUgZW50cmllcyB1bnRpbCB3ZSBkb24ndCBoYXZlIGEgbG9jYWwgb25lIG9yIGZpbmQgYSB0ZXJtIG1pc21hdGNoXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcmVtb3RlRW50cmllcy5sZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICAgICAgbGV0IHJlbW90ZUVudHJ5ID0gcmVtb3RlRW50cmllc1tpbmRleF1cbiAgICAgICAgLy8gKzEgc2luY2UgcHJldkluZGV4IGlzIHRoZSBlbnRyeSBiZWZvcmUgdGhlIG9uZSB3ZSB3YW50IHRvIG1hdGNoIGFnYWluc3RcbiAgICAgICAgbGV0IGxvY2FsSW5kZXggPSBtZXNzYWdlLnByZXZJbmRleCArIGluZGV4ICsgMVxuICAgICAgICBpZiAobG9jYWxJbmRleCA+IHRoaXMubGFzdExvZ0luZGV4KSB7XG4gICAgICAgICAgLy8gV2UndmUgcnVuIG91dCBvZiBsb2NhbCBlbnRpcmVzIHRvIG1hdGNoIGFnYWluc3QsIGFwcGVuZCB0aGUgcmVzdFxuICAgICAgICAgIHRoaXMuX3B1c2hFbnRyaWVzKHJlbW90ZUVudHJpZXMuc2xpY2UoaW5kZXgpKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxvY2FsVGVybSA9IHRoaXMuZW50cnlUZXJtQXRJbmRleChsb2NhbEluZGV4KVxuICAgICAgICBpZiAobG9jYWxUZXJtICE9PSByZW1vdGVFbnRyeS50ZXJtKSB7XG4gICAgICAgICAgLy8gaWYgYW4gZW50cnkgdGVybSBkb2Vzbid0IG1hdGNoLCBkZWxldGUgdGhlIHJlc3QgYW5kIGFwcGVuZCBhbGxcbiAgICAgICAgICB0aGlzLl9yZXZlcnRFbnRyaWVzKGxvY2FsSW5kZXgpXG4gICAgICAgICAgdGhpcy5fcHVzaEVudHJpZXMocmVtb3RlRW50cmllcy5zbGljZShpbmRleCkpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGV0IG1hdGNoSW5kZXggPSBtZXNzYWdlLnByZXZJbmRleCArIHJlbW90ZUVudHJpZXMubGVuZ3RoXG4gICAgICBpZiAobWVzc2FnZS5jb21taXRJbmRleCA+IHRoaXMuX2NvbW1pdEluZGV4KSB7XG4gICAgICAgIC8vIGluY3JlYXNlIGNvbW1pdCBpbmRleCB0byB0aGUgcmVtb3RlIG9uZSwgYnV0IG5vdCBoaWdoZXIgdGhhbiB0aGUgbGFzdCBlbnRyeSB3ZSByZWNlaXZlZFxuICAgICAgICBsZXQgbmV3Q29tbWl0SW5kZXggPSBNYXRoLm1pbihtZXNzYWdlLmNvbW1pdEluZGV4LCBtYXRjaEluZGV4KVxuICAgICAgICB0aGlzLl9pbmNyZW1lbnRDb21taXRJbmRleChuZXdDb21taXRJbmRleClcbiAgICAgIH1cbiAgICAgIHJldHVybiBtZXNzYWdlLnJlc3BvbnNlKHtzdWNjZXNzOiB0cnVlLCBtYXRjaEluZGV4LCBtZXNoVG9wb2xvZ3k6IHRoaXMuX21lc2hUb3BvbG9neX0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtZXNzYWdlLnJlc3BvbnNlKHttZXNoVG9wb2xvZ3k6IHRoaXMuX21lc2hUb3BvbG9neX0pXG4gICAgfVxuICB9XG5cbiAgZ2V0Q29tbWl0dGVkQ29uZmlndXJhdGlvbkRhdGEoKSB7XG4gICAgbGV0IGNvbW1pdHRlZEVudHJpZXMgPSB0aGlzLnNsaWNlRW50cmllcygwLCB0aGlzLmNvbW1pdEluZGV4ICsgMSlcbiAgICBmb3IgKGxldCBpbmRleCA9IGNvbW1pdHRlZEVudHJpZXMubGVuZ3RoIC0gMTsgaW5kZXggPj0gMDsgaW5kZXggLT0gMSkge1xuICAgICAgbGV0IGVudHJ5ID0gY29tbWl0dGVkRW50cmllc1tpbmRleF1cbiAgICAgIGlmIChlbnRyeSBpbnN0YW5jZW9mIENvbmZpZ3VyYXRpb25FbnRyeSkge1xuICAgICAgICByZXR1cm4gZW50cnkuZGF0YVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5fc25hcHNob3QpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zbmFwc2hvdC5jb25maWd1cmF0aW9uXG4gICAgfVxuICAgIHJldHVybiBuZXcgQ29uZmlndXJhdGlvbkRhdGEobmV3IE1lbWJlcnMoKSlcbiAgfVxuXG4gIHRyeUNvbW1pdEluZGV4Rm9yVGVybShuZXdDb21taXRJbmRleCwgZXhwZWN0ZWRUZXJtKSB7XG4gICAgaWYgKG5ld0NvbW1pdEluZGV4IDw9IHRoaXMuX2NvbW1pdEluZGV4KSB7XG4gICAgICByZXR1cm4gW11cbiAgICB9XG4gICAgbGV0IGFjdHVhbFRlcm0gPSB0aGlzLmVudHJ5VGVybUF0SW5kZXgobmV3Q29tbWl0SW5kZXgpXG4gICAgaWYgKGFjdHVhbFRlcm0gIT09IGV4cGVjdGVkVGVybSkge1xuICAgICAgbG9nLmRlYnVnKFRBRywgYENvbW1pdCBpbmRleCAke25ld0NvbW1pdEluZGV4fSByZWplY3RlZCwgZXhwZWN0ZWQgdGVybSB3YXMgJHtleHBlY3RlZFRlcm19LCBnb3QgJHthY3R1YWxUZXJtfWApXG4gICAgICByZXR1cm4gW11cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2luY3JlbWVudENvbW1pdEluZGV4KG5ld0NvbW1pdEluZGV4KVxuICB9XG5cbiAgY3JlYXRlQ29uZmlndXJhdGlvbkVudHJ5KHt0ZXJtLCBkYXRhfSkge1xuICAgIGxldCBpbmRleCA9IHRoaXMubGFzdExvZ0luZGV4ICsgMVxuICAgIGxldCBlbnRyeSA9IG5ldyBDb25maWd1cmF0aW9uRW50cnkoe3Rlcm0sIGluZGV4LCBkYXRhfSlcbiAgICB0aGlzLl9jb25maWd1cmF0aW9uLnNldChkYXRhKVxuICAgIHRoaXMuX2NvbmZpZ3VyYXRpb25JbmRleCA9IGluZGV4XG4gICAgdGhpcy5fZW50cmllcy5wdXNoKGVudHJ5KVxuICAgIHJldHVybiBlbnRyeVxuICB9XG5cbiAgY3JlYXRlT3BFbnRyeSh7dGVybSwgaWQsIG9wLCBhcmdzfSkge1xuICAgIGxldCBpbmRleCA9IHRoaXMubGFzdExvZ0luZGV4ICsgMVxuICAgIGxldCBlbnRyeSA9IG5ldyBPcEVudHJ5KHt0ZXJtLCBpbmRleCwgaWQsIG9wLCBhcmdzfSlcbiAgICB0aGlzLl9lbnRyaWVzLnB1c2goZW50cnkpXG4gICAgcmV0dXJuIGVudHJ5XG4gIH1cblxuICBfaW5jcmVtZW50Q29tbWl0SW5kZXgobmV3Q29tbWl0SW5kZXgpIHtcbiAgICB0aGlzLl9jb21taXRJbmRleCA9IG5ld0NvbW1pdEluZGV4XG4gICAgbGV0IGZyb21BcHBsaWVkID0gdGhpcy5fbGFzdEFwcGxpZWRcbiAgICBpZiAodGhpcy5fbGFzdEFwcGxpZWQgPCBuZXdDb21taXRJbmRleCkge1xuICAgICAgdGhpcy5fbGFzdEFwcGxpZWQgPSBuZXdDb21taXRJbmRleFxuICAgIH1cbiAgICBsZXQgY29tbWl0dGVkID0gdGhpcy5zbGljZUVudHJpZXMoZnJvbUFwcGxpZWQgKyAxLCBuZXdDb21taXRJbmRleCArIDEpXG4gICAgdGhpcy5fc3RhdGVNYWNoaW5lLmNvbW1pdEVudHJpZXMoY29tbWl0dGVkKVxuICAgIHJldHVybiBjb21taXR0ZWRcbiAgfVxuXG4gIF9yZXZlcnRFbnRyaWVzKGZyb21JbmNsdWRpbmdJbmRleCkge1xuICAgIGlmIChmcm9tSW5jbHVkaW5nSW5kZXggPD0gdGhpcy5jb21taXRJbmRleCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGB0cmllZCB0byByZXZlcnQgY29tbWl0dGVkIGVudHJpZXMsIGNpPSR7dGhpcy5jb21taXRJbmRleH0sIHJldmVydD0ke2Zyb21JbmNsdWRpbmdJbmRleH1gKVxuICAgIH1cbiAgICBpZiAoZnJvbUluY2x1ZGluZ0luZGV4IDw9IHRoaXMuX2xhc3RBcHBsaWVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHRyaWVkIHRvIHJldmVydCBhcHBsaWVkIGVudHJpZXMsIGxhPSR7dGhpcy5fbGFzdEFwcGxpZWR9LCByZXZlcnQ9JHtmcm9tSW5jbHVkaW5nSW5kZXh9YClcbiAgICB9XG4gICAgbGV0IHJldmVydGVkID0gdGhpcy5fZW50cmllcy5zcGxpY2UoZnJvbUluY2x1ZGluZ0luZGV4IC0gMSAtIHRoaXMuX29mZnNldClcbiAgICByZXZlcnRlZC5yZXZlcnNlKCkgLy8gbmV3ZXN0IGZpcnN0XG4gICAgdGhpcy5fc3RhdGVNYWNoaW5lLnJldmVydEVudHJpZXMocmV2ZXJ0ZWQpXG5cbiAgICBpZiAodGhpcy5fY29uZmlndXJhdGlvbkluZGV4IDwgZnJvbUluY2x1ZGluZ0luZGV4KSB7XG4gICAgICByZXR1cm4gLy8gbm8gbmVlZCB0byByZXZlcnQgY29uZmlndXJhdGlvblxuICAgIH1cblxuICAgIGZvciAobGV0IGluZGV4ID0gZnJvbUluY2x1ZGluZ0luZGV4IC0gMTsgaW5kZXggPiAwOyBpbmRleCAtPSAxKSB7XG4gICAgICBpZiAodGhpcy5fc25hcHNob3QgJiYgdGhpcy5fc25hcHNob3QubGFzdEluZGV4ID09PSBpbmRleCkge1xuICAgICAgICB0aGlzLl9jb25maWd1cmF0aW9uLnNldCh0aGlzLl9zbmFwc2hvdC5jb25maWd1cmF0aW9uKVxuICAgICAgICB0aGlzLl9jb25maWd1cmF0aW9uSW5kZXggPSBpbmRleFxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGxldCBlbnRyeSA9IHRoaXMuZW50cnlBdEluZGV4KGluZGV4KVxuICAgICAgaWYgKGVudHJ5IGluc3RhbmNlb2YgQ29uZmlndXJhdGlvbkVudHJ5KSB7XG4gICAgICAgIHRoaXMuX2NvbmZpZ3VyYXRpb24uc2V0KGVudHJ5LmRhdGEpXG4gICAgICAgIHRoaXMuX2NvbmZpZ3VyYXRpb25JbmRleCA9IGluZGV4XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIG5vIGNvbmZpZ3VyYXRpb24gZm91bmRcbiAgICB0aGlzLl9jb25maWd1cmF0aW9uLnNldChuZXcgQ29uZmlndXJhdGlvbkRhdGEobmV3IE1lbWJlcnMoKSkpXG4gICAgdGhpcy5fY29uZmlndXJhdGlvbkluZGV4ID0gMFxuICB9XG5cbiAgX3B1c2hFbnRyaWVzKGVudHJpZXMpIHtcbiAgICB0aGlzLl9lbnRyaWVzLnB1c2goLi4uZW50cmllcylcblxuICAgIGZvciAobGV0IGluZGV4ID0gZW50cmllcy5sZW5ndGggLSAxOyBpbmRleCA+PSAwOyBpbmRleCAtPSAxKSB7XG4gICAgICBsZXQgZW50cnkgPSBlbnRyaWVzW2luZGV4XVxuICAgICAgaWYgKGVudHJ5IGluc3RhbmNlb2YgQ29uZmlndXJhdGlvbkVudHJ5KSB7XG4gICAgICAgIHRoaXMuX2NvbmZpZ3VyYXRpb24uc2V0KGVudHJ5LmRhdGEpXG4gICAgICAgIHRoaXMuX2NvbmZpZ3VyYXRpb25JbmRleCA9IGluZGV4XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlU25hcHNob3QodGVybSkge1xuICAgIHJldHVybiBTbmFwc2hvdFJlcXVlc3QuY3JlYXRlKHtcbiAgICAgIHRlcm0sXG4gICAgICBsYXN0VGVybTogdGhpcy5lbnRyeVRlcm1BdEluZGV4KHRoaXMuX2xhc3RBcHBsaWVkKSxcbiAgICAgIGxhc3RJbmRleDogdGhpcy5fbGFzdEFwcGxpZWQsXG4gICAgICBjb25maWd1cmF0aW9uOiB0aGlzLl9jb25maWd1cmF0aW9uLmdldCgpLFxuICAgICAgc3RhdGU6IHRoaXMuX3N0YXRlTWFjaGluZS5zdGF0ZSxcbiAgICB9KVxuICB9XG5cbiAgbG9hZFNuYXBzaG90KHNuYXBzaG90KSB7XG4gICAgYXJnQ2hlY2suaW5zdGFuY2UoJ1JhZnRMb2cubG9hZFNuYXBzaG90JywgJ3NuYXBzaG90Jywgc25hcHNob3QsIFNuYXBzaG90UmVxdWVzdClcbiAgICBsZXQge2xhc3RJbmRleCwgY29uZmlndXJhdGlvbn0gPSBzbmFwc2hvdFxuXG4gICAgdGhpcy5fZW50cmllcyA9IFtdXG4gICAgdGhpcy5fb2Zmc2V0ID0gbGFzdEluZGV4XG4gICAgdGhpcy5fY29tbWl0SW5kZXggPSBsYXN0SW5kZXhcbiAgICB0aGlzLl9sYXN0QXBwbGllZCA9IGxhc3RJbmRleFxuICAgIHRoaXMuX2NvbmZpZ3VyYXRpb25JbmRleCA9IGxhc3RJbmRleFxuICAgIHRoaXMuX2NvbmZpZ3VyYXRpb24uc2V0KGNvbmZpZ3VyYXRpb24pXG4gICAgdGhpcy5fc25hcHNob3QgPSBzbmFwc2hvdFxuXG4gICAgdGhpcy5fc3RhdGVNYWNoaW5lLmxvYWRTbmFwc2hvdChzbmFwc2hvdClcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuX3N0YXRlTWFjaGluZS5jbGVhcigpXG4gICAgdGhpcy5fZW50cmllcyA9IFtdXG4gICAgdGhpcy5fb2Zmc2V0ID0gMFxuICAgIHRoaXMuX2NvbW1pdEluZGV4ID0gMFxuICAgIHRoaXMuX2xhc3RBcHBsaWVkID0gMFxuICAgIHRoaXMuX3NuYXBzaG90ID0gbnVsbFxuICAgIHRoaXMuX2NvbmZpZ3VyYXRpb25JbmRleCA9IDBcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGxpYi9jb25mZXJlbmNlL3JhZnRMb2cuanMiLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IGxvZyBmcm9tICdjb21tb24vbG9nJ1xuaW1wb3J0IHtkZWZlciwgcmFuZG9tU3RyaW5nfSBmcm9tICdjb21tb24vdXRpbHMnXG5cbmltcG9ydCB7T3BFbnRyeSwgQ29uZmlndXJhdGlvbkVudHJ5fSBmcm9tICdjb25mZXJlbmNlL3JhZnRMb2dFbnRyeSdcbmltcG9ydCB7U3RhdGVPcFJlcXVlc3QsIFN0YXRlT3BSZXNwb25zZX0gZnJvbSAnY29uZmVyZW5jZS9yYWZ0TWVzc2FnZXMnXG5pbXBvcnQge0VYUEVDVEVEX1JUVF9NU30gZnJvbSAnY29uZmVyZW5jZS9yYWZ0U3RhdGUnXG5cbmNvbnN0IFRBRyA9ICdyYWZ0J1xuXG5jb25zdCBUSUNLX0lOVEVSVkFMID0gMTAwXG5jb25zdCBUSUNLX0FQUExJRURfRkFDVE9SID0gMTBcbmNvbnN0IFNUQVRFX09QX0FQUExZX1RUTF9NUyA9IDMwICogMTAwMFxuY29uc3QgUkVTRU5EX1JUVF9GQUNUT1IgPSA2XG5cbi8vIFRoZSBTdGF0ZU1hY2hpbmUga2VlcHMgdGhlIGxvY2FsIHN0YXRlIG9mIHRoZSBSYWZ0IGNsdXN0ZXIsIGFuZCBhcHBsaWVzXG4vLyBjb21taXR0ZWQgZW50cmllcyB0byB0aGF0IHN0YXRlIGFmdGVyIGRlZHVwbGljYXRpb24uIEl0IGlzIGFsc28gcmVzcG9uc2libGVcbi8vIGZvciBrZWVwaW5nIHRyYWNrIG9mIG9wZXJhdGlvbnMgdGhhdCBoYXZlIGJlZW4gcmVxdWVzdGVkIGJ5IHRoZSBsb2NhbFxuLy8gY2xpZW50LCBhbmQgdG8gcmV0cnkgdGhlbSBpZiBuZWVkZWQuXG4vL1xuLy8gVGhpcyBkaWFncmFtIGRlc2NyaWJlcyB0aGUgZmxvdyBvZiBhIHN1Y2Nlc3NmdWwgc3RhdGUgb3BlcmF0aW9uIHdoZXJlIHRoZVxuLy8gbG9jYWwgY2xpZW50IGlzIHRoZSBsZWFkZXIuXG4vL1xuLy8gICAgICBSYWZ0IC0tMy0+IExlYWRlclN0YXRlIC0tNGItPiAuLi5cbi8vICAgICAgfCAgXiAgICAgICAgICAgIHxcbi8vICAgICAgMSAgMiAgICAgICAgICAgIDRhXG4vLyAgICAgIHYgIHwgICAgICAgICAgICB2XG4vLyBTdGF0ZU1hY2hpbmUgPC01LS0gUmFmdExvZ1xuLy9cbi8vIDEuIEFuIG9wZXJhdGlvbiBpcyByZXF1ZXN0ZWQuXG4vLyAyLiBUaGUgc3RhdGUgbWFjaGluZSBzZW5kcyBhIHJlcXVlc3QgdmlhIHRoZSBvblN0YXRlT3BSZXF1ZXN0IGNhbGxiYWNrLlxuLy8gMy4gUmFmdCBmb3J3YXJkcyB0aGUgcmVxdWVzdCB0byB0aGUgY3VycmVudCBzdGF0ZS5cbi8vIDRhLiBBcHBlbmQgdGhlIE9wRW50cnkgdG8gdGhlIGxvZy5cbi8vIDRiLiBSYWZ0IGFsZ29yaXRobSBpbiBhY3Rpb24sIHdoaWNoIGVuZHMgdXAgY29tbWl0dGluZyB0aGUgZW50cnkuXG4vLyA1LiBUaGUgbG9nIGZvcndhcmRzIGNvbW1pdHRlZCBlbnRyaWVzIHRvIHRoZSBzdGF0ZSBtYWNoaW5lLlxuLy9cbi8vIEFuZCBub3cgYSBkaWFncmFtIGZvciBpZiB3ZSdyZSBhIGZvbGxvd2VyLlxuLy9cbi8vICAgICAgUmFmdCAtLTMtPiBGb2xsb3dlclN0YXRlIC0tNC0+IExlYWRlclN0YXRlIC0tNWEtPlxuLy8gICAgICB8ICBeICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4vLyAgICAgIDEgIDIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDVhXG4vLyAgICAgIHYgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZcbi8vIFN0YXRlTWFjaGluZSA8LTctLSBSYWZ0TG9nIDwtIC0gNiAtIC0gUmFmdExvZ1xuLy9cbi8vIDEtMy4gU2FtZSBhcyBhYm92ZS5cbi8vIDQuIFNlbmQgU3RhdGVPcFJlcXVlc3QgdG8gdGhlIGN1cnJlbnQgbGVhZGVyLlxuLy8gNWEgNWIuIFNhbWUgYXMgNGEgNGIgYWJvdmUuXG4vLyA2LiBSYWZ0IGFsZ29yaXRobSBlbmRzIHVwIGNvbW1pdHRpbmcgdGhlIGVudHJ5IGluIHRoZSBmb2xsb3dlcidzIGxvZy5cbi8vIDcuIFNhbWUgYXMgNSBhYm92ZS5cbi8vXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0ZU1hY2hpbmUge1xuICBjb25zdHJ1Y3Rvcih7b25TdGF0ZUNoYW5nZSwgb25TdGF0ZU9wUmVxdWVzdCwgb25Db25maWd1cmF0aW9uQ29tbWl0dGVkfSkge1xuICAgIHRoaXMuX3RpY2sgPSB0aGlzLl90aWNrLmJpbmQodGhpcylcblxuICAgIHRoaXMuX3N0YXRlID0ge31cbiAgICB0aGlzLl90aWNrQ291bnRlciA9IDBcblxuICAgIC8vIENsaWVudCByZXF1ZXN0cyBhcmUgdHJhY2tlZCBoZXJlLCB0eXBlIGlzIE1hcDxvcElkLCBbZXhwaXJ5TXMsIGRlZmVycmVkLCBTdGF0ZU9wUmVxdWVzdF0+XG4gICAgdGhpcy5fdHVwbGVzID0gbmV3IE1hcCgpXG5cbiAgICAvLyBBbGwgbWVtYmVycyBrZWVwIHRyYWNrIG9mIGFsbCBvcCBlbnRyeSBJRHMgdGhhdCBoYXZlIGJlZW4gYXBwbGllZC5cbiAgICB0aGlzLl9hcHBsaWVkSWRzID0gbmV3IE1hcCgpXG4gICAgdGhpcy5fb25TdGF0ZUNoYW5nZSA9IG9uU3RhdGVDaGFuZ2VcbiAgICB0aGlzLl9vblN0YXRlT3BSZXF1ZXN0ID0gb25TdGF0ZU9wUmVxdWVzdFxuICAgIHRoaXMuX29uQ29uZmlndXJhdGlvbkNvbW1pdHRlZCA9IG9uQ29uZmlndXJhdGlvbkNvbW1pdHRlZFxuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGBzdGF0ZU1hY2hpbmV7JHtKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKX19YFxuICB9XG5cbiAgZ2V0IHN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZVxuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgdGhpcy5zdG9wKClcbiAgICB0aGlzLl90aWNrQ291bnRlciA9IDBcbiAgICB0aGlzLl9pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwodGhpcy5fdGljaywgVElDS19JTlRFUlZBTClcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5jbGVhcigpXG4gICAgaWYgKHRoaXMuX2ludGVydmFsSWQpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWxJZClcbiAgICAgIHRoaXMuX2ludGVydmFsSWQgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5fc3RhdGUgPSB7fVxuICAgIHRoaXMuX3R1cGxlcy5jbGVhcigpXG4gICAgdGhpcy5fYXBwbGllZElkcy5jbGVhcigpXG4gIH1cblxuICByZXF1ZXN0U3RhdGVPcCh7b3AsIGFyZ3MsIHJldHJ5VHRsTXN9KSB7XG4gICAgbGV0IGlkID0gcmFuZG9tU3RyaW5nKE9wRW50cnkuaWRTaXplKVxuICAgIGxldCByZXF1ZXN0ID0gU3RhdGVPcFJlcXVlc3QuY3JlYXRlKHtpZCwgb3AsIGFyZ3N9KVxuICAgIGxldCBub3cgPSBEYXRlLm5vdygpXG4gICAgbGV0IGV4cGlyeSA9IG5vdyArIHJldHJ5VHRsTXNcbiAgICBsZXQgbmV4dFJlc2VuZCA9IG5vdyArIEVYUEVDVEVEX1JUVF9NUyAqIFJFU0VORF9SVFRfRkFDVE9SXG4gICAgbGV0IGRlZmVycmVkID0gZGVmZXIoKVxuICAgIHRoaXMuX3R1cGxlcy5zZXQoaWQsIHtleHBpcnksIG5leHRSZXNlbmQsIGRlZmVycmVkLCByZXF1ZXN0fSlcbiAgICB0aGlzLl9vblN0YXRlT3BSZXF1ZXN0KHJlcXVlc3QpXG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2VcbiAgfVxuXG4gIGhhbmRsZVN0YXRlT3BSZXNwb25zZShwZWVySWQsIG1lc3NhZ2UpIHtcbiAgICBsZXQge2lkLCBlcnJvckNvZGV9ID0gbWVzc2FnZVxuICAgIGxldCB0dXBsZSA9IHRoaXMuX3R1cGxlcy5nZXQoKVxuICAgIGlmICghdHVwbGUpIHtcbiAgICAgIGxvZy5pbmZvKFRBRywgdGhpcywgYCBnb3QgU3RhdGVPcFJlc3BvbnNlIGZvciB1bmtub3duIHR1cGxlLCAke2lkfWApXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKGVycm9yQ29kZSkge1xuICAgICAgaWYgKGVycm9yQ29kZSA9PT0gU3RhdGVPcFJlc3BvbnNlLk5PVF9MRUFERVIpIHtcbiAgICAgICAgdGhpcy5fb25TdGF0ZU9wUmVxdWVzdCh0dXBsZS5yZXF1ZXN0KVxuICAgICAgICB0dXBsZS5uZXh0UmVzZW5kID0gRGF0ZS5ub3coKSArIEVYUEVDVEVEX1JUVF9NUyAqIFJFU0VORF9SVFRfRkFDVE9SXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2cuZXJyb3IoVEFHLCB0aGlzLCBgIGdvdCB1bmtub3duIFN0YXRlT3BSZXNwb25zZSBlcnJvckNvZGUgZm9yICR7aWR9LCAke2Vycm9yQ29kZX1gKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTdWNjZXNzLCByZXNldCByZXNlbmQgdGltZW91dFxuICAgICAgdHVwbGUubmV4dFJlc2VuZCA9IERhdGUubm93KCkgKyBFWFBFQ1RFRF9SVFRfTVMgKiBSRVNFTkRfUlRUX0ZBQ1RPUlxuICAgIH1cbiAgfVxuXG4gIF90aWNrKCkge1xuICAgIGxldCBub3cgPSBEYXRlLm5vdygpXG4gICAgLy8gQXBwbGllZCBpZHMgZG9uJ3QgbmVlZCB0byBiZSBjaGVja2VkIG5lYXJseSBhcyBvZnRlbiBhcyB0dXBsZSByZXNlbmRzLCBzb1xuICAgIC8vIG9ubHkgZG8gaXQgZXZlcnkgbnRoIHRpY2suXG4gICAgdGhpcy5fdGlja0NvdW50ZXIgPSAodGhpcy5fdGlja0NvdW50ZXIgKyAxKSAlIFRJQ0tfQVBQTElFRF9GQUNUT1JcbiAgICBpZiAodGhpcy5fdGlja0NvdW50ZXIgPT09IDApIHtcbiAgICAgIHRoaXMuX2FwcGxpZWRJZHMuZm9yRWFjaCgoZXhwaXJ5LCBlbnRyeUlkKSA9PiB7XG4gICAgICAgIGlmIChleHBpcnkgPCBub3cpIHtcbiAgICAgICAgICB0aGlzLl9hcHBsaWVkSWRzLmRlbGV0ZShlbnRyeUlkKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICB0aGlzLl90dXBsZXMuZm9yRWFjaCgodHVwbGUsIGVudHJ5SWQpID0+IHtcbiAgICAgIGlmICh0dXBsZS5leHBpcnkgPCBub3cpIHtcbiAgICAgICAgdGhpcy5fdHVwbGVzLmRlbGV0ZShlbnRyeUlkKVxuICAgICAgICB0dXBsZS5kZWZlcnJlZC5yZWplY3QobmV3IEVycm9yKCdUaW1lZCBvdXQnKSlcbiAgICAgIH0gZWxzZSBpZiAodHVwbGUubmV4dFJlc2VuZCA8IG5vdykge1xuICAgICAgICB0aGlzLl9vblN0YXRlT3BSZXF1ZXN0KHR1cGxlLnJlcXVlc3QpXG4gICAgICAgIHR1cGxlLm5leHRSZXNlbmQgPSBub3cgKyBFWFBFQ1RFRF9SVFRfTVMgKiBSRVNFTkRfUlRUX0ZBQ1RPUlxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjb21taXRFbnRyaWVzKGVudHJpZXMpIHtcbiAgICBsZXQgdXBkYXRlZCA9IGZhbHNlXG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmIChlbnRyeSBpbnN0YW5jZW9mIE9wRW50cnkpIHtcbiAgICAgICAgaWYgKHRoaXMuX2FwcGxpZWRJZHMuaGFzKGVudHJ5LmlkKSkge1xuICAgICAgICAgIGxvZy5kZWJ1ZyhUQUcsIHRoaXMsIGBpZ25vcmVkIGR1cGxpY2F0ZSBlbnRyeSwgJHtlbnRyeX1gKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBleHBpcnkgPSBEYXRlLm5vdygpICsgU1RBVEVfT1BfQVBQTFlfVFRMX01TXG4gICAgICAgICAgaWYgKGVudHJ5LmlkKSB7XG4gICAgICAgICAgICB0aGlzLl9hcHBsaWVkSWRzLnNldChlbnRyeS5pZCwgZXhwaXJ5KVxuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgbmV3U3RhdGUgPSBlbnRyeS5hcHBseSh0aGlzLl9zdGF0ZSlcbiAgICAgICAgICBpZiAobmV3U3RhdGUpIHtcbiAgICAgICAgICAgIHVwZGF0ZWQgPSB0cnVlXG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IG5ld1N0YXRlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCB0dXBsZSA9IHRoaXMuX3R1cGxlcy5nZXQoZW50cnkuaWQpXG4gICAgICAgIGlmICh0dXBsZSkge1xuICAgICAgICAgIHR1cGxlLmRlZmVycmVkLnJlc29sdmUoKVxuICAgICAgICAgIHRoaXMuX3R1cGxlcy5kZWxldGUoZW50cnkuaWQpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZW50cnkgaW5zdGFuY2VvZiBDb25maWd1cmF0aW9uRW50cnkpIHtcbiAgICAgICAgdGhpcy5fb25Db25maWd1cmF0aW9uQ29tbWl0dGVkICYmIHRoaXMuX29uQ29uZmlndXJhdGlvbkNvbW1pdHRlZChlbnRyeS5kYXRhKVxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHVwZGF0ZWQpIHtcbiAgICAgIHRoaXMuX29uU3RhdGVDaGFuZ2UgJiYgdGhpcy5fb25TdGF0ZUNoYW5nZSgpXG4gICAgfVxuICB9XG5cbiAgcmV2ZXJ0RW50cmllcyhlbnRyaWVzKSB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGxldCB0dXBsZSA9IHRoaXMuX3R1cGxlcy5nZXQoZW50cnkuaWQpXG4gICAgICBpZiAodHVwbGUpIHtcbiAgICAgICAgdGhpcy5fb25TdGF0ZU9wUmVxdWVzdCh0dXBsZS5yZXF1ZXN0KVxuICAgICAgICB0dXBsZS5uZXh0UmVzZW5kID0gRGF0ZS5ub3coKSArIEVYUEVDVEVEX1JUVF9NUyAqIFJFU0VORF9SVFRfRkFDVE9SXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGxvYWRTbmFwc2hvdChzbmFwc2hvdCkge1xuICAgIHRoaXMuX3N0YXRlID0gc25hcHNob3Quc3RhdGVcblxuICAgIHRoaXMuX29uU3RhdGVDaGFuZ2UgJiYgdGhpcy5fb25TdGF0ZUNoYW5nZSgpXG4gICAgdGhpcy5fb25Db25maWd1cmF0aW9uQ29tbWl0dGVkICYmIHRoaXMuX29uQ29uZmlndXJhdGlvbkNvbW1pdHRlZChzbmFwc2hvdC5jb25maWd1cmF0aW9uKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGliL2NvbmZlcmVuY2UvcmFmdFN0YXRlTWFjaGluZS5qcyIsIlxuZXhwb3J0IHtcbiAgTGlua0luZm8sXG4gIFBlZXJUb3BvbG9neUluZm8sXG4gIGRlZmF1bHQgYXMgTWVzaFRvcG9sb2d5LFxufSBmcm9tICdjb25mZXJlbmNlL21lc2hUb3BvbG9neS5qcydcblxuZXhwb3J0IHtkZWZhdWx0IGFzIGxvZ30gZnJvbSAnY29tbW9uL2xvZydcblxuZXhwb3J0IHtkZWZhdWx0IGFzIFJhZnR9IGZyb20gJ2NvbmZlcmVuY2UvcmFmdC5qcydcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBsaWIvc3RhbmRhbG9uZS1yYWZ0LmpzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBOzs7O0FDanNCQTtBQUNBOzs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzVEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQVFBOzs7Ozs7Ozs7Ozs7Ozs7QUFlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTs7Ozs7OztBQU9BOzs7Ozs7O0FBT0E7Ozs7Ozs7QUFPQTs7Ozs7Ozs7QUFRQTs7Ozs7QUFLQTs7Ozs7QUFLQTs7Ozs7QUFLQTs7Ozs7QUFLQTs7Ozs7QUFLQTs7Ozs7QUFLQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQU9BO0FBQ0E7QUFPQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUlBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzVSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDTEE7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2ZBO0FBQUE7QUFBQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFqSEE7QUFDQTtBQW1IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBL0RBOzs7Ozs7QUM3SkE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDSEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUtBO0FBQ0E7QUFDQTs7Ozs7O0FBTUE7Ozs7Ozs7O0FBUUE7Ozs7Ozs7QUFPQTs7Ozs7OztBQU9BOzs7Ozs7OztBQVFBOzs7Ozs7O0FBT0E7Ozs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7O0FBN0RBO0FBQUE7QUFBQTtBQXVFQTtBQUNBO0FBeEVBO0FBQUE7QUFBQTtBQTJFQTtBQUNBO0FBNUVBO0FBQUE7QUFBQTtBQStFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBbkZBO0FBQUE7QUFBQTtBQXFGQTtBQUNBO0FBdEZBO0FBQUE7QUFBQTtBQXlGQTtBQUNBO0FBMUZBO0FBQUE7QUFBQTtBQTZGQTtBQUNBO0FBOUZBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFnR0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBS0E7QUFDQTtBQVBBO0FBQUE7QUFBQTtBQVNBO0FBQ0E7QUFWQTtBQUFBO0FBQUE7QUFhQTtBQUNBO0FBZEE7QUFBQTtBQUFBO0FBaUJBO0FBQ0E7QUFsQkE7QUFBQTtBQUFBO0FBcUJBO0FBQ0E7QUF0QkE7QUFBQTtBQUFBO0FBeUJBO0FBQ0E7QUExQkE7QUFBQTtBQUFBO0FBNkJBO0FBQ0E7QUE5QkE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQWdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNwcUJBO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEJBOzs7Ozs7QUNBQTs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNOQTs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdEJBOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1RBOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNSQTs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBOzs7Ozs7QUNBQTs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2pCQTs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaEJBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMxREE7QUFDQTs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNuRkE7Ozs7OztBQ0FBOzs7Ozs7QUNBQTs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ1pBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQVVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQTFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7Ozs7O0FBaEJBO0FBQ0E7QUFDQTtBQXFEQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBS0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFWQTtBQUFBO0FBQUE7QUFZQTtBQUNBO0FBYkE7QUFBQTtBQUFBO0FBZ0JBO0FBQ0E7QUFDQTtBQWxCQTtBQUFBO0FBQUE7QUF5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTdCQTtBQUFBO0FBQUE7QUFxQkE7QUFDQTtBQXRCQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBK0JBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQWNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFyQkE7QUFBQTtBQUFBO0FBd0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTdCQTtBQUFBO0FBQUE7QUE4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBNUNBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFIQTtBQUFBO0FBQUE7QUFNQTtBQUNBO0FBUEE7QUFBQTtBQUFBO0FBVUE7QUFDQTtBQVhBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUE4Q0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQUFBO0FBQUE7QUFTQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBVkE7QUFBQTtBQUFBO0FBYUE7QUFDQTtBQWRBO0FBQUE7QUFBQTtBQWlCQTtBQUNBO0FBbEJBO0FBQUE7QUFBQTtBQXFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBNUJBO0FBQ0E7QUFEQTtBQUFBOzs7Ozs7O0FDMUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOzs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7Ozs7O0FBNUJBO0FBQ0E7QUFDQTtBQTZCQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFJQTtBQUNBO0FBTkE7QUFBQTtBQUFBO0FBWUE7QUFDQTtBQWJBO0FBQUE7QUFBQTtBQWdCQTtBQUNBO0FBakJBO0FBQUE7QUFBQTtBQVFBO0FBQ0E7QUFUQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBbUJBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFIQTtBQUNBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUtBO0FBQ0E7QUFYQTtBQUFBO0FBQUE7QUF5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTdCQTtBQUFBO0FBQUE7QUFnQ0E7QUFDQTtBQWpDQTtBQUFBO0FBQUE7QUFvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTlDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFtREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBM0RBO0FBQUE7QUFBQTtBQThEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTFFQTtBQUFBO0FBQUE7QUFhQTtBQUNBO0FBZEE7QUFBQTtBQUFBO0FBaUJBO0FBQ0E7QUFsQkE7QUFBQTtBQUFBO0FBcUJBO0FBQ0E7QUF0QkE7QUFDQTtBQURBO0FBQUE7Ozs7OztBQ3hFQTs7Ozs7O0FDQUE7QUFDQTtBQUNBOzs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7QUFDQTs7Ozs7OztBQ0RBO0FBQ0E7Ozs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3pPQTtBQUNBOzs7Ozs7O0FDREE7QUFDQTs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSEE7Ozs7Ozs7QUNBQTs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOzs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQUE7QUFBQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7OztBQVNBO0FBQ0E7QUFDQTs7O0FBVkE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7Ozs7OztBQXZCQTtBQUNBO0FBQ0E7QUE0QkE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBSEE7QUFDQTtBQUlBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVhBO0FBWUE7QUFDQTtBQWxCQTtBQUFBO0FBQUE7QUFvQkE7QUFJQTtBQXhCQTtBQUFBO0FBQUE7QUE4RUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBeEdBO0FBQUE7QUFBQTtBQTJCQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTFEQTtBQUFBO0FBQUE7QUEyREE7QUFDQTtBQTVEQTtBQUFBO0FBQUE7QUErREE7QUFDQTtBQWhFQTtBQUFBO0FBQUE7QUFtRUE7QUFDQTtBQXBFQTtBQUFBO0FBQUE7QUF1RUE7QUFDQTtBQXhFQTtBQUFBO0FBQUE7QUEyRUE7QUFDQTtBQTVFQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBMEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFWQTtBQVdBO0FBQ0E7QUFiQTtBQUFBO0FBQUE7QUFlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUF0QkE7QUFBQTtBQUFBO0FBeUJBO0FBQ0E7QUExQkE7QUFBQTtBQUFBO0FBNkJBO0FBQ0E7QUE5QkE7QUFBQTtBQUFBO0FBaUNBO0FBQ0E7QUFsQ0E7QUFBQTtBQUFBO0FBcUNBO0FBQ0E7QUF0Q0E7QUFBQTtBQUFBO0FBeUNBO0FBQ0E7QUExQ0E7QUFBQTtBQUFBO0FBNkNBO0FBQ0E7QUE5Q0E7QUFBQTtBQUFBO0FBaURBO0FBQ0E7QUFsREE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQW9EQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFIQTtBQUNBO0FBSUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUlBO0FBQ0E7QUFWQTtBQUFBO0FBQUE7QUFZQTtBQUNBO0FBYkE7QUFBQTtBQUFBO0FBMkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFsQ0E7QUFBQTtBQUFBO0FBb0NBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUF0Q0E7QUFBQTtBQUFBO0FBZ0JBO0FBQ0E7QUFqQkE7QUFBQTtBQUFBO0FBb0JBO0FBQ0E7QUFyQkE7QUFBQTtBQUFBO0FBd0JBO0FBQ0E7QUF6QkE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQXdDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFGQTtBQUdBO0FBQ0E7QUFMQTtBQUFBO0FBQUE7QUFPQTtBQUNBO0FBUkE7QUFBQTtBQUFBO0FBV0E7QUFDQTtBQVpBO0FBQUE7QUFBQTtBQWVBO0FBQ0E7QUFoQkE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQWtCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFNQTtBQUNBO0FBUEE7QUFBQTtBQUFBO0FBU0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQVhBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUhBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFhQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBSEE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUtBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFIQTtBQUNBO0FBSUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFTQTtBQUNBO0FBZkE7QUFBQTtBQUFBO0FBaUJBO0FBRUE7QUFuQkE7QUFBQTtBQUFBO0FBMENBO0FBQ0E7QUEzQ0E7QUFBQTtBQUFBO0FBc0JBO0FBQ0E7QUF2QkE7QUFBQTtBQUFBO0FBMEJBO0FBQ0E7QUEzQkE7QUFBQTtBQUFBO0FBOEJBO0FBQ0E7QUEvQkE7QUFBQTtBQUFBO0FBa0NBO0FBQ0E7QUFuQ0E7QUFBQTtBQUFBO0FBc0NBO0FBQ0E7QUF2Q0E7QUFDQTtBQURBO0FBQUE7QUFDQTtBQTZDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBSUE7QUFDQTtBQU5BO0FBQUE7QUFBQTtBQVFBO0FBQ0E7QUFUQTtBQUFBO0FBQUE7QUFZQTtBQUNBO0FBYkE7QUFBQTtBQUFBO0FBZ0JBO0FBQ0E7QUFqQkE7QUFBQTtBQUFBO0FBb0JBO0FBQ0E7QUFyQkE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQXVCQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFIQTtBQUNBO0FBSUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBS0E7QUFDQTtBQVhBO0FBQUE7QUFBQTtBQWFBO0FBQ0E7QUFkQTtBQUFBO0FBQUE7QUFnQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBbENBO0FBQUE7QUFBQTtBQWlCQTtBQUNBO0FBbEJBO0FBQUE7QUFBQTtBQXFCQTtBQUNBO0FBdEJBO0FBQUE7QUFBQTtBQXlCQTtBQUNBO0FBMUJBO0FBQUE7QUFBQTtBQTZCQTtBQUNBO0FBOUJBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFvQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUlBO0FBQ0E7QUFOQTtBQUFBO0FBQUE7QUFRQTtBQUNBO0FBVEE7QUFBQTtBQUFBO0FBWUE7QUFDQTtBQWJBO0FBQUE7QUFBQTtBQWdCQTtBQUNBO0FBakJBO0FBQUE7QUFBQTtBQW9CQTtBQUNBO0FBckJBO0FBQ0E7QUFEQTtBQUFBO0FBdUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVZBOzs7Ozs7QUMvYUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1BBO0FBQ0E7Ozs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdlJBO0FBQ0E7Ozs7Ozs7QUNEQTtBQUNBOzs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1hBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFBQTtBQUFBO0FBb0JBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBcENBO0FBQUE7QUFBQTtBQXVDQTtBQUNBO0FBeENBO0FBQUE7QUFBQTtBQTJDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFoREE7QUFBQTtBQUFBO0FBU0E7QUFDQTtBQVZBO0FBQUE7QUFBQTtBQWFBO0FBQ0E7QUFkQTtBQUFBO0FBQUE7QUFpQkE7QUFDQTtBQWxCQTtBQUFBO0FBQUE7QUFtREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUFBO0FBQUE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE5REE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQWdFQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBU0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBWEE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQWFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFBQTtBQUFBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBVkE7QUFDQTtBQVdBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFwQkE7QUFBQTtBQUFBO0FBc0JBO0FBQ0E7QUF2QkE7QUFBQTtBQUFBO0FBMEJBO0FBQ0E7QUEzQkE7QUFBQTtBQUFBO0FBNkNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEvREE7QUFBQTtBQUFBO0FBa0VBO0FBQ0E7QUFDQTtBQXBFQTtBQUFBO0FBQUE7QUE4QkE7QUFDQTtBQS9CQTtBQUFBO0FBQUE7QUFrQ0E7QUFDQTtBQW5DQTtBQUFBO0FBQUE7QUFzQ0E7QUFDQTtBQXZDQTtBQUFBO0FBQUE7QUEwQ0E7QUFDQTtBQTNDQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBc0VBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFWQTtBQUFBO0FBQUE7QUFnQ0E7QUFDQTtBQUNBO0FBQ0E7QUFuQ0E7QUFBQTtBQUFBO0FBc0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBNUNBO0FBQUE7QUFBQTtBQStDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFwREE7QUFBQTtBQUFBO0FBdURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEzREE7QUFBQTtBQUFBO0FBOERBO0FBQ0E7QUEvREE7QUFBQTtBQUFBO0FBa0VBO0FBQ0E7QUFDQTtBQXBFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFZQTtBQUNBO0FBYkE7QUFBQTtBQUFBO0FBZ0JBO0FBQ0E7QUFqQkE7QUFBQTtBQUFBO0FBb0JBO0FBQ0E7QUFyQkE7QUFBQTtBQUFBO0FBd0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTdCQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBeUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFjQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBakZBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7Ozs7OztBQWhDQTs7Ozs7OztBQzFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDSkE7Ozs7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7OztBQUdBOzs7QUFHQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7Ozs7QUE1SEE7QUFDQTtBQUNBO0FBNkhBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWRBO0FBQUE7QUFBQTtBQWdCQTtBQUNBO0FBakJBO0FBQUE7QUFBQTtBQXdCQTtBQUNBO0FBQ0E7QUExQkE7QUFBQTtBQUFBO0FBNkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTlDQTtBQUFBO0FBQUE7QUE4Q0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF0REE7QUFBQTtBQUFBO0FBeURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWhGQTtBQUFBO0FBQUE7QUFtRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE1RkE7QUFBQTtBQUFBO0FBOEZBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQUNBO0FBUUE7QUFDQTtBQWpIQTtBQUFBO0FBQUE7QUFtSEE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEzSEE7QUFBQTtBQUFBO0FBb0JBO0FBQ0E7QUFyQkE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQTZIQTs7Ozs7Ozs7OztBQVVBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFYQTtBQVlBO0FBQ0E7QUFkQTtBQUFBO0FBQUE7QUFnQkE7QUFDQTtBQWpCQTtBQUFBO0FBQUE7QUFtQkE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQTFCQTtBQUFBO0FBQUE7QUE2QkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQW5DQTtBQUFBO0FBQUE7QUFxQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXJHQTtBQUFBO0FBQUE7QUFxR0E7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE5SEE7QUFBQTtBQUFBO0FBZ0lBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBakpBO0FBQUE7QUFBQTtBQW9KQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF6SkE7QUFBQTtBQUFBO0FBNEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBbEtBO0FBQUE7QUFBQTtBQXFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTFMQTtBQUFBO0FBQUE7QUE2TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFiQTtBQUNBO0FBY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQS9NQTtBQUFBO0FBQUE7QUFrTkE7QUFDQTtBQUNBO0FBcE5BO0FBQUE7QUFBQTtBQXNOQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTFOQTtBQUFBO0FBQUE7QUE2TkE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBL09BO0FBQUE7QUFBQTtBQWtQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEzUUE7QUFBQTtBQUFBO0FBNlFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFDQTtBQUNBO0FBL1JBO0FBQUE7QUFBQTtBQWtTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUExU0E7QUFDQTtBQURBO0FBQUE7QUFDQTtBQTRTQTs7Ozs7Ozs7OztBQVVBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVZBO0FBV0E7QUFDQTtBQWJBO0FBQUE7QUFBQTtBQWVBO0FBQ0E7QUFoQkE7QUFBQTtBQUFBO0FBbUJBO0FBQ0E7QUFwQkE7QUFBQTtBQUFBO0FBc0JBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBcENBO0FBQUE7QUFBQTtBQXFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE3Q0E7QUFBQTtBQUFBO0FBZ0RBO0FBQ0E7QUFDQTtBQWxEQTtBQUFBO0FBQUE7QUFxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBN0RBO0FBQUE7QUFBQTtBQWdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF4RUE7QUFBQTtBQUFBO0FBMkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBcEZBO0FBQUE7QUFBQTtBQXVGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTdGQTtBQUFBO0FBQUE7QUErRkE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTNHQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBNkdBOzs7Ozs7Ozs7O0FBVUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBWkE7QUFhQTtBQUNBO0FBZkE7QUFBQTtBQUFBO0FBaUJBO0FBQ0E7QUFsQkE7QUFBQTtBQUFBO0FBcUJBO0FBQ0E7QUFDQTtBQXZCQTtBQUFBO0FBQUE7QUEwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTlCQTtBQUFBO0FBQUE7QUFnQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQS9DQTtBQUFBO0FBQUE7QUFrREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQS9EQTtBQUFBO0FBQUE7QUFrRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEzRUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQTZFQTs7Ozs7Ozs7OztBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7QUFKQTtBQUFBO0FBQUE7QUFNQTtBQUNBO0FBUEE7QUFBQTtBQUFBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF0QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBNEJBO0FBQ0E7QUE3QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBbUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUExQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBZ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBdERBO0FBQ0E7QUFEQTtBQUFBOzs7Ozs7O0FDbHpCQTs7Ozs7O0FDQUE7QUFDQTtBQUNBOzs7Ozs7O0FDRkE7QUFDQTtBQUNBOzs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQU1BO0FBQ0E7QUFZQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMElBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBOzs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQURBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTs7O0FBeUJBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTs7O0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBakNBO0FBbUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQXJPQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBakVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDNU5BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOzs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQTBCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7OztBQUVBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQXZPQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7QUExQ0E7Ozs7Ozs7QUNYQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBN0hBO0FBQ0E7QUFDQTs7Ozs7O0FBdkJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsREE7QUFDQTtBQUtBO0FBQ0E7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=