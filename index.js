const core = require('@actions/core');
const fs = require('fs');
const yaml = require('js-yaml');
const lodash = require('lodash');

const pathToFile = core.getInput('path-to-file');
const environment = core.getInput('environment');

const globalEnvironment = 'global';

// read config file
const file = fs.readFileSync(pathToFile, 'utf-8');

// convert from yaml to JS
const config = yaml.load(file);

const allEnvironments = [globalEnvironment, environment];

const configs = allEnvironments.map(configToMerge => config[configToMerge] || {});
const mergedConfig = lodash.merge(configs);

core.debug(`Final merged config is ${JSON.stringify(mergedConfig)}`);

Array.from(Object.entries(mergedConfig)).forEach(([key, value]) => core.exportVariable(key, value));
