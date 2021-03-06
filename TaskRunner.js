/**
 * Created by Christopher on 3/21/2017.
 */
"use strict";
const _ = require('lodash');
const path = require('path');
const fs = require('fs-plus');
const rimraf = require('rimraf');
const JobQueue = require('./src/JobRunner').JobQueue;
const JobLoader = require('./src/JobRunner').JobLoader;
//
//const source = path.resolve(process.cwd(), '_source');
//const dist = path.resolve(process.cwd(), '_out');
let run = function (jsonObj,clobber,console) {
  return new Promise(function (resolve, reject) {
    console.log('hello world');
    JobLoader(jsonObj,clobber,console).then(function (jobs) {
      console.log('!!! Jobs Loaded');
      const queue = JobQueue(console);
      queue.runJobs(jobs).then(function () {
          console.log('All Jobs Done')
        })
        .then(function () {
          resolve();
        })
        .catch(function (value){
  
          console.warn ('There Was An Error With the Jobs',value);
          reject (value);
          
        })
    })
      .catch (function (value){
        
        console.log ('job loading failed',value);
  
        reject (value);
        
      });
  });
};
module.exports = run;