var services = {};
var servicesFactories = {};
var angularUtils;

exports.setService = function (serviceName, value) {
  services[serviceName] = value;
};

exports.getService = function (serviceName) {
  return services[serviceName];
};

exports.instantiateService = function (serviceName) {
  var factoryArray = servicesFactories[serviceName];
  if (!factoryArray) {
    console.log('Could not find service', serviceName);
  }
  var factoryFunction = factoryArray.pop();
  var dependencyNames = factoryArray;
  // console.log('instantiating', serviceName, dependencyNames);
  var dependencies = dependencyNames.map(function(dependencyName) {
    return services[dependencyName] || exports.instantiateService(dependencyName);
  });
  return services[serviceName] = factoryFunction.apply(null, dependencies);
};

var module = {
  factory: function (serviceName, factoryArray) {
    servicesFactories[serviceName] = factoryArray.slice(0);
  },
  constant: function (constantName, value) {
    services[constantName] = value;
  },
  run: function() {
    console.log('todo');
  }
};

exports.module = function () {
  return module;
};

exports.setAngularUtils = function(utils) {
  angularUtils = utils;
}

exports.getAngularUtils = function() {
  return angularUtils;
}